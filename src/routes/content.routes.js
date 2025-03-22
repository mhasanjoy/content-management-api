const express = require("express");
const router = express.Router();
const {
  createContent,
  updateContent,
  deleteContent,
} = require("../controllers/content.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const { validateInput } = require("../middlewares/validation.middleware");
const {
  createContentSchema,
  updateContentSchema,
} = require("../schemas/content.schemas");

router.post(
  "/",
  authMiddleware,
  validateInput(createContentSchema),
  createContent
);
router.put(
  "/:id",
  authMiddleware,
  validateInput(updateContentSchema),
  updateContent
);
router.delete("/:id", authMiddleware, deleteContent);

module.exports = router;
