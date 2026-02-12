import express from 'express';
import mongoose from 'mongoose';
import User from './schema/user.js';
// import Admin from './schema/admin.js'

const app = express();
const PORT = 3000;
const DB_URL = "mongodb://localhost:27017/backend";

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("hello from home");
});


// post 
app.post("/api/users", async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// get
app.get("/api/users/:id", async (req, res) => {
  try {
    const users = await User.findById();
    res.status(200).json(users)
  } catch (error) {
    res.status(400).json(error);
  }
})

// put
app.put("/api/users/:id", async (req, res) => {
  try {
    const updateuser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true })
    res.status(200).json(updateuser)
  } catch (error) {
    res.status(404).json(error);
  }
})


// delete
app.delete("/api/users/:id", async (req, res) =>{
  try{
    const deleteUser  = await User.findByIdAndDelete(req.params.id);
    res.status(200).json(deleteUser);
  }catch(error){
    res.status(400).json({ message: error.message });
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
