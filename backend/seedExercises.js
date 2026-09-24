const dotenv = require("dotenv");
const mongoose = require("mongoose");

const connectDB = require("./config/db");
const Exercise = require("./models/Exercise");

dotenv.config();

const exercises = [
  {
    name: "Bench Press",
    muscle: "Chest",
    equipment: "Barbell",
    description:
      "A classic chest exercise that targets the chest, shoulders, and triceps.",
  },
  {
    name: "Incline Dumbbell Press",
    muscle: "Chest",
    equipment: "Dumbbells",
    description:
      "An upper chest exercise performed using dumbbells on an incline bench.",
  },
  {
    name: "Squats",
    muscle: "Legs",
    equipment: "Barbell",
    description:
      "A compound lower-body exercise that mainly targets the quadriceps and glutes.",
  },
  {
    name: "Leg Press",
    muscle: "Legs",
    equipment: "Machine",
    description:
      "A machine-based exercise that targets the quadriceps, hamstrings, and glutes.",
  },
  {
    name: "Deadlift",
    muscle: "Back",
    equipment: "Barbell",
    description:
      "A compound exercise that works the back, hamstrings, glutes, and core.",
  },
  {
    name: "Lat Pulldown",
    muscle: "Back",
    equipment: "Cable Machine",
    description:
      "An upper-body pulling exercise that primarily targets the latissimus dorsi.",
  },
  {
    name: "Shoulder Press",
    muscle: "Shoulders",
    equipment: "Dumbbells",
    description:
      "An overhead pressing exercise that targets the shoulders and triceps.",
  },
  {
    name: "Lateral Raises",
    muscle: "Shoulders",
    equipment: "Dumbbells",
    description:
      "An isolation exercise that mainly targets the side deltoids.",
  },
  {
    name: "Bicep Curl",
    muscle: "Arms",
    equipment: "Dumbbells",
    description:
      "A simple isolation exercise designed to strengthen the biceps.",
  },
  {
    name: "Tricep Pushdown",
    muscle: "Arms",
    equipment: "Cable Machine",
    description:
      "A cable exercise that focuses on the triceps.",
  },
  {
    name: "Plank",
    muscle: "Core",
    equipment: "Bodyweight",
    description:
      "A core stability exercise that strengthens the abdominal muscles.",
  },
  {
    name: "Mountain Climbers",
    muscle: "Core",
    equipment: "Bodyweight",
    description:
      "A dynamic bodyweight exercise that works the core and improves fitness.",
  },
];

const seedExercises = async () => {
  try {
    await connectDB();

    console.log("Database connection successful ✅");

    const count = await Exercise.countDocuments();

    if (count > 0) {
      console.log(`Exercises already exist: ${count}`);
      process.exit(0);
    }

    await Exercise.insertMany(exercises);

    console.log(
      `${exercises.length} exercises added successfully ✅`
    );

    process.exit(0);
  } catch (error) {
    console.error("Seed Error ❌");
    console.error(error.message);

    process.exit(1);
  }
};

seedExercises();