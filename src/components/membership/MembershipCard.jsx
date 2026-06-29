import TierBadge from "./TierBadge";
import BenefitList from "./BenefitList";
import { FiAward } from "react-icons/fi";
import { cn } from "../../lib/utils";

export default function MembershipCard({ tier }) {
  const { name, description, featured, benefits, gradient, border, textColor, badgeVariant } = tier;

  return (
    <div
      className={cn(
        "relative group rounded-3xl border p-8 flex flex-col transition-all duration-500 ease-out",
        "hover:-translate-y-2 hover:shadow-2xl",
        featured
          ? "bg-gradient-to-br scale-[1.02] md:scale-110 z-10 shadow-2xl shadow-black/30 hover:shadow-3xl hover:shadow-black/40"
          : "bg-white shadow-lg hover:shadow-xl",
        gradient,
        border,
      )}
    >
      {featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
          <FiAward className="w-3 h-3" />
          Recommended
        </div>
      )}

      <div className="flex items-center justify-between mb-4 mt-2">
        <div>
          <h3 className={cn("text-2xl font-black uppercase tracking-tight", textColor)}>
            {name}
          </h3>
          <p className={cn("text-xs font-medium mt-0.5", featured ? "text-white/60" : "text-zinc-400")}>
            {description}
          </p>
        </div>
        <TierBadge name={name} variant={badgeVariant} />
      </div>

      <div className={cn("my-6 h-px w-full", featured ? "bg-white/10" : "bg-zinc-100")} />

      <BenefitList benefits={benefits} textColor={textColor} />

      <div className="mt-auto pt-8">
        <div
          className={cn(
            "w-full py-3 rounded-full text-sm font-bold text-center tracking-wide transition-all duration-300",
            featured
              ? "bg-white text-black hover:bg-zinc-100 cursor-pointer"
              : "bg-zinc-900 text-white hover:bg-zinc-800 cursor-pointer",
            "hover:scale-105 active:scale-95",
          )}
        >
          {featured ? "Get Started" : "Learn More"}
        </div>
      </div>
    </div>
  );
}
