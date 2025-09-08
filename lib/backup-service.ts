import { exec } from 'child_process';
import { promisify } from 'util';
import { readFileSync } from 'fs';
import { join } from 'path';

const execPromise = promisify(exec);

interface BackupConfig {
  backup: {
    strategies: {
      full: {
        frequency: string;
        time: string;
        retentionDays: number;
      };
      incremental: {
        frequency: string;
        retentionDays: number;
      };
      transactionLog: {
        frequency: string;
        retentionDays: number;
      };
    };
    storage: {
      local: {
        enabled: boolean;
        path: string;
      };
      cloud: {
        aws: {
          enabled: boolean;
          bucket: string;
          region: string;
        };
        gcp: {
          enabled: boolean;
          bucket: string;
        };
      };
    };
    encryption: {
      atRest: boolean;
      inTransit: boolean;
      algorithm: string;
    };
  };
  restore: {
    validation: {
      enabled: boolean;
      tablesToCheck: string[];
    };
  };
}

class BackupService {
  private config: BackupConfig;

  constructor() {
    const configPath = join(process.cwd(), 'config', 'backup-config.json');
    this.config = JSON.parse(readFileSync(configPath, 'utf-8'));
  }

  /**
   * Perform a full database backup.
   *
   * This function initiates a full backup of the database by executing a shell script. It logs the start of the backup process, captures the standard output and error from the script execution, and logs the results. If an error occurs during the backup, it logs the error and rethrows it for further handling.
   */
  async performFullBackup(): Promise<void> {
    try {
      console.log('Starting full database backup...');
      
      const { stdout, stderr } = await execPromise(
        `bash ${join(process.cwd(), 'scripts', 'backup-database.sh')} full`,
        { env: process.env }
      );
      
      if (stderr) {
        console.error('Backup stderr:', stderr);
      }
      
      console.log('Full backup completed successfully');
      console.log(stdout);
    } catch (error) {
      console.error('Full backup failed:', error);
      throw error;
    }
  }

  /**
   * Perform an incremental database backup.
   *
   * This function initiates an incremental backup of the database by executing a shell script. It logs the start of the backup process, captures the standard output and error from the script execution, and logs the results. If any errors occur during the backup, they are caught and logged, and the error is rethrown for further handling.
   */
  async performIncrementalBackup(): Promise<void> {
    try {
      console.log('Starting incremental database backup...');
      
      const { stdout, stderr } = await execPromise(
        `bash ${join(process.cwd(), 'scripts', 'backup-database.sh')} incremental`,
        { env: process.env }
      );
      
      if (stderr) {
        console.error('Backup stderr:', stderr);
      }
      
      console.log('Incremental backup completed successfully');
      console.log(stdout);
    } catch (error) {
      console.error('Incremental backup failed:', error);
      throw error;
    }
  }

  /**
   * Perform a transaction log backup.
   *
   * This function initiates a backup of the transaction log by executing a shell script located in the 'scripts' directory.
   * It logs the start of the backup process, captures any standard error output, and logs the completion status.
   * In case of an error during the execution, it logs the error and rethrows it for further handling.
   */
  async performTransactionLogBackup(): Promise<void> {
    try {
      console.log('Starting transaction log backup...');
      
      const { stdout, stderr } = await execPromise(
        `bash ${join(process.cwd(), 'scripts', 'backup-database.sh')} transaction-log`,
        { env: process.env }
      );
      
      if (stderr) {
        console.error('Backup stderr:', stderr);
      }
      
      console.log('Transaction log backup completed successfully');
      console.log(stdout);
    } catch (error) {
      console.error('Transaction log backup failed:', error);
      throw error;
    }
  }

  /**
   * Restore database from a backup file.
   *
   * This function initiates the restoration of a database using a specified backup file. It executes a shell script located in the 'scripts' directory to perform the restore operation. The function logs the start of the process, captures any standard error output, and logs the completion status. In case of an error during execution, it logs the error and rethrows it for further handling.
   *
   * @param backupFilePath - The path to the backup file to restore the database from.
   */
  async restoreFromBackup(backupFilePath: string): Promise<void> {
    try {
      console.log(`Starting database restore from: ${backupFilePath}`);
      
      const { stdout, stderr } = await execPromise(
        `bash ${join(process.cwd(), 'scripts', 'restore-database.sh')} ${backupFilePath}`,
        { env: process.env }
      );
      
      if (stderr) {
        console.error('Restore stderr:', stderr);
      }
      
      console.log('Database restore completed successfully');
      console.log(stdout);
    } catch (error) {
      console.error('Database restore failed:', error);
      throw error;
    }
  }

  /**
   * Retrieves a copy of the backup configuration.
   */
  getConfig(): BackupConfig {
    return { ...this.config };
  }

  /**
   * Validate backup integrity.
   *
   * This function checks the existence of a backup file by executing a command to list its details.
   * It logs the validation process and the output. If the command fails, it catches the error, logs it,
   * and returns false, indicating the backup validation was unsuccessful. Otherwise, it returns true.
   *
   * @param backupFilePath - The path to the backup file to be validated.
   */
  async validateBackup(backupFilePath: string): Promise<boolean> {
    try {
      console.log(`Validating backup: ${backupFilePath}`);
      
      // For now, we'll just check if the file exists
      // In a production environment, we would perform more thorough validation
      const { stdout } = await execPromise(`ls -la ${backupFilePath}`);
      console.log('Backup validation output:', stdout);
      
      return true;
    } catch (error) {
      console.error('Backup validation failed:', error);
      return false;
    }
  }
}

export default new BackupService();