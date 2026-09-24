import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Dumbbell, ArrowRight } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // ================= HANDLE INPUT =================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= HANDLE LOGIN =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      // Backend error
      if (!response.ok) {
        alert(data.message);
        return;
      }

      localStorage.setItem("token", data.token);

      // Login successful
      console.log("Logged in user:", data.user);

      alert("Login successful! 🎉");

      // Dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Login Error:", error);

      alert(
        "Unable to connect to server. Please make sure backend is running.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-5 py-10">
      {/* Background Glow */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-lime-400/10 rounded-full blur-3xl"></div>

      <div className="fixed bottom-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>

      <div className="relative w-full max-w-md">
        {/* ================= LOGO ================= */}

        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-11 h-11 rounded-xl bg-lime-400 text-gray-950 flex items-center justify-center">
              <Dumbbell size={24} />
            </div>

            <h1 className="text-3xl font-black">
              <span>chy</span>
              <span className="text-lime-400">GYM</span>
            </h1>
          </Link>

          <p className="text-gray-400 mt-3">
            Welcome back. Let's get stronger.
          </p>
        </div>

        {/* ================= LOGIN CARD ================= */}

        <div className="bg-white text-gray-950 rounded-3xl p-6 md:p-8 shadow-2xl">
          <div className="mb-7">
            <h2 className="text-2xl font-black">Welcome Back</h2>

            <p className="text-gray-500 text-sm mt-1">
              Login to continue your fitness journey.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* ================= EMAIL ================= */}

            <div>
              <label className="block text-sm font-semibold mb-2">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20 transition"
                />
              </div>
            </div>

            {/* ================= PASSWORD ================= */}

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold">Password</label>

                <Link
                  to="/forgot-password"
                  className="text-sm text-lime-600 font-semibold hover:text-lime-700"
                >
                  Forgot Password?
                </Link>
              </div>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-11 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20 transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* ================= REMEMBER ME ================= */}

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 accent-lime-400"
              />

              <label htmlFor="remember" className="text-sm text-gray-500">
                Remember me
              </label>
            </div>

            {/* ================= LOGIN BUTTON ================= */}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-gray-950 text-white rounded-xl font-bold hover:bg-lime-400 hover:text-gray-950 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Login"}

              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          {/* ================= SIGNUP ================= */}

          <p className="text-center text-sm text-gray-500 mt-7">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-lime-600 font-bold hover:text-lime-700"
            >
              Create Account
            </Link>
          </p>
        </div>

        {/* ================= BACK HOME ================= */}

        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-gray-400 text-sm hover:text-white transition"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
