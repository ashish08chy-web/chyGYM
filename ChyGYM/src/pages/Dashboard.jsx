import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Dumbbell,
  Flame,
  Target,
  TrendingUp,
  CalendarDays,
  Clock,
  ArrowRight,
  Play,
  Activity,
  User,
  AlertCircle,
} from "lucide-react";

const Dashboard = () => {
  // ================= USER STATE =================

  const [user, setUser] = useState(null);

  // ================= WORKOUT STATE =================

  const [workouts, setWorkouts] = useState([]);

  // ================= LOADING / ERROR =================

  const [loading, setLoading] = useState(true);
  const [workoutLoading, setWorkoutLoading] = useState(true);

  const [error, setError] = useState("");

  // ================= FETCH USER PROFILE =================

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login first.");
        return;
      }

      const response = await fetch("http://localhost:5000/api/auth/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Unable to load profile.");
        return;
      }

      setUser(data.user);
    } catch (error) {
      console.error("Profile Error:", error);

      setError("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  // ================= FETCH WORKOUTS =================

  const fetchWorkouts = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      const response = await fetch("http://localhost:5000/api/workouts", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Workout API Error:", data.message);

        return;
      }

      setWorkouts(data.workouts || []);
    } catch (error) {
      console.error("Dashboard Workout Error:", error);
    } finally {
      setWorkoutLoading(false);
    }
  };

  // ================= LOAD DATA =================

  useEffect(() => {
    fetchProfile();
    fetchWorkouts();
  }, []);

  // ================= REAL STATISTICS =================

  const totalWorkouts = workouts.length;

  const totalCalories = workouts.reduce(
    (total, workout) => total + Number(workout.calories || 0),
    0,
  );

  const totalDuration = workouts.reduce(
    (total, workout) => total + Number(workout.duration || 0),
    0,
  );

  // Last 5 workouts
  const recentWorkouts = workouts.slice(0, 5);

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>

          <p className="text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // ================= ERROR =================

  if (error) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="bg-white border border-red-100 rounded-2xl p-8 text-center max-w-md">
          <AlertCircle size={45} className="text-red-500 mx-auto mb-4" />

          <h2 className="text-xl font-bold text-gray-900">
            Something went wrong
          </h2>

          <p className="text-gray-500 mt-2">{error}</p>

          <Link
            to="/login"
            className="inline-flex items-center gap-2 mt-5 px-5 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Go to Login
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ================================================= */}
      {/* WELCOME SECTION */}
      {/* ================================================= */}

      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 md:p-8 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-blue-100 text-sm mb-1">Welcome back 👋</p>

            <h1 className="text-2xl md:text-3xl font-bold">
              {user?.name || "User"}
            </h1>

            <p className="text-blue-100 mt-2">
              Keep pushing yourself and stay consistent.
            </p>
          </div>

          <div className="w-16 h-16 bg-white/15 rounded-2xl flex items-center justify-center">
            <Dumbbell size={32} />
          </div>
        </div>
      </div>

      {/* ================================================= */}
      {/* STATS */}
      {/* ================================================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Total Workouts */}

        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Workouts</p>

              <h2 className="text-2xl font-bold text-gray-900 mt-1">
                {totalWorkouts}
              </h2>
            </div>

            <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
              <Dumbbell size={21} className="text-blue-600" />
            </div>
          </div>

          <p className="text-xs text-gray-400 mt-4">
            All your recorded workouts
          </p>
        </div>

        {/* Calories */}

        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Calories Burned</p>

              <h2 className="text-2xl font-bold text-gray-900 mt-1">
                {totalCalories.toLocaleString()}
              </h2>
            </div>

            <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center">
              <Flame size={21} className="text-orange-500" />
            </div>
          </div>

          <p className="text-xs text-gray-400 mt-4">Total calories recorded</p>
        </div>

        {/* Total Duration */}

        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Workout Time</p>

              <h2 className="text-2xl font-bold text-gray-900 mt-1">
                {totalDuration}
                <span className="text-sm font-medium text-gray-500 ml-1">
                  min
                </span>
              </h2>
            </div>

            <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center">
              <Clock size={21} className="text-purple-600" />
            </div>
          </div>

          <p className="text-xs text-gray-400 mt-4">Total workout duration</p>
        </div>

        {/* Goal */}

        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Fitness Goal</p>

              <h2 className="text-2xl font-bold text-gray-900 mt-1">
                Stay Consistent
              </h2>
            </div>

            <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center">
              <Target size={21} className="text-green-600" />
            </div>
          </div>

          <div className="mt-4">
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full"
                style={{
                  width: totalWorkouts > 0 ? "80%" : "0%",
                }}
              ></div>
            </div>

            <p className="text-xs text-gray-400 mt-2">
              {totalWorkouts > 0
                ? "Keep going! 💪"
                : "Start your first workout"}
            </p>
          </div>
        </div>
      </div>

      {/* ================================================= */}
      {/* QUICK ACTIONS */}
      {/* ================================================= */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          to="/workout"
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl p-5 transition group"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Start tracking</p>

              <h3 className="text-lg font-bold mt-1">Add Workout</h3>
            </div>

            <div className="w-11 h-11 bg-white/15 rounded-xl flex items-center justify-center group-hover:translate-x-1 transition">
              <Play size={21} />
            </div>
          </div>
        </Link>

        <Link
          to="/exercises"
          className="bg-white border border-gray-100 hover:shadow-md rounded-2xl p-5 transition group"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Explore</p>

              <h3 className="text-lg font-bold text-gray-900 mt-1">
                Exercises
              </h3>
            </div>

            <div className="w-11 h-11 bg-purple-50 rounded-xl flex items-center justify-center group-hover:translate-x-1 transition">
              <Activity size={21} className="text-purple-600" />
            </div>
          </div>
        </Link>

        <Link
          to="/profile"
          className="bg-white border border-gray-100 hover:shadow-md rounded-2xl p-5 transition group"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Your account</p>

              <h3 className="text-lg font-bold text-gray-900 mt-1">
                My Profile
              </h3>
            </div>

            <div className="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center group-hover:translate-x-1 transition">
              <User size={21} className="text-green-600" />
            </div>
          </div>
        </Link>
      </div>

      {/* ================================================= */}
      {/* RECENT WORKOUTS */}
      {/* ================================================= */}

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Recent Workouts</h2>

            <p className="text-sm text-gray-500 mt-1">
              Your latest workout sessions
            </p>
          </div>

          <Link
            to="/workout"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            View All
            <ArrowRight size={16} />
          </Link>
        </div>

        {workoutLoading ? (
          <div className="py-10 text-center text-gray-500">
            Loading workouts...
          </div>
        ) : recentWorkouts.length === 0 ? (
          <div className="py-10 text-center">
            <Dumbbell size={42} className="mx-auto text-gray-300 mb-3" />

            <h3 className="font-semibold text-gray-700">No workouts yet</h3>

            <p className="text-sm text-gray-400 mt-1">
              Start your first workout to see it here.
            </p>

            <Link
              to="/workout"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700"
            >
              <PlusIcon />
              Add Workout
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {recentWorkouts.map((workout) => (
              <div
                key={workout._id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                    <Dumbbell size={20} className="text-blue-600" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {workout.name}
                    </h3>

                    <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock size={13} />
                        {workout.duration} min
                      </span>

                      <span className="flex items-center gap-1">
                        <Flame size={13} />
                        {workout.calories} kcal
                      </span>

                      <span className="flex items-center gap-1">
                        <CalendarDays size={13} />

                        {new Date(workout.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-sm font-semibold text-gray-500">
                  Completed
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================================================= */}
      {/* USER INFORMATION */}
      {/* ================================================= */}

      <div className="bg-white border border-gray-100 rounded-2xl p-5 md:p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
            <User size={20} className="text-gray-600" />
          </div>

          <div>
            <h2 className="font-bold text-gray-900">Account Information</h2>

            <p className="text-sm text-gray-500">
              Your registered account details
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-400 uppercase tracking-wide">
              Name
            </p>

            <p className="font-semibold text-gray-900 mt-1">
              {user?.name || "Not available"}
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-400 uppercase tracking-wide">
              Email
            </p>

            <p className="font-semibold text-gray-900 mt-1 break-all">
              {user?.email || "Not available"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Small plus icon component
const PlusIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </svg>
);

export default Dashboard;
