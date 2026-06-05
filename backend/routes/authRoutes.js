const express = require("express");

const router = express.Router();

const {
  syncUser,
  getMe,
} = require("../controllers/authController");

const verifyFirebaseToken =
require("../middleware/verifyFirebaseToken");

router.post(
"/sync-user",
verifyFirebaseToken,
syncUser
);

router.get(
"/me",
verifyFirebaseToken,
getMe
);

module.exports = router;