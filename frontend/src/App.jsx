import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import RegisterSuccess from "./pages/RegisterSuccess.jsx";
import RegisterVerified from "./pages/RegisterVerified.jsx";
import RegisterFailed from "./pages/RegisterFailed.jsx";
import LearnMore from "./pages/LearnMore.jsx";


function Home() {
  return (
    <main className="flex-1 flex items-center justify-center">
      <div className="bg-white shadow rounded p-10 text-center max-w-lg w-full">
        <h2 className="text-3xl font-semibold mb-4">Welcome 🎉</h2>
        <p className="text-gray-600 mb-6">
          This is your PhoneBook application. <br />
          Manage your contacts, calls, and connections easily.
        </p>
        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Get Started
          </Link>
          <Link
            to="/learn-more"
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300"
          >
            Learn More
          </Link>
        </div>
      </div>
    </main>
  );
}

function HomeRedirect() {
  const { user } = useAuth();
  return user ? <Navigate to="/dashboard" replace /> : <Home />;
}

function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-blue-600 text-white p-4 shadow flex justify-between items-center">
      <Link
        to={user ? "/dashboard" : "/"}
        className="text-xl font-bold hover:opacity-90"
      >
        📘 PhoneBook App
      </Link>
      <nav className="space-x-4">
        {user ? (
          <>
            <span className="font-medium">Hello, {user.firstName}</span>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-white text-blue-600 px-4 py-2 rounded shadow hover:bg-gray-100"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-yellow-400 text-black px-4 py-2 rounded shadow hover:bg-yellow-300"
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

// Protected Route
function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

// Blocked Route (ako je loginovan, ne može opet na login/register)
function PublicRoute({ children }) {
  const { user } = useAuth();
  return user ? <Navigate to="/dashboard" replace /> : children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-gray-100">
          <Header />

          <Routes>
            <Route path="/" element={<HomeRedirect />} />

            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />

            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />

            <Route path="/register-success" element={<RegisterSuccess />} />
            <Route path="/register-verified" element={<RegisterVerified />} />
            <Route path="/register-failed" element={<RegisterFailed />} />
            <Route path="/learn-more" element={<LearnMore />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
