export default function SelectField({ label, options, value, onChange, error }) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-1">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className={`w-full p-3 border rounded-lg transition duration-300 transform 
        focus:scale-[1.02] hover:scale-[1.01] focus:shadow-lg focus:shadow-purple-200
        focus:outline-none focus:ring-2 ${
          error
            ? "border-red-400 focus:ring-red-300"
            : "border-gray-300 focus:ring-purple-400"
        }`}
      >
        <option value="">-- Pilih {label} --</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      {error && (
        <div className="mt-1 text-xs text-red-600 bg-red-100 px-2 
        py-1 rounded border border-red-300 animate-pulse">
          {error}
        </div>
      )}
    </div>
  );
}