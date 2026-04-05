const { z } = require("zod");

// reusable date validator
const dateSchema = z.string().refine((val) => !isNaN(Date.parse(val)), {
  message: "Invalid date format",
});

exports.dashboardQuerySchema = z.object({
  query: z
    .object({
      startDate: dateSchema.optional(),
      endDate: dateSchema.optional(),
    })
    .refine(
      (data) =>
        !data.startDate ||
        !data.endDate ||
        new Date(data.startDate) <= new Date(data.endDate),
      {
        message: "startDate must be before or equal to endDate",
        path: ["endDate"],
      },
    ),
});
