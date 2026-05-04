import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function CustomersChart() {
  // Data dummy per hari dalam seminggu
  const data = [
    { name: "Sun", value: 23771 },
    { name: "Mon", value: 38821 },
    { name: "Tue", value: 38788 },
    { name: "Wed", value: 28112 }, 
    { name: "Thu", value: 48443 }, 
    { name: "Fri", value: 32344 },
    { name: "Sat", value: 45676 },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            {/* Menggunakan warna coklat (amber-900) dengan opacity yang lembut */}
            <stop offset="5%" stopColor="#78350f" stopOpacity={0.15} />
            <stop offset="95%" stopColor="#78350f" stopOpacity={0} />
          </linearGradient>
        </defs>

        {/* Garis bantu horizontal tipis ala dashboard premium */}
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
        
        <XAxis 
          dataKey="name" 
          tick={{ fontSize: 12, fill: "#6b7280" }} 
          axisLine={false} 
          tickLine={false} 
          tickMargin={10}
        />
        
        <YAxis 
          tick={{ fontSize: 12, fill: "#6b7280" }} 
          axisLine={false} 
          tickLine={false}
          tickMargin={10}
          tickFormatter={(value) => `${value / 1000}k`}
        />
        
        <Tooltip 
          cursor={{ stroke: '#f3f4f6', strokeWidth: 2 }}
          contentStyle={{ 
            backgroundColor: '#ffffff',
            borderRadius: '12px', 
            border: '1px solid #f3f4f6', 
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.05), 0 4px 6px -4px rgb(0 0 0 / 0.05)',
            padding: '12px 16px'
          }}
          labelStyle={{ color: '#9ca3af', fontSize: '12px', marginBottom: '4px' }}
          itemStyle={{ color: '#78350f', fontWeight: 'bold', fontSize: '14px' }} 
          formatter={(value) => [`${value.toLocaleString()} Users`, "Customers"]}
        />
        
        <Area
          type="monotone"
          dataKey="value"
          stroke="#78350f"
          strokeWidth={3}
          fillOpacity={1}
          fill="url(#colorValue)"
          activeDot={{ 
            r: 6, 
            fill: "#78350f", 
            stroke: "#ffffff", 
            strokeWidth: 3,
            boxShadow: '0 0 10px rgba(120, 53, 15, 0.3)'
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}