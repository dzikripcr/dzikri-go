const PURCHASE_POINT_TIERS = [
  { min: 1000, points: 100 },
  { min: 500, points: 50 },
  { min: 200, points: 20 },
  { min: 50, points: 5 },
  { min: 0, points: 1 },
];

export function calculatePointsFromPurchase(purchaseAmount) {
  const tier = PURCHASE_POINT_TIERS.find((t) => purchaseAmount >= t.min);
  return tier ? tier.points : 0;
}

// ---------------------------------------------------------------------------
// 2. LEVEL MEMBERSHIP — ditentukan dari akumulasi point.
// ---------------------------------------------------------------------------
export const LEVEL_TIERS = [
  { name: "Silver", min: 0 },
  { name: "Gold", min: 500 },
  { name: "Platinum", min: 1500 },
];

export function getLevelFromPoints(points) {
  let current = LEVEL_TIERS[0].name;
  for (const tier of LEVEL_TIERS) {
    if (points >= tier.min) current = tier.name;
  }
  return current;
}

// Progress menuju level berikutnya, dipakai untuk progress bar di MemberCard.
export function getLevelProgress(points) {
  const idx = LEVEL_TIERS.findIndex(
    (tier, i) =>
      points >= tier.min &&
      (i === LEVEL_TIERS.length - 1 || points < LEVEL_TIERS[i + 1].min)
  );

  const currentTier = LEVEL_TIERS[idx];
  const nextTier = LEVEL_TIERS[idx + 1] || null;

  if (!nextTier) {
    // Sudah di level tertinggi (Gold)
    return {
      level: currentTier.name,
      nextLevel: null,
      progressPercent: 100,
      pointsToNext: 0,
    };
  }

  const range = nextTier.min - currentTier.min;
  const progressInRange = points - currentTier.min;
  const progressPercent = Math.min(
    100,
    Math.round((progressInRange / range) * 100)
  );

  return {
    level: currentTier.name,
    nextLevel: nextTier.name,
    progressPercent,
    pointsToNext: nextTier.min - points,
  };
}

// ---------------------------------------------------------------------------
// 3. STATUS MEMBER — Active / Inactive secara default, naik ke VIP / VVIP
//    kalau syarat order count & total spend (dan level, untuk VVIP) terpenuhi.
//    Urutan pengecekan penting: VVIP dicek lebih dulu karena syaratnya lebih
//    ketat (superset) dari VIP.
// ---------------------------------------------------------------------------
export function getMemberStatus({ isActive, orderCount, totalSpend, level }) {
  if (level === "Gold" && orderCount >= 40 && totalSpend >= 10000) {
    return "VVIP";
  }
  if (orderCount >= 25 && totalSpend >= 5000) {
    return "VIP";
  }
  return isActive ? "Active" : "Inactive";
}

// ---------------------------------------------------------------------------
// 4. FORMATTER kecil untuk tampilan
// ---------------------------------------------------------------------------
export function formatCurrency(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export const STATUS_BADGE_CLASSES = {
  Active:
    "bg-green-100 text-green-700",
  Inactive:
    "bg-gray-100 text-gray-600",
  VIP:
    "bg-purple-100 text-purple-700",
  VVIP:
    "bg-yellow-100 text-yellow-700",
};


export const LEVEL_BADGE_CLASSES = {
  Silver:
    "bg-gray-200 text-gray-700",

  Platinum:
    "bg-blue-100 text-blue-700",

  Gold:
    "bg-yellow-100 text-yellow-700",
};