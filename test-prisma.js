const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Test creating a user
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      subscriptionTier: 'starter'
    }
  });
  
  console.log('Created user:', user);
  
  // Test finding the user
  const foundUser = await prisma.user.findUnique({
    where: { email: 'test@example.com' }
  });
  
  console.log('Found user:', foundUser);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });