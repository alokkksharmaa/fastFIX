import mongoose from "mongoose";

const SuperAdminSchema = new mongoose.Schema({
  name: {
    type: String,
  }
})


export default mongoose.model("SuperAdmin", SuperAdminSchema);
