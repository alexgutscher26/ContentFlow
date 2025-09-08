const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Check if organization already exists
  let organization = await prisma.organization.findUnique({
    where: { slug: 'test-company' }
  });
  
  if (!organization) {
    // Create a test organization
    organization = await prisma.organization.create({
      data: {
        name: 'Test Company',
        slug: 'test-company'
      }
    });
    
    console.log('Created organization:', organization);
  } else {
    console.log('Organization already exists:', organization);
  }
  
  // Check if user already exists
  let user = await prisma.user.findUnique({
    where: { email: 'test@example.com' }
  });
  
  if (!user) {
    // Create a test user
    user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        organizationId: organization.id,
        subscriptionTier: 'starter',
        onboardingCompleted: true
      }
    });
    
    console.log('Created user:', user);
  } else {
    // Update user to link to organization if not already linked
    if (!user.organizationId) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          organizationId: organization.id,
          onboardingCompleted: true
        }
      });
      
      console.log('Updated user:', user);
    } else {
      console.log('User already exists and is linked to organization:', user);
    }
  }
  
  console.log('Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });