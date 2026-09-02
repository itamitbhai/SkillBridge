import { useAuth } from '../../hooks/useAuth'
import StudentDashboard from '../student/StudentDashboard'
import InstitutionDashboard from '../institution/InstitutionDashboard'
import IndustryDashboard from '../industry/IndustryDashboard'
import AdminDashboard from '../admin/AdminDashboard'

const DASHBOARDS = {
  student: StudentDashboard,
  institution: InstitutionDashboard,
  industry: IndustryDashboard,
  admin: AdminDashboard,
}

export default function Dashboard() {
  const { role } = useAuth()
  const Component = DASHBOARDS[role] || StudentDashboard
  return <Component />
}
