import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import { data } from "./chartData";

export default function BarChartBlock({ width, height }) {
  return (
    <BarChart width={width} height={height} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" stroke="#ccc" />
      <YAxis stroke="#ccc" />
      <Tooltip />
      <Legend />
      <Bar dataKey="uv" fill="#82ca9d" />
      <Bar dataKey="pv" fill="#8884d8" />
    </BarChart>
  );
}
