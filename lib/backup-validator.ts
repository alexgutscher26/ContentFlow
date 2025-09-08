import { exec } from 'child_process';
import { promisify } from 'util';
import { statSync } from 'fs';
import { join } from 'path';

const execPromise = promisify(exec);

class BackupValidator {
  /**
   * Validate a backup file
   */
  async validateBackupFile(backupFilePath: string): Promise<{ valid: boolean; details: string }> {
    try {
      console.log(`Validating backup file: ${backupFilePath}`);
      
      // Check if file exists
      try {
        const stats = statSync(backupFilePath);
        if (stats.size === 0) {
          return { valid: false, details: 'Backup file is empty' };
        }
      } catch (error) {
        return { valid: false, details: `Backup file not found: ${backupFilePath}` };
      }
      
      // Run validation script
      const { stdout, stderr } = await execPromise(
        `bash ${join(process.cwd(), 'scripts', 'validate-backup.sh')} ${backupFilePath}`,
        { env: process.env }
      );
      
      if (stderr) {
        console.error('Validation stderr:', stderr);
        return { valid: false, details: `Validation error: ${stderr}` };
      }
      
      console.log('Validation output:', stdout);
      return { valid: true, details: 'Backup file validation successful' };
    } catch (error) {
      console.error('Backup validation failed:', error);
      return { valid: false, details: `Backup validation failed: ${error}` };
    }
  }

  /**
   * Test restore from backup in a temporary database
   */
  async testRestore(backupFilePath: string): Promise<{ success: boolean; details: string }> {
    try {
      console.log(`Testing restore from backup: ${backupFilePath}`);
      
      // Run restore test script
      const { stdout, stderr } = await execPromise(
        `bash ${join(process.cwd(), 'scripts', 'validate-backup.sh')} ${backupFilePath} --test-restore`,
        { env: process.env }
      );
      
      if (stderr) {
        console.error('Restore test stderr:', stderr);
        return { success: false, details: `Restore test error: ${stderr}` };
      }
      
      console.log('Restore test output:', stdout);
      return { success: true, details: 'Restore test completed successfully' };
    } catch (error) {
      console.error('Restore test failed:', error);
      return { success: false, details: `Restore test failed: ${error}` };
    }
  }

  /**
   * Perform comprehensive backup validation
   */
  async comprehensiveValidation(backupFilePath: string): Promise<{ valid: boolean; details: string }> {
    // First validate the file itself
    const fileValidation = await this.validateBackupFile(backupFilePath);
    if (!fileValidation.valid) {
      return fileValidation;
    }
    
    // Then test restore
    const restoreTest = await this.testRestore(backupFilePath);
    if (!restoreTest.success) {
      return { valid: false, details: restoreTest.details };
    }
    
    return { valid: true, details: 'Comprehensive backup validation successful' };
  }
}

export default new BackupValidator();