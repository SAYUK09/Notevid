import mongoose from "mongoose";

const VideoHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    videoId: String,

    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  { timeStamp: true }
);

export default mongoose.models.VideoHistory ||
  mongoose.model("VideoHistory", VideoHistorySchema);
