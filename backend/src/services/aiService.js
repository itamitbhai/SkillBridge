// Server-side mirror of the frontend's AI skill-mapping and matching layer
// (see frontend/src/services/aiService.js). Runs the same explainable
// heuristic model so demo behaviour is identical whether the frontend calls
// its local mock or this backend's /api/ai/* routes. Swap the internals for
// a call into a real Python/FastAPI ML service when ready — callers
// (routes/ai.js, routes/students.js, routes/industry.js) don't need to change.

const SKILL_POOL = {
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

const ALL_SKILLS = Object.values(SKILL_POOL).flat()
const SKILL_CATEGORIES = Object.keys(SKILL_POOL)

function categoryOfSkill(skill) {
  return Object.entries(SKILL_POOL).find(([, skills]) => skills.includes(skill))?.[0] || 'Professional Practice'
}

const TOP_INDUSTRY_SKILLS = [
  { skill: 'React', demand: 91 },
  { skill: 'System Design', demand: 84 },
  { skill: 'Node.js', demand: 79 },
  { skill: 'Python', demand: 76 },
  { skill: 'Cloud/AWS', demand: 71 },
  { skill: 'Data Structures & Algorithms', demand: 68 },
  { skill: 'Communication', demand: 62 },
]

const CAREER_PATHS = [
  { title: 'Frontend Developer', requiredSkills: ['React', 'JavaScript', 'TypeScript', 'Git'], missingHint: ['System Design', 'Testing/QA'] },
  { title: 'Backend Developer', requiredSkills: ['Node.js', 'SQL', 'System Design', 'MongoDB'], missingHint: ['Cloud/AWS', 'Docker'] },
  { title: 'Full Stack Developer', requiredSkills: ['React', 'Node.js', 'MongoDB', 'Git'], missingHint: ['System Design', 'TypeScript'] },
  { title: 'Data Scientist', requiredSkills: ['Python', 'Data Analysis', 'Machine Learning', 'SQL'], missingHint: ['Data Visualization', 'Statistics'] },
  { title: 'DevOps Engineer', requiredSkills: ['Cloud/AWS', 'Docker', 'Kubernetes', 'DevOps'], missingHint: ['System Design', 'Computer Networks'] },
]

const COURSE_LIBRARY = {
  'Data Structures & Algorithms': 'Mastering Data Structures & Algorithms',
  'System Design': 'Grokking Modern System Design',
  React: 'React — From Fundamentals to Production',
  'Node.js': 'Node.js Backend Engineering Bootcamp',
  Python: 'Python for Software Engineers',
  'Cloud/AWS': 'AWS Cloud Practitioner Essentials',
  MongoDB: 'MongoDB for Developers',
  SQL: 'SQL for Backend Engineers',
  'Machine Learning': 'Applied Machine Learning Foundations',
  Docker: 'Docker & Containerization Essentials',
  Kubernetes: 'Kubernetes for Application Developers',
  Communication: 'Technical Communication for Engineers',
  'Testing/QA': 'Software Testing & Test Automation Basics',
  DevOps: 'DevOps Fundamentals & CI/CD Pipelines',
}

function extractSkillsFromText(text) {
  if (!text || !text.trim()) return []
  const lower = text.toLowerCase()
  const manualList = text.split(/[,\n]/).map((s) => s.trim()).filter(Boolean)
  const matched = new Set()
  for (const skill of ALL_SKILLS) {
    if (lower.includes(skill.toLowerCase())) matched.add(skill)
  }
  for (const item of manualList) {
    const hit = ALL_SKILLS.find((s) => s.toLowerCase() === item.toLowerCase())
    if (hit) matched.add(hit)
  }
  return Array.from(matched)
}

function computeCategoryScores(skills) {
  const scores = {}
  for (const cat of SKILL_CATEGORIES) scores[cat] = 30
  for (const skill of skills) {
    const cat = categoryOfSkill(skill)
    scores[cat] = Math.min(96, (scores[cat] || 30) + 18)
  }
  return scores
}

function skillGapsFor(skills) {
  const have = new Set(skills.map((s) => s.toLowerCase()))
  return TOP_INDUSTRY_SKILLS.filter((s) => !have.has(s.skill.toLowerCase())).map((s) => ({
    skill: s.skill,
    demand: s.demand,
    supply: Math.max(10, s.demand - 45),
  }))
}

export function recommendCareer(skills) {
  const have = new Set((skills || []).map((s) => s.toLowerCase()))
  return CAREER_PATHS.map((path) => {
    const matched = path.requiredSkills.filter((s) => have.has(s.toLowerCase()))
    const match = Math.round((matched.length / path.requiredSkills.length) * 100)
    return {
      title: path.title,
      match: Math.max(35, match),
      strengths: matched,
      missing: path.requiredSkills.filter((s) => !have.has(s.toLowerCase())),
      recommendedLearning: path.missingHint,
    }
  }).sort((a, b) => b.match - a.match)
}

export function analyzeStudentSkills(input) {
  const skills = Array.isArray(input) ? input : extractSkillsFromText(input)
  const categoryScores = computeCategoryScores(skills)
  const overallScore = Math.round(Object.values(categoryScores).reduce((a, b) => a + b, 0) / SKILL_CATEGORIES.length)
  const strong = skills.slice(0, Math.ceil(skills.length * 0.6))
  const moderate = skills.slice(Math.ceil(skills.length * 0.6))
  const gaps = skillGapsFor(skills)

  return {
    overallScore,
    categoryScores,
    matchedSkills: skills,
    strongSkills: strong.length ? strong : ['Git', 'Problem Solving'],
    moderateSkills: moderate,
    skillGaps: gaps,
    recommendedSkills: gaps.slice(0, 4).map((g) => g.skill),
    careerPaths: recommendCareer(skills),
  }
}

export function calculateSkillGap(currentSkills, requiredSkills, industryLevel = 85) {
  const have = new Set((currentSkills || []).map((s) => s.toLowerCase()))
  return requiredSkills.map((skill) => {
    const current = have.has(skill.toLowerCase()) ? 82 : 30
    return { skill, current, industryRequirement: industryLevel, gap: Math.max(0, industryLevel - current) }
  })
}

const MATCH_WEIGHTS = { skills: 0.4, education: 0.2, experience: 0.15, location: 0.1, interests: 0.1, certifications: 0.05 }

export function matchStudentToInternship(student, opportunity) {
  const requiredSkills = opportunity.skills || []
  const studentSkills = new Set((student.skills || []).map((s) => s.toLowerCase()))
  const matchedSkills = requiredSkills.filter((s) => studentSkills.has(s.toLowerCase()))
  const missingSkills = requiredSkills.filter((s) => !studentSkills.has(s.toLowerCase()))
  const skillsScore = requiredSkills.length ? matchedSkills.length / requiredSkills.length : 0.5

  const educationScore = student.discipline === opportunity.discipline ? 1 : 0.4
  const experienceScore = student.year === 'Final Year' || student.year === 'M.Tech - 1st Year' ? 1 : student.year === '3rd Year' ? 0.7 : 0.45
  const locationScore = student.state && opportunity.state ? (student.state === opportunity.state ? 1 : 0.4) : 0.5

  const interests = (student.careerInterests || []).map((s) => s.toLowerCase())
  const interestsScore = requiredSkills.some((s) => interests.some((i) => s.toLowerCase().includes(i) || i.includes(s.toLowerCase()))) ? 1 : 0.5

  const certifications = (student.certifications || []).map((c) => c.toLowerCase())
  const certScore = certifications.length ? 0.8 : 0.3

  const overall = Math.round(
    (skillsScore * MATCH_WEIGHTS.skills +
      educationScore * MATCH_WEIGHTS.education +
      experienceScore * MATCH_WEIGHTS.experience +
      locationScore * MATCH_WEIGHTS.location +
      interestsScore * MATCH_WEIGHTS.interests +
      certScore * MATCH_WEIGHTS.certifications) *
      100
  )

  const why = []
  if (skillsScore >= 0.6) why.push(`Strong overlap on ${matchedSkills.length}/${requiredSkills.length} required skills`)
  if (educationScore === 1) why.push(`${student.discipline} discipline aligns directly with this opportunity`)
  if (experienceScore >= 0.7) why.push('Academic stage suits internship-level responsibilities')
  if (locationScore === 1) why.push('Same-state location reduces relocation friction')
  if (interestsScore === 1) why.push('Matches stated career interests')

  return {
    score: Math.max(5, Math.min(98, overall)),
    breakdown: {
      skills: Math.round(skillsScore * 100),
      education: Math.round(educationScore * 100),
      experience: Math.round(experienceScore * 100),
      location: Math.round(locationScore * 100),
      interests: Math.round(interestsScore * 100),
      certifications: Math.round(certScore * 100),
    },
    matchedSkills,
    missingSkills,
    why,
  }
}

export function matchCandidateToIndustry(students, opportunity) {
  return students
    .map((student) => ({ student, ...matchStudentToInternship(student, opportunity) }))
    .sort((a, b) => b.score - a.score)
}

export function recommendCourses(skillGaps) {
  return (skillGaps || []).map((g) => ({
    skill: g.skill || g,
    course: COURSE_LIBRARY[g.skill || g] || `Foundations of ${g.skill || g}`,
  }))
}

export function analyzeIndustryDemand() {
  return TOP_INDUSTRY_SKILLS
}
