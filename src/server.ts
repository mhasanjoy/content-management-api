import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import sequelize from "./config/database";
// import authRoutes from "./routes/auth.routes";
// import userRoutes from "./routes/user.routes";
// import contentRoutes from "./routes/content.routes";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// security middleware
app.use(helmet());

// rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  handler: (_req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message: "Too many requests, please try again later.",
    });
  },
});
app.use("/api", limiter);

// routes
// app.use("/auth", authRoutes);
// app.use("/users", userRoutes);
// app.use("/content", contentRoutes);

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ success: false, message: "Not Found" });
});

// Error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

const port = process.env.PORT || 4000;

sequelize.sync().then(() => {
  console.log("Database connected");
  app.listen(port, () => console.log(`Server running on port ${port}`));
});
