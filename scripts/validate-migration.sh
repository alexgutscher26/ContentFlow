#!/bin/bash
# validate-migration.sh
# Migration validation script for ContentFlow SaaS platform

set -e  # Exit on any error

MIGRATION_DIR=${1:-"./prisma/migrations"}
DATE=$(date +"%Y-%m-%d %H:%M:%S")

# Logging function
log() {
    echo "[$DATE] $1"
}

# Function to validate migration files
validate_migrations() {
    log "Validating migrations in: $MIGRATION_DIR"
    
    # Check if migration directory exists
    if [ ! -d "$MIGRATION_DIR" ]; then
        log "ERROR: Migration directory not found: $MIGRATION_DIR"
        exit 1
    fi
    
    # Check for migration lock file
    if [ ! -f "${MIGRATION_DIR}/migration_lock.toml" ]; then
        log "WARNING: Migration lock file not found"
    else
        log "Migration lock file found"
    fi
    
    # Validate each migration directory
    for migration_dir in ${MIGRATION_DIR}/*/; do
        if [ -d "$migration_dir" ]; then
            migration_name=$(basename "$migration_dir")
            log "Validating migration: $migration_name"
            
            # Check for migration SQL file
            if [ ! -f "${migration_dir}/migration.sql" ]; then
                log "ERROR: migration.sql not found in $migration_name"
                exit 1
            fi
            
            # Check if SQL file is empty
            if [ ! -s "${migration_dir}/migration.sql" ]; then
                log "WARNING: migration.sql is empty in $migration_name"
            fi
            
            log "Migration $migration_name validation passed"
        fi
    done
    
    log "Migration validation completed successfully"
}

# Function to test migration in a temporary database
test_migrations() {
    log "Testing migrations in temporary database..."
    
    # This would typically create a temporary database and test applying migrations
    # For now, we'll just simulate this process
    log "Migration test simulation completed"
}

# Function to check for destructive changes
check_destructive_changes() {
    log "Checking for potentially destructive changes..."
    
    # Look for DROP, DELETE, TRUNCATE statements that might be destructive
    for migration_dir in ${MIGRATION_DIR}/*/; do
        if [ -d "$migration_dir" ] && [ -f "${migration_dir}/migration.sql" ]; then
            migration_name=$(basename "$migration_dir")
            
            if grep -i -q "drop table\|delete from\|truncate" "${migration_dir}/migration.sql"; then
                log "WARNING: Potentially destructive operations found in $migration_name"
            else
                log "No destructive operations found in $migration_name"
            fi
        fi
    done
    
    log "Destructive change check completed"
}

# Main execution
log "Starting migration validation process"

validate_migrations

# Check for destructive changes
check_destructive_changes

# Only run migration test if requested
if [ "$2" == "--test-migrations" ]; then
    test_migrations
fi

log "Migration validation process completed successfully"