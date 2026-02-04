import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import translateRoutes from "./routes/translateRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import audioRoutes from "./routes/audioRoutes.js";
import summaryRoutes from "./routes/summaryRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/translate", translateRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/audio", audioRoutes);
app.use("/api/summary", summaryRoutes);

app.get("/", (req, res) => res.send("API running"));

app.listen(5000, () => console.log("Server running on 5000"));
