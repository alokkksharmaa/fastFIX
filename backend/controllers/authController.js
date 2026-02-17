import verifyToken from "../middleware/authMiddle";
import express from "express";
import jwt from 'jsonwebtoken';

const app = express();
const PORT = 3000;

app.use(express.json());


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:3000`);
})

// LOGIN USING JWT
app.post("/login", (req, res) => {
  const user = {
    id: 1,
    email: "admin@gmail.com",
    password: "123456",
    role: "ADMIN"
  };

  const { email, password } = req.body;

  if (email !== user.email || password !== user.password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    "SECRET_KEY",
    { expiresIn: "1h" }
  );

  res.json({ token });
});

app.get("/dashboard", verifyToken, (req, res) => {
  res.json({
    message: "Welcome" + req.username,
    role: req.user.role
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


const approve = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.status !== "pending") {
      return res.status(200).json({
        message: `Project already ${project.status}`,
      });
    }

    project.status = "approved";
    await project.save();

    return res.status(200).json({
      message: "Project approved successfully",
      project,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
};


export default {app, approve};