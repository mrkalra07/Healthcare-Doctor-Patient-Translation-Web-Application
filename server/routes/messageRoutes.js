import express from "express";
import Message from "../models/Message.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const msgs = await Message.find().sort({ timestamp: 1 });
  res.json(msgs);
});

router.get("/search", async (req, res) => {
  const q = req.query.q;
  const msgs = await Message.find({
    $or: [
      { originalText: { $regex: q, $options: "i" } },
      { translatedText: { $regex: q, $options: "i" } }
    ]
  });
  res.json(msgs);
});

export default router;
