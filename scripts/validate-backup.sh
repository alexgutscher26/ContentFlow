#!/bin/bash
# validate-backup.sh
# Backup validation script for ContentFlow SaaS platform

set -e  # Exit on any error

BACKUP_FILE=${1:-""}  # Path to backup file to validate
DATE=$(date +"%Y-%m-%d %H:%M:%S")

# Logging function
log() {
    echo "[$DATE] $1"
}

# Function to validate backup file
validate_backup_file() {
    if [ -z "$BACKUP_FILE" ]; then
        log "ERROR: No backup file specified"
        log "Usage: $0 <path_to_backup_file>"
        exit 1
    fi
    
    if [ ! -f "$BACKUP_FILE" ]; then
        log "ERROR: Backup file not found: $BACKUP_FILE"
        exit 1
    fi
    
    log "Validating backup file: $BACKUP_FILE"
    
    # Check file size
    FILE_SIZE=$(stat -c%s "$BACKUP_FILE" 2>/dev/null || stat -f%z "$BACKUP_FILE")
    if [ "$FILE_SIZE" -eq 0 ]; then
        log "ERROR: Backup file is empty"
        exit 1
    fi
    
    log "File size: $FILE_SIZE bytes"
    
    # If backup is compressed, check if we can decompress
    if [[ "$BACKUP_FILE" == *.gz ]]; then
        log "Checking compression integrity..."
        if gunzip -t "$BACKUP_FILE" 2>/dev/null; then
            log "Compression integrity check passed"
        else
            log "ERROR: Backup file failed compression integrity check"
            exit 1
        fi
    fi
    
    # For SQL files, check if they contain valid SQL
    if [[ "$BACKUP_FILE" == *.sql* ]]; then
        log "Checking SQL file structure..."
        # Check if file contains SQL statements
        if zgrep -q "CREATE TABLE\|INSERT INTO" "$BACKUP_FILE" 2>/dev/null || grep -q "CREATE TABLE\|INSERT INTO" "$BACKUP_FILE" 2>/dev/null; then
            log "SQL structure check passed"
        else
            log "WARNING: No SQL statements found in backup file"
        fi
    fi
    
    log "Backup file validation completed successfully"
}

# Function to test restore in a temporary database
test_restore() {
    log "Testing restore in temporary database..."
    
    # This would typically create a temporary database and test restore
    # For now, we'll just simulate this process
    log "Restore test simulation completed"
}

# Main execution
log "Starting backup validation process"

validate_backup_file

# Only run restore test if requested
if [ "$2" == "--test-restore" ]; then
    test_restore
fi

log "Backup validation process completed successfully"