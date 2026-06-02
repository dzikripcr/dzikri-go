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
  { day: "Sun", customers: 23771 },
  { day: "Mon", customers: 38821 },
  { day: "Tue", customers: 38788 },
  { day: "Wed", customers: 28112 },
  { day: "Thu", customers: 48443 },
  { day: "Fri", customers: 32344 },
  { day: "Sat", customers: 45676 },
];

const chartConfig = {
  customers: {
    label: "Customers",
    color: "#4EA674",
  },
};

export default function CustomersChart() {
  return (
    <ChartContainer
      config={chartConfig}
      className="h-full w-full"
    >
      <AreaChart
        accessibilityLayer
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
              stopOpacity={0.15}
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
          strokeDasharray="3 3"
        />

        <XAxis
          dataKey="day"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          tick={{ fontSize: 12, fill: "#6b7280" }}
        />

        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          tick={{ fontSize: 12, fill: "#6b7280" }}
          tickFormatter={(value) => `${value / 1000}k`}
        />

        <ChartTooltip
          cursor={{
            stroke: "#f3f4f6",
            strokeWidth: 2,
          }}
          content={
            <ChartTooltipContent
              formatter={(value) => [
                `${Number(value).toLocaleString()} Customers`
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
            fill: "#ffffff",
            stroke: "#4EA674",
            strokeWidth: 3,
          }}
        />
      </AreaChart>
    </ChartContainer>
  );
}