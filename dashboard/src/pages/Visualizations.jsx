import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Visualizations() {
  const data = [
    { name: "IT", value: 40 },
    { name: "Engineering", value: 25 },
    { name: "Business", value: 15 },
    { name: "Marketing", value: 10 },
    { name: "Others", value: 10 },
  ];

  const COLORS = ["#4da6ff", "#66ff99", "#ffcc66", "#ff6666", "#cc99ff"];

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h2>Job Category Demand in Thai Labor Market</h2>

      <p>
        This pie chart shows job category distribution based on online
        recruitment data.
      </p>

      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}