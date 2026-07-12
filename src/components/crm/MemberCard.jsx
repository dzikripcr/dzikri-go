import React, { useEffect, useState } from "react";
import { FiAward, FiCheckCircle, FiSlash, FiStar } from "react-icons/fi";

import {
  getLevelFromPoints,
  getMemberStatus,
  getLevelProgress,
  formatCurrency,
  formatDate,
  STATUS_BADGE_CLASSES,
  LEVEL_BADGE_CLASSES,
} from "../../services/membership";

const LEVEL_STYLES = {
  Silver: {
    gradient: "from-zinc-400 via-zinc-500 to-zinc-700",
    text: "text-white",
    sub: "text-white/70",
    track: "bg-white/25",
    fill: "bg-white",
  },
  Platinum: {
    gradient: "from-slate-700 via-slate-800 to-black",
    text: "text-white",
    sub: "text-white/60",
    track: "bg-white/15",
    fill: "bg-white",
  },
  Gold: {
    gradient: "from-amber-300 via-yellow-400 to-amber-600",
    text: "text-black",
    sub: "text-black/60",
    track: "bg-black/15",
    fill: "bg-black",
  },
};

const DEFAULT_MEMBER = {
  fullName: "Aulia Rahman",
  phone: "0812-3456-7890",
  email: "aulia.rahman@example.com",
  address: "Jl. Melati No.12",
  cityProvince: "Pekanbaru, Riau",
  registeredAt: "2023-08-14",
  orderCount: 28,
  totalSpend: 6250,
  points: 820,
  isActive: true,
};

export default function MemberCard({ member }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const data = {
    ...DEFAULT_MEMBER,
    ...member
  };

  const level = getLevelFromPoints(data.points);
  const progress = getLevelProgress(data.points);
  const status = getMemberStatus({
    isActive: data.isActive,
    orderCount: data.orderCount,
    totalSpend: data.totalSpend,
    level
  });

  return (
    <div className="ml-[-40px] mt-[-80px] relative w-full sm:w-[440px] md:w-[480px] lg:w-[560px] overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-10 lg:p-12 text-white flex flex-col justify-between min-h-[300px] sm:min-h-[360px] cursor-pointer transform transition-all duration-700 ease-out shadow-2xl hover:scale-[1.03] hover:-translate-y-3 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.6)] hover:border-zinc-700 border border-zinc-800 group mx-auto">
      
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl luxury-glow" />
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-zinc-800/10 to-transparent" />
      <div className="absolute top-0 left-0 w-48 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent luxury-shine" />

      <div className="relative z-20">
        <div className="flex justify-between items-start mb-10">
          <div>
            <p className="text-sm uppercase tracking-[.25em] text-zinc-400 group-hover:text-amber-400/80 transition-colors duration-700">
              Boutiquera Member
            </p>
            <h2 className="text-2xl lg:text-4xl font-black tracking-tight mt-2 group-hover:scale-[1.01] transition-transform duration-700 origin-left">
              {data.fullName}
            </h2>
          </div>

          {/* Status Badge */}
          <div
            className={`px-4 py-2 rounded-full flex items-center gap-2 shadow-sm font-black text-xs transform transition-all duration-700 group-hover:scale-110 ${STATUS_BADGE_CLASSES[status] || "bg-white text-zinc-950"}`}
          >
            <FiStar className="text-sm fill-current" />
            <span>{status}</span>
          </div>
        </div>

        <div className="flex gap-3 items-center mb-6 text-amber-400 group-hover:text-yellow-300 transition-colors duration-700">
          <FiAward className="text-2xl transform transition-transform duration-700 group-hover:rotate-12" />
          <p className="font-black uppercase tracking-wider text-sm text-white">
            {level} MEMBER
          </p>
        </div>
      </div>

      {/* Progress Bar Tier */}
      <div className="relative z-20 mt-auto pt-4">
        <div className="h-3.5 bg-zinc-800 rounded-full overflow-hidden shadow-inner w-full">
          <div
            style={{ width: `${progress.progressPercent}%` }}
            className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 rounded-full transition-all duration-1000 ease-out group-hover:brightness-125"
          />
        </div>

        <p className="text-sm lg:text-sm text-zinc-400 mt-4 flex justify-between items-center font-medium">
          <span className="text-white">{data.points} poin</span>
          <span className="group-hover:text-zinc-300 transition-colors duration-700">
            {progress.nextLevel
              ? `${progress.pointsToNext} poin lagi ke level ${progress.nextLevel}`
              : "Level Maksimal"}
          </span>
        </p>
      </div>
    </div>
  );
}