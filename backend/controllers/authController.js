import express from "express";
import jwt from 'jsonwebtoken';

const app = express();
const PORT = 3000;

app.use(express.json());


// VERIFY TOKEN Middleware
const verifyToken = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ message: "Token missing" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "SECRET_KEY");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};


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

export default app;