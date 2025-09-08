import { PrismaClient } from '@prisma/client';

// Create a single instance of Prisma Client with connection pooling for production
const prismaClientSingleton = () => {
  // For production environments, we'll add connection pooling parameters to the DATABASE_URL
  let databaseUrl = process.env.DATABASE_URL;
  
  if (process.env.NODE_ENV === 'production' && databaseUrl) {
    try {
      const url = new URL(databaseUrl);
      // Set connection limit based on environment variable or default to 15
      url.searchParams.set('connection_limit', process.env.DATABASE_CONNECTION_LIMIT || '15');
      // Set pool timeout in seconds
      url.searchParams.set('pool_timeout', process.env.DATABASE_POOL_TIMEOUT || '10');
      databaseUrl = url.toString();
    } catch (error) {
      // If URL parsing fails, use the original database URL
      console.warn('Failed to parse DATABASE_URL for connection pooling:', error);
    }
  }

  return new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
    log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['warn', 'error'],
  });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export * from '@prisma/client';