const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const controller = require("../controllers/dashboard.controller");

const validate = require("../middleware/validate.middleware");
const { dashboardQuerySchema } = require("../validations/dashboard.validation");

/**
 * @swagger
 * /api/dashboard/summary:
 *   get:
 *     summary: Get total income, expenses and net balance
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Summary data
 */
router.get(
  "/summary",
  auth,
  role(["ADMIN", "ANALYST", "VIEWER"]),
  validate(dashboardQuerySchema),
  controller.getSummary,
);

/**
 * @swagger
 * /api/dashboard/category-wise:
 *   get:
 *     summary: Get category-wise breakdown of transactions
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Category-wise data
 */
router.get(
  "/category-wise",
  auth,
  role(["ADMIN", "ANALYST"]),
  validate(dashboardQuerySchema),
  controller.getCategoryWise,
);

/**
 * @swagger
 * /api/dashboard/trends:
 *   get:
 *     summary: Get monthly income and expense trends
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Monthly trends data
 */
router.get(
  "/trends",
  auth,
  role(["ADMIN", "ANALYST"]),
  validate(dashboardQuerySchema),
  controller.getTrends,
);

/**
 * @swagger
 * /api/dashboard/recent:
 *   get:
 *     summary: Get recent transactions
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Recent transactions
 */
router.get(
  "/recent",
  auth,
  role(["ADMIN", "ANALYST", "VIEWER"]),
  validate(dashboardQuerySchema),
  controller.getRecent,
);

module.exports = router;
