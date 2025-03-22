const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserProfileForLoggedInUser,
  getUserProfileForPublic,
  updateUserProfile,
} = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const { validateInput } = require("../middlewares/validation.middleware");
const { userUpdateSchema } = require("../schemas/user.schemas");

router.get("/", getAllUsers);
router.get("/profile", authMiddleware, getUserProfileForLoggedInUser);
router.get("/:id", getUserProfileForPublic);
router.put(
  "/profile",
  authMiddleware,
  validateInput(userUpdateSchema),
  updateUserProfile
);

module.exports = router;
