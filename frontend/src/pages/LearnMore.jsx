export default function LearnMore() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-purple-100">
      <div className="bg-white p-10 rounded-2xl shadow-lg max-w-3xl text-center">
        <h2 className="text-4xl font-bold text-purple-600 mb-6">Learn More</h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          Welcome to the <span className="font-semibold">PhoneBook App</span> —
          a simple but powerful platform where you can manage your contacts,
          track calls, and stay connected with ease.  
        </p>
        <p className="text-gray-600 mb-6">
          This project is built with modern technologies like{" "}
          <span className="font-semibold">React</span>,{" "}
          <span className="font-semibold">Node.js</span>, and{" "}
          <span className="font-semibold">PostgreSQL</span>, with a REST API on
          the backend and a fast React + Vite frontend. It supports user
          registration, secure login with JWT, email verification, and will soon
          include features such as:
        </p>
        <ul className="text-left text-gray-700 list-disc list-inside mb-6">
          <li>📇 Manage personal and business contacts</li>
          <li>📞 Keep track of missed and recent calls</li>
          <li>🔒 Secure access with authentication</li>
        </ul>
        <p className="text-gray-600">
          The goal is to make communication easier and more organized while
          providing a clean and user-friendly interface.
        </p>
      </div>
    </div>
  );
}
