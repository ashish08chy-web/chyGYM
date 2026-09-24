import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Dumbbell,
  Heart,
  Plus,
  X,
  Loader2,
  CheckCircle,
} from "lucide-react";

const Exercises = () => {
  // ================= STATES =================

  const [exercises, setExercises] = useState([]);

  const [search, setSearch] = useState("");

  const [selectedMuscle, setSelectedMuscle] = useState("All");

  const [favorites, setFavorites] = useState([]);

  const [selectedExercise, setSelectedExercise] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // ================= ADD TO WORKOUT STATES =================

  const [workoutModal, setWorkoutModal] = useState(false);

  const [workoutExercise, setWorkoutExercise] = useState(null);

  const [workoutName, setWorkoutName] = useState("");

  const [duration, setDuration] = useState("");

  const [calories, setCalories] = useState("");

  const [sets, setSets] = useState(3);

  const [reps, setReps] = useState(10);

  const [weight, setWeight] = useState(0);

  const [savingWorkout, setSavingWorkout] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

  const [workoutError, setWorkoutError] = useState("");

  // ================= FETCH EXERCISES =================

  const fetchExercises = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login first.");
        return;
      }

      const response = await fetch("http://localhost:5000/api/exercises", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Unable to load exercises.");
        return;
      }

      setExercises(data.exercises || []);
    } catch (error) {
      console.error("Exercise Fetch Error:", error);

      setError("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  // ================= LOAD =================

  useEffect(() => {
    fetchExercises();
  }, []);

  // ================= MUSCLE LIST =================

  const muscles = useMemo(() => {
    const uniqueMuscles = [
      ...new Set(exercises.map((exercise) => exercise.muscle)),
    ];

    return ["All", ...uniqueMuscles];
  }, [exercises]);

  // ================= FILTER =================

  const filteredExercises = useMemo(() => {
    return exercises.filter((exercise) => {
      const matchesSearch = exercise.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesMuscle =
        selectedMuscle === "All" || exercise.muscle === selectedMuscle;

      return matchesSearch && matchesMuscle;
    });
  }, [exercises, search, selectedMuscle]);

  // ================= FAVORITE =================

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      if (prev.includes(id)) {
        return prev.filter((exerciseId) => exerciseId !== id);
      }

      return [...prev, id];
    });
  };

  // ================= OPEN WORKOUT MODAL =================

  const handleAddToWorkout = (exercise) => {
    setWorkoutExercise(exercise);

    setWorkoutName(`${exercise.name} Workout`);

    setDuration("");

    setCalories("");

    setSets(3);

    setReps(10);

    setWeight(0);

    setWorkoutError("");

    setSuccessMessage("");

    setWorkoutModal(true);
  };

  // ================= SAVE WORKOUT =================

  const handleSaveWorkout = async (e) => {
    e.preventDefault();

    try {
      setSavingWorkout(true);
      setWorkoutError("");
      setSuccessMessage("");

      const token = localStorage.getItem("token");

      if (!token) {
        setWorkoutError("Please login first.");
        return;
      }

      if (!workoutName || !duration || !calories) {
        setWorkoutError("Please fill workout name, duration and calories.");
        return;
      }

      const response = await fetch("http://localhost:5000/api/workout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: workoutName,
          duration: Number(duration),
          calories: Number(calories),

          exercises: [
            {
              exercise: workoutExercise._id,
              sets: Number(sets),
              reps: Number(reps),
              weight: Number(weight),
            },
          ],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setWorkoutError(data.message || "Unable to save workout.");
        return;
      }

      setSuccessMessage("Workout added successfully! 💪");

      setTimeout(() => {
        setWorkoutModal(false);
        setSuccessMessage("");
      }, 1200);
    } catch (error) {
      console.error("Save Workout Error:", error);

      setWorkoutError("Unable to connect to server.");
    } finally {
      setSavingWorkout(false);
    }
  };

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <Loader2
            size={40}
            className="text-blue-600 animate-spin mx-auto mb-4"
          />

          <p className="text-gray-500">Loading exercises...</p>
        </div>
      </div>
    );
  }

  // ================= ERROR =================

  if (error) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="bg-white border border-red-100 rounded-2xl p-8 text-center max-w-md">
          <Dumbbell size={45} className="text-red-500 mx-auto mb-4" />

          <h2 className="text-xl font-bold text-gray-900">
            Unable to Load Exercises
          </h2>

          <p className="text-gray-500 mt-2">{error}</p>

          <button
            onClick={() => {
              setLoading(true);
              setError("");
              fetchExercises();
            }}
            className="mt-5 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}

      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Exercises
        </h1>

        <p className="text-gray-500 mt-1">
          Explore exercises and build your workout
        </p>
      </div>

      {/* ================= SEARCH ================= */}

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
        <div className="relative">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search exercises..."
            className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* ================= MUSCLE FILTER ================= */}

      <div className="flex gap-2 overflow-x-auto pb-2">
        {muscles.map((muscle) => (
          <button
            key={muscle}
            onClick={() => setSelectedMuscle(muscle)}
            className={`px-4 py-2.5 rounded-xl whitespace-nowrap text-sm font-semibold transition ${
              selectedMuscle === muscle
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {muscle}
          </button>
        ))}
      </div>

      {/* ================= RESULT ================= */}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Exercise Library</h2>

          <p className="text-sm text-gray-500 mt-1">
            {filteredExercises.length} exercises found
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
          <Dumbbell size={18} />
          {favorites.length} favorites
        </div>
      </div>

      {/* ================= EXERCISE GRID ================= */}

      {filteredExercises.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-2xl p-10 text-center">
          <Search size={42} className="mx-auto text-gray-300 mb-3" />

          <h3 className="font-bold text-gray-900">No exercises found</h3>

          <p className="text-gray-500 text-sm mt-1">
            Try another exercise name or muscle group.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredExercises.map((exercise) => (
            <div
              key={exercise._id}
              className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden"
            >
              {/* CARD IMAGE AREA */}

              <div className="h-36 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
                <Dumbbell size={55} className="text-blue-500" />
              </div>

              {/* CARD CONTENT */}

              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">
                      {exercise.name}
                    </h3>

                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-semibold">
                        {exercise.muscle}
                      </span>

                      <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-semibold">
                        {exercise.equipment}
                      </span>
                    </div>
                  </div>

                  {/* FAVORITE */}

                  <button
                    onClick={() => toggleFavorite(exercise._id)}
                    className={`p-2 rounded-lg transition ${
                      favorites.includes(exercise._id)
                        ? "bg-red-50 text-red-500"
                        : "bg-gray-50 text-gray-400 hover:text-red-500"
                    }`}
                  >
                    <Heart
                      size={19}
                      fill={
                        favorites.includes(exercise._id)
                          ? "currentColor"
                          : "none"
                      }
                    />
                  </button>
                </div>

                <p className="text-sm text-gray-500 mt-4 line-clamp-2">
                  {exercise.description}
                </p>

                {/* ACTIONS */}

                <div className="flex gap-2 mt-5">
                  <button
                    onClick={() => setSelectedExercise(exercise)}
                    className="flex-1 px-3 py-2.5 border border-gray-200 hover:bg-gray-50 rounded-xl text-sm font-semibold text-gray-700 transition"
                  >
                    Details
                  </button>

                  <button
                    onClick={() => handleAddToWorkout(exercise)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition"
                  >
                    <Plus size={17} />
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= DETAILS MODAL ================= */}

      {selectedExercise && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden">
            {/* MODAL HEADER */}

            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Dumbbell size={21} className="text-blue-600" />
                </div>

                <div>
                  <h2 className="font-bold text-gray-900">
                    {selectedExercise.name}
                  </h2>

                  <p className="text-sm text-gray-500">
                    {selectedExercise.muscle}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedExercise(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            {/* MODAL CONTENT */}

            <div className="p-6">
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-blue-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500">Muscle</p>

                  <p className="font-bold text-blue-600 mt-1">
                    {selectedExercise.muscle}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500">Equipment</p>

                  <p className="font-bold text-gray-800 mt-1">
                    {selectedExercise.equipment}
                  </p>
                </div>
              </div>

              <h3 className="font-bold text-gray-900 mb-2">
                About this exercise
              </h3>

              <p className="text-gray-500 text-sm leading-6">
                {selectedExercise.description}
              </p>

              <button
                onClick={() => {
                  setSelectedExercise(null);
                  handleAddToWorkout(selectedExercise);
                }}
                className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition"
              >
                <Plus size={18} />
                Add to Workout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= ADD TO WORKOUT MODAL ================= */}

      {workoutModal && workoutExercise && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden">
            {/* HEADER */}

            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Add to Workout
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  {workoutExercise.name}
                </p>
              </div>

              <button
                onClick={() => setWorkoutModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            {/* FORM */}

            <form onSubmit={handleSaveWorkout} className="p-6 space-y-4">
              {/* WORKOUT NAME */}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Workout Name
                </label>

                <input
                  type="text"
                  value={workoutName}
                  onChange={(e) => setWorkoutName(e.target.value)}
                  placeholder="e.g. Chest Workout"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* DURATION + CALORIES */}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Duration (min)
                  </label>

                  <input
                    type="number"
                    min="1"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="45"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Calories
                  </label>

                  <input
                    type="number"
                    min="1"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                    placeholder="300"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* SETS + REPS */}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Sets
                  </label>

                  <input
                    type="number"
                    min="1"
                    value={sets}
                    onChange={(e) => setSets(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Reps
                  </label>

                  <input
                    type="number"
                    min="1"
                    value={reps}
                    onChange={(e) => setReps(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* WEIGHT */}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Weight (kg)
                </label>

                <input
                  type="number"
                  min="0"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="0"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* ERROR */}

              {workoutError && (
                <div className="bg-red-50 border border-red-100 text-red-600 rounded-xl px-4 py-3 text-sm">
                  {workoutError}
                </div>
              )}

              {/* SUCCESS */}

              {successMessage && (
                <div className="flex items-center gap-2 bg-green-50 border border-green-100 text-green-600 rounded-xl px-4 py-3 text-sm font-semibold">
                  <CheckCircle size={18} />
                  {successMessage}
                </div>
              )}

              {/* SAVE BUTTON */}

              <button
                type="submit"
                disabled={savingWorkout}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white rounded-xl font-semibold transition"
              >
                {savingWorkout ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Plus size={18} />
                    Save Workout
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Exercises;
