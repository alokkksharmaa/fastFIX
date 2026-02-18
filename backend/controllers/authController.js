import express from "express";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/authMiddle.js";
import Project from "../models/Project.js";

const app = express();
const PORT = 3000;
const SECRET_KEY = "SECRET_KEY";

app.use(express.json());

/* ---------------- LOGIN ---------------- */
app.post("/login", (req, res) => {
  const user = {
    id: 1,
    email: "admin@gmail.com",
    password: "123456",
    role: "ADMIN",
  };

  const { email, password } = req.body;

  if (email !== user.email || password !== user.password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    SECRET_KEY,
    { expiresIn: "1h" }
  );

  res.json({ token });
});

/* ---------------- DASHBOARD ---------------- */
app.get("/dashboard", verifyToken, (req, res) => {
  res.json({
    message: `Welcome ${req.user.id}`,
    role: req.user.role,
  });
});

/* ---------------- APPROVE PROJECT ---------------- */
app.patch("/approve/:id", verifyToken, async (req, res) => {
  try {
    // optional: allow only ADMIN
    if (req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Access denied" });
    }

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

    res.json({
      message: "Project approved successfully",
      project,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

/* ---------------- SERVER ---------------- */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});