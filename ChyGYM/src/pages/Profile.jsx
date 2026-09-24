import { useEffect, useState } from "react";
import {
  User,
  Mail,
  ShieldCheck,
  CalendarDays,
  Dumbbell,
  LogOut,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ================= FETCH PROFILE =================

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
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

        if (response.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }

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

  // ================= LOAD PROFILE =================

  useEffect(() => {
    fetchProfile();
  }, []);

  // ================= LOGOUT =================

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
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

          <p className="text-gray-500">Loading profile...</p>
        </div>
      </div>
    );
  }

  // ================= ERROR =================

  if (error) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="bg-white border border-red-100 rounded-2xl p-8 text-center max-w-md">
          <User size={45} className="text-red-500 mx-auto mb-4" />

          <h2 className="text-xl font-bold text-gray-900">
            Unable to Load Profile
          </h2>

          <p className="text-gray-500 mt-2">{error}</p>

          <button
            onClick={() => navigate("/login")}
            className="mt-5 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition"
          >
            Go to Login
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
          My Profile
        </h1>

        <p className="text-gray-500 mt-1">Manage your account information</p>
      </div>

      {/* ================= PROFILE CARD ================= */}

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        {/* TOP SECTION */}

        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 md:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            {/* PROFILE ICON */}

            <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/20">
              <User size={38} className="text-white" />
            </div>

            {/* USER NAME */}

            <div className="text-white">
              <h2 className="text-2xl font-bold">{user?.name || "User"}</h2>

              <p className="text-blue-100 mt-1">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* USER INFORMATION */}

        <div className="p-6 md:p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-5">
            Personal Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* NAME */}

            <div className="border border-gray-100 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <User size={19} className="text-blue-600" />
                </div>

                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">
                    Full Name
                  </p>

                  <p className="font-semibold text-gray-900 mt-1">
                    {user?.name || "Not available"}
                  </p>
                </div>
              </div>
            </div>

            {/* EMAIL */}

            <div className="border border-gray-100 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                  <Mail size={19} className="text-green-600" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-gray-400 uppercase tracking-wide">
                    Email Address
                  </p>

                  <p className="font-semibold text-gray-900 mt-1 break-all">
                    {user?.email || "Not available"}
                  </p>
                </div>
              </div>
            </div>

            {/* ACCOUNT STATUS */}

            <div className="border border-gray-100 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                  <ShieldCheck size={19} className="text-green-600" />
                </div>

                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">
                    Account Status
                  </p>

                  <p className="font-semibold text-green-600 mt-1">Active</p>
                </div>
              </div>
            </div>

            {/* MEMBER SINCE */}

            <div className="border border-gray-100 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                  <CalendarDays size={19} className="text-purple-600" />
                </div>

                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">
                    Member Since
                  </p>

                  <p className="font-semibold text-gray-900 mt-1">
                    {user?.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "Not available"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= ACCOUNT SECURITY ================= */}

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 md:p-8">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
            <ShieldCheck size={21} className="text-blue-600" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Account Security
            </h2>

            <p className="text-sm text-gray-500">
              Your account is protected with secure authentication
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border border-gray-100 rounded-xl">
          <div>
            <p className="font-semibold text-gray-900">Password</p>

            <p className="text-sm text-gray-500 mt-1">
              Your password is securely encrypted
            </p>
          </div>

          <button
            onClick={() => navigate("/forgot-password")}
            className="px-4 py-2.5 border border-gray-200 hover:bg-gray-50 rounded-xl text-sm font-semibold text-gray-700 transition"
          >
            Change Password
          </button>
        </div>
      </div>

      {/* ================= QUICK INFO ================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <Dumbbell size={19} className="text-blue-600" />
            </div>

            <h3 className="font-bold text-gray-900">Fitness Journey</h3>
          </div>

          <p className="text-sm text-gray-500 leading-6">
            Keep tracking your workouts and stay consistent with your fitness
            journey.
          </p>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
              <LogOut size={19} className="text-red-500" />
            </div>

            <h3 className="font-bold text-gray-900">Account</h3>
          </div>

          <button
            onClick={handleLogout}
            className="w-full px-4 py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-semibold transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
