const express = require("express");
const Workout = require("../models/workout");
const authMiddleware = require("../Middleware/authMiddleware");

const router = express.Router();

// ================= ADD WORKOUT =================


router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      name,
      duration,
      calories,
      date,
      exercises,
    } = req.body;

    if (!name || !duration || !calories) {
      return res.status(400).json({
        message: "Please fill all workout fields",
      });
    }

    const workout = await Workout.create({
      user: req.user.userId,
      name,
      duration,
      calories,
      date: date || Date.now(),
      exercises: exercises || [],
    });

    res.status(201).json({
      message: "Workout added successfully",
      workout,
    });
  } catch (error) {
    console.error("Add Workout Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});


// ================= GET MY WORKOUTS =================

router.get("/", authMiddleware, async (req, res) => {
  try {
    const userWorkouts = await Workout.find({
  user: req.user.userId,
})
  .populate("exercises.exercise")
  .sort({
    date: -1,
  });
    res.status(200).json({
      Workout: userWorkouts,
      workouts: userWorkouts,
    });
  } catch (error) {
    console.error("Get Workout Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});


// ================= DELETE WORKOUT =================

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deletedWorkout = await Workout.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!deletedWorkout) {
      return res.status(404).json({
        message: "Workout not found",
      });
    }

    res.status(200).json({
      message: "Workout deleted successfully",
      workout: deletedWorkout,
    });
  } catch (error) {
    console.error("Delete Workout Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;