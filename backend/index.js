import express from 'express';
import mongoose from 'mongoose';
import User from './schema/user.js';
import user from './schema/user.js';
// import Admin from './schema/admin.js';

const app = express();
const PORT = 3000;
const DB_URL = "mongodb://localhost:27017/backend";

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("hello from home");
});


// Create User
app.post("/api/users", async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users)
  } catch (error) {
    res.status(400).json(error);
  }
})


// app.post("/api/admin", async (req, res) => {
//   try {
//     const newAmdin = await Admin.create(req.body);
//     res.status(201).json(newAmdin);
//   } catch (error) {
//     res.status(400).json({ message: error.message })
//   }
// })

// DB Connection + Server Start
mongoose.connect(DB_URL)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
