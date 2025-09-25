// src/components/Input.jsx
export default function Input({ label, name, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="block text-sm text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}
