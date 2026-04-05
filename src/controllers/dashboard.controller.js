const service = require("../services/dashboard.service");

exports.getSummary = async (req, res, next) => {
  try {
    const data = await service.getSummary(req.user);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.getCategoryWise = async (req, res, next) => {
  try {
    const data = await service.getCategoryWise(req.user);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.getTrends = async (req, res, next) => {
  try {
    const data = await service.getTrends(req.user);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.getRecent = async (req, res, next) => {
  try {
    const data = await service.getRecent(req.user);
    res.json(data);
  } catch (err) {
    next(err);
  }
};
