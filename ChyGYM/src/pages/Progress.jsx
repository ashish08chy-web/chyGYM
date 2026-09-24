import { useEffect, useMemo, useState } from "react";
import {
  Dumbbell,
  Flame,
  Clock,
  TrendingUp,
  CalendarDays,
  Activity,
} from "lucide-react";

const Progress = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH WORKOUTS =================

  const fetchWorkouts = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      const response = await fetch("http://localhost:5000/api/workout", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data.message);
        return;
      }

      setWorkouts(data.workouts || []);
    } catch (error) {
      console.error("Progress Workout Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ================= LOAD DATA =================

  useEffect(() => {
    fetchWorkouts();
  }, []);

  // ================= STATISTICS =================

  const totalWorkouts = workouts.length;

  const totalCalories = workouts.reduce(
    (total, workout) => total + Number(workout.calories || 0),
    0,
  );

  const totalDuration = workouts.reduce(
    (total, workout) => total + Number(workout.duration || 0),
    0,
  );

  // ================= THIS WEEK =================

  const weeklyWorkouts = useMemo(() => {
    const now = new Date();

    const startOfWeek = new Date(now);

    const day = startOfWeek.getDay();

    const difference = day === 0 ? 6 : day - 1;

    startOfWeek.setDate(startOfWeek.getDate() - difference);

    startOfWeek.setHours(0, 0, 0, 0);

    return workouts.filter((workout) => {
      const workoutDate = new Date(workout.date);

      return workoutDate >= startOfWeek;
    });
  }, [workouts]);

  const weeklyCalories = weeklyWorkouts.reduce(
    (total, workout) => total + Number(workout.calories || 0),
    0,
  );

  const weeklyDuration = weeklyWorkouts.reduce(
    (total, workout) => total + Number(workout.duration || 0),
    0,
  );

  // ================= WEEKLY DAYS =================

  const weekDays = useMemo(() => {
    const now = new Date();

    const startOfWeek = new Date(now);

    const day = startOfWeek.getDay();

    const difference = day === 0 ? 6 : day - 1;

    startOfWeek.setDate(startOfWeek.getDate() - difference);

    startOfWeek.setHours(0, 0, 0, 0);

    const days = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);

      date.setDate(startOfWeek.getDate() + i);

      const count = workouts.filter((workout) => {
        const workoutDate = new Date(workout.date);

        return (
          workoutDate.getFullYear() === date.getFullYear() &&
          workoutDate.getMonth() === date.getMonth() &&
          workoutDate.getDate() === date.getDate()
        );
      }).length;

      days.push({
        name: date.toLocaleDateString("en-US", {
          weekday: "short",
        }),

        date: date.getDate(),

        count,
      });
    }

    return days;
  }, [workouts]);

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>

          <p className="text-gray-500">Loading progress...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}

      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Progress
        </h1>

        <p className="text-gray-500 mt-1">
          Track your fitness progress and activity
        </p>
      </div>

      {/* ================= TOTAL STATS ================= */}

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
        </div>

        {/* Workout Time */}

        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Workout Time</p>

              <h2 className="text-2xl font-bold text-gray-900 mt-1">
                {totalDuration}
                <span className="text-sm text-gray-500 ml-1">min</span>
              </h2>
            </div>

            <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center">
              <Clock size={21} className="text-purple-600" />
            </div>
          </div>
        </div>

        {/* Weekly Workouts */}

        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">This Week</p>

              <h2 className="text-2xl font-bold text-gray-900 mt-1">
                {weeklyWorkouts.length}
              </h2>
            </div>

            <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center">
              <TrendingUp size={21} className="text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* ================= WEEKLY ACTIVITY ================= */}

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Weekly Activity</h2>

            <p className="text-sm text-gray-500 mt-1">
              Your workouts from Monday to Sunday
            </p>
          </div>

          <Activity size={22} className="text-blue-600" />
        </div>

        {/* DAYS */}

        <div className="grid grid-cols-7 gap-2 md:gap-4">
          {weekDays.map((day) => (
            <div key={day.name} className="text-center">
              <p className="text-xs md:text-sm text-gray-500 mb-2">
                {day.name}
              </p>

              <div
                className={`h-28 md:h-36 rounded-xl flex items-end justify-center pb-3 ${
                  day.count > 0 ? "bg-blue-50" : "bg-gray-50"
                }`}
              >
                <div
                  className={`w-5 md:w-8 rounded-lg transition-all ${
                    day.count > 0 ? "bg-blue-600" : "bg-gray-200"
                  }`}
                  style={{
                    height:
                      day.count > 0
                        ? `${Math.min(day.count * 35, 85)}%`
                        : "10%",
                  }}
                ></div>
              </div>

              <p className="text-xs text-gray-400 mt-2">{day.date}</p>

              <p className="text-xs font-semibold text-gray-600 mt-1">
                {day.count} {day.count === 1 ? "workout" : "workouts"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= THIS WEEK ================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Weekly Calories */}

        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 bg-orange-50 rounded-xl flex items-center justify-center">
              <Flame size={21} className="text-orange-500" />
            </div>

            <div>
              <h2 className="font-bold text-gray-900">This Week Calories</h2>

              <p className="text-sm text-gray-500">Calories burned this week</p>
            </div>
          </div>

          <p className="text-3xl font-bold text-gray-900">
            {weeklyCalories.toLocaleString()}
          </p>

          <p className="text-sm text-gray-400 mt-1">kcal</p>
        </div>

        {/* Weekly Duration */}

        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 bg-purple-50 rounded-xl flex items-center justify-center">
              <Clock size={21} className="text-purple-600" />
            </div>

            <div>
              <h2 className="font-bold text-gray-900">This Week Time</h2>

              <p className="text-sm text-gray-500">Total workout duration</p>
            </div>
          </div>

          <p className="text-3xl font-bold text-gray-900">{weeklyDuration}</p>

          <p className="text-sm text-gray-400 mt-1">minutes</p>
        </div>
      </div>

      {/* ================= WORKOUT HISTORY ================= */}

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 md:p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center">
            <CalendarDays size={21} className="text-blue-600" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900">Workout History</h2>

            <p className="text-sm text-gray-500">
              Your complete workout history
            </p>
          </div>
        </div>

        {workouts.length === 0 ? (
          <div className="py-10 text-center">
            <Dumbbell size={42} className="mx-auto text-gray-300 mb-3" />

            <p className="text-gray-500">No workout history yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {workouts.map((workout) => (
              <div
                key={workout._id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                    <Dumbbell size={18} className="text-blue-600" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {workout.name}
                    </h3>

                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(workout.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-5 text-sm">
                  <div className="text-gray-500">
                    <span className="font-semibold text-gray-900">
                      {workout.duration}
                    </span>{" "}
                    min
                  </div>

                  <div className="text-gray-500">
                    <span className="font-semibold text-gray-900">
                      {workout.calories}
                    </span>{" "}
                    kcal
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= MOTIVATION ================= */}

      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 md:p-8 text-white">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center">
            <TrendingUp size={24} />
          </div>

          <div>
            <h2 className="text-lg md:text-xl font-bold">Keep Going! 💪</h2>

            <p className="text-blue-100 text-sm mt-1">
              Every workout takes you one step closer to your fitness goals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
