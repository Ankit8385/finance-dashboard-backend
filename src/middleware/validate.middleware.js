const { ZodError } = require("zod");

module.exports = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    next();
  } catch (err) {
    if (err instanceof ZodError) {
      const formattedErrors = err.issues.map((e) => ({
        field: e.path.slice(1).join("."), // removes "body"
        message: e.message,
      }));

      return res.status(400).json({
        message: "Validation Error",
        errors: formattedErrors,
      });
    }

    return res.status(500).json({
      message: err.message || "Internal Server Error",
    });
  }
};
