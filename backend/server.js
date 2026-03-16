const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// middleware
app.use(cors());
app.use(express.json());


// ✅ MongoDB connection (correct for new version)
mongoose.connect("mongodb://127.0.0.1:27017/skillmap");

mongoose.connection.once("open", () => {
  console.log("MongoDB connected");
});


// ✅ Schema
const SkillSchema = new mongoose.Schema({
  skill: String,
  demand: Number,
});

const Skill = mongoose.model("Skill", SkillSchema);


// ✅ Test route
app.get("/", (req, res) => {
  res.send("Backend running");
});


// ✅ Get data
app.get("/skills", async (req, res) => {
  try {
    const data = await Skill.find();
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});


// ✅ Add data
app.post("/skills", async (req, res) => {
  try {
    const skill = new Skill(req.body);
    await skill.save();
    res.json(skill);
  } catch (err) {
    res.status(500).json(err);
  }
});


// ✅ Start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});