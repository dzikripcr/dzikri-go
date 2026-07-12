import { useNavigate } from "react-router-dom";
import { FiUser, FiShoppingBag } from "react-icons/fi";
import MemberCard from "./MemberCard";
import { getLevelFromPoints, getMemberStatus } from "../../services/membership";
import Avatar from "../Avatar";
import AnimatedCounter from "./AnimatedCounter";

export default function MemberHero({ user }) {
  const navigate = useNavigate();

  const name = user?.fullName ?? user?.full_name ?? "Pelanggan";
  const avatar = user?.avatar_url ?? null;
  const points = user?.points ?? 0;
  const orderCount = user?.orderCount ?? 0;
  const isActive = user?.isActive ?? true;

  const level = getLevelFromPoints(points);
  const status = getMemberStatus({
    isActive,
    orderCount,
    totalSpend: user?.totalSpend ?? 0,
    level,
  });

  return (
    <section
      id="hero"
      className="scroll-mt-24 bg-[#F2F0F1] pt-16 md:pt-24 flex flex-col md:flex-row items-stretch overflow-hidden mt-[-50px]"
    >
      <div className="px-8 md:px-28 md:w-1/2 space-y-6 md:pr-10 pb-16 md:pb-24 flex flex-col justify-center">
        <h2 className="text-5xl md:text-7xl font-black leading-none uppercase tracking-tighter">
          TEMUKAN PAKAIAN
          <br />
          YANG SESUAI
          <br />
          GAYA ANDA
        </h2>
        <p className="text-gray-600 max-w-md leading-relaxed text-sm md:text-base">
          Jelajahi beragam koleksi pakaian kami yang dirancang dengan teliti,
          dibuat khusus untuk menonjolkan keunikan diri dan memenuhi selera fashion Anda.
        </p>
        <button
          className="bg-black text-white font-medium py-4 rounded-full w-full transition-all duration-300 ease-out relative outline-none
                    hover:bg-black hover:scale-105 hover:shadow-[0_0_15px_rgba(0,0,0,0.5),0_0_30px_rgba(0,0,0,0.3),0_0_45px_rgba(0,0,0,0.2)]
                    active:scale-95 active:shadow-[0_0_10px_rgba(0,0,0,0.4)] cursor-pointer"
        >
          Belanja Sekarang
        </button>
        <div className="flex flex-wrap gap-8 pt-6">
          <div>
            <p className="text-3xl md:text-4xl font-bold">
              <AnimatedCounter end={198} duration={1500} />+
            </p>
            <p className="text-sm text-gray-500">Merek Internasional</p>
          </div>
          <div className="border-l border-gray-300 pl-8">
            <p className="text-3xl md:text-4xl font-bold">
              <AnimatedCounter end={2786} duration={2000} />+
            </p>
            <p className="text-sm text-gray-500">Produk Berkualitas Tinggi</p>
          </div>
          <div className="border-l border-gray-300 pl-8 hidden sm:block">
            <p className="text-3xl md:text-4xl font-bold">
              <AnimatedCounter end={31298} duration={2500} />+
            </p>
            <p className="text-sm text-gray-500">Pelanggan Puas</p>
          </div>
        </div>
      </div>

      <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center items-center relative w-full px-8 md:px-0">
        <div className="w-full max-w-md">
          <MemberCard name={name} points={points} status={status} />
        </div>
      </div>
    </section>
  );
}