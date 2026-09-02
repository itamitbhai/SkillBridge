import { DISCIPLINES, ALL_SKILLS } from './skillTaxonomy.js'
import { institutions } from './institutions.js'

const FIRST_NAMES = [
  'Rahul', 'Priya', 'Amit', 'Sneha', 'Vikram', 'Ananya', 'Rohan', 'Divya', 'Karthik', 'Meera',
  'Arjun', 'Pooja', 'Suresh', 'Kavya', 'Nikhil', 'Ritika', 'Aditya', 'Neha', 'Sanjay', 'Isha',
  'Manoj', 'Swati', 'Deepak', 'Anjali', 'Rakesh', 'Shreya', 'Vivek', 'Nandini', 'Harish', 'Priyanka',
  'Gaurav', 'Lakshmi', 'Ashwin', 'Radhika', 'Kiran', 'Sonal', 'Praveen', 'Aarti', 'Sandeep', 'Vidya',
  'Mohit', 'Rekha', 'Naveen', 'Tanvi', 'Sunil', 'Bhavna', 'Yash', 'Charu', 'Abhishek', 'Ishita',
]
const LAST_NAMES = [
  'Sharma', 'Gupta', 'Nair', 'Iyer', 'Reddy', 'Menon', 'Verma', 'Rao', 'Joshi', 'Das',
  'Pillai', 'Chauhan', 'Bhatt', 'Kulkarni', 'Mehta', 'Singh', 'Krishnan', 'Desai', 'Patil', 'Sen',
]

const YEARS = ['1st Year', '2nd Year', '3rd Year', 'Final Year', 'M.Tech - 1st Year']
const CAREER_INTERESTS = ['Frontend Development', 'Backend Development', 'Full Stack Development', 'Data Science', 'DevOps Engineering', 'Machine Learning']
const CERTIFICATIONS_POOL = ['AWS Certified Cloud Practitioner', 'Meta Front-End Developer Certificate', 'Google Data Analytics Certificate', 'Docker Certified Associate', 'MongoDB Developer Certification', 'Scrum Fundamentals Certified']
const PROJECTS_POOL = [
  'Built a real-time chat application using Socket.io and React',
  'Contributed to an open-source component library on GitHub',
  'Developed a REST API for a campus marketplace app using Node.js',
  'Built a data pipeline analysing public transit delay patterns',
  'Deployed a containerised microservices demo on AWS ECS',
  'Trained a sentiment-analysis model on product review data',
]
const RESEARCH_INTERESTS_POOL = [
  'Distributed systems and scalability', 'Applied machine learning', 'Developer productivity tooling',
  'Cloud-native architecture', 'Human-computer interaction', 'Data privacy and security',
]

function pick(pool, seed, count) {
  const out = []
  for (let i = 0; i < count; i++) {
    out.push(pool[(seed + i * 5) % pool.length])
  }
  return Array.from(new Set(out))
}

function skillsForDiscipline(discipline, seed) {
  const disciplineSkillMap = {
    'Computer Science & Engineering': ['React', 'Node.js', 'JavaScript', 'Data Structures & Algorithms'],
    'Information Technology': ['SQL', 'Cloud/AWS', 'System Design'],
    'Electronics & Communication': ['Computer Networks', 'Operating Systems'],
    'Electrical Engineering': ['Operating Systems', 'Documentation'],
    'Mechanical Engineering': ['Documentation', 'Team Collaboration'],
  }
  const core = disciplineSkillMap[discipline] || []
  const general = pick(ALL_SKILLS, seed, 5)
  return Array.from(new Set([...core, ...general])).slice(0, 8)
}

function generateStudents() {
  const students = []
  for (let i = 0; i < 50; i++) {
    const discipline = DISCIPLINES[i % DISCIPLINES.length]
    const disciplineInstitutions = institutions.filter((inst) => inst.discipline === discipline)
    const institution = (disciplineInstitutions.length ? disciplineInstitutions : institutions)[i % (disciplineInstitutions.length || institutions.length)]
    const firstName = FIRST_NAMES[i % FIRST_NAMES.length]
    const lastName = LAST_NAMES[(i * 7 + 3) % LAST_NAMES.length]
    const skillScore = 48 + ((i * 11) % 47)
    const skills = skillsForDiscipline(discipline, i * 3 + 1)

    students.push({
      id: `STU-${String(i + 1).padStart(3, '0')}`,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@skillbridge.demo`,
      discipline,
      institution: institution.name,
      institutionId: institution.id,
      course: 'B.Tech',
      year: YEARS[i % YEARS.length],
      city: institution.location,
      state: institution.state,
      skills,
      skillScore,
      certifications: pick(CERTIFICATIONS_POOL, i * 2, 2),
      projects: pick(PROJECTS_POOL, i * 4 + 1, 2),
      researchInterests: pick(RESEARCH_INTERESTS_POOL, i * 6 + 2, 2),
      careerInterests: pick(CAREER_INTERESTS, i * 3 + 2, 2),
      resumeUploaded: i % 4 !== 0,
      placementReadiness: Math.min(97, skillScore + 6),
    })
  }
  return students
}

export const students = generateStudents()
export const studentById = Object.fromEntries(students.map((s) => [s.id, s]))

// Demo signed-in student — used by the Student dashboard experience.
export const demoStudent = {
  ...studentById['STU-001'],
  name: 'Amit Kumar',
  institution: 'NIT Durgapur',
  institutionId: 'inst-01',
  discipline: 'Computer Science & Engineering',
  course: 'B.Tech',
  year: 'Final Year',
  city: 'Durgapur',
  state: 'West Bengal',
  skills: ['React', 'JavaScript', 'Node.js', 'MongoDB', 'Problem Solving', 'Git'],
  skillScore: 78,
  placementReadiness: 82,
  careerInterests: ['Frontend Development', 'Full Stack Development'],
  skillCategoryScores: { 'Core Technical': 58, 'Programming & Frameworks': 74, 'Data & Cloud': 56, Communication: 65, 'Professional Practice': 78 },
}
