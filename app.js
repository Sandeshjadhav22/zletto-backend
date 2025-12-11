import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import routesBookings from "./routes/bookings.js";
import routesAdmin from "./routes/admin.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());

// public API
app.use("/api/bookings", routesBookings);

// admin routes (protected inside route file)
app.use("/api/admin", routesAdmin);
 
// health
app.get("/api/health", (req, res) => res.json({ ok: true }));

// global error handler (simple)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || "Server error" });
});

export default app;
