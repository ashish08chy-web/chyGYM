import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-md text-center">
        <h1 className="text-6xl font-bold mb-2">404</h1>

        <h2 className="text-2xl font-bold mb-3">Page Not Found</h2>

        <p className="text-gray-600 mb-6">
          The page you are looking for does not exist or has been moved.
        </p>

        <Link
          to="/dashboard"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
