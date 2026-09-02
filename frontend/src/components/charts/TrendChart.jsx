import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import ChartTooltip from './ChartTooltip'

const LINE_COLORS = {
  applications: '#3168F0',
  placements: '#12B76A',
  internships: '#F79009',
}

const LINE_LABELS = {
  applications: 'Applications',
  placements: 'Placements',
  internships: 'Internships',
}

const FALLBACK_PALETTE = ['#3168F0', '#12B76A', '#F79009', '#D92D20', '#8A94A6']

function labelize(key) {
  return key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, (c) => c.toUpperCase())
}

export default function TrendChart({ data, lines = ['applications', 'placements', 'internships'], height = 300 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid stroke="#EEF1F5" vertical={false} />
        <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#8A94A6' }} axisLine={{ stroke: '#EEF1F5' }} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: '#8A94A6' }} axisLine={false} tickLine={false} width={40} />
        <Tooltip content={<ChartTooltip />} />
        <Legend
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: 12, color: '#65778F', paddingTop: 12 }}
          formatter={(value) => LINE_LABELS[value] || labelize(value)}
        />
        {lines.map((key, i) => {
          const color = LINE_COLORS[key] || FALLBACK_PALETTE[i % FALLBACK_PALETTE.length]
          return (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              name={LINE_LABELS[key] || labelize(key)}
              stroke={color}
              strokeWidth={2.25}
              dot={{ r: 2.5, strokeWidth: 0, fill: color }}
              activeDot={{ r: 4.5 }}
              isAnimationActive={false}
            />
          )
        })}
      </LineChart>
    </ResponsiveContainer>
  )
}
