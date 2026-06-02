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

const chartData = [
  { day: "Sun", customers: 20000 },
  { day: "Mon", customers: 40000 },
  { day: "Tue", customers: 38000 },
  { day: "Wed", customers: 28000 },
  { day: "Thu", customers: 48000 },
  { day: "Fri", customers: 35000 },
  { day: "Sat", customers: 40000 },
];

const chartConfig = {
  customers: {
    label: "Customers",
    color: "#4EA674",
  },
};

export default function SalesChart() {
  return (
    <ChartContainer
      config={chartConfig}
      className="h-full w-full"
    >
      <AreaChart
        data={chartData}
        margin={{
          top: 20,
          right: 10,
          left: -20,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient
            id="fillCustomers"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="5%"
              stopColor="#22c55e"
              stopOpacity={0.3}
            />
            <stop
              offset="95%"
              stopColor="#4EA674"
              stopOpacity={0}
            />
          </linearGradient>
        </defs>

        <CartesianGrid
          vertical={false}
          stroke="#f3f4f6"
          strokeDasharray="3 3"
        />

        <XAxis
          dataKey="day"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
        />

        <YAxis
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value / 1000}k`}
        />

        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              formatter={(value) => [
                `${Number(value).toLocaleString()} Sales`
              ]}
            />
          }
        />

        <Area
          type="monotone"
          dataKey="customers"
          stroke="#4EA674"
          strokeWidth={3}
          fill="url(#fillCustomers)"
          fillOpacity={1}
          activeDot={{
            r: 6,
            fill: "#fff",
            stroke: "#22c55e",
            strokeWidth: 2,
          }}
        />
      </AreaChart>
    </ChartContainer>
  );
}