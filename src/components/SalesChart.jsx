import { useMemo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  sales: {
    label: "Pendapatan",
    color: "#10b981", // Emerald-500 agar senada dengan UI Dashboard
  },
};

export default function SalesChart({ data = [] }) {
  // Memproses data mentah dari Supabase menjadi format yang dibaca Recharts
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];

    // 1. Kelompokkan total penjualan berdasarkan tanggal
    const groupedData = data.reduce((acc, order) => {
      // 🌟 SINKRONISASI: Ambil status secara fleksibel (mendukung 'status' atau 'status_pesanan')
      const status = (order.status || order.status_pesanan || "").toLowerCase();
      
      // Abaikan pesanan yang dibatalkan/canceled agar grafik pendapatan 100% akurat
      if (status === "canceled" || status === "dibatalkan") return acc;

      // Ambil tanggal dengan fallback aman jika salah satu properti tidak ada
      const dateRaw = order.tanggal_pesanan || order.tanggal || order.created_at;
      if (!dateRaw) return acc;

      const dateObj = new Date(dateRaw);
      // Gunakan format YYYY-MM-DD sebagai kunci untuk pengurutan
      const dateKey = dateObj.toISOString().split("T")[0];

      if (!acc[dateKey]) {
        acc[dateKey] = {
          rawDate: dateObj,
          sales: 0,
        };
      }
      
      // Tambahkan total belanja ke tanggal tersebut
      acc[dateKey].sales += Number(order.total_belanja) || 0;
      return acc;
    }, {});

    // 2. Ubah objek menjadi array, urutkan dari tanggal terlama ke terbaru, 
    // lalu format label harinya (misal: "12 Okt")
    return Object.values(groupedData)
      .sort((a, b) => a.rawDate - b.rawDate)
      .map((item) => ({
        day: item.rawDate.toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
        }),
        sales: item.sales,
      }));
  }, [data]);

  // Helper untuk format angka Y-Axis (misal: 1.500.000 menjadi 1,5 jt)
  const formatCompact = (value) => {
    return new Intl.NumberFormat("id-ID", {
      notation: "compact",
      compactDisplay: "short",
    }).format(value);
  };

  // Helper untuk format tooltip (Rupiah penuh)
  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Tampilan Placeholder jika data pesanan kosong/belum termuat
  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-full w-full bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
        <p className="text-xs text-gray-400">Belum ada data transaksi untuk ditampilkan</p>
      </div>
    );
  }

  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <AreaChart
        data={chartData}
        margin={{
          top: 15,
          right: 10,
          left: -15, // Digeser ke kiri agar teks nominal tidak terpotong di layar HP
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="fillSales" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
            <stop offset="95%" stopColor="#10b981" stopOpacity={0.01} />
          </linearGradient>
        </defs>

        <CartesianGrid vertical={false} stroke="#f3f4f6" strokeDasharray="3 3" />

        <XAxis
          dataKey="day"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          tick={{ fontSize: 11, fill: "#9ca3af" }}
        />

        <YAxis
          tickLine={false}
          axisLine={false}
          tickFormatter={formatCompact}
          tick={{ fontSize: 11, fill: "#9ca3af" }}
          width={50} // Ruang aman untuk format Rupiah ringkas (misal: 50K, 12M)
        />

        <ChartTooltip
          cursor={{ stroke: "#e5e7eb", strokeWidth: 1.5, strokeDasharray: "4 4" }}
          content={
            <ChartTooltipContent
              formatter={(value) => [formatRupiah(value), "Pendapatan"]}
            />
          }
        />

        <Area
          type="monotone"
          dataKey="sales"
          stroke="#10b981" // Gunakan Emerald Green yang cerah dan modern
          strokeWidth={2.5}
          fill="url(#fillSales)"
          fillOpacity={1}
          activeDot={{
            r: 5,
            fill: "#fff",
            stroke: "#10b981",
            strokeWidth: 2,
          }}
        />
      </AreaChart>
    </ChartContainer>
  );
}