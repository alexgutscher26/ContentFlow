import { exec } from 'child_process';
import { promisify } from 'util';
import { join } from 'path';
import migrationValidator from './migration-validator';

const execPromise = promisify(exec);

class MigrationService {
  /**
   * Apply pending migrations to the database.
   *
   * This function first validates the migrations using migrationValidator.comprehensiveValidation. If validation fails, it returns an error message.
   * If validation succeeds, it executes the Prisma migration command. It captures and logs any errors that occur during the migration process,
   * returning a success status and details about the operation.
   *
   * @returns An object containing a success flag and details about the migration process.
   */
  async applyMigrations(): Promise<{ success: boolean; details: string }> {
    try {
      console.log('Applying pending migrations...');
      
      // First validate migrations
      const validation = await migrationValidator.comprehensiveValidation();
      if (!validation.valid) {
        return { success: false, details: `Migration validation failed: ${validation.details}` };
      }
      
      // Apply migrations using Prisma
      const { stdout, stderr } = await execPromise(
        'npx prisma migrate deploy',
        { env: process.env }
      );
      
      if (stderr) {
        console.error('Migration stderr:', stderr);
        return { success: false, details: `Migration error: ${stderr}` };
      }
      
      console.log('Migration output:', stdout);
      return { success: true, details: 'Migrations applied successfully' };
    } catch (error) {
      console.error('Migration application failed:', error);
      return { success: false, details: `Migration application failed: ${error}` };
    }
  }

  /**
   * Create a new migration.
   *
   * This function initiates the creation of a new migration using Prisma by executing a command with the provided name. It logs the process and captures any standard error output. If an error occurs during the execution, it logs the error and returns a failure response. Otherwise, it returns a success response with the output details.
   *
   * @param name - The name of the migration to be created.
   */
  async createMigration(name: string): Promise<{ success: boolean; details: string }> {
    try {
      console.log(`Creating new migration: ${name}`);
      
      // Generate migration using Prisma
      const { stdout, stderr } = await execPromise(
        `npx prisma migrate dev --name ${name}`,
        { env: process.env }
      );
      
      if (stderr) {
        console.error('Migration creation stderr:', stderr);
        return { success: false, details: `Migration creation error: ${stderr}` };
      }
      
      console.log('Migration creation output:', stdout);
      return { success: true, details: 'Migration created successfully' };
    } catch (error) {
      console.error('Migration creation failed:', error);
      return { success: false, details: `Migration creation failed: ${error}` };
    }
  }

  /**
   * Resets the database using Prisma.
   *
   * This function executes a command to reset the database and handles the output and errors. It logs the process of resetting the database and returns an object indicating the success of the operation along with relevant details. If an error occurs during the execution, it captures and logs the error, providing feedback on the failure.
   */
  async resetDatabase(): Promise<{ success: boolean; details: string }> {
    try {
      console.log('Resetting database...');
      
      // Reset database using Prisma
      const { stdout, stderr } = await execPromise(
        'npx prisma migrate reset --force',
        { env: process.env }
      );
      
      if (stderr) {
        console.error('Database reset stderr:', stderr);
        return { success: false, details: `Database reset error: ${stderr}` };
      }
      
      console.log('Database reset output:', stdout);
      return { success: true, details: 'Database reset successfully' };
    } catch (error) {
      console.error('Database reset failed:', error);
      return { success: false, details: `Database reset failed: ${error}` };
    }
  }

  /**
   * Get migration status
   *
   * This function retrieves the current migration status by executing the Prisma migrate status command.
   * It logs the process and handles any errors that may occur during execution. If there is an error in
   * the standard error output, it returns a failure response with the error details. Otherwise, it returns
   * a success response with the migration status output.
   */
  async getMigrationStatus(): Promise<{ success: boolean; details: string }> {
    try {
      console.log('Getting migration status...');
      
      // Get migration status using Prisma
      const { stdout, stderr } = await execPromise(
        'npx prisma migrate status',
        { env: process.env }
      );
      
      if (stderr) {
        console.error('Migration status stderr:', stderr);
        return { success: false, details: `Migration status error: ${stderr}` };
      }
      
      console.log('Migration status output:', stdout);
      return { success: true, details: stdout };
    } catch (error) {
      console.error('Getting migration status failed:', error);
      return { success: false, details: `Getting migration status failed: ${error}` };
    }
  }
}

export default new MigrationService();