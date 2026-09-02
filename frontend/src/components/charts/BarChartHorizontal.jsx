import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import ChartTooltip from './ChartTooltip'

export default function BarChartHorizontal({ data, dataKey, categoryKey, height = 280, colorKey, defaultColor = '#3168F0' }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} layout="vertical" margin={{ top: 4, right: 16, left: 8, bottom: 0 }}>
        <CartesianGrid stroke="#EEF1F5" horizontal={false} />
        <XAxis type="number" tick={{ fontSize: 12, fill: '#8A94A6' }} axisLine={false} tickLine={false} />
        <YAxis
          type="category"
          dataKey={categoryKey}
          tick={{ fontSize: 12, fill: '#3F4F66' }}
          axisLine={false}
          tickLine={false}
          width={150}
        />
        <Tooltip content={<ChartTooltip />} cursor={{ fill: '#F7F8FA' }} />
        <Bar dataKey={dataKey} radius={[0, 6, 6, 0]} barSize={16}>
          {data.map((entry, i) => (
            <Cell key={i} fill={colorKey ? entry[colorKey] : defaultColor} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
