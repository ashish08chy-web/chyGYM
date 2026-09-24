import { useEffect, useState } from "react";
import {
  Dumbbell,
  Plus,
  Trash2,
  Clock,
  Flame,
  CalendarDays,
} from "lucide-react";

const Workout = () => {
  const [workouts, setWorkouts] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    duration: "",
    calories: "",
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // ================= GET WORKOUTS =================

  const fetchWorkouts = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/workout", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to fetch workouts");
        return;
      }

      setWorkouts(data.workouts || data.Workout || []);
    } catch (error) {
      console.error("Fetch Workout Error:", error);
    } finally {
      setFetching(false);
    }
  };

  // ================= LOAD WORKOUTS =================

  useEffect(() => {
    fetchWorkouts();
  }, []);

  // ================= HANDLE INPUT =================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= ADD WORKOUT =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.duration || !formData.calories) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/workout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          duration: Number(formData.duration),
          calories: Number(formData.calories),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to add workout");
        return;
      }

      alert("Workout added successfully! 💪");

      setFormData({
        name: "",
        duration: "",
        calories: "",
      });

      // Refresh workout list
      fetchWorkouts();
    } catch (error) {
      console.error("Add Workout Error:", error);

      alert("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  // ================= DELETE WORKOUT =================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this workout?",
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:5000/api/workout/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to delete workout");
        return;
      }

      alert("Workout deleted successfully");

      fetchWorkouts();
    } catch (error) {
      console.error("Delete Workout Error:", error);

      alert("Unable to connect to server.");
    }
  };

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}

      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Workouts
        </h1>

        <p className="text-gray-500 mt-1">Track and manage your workouts</p>
      </div>

      {/* ================= ADD WORKOUT ================= */}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
            <Dumbbell className="text-blue-600" size={22} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900">Add Workout</h2>

            <p className="text-sm text-gray-500">Record your workout session</p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {/* Workout Name */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Workout Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Chest Workout"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Duration */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration (minutes)
            </label>

            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="e.g. 60"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Calories */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Calories
            </label>

            <input
              type="number"
              name="calories"
              value={formData.calories}
              onChange={handleChange}
              placeholder="e.g. 450"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Button */}

          <div className="md:col-span-3">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-xl transition cursor-pointer"
            >
              <Plus size={19} />

              {loading ? "Adding..." : "Add Workout"}
            </button>
          </div>
        </form>
      </div>

      {/* ================= WORKOUT LIST ================= */}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900">My Workouts</h2>

            <p className="text-sm text-gray-500">Your workout history</p>
          </div>

          <div className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-semibold">
            {workouts.length} {workouts.length === 1 ? "Workout" : "Workouts"}
          </div>
        </div>

        {fetching ? (
          <div className="text-center py-10 text-gray-500">
            Loading workouts...
          </div>
        ) : workouts.length === 0 ? (
          <div className="text-center py-10">
            <Dumbbell size={40} className="mx-auto text-gray-300 mb-3" />

            <p className="text-gray-500">No workouts added yet.</p>

            <p className="text-sm text-gray-400 mt-1">
              Add your first Workout above.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {workouts.map((item) => (
              <div
                key={item._id}
                className="border border-gray-100 rounded-xl p-4 hover:shadow-sm transition"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Workout Info */}

                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                      <Dumbbell size={20} className="text-blue-600" />
                    </div>

                    <div>
                      <h3 className="font-bold text-gray-900">{item.name}</h3>

                      <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {item.duration} min
                        </span>

                        <span className="flex items-center gap-1">
                          <Flame size={14} />
                          {item.calories} kcal
                        </span>

                        <span className="flex items-center gap-1">
                          <CalendarDays size={14} />

                          {new Date(item.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Delete */}

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="self-start md:self-auto p-2.5 text-red-500 hover:bg-red-50 rounded-lg transition cursor-pointer"
                    title="Delete Workout"
                  >
                    <Trash2 size={19} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Workout;
