const repo = require("../repositories/transaction.repository");

exports.createTransaction = async (data, userId) => {
  return repo.create({
    ...data,
    date: new Date(data.date),
    userId,
  });
};

exports.getTransactions = async (user, query) => {
  const { type, category, startDate, endDate, page = 1, limit = 10 } = query;

  const filters = {};

  // Type filter
  if (type) {
    filters.type = type;
  }

  // Category filter
  if (category) {
    filters.category = category;
  }

  // Date range filter
  if (startDate || endDate) {
    filters.date = {};

    if (startDate) {
      filters.date.gte = new Date(startDate);
    }

    if (endDate) {
      filters.date.lte = new Date(endDate);
    }
  }

  const skip = (page - 1) * limit;

  return repo.findAllWithPagination(filters, skip, Number(limit));
};

exports.getTransactionById = async (id, user) => {
  const transaction = await repo.findById(id);

  if (!transaction) {
    throw { status: 404, message: "Transaction not found" };
  }

  return transaction;
};

exports.updateTransaction = async (id, data, user) => {
  const transaction = await repo.findById(id);

  if (!transaction) {
    throw { status: 404, message: "Transaction not found" };
  }

  if (user.role !== "ADMIN") {
    throw { status: 403, message: "Forbidden" };
  }

  return repo.update(id, {
    ...data,
    ...(data.date && { date: new Date(data.date) }),
  });
};

exports.deleteTransaction = async (id, user) => {
  const transaction = await repo.findById(id);

  if (!transaction) {
    throw { status: 404, message: "Transaction not found" };
  }

  if (user.role !== "ADMIN") {
    throw { status: 403, message: "Forbidden" };
  }

  await repo.delete(id);

  return { message: "Transaction deleted successfully" };
};
