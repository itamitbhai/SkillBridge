import { matchBandHex } from '../../utils/badgeStyles'

export default function CircularMatchGauge({ score, size = 64, label = 'MATCH' }) {
  const stroke = Math.max(4, Math.round(size / 13))
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - Math.min(100, Math.max(0, score)) / 100)
  const color = matchBandHex(score)

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#EEF1F5" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-bold text-navy-900" style={{ fontSize: size * 0.24 }}>{score}%</span>
        {label && <span className="font-semibold uppercase tracking-wide text-navy-400" style={{ fontSize: size * 0.13 }}>{label}</span>}
      </div>
    </div>
  )
}
