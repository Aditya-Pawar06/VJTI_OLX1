const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());

// ✅ Allow your Vercel frontend + Railway backend
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://vjti-olx-1.vercel.app" // <-- your live frontend URL
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Import routes
const userRoute = require("./routes/Userapi");
const productRoute = require("./routes/Product");

// ✅ Use environment variable instead of hardcoding URI
const uri = process.env.MONGO_URI;

// ✅ Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    console.log("❌ MongoDB Connection Failed:", err.message);
    process.exit(1);
  }
};
connectDB();

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API routes
app.use("/api", userRoute);
app.use("/api/p1", productRoute);

// ✅ Nodemailer setup using environment variables
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ Send email function
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"VJTI OLX" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });
    console.log("📧 Email sent: " + info.response);
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
  }
};

// ✅ Email API endpoint
app.post("/sendEmail", async (req, res) => {
  const { to, subject, text, html } = req.body;

  if (!to || !subject || !text) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    await sendEmail(to, subject, text, html);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send email", error: error.message });
  }
});

// ✅ Use dynamic port from Railway
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
