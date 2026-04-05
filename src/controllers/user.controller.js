const service = require("../services/user.service");

// Get all users
exports.getAll = async (req, res, next) => {
  try {
    const data = await service.getAllUsers();
    res.json(data);
  } catch (err) {
    next(err);
  }
};

// Update user
exports.update = async (req, res, next) => {
  try {
    const data = await service.updateUser(req.params.id, req.body);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

// Delete user
exports.delete = async (req, res, next) => {
  try {
    const data = await service.deleteUser(req.params.id, req.user.id);
    res.json(data);
  } catch (err) {
    next(err);
  }
};
