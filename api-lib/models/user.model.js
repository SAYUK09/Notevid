import { Decimal128 } from "mongodb";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  details: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    photo: { type: String, required: true },
    uid: { type: String, required: true },
  },
  videos: [
    {
      url: String,
      notes: [{ note: String, time: Decimal128 }],
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
