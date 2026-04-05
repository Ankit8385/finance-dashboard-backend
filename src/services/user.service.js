const repo = require("../repositories/user.repository");

// ✅ Get all users
exports.getAllUsers = async () => {
  return repo.findAll();
};

// ✅ Update user (role/status)
exports.updateUser = async (id, data) => {
  const user = await repo.findById(id);

  if (!user) {
    throw { status: 404, message: "User not found" };
  }

  return repo.update(id, {
    ...(data.role && { role: data.role }),
    ...(data.status && { status: data.status }),
  });
};

// ✅ Delete user
exports.deleteUser = async (id, currentUserId) => {
  const user = await repo.findById(id);

  if (!user) {
    throw { status: 404, message: "User not found" };
  }

  // Prevent self-deletion
  if (id === currentUserId) {
    throw {
      status: 400,
      message: "You cannot delete your own account",
    };
  }

  await repo.delete(id);

  return { message: "User deleted successfully" };
};
