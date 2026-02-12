import mongoose from "mongoose";

mongoose.connect('mongodb://localhost:27017/')
  .then(() => console.log("Db connected"))
  .catch((error) => console.log(error));

const adminSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
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