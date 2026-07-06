import { useAuth } from "@/context/AuthContext";
import { getLevelFromPoints } from "@/services/membership";
import { calculatePointsFromPurchase } from "@/services/membership";
import RewardProgress from "./RewardProgress";
import CTAButton from "./CTAButton";
import { FiStar, FiInfo } from "react-icons/fi";

function GuestPointView() {
  const examplePoints = calculatePointsFromPurchase(100000);

  return (
    <div className="bg-white border border-zinc-100 rounded-3xl p-8 shadow-lg flex flex-col mb-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center">
          <FiStar className="text-lg text-zinc-500" />
        </div>
        <div>
          <h3 className="font-black text-lg uppercase tracking-tight">
            Reward Points
          </h3>
          <p className="text-xs text-zinc-400">Start collecting points</p>
        </div>
      </div>

      <p className="text-zinc-600 text-sm leading-relaxed mb-6">
        Every purchase gives you reward points. Collect and unlock exclusive
        benefits.
      </p>

      <div className="bg-zinc-50 rounded-2xl p-5 mb-6">
        <p className="text-xs text-zinc-400 font-medium uppercase tracking-wider mb-2">
          Example
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-zinc-700">Rp100.000</span>
          <FiInfo className="text-zinc-300" />
          <span className="text-sm font-bold text-black">= {examplePoints} Points</span>
        </div>
      </div>

      <div className="mt-auto">
        <CTAButton
          guestLabel="Create Account"
          memberLabel="View Rewards"
          variant="primary"
          className="w-full justify-center"
        />
      </div>
    </div>
  );
}

function MemberPointView({ user }) {
  const points = user?.points ?? 0;
  const totalSpend = user?.totalSpend ?? 0;
  const level = getLevelFromPoints(points);
  const name = user?.fullName ?? user?.full_name ?? "Member";

  return (
    <div className="bg-white border border-zinc-100 rounded-3xl p-8 shadow-lg flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
          <FiStar className="text-lg text-amber-600" />
        </div>
        <div>
          <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
            Hello, {name}
          </p>
          <h3 className="font-black text-lg uppercase tracking-tight">
            Your Reward Balance
          </h3>
        </div>
      </div>

      <div className="bg-gradient-to-br from-zinc-900 to-black rounded-2xl p-6 text-white mb-6">
        <p className="text-xs text-white/50 uppercase tracking-wider font-medium">
          Available Points
        </p>
        <p className="text-3xl md:text-4xl font-black mt-1">
          {points.toLocaleString("id-ID")}
          <span className="text-lg text-white/50 ml-1">pts</span>
        </p>
        <p className="text-xs text-white/40 mt-1">
          Lifetime spend: Rp{totalSpend.toLocaleString("id-ID")}
        </p>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
            {level} Tier Progress
          </span>
        </div>
        <RewardProgress points={points} />
      </div>

      <div className="mt-auto">
        <CTAButton
          guestLabel="Create Account"
          memberLabel="Use Reward"
          variant="primary"
          className="w-full justify-center"
        />
      </div>
    </div>
  );
}

export default function MemberPointCard() {
  const { user } = useAuth();

  if (user) {
    return <MemberPointView user={user} />;
  }

  return <GuestPointView />;
}
