import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const data = [
  { date: "Jan", expenditure: 1000 },
  { date: "Feb", expenditure: 1500 },
  { date: "Mar", expenditure: 1200 }
];

const BudgetChart = () => (
  <LineChart width={600} height={300} data={data}>
    <XAxis dataKey="date" />
    <YAxis />
    <Tooltip />
    <CartesianGrid strokeDasharray="3 3" />
    <Line type="monotone" dataKey="expenditure" stroke="#8884d8" />
  </LineChart>
);

export default BudgetChart;
