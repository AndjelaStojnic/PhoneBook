import { Link } from "react-router-dom";

export default function RegisterVerified() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-lg">
        <h2 className="text-3xl font-bold text-green-600 mb-4">
          Account Verified 🎉
        </h2>
        <p className="text-gray-600 mb-6">
          Your account has been successfully verified. <br />
          You can now log in to continue.
        </p>
        <Link
          to="/login"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}
