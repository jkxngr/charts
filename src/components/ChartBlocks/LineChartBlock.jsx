import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { data } from "./chartData";

export default function LineChartBlock({ width, height }) {
  return (
    <LineChart width={width} height={height} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" stroke="#ccc" />
      <YAxis stroke="#ccc" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      <Line type="monotone" dataKey="pv" stroke="#8884d8" />
    </LineChart>
  );
}
