// src/routes/auth.routes.js
const router = require("express").Router();
const controller = require("../controllers/auth.controller");

const validate = require("../middleware/validate.middleware");
const {
  registerSchema,
  loginSchema,
} = require("../validations/auth.validation");

const { authLimiter } = require("../middleware/rateLimit.middleware");

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: John
 *             email: john@example.com
 *             password: "12345678"
 *     responses:
 *       201:
 *         description: User created
 */
router.post(
  "/register",
  authLimiter,
  validate(registerSchema),
  controller.register,
);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             email: john@example.com
 *             password: "12345678"
 *     responses:
 *       200:
 *         description: Returns JWT token
 */
router.post("/login", authLimiter, validate(loginSchema), controller.login);

module.exports = router;
