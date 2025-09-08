import { exec } from 'child_process';
import { promisify } from 'util';
import { join } from 'path';
import migrationValidator from './migration-validator';

const execPromise = promisify(exec);

class MigrationService {
  /**
   * Apply pending migrations
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
   * Create a new migration
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
   * Reset database (use with caution)
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