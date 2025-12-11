import express from "express";
import { createBooking, getBooking } from "../controllers/bookingsController.js";

const router = express.Router();

// POST /api/bookings
router.post("/", createBooking);

// GET /api/bookings/:id
router.get("/:id", getBooking);

export default router;
