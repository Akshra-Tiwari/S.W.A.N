const { z } =
require("zod");

const loginSchema =
z.object({
  uid: z.string(),

  email:
    z.string().email(),

  name:
    z.string().optional(),
});

module.exports = {
  loginSchema,
};