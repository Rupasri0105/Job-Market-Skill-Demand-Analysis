import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function SkillsAnalysis() {
  const data = [
    { skill: "Java", demand: 85 },
    { skill: "Python", demand: 95 },
    { skill: "SQL", demand: 80 },
    { skill: "JavaScript", demand: 90 },
    { skill: "React", demand: 75 },
    { skill: "Machine Learning", demand: 70 },
    { skill: "Cloud", demand: 65 },
  ];

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h2>Skill Demand Analysis in Thai Labor Market</h2>

      <p>
        This chart shows the most demanded skills from online job recruitment
        websites in Thailand.
      </p>

      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="skill" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="demand" fill="#4da6ff" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}