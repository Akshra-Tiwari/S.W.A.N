const express =
  require("express");

const router =
  express.Router();

const upload =
  require("../middleware/upload");

const validate =
  require("../middleware/validate");

const authMiddleware =
  require(
    "../middleware/authMiddleware"
  );

const requireRole =
  require(
    "../middleware/requireRole"
  );

const {
  createReport,
  getReports,
  getSingleReport,
  updateReportStatus,
  deleteReport,
} = require(
  "../controllers/reportController"
);

const {
  createReportSchema,
  updateStatusSchema,
} = require(
  "../validators/reportValidator"
);

router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  validate(
    createReportSchema
  ),
  createReport
);

router.get(
  "/",
  getReports
);

router.put(
  "/:id/status",
  authMiddleware,
  requireRole(
    "admin",
    "moderator"
  ),
  validate(
    updateStatusSchema
  ),
  updateReportStatus
);

router.get(
  "/:id",
  getSingleReport
);

router.delete(
  "/:id",
  authMiddleware,
  requireRole("admin"),
  deleteReport
);

module.exports =
  router;