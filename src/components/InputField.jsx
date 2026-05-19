export default function InputField({
  label,
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  required = false,
  className,
}) {

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">
          {label}
        </label>
      )}

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className={className}
      />
    </div>
  );
}