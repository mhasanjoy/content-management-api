const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if the user already exists
    const existingUser = await User.findOne({
      where: { email },
    });
    if (existingUser) {
      res.status(400).json({ success: false, message: "User already exists" });
      return;
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create a new user
    const user = await User.create({ name, email, password: hashedPassword });

    // remove password field before sending response
    const { password: _, ...userWithoutPassword } = user.get({ plain: true });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: userWithoutPassword,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Registration failed" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if the user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(401).json({ success: false, message: "Invalid credentials" });
      return;
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ success: false, message: "Invalid credentials" });
      return;
    }

    // generate access token
    const accessToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    // generate refresh token
    const refreshToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "30d" }
    );

    res.status(200).json({ success: true, accessToken, refreshToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Login failed" });
  }
};

const refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res
        .status(401)
        .json({ success: false, message: "Refresh token required" });
      return;
    }

    // verify the refresh token
    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET,
        (err, decoded) => {
          if (err) reject(new Error("Invalid refresh token"));
          resolve(decoded);
        }
      );
    });

    // create a new access token
    const newAccessToken = jwt.sign(
      { id: decoded.id, email: decoded.email },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.status(200).json({ success: true, accessToken: newAccessToken });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

// export the functions
module.exports = { register, login, refreshAccessToken };
