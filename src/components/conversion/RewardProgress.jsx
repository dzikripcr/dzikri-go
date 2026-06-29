import { getLevelProgress } from "../../services/membership";

export default function RewardProgress({ points = 0 }) {
  const progress = getLevelProgress(points);

  if (!progress.nextLevel) {
    return (
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-medium text-zinc-500">
          <span>Top Tier Reached</span>
          <span className="font-bold text-emerald-600">Max Level</span>
        </div>
        <div className="h-2.5 bg-zinc-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all duration-700"
            style={{ width: "100%" }}
          />
        </div>
        <p className="text-xs text-zinc-400">
          You&apos;re at the highest tier &mdash; enjoy all premium benefits
        </p>
      </div>
    );
  }

  const percent = Math.min(progress.progressPercent, 100);

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs font-medium text-zinc-500">
        <span>
          {points.toLocaleString("id-ID")} / {progress.pointsToNext + points} pts
        </span>
        <span className="font-bold">{progress.nextLevel} Target</span>
      </div>
      <div className="h-2.5 bg-zinc-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-zinc-800 to-black rounded-full transition-all duration-700"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="text-xs text-zinc-400">
        {progress.pointsToNext.toLocaleString("id-ID")} more points to unlock{" "}
        <span className="font-semibold text-zinc-700">{progress.nextLevel}</span>
      </p>
    </div>
  );
}
