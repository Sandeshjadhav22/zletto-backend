import express from "express";
import { requireAuth } from "../middleware/auth.js";
import { listBookings, updateBooking } from "../controllers/bookingsController.js";
import { login } from "../controllers/authController.js";

const router = express.Router();

// auth
router.post("/login", login); // public: returns JWT

// protected admin endpoints
router.use(requireAuth);

// GET /api/admin/bookings
router.get("/bookings", listBookings);

// PUT /api/admin/bookings/:id
router.put("/bookings/:id", updateBooking);

export default router;
