export const institutions = [
  { id: 'inst-01', name: 'NIT Durgapur', type: 'Government', discipline: 'Computer Science & Engineering', location: 'Durgapur', state: 'West Bengal', accreditation: 'NAAC A++', verified: true, students: 1240, industryPartners: 22, placements: 356, researchProjects: 28 },
  { id: 'inst-02', name: 'IIT Delhi', type: 'Government', discipline: 'Computer Science & Engineering', location: 'New Delhi', state: 'Delhi', accreditation: 'NAAC A++', verified: true, students: 1580, industryPartners: 34, placements: 512, researchProjects: 48 },
  { id: 'inst-03', name: 'IIT Bombay', type: 'Government', discipline: 'Computer Science & Engineering', location: 'Mumbai', state: 'Maharashtra', accreditation: 'NAAC A++', verified: true, students: 1620, industryPartners: 38, placements: 540, researchProjects: 52 },
  { id: 'inst-04', name: 'NIT Trichy', type: 'Government', discipline: 'Electronics & Communication', location: 'Tiruchirappalli', state: 'Tamil Nadu', accreditation: 'NAAC A+', verified: true, students: 980, industryPartners: 18, placements: 298, researchProjects: 21 },
  { id: 'inst-05', name: 'BITS Pilani', type: 'Autonomous', discipline: 'Information Technology', location: 'Pilani', state: 'Rajasthan', accreditation: 'NAAC A', verified: true, students: 1120, industryPartners: 26, placements: 372, researchProjects: 24 },
  { id: 'inst-06', name: 'VIT Vellore', type: 'Private Affiliated', discipline: 'Computer Science & Engineering', location: 'Vellore', state: 'Tamil Nadu', accreditation: 'NAAC A++', verified: true, students: 1450, industryPartners: 30, placements: 420, researchProjects: 19 },
  { id: 'inst-07', name: 'IIIT Hyderabad', type: 'Autonomous', discipline: 'Computer Science & Engineering', location: 'Hyderabad', state: 'Telangana', accreditation: 'NAAC A+', verified: true, students: 760, industryPartners: 24, placements: 268, researchProjects: 33 },
  { id: 'inst-08', name: 'DTU Delhi', type: 'Government', discipline: 'Electrical Engineering', location: 'New Delhi', state: 'Delhi', accreditation: 'NAAC A+', verified: true, students: 890, industryPartners: 16, placements: 245, researchProjects: 15 },
  { id: 'inst-09', name: 'Jadavpur University', type: 'Government', discipline: 'Mechanical Engineering', location: 'Kolkata', state: 'West Bengal', accreditation: 'NAAC A+', verified: true, students: 820, industryPartners: 14, placements: 210, researchProjects: 17 },
  { id: 'inst-10', name: 'IIT Kharagpur', type: 'Government', discipline: 'Mechanical Engineering', location: 'Kharagpur', state: 'West Bengal', accreditation: 'NAAC A++', verified: true, students: 1540, industryPartners: 36, placements: 498, researchProjects: 45 },
]

export const institutionById = Object.fromEntries(institutions.map((i) => [i.id, i]))
