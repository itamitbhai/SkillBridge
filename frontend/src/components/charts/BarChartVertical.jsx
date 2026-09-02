import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import ChartTooltip from './ChartTooltip'

export default function BarChartVertical({ data, dataKey, categoryKey, height = 260, colorKey, defaultColor = '#3168F0' }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid stroke="#EEF1F5" vertical={false} />
        <XAxis dataKey={categoryKey} tick={{ fontSize: 12, fill: '#8A94A6' }} axisLine={{ stroke: '#EEF1F5' }} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: '#8A94A6' }} axisLine={false} tickLine={false} width={40} />
        <Tooltip content={<ChartTooltip />} cursor={{ fill: '#F7F8FA' }} />
        <Bar dataKey={dataKey} radius={[6, 6, 0, 0]} barSize={36}>
          {data.map((entry, i) => (
            <Cell key={i} fill={colorKey ? entry[colorKey] : defaultColor} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
