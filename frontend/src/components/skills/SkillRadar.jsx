import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts'
import ChartTooltip from '../charts/ChartTooltip'

export default function SkillRadar({ categoryScores, height = 300 }) {
  const data = Object.entries(categoryScores).map(([category, score]) => ({ category, score }))

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadarChart data={data} outerRadius="58%" margin={{ top: 16, right: 32, bottom: 16, left: 32 }}>
        <PolarGrid stroke="#E4E8EE" />
        <PolarAngleAxis dataKey="category" tick={{ fontSize: 11, fill: '#3F4F66' }} />
        <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10, fill: '#9AA9BD' }} tickCount={5} />
        <Radar name="Score" dataKey="score" stroke="#3168F0" fill="#3168F0" fillOpacity={0.25} strokeWidth={2} />
        <Tooltip content={<ChartTooltip formatter={(v) => `${v}%`} />} />
      </RadarChart>
    </ResponsiveContainer>
  )
}
