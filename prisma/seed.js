const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@test.com",
      password: "hashedpassword",
      role: "ADMIN",
    },
  });

  await prisma.transaction.createMany({
    data: [
      {
        amount: 50000,
        type: "INCOME",
        category: "Salary",
        date: new Date(),
        userId: user.id,
      },
      {
        amount: 2000,
        type: "EXPENSE",
        category: "Food",
        date: new Date(),
        userId: user.id,
      },
    ],
  });
}

main()
  .then(() => console.log("Seeded"))
  .catch(console.error)
  .finally(() => prisma.$disconnect());
