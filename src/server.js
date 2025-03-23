const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const morgan = require("morgan");
const sequelize = require("./config/database");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const contentRoutes = require("./routes/content.routes");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Security middleware
app.use(helmet());

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 15 minutes
  max: 250, // Limit each IP to 100 requests per window
  handler: (_req, res) => {
    res.status(429).json({
      success: false,
      message: "Too many requests, please try again later.",
    });
  },
});
app.use("/api", limiter);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/contents", contentRoutes);

// 404 Handler
app.use((_req, res) => {
  res.status(404).json({ success: false, message: "Not Found" });
});

// Error Handler
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

const port = process.env.PORT || 4000;

sequelize.sync().then(() => {
  console.log("Database connected");
  app.listen(port, () => console.log(`Server running on port ${port}`));
});
