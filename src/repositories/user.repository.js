const prisma = require("../config/prisma");

exports.findAll = () =>
  prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
    },
  });

exports.findById = (id) =>
  prisma.user.findUnique({
    where: { id },
  });

exports.update = (id, data) =>
  prisma.user.update({
    where: { id },
    data,
  });

exports.delete = (id) =>
  prisma.user.delete({
    where: { id },
  });
