import { cn } from "../../lib/utils";

const variants = {
  stone: "bg-zinc-200/80 text-zinc-700 border border-zinc-300",
  amber: "bg-amber-100 text-amber-800 border border-amber-300",
  violet: "bg-white/15 text-white border border-white/20 backdrop-blur-sm",
};

export default function TierBadge({ name, variant = "stone" }) {
  return (
    <span
      className={cn(
        "inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
        variants[variant],
      )}
    >
      {name}
    </span>
  );
}
