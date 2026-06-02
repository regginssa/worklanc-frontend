export interface RadioOption {
  title: string;
  value: string;
  description?: string;
}

interface RadioGroupProps {
  options: RadioOption[];
  value: string | null;
  onChange: (value: string) => void;
  name?: string;
  className?: string;
}

export default function RadioGroup({
  options,
  value,
  onChange,
  name,
  className = "",
}: RadioGroupProps) {
  return (
    <ul className={`space-y-4 ${className}`}>
      {options.map((option) => {
        const isSelected = value === option.value;

        return (
          <li
            key={option.value}
            className="flex items-start gap-2 cursor-pointer group"
            onClick={() => onChange(option.value)}
          >
            <div
              className={`w-5 h-5 overflow-hidden flex items-center border justify-center transition-all duration-200 group-hover:bg-slate-100 rounded-full ${
                isSelected ? "border-black" : "border-slate-300"
              }`}
            >
              <div
                className={`w-2.5 h-2.5 bg-zinc-800 rounded-full transition-all duration-200 ${
                  isSelected ? "scale-100" : "scale-0"
                }`}
              ></div>
            </div>

            <input
              type="radio"
              name={name}
              value={option.value}
              checked={isSelected}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />

            {option.description ? (
              <label
                htmlFor={option.value}
                className="flex flex-col items-start gap-1 flex-1"
              >
                <span className="text-sm font-medium">{option.title}</span>
                <span className="text-xs text-slate-600">
                  {option.description}
                </span>
              </label>
            ) : (
              <label htmlFor={option.value} className="text-sm flex-1">
                {option.title}
              </label>
            )}
          </li>
        );
      })}
    </ul>
  );
}
