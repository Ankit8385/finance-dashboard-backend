const { z } = require("zod");

exports.updateUserSchema = z.object({
  body: z.object({
    role: z.enum(["ADMIN", "ANALYST", "VIEWER"]).optional(),
    status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
  }),
});

exports.userIdParamSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});
