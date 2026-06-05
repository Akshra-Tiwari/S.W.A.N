const { z } =
  require("zod");

const createReportSchema =
  z.object({
    title: z
      .string()
      .min(
        5,
        "Title must be at least 5 characters"
      ),

    description: z
      .string()
      .min(
        10,
        "Description must be at least 10 characters"
      ),

    address: z
      .string()
      .min(
        3,
        "Address is required"
      ),

    latitude:
      z.coerce.number(),

    longitude:
      z.coerce.number(),

    reportedBy:
      z.string(),
  });

const updateStatusSchema =
  z.object({
    status: z.enum([
      "pending",
      "under_review",
      "resolved",
      "rejected",
    ]),
  });

module.exports = {
  createReportSchema,
  updateStatusSchema,
};
