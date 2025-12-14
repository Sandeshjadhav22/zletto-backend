import axios from "axios";

export async function notifyTelegram(booking) {
  try {
    const message = `
🆕 *New Booking Received*

🔧 Service: ${booking.serviceType}
👤 Name: ${booking.name}
📞 Phone: ${booking.phone}
📍 Area: ${booking.area || "N/A"}
📝 Notes: ${booking.description || "N/A"}
    `;

    await axios.post(
      `https://api.telegram.org/bot${process.env.TG_BOT_TOKEN}/sendMessage`,
      {
        chat_id: process.env.TG_CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }
    );
  } catch (err) {
    console.error("Telegram notification failed:", err.message);
  }
}
