import PageHeader from '../../components/PageHeader'
import Card, { CardHeader } from '../../components/ui/Card'
import { Pill } from '../../components/ui/Badge'
import { useAuth } from '../../hooks/useAuth'
import { demoStudent } from '../../data/students'

export default function Profile() {
  const { user, role } = useAuth()

  return (
    <div>
      <PageHeader title="Profile" subtitle="Manage the details visible to institutions, industry and the platform." />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-500 text-2xl font-bold text-white">
              {user?.avatarInitials}
            </div>
            <p className="mt-4 text-base font-semibold text-navy-900">{user?.name}</p>
            <p className="text-sm text-navy-400">{user?.roleLabel}</p>
            {user?.institution && <p className="mt-1 text-xs text-navy-400">{user.institution}</p>}
            {user?.company && <p className="mt-1 text-xs text-navy-400">{user.company}</p>}
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader title="Account Details" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Detail label="Full Name" value={user?.name} />
            <Detail label="Email" value={user?.email} />
            <Detail label="Role" value={user?.roleLabel} />
            {user?.discipline && <Detail label="Discipline" value={user.discipline} />}
          </div>

          {role === 'student' && (
            <div className="mt-6 border-t border-navy-100 pt-5">
              <p className="mb-3 text-sm font-semibold text-navy-800">Skills</p>
              <div className="flex flex-wrap gap-2">
                {demoStudent.skills.map((s) => (
                  <Pill key={s}>{s}</Pill>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-wide text-navy-400">{label}</p>
      <p className="mt-1 text-sm font-medium text-navy-800">{value}</p>
    </div>
  )
}
