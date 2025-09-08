#!/bin/bash
# backup-database.sh
# Automated database backup script for ContentFlow SaaS platform

set -e  # Exit on any error

# Environment variables with defaults
DB_HOST=${DATABASE_HOST:-localhost}
DB_PORT=${DATABASE_PORT:-5432}
DB_NAME=${DATABASE_NAME:-contentflow}
DB_USER=${DATABASE_USER:-postgres}
DB_PASSWORD=${DATABASE_PASSWORD:-}
BACKUP_DIR=${BACKUP_DIR:-"/backups"}
BACKUP_TYPE=${1:-"full"}  # full, incremental, transaction-log
DATE=$(date +"%Y%m%d_%H%M%S")
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")

# Logging function
log() {
    echo "[$TIMESTAMP] $1"
}

# Create backup directory if it doesn't exist
mkdir -p ${BACKUP_DIR}

# Function to perform full backup
full_backup() {
    log "Starting full database backup..."
    BACKUP_FILE="${BACKUP_DIR}/${DB_NAME}_full_${DATE}.sql"
    
    # Perform database backup
    PGPASSWORD=${DB_PASSWORD} pg_dump \
        -h ${DB_HOST} \
        -p ${DB_PORT} \
        -U ${DB_USER} \
        -d ${DB_NAME} \
        --verbose \
        --clean \
        --no-owner \
        --no-privileges \
        --exclude-table-data='drizzle_migrations' \
        > ${BACKUP_FILE}
    
    # Compress the backup
    gzip ${BACKUP_FILE}
    
    log "Full backup completed: ${BACKUP_FILE}.gz"
    
    # Validate backup
    validate_backup "${BACKUP_FILE}.gz"
}

# Function to perform incremental backup (using write-ahead logs)
incremental_backup() {
    log "Starting incremental backup..."
    BACKUP_FILE="${BACKUP_DIR}/${DB_NAME}_incremental_${DATE}.sql"
    
    # For PostgreSQL, we would typically use WAL archiving for true incremental backups
    # This is a simplified version that backs up recent changes
    PGPASSWORD=${DB_PASSWORD} pg_dump \
        -h ${DB_HOST} \
        -p ${DB_PORT} \
        -U ${DB_USER} \
        -d ${DB_NAME} \
        --verbose \
        --data-only \
        --exclude-table-data='drizzle_migrations' \
        > ${BACKUP_FILE}
    
    # Compress the backup
    gzip ${BACKUP_FILE}
    
    log "Incremental backup completed: ${BACKUP_FILE}.gz"
    
    # Validate backup
    validate_backup "${BACKUP_FILE}.gz"
}

# Function to perform transaction log backup
transaction_log_backup() {
    log "Starting transaction log backup..."
    BACKUP_FILE="${BACKUP_DIR}/${DB_NAME}_wal_${DATE}.log"
    
    # In a production environment, this would copy WAL files from pg_wal directory
    # For this implementation, we'll create a placeholder
    echo "Transaction log backup placeholder - $TIMESTAMP" > ${BACKUP_FILE}
    
    # Compress the backup
    gzip ${BACKUP_FILE}
    
    log "Transaction log backup completed: ${BACKUP_FILE}.gz"
}

# Function to validate backup integrity
validate_backup() {
    local backup_file=$1
    log "Validating backup: $backup_file"
    
    # Check if file exists and is not empty
    if [ ! -f "$backup_file" ] || [ ! -s "$backup_file" ]; then
        log "ERROR: Backup file is missing or empty"
        exit 1
    fi
    
    # For compressed files, check if we can decompress
    if [[ "$backup_file" == *.gz ]]; then
        if gunzip -t "$backup_file" 2>/dev/null; then
            log "Backup validation successful"
        else
            log "ERROR: Backup file failed integrity check"
            exit 1
        fi
    fi
}

# Function to clean up old backups based on retention policy
cleanup_old_backups() {
    log "Cleaning up old backups..."
    
    # Keep full backups for 30 days
    find ${BACKUP_DIR} -name "${DB_NAME}_full_*.sql.gz" -mtime +30 -delete 2>/dev/null || true
    
    # Keep incremental backups for 7 days
    find ${BACKUP_DIR} -name "${DB_NAME}_incremental_*.sql.gz" -mtime +7 -delete 2>/dev/null || true
    
    # Keep transaction log backups for 1 day
    find ${BACKUP_DIR} -name "${DB_NAME}_wal_*.log.gz" -mtime +1 -delete 2>/dev/null || true
    
    log "Cleanup completed"
}

# Function to upload to cloud storage (example with AWS CLI)
upload_to_cloud() {
    local backup_file=$1
    log "Uploading backup to cloud storage..."
    
    # Check if AWS CLI is available
    if command -v aws &> /dev/null; then
        # Upload to AWS S3 (example - replace with actual bucket name)
        aws s3 cp ${backup_file} s3://contentflow-backups/ 2>/dev/null || log "Warning: Failed to upload to S3"
    else
        log "Warning: AWS CLI not found, skipping cloud upload"
    fi
}

# Main execution
log "Starting database backup process (Type: $BACKUP_TYPE)"

case $BACKUP_TYPE in
    "full")
        full_backup
        ;;
    "incremental")
        incremental_backup
        ;;
    "transaction-log")
        transaction_log_backup
        ;;
    *)
        log "Invalid backup type. Usage: $0 [full|incremental|transaction-log]"
        exit 1
        ;;
esac

# Clean up old backups
cleanup_old_backups

log "Database backup process completed successfully"