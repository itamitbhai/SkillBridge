import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import ChartTooltip from '../charts/ChartTooltip'

export default function BenchmarkRadar({ categoryScores, benchmark = 80, height = 320 }) {
  const data = Object.entries(categoryScores).map(([category, score]) => ({ category, You: score, Industry: benchmark }))

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadarChart data={data} outerRadius="58%" margin={{ top: 16, right: 32, bottom: 16, left: 32 }}>
        <PolarGrid stroke="#E4E8EE" />
        <PolarAngleAxis dataKey="category" tick={{ fontSize: 11, fill: '#3F4F66' }} />
        <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10, fill: '#9AA9BD' }} tickCount={5} />
        <Radar name="You" dataKey="You" stroke="#3168F0" fill="#3168F0" fillOpacity={0.3} strokeWidth={2} />
        <Radar name="Industry" dataKey="Industry" stroke="#12B76A" fill="#12B76A" fillOpacity={0.1} strokeWidth={2} strokeDasharray="4 3" />
        <Tooltip content={<ChartTooltip formatter={(v) => `${v}%`} />} />
        <Legend
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: 12, color: '#65778F', paddingTop: 8 }}
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}
