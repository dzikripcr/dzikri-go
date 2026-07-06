import { FiCheck, FiX } from "react-icons/fi";
import { cn } from "../../../lib/utils";

export default function BenefitList({ benefits, textColor = "text-zinc-900" }) {
  return (
    <ul className="space-y-3">
      {benefits.map((benefit) => (
        <li key={benefit.label} className="flex items-center gap-3">
          {benefit.included ? (
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
              <FiCheck className="w-3 h-3 text-emerald-600" />
            </span>
          ) : (
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-zinc-100 flex items-center justify-center">
              <FiX className="w-3 h-3 text-zinc-400" />
            </span>
          )}
          <span className={cn("text-sm font-medium", textColor)}>
            {benefit.label}
          </span>
        </li>
      ))}
    </ul>
  );
}
