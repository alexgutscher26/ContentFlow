#!/bin/bash
# restore-database.sh
# Database restore script for ContentFlow SaaS platform

set -e  # Exit on any error

# Environment variables with defaults
DB_HOST=${DATABASE_HOST:-localhost}
DB_PORT=${DATABASE_PORT:-5432}
DB_NAME=${DATABASE_NAME:-contentflow}
DB_USER=${DATABASE_USER:-postgres}
DB_PASSWORD=${DATABASE_PASSWORD:-}
BACKUP_DIR=${BACKUP_DIR:-"/backups"}
BACKUP_FILE=${1:-""}  # Path to backup file to restore
DATE=$(date +"%Y%m%d_%H%M%S")
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")

# Logging function
log() {
    echo "[$TIMESTAMP] $1"
}

# Function to restore database from backup
restore_backup() {
    if [ -z "$BACKUP_FILE" ]; then
        log "ERROR: No backup file specified"
        log "Usage: $0 <path_to_backup_file>"
        exit 1
    fi
    
    if [ ! -f "$BACKUP_FILE" ]; then
        log "ERROR: Backup file not found: $BACKUP_FILE"
        exit 1
    fi
    
    log "Starting database restore from: $BACKUP_FILE"
    
    # Check if database exists, if not create it
    PGPASSWORD=${DB_PASSWORD} psql \
        -h ${DB_HOST} \
        -p ${DB_PORT} \
        -U ${DB_USER} \
        -d postgres \
        -c "SELECT 1 FROM pg_database WHERE datname = '${DB_NAME}'" \
        --quiet --tuples-only | grep -q 1 || \
        PGPASSWORD=${DB_PASSWORD} psql \
            -h ${DB_HOST} \
            -p ${DB_PORT} \
            -U ${DB_USER} \
            -d postgres \
            -c "CREATE DATABASE ${DB_NAME}" \
            --quiet
    
    # If backup is compressed, decompress it first
    if [[ "$BACKUP_FILE" == *.gz ]]; then
        TEMP_FILE="/tmp/${DB_NAME}_restore_${DATE}.sql"
        log "Decompressing backup file..."
        gunzip -c "$BACKUP_FILE" > "$TEMP_FILE"
        BACKUP_FILE_TO_USE="$TEMP_FILE"
    else
        BACKUP_FILE_TO_USE="$BACKUP_FILE"
    fi
    
    # Restore the database
    log "Restoring database..."
    PGPASSWORD=${DB_PASSWORD} psql \
        -h ${DB_HOST} \
        -p ${DB_PORT} \
        -U ${DB_USER} \
        -d ${DB_NAME} \
        -f "$BACKUP_FILE_TO_USE" \
        --quiet
    
    # Clean up temporary file if we created one
    if [ -n "$TEMP_FILE" ] && [ -f "$TEMP_FILE" ]; then
        rm "$TEMP_FILE"
    fi
    
    log "Database restore completed successfully"
}

# Function to validate restored data
validate_restore() {
    log "Validating restored data..."
    
    # Check if key tables exist and have data
    TABLES=("users" "organizations" "posts" "drafts")
    
    for table in "${TABLES[@]}"; do
        COUNT=$(PGPASSWORD=${DB_PASSWORD} psql \
            -h ${DB_HOST} \
            -p ${DB_PORT} \
            -U ${DB_USER} \
            -d ${DB_NAME} \
            -c "SELECT COUNT(*) FROM ${table}" \
            --quiet --tuples-only | tr -d ' ')
        
        if [ "$COUNT" -ge 0 ] 2>/dev/null; then
            log "Table $table: $COUNT records"
        else
            log "WARNING: Could not validate table $table"
        fi
    done
    
    log "Restore validation completed"
}

# Main execution
log "Starting database restore process"

restore_backup
validate_restore

log "Database restore process completed successfully"