const admin = require(
  "../config/firebaseAdmin"
);

const User = require(
  "../models/User"
);

const authMiddleware =
  async (
    req,
    res,
    next
  ) => {
    try {
      const authHeader =
        req.headers.authorization;

      if (
        !authHeader ||
        !authHeader.startsWith(
          "Bearer "
        )
      ) {
        return res
          .status(401)
          .json({
            success: false,
            message:
              "No token provided",
          });
      }

      const token =
        authHeader.split(
          " "
        )[1];

      const decoded =
        await admin
          .auth()
          .verifyIdToken(
            token
          );

      const user =
        await User.findOne({
          uid: decoded.uid,
        });

      if (!user) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "User not found",
          });
      }

      req.user = user;

      next();
    } catch (error) {
      return res
        .status(401)
        .json({
          success: false,
          message:
            "Unauthorized",
        });
    }
  };

module.exports =
  authMiddleware;