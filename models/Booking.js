import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  serviceType: { type: String, required: true }, // electrician, plumbing, etc.
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  description: { type: String },
  preferredDate: { type: Date }, // optional
  preferredTime: { type: String }, // optional
  status: { type: String, default: "pending" }, // pending, assigned, on-the-way, completed, cancelled
  assignedTech: {
    id: String,
    name: String,
    phone: String,
  },
  etaPromiseMinutes: { type: Number, default: 20 },
  area: { type: String }, // helps routing
}, { timestamps: true });

export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
