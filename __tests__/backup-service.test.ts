import backupService from '../lib/backup-service';
import backupValidator from '../lib/backup-validator';
import migrationValidator from '../lib/migration-validator';
import migrationService from '../lib/migration-service';
import rollbackService from '../lib/rollback-service';
import monitoringService from '../lib/monitoring-service';

describe('Backup and Migration Services', () => {
  describe('BackupService', () => {
    it('should have a backup service', () => {
      expect(backupService).toBeDefined();
    });

    it('should have getConfig method', () => {
      expect(typeof backupService.getConfig).toBe('function');
    });
  });

  describe('BackupValidator', () => {
    it('should have a backup validator', () => {
      expect(backupValidator).toBeDefined();
    });

    it('should have validateBackupFile method', () => {
      expect(typeof backupValidator.validateBackupFile).toBe('function');
    });
  });

  describe('MigrationValidator', () => {
    it('should have a migration validator', () => {
      expect(migrationValidator).toBeDefined();
    });

    it('should have validateMigrations method', () => {
      expect(typeof migrationValidator.validateMigrations).toBe('function');
    });
  });

  describe('MigrationService', () => {
    it('should have a migration service', () => {
      expect(migrationService).toBeDefined();
    });

    it('should have applyMigrations method', () => {
      expect(typeof migrationService.applyMigrations).toBe('function');
    });
  });

  describe('RollbackService', () => {
    it('should have a rollback service', () => {
      expect(rollbackService).toBeDefined();
    });

    it('should have getRollbackRecommendations method', () => {
      expect(typeof rollbackService.getRollbackRecommendations).toBe('function');
    });
  });

  describe('MonitoringService', () => {
    it('should have a monitoring service', () => {
      expect(monitoringService).toBeDefined();
    });

    it('should have logOperation method', () => {
      expect(typeof monitoringService.logOperation).toBe('function');
    });
  });
});