import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-lg">
        <h2 className="text-3xl font-bold text-green-600 mb-4">
          Successfully Logged In 🎉
        </h2>
        <p className="text-gray-600">
          Welcome back, <span className="font-semibold">{user?.firstName}</span>!
        </p>
      </div>
    </div>
  );
}
