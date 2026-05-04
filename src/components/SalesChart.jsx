import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function SalesChart() {
  const data = [
    { name: "Jan", value: 351 },
    { name: "Feb", value: 422 },
    { name: "Mar", value: 380 },
    { name: "Apr", value: 445 },
    { name: "May", value: 665 },
    { name: "Jun", value: 534 },
    { name: "Jul", value: 720 },
    { name: "Aug", value: 678 },
    { name: "Sep", value: 521 },
    { name: "Oct", value: 789 },
    { name: "Nov", value: 870 },
    { name: "Dec", value: 890 },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        
        {/* Garis bantu horizontal yang sangat tipis & elegan */}
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
          itemStyle={{ color: '#78350f', fontWeight: 'bold', fontSize: '16px' }} 
        />
        
        <Line
          type="monotone"
          dataKey="value"
          stroke="#78350f" 
          strokeWidth={3}
          dot={false} 
          activeDot={{ 
            r: 6, 
            fill: "#78350f", 
            stroke: "#ffffff", 
            strokeWidth: 3,
            boxShadow: '0 0 10px rgba(120, 53, 15, 0.3)'
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}