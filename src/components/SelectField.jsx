import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectField({
  label,
  value,
  onChange,
  options = [],
  placeholder = "Select option",
  className = "",
}) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">
          {label}
        </label>
      )}

      <Select
        value={value}
        onValueChange={onChange}
      >
        <SelectTrigger
          className={`w-full border border-gray-200 text-gray-600 ${className}`}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}