export default function EmailChangeFailed() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-red-100">
      <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-lg">
        <h2 className="text-3xl font-bold text-red-600 mb-4">
          Verification Failed ❌
        </h2>
        <p className="text-gray-600">
          The email verification link is invalid or expired.  
          Please try changing your email again.
        </p>
      </div>
    </div>
  );
}
