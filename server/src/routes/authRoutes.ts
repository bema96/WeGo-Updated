import { Router } from 'express';
import { Authenticate, getUserFromToken, refreshAccessToken, signup } from '../controllers/authController';
import { Authorize } from '../middleware/authMiddleware';

const router = Router();
router.post("/login", Authenticate);
router.post("/refresh", refreshAccessToken);
router.get("/verify", Authorize, getUserFromToken);
router.post("/signup", signup);

export const authRoutes = router;
