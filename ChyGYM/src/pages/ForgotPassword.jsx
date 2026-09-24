import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  ArrowLeft,
  ArrowRight,
  Dumbbell,
  CheckCircle,
} from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Real password reset API baad mein yahan connect hoga
    console.log("Reset email:", email);

    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-5 py-10">
      {/* Background Glow */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-lime-400/10 rounded-full blur-3xl"></div>
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
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
        </div>

        {/* Card */}
        <div className="bg-white text-gray-950 rounded-3xl p-6 md:p-8 shadow-2xl">
          {!submitted ? (
            <>
              {/* Header */}
              <div className="text-center mb-7">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-lime-100 text-lime-600 flex items-center justify-center">
                  <Mail size={26} />
                </div>

                <h2 className="text-2xl font-black mt-5">Forgot Password?</h2>

                <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                  Enter your registered email address and we'll send you
                  instructions to reset your password.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20 transition"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-gray-950 text-white rounded-xl font-bold hover:bg-lime-400 hover:text-gray-950 transition"
                >
                  Send Reset Link
                  <ArrowRight size={18} />
                </button>
              </form>
            </>
          ) : (
            /* ================= SUCCESS STATE ================= */
            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                <CheckCircle size={32} />
              </div>

              <h2 className="text-2xl font-black mt-5">Check Your Email</h2>

              <p className="text-gray-500 text-sm mt-3 leading-relaxed">
                If an account exists for{" "}
                <span className="font-semibold text-gray-800">{email}</span>,
                password reset instructions will be sent there.
              </p>

              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 w-full mt-7 py-3.5 bg-gray-950 text-white rounded-xl font-bold hover:bg-lime-400 hover:text-gray-950 transition"
              >
                <ArrowLeft size={18} />
                Back to Login
              </Link>
            </div>
          )}
        </div>

        {/* Back Home */}
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

export default ForgotPassword;
