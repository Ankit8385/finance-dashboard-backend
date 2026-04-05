// src/routes/transaction.routes.js
const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const controller = require("../controllers/transaction.controller");

const validate = require("../middleware/validate.middleware");
const {
  createTransactionSchema,
  updateTransactionSchema,
  getTransactionsSchema,
  transactionIdParamSchema,
} = require("../validations/transaction.validation");
/**
 * @swagger
 * /api/transactions:
 *   post:
 *     summary: Create a new transaction (Admin only)
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             amount: 5000
 *             type: INCOME
 *             category: Salary
 *             date: 2026-04-01
 *             notes: Monthly salary
 *     responses:
 *       201:
 *         description: Transaction created successfully
 */
router.post(
  "/",
  auth,
  role(["ADMIN"]),
  validate(createTransactionSchema),
  controller.create,
);

/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Get all transactions (with filters & pagination)
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           example: INCOME
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           example: Food
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           example: 2026-01-01
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           example: 2026-04-01
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *           example: 10
 *     responses:
 *       200:
 *         description: List of transactions
 */
router.get(
  "/",
  auth,
  role(["ADMIN", "ANALYST"]),
  validate(getTransactionsSchema),
  controller.getAll,
);

/**
 * @swagger
 * /api/transactions/{id}:
 *   get:
 *     summary: Get a transaction by ID
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transaction details
 *       404:
 *         description: Transaction not found
 */
router.get(
  "/:id",
  auth,
  role(["ADMIN", "ANALYST"]),
  validate(transactionIdParamSchema),
  controller.getById,
);

/**
 * @swagger
 * /api/transactions/{id}:
 *   patch:
 *     summary: Update a transaction (Admin only)
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *             amount: 7000
 *             category: Updated Category
 *     responses:
 *       200:
 *         description: Transaction updated
 */
router.patch(
  "/:id",
  auth,
  role(["ADMIN"]),
  validate(updateTransactionSchema),
  controller.update,
);

/**
 * @swagger
 * /api/transactions/{id}:
 *   delete:
 *     summary: Delete a transaction (Admin only)
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transaction deleted
 */
router.delete(
  "/:id",
  auth,
  role(["ADMIN"]),
  validate(transactionIdParamSchema),
  controller.delete,
);

module.exports = router;
