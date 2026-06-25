import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  LabelList,
} from "recharts";

const colors = [
  "#2563eb",
  "#3b82f6",
  "#60a5fa",
  "#93c5fd",
  "#bfdbfe",
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "var(--tooltip-bg)",
          border: "1px solid var(--tooltip-border)",
          color: "var(--tooltip-text)",
          borderRadius: "12px",
          padding: "12px 16px",
          boxShadow: "0 10px 25px rgba(0,0,0,.15)",
        }}
      >
        <strong>{payload[0].payload.role}</strong>

        <p
          style={{
            marginTop: 8,
            color: "var(--tooltip-text)",
            fontWeight: 600,
          }}
        >
          Contacts : {payload[0].value}
        </p>
      </div>
    );
  }

  return null;
};

function DesignationChart({ contacts }) {
  const designationCount = {};

  contacts.forEach((contact) => {
    if (contact.Designation) {
      designationCount[contact.Designation] =
        (designationCount[contact.Designation] || 0) + 1;
    }
  });

  const data = Object.entries(designationCount)
    .map(([role, count]) => ({
      role,
      count,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return (
    <div className="card">
      <div className="chart-header">
        <div>
          <h3>Designation Distribution</h3>
          <p>Top 5 designations by number of contacts</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: 0,
            bottom: 10,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="var(--grid-color)"
          />

          <XAxis
            dataKey="role"
            tick={{
              fill: "var(--axis-color)",
              fontSize: 12,
            }}
          />

          <YAxis
            tick={{
              fill: "var(--axis-color)",
              fontSize: 12,
            }}
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "#33415533" }}
          />

          <Bar
            dataKey="count"
            radius={[10, 10, 0, 0]}
            animationDuration={1200}
            animationEasing="ease-out"
          >
            <LabelList
              dataKey="count"
              position="top"
              fill="var(--axis-color)"
              fontSize={12}
              fontWeight="600"
            />

            {data.map((item, index) => (
              <Cell
                key={index}
                fill={colors[index % colors.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DesignationChart;