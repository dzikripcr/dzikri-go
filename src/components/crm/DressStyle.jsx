import React from "react";

export default function DressStyle() {
  return (
    <section id="dress-style" className="scroll-mt-24 px-8 py-10 max-w-7xl mx-auto">
      <div className="bg-[#F0F0F0] rounded-[40px] px-8 py-16 md:px-16">
        <h3 className="text-4xl font-black text-center mb-12 uppercase tracking-tight">
          BROWSE BY DRESS STYLE
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[600px]">
          {/* 1. CASUAL CARD */}
          <div className="group relative rounded-3xl overflow-hidden h-64 md:h-auto hover:shadow-2xl transition-all duration-300 cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80"
              alt="Casual"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
            <span className="absolute top-8 left-8 text-3xl font-bold text-white z-10 tracking-wide">
              Casual
            </span>
          </div>
          {/* 2. FORMAL CARD */}
          <div className="group relative rounded-3xl overflow-hidden h-64 md:h-auto md:col-span-2 hover:shadow-2xl transition-all duration-300 cursor-pointer">
            <img
              src="https://plus.unsplash.com/premium_photo-1661434624086-e02557c68815?w=600&auto=format&fit=crop&q=60"
              alt="Formal"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
            <span className="absolute top-8 left-8 text-3xl font-bold text-white z-10 tracking-wide">
              Formal
            </span>
          </div>
          {/* 3. PARTY CARD */}
          <div className="group relative rounded-3xl overflow-hidden h-64 md:h-auto md:col-span-2 hover:shadow-2xl transition-all duration-300 cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1589810635657-232948472d98?w=600&auto=format&fit=crop&q=60"
              alt="Party"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
            <span className="absolute top-8 left-8 text-3xl font-bold text-white z-10 tracking-wide">
              Party
            </span>
          </div>
          {/* 4. GYM CARD */}
          <div className="group relative rounded-3xl overflow-hidden h-64 md:h-auto hover:shadow-2xl transition-all duration-300 cursor-pointer">
            <img
              src="https://images.unsplash.com/flagged/photo-1564714388616-9cdfa2b8063e?w=600&auto=format&fit=crop&q=60"
              alt="Gym"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
            <span className="absolute top-8 left-8 text-3xl font-bold text-white z-10 tracking-wide">
              Gym
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}