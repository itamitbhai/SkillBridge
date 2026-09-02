import Card, { CardHeader } from '../ui/Card'
import CircularMatchGauge from './CircularMatchGauge'

export default function ReadinessSnapshotWidget({ overallScore, categoryScores, topGap }) {
  const entries = Object.entries(categoryScores)

  return (
    <Card>
      <CardHeader title="Readiness Snapshot" />
      <div className="flex items-center gap-4">
        <CircularMatchGauge score={overallScore} size={72} label="READY" />
        <div className="min-w-0 flex-1 space-y-1 text-xs text-navy-500">
          {entries.map(([cat, score]) => (
            <p key={cat}>
              <span className="font-medium text-navy-700">{cat}</span> {score}%
            </p>
          ))}
        </div>
      </div>
      {topGap && (
        <p className="mt-4 rounded-lg bg-surface/70 px-3.5 py-2.5 text-xs text-navy-600">
          <span className="font-semibold text-navy-800">Top gap:</span> {topGap.skill} (-{topGap.gap}%)
        </p>
      )}
    </Card>
  )
}
