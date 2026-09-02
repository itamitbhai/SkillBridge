export const nationalStats = {
  registeredStudents: 25480,
  academicInstitutions: 420,
  industryPartners: 680,
  verifiedInternships: 3250,
  activeCollaborations: 840,
  patentsTechnologies: 1240,
  placements: 6820,
}

export const heroStats = [
  { value: '10K+', label: 'Students' },
  { value: '500+', label: 'Industry Partners' },
  { value: '2K+', label: 'Internships' },
  { value: '95%', label: 'Skill Match Accuracy' },
]

export const monthlyTrends = [
  { month: 'Jan', applications: 340, placements: 62, internships: 210 },
  { month: 'Feb', applications: 388, placements: 74, internships: 228 },
  { month: 'Mar', applications: 356, placements: 68, internships: 219 },
  { month: 'Apr', applications: 412, placements: 81, internships: 246 },
  { month: 'May', applications: 445, placements: 93, internships: 260 },
  { month: 'Jun', applications: 398, placements: 85, internships: 241 },
  { month: 'Jul', applications: 470, placements: 104, internships: 278 },
  { month: 'Aug', applications: 512, placements: 118, internships: 296 },
]

export const skillGapAnalysis = [
  { skill: 'React', supply: 72, demand: 91 },
  { skill: 'System Design', supply: 34, demand: 84 },
  { skill: 'Node.js', supply: 58, demand: 79 },
  { skill: 'Cloud/AWS', supply: 39, demand: 71 },
  { skill: 'Data Structures & Algorithms', supply: 61, demand: 68 },
  { skill: 'Machine Learning', supply: 28, demand: 65 },
  { skill: 'Communication', supply: 50, demand: 62 },
]

export const reportTypeDistribution = [
  { type: 'Internships', value: 45 },
  { type: 'Placements', value: 28 },
  { type: 'Research Collaborations', value: 17 },
  { type: 'Technology Licensing', value: 10 },
]

export const disciplineDistribution = [
  { discipline: 'Computer Science & Engineering', students: 14200 },
  { discipline: 'Information Technology', students: 4100 },
  { discipline: 'Electronics & Communication', students: 3200 },
  { discipline: 'Electrical Engineering', students: 2400 },
  { discipline: 'Mechanical Engineering', students: 1580 },
]

export const industryParticipation = [
  { category: 'IT Services', partners: 168 },
  { category: 'Product', partners: 124 },
  { category: 'Analytics', partners: 98 },
  { category: 'Cloud', partners: 142 },
  { category: 'FinTech', partners: 56 },
  { category: 'E-commerce', partners: 72 },
  { category: 'Core Engineering', partners: 20 },
]

export const placementRateTrend = [
  { month: 'Jan', rate: 58 },
  { month: 'Feb', rate: 61 },
  { month: 'Mar', rate: 60 },
  { month: 'Apr', rate: 64 },
  { month: 'May', rate: 67 },
  { month: 'Jun', rate: 66 },
  { month: 'Jul', rate: 70 },
  { month: 'Aug', rate: 74 },
]

// Regional distribution — used for the "India Distribution" view and
// state-level drill-down. Grouped loosely by region for a readable layout
// (a lightweight, offline-safe alternative to a tile-based map).
export const regionalData = [
  { state: 'Rajasthan', region: 'North', institutions: 28, industries: 34, internships: 210, researchProjects: 18 },
  { state: 'Delhi', region: 'North', institutions: 22, industries: 58, internships: 340, researchProjects: 41 },
  { state: 'Uttar Pradesh', region: 'North', institutions: 46, industries: 39, internships: 265, researchProjects: 29 },
  { state: 'Uttarakhand', region: 'North', institutions: 19, industries: 27, internships: 175, researchProjects: 14 },
  { state: 'Punjab', region: 'North', institutions: 16, industries: 21, internships: 128, researchProjects: 9 },
  { state: 'Gujarat', region: 'West', institutions: 34, industries: 62, internships: 298, researchProjects: 33 },
  { state: 'Maharashtra', region: 'West', institutions: 42, industries: 81, internships: 320, researchProjects: 47 },
  { state: 'Madhya Pradesh', region: 'Central', institutions: 24, industries: 30, internships: 156, researchProjects: 12 },
  { state: 'Karnataka', region: 'South', institutions: 31, industries: 74, internships: 302, researchProjects: 44 },
  { state: 'Tamil Nadu', region: 'South', institutions: 37, industries: 66, internships: 289, researchProjects: 38 },
  { state: 'Kerala', region: 'South', institutions: 40, industries: 58, internships: 276, researchProjects: 35 },
  { state: 'Telangana', region: 'South', institutions: 21, industries: 47, internships: 198, researchProjects: 26 },
  { state: 'West Bengal', region: 'East', institutions: 26, industries: 33, internships: 172, researchProjects: 16 },
  { state: 'Bihar', region: 'East', institutions: 14, industries: 12, internships: 84, researchProjects: 6 },
  { state: 'Odisha', region: 'East', institutions: 12, industries: 15, internships: 91, researchProjects: 7 },
]
