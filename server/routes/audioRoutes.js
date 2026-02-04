import express from "express";
import multer from "multer";
import Message from "../models/Message.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

router.post("/", upload.single("audio"), async (req, res) => {
  const audioUrl = `http://localhost:5000/uploads/${req.file.filename}`;
  const msg = await Message.create({ audioUrl });
  res.json(msg);
});

export default router;
