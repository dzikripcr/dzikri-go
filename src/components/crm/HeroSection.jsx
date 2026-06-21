import React from "react";
import AnimatedCounter from "./AnimatedCounter";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="scroll-mt-24 bg-[#F2F0F1] pt-16 md:pt-24 flex flex-col md:flex-row items-stretch overflow-hidden"
    >
      <div className="px-8 md:px-28 md:w-1/2 space-y-6 md:pr-10 pb-16 md:pb-24 flex flex-col justify-center">
        <h2 className="text-5xl md:text-7xl font-black leading-none uppercase tracking-tighter">
          FIND CLOTHES
          <br />
          THAT MATCHES
          <br />
          YOUR STYLE
        </h2>
        <p className="text-gray-600 max-w-md leading-relaxed text-sm md:text-base">
          Browse through our diverse range of meticulously crafted garments,
          designed to bring out your individuality and cater to your sense of
          style.
        </p>
        <button
          className="bg-black text-white px-12 py-4 rounded-full font-medium 
             transition-all duration-300 ease-in-out 
             hover:bg-gray-800 hover:scale-105 
             hover:shadow-[0_0_15px_rgba(255,255,255,0.8),0_0_30px_rgba(255,255,255,0.5),0_0_45px_rgba(255,255,255,0.3)]
             active:scale-95 active:bg-black active:shadow-[0_0_10px_rgba(255,255,255,0.6)] w-full md:w-auto cursor-pointer"
        >
          Shop Now
        </button>
        <div className="flex flex-wrap gap-8 pt-6">
          <div>
            <p className="text-3xl md:text-4xl font-bold">
              <AnimatedCounter end={198} duration={1500} />+
            </p>
            <p className="text-sm text-gray-500">International Brands</p>
          </div>
          <div className="border-l border-gray-300 pl-8">
            <p className="text-3xl md:text-4xl font-bold">
              <AnimatedCounter end={2786} duration={2000} />+
            </p>
            <p className="text-sm text-gray-500">High-Quality Products</p>
          </div>
          <div className="border-l border-gray-300 pl-8 hidden sm:block">
            <p className="text-3xl md:text-4xl font-bold">
              <AnimatedCounter end={31298} duration={2500} />+
            </p>
            <p className="text-sm text-gray-500">Happy Customers</p>
          </div>
        </div>
      </div>

      <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center items-end relative w-full px-8 md:px-0">
        {/*
          NOTE: Path gambar disesuaikan karena file ini sekarang berada di
          components/crm/. Sesuaikan kembali path ini dengan lokasi folder
          "img" pada struktur project Anda jika berbeda.
        */}
        <img
          src="../../img/model.png"
          alt="Hero Models"
          className="w-full h-auto object-contain max-h-[600px] object-bottom"
        />
      </div>
    </section>
  );
}
