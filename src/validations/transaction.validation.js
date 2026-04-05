const { z } = require("zod");

exports.createTransactionSchema = z.object({
  body: z.object({
    amount: z.coerce.number().positive(),
    type: z.enum(["INCOME", "EXPENSE"]),
    category: z.string().min(1),
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),
    notes: z.string().optional(),
  }),
});

exports.updateTransactionSchema = z.object({
  body: z.object({
    amount: z.number().positive().optional(),
    type: z.enum(["INCOME", "EXPENSE"]).optional(),
    category: z.string().optional(),
    date: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
      })
      .optional(),
    notes: z.string().optional(),
  }),
});

exports.getTransactionsSchema = z.object({
  query: z.object({
    type: z.enum(["INCOME", "EXPENSE"]).optional(),
    category: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
  }),
});

exports.transactionIdParamSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});
