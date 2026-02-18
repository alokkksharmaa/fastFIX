import express from "express";
import multer from "multer";

const app = express();
const PORT = 3000;

const upload = multer({ dest: "uploads/" });

// upload single file
app.post("/upload", upload.single("image"), (req, res) => {
  res.json({ message: "File uploaded successfully" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
