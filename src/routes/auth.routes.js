const express = require("express");
const { login, register } = require("../controllers/auth.controller");
const { userRegisterSchema, loginSchema } = require("../schemas/auth.schemas");
const { validateInput } = require("../middlewares/validation.middleware");

const router = express.Router();

router.post("/register", validateInput(userRegisterSchema), register);
router.post("/login", validateInput(loginSchema), login);

module.exports = router;
