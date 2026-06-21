import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiArrowLeft,
  FiUser,
  FiPhone,
  FiMail,
  FiMapPin,
  FiCalendar,
  FiShoppingBag,
  FiCreditCard,
  FiAward,
  FiActivity,
  FiStar
} from "react-icons/fi";

import Header from "../../components/crm/Header";
import Footer from "../../components/crm/Footer";
import CustomerService from "../crm/Chat";

// Mengimport badge classes yang belum diterapkan sebelumnya
import {
  getLevelFromPoints,
  getMemberStatus,
  getLevelProgress,
  formatCurrency,
  formatDate,
  STATUS_BADGE_CLASSES,
  LEVEL_BADGE_CLASSES,
} from "../../services/membership";

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

// ===========================
// DETAIL ROW COMPONENT
// ===========================
function DetailRow({ icon: Icon, label, value }) {
  return (
    <div className="group flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:bg-zinc-950 transition-all duration-500 ease-out">
      <div className="p-3 bg-gray-100 rounded-xl group-hover:bg-white/10 transition-colors duration-500">
        <Icon className="w-5 h-5 text-gray-600 group-hover:text-amber-400 transition-colors duration-500" />
      </div>

      <div>
        <p className="text-[9px] uppercase font-bold tracking-widest text-gray-400 group-hover:text-zinc-500 transition-colors duration-500">
          {label}
        </p>
        <p className="font-black text-sm text-gray-900 group-hover:text-white transition-colors duration-500">
          {value}
        </p>
      </div>
    </div>
  );
}

