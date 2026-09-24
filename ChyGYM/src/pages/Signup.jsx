import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Dumbbell,
  ArrowRight,
} from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // ================= HANDLE INPUT =================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= HANDLE SIGNUP =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check password
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
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

      // Signup successful
      console.log("Signup successful:", data);

      alert("Account created successfully! 🎉");

      // Go to login
      navigate("/login");
    } catch (error) {
      console.error("Signup Error:", error);

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
            Start your fitness journey today.
          </p>
        </div>

        {/* ================= SIGNUP CARD ================= */}

        <div className="bg-white text-gray-950 rounded-3xl p-6 md:p-8 shadow-2xl">
          <div className="mb-7">
            <h2 className="text-2xl font-black">Create Account</h2>

            <p className="text-gray-500 text-sm mt-1">
              Create your chyGYM account to get started.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* ================= NAME ================= */}

            <div>
              <label className="block text-sm font-semibold mb-2">
                Full Name
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20 transition"
                />
              </div>
            </div>

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
              <label className="block text-sm font-semibold mb-2">
                Password
              </label>

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
                  placeholder="Create a password"
                  required
                  minLength={6}
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

            {/* ================= CONFIRM PASSWORD ================= */}

            <div>
              <label className="block text-sm font-semibold mb-2">
                Confirm Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                  minLength={6}
                  className="w-full pl-11 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20 transition"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* ================= TERMS ================= */}

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                required
                className="w-4 h-4 mt-1 accent-lime-400"
              />

              <p className="text-xs text-gray-500 leading-relaxed">
                I agree to the terms and conditions and understand that my
                account information will be used to provide the chyGYM service.
              </p>
            </div>

            {/* ================= SIGNUP BUTTON ================= */}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-gray-950 text-white rounded-xl font-bold hover:bg-lime-400 hover:text-gray-950 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Create Account"}

              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          {/* ================= LOGIN ================= */}

          <p className="text-center text-sm text-gray-500 mt-7">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-lime-600 font-bold hover:text-lime-700"
            >
              Login
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

export default Signup;
