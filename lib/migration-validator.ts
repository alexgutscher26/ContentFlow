import { exec } from 'child_process';
import { promisify } from 'util';
import { readdirSync, existsSync, statSync } from 'fs';
import { join } from 'path';

const execPromise = promisify(exec);

class MigrationValidator {
  private migrationDir: string;

  constructor() {
    this.migrationDir = join(process.cwd(), 'prisma', 'migrations');
  }

  /**
   * Validate migration files
   */
  async validateMigrations(): Promise<{ valid: boolean; details: string }> {
    try {
      console.log(`Validating migrations in: ${this.migrationDir}`);
      
      // Check if migration directory exists
      if (!existsSync(this.migrationDir)) {
        return { valid: false, details: `Migration directory not found: ${this.migrationDir}` };
      }
      
      // Run validation script
      const { stdout, stderr } = await execPromise(
        `bash ${join(process.cwd(), 'scripts', 'validate-migration.sh')} ${this.migrationDir}`,
        { env: process.env }
      );
      
      if (stderr) {
        console.error('Validation stderr:', stderr);
        return { valid: false, details: `Validation error: ${stderr}` };
      }
      
      console.log('Migration validation output:', stdout);
      return { valid: true, details: 'Migration validation successful' };
    } catch (error) {
      console.error('Migration validation failed:', error);
      return { valid: false, details: `Migration validation failed: ${error}` };
    }
  }

  /**
   * Test migrations in a temporary database
   */
  async testMigrations(): Promise<{ success: boolean; details: string }> {
    try {
      console.log(`Testing migrations in: ${this.migrationDir}`);
      
      // Run migration test script
      const { stdout, stderr } = await execPromise(
        `bash ${join(process.cwd(), 'scripts', 'validate-migration.sh')} ${this.migrationDir} --test-migrations`,
        { env: process.env }
      );
      
      if (stderr) {
        console.error('Migration test stderr:', stderr);
        return { success: false, details: `Migration test error: ${stderr}` };
      }
      
      console.log('Migration test output:', stdout);
      return { success: true, details: 'Migration test completed successfully' };
    } catch (error) {
      console.error('Migration test failed:', error);
      return { success: false, details: `Migration test failed: ${error}` };
    }
  }

  /**
   * Check for potentially destructive changes
   */
  async checkDestructiveChanges(): Promise<{ hasDestructiveChanges: boolean; details: string }> {
    try {
      console.log('Checking for destructive changes...');
      
      // Run destructive change check
      const { stdout, stderr } = await execPromise(
        `bash ${join(process.cwd(), 'scripts', 'validate-migration.sh')} ${this.migrationDir}`,
        { env: process.env }
      );
      
      if (stderr) {
        console.error('Destructive change check stderr:', stderr);
        return { hasDestructiveChanges: false, details: `Check error: ${stderr}` };
      }
      
      // Parse output for warnings about destructive changes
      const hasDestructive = stdout.includes('WARNING: Potentially destructive operations found');
      
      console.log('Destructive change check output:', stdout);
      return { 
        hasDestructiveChanges: hasDestructive, 
        details: hasDestructive ? 'Destructive changes detected' : 'No destructive changes found' 
      };
    } catch (error) {
      console.error('Destructive change check failed:', error);
      return { hasDestructiveChanges: false, details: `Destructive change check failed: ${error}` };
    }
  }

  /**
   * Perform comprehensive migration validation
   */
  async comprehensiveValidation(): Promise<{ valid: boolean; details: string }> {
    // First validate the migration files
    const fileValidation = await this.validateMigrations();
    if (!fileValidation.valid) {
      return fileValidation;
    }
    
    // Check for destructive changes
    const destructiveCheck = await this.checkDestructiveChanges();
    
    return { 
      valid: true, 
      details: `Migration validation successful. ${destructiveCheck.details}` 
    };
  }
}

export default new MigrationValidator();