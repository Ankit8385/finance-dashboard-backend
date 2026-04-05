const prisma = require("../config/prisma");
const { hashPassword, comparePassword } = require("../utils/hash");
const { generateToken } = require("../utils/jwt");

exports.register = async ({ name, email, password }) => {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw { status: 400, message: "User already exists" };

  const hashed = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashed,
      role: "ADMIN",
      status: "ACTIVE",
    },
  });

  return user;
};

exports.login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw { status: 400, message: "Invalid credentials" };

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) throw { status: 400, message: "Invalid credentials" };

  const token = generateToken({
    id: user.id,
    role: user.role,
  });

  return { token };
};
