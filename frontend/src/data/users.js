// Demo accounts — one per role — used for "Continue with Demo" login.

export const demoUsers = {
  student: {
    id: 'USR-STU-01',
    name: 'Amit Kumar',
    email: 'amit.kumar@skillbridge.demo',
    role: 'student',
    roleLabel: 'Student',
    avatarInitials: 'AK',
    institution: 'NIT Durgapur',
    discipline: 'Computer Science & Engineering',
  },
  institution: {
    id: 'USR-INST-01',
    name: 'Dr. Sourav Banerjee',
    email: 'sourav.banerjee@nitdgp.skillbridge.demo',
    role: 'institution',
    roleLabel: 'Academic Institution',
    avatarInitials: 'SB',
    institution: 'NIT Durgapur',
    discipline: 'Computer Science & Engineering',
  },
  industry: {
    id: 'USR-IND-01',
    name: 'Ananya Iyer',
    email: 'ananya.iyer@innovatex.demo',
    role: 'industry',
    roleLabel: 'Industry Partner',
    avatarInitials: 'AI',
    company: 'InnovateX',
  },
  admin: {
    id: 'USR-ADM-01',
    name: 'Platform Admin',
    email: 'admin@skillbridge.demo',
    role: 'admin',
    roleLabel: 'Platform Admin',
    avatarInitials: 'PA',
  },
}

export const ROLES = [
  { id: 'student', label: 'Student' },
  { id: 'institution', label: 'Institution' },
  { id: 'industry', label: 'Industry' },
  { id: 'admin', label: 'Admin' },
]
