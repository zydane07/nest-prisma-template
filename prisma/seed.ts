import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  await prisma.user.deleteMany();
  await prisma.user.createMany({
    data: [
      {
        email: 'zydane@gmail.com',
        name: 'muhammad zydane',
      },
      {
        email: 'farhan@gmail.com',
        name: 'muhammad farhan',
      },
      {
        email: 'rina@gmail.com',
        name: 'nisrina kh',
      },
    ],
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
