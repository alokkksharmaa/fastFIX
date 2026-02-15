import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    limit: 20
  },
  email: {
    type: string,
    unique: true,
    required: true
  },
  password: {
    type: string,
    unique: false,
    required: true
  }
})

module.exports = mongoose.model("Admin", adminSchema);