import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { uploadRoutes } from './cloudinary/uploads';
import { userRoutes } from './routes/userRoutes';
import { authRoutes } from './routes/authRoutes';
import { tripRoutes } from './routes/tripRoutes';
import { bookingRoutes } from './routes/bookingRoutes';
import { reviewRoutes } from './routes/reviewRoutes';
import { bagSizeRoutes } from './routes/bagSizeRoutes';
import { slideRoutes } from './routes/slideRoutes';
import { contentRoutes } from './routes/contentRoutes';

dotenv.config();
const port = process.env.PORT || 4000

const app = express();

const allowed = [
  'https://wegorides.netlify.app',
  'http://localhost:3000',
];
app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);           
    if (allowed.includes(origin) || /\.railway\.app$/.test(origin)) return cb(null, true);
    cb(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

const IMAGES_DIR = path.resolve(process.cwd(), "assets", "images");
app.use("/images", express.static(IMAGES_DIR));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/api/uploads', uploadRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/bagsizes', bagSizeRoutes);
app.use('/api/slides', slideRoutes);
app.use('/api/content', contentRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});