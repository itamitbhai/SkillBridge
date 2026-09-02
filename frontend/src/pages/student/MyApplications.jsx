import { useState } from 'react'
import PageHeader from '../../components/PageHeader'
import FilterBar from '../../components/FilterBar'
import Card from '../../components/ui/Card'
import ApplicationTable from '../../components/internships/ApplicationTable'
import { demoStudentApplications } from '../../data/applications'

const STATUSES = ['Applied', 'Under Review', 'Shortlisted', 'Interview', 'Selected', 'Rejected']

export default function MyApplications() {
  const [status, setStatus] = useState('all')
  const filtered = status === 'all' ? demoStudentApplications : demoStudentApplications.filter((a) => a.status === status)

  return (
    <div>
      <PageHeader title="My Applications" subtitle="Track the status of every internship application in real time." />

      <FilterBar
        filters={[{ label: 'All Statuses', value: status, options: STATUSES, onChange: setStatus }]}
        onClear={() => setStatus('all')}
      />

      <Card padding={false}>
        <ApplicationTable applications={filtered} />
      </Card>
    </div>
  )
}
