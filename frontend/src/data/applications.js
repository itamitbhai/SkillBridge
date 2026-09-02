import { students } from './students.js'
import { internships } from './internships.js'

const STATUS_CYCLE = ['Applied', 'Under Review', 'Shortlisted', 'Interview', 'Selected', 'Rejected']

function generateApplications() {
  const apps = []
  for (let i = 0; i < 50; i++) {
    const student = students[i % students.length]
    const internship = internships[(i * 7 + 3) % internships.length]
    const status = STATUS_CYCLE[i % STATUS_CYCLE.length]
    const matchScore = Math.min(97, 60 + ((i * 9) % 37))
    const day = (i % 27) + 1
    const month = String(8 + (i % 2)).padStart(2, '0')

    apps.push({
      id: `APP-${String(i + 1).padStart(4, '0')}`,
      studentId: student.id,
      studentName: student.name,
      internshipId: internship.id,
      internshipTitle: internship.title,
      company: internship.company,
      matchScore,
      status,
      appliedAt: `2026-${month}-${String(day).padStart(2, '0')}`,
    })
  }
  return apps
}

export const applications = generateApplications()
export const applicationById = Object.fromEntries(applications.map((a) => [a.id, a]))

// Demo applications shown for the signed-in demo student (STU-001 / Amit Kumar).
export const demoStudentApplications = [
  { id: 'APP-D001', studentId: 'STU-001', internshipId: 'INT-001', internshipTitle: 'Frontend Developer Intern', company: 'InnovateX', matchScore: 94, status: 'Shortlisted', appliedAt: '2026-08-12' },
  { id: 'APP-D002', studentId: 'STU-001', internshipId: 'INT-002', internshipTitle: 'Frontend Developer Intern', company: 'TechNova', matchScore: 92, status: 'Applied', appliedAt: '2026-08-18' },
  { id: 'APP-D003', studentId: 'STU-001', internshipId: 'INT-014', internshipTitle: 'Software Engineer Intern', company: 'Novaris Tech', matchScore: 91, status: 'Interview', appliedAt: '2026-08-21' },
  { id: 'APP-D004', studentId: 'STU-001', internshipId: 'INT-015', internshipTitle: 'Backend Developer Intern', company: 'InnovateX', matchScore: 71, status: 'Applied', appliedAt: '2026-08-25' },
  { id: 'APP-D005', studentId: 'STU-001', internshipId: 'INT-004', internshipTitle: 'Full Stack Developer Intern', company: 'ByteForge Labs', matchScore: 88, status: 'Selected', appliedAt: '2026-08-05' },
  { id: 'APP-D006', studentId: 'STU-001', internshipId: 'INT-023', internshipTitle: 'Platform Engineering Intern', company: 'Apex Digital', matchScore: 63, status: 'Rejected', appliedAt: '2026-07-29' },
  { id: 'APP-D007', studentId: 'STU-001', internshipId: 'INT-027', internshipTitle: 'Frontend Developer Intern', company: 'ByteForge Labs', matchScore: 80, status: 'Under Review', appliedAt: '2026-08-27' },
]
