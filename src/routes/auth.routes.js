const express = require("express");
const {
  login,
  refreshAccessToken,
  register,
} = require("../controllers/auth.controller");
const {
  userRegisterSchema,
  refreshTokenSchema,
  loginSchema,
} = require("../schemas/auth.schemas");
const { validateInput } = require("../middlewares/validation.middleware");

const router = express.Router();

router.post("/register", validateInput(userRegisterSchema), register);
router.post("/login", validateInput(loginSchema), login);
router.post(
  "/refresh-token",
  validateInput(refreshTokenSchema),
  refreshAccessToken
);

module.exports = router;
