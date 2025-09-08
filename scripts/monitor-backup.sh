#!/bin/bash
# monitor-backup.sh
# Backup monitoring script for ContentFlow SaaS platform

set -e  # Exit on any error

DATE=$(date +"%Y-%m-%d %H:%M:%S")
LOG_FILE="/var/log/contentflow/backup-monitor.log"

# Create log directory if it doesn't exist
mkdir -p /var/log/contentflow

# Logging function
log() {
    echo "[$DATE] $1" | tee -a $LOG_FILE
}

# Function to check backup status
check_backup_status() {
    log "Checking backup status..."
    
    # Check if backup directory exists
    BACKUP_DIR=${BACKUP_DIR:-"/backups"}
    if [ ! -d "$BACKUP_DIR" ]; then
        log "ERROR: Backup directory not found: $BACKUP_DIR"
        return 1
    fi
    
    # Check for recent backups
    RECENT_BACKUPS=$(find $BACKUP_DIR -name "*.sql.gz" -mtime -1 | wc -l)
    if [ "$RECENT_BACKUPS" -eq 0 ]; then
        log "WARNING: No recent backups found in $BACKUP_DIR"
        return 1
    else
        log "Found $RECENT_BACKUPS recent backups"
    fi
    
    # Check backup sizes
    for backup in $(find $BACKUP_DIR -name "*.sql.gz" -mtime -1); do
        SIZE=$(stat -c%s "$backup" 2>/dev/null || stat -f%z "$backup")
        log "Backup $backup: $SIZE bytes"
        
        # Alert if backup is unusually small
        if [ "$SIZE" -lt 1024 ]; then
            log "WARNING: Backup file is unusually small: $backup"
        fi
    done
    
    log "Backup status check completed"
    return 0
}

# Function to check disk space
check_disk_space() {
    log "Checking disk space..."
    
    # Check disk usage
    DISK_USAGE=$(df /backups | tail -1 | awk '{print $5}' | sed 's/%//')
    log "Disk usage: $DISK_USAGE%"
    
    # Alert if disk usage is high
    if [ "$DISK_USAGE" -gt 80 ]; then
        log "WARNING: High disk usage ($DISK_USAGE%)"
        return 1
    fi
    
    log "Disk space check completed"
    return 0
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
log "Starting backup monitoring process"

# Check backup status
if ! check_backup_status; then
    send_alert "Backup status check failed" "CRITICAL"
fi

# Check disk space
if ! check_disk_space; then
    send_alert "Disk space check failed" "WARNING"
fi

log "Backup monitoring process completed"