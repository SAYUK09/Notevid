import mongoose from "mongoose";
import { Decimal128 } from "mongodb";

const NotesSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    notes: {
      video: String,
      note: String,
      timestamp: Number,
      created_at: {
        type: Date,
        default: Date.now,
      },
    },

    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  { timeStamp: true }
);

export default mongoose.models.Notes || mongoose.model("Notes", NotesSchema);
