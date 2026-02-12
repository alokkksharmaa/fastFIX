import express from 'express'
import mongoose from 'mongoose';

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// db
mongoose.connect('mongodb://localhost:27017/')
  .then(() => console.log(" mongo db connected"));

// routes
app.get("/", (req, res) => {
  res.send("hello from home")
})

app.get("/about", (req, res) => {
  res.send("hello from about");
})

app.listen(PORT, () => {
  console.log("server is running")
});