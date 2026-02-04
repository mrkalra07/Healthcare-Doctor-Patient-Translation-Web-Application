import Message from "../models/Message.js";

export const generateSummary = async (req, res) => {
  const messages = await Message.find().sort({ timestamp: 1 });

  const summary = messages
    .map(m => `${m.senderRole}: ${m.translatedText}`)
    .join("\n");

  res.json({ summary });
};
