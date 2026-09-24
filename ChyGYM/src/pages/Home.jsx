import { Link } from "react-router-dom";
import {
  Dumbbell,
  Activity,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Play,
} from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-lime-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            {/* LEFT CONTENT */}
            <div>
              {/* Logo */}
              <div className="mb-8">
                <h1 className="text-4xl font-black tracking-tight">
                  <span className="text-white">chy</span>
                  <span className="text-lime-400">GYM</span>
                </h1>
              </div>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-lime-400/30 bg-lime-400/10 text-lime-400 text-sm font-medium">
                <span className="w-2 h-2 bg-lime-400 rounded-full"></span>
                YOUR FITNESS. YOUR JOURNEY.
              </div>

              {/* Heading */}
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
                Build Your
                <span className="block text-lime-400">Stronger Self.</span>
              </h2>

              {/* Description */}
              <p className="mt-6 text-gray-400 text-lg leading-relaxed max-w-xl">
                Track your workouts, monitor your progress and stay consistent
                with chyGYM. Your personal fitness journey starts here.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4 mt-8">
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-2 px-7 py-4 bg-lime-400 text-gray-950 font-bold rounded-xl hover:bg-lime-300 transition duration-300"
                >
                  Get Started
                  <ArrowRight size={20} />
                </Link>

                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 px-7 py-4 border border-gray-700 text-white font-semibold rounded-xl hover:bg-gray-900 transition duration-300"
                >
                  Login
                </Link>
              </div>

              {/* Small Benefits */}
              <div className="flex flex-wrap gap-5 mt-8 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <CheckCircle size={17} className="text-lime-400" />
                  Track Workouts
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle size={17} className="text-lime-400" />
                  Monitor Progress
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle size={17} className="text-lime-400" />
                  Stay Consistent
                </div>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden border border-gray-800 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=80"
                  alt="Gym workout"
                  className="w-full h-[550px] object-cover"
                />

                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent"></div>

                {/* Floating Card */}
                <div className="absolute bottom-6 left-6 right-6 bg-gray-950/80 backdrop-blur-md border border-gray-700 rounded-2xl p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Today's Goal</p>
                      <p className="text-xl font-bold mt-1">
                        Full Body Workout
                      </p>
                    </div>

                    <div className="w-12 h-12 rounded-full bg-lime-400 text-gray-950 flex items-center justify-center">
                      <Play size={20} fill="currentColor" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Circle */}
              <div className="absolute -top-6 -right-6 w-24 h-24 border border-lime-400/30 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Heading */}
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-lime-400 font-semibold uppercase tracking-widest text-sm">
              Everything You Need
            </p>

            <h2 className="text-4xl md:text-5xl font-black mt-3">
              Train Smarter.
              <span className="text-lime-400"> Get Stronger.</span>
            </h2>

            <p className="text-gray-400 mt-5 leading-relaxed">
              chyGYM gives you the tools you need to organize your workouts and
              understand your fitness progress.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-14">
            {/* Card 1 */}
            <div className="group p-7 bg-gray-950 border border-gray-800 rounded-2xl hover:border-lime-400/50 transition duration-300">
              <div className="w-14 h-14 rounded-xl bg-lime-400/10 flex items-center justify-center text-lime-400 group-hover:bg-lime-400 group-hover:text-gray-950 transition">
                <Dumbbell size={28} />
              </div>

              <h3 className="text-xl font-bold mt-6">Workout Tracking</h3>

              <p className="text-gray-400 mt-3 leading-relaxed">
                Record your exercises, sets, reps and workout sessions in one
                organized place.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group p-7 bg-gray-950 border border-gray-800 rounded-2xl hover:border-lime-400/50 transition duration-300">
              <div className="w-14 h-14 rounded-xl bg-lime-400/10 flex items-center justify-center text-lime-400 group-hover:bg-lime-400 group-hover:text-gray-950 transition">
                <Activity size={28} />
              </div>

              <h3 className="text-xl font-bold mt-6">Exercise Library</h3>

              <p className="text-gray-400 mt-3 leading-relaxed">
                Explore exercises and build better workout routines according to
                your fitness goals.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group p-7 bg-gray-950 border border-gray-800 rounded-2xl hover:border-lime-400/50 transition duration-300">
              <div className="w-14 h-14 rounded-xl bg-lime-400/10 flex items-center justify-center text-lime-400 group-hover:bg-lime-400 group-hover:text-gray-950 transition">
                <TrendingUp size={28} />
              </div>

              <h3 className="text-xl font-bold mt-6">Progress Tracking</h3>

              <p className="text-gray-400 mt-3 leading-relaxed">
                See your workout history and track your progress over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-24 bg-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* LEFT */}
            <div>
              <p className="text-lime-400 font-semibold uppercase tracking-widest text-sm">
                Simple Process
              </p>

              <h2 className="text-4xl md:text-5xl font-black mt-3">
                Your Fitness Journey
                <span className="block text-lime-400">Starts Here.</span>
              </h2>

              <p className="text-gray-400 mt-5 leading-relaxed">
                Keep your fitness routine organized and focus on becoming better
                every day.
              </p>

              <Link
                to="/signup"
                className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-lime-400 text-gray-950 font-bold rounded-xl hover:bg-lime-300 transition"
              >
                Start Now
                <ArrowRight size={18} />
              </Link>
            </div>

            {/* RIGHT STEPS */}
            <div className="space-y-5">
              <div className="flex gap-5 p-5 rounded-2xl bg-gray-900 border border-gray-800">
                <div className="w-12 h-12 shrink-0 rounded-full bg-lime-400 text-gray-950 flex items-center justify-center font-black">
                  01
                </div>

                <div>
                  <h3 className="font-bold text-lg">Create Your Account</h3>

                  <p className="text-gray-400 text-sm mt-1">
                    Sign up and create your personal fitness profile.
                  </p>
                </div>
              </div>

              <div className="flex gap-5 p-5 rounded-2xl bg-gray-900 border border-gray-800">
                <div className="w-12 h-12 shrink-0 rounded-full bg-lime-400 text-gray-950 flex items-center justify-center font-black">
                  02
                </div>

                <div>
                  <h3 className="font-bold text-lg">Start Your Workout</h3>

                  <p className="text-gray-400 text-sm mt-1">
                    Choose exercises and record your workout sessions.
                  </p>
                </div>
              </div>

              <div className="flex gap-5 p-5 rounded-2xl bg-gray-900 border border-gray-800">
                <div className="w-12 h-12 shrink-0 rounded-full bg-lime-400 text-gray-950 flex items-center justify-center font-black">
                  03
                </div>

                <div>
                  <h3 className="font-bold text-lg">Track Your Progress</h3>

                  <p className="text-gray-400 text-sm mt-1">
                    Monitor your performance and keep improving.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-24 bg-lime-400 text-gray-950">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-black">
            Ready to Start Your
            <span className="block">Fitness Journey?</span>
          </h2>

          <p className="max-w-2xl mx-auto mt-5 text-gray-800">
            Stop waiting for tomorrow. Start tracking your workouts and build a
            stronger version of yourself today.
          </p>

          <Link
            to="/signup"
            className="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-gray-950 text-white font-bold rounded-xl hover:bg-gray-800 transition"
          >
            Create Free Account
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-950 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5">
            <div>
              <h2 className="text-2xl font-black">
                <span>chy</span>
                <span className="text-lime-400">GYM</span>
              </h2>

              <p className="text-gray-500 text-sm mt-2">
                Track. Train. Transform.
              </p>
            </div>

            <div className="flex gap-6 text-sm text-gray-400">
              <Link to="/login" className="hover:text-lime-400 transition">
                Login
              </Link>

              <Link to="/signup" className="hover:text-lime-400 transition">
                Sign Up
              </Link>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-6 text-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} chyGYM. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
