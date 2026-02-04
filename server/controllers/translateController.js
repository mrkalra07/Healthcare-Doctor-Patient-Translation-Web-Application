import axios from "axios";
import Message from "../models/Message.js";

export const translateText = async (req, res) => {
  const { senderRole, text, sourceLanguage, targetLanguage } = req.body;

  const response = await axios.get(
    `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      text
    )}&langpair=${sourceLanguage}|${targetLanguage}`
  );

  const translatedText = response.data.responseData.translatedText;

  const msg = await Message.create({
    senderRole,
    originalText: text,
    translatedText,
    targetLanguage
  });

  res.json(msg);
};
