import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { usersApi } from "../api/users";

export default function EmailChangeSuccess() {
  const { user, setUser } = useAuth();

  useEffect(() => {
    async function refreshUser() {
      if (!user) return;
      try {
        const res = await usersApi.get(user.userId);
        if (res.ok) {
          setUser(res.data);
          localStorage.setItem("user", JSON.stringify(res.data));
        }
      } catch (err) {
        console.error("Failed to refresh user after email change:", err);
      }
    }
    refreshUser();
  }, [user, setUser]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-lg">
        <h2 className="text-3xl font-bold text-green-600 mb-4">
          Email Updated ✅
        </h2>
        <p className="text-gray-600">
          Your email has been successfully updated and verified.  
          You can now continue using your account with the new address.
        </p>
      </div>
    </div>
  );
}
