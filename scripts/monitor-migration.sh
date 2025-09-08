#!/bin/bash
# monitor-migration.sh
# Migration monitoring script for ContentFlow SaaS platform

set -e  # Exit on any error

DATE=$(date +"%Y-%m-%d %H:%M:%S")
LOG_FILE="/var/log/contentflow/migration-monitor.log"

# Create log directory if it doesn't exist
mkdir -p /var/log/contentflow

# Logging function
log() {
    echo "[$DATE] $1" | tee -a $LOG_FILE
}

# Function to check migration status
check_migration_status() {
    log "Checking migration status..."
    
    MIGRATION_DIR="./prisma/migrations"
    
    # Check if migration directory exists
    if [ ! -d "$MIGRATION_DIR" ]; then
        log "ERROR: Migration directory not found: $MIGRATION_DIR"
        return 1
    fi
    
    # Check for pending migrations
    PENDING_MIGRATIONS=$(npx prisma migrate status | grep -c "Pending migrations" || true)
    if [ "$PENDING_MIGRATIONS" -gt 0 ]; then
        log "WARNING: There are pending migrations"
        return 1
    else
        log "No pending migrations"
    fi
    
    # Check migration lock file
    if [ ! -f "${MIGRATION_DIR}/migration_lock.toml" ]; then
        log "WARNING: Migration lock file not found"
    else
        log "Migration lock file found"
    fi
    
    log "Migration status check completed"
    return 0
}

# Function to check database connectivity
check_database_connectivity() {
    log "Checking database connectivity..."
    
    # Try to connect to the database
    if npx prisma migrate status >/dev/null 2>&1; then
        log "Database connectivity OK"
        return 0
    else
        log "ERROR: Database connectivity failed"
        return 1
    fi
}

# Function to send alert
send_alert() {
    local message=$1
    local severity=$2
    
    log "ALERT [$severity]: $message"
    
    # In a real implementation, this would send alerts via email, Slack, etc.
    # For now, we'll just log the alert
    
    # For critical alerts, we might want to send notifications
    if [ "$severity" == "CRITICAL" ]; then
        log "CRITICAL ALERT: $message"
        # This would integrate with actual alerting systems
    fi
}

# Main execution
log "Starting migration monitoring process"

# Check database connectivity
if ! check_database_connectivity; then
    send_alert "Database connectivity failed" "CRITICAL"
fi

# Check migration status
if ! check_migration_status; then
    send_alert "Migration status check failed" "WARNING"
fi

log "Migration monitoring process completed"