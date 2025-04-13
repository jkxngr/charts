import { Tooltip, Legend, PieChart, Pie, Cell } from "recharts";
import { data } from "./chartData";
import { COLORS } from "./chartData";

export default function PieChartBlock({ width, height }) {
  return (
    <PieChart width={width} height={height}>
      <Tooltip />
      <Legend />
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={80}
        fill="#8884d8"
        label
      >
        {data.map((entry, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}
