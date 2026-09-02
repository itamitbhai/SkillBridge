import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import PageHeader from '../../components/PageHeader'
import FilterBar from '../../components/FilterBar'
import Pagination from '../../components/Pagination'
import Card from '../../components/ui/Card'
import EmptyState from '../../components/ui/EmptyState'
import { statusStyle } from '../../utils/badgeStyles'
import { formatDate } from '../../utils/format'
import { students } from '../../data/students'
import { institutions } from '../../data/institutions'
import { industries } from '../../data/industries'
import { internships } from '../../data/internships'
import { rndChallenges } from '../../data/rndChallenges'
import { technologies } from '../../data/technologies'
import { licensingRequests } from '../../data/licensingRequests'
import { jobs } from '../../data/jobs'
import { applications } from '../../data/applications'
import { Database } from 'lucide-react'
import clsx from 'clsx'

const PAGE_SIZE = 10

function buildUsers() {
  const studentUsers = students.slice(0, 20).map((s) => ({ id: s.id, name: s.name, role: 'Student', org: s.institution, email: s.email, status: 'Active' }))
  const instUsers = institutions.map((i) => ({ id: i.id, name: `${i.name} (Admin)`, role: 'Institution', org: i.name, email: `admin@${i.id}.ayushconnect.demo`, status: i.verified ? 'Active' : 'Pending Verification' }))
  const indUsers = industries.map((i) => ({ id: i.id, name: `${i.name} (Admin)`, role: 'Industry', org: i.name, email: `admin@${i.id}.ayushconnect.demo`, status: i.verified ? 'Active' : 'Pending Verification' }))
  return [...studentUsers, ...instUsers, ...indUsers]
}

const ENTITY_CONFIG = {
  users: {
    title: 'Users',
    data: buildUsers(),
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'role', label: 'Role' },
      { key: 'org', label: 'Organisation' },
      { key: 'email', label: 'Email' },
      { key: 'status', label: 'Status', badge: true },
    ],
  },
  students: {
    title: 'Students',
    data: students,
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'institution', label: 'Institution' },
      { key: 'discipline', label: 'Discipline' },
      { key: 'course', label: 'Course' },
      { key: 'skillScore', label: 'Skill Score', suffix: '%' },
    ],
  },
  institutions: {
    title: 'Institutions',
    data: institutions,
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'discipline', label: 'Discipline' },
      { key: 'location', label: 'Location' },
      { key: 'students', label: 'Students' },
      { key: 'verified', label: 'Status', status: (v) => (v ? 'Verified' : 'Pending Verification'), badge: true },
    ],
  },
  industries: {
    title: 'Industries',
    data: industries,
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'industryType', label: 'Category' },
      { key: 'location', label: 'Location' },
      { key: 'verified', label: 'Status', status: (v) => (v ? 'Verified' : 'Pending Verification'), badge: true },
    ],
  },
  internships: {
    title: 'Internships',
    data: internships,
    columns: [
      { key: 'title', label: 'Title' },
      { key: 'company', label: 'Company' },
      { key: 'location', label: 'Location' },
      { key: 'verified', label: 'Status', status: (v) => (v ? 'Verified' : 'Pending Verification'), badge: true },
    ],
  },
  rnd: {
    title: 'R&D Challenges',
    data: rndChallenges,
    columns: [
      { key: 'title', label: 'Title' },
      { key: 'company', label: 'Industry' },
      { key: 'category', label: 'Category' },
      { key: 'status', label: 'Status', badge: true },
    ],
  },
  technologies: {
    title: 'Technologies',
    data: technologies,
    columns: [
      { key: 'title', label: 'Title' },
      { key: 'institution', label: 'Institution' },
      { key: 'patentStatus', label: 'Patent Status', badge: true },
      { key: 'licensingStatus', label: 'Licensing', badge: true },
    ],
  },
  licensing: {
    title: 'Licensing Requests',
    data: licensingRequests,
    columns: [
      { key: 'technologyTitle', label: 'Technology' },
      { key: 'company', label: 'Company' },
      { key: 'requestedAt', label: 'Requested', date: true },
      { key: 'status', label: 'Status', badge: true },
    ],
  },
  placements: {
    title: 'Placements',
    data: jobs.map((j) => ({ ...j, placed: applications.filter((a) => a.status === 'Selected').length })),
    columns: [
      { key: 'title', label: 'Title' },
      { key: 'company', label: 'Company' },
      { key: 'location', label: 'Location' },
      { key: 'experience', label: 'Level' },
    ],
  },
}

export default function AdminEntityTable() {
  const { entity } = useParams()
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const config = ENTITY_CONFIG[entity]

  const filtered = useMemo(() => {
    if (!config) return []
    if (!search) return config.data
    const q = search.toLowerCase()
    return config.data.filter((row) => JSON.stringify(row).toLowerCase().includes(q))
  }, [config, search])

  if (!config) {
    return <EmptyState icon={Database} title="Unknown section" description="This admin section does not exist." />
  }

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div>
      <PageHeader title={config.title} subtitle={`${config.data.length} total records`} />

      <FilterBar search={search} onSearchChange={(v) => { setSearch(v); setPage(1) }} searchPlaceholder={`Search ${config.title.toLowerCase()}...`} />

      <Card padding={false}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="border-b border-navy-100 text-left text-xs font-semibold uppercase tracking-wide text-navy-400">
                {config.columns.map((c) => <th key={c.key} className="px-5 py-3">{c.label}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100">
              {paged.map((row, i) => (
                <tr key={row.id || i} className="hover:bg-navy-50/60">
                  {config.columns.map((c) => {
                    let value = row[c.key]
                    if (c.status) value = c.status(value)
                    if (c.date) value = formatDate(value)
                    return (
                      <td key={c.key} className="whitespace-nowrap px-5 py-3.5 text-navy-700">
                        {c.badge ? (
                          <span className={clsx('badge', statusStyle(value))}>{value}</span>
                        ) : (
                          <>{value}{c.suffix || ''}</>
                        )}
                      </td>
                    )
                  })}
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
