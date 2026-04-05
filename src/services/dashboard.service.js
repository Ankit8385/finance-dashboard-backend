const prisma = require("../config/prisma");

// 🔥 helper
const getUserFilter = (user) => {
  if (user.role === "VIEWER") {
    return { userId: user.id };
  }
  return {};
};

// 🔥 UPDATED
exports.getSummary = async () => {
  const income = await prisma.transaction.aggregate({
    _sum: { amount: true },
    where: { type: "INCOME" },
  });

  const expense = await prisma.transaction.aggregate({
    _sum: { amount: true },
    where: { type: "EXPENSE" },
  });

  const totalIncome = income._sum.amount || 0;
  const totalExpense = expense._sum.amount || 0;

  return {
    totalIncome,
    totalExpense,
    netBalance: totalIncome - totalExpense,
  };
};

// 🔥 UPDATED
exports.getCategoryWise = async (user) => {
  const whereFilter = getUserFilter(user);

  return prisma.transaction.groupBy({
    by: ["category", "type"],
    where: {
      ...whereFilter,
    },
    _sum: {
      amount: true,
    },
  });
};

// 🔥 UPDATED
exports.getTrends = async (user) => {
  if (user.role === "VIEWER") {
    throw { status: 403, message: "Forbidden" };
  }

  // ADMIN / ANALYST
  return prisma.$queryRaw`
    SELECT 
      DATE_TRUNC('month', "date") as month,
      SUM(CASE WHEN type = 'INCOME' THEN amount ELSE 0 END) as income,
      SUM(CASE WHEN type = 'EXPENSE' THEN amount ELSE 0 END) as expense
    FROM "Transaction"
    GROUP BY month
    ORDER BY month ASC
  `;
};

// 🔥 UPDATED
exports.getRecent = async () => {
  return prisma.transaction.findMany({
    orderBy: { date: "desc" },
    take: 5,
  });
};
