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
        <strong>{payload[0].payload.company}</strong>

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

function CompanyChart({ contacts }) {
  const companyCount = {};

  contacts.forEach((contact) => {
    if (contact.Company) {
      companyCount[contact.Company] =
        (companyCount[contact.Company] || 0) + 1;
    }
  });

  const data = Object.entries(companyCount)
    .map(([company, count]) => ({
      company,
      contacts: count,
    }))
    .sort((a, b) => b.contacts - a.contacts)
    .slice(0, 5);

  return (
    <div className="card">
      <div className="chart-header">
        <div>
          <h3>Company-wise Contacts</h3>
          <p>Top 5 companies by number of contacts</p>
        </div>

        
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{
            top: 10,
            right: 35,
            left: 15,
            bottom: 10,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            horizontal={false}
            stroke="var(--grid-color)"
          />

          <XAxis
            type="number"
            tick={{
              fill: "var(--axis-color)",
              fontSize: 12,
            }}
          />

          <YAxis
            type="category"
            dataKey="company"
            width={120}
            tick={{
              fill: "var(--axis-color)",
              fontSize: 13,
            }}
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "#33415533" }}
          />

          <Bar
            dataKey="contacts"
            radius={[0, 10, 10, 0]}
            animationDuration={1200}
            animationEasing="ease-out"
          >
            <LabelList
              dataKey="contacts"
              position="right"
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

export default CompanyChart;
