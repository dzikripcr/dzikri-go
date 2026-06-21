// components/crm/MemberCard.jsx
//
// Kartu member ala "credit card" — menampilkan nama, level (Silver/
// Platinum/Gold), status (Active/Inactive/VIP/VVIP), dan progress poin
// menuju level berikutnya. Warna kartu berubah sesuai level.
//
// NOTE: path import react-icons disamakan dengan Header.jsx (react-icons/fi).
// Sesuaikan kembali import "../../utils/membership" dengan lokasi file Anda.

import React from "react";
import {
  FiAward,
  FiCheckCircle,
  FiSlash,
  FiStar,
} from "react-icons/fi";
import { getLevelProgress } from "../../services/membership";

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

const STATUS_STYLES = {
  Active: { icon: FiCheckCircle, classes: "bg-emerald-500/15 text-emerald-700" },
  Inactive: { icon: FiSlash, classes: "bg-gray-500/15 text-gray-600" },
  VIP: { icon: FiStar, classes: "bg-violet-500/15 text-violet-700" },
  VVIP: { icon: FiAward, classes: "bg-amber-500/15 text-amber-700" },
};

export default function MemberCard({ name, points, status }) {
  const { level, nextLevel, progressPercent, pointsToNext } =
    getLevelProgress(points);

  const style = LEVEL_STYLES[level] ?? LEVEL_STYLES.Silver;
  const statusStyle = STATUS_STYLES[status] ?? STATUS_STYLES.Active;
  const StatusIcon = statusStyle.icon;

  return (
    <div
      className={`
        relative overflow-hidden rounded-3xl p-8
        bg-gradient-to-br ${style.gradient} ${style.text}
        shadow-xl shadow-black/20
      `}
    >
      {/* dekorasi glow, konsisten dengan efek shimmer di Header login button */}
      <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-white/20 blur-3xl" />
      <div className="absolute -bottom-16 -left-10 w-52 h-52 rounded-full bg-black/10 blur-3xl" />

      <div className="relative z-10 flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] font-medium opacity-70">
            Boutiquera Member
          </p>
          <h3 className="text-2xl font-black tracking-tight mt-1">{name}</h3>
        </div>

        {/* status badge ditempatkan di luar area gradient supaya warnanya tetap konsisten di semua level */}
        <span
          className={`
            flex items-center gap-1.5 px-3 py-1.5 rounded-full
            text-xs font-bold bg-white ${statusStyle.classes}
          `}
        >
          <StatusIcon className="text-sm" />
          {status}
        </span>
      </div>

      <div className="relative z-10 mt-8 flex items-center gap-2">
        <FiAward className="text-xl" />
        <span className="text-lg font-black uppercase tracking-tight">
          {level} Member
        </span>
      </div>

      <div className="relative z-10 mt-4">
        <div className={`h-2 rounded-full overflow-hidden ${style.track}`}>
          <div
            className={`h-full rounded-full ${style.fill} transition-all duration-700 ease-out`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <p className={`mt-2 text-xs font-medium ${style.sub}`}>
          {nextLevel
            ? `${points.toLocaleString("id-ID")} poin · ${pointsToNext.toLocaleString(
                "id-ID"
              )} poin lagi ke level ${nextLevel}`
            : `${points.toLocaleString("id-ID")} poin · Level tertinggi tercapai`}
        </p>
      </div>
    </div>
  );
}