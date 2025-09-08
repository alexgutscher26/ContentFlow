import { exec } from 'child_process';
import { promisify } from 'util';
import { statSync } from 'fs';
import { join } from 'path';

const execPromise = promisify(exec);

class BackupValidator {
  /**
   * Validate a backup file.
   *
   * This function checks if the specified backup file exists and is not empty. It then executes a validation script to ensure the backup file is valid. If any errors occur during the process, appropriate details are returned. The function handles both file system checks and script execution, providing detailed feedback on the validation status.
   *
   * @param backupFilePath - The path to the backup file to be validated.
   * @returns An object containing a validity flag and details about the validation process.
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
   * Test restore from backup in a temporary database.
   *
   * This function attempts to restore a backup from the specified backupFilePath by executing a shell script.
   * It logs the output and any errors encountered during the process. If the script produces any standard error output,
   * it returns a failure response with the error details. In case of an exception, it catches the error and returns
   * a failure response with the error message.
   *
   * @param {string} backupFilePath - The path to the backup file to be tested for restoration.
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
   * Perform comprehensive backup validation.
   *
   * This function validates a backup file by first checking the file's integrity using the validateBackupFile method.
   * If the file is valid, it proceeds to test the restore process with the testRestore method.
   * The function returns an object indicating whether the validation was successful and provides details on the validation outcome.
   *
   * @param backupFilePath - The path to the backup file that needs to be validated.
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