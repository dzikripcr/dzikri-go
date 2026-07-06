import { useAuth } from "@/context/AuthContext";
import { getLevelFromPoints } from "@/services/membership";
import CTAButton from "./CTAButton";
import { FiTag, FiGift } from "react-icons/fi";

export default function MemberOffer() {
  const { user } = useAuth();

  if (user) {
    const points = user?.points ?? 0;
    const level = getLevelFromPoints(points);
    const name = user?.fullName ?? user?.full_name ?? "Member";

    return (
      <div className="bg-gradient-to-br from-zinc-900 via-zinc-950 to-black rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
        <div className="flex items-center gap-6">
          <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
            <FiGift className="text-2xl text-amber-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-white/60 uppercase tracking-wider">
              Welcome Back, {name}
            </p>
            <h3 className="text-2xl md:text-3xl font-black mt-1">
              Your {level} Benefit
            </h3>
            <p className="text-white/70 text-sm mt-1">
              15% Member Discount Active &mdash; applied at checkout
            </p>
          </div>
        </div>
        <CTAButton
          guestLabel="Shop Collection"
          memberLabel="Shop Collection"
          guestTo="/"
          memberTo="/"
          variant="outline"
          className="border-white text-white hover:bg-white hover:text-black flex-shrink-0"
          icon={false}
        />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-zinc-900 via-zinc-950 to-black rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
      <div className="flex items-center gap-6">
        <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
          <FiTag className="text-2xl text-emerald-400" />
        </div>
        <div>
          <p className="text-sm font-medium text-white/60 uppercase tracking-wider">
            Exclusive Member Deal
          </p>
          <h3 className="text-2xl md:text-3xl font-black mt-1">
            Get 15% OFF
          </h3>
          <p className="text-white/70 text-sm mt-1">
            Special price only for registered member &mdash; your first order
          </p>
        </div>
      </div>
      <CTAButton
        guestLabel="Become Member"
        memberLabel="Shop Collection"
        variant="outline"
        className="border-white bg-white text-black flex-shrink-0"
        icon={false}
      />
    </div>
  );
}
