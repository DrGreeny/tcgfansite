import mongoose from "mongoose";

const FaqSchema = new mongoose.Schema(
  {
    summary: {
      type: String,
      required: true,
      maxLength: 250,
    },
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
      maxLength: 100,
    },
    tags: [String],
  }
  // { timestamps: true }
);

export default mongoose.models.Faq || mongoose.model("Faq", FaqSchema);
