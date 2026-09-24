import { Menu, Bell, User } from "lucide-react";

const Navbar = ({ setSidebarOpen }) => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6 sticky top-0 z-40">
      {/* Left */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
        >
          <Menu size={22} />
        </button>

        {/* Logo */}
        <h1 className="text-2xl font-extrabold tracking-tight">
          <span className="text-gray-900">chy</span>
          <span className="text-lime-500">GYM</span>
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Notification */}
        <button className="relative p-2.5 rounded-xl hover:bg-gray-100">
          <Bell size={20} />

          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile */}
        <button className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-100">
          <div className="w-9 h-9 rounded-full bg-lime-100 flex items-center justify-center">
            <User size={18} />
          </div>

          <span className="hidden md:block font-medium text-sm">User</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
