import Booking from "../models/Booking.js";

/**
 * Create new booking (public)
 */
export const createBooking = async (req, res, next) => {
  try {
    const { serviceType, name, phone, address, description, preferredDate, preferredTime, area } = req.body;
    if (!serviceType || !name || !phone || !address) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const booking = new Booking({
      serviceType, name, phone, address, description,
      preferredDate: preferredDate ? new Date(preferredDate) : undefined,
      preferredTime, area,
    });

    await booking.save();

    // TODO: notify admin/dispatcher via webhook / WhatsApp / SMS
    // Example: push to a dispatch queue.

    res.status(201).json({ success: true, bookingId: booking._id });
  } catch (err) {
    next(err);
  }
};

/**
 * Get single booking (public)
 */
export const getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ error: "Not found" });
    res.json({ booking });
  } catch (err) {
    next(err);
  }
};

/**
 * Admin: list bookings with optional filters
 */
export const listBookings = async (req, res, next) => {
  try {
    const { status, area, serviceType, limit = 200 } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (area) filter.area = area;
    if (serviceType) filter.serviceType = serviceType;

    const bookings = await Booking.find(filter).sort({ createdAt: -1 }).limit(parseInt(limit, 10));
    res.json({ bookings });
  } catch (err) {
    next(err);
  }
};

/**
 * Admin: update status or assign tech
 */
export const updateBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body; // { status, assignedTech }
    const booking = await Booking.findByIdAndUpdate(id, updates, { new: true });
    if (!booking) return res.status(404).json({ error: "Not found" });

    // Optional: notify customer/tech on status change

    res.json({ booking });
  } catch (err) {
    next(err);
  }
};
