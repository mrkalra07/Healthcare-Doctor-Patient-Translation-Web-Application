import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  senderRole: String,
  originalText: String,
  translatedText: String,
  targetLanguage: String,
  audioUrl: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Message", messageSchema);
