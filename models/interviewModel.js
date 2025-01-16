import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    videoLink: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Enable timestamps (createdAt and updatedAt)
  }
);

const Interview = mongoose.model("Interview", interviewSchema);
export default Interview;
