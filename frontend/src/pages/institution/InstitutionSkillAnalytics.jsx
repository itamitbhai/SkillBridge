import PageHeader from '../../components/PageHeader'
import Card, { CardHeader } from '../../components/ui/Card'
import BarChartHorizontal from '../../components/charts/BarChartHorizontal'
import { skillGapAnalysis } from '../../data/analytics'
import { curriculumInsights } from '../../data/curriculumInsights'
import { Lightbulb } from 'lucide-react'

export default function InstitutionSkillAnalytics() {
  const supplyData = skillGapAnalysis.map((s) => ({ skill: s.skill, value: s.supply }))
  const demandData = skillGapAnalysis.map((s) => ({ skill: s.skill, value: s.demand }))

  return (
    <div>
      <PageHeader title="Skill Gap Analytics" subtitle="Current student skills vs. industry demand, with AI-generated curriculum recommendations." />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader title="Student Skill Supply" subtitle="Share of students proficient in each skill" />
          <BarChartHorizontal data={supplyData} dataKey="value" categoryKey="skill" defaultColor="#3168F0" height={300} />
        </Card>
        <Card>
          <CardHeader title="Industry Demand" subtitle="Share of postings requiring each skill" />
          <BarChartHorizontal data={demandData} dataKey="value" categoryKey="skill" defaultColor="#F79009" height={300} />
        </Card>
      </div>

      <Card padding={false} className="mt-5">
        <div className="p-5 pb-0">
          <CardHeader title="Skill Gap Detail" subtitle="Supply vs. demand vs. gap, per skill" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-sm">
            <thead>
              <tr className="border-b border-navy-100 text-left text-xs font-semibold uppercase tracking-wide text-navy-400">
                <th className="px-5 py-3">Skill</th>
                <th className="px-3 py-3">Student Supply</th>
                <th className="px-3 py-3">Industry Demand</th>
                <th className="px-3 py-3">Gap</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100">
              {skillGapAnalysis.map((s) => (
                <tr key={s.skill} className="hover:bg-navy-50/60">
                  <td className="whitespace-nowrap px-5 py-3.5 font-medium text-navy-800">{s.skill}</td>
                  <td className="whitespace-nowrap px-3 py-3.5 text-navy-600">{s.supply}%</td>
                  <td className="whitespace-nowrap px-3 py-3.5 text-navy-600">{s.demand}%</td>
                  <td className="whitespace-nowrap px-3 py-3.5 font-semibold text-critical-600">{s.demand - s.supply}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card padding={false} className="mt-5">
        <div className="p-5 pb-0">
          <CardHeader title="Recommended Curriculum Improvements" action={<Lightbulb size={16} className="text-navy-400" />} />
        </div>
        <div className="divide-y divide-navy-100">
          {curriculumInsights.map((c) => (
            <div key={c.id} className="px-5 py-4">
              <p className="text-sm text-navy-700">"{c.finding}"</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="badge bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-100">Add module: {c.recommendedModule}</span>
                <span className="badge bg-success-50 text-success-700 ring-1 ring-inset ring-success-100">Add practical: {c.recommendedPractical}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
