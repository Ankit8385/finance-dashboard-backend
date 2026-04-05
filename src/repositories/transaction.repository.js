// src/repositories/transaction.repository.js
const prisma = require("../config/prisma");

exports.create = (data) => prisma.transaction.create({ data });

exports.findAll = (filters) =>
  prisma.transaction.findMany({
    where: filters,
    orderBy: { date: "desc" },
  });

exports.findAllWithPagination = (filters, skip, limit) =>
  prisma.transaction.findMany({
    where: filters,
    orderBy: { date: "desc" },
    skip,
    take: limit,
  });

exports.findById = (id) =>
  prisma.transaction.findUnique({
    where: { id },
  });

exports.update = (id, data) =>
  prisma.transaction.update({ where: { id }, data });

exports.delete = (id) => prisma.transaction.delete({ where: { id } });
