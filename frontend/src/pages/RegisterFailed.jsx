import { Link } from "react-router-dom";

export default function RegisterFailed() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-red-100">
      <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-lg">
        <h2 className="text-3xl font-bold text-red-600 mb-4">
          Verification Failed ❌
        </h2>
        <p className="text-gray-600 mb-6">
          The verification link is invalid or has already been used.
        </p>
        <Link
          to="/login"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
}
