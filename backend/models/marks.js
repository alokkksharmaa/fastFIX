import mongoose from "mongoose";

const marksSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  maths: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  science: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  }
}, { timestamps: true });

export default mongoose.model("Marks", marksSchema);
