// Shared skill taxonomy used across student profiles, internship/job
// requirements, industry demand analytics and institution curriculum
// insights — keeps the AI matching logic and the UI in sync.

export const DISCIPLINES = ['Computer Science & Engineering', 'Information Technology', 'Electronics & Communication', 'Electrical Engineering', 'Mechanical Engineering']

export const SKILL_CATEGORIES = ['Core Technical', 'Programming & Frameworks', 'Data & Cloud', 'Communication', 'Professional Practice']

export const SKILL_POOL = {
  'Core Technical': [
    'Data Structures & Algorithms', 'System Design', 'Object-Oriented Programming', 'Operating Systems',
    'Computer Networks', 'Database Management',
  ],
  'Programming & Frameworks': [
    'React', 'Node.js', 'JavaScript', 'TypeScript', 'Python', 'Java', 'Git',
  ],
  'Data & Cloud': [
    'SQL', 'MongoDB', 'Cloud/AWS', 'Docker', 'Kubernetes', 'Data Analysis', 'Machine Learning',
  ],
  Communication: ['Technical Writing', 'Presentation Skills', 'Team Collaboration', 'Documentation'],
  'Professional Practice': ['Agile/Scrum', 'Code Review', 'Testing/QA', 'DevOps', 'Product Sense'],
}

export const ALL_SKILLS = Object.values(SKILL_POOL).flat()

export function categoryOfSkill(skill) {
  return Object.entries(SKILL_POOL).find(([, skills]) => skills.includes(skill))?.[0] || 'Professional Practice'
}

export const INDUSTRY_CATEGORIES = [
  'IT Services', 'Product', 'Analytics', 'Cloud', 'FinTech', 'E-commerce', 'Core Engineering',
]

export const INSTITUTION_TYPES = ['Government', 'Deemed University', 'Autonomous', 'Private Affiliated']

// Most industry-requested skills, ranked — drives "Industry Skill Demand" charts.
export const TOP_INDUSTRY_SKILLS = [
  { skill: 'React', demand: 91 },
  { skill: 'System Design', demand: 84 },
  { skill: 'Node.js', demand: 79 },
  { skill: 'Python', demand: 76 },
  { skill: 'Cloud/AWS', demand: 71 },
  { skill: 'Data Structures & Algorithms', demand: 68 },
  { skill: 'Communication', demand: 62 },
]
