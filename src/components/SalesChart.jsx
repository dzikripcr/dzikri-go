import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function CustomersChart() {
  // Data dummy per hari dalam seminggu (menyerupai gambar "Customer Overview")
  const data = [
    { name: "Sun", value: 20000 },
    { name: "Mon", value: 40000 },
    { name: "Tue", value: 38000 },
    { name: "Wed", value: 28000 }, // Titik terendah sesuai gambar
    { name: "Thu", value: 48000 }, // Puncak sesuai gambar
    { name: "Fri", value: 35000 },
    { name: "Sat", value: 40000 },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#4EA674" stopOpacity={0} />
          </linearGradient>
        </defs>
        
        {/* Opsional: Menambahkan grid tipis agar lebih mudah dibaca */}
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
        
        <XAxis 
          dataKey="name" 
          tick={{ fontSize: 12, fill: "#9ca3af" }} 
          axisLine={false} 
          tickLine={false} 
        />
        <YAxis 
          tick={{ fontSize: 12, fill: "#9ca3af" }} 
          axisLine={false} 
          tickLine={false}
          tickFormatter={(value) => `${value / 1000}k`} // Format menjadi 'k' (misal: 20k, 40k)
        />
        <Tooltip 
          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          formatter={(value) => [`${value.toLocaleString()} Users`, "Customers"]}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#4EA674"
          strokeWidth={3}
          fillOpacity={1}
          fill="url(#colorValue)"
          activeDot={{ r: 6, fill: "#fff", stroke: "#22c55e", strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}