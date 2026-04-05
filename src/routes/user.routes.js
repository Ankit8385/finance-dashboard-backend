const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const controller = require("../controllers/user.controller");

const validate = require("../middleware/validate.middleware");
const {
  updateUserSchema,
  userIdParamSchema,
} = require("../validations/user.validation");

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             example:
 *               - id: "4e0bb4cf-df17-45c3-8437-fc9ee57feb9a"
 *                 name: "User A"
 *                 email: "userA@test.com"
 *                 role: "ADMIN"
 *                 status: "ACTIVE"
 *                 createdAt: "2026-04-02T11:49:17.605Z"
 *               - id: "6d3067ee-9b2b-4f8f-bdbd-9298b5dd02f7"
 *                 name: "User B"
 *                 email: "userB@test.com"
 *                 role: "ADMIN"
 *                 status: "ACTIVE"
 *                 createdAt: "2026-04-02T11:51:13.631Z"
 */
router.get("/", auth, role(["ADMIN"]), controller.getAll);

/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     summary: Update user role or status (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *           example: 6d3067ee-9b2b-4f8f-bdbd-9298b5dd02f7
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             role: ANALYST
 *             status: INACTIVE
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             example:
 *               id: "6d3067ee-9b2b-4f8f-bdbd-9298b5dd02f7"
 *               name: "User B"
 *               email: "userB@test.com"
 *               password: "$2b$10$fVkCI9JtGKkVJaKuAdMtve0T/0JvY2lazAq/1FdDEYTcMF9rvoS3W"
 *               role: "ANALYST"
 *               status: "INACTIVE"
 *               createdAt: "2026-04-02T11:51:13.631Z"
 *       404:
 *         description: User not found
 */
router.patch(
  "/:id",
  auth,
  role(["ADMIN"]),
  validate(updateUserSchema),
  controller.update,
);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete user (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID to delete
 *         schema:
 *           type: string
 *           example: 6d3067ee-9b2b-4f8f-bdbd-9298b5dd02f7
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "User deleted successfully"
 *       404:
 *         description: User not found
 */
router.delete(
  "/:id",
  auth,
  role(["ADMIN"]),
  validate(userIdParamSchema),
  controller.delete,
);

module.exports = router;
