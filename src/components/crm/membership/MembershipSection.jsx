import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { TIERS } from "./membershipData";
import MembershipCard from "./MembershipCard";
import { FiChevronRight } from "react-icons/fi";

function SkeletonCard() {
  return (
    <div className="rounded-3xl border border-zinc-100 bg-white p-8 animate-pulse h-[400px]">
      <div className="flex items-center justify-between mb-4">
        <div className="space-y-2">
          <div className="h-6 w-20 bg-zinc-100 rounded" />
          <div className="h-3 w-28 bg-zinc-100 rounded" />
        </div>
        <div className="h-5 w-16 bg-zinc-100 rounded-full" />
      </div>
      <div className="h-px bg-zinc-100 my-6" />
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-zinc-100" />
            <div className="h-3 flex-1 bg-zinc-100 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MembershipSection() {
  const { user } = useAuth();
  const [tiers, setTiers] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const data = await import("./membershipData").then((m) => m.TIERS);
        if (!cancelled) setTiers(data);
      } catch {
        if (!cancelled) setTiers(TIERS);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, []);

  const ctaLink = user ? "/profile" : "/register";

  return (
    // Perbaikan scroll-mt agar pas berada di bawah navbar
    <section id="membership" className="scroll-mt-8 px-8 py-20 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
          Program
          <br className="md:hidden" />
          <span className="md:ml-3">Membership Eksklusif</span>
        </h2>
        <p className="text-zinc-500 mt-2 max-w-lg mx-auto text-sm md:text-base leading-relaxed">
          Buka pengalaman berbelanja premium bersama kami dengan program loyalitas kami 
          dan nikmati keuntungan eksklusif.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 items-stretch max-w-5xl mx-auto">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : (
        // Menggunakan items-stretch untuk memastikan baris grid memaksa tinggi elemen di dalamnya sama rata
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 items-stretch max-w-5xl mx-auto px-2 md:px-0">
          {tiers.map((tier) => (
            <div key={tier.name} className="h-full flex flex-col justify-between">
              <MembershipCard tier={tier} />
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-8">
        <Link
          to={ctaLink}
          className="inline-flex items-center gap-2 bg-black text-white font-bold py-4 px-10 rounded-full
            transition-all duration-300 ease-out
            hover:bg-zinc-800 hover:scale-105 hover:shadow-2xl hover:shadow-black/30
            active:scale-95"
        >
          {user ? "Lihat Status Keanggotaan Anda" : "Gabung Membership"}
          <FiChevronRight className="text-lg" />
        </Link>
      </div>
    </section>
  );
}