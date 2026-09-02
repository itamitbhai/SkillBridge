import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import ChartTooltip from './ChartTooltip'

export default function RiskDonut({ data, size = 176, centerLabel, centerValue }) {
  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="level"
            innerRadius={size * 0.32}
            outerRadius={size * 0.48}
            paddingAngle={2}
            startAngle={90}
            endAngle={-270}
            stroke="none"
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<ChartTooltip formatter={(v) => `${v}%`} />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-navy-900">{centerValue}</span>
        <span className="text-[11px] font-medium text-navy-400">{centerLabel}</span>
      </div>
    </div>
  )
}
