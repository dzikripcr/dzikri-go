import { Link } from "react-router-dom";

export default function GuestHero() {
  return (
    <section
      id="hero"
      className="scroll-mt-24 bg-[#F2F0F1] pt-16 md:pt-24 flex flex-col md:flex-row items-stretch overflow-hidden"
    >
      <div className="px-8 md:px-28 md:w-1/2 space-y-6 md:pr-10 pb-16 md:pb-24 flex flex-col justify-center">
        <span className="text-xs font-bold uppercase tracking-widest text-red-500 block mb-3">
            Eksklusif untuk Member Baru ✨
          </span>
          <h2 className="text-5xl md:text-7xl font-black leading-none uppercase tracking-tighter">
            Temukan
            <br />
            Gaya Khasmu
          </h2>
        <p className="text-gray-600 max-w-md leading-relaxed text-sm md:text-base">
          Koleksi eksklusif yang dirancang untuk identitas modern. Jelajahi
          beragam pilihan pakaian yang dibuat dengan penuh ketelitian, dirancang
          khusus untuk menonjolkan keunikan dirimu dan memenuhi setiap selera
          gayamu.
        </p>
        <div className="flex flex-wrap gap-4 pt-2">
          <Link
            to="/register"
            className="inline-flex items-center justify-center font-medium py-4 w-full rounded-full
              border-2 border-black text-black
              hover:bg-black hover:text-white hover:scale-105
              transition-all duration-300 ease-out active:scale-95"
          >
            Daftar Sekarang
          </Link>
        </div>
      </div>

      <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center items-end relative w-full px-8 md:px-0">
        <img
          src="../../img/model.png"
          alt="Hero Models"
          className="w-full h-auto object-contain max-h-[600px] object-bottom"
        />
      </div>
    </section>
  );
}