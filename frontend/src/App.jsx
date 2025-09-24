export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow flex justify-between items-center">
        <h1 className="text-xl font-bold">📘 PhoneBook App</h1>
        <nav className="space-x-4">
          <button className="bg-white text-blue-600 px-4 py-2 rounded shadow hover:bg-gray-100">
            Login
          </button>
          <button className="bg-yellow-400 text-black px-4 py-2 rounded shadow hover:bg-yellow-300">
            Register
          </button>
        </nav>
      </header>

      {/* Centered content */}
      <main className="flex-1 flex items-center justify-center">
        <div className="bg-white shadow rounded p-10 text-center max-w-lg w-full">
          <h2 className="text-3xl font-semibold mb-4">Welcome 🎉</h2>
          <p className="text-gray-600 mb-6">
            This is your PhoneBook application. <br />
            Manage your contacts, calls, and connections easily.
          </p>
          <div className="space-x-4">
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              Get Started
            </button>
            <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300">
              Learn More
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
