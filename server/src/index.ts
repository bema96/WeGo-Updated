// src/app.ts
import "dotenv/config";
import express, { type ErrorRequestHandler } from "express";
import cors from "cors";
import path from "path";
import { v2 as cloudinary } from "cloudinary";


import health from "./routes/health";
import { authRoutes }    from "./routes/authRoutes";
import { userRoutes }    from "./routes/userRoutes";
import { tripRoutes }    from "./routes/tripRoutes";
import { bookingRoutes } from "./routes/bookingRoutes";
import { reviewRoutes }  from "./routes/reviewRoutes";
import { bagSizeRoutes } from "./routes/bagSizeRoutes";
import { slideRoutes }   from "./routes/slideRoutes";
import { contentRoutes } from "./routes/contentRoutes";

// Port
const port = Number(process.env.PORT) || 4000;

// Cloudinary
cloudinary.config(process.env.CLOUDINARY_URL as string);
console.log("cloud:", cloudinary.config().cloud_name); 

// App
const app = express();

// CORS
const allowed = ["http://localhost:3000", "https://wegorides.netlify.app"];
app.use(
  cors({
    origin(origin, cb) {
      if (!origin || allowed.includes(origin)) return cb(null, true);
      return cb(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const IMAGES_DIR = path.resolve(process.cwd(), "assets", "images");
app.use("/images", express.static(IMAGES_DIR));

// Routes 
app.use("/health", health);

app.use("/api/auth",     authRoutes);
app.use("/api/users",    userRoutes);
app.use("/api/trips",    tripRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reviews",  reviewRoutes);
app.use("/api/bagsizes", bagSizeRoutes);
app.use("/api/slides",   slideRoutes);
app.use("/api/content",  contentRoutes);

// Error handler
const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {

  res.status(500).json({ error: String(err?.message || err) });
};
app.use(errorHandler);

// Start
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
