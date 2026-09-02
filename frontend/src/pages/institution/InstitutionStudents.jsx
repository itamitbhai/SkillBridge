import { useMemo, useState } from 'react'
import PageHeader from '../../components/PageHeader'
import FilterBar from '../../components/FilterBar'
import Pagination from '../../components/Pagination'
import Card from '../../components/ui/Card'
import { Pill } from '../../components/ui/Badge'
import { useAuth } from '../../hooks/useAuth'
import { institutions } from '../../data/institutions'
import { students } from '../../data/students'
import { DISCIPLINES } from '../../data/skillTaxonomy'

const PAGE_SIZE = 10

export default function InstitutionStudents() {
  const { user } = useAuth()
  const institution = institutions.find((i) => i.name === user?.institution) || institutions[0]
  const [search, setSearch] = useState('')
  const [discipline, setDiscipline] = useState('all')
  const [page, setPage] = useState(1)

  const myStudents = useMemo(() => students.filter((s) => s.institutionId === institution.id), [institution])

  const filtered = myStudents.filter((s) => {
    if (discipline !== 'all' && s.discipline !== discipline) return false
    if (search && !s.name.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div>
      <PageHeader title="Students" subtitle={`${myStudents.length} students enrolled at ${institution.name}`} />

      <FilterBar
        search={search}
        onSearchChange={(v) => { setSearch(v); setPage(1) }}
        searchPlaceholder="Search students..."
        filters={[{ label: 'All Disciplines', value: discipline, options: DISCIPLINES, onChange: (v) => { setDiscipline(v); setPage(1) } }]}
      />

      <Card padding={false}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="border-b border-navy-100 text-left text-xs font-semibold uppercase tracking-wide text-navy-400">
                <th className="px-5 py-3">Name</th>
                <th className="px-3 py-3">Course</th>
                <th className="px-3 py-3">Year</th>
                <th className="px-3 py-3">Skill Score</th>
                <th className="px-3 py-3">Top Skills</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100">
              {paged.map((s) => (
                <tr key={s.id} className="hover:bg-navy-50/60">
                  <td className="whitespace-nowrap px-5 py-3.5 font-medium text-navy-800">{s.name}</td>
                  <td className="whitespace-nowrap px-3 py-3.5 text-navy-500">{s.course}</td>
                  <td className="whitespace-nowrap px-3 py-3.5 text-navy-500">{s.year}</td>
                  <td className="whitespace-nowrap px-3 py-3.5 font-semibold text-navy-700">{s.skillScore}%</td>
                  <td className="px-3 py-3.5">
                    <div className="flex flex-wrap gap-1.5">
                      {s.skills.slice(0, 3).map((sk) => <Pill key={sk}>{sk}</Pill>)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination page={page} totalPages={totalPages} onChange={setPage} totalItems={filtered.length} pageSize={PAGE_SIZE} />
      </Card>
    </div>
  )
}
