export default function RegisterSuccess() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100">
      <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-lg">
        <h2 className="text-3xl font-bold text-yellow-600 mb-4">
          Registration Successful ✅
        </h2>
        <p className="text-gray-600">
          Please check your email to verify your account before logging in.
        </p>
      </div>
    </div>
  );
}