// ===========================
// MAIN COMPONENT
// ===========================
export default function ProfileMember({ member }) {
  const navigate = useNavigate();
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
    <div className="min-h-screen bg-gray-50 flex flex-col antialiased">
      {/* Custom Premium Animations */}
      <style>{`
        @keyframes luxuryShine {
          0% { transform: translateX(-200%) skewX(-20deg); opacity: 0; }
          15% { opacity: .6; }
          50%, 100% { transform: translateX(350%) skewX(-20deg); opacity: 0; }
        }
        .luxury-shine { animation: luxuryShine 4.5s infinite; }

        @keyframes subtleGlow {
          0%, 100% { opacity: .15; filter: blur(40px); }
          50% { opacity: .35; filter: blur(60px); }
        }
        .luxury-glow { animation: subtleGlow 2s infinite; }
      `}</style>

      <Header />

      <main className={`max-w-7xl w-full mx-auto px-6 pt-10 pb-24 transition-opacity duration-1000 ${loaded ? "opacity-100" : "opacity-0"}`}>
        
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 mb-8 px-5 py-2.5 font-semibold text-sm border bg-white rounded-full hover:bg-zinc-950 hover:text-white hover:scale-105 transition-all duration-500 ease-out"
        >
          <FiArrowLeft />
          Kembali
        </button>

        {/* Dashboard Header Title */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black uppercase text-zinc-950 tracking-tight">
            My Profile
          </h1>
          <p className="text-[10px] tracking-[0.3em] font-bold text-gray-400">
            BOUTIQUERA ELITE DASHBOARD
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* LEFT COLUMN: Personal Data */}
          <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 p-6 h-full transition-all duration-700 hover:shadow-2xl">
            <div className="flex justify-between items-center border-b pb-5 mb-5">
              <h2 className="font-black text-lg uppercase tracking-wide text-zinc-900">
                Data Personalia
              </h2>
              <span className="text-[9px] font-bold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200">
                VERIFIED USER
              </span>
            </div>

            <div className="space-y-3">
              <DetailRow icon={FiUser} label="Nama Lengkap" value={data.fullName} />
              <DetailRow icon={FiPhone} label="No Handphone" value={data.phone} />
              <DetailRow icon={FiMail} label="Email" value={data.email} />
              <DetailRow icon={FiCalendar} label="Registrasi" value={formatDate(data.registeredAt)} />
              <DetailRow icon={FiMapPin} label="Alamat" value={data.address} />
              <DetailRow icon={FiMapPin} label="Kota" value={data.cityProvince} />
            </div>
          </div>

          {/* RIGHT COLUMN: Membership Card & Live Metrics */}
          <div className="grid grid-rows-[auto_1fr] md:grid-rows-[1fr_1fr] gap-8 h-full">
            
            {/* PREMIUM BLACK CARD (EFEK TRANSISI BESAR DAN LAMA) */}
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-8 text-white h-full flex flex-col justify-between min-h-[220px] cursor-pointer transform transition-all duration-700 ease-out shadow-2xl hover:scale-[1.03] hover:-translate-y-3 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.6)] hover:border-zinc-700 border border-zinc-800 group">
              
              {/* Decorative Glow Elements */}
              <div className="absolute -top-20 -right-20 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl luxury-glow" />
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-zinc-800/10 to-transparent" />
              <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent luxury-shine" />

              <div className="relative z-20">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-[.25em] text-zinc-400 group-hover:text-amber-400/80 transition-colors duration-700">
                      Boutiquera Member
                    </p>
                    <h2 className="text-3xl font-black tracking-tight mt-1 group-hover:scale-[1.01] transition-transform duration-700 origin-left">
                      {data.fullName}
                    </h2>
                  </div>

                  {/* Status Badge Dinamis */}
                  <div className={`px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm font-black text-[10px] transform transition-all duration-700 group-hover:scale-110 ${STATUS_BADGE_CLASSES[status] || "bg-white text-zinc-950"}`}>
                    <FiStar className="text-xs fill-current" />
                    <span>{status}</span>
                  </div>
                </div>

                <div className="flex gap-2 items-center mb-4 text-amber-400 group-hover:text-yellow-300 transition-colors duration-700">
                  <FiAward className="text-xl transform transition-transform duration-700 group-hover:rotate-12" />
                  <p className="font-black uppercase tracking-wider text-sm text-white">
                    {level} MEMBER
                  </p>
                </div>
              </div>

              {/* Progress Bar Tier */}
              <div className="relative z-20 mt-auto">
                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${progress.progressPercent}%` }}
                    className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 rounded-full transition-all duration-1000 ease-out group-hover:brightness-125"
                  />
                </div>

                <p className="text-xs text-zinc-400 mt-3 flex justify-between items-center">
                  <span className="text-white font-medium">{data.points} poin</span>
                  <span className="group-hover:text-zinc-300 transition-colors duration-700">
                    {progress.nextLevel
                      ? `${progress.pointsToNext} poin lagi ke level ${progress.nextLevel}`
                      : "Level Maksimal"}
                  </span>
                </p>
              </div>
            </div>

            {/* LIVE MEMBERSHIP METRICS GRID */}
            <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 p-6 h-full transition-all duration-700 hover:shadow-2xl">
              <h3 className="text-[10px] uppercase tracking-widest text-gray-400 font-black mb-5">
                Live Membership Metrics
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {/* Pemetaan warna badge pada baris metrik dengan efek HOVER PREMIUM */}
                {[
                  [FiAward, "Level", level, LEVEL_BADGE_CLASSES[level]],
                  [FiActivity, "Status", status, STATUS_BADGE_CLASSES[status]],
                  [FiShoppingBag, "Order", `${data.orderCount}x`, "text-zinc-900"],
                  [FiCreditCard, "Spend", formatCurrency(data.totalSpend), "text-zinc-900"]
                ].map(([Icon, title, value, badgeClass], i) => (
                  <div 
                    key={i} 
                    className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex flex-col justify-between gap-3 transform transition-all duration-500 ease-out hover:bg-zinc-950 hover:border-zinc-800 hover:shadow-xl hover:-translate-y-1.5 cursor-pointer group"
                  >
                    <div className="flex items-center justify-between text-gray-400 transition-colors duration-500">
                      <p className="text-[10px] uppercase font-bold tracking-wider group-hover:text-amber-400/80 transition-colors duration-500">
                        {title}
                      </p>
                      <Icon className="text-sm group-hover:text-amber-400 group-hover:scale-125 transition-all duration-500 ease-out" />
                    </div>
                    
                    {/* Jika item berupa Level atau Status, render dalam bentuk pill badge dengan efek scale saat hover */}
                    {title === "Level" || title === "Status" ? (
                      <div className="transform transition-transform duration-500 group-hover:scale-105 origin-left">
                        <span className={`inline-block text-xs font-black px-2.5 py-1 rounded-md tracking-wide shadow-sm transition-all duration-500 ${badgeClass} group-hover:brightness-110`}>
                          {value}
                        </span>
                      </div>
                    ) : (
                      <h3 className="font-black text-lg text-zinc-900 tracking-tight group-hover:text-white transition-colors duration-500">
                        {value}
                      </h3>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
      <CustomerService />
    </div>
  );
}