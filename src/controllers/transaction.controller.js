// src/controllers/transaction.controller.js
const service = require("../services/transaction.service");

exports.create = async (req, res, next) => {
  try {
    const data = await service.createTransaction(req.body, req.user.id);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const data = await service.getTransactions(req.user, req.query);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const data = await service.getTransactionById(req.params.id, req.user);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const data = await service.updateTransaction(
      req.params.id,
      req.body,
      req.user,
    );
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const data = await service.deleteTransaction(req.params.id, req.user);
    res.json(data);
  } catch (err) {
    next(err);
  }
};
