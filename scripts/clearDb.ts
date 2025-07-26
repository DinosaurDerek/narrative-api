import { prisma } from '../src/lib/prisma.js';

async function clearDb() {
  await prisma.brief.deleteMany();

  console.log('Database wiped (records only).');
  await prisma.$disconnect();
}

clearDb().catch(e => {
  console.error(e);
  process.exit(1);
});
