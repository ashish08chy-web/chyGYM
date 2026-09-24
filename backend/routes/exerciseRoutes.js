const express = require("express");
const Exercise = require("../models/Exercise");
const authMiddleware = require("../Middleware/authMiddleware");

const router = express.Router();

// ================= GET ALL EXERCISES =================

router.get("/", authMiddleware, async (req, res) => {
  try {
    const exercises = await Exercise.find().sort({
      name: 1,
    });

    res.status(200).json({
      exercises,
    });
  } catch (error) {
    console.error("Get Exercises Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});


// ================= ADD EXERCISE =================

router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      name,
      muscle,
      equipment,
      description,
    } = req.body;

    if (
      !name ||
      !muscle ||
      !equipment ||
      !description
    ) {
      return res.status(400).json({
        message: "Please fill all exercise fields",
      });
    }

    const exercise = await Exercise.create({
      name,
      muscle,
      equipment,
      description,
    });

    res.status(201).json({
      message: "Exercise added successfully",
      exercise,
    });
  } catch (error) {
    console.error("Add Exercise Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});


module.exports = router;