// Seeds MongoDB with the same realistic SkillBridge dataset the frontend
// ships as local mock data (frontend/src/data/*), so the backend and the
// demo UI show consistent records once wired together.
//
// Usage: npm run seed   (requires MONGO_URI in backend/.env)

import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

import { connectDB } from '../config/db.js'
import User from '../models/User.js'
import StudentProfile from '../models/StudentProfile.js'
import Institution from '../models/Institution.js'
import Industry from '../models/Industry.js'
import Internship from '../models/Internship.js'
import Application from '../models/Application.js'
import RnDChallenge from '../models/RnDChallenge.js'
import Technology from '../models/Technology.js'
import LicensingRequest from '../models/LicensingRequest.js'
import Collaboration from '../models/Collaboration.js'

import { students } from '../../../frontend/src/data/students.js'
import { institutions } from '../../../frontend/src/data/institutions.js'
import { industries } from '../../../frontend/src/data/industries.js'
import { internships } from '../../../frontend/src/data/internships.js'
import { applications } from '../../../frontend/src/data/applications.js'
import { rndChallenges } from '../../../frontend/src/data/rndChallenges.js'
import { technologies } from '../../../frontend/src/data/technologies.js'
import { licensingRequests } from '../../../frontend/src/data/licensingRequests.js'
import { collaborations } from '../../../frontend/src/data/collaborations.js'
import { demoUsers } from '../../../frontend/src/data/users.js'

async function seed() {
  await connectDB()
  if (mongoose.connection.readyState !== 1) {
    console.error('[seed] No active MongoDB connection — aborting. Set MONGO_URI in backend/.env.')
    process.exit(1)
  }

  console.log('[seed] Clearing existing collections...')
  await Promise.all([
    User.deleteMany({}),
    StudentProfile.deleteMany({}),
    Institution.deleteMany({}),
    Industry.deleteMany({}),
    Internship.deleteMany({}),
    Application.deleteMany({}),
    RnDChallenge.deleteMany({}),
    Technology.deleteMany({}),
    LicensingRequest.deleteMany({}),
    Collaboration.deleteMany({}),
  ])

  const demoPasswordHash = await bcrypt.hash('demo1234', 10)

  console.log('[seed] Creating demo accounts (one per role)...')
  for (const account of Object.values(demoUsers)) {
    await User.create({
      name: account.name,
      email: account.email,
      password: demoPasswordHash,
      role: account.role,
      verified: true,
    })
  }

  console.log(`[seed] Inserting ${institutions.length} institutions...`)
  const institutionDocs = await Institution.insertMany(
    institutions.map((i) => ({
      name: i.name,
      type: i.type,
      discipline: i.discipline,
      location: i.location,
      state: i.state,
      accreditation: i.accreditation,
      verified: i.verified,
    }))
  )
  const institutionIdByName = Object.fromEntries(institutionDocs.map((d) => [d.name, d._id]))

  console.log(`[seed] Inserting ${industries.length} industries...`)
  const industryDocs = await Industry.insertMany(
    industries.map((i) => ({
      name: i.name,
      industryType: i.industryType,
      location: i.location,
      state: i.state,
      description: i.description,
      skillsRequired: i.skillsRequired,
      verified: i.verified,
    }))
  )
  const industryIdByName = Object.fromEntries(industryDocs.map((d) => [d.name, d._id]))

  console.log(`[seed] Inserting ${students.length} students (user + profile each)...`)
  const studentPasswordHash = await bcrypt.hash('student1234', 10)
  const studentProfileIdByFrontendId = {}
  for (const s of students) {
    const user = await User.create({ name: s.name, email: s.email, password: studentPasswordHash, role: 'student', verified: true })
    const profile = await StudentProfile.create({
      userId: user._id,
      institution: s.institution,
      course: s.course,
      discipline: s.discipline,
      year: s.year,
      skills: s.skills,
      certifications: s.certifications,
      projects: s.projects,
      researchInterests: s.researchInterests,
      careerInterests: s.careerInterests,
      skillScore: s.skillScore,
    })
    studentProfileIdByFrontendId[s.id] = profile._id
  }

  console.log(`[seed] Inserting ${internships.length} internships...`)
  const internshipIdByFrontendId = {}
  for (const i of internships) {
    const doc = await Internship.create({
      title: i.title,
      company: i.company,
      companyId: industryIdByName[i.company],
      discipline: i.discipline,
      description: i.description,
      skills: i.skills,
      location: i.location,
      state: i.state,
      duration: i.duration,
      stipend: i.stipend,
      type: i.workMode,
      verified: i.verified,
      deadline: new Date(i.deadline),
      supervisor: i.supervisor,
      eligibility: i.eligibility,
      responsibilities: i.responsibilities,
      learningOutcomes: i.learningOutcomes,
      verification: i.verification,
    })
    internshipIdByFrontendId[i.id] = doc._id
  }

  console.log(`[seed] Inserting ${applications.length} applications...`)
  await Application.insertMany(
    applications
      .filter((a) => studentProfileIdByFrontendId[a.studentId] && internshipIdByFrontendId[a.internshipId])
      .map((a) => ({
        studentId: studentProfileIdByFrontendId[a.studentId],
        internshipId: internshipIdByFrontendId[a.internshipId],
        matchScore: a.matchScore,
        status: a.status,
        appliedAt: new Date(a.appliedAt),
      }))
  )

  console.log(`[seed] Inserting ${rndChallenges.length} R&D challenges...`)
  const rndIdByFrontendId = {}
  for (const c of rndChallenges) {
    const doc = await RnDChallenge.create({
      title: c.title,
      industry: c.company,
      industryId: industryIdByName[c.company],
      description: c.problem,
      category: c.category,
      skills: c.skills,
      funding: c.budget,
      duration: c.expectedDuration,
      collaborationType: c.collaborationType,
      status: c.status,
    })
    rndIdByFrontendId[c.id] = doc._id
  }

  console.log(`[seed] Inserting ${technologies.length} technologies...`)
  const technologyIdByFrontendId = {}
  for (const t of technologies) {
    const doc = await Technology.create({
      title: t.title,
      institution: t.institution,
      institutionId: institutionIdByName[t.institution],
      inventor: t.inventor,
      description: t.description,
      patentStatus: t.patentStatus,
      trl: t.trl,
      category: t.category,
      applicationArea: t.applicationArea,
      licensingStatus: t.licensingStatus,
    })
    technologyIdByFrontendId[t.id] = doc._id
  }

  console.log(`[seed] Inserting ${licensingRequests.length} licensing requests...`)
  await LicensingRequest.insertMany(
    licensingRequests
      .filter((l) => technologyIdByFrontendId[l.technologyId])
      .map((l) => ({
        technologyId: technologyIdByFrontendId[l.technologyId],
        companyId: industryIdByName[l.company],
        company: l.company,
        intendedUse: l.intendedUse,
        proposal: l.proposal,
        status: l.status,
        createdAt: new Date(l.requestedAt),
      }))
  )

  console.log(`[seed] Inserting ${collaborations.length} collaborations...`)
  await Collaboration.insertMany(
    collaborations.map((c) => ({
      rndChallengeId: rndIdByFrontendId[c.rndChallengeId],
      institutionId: institutionIdByName[c.institution],
      industryId: industryIdByName[c.industry],
      project: c.project,
      institution: c.institution,
      industry: c.industry,
      status: c.status === 'In Progress' ? 'In Progress' : c.status === 'Completed' ? 'Completed' : 'Proposed',
      startDate: new Date(c.startDate),
      targetEndDate: new Date(c.targetEndDate),
      members: c.members,
      milestones: c.milestones.map((m) => ({ ...m, due: new Date(m.due) })),
      documents: c.documents.map((d) => ({ ...d, date: new Date(d.date) })),
      tasks: c.tasks,
      deliverables: c.deliverables,
    }))
  )

  console.log('[seed] Done.')
  console.log('[seed] Demo logins (password: demo1234):')
  Object.values(demoUsers).forEach((u) => console.log(`  - ${u.roleLabel}: ${u.email}`))
  await mongoose.disconnect()
  process.exit(0)
}

seed().catch((err) => {
  console.error('[seed] Failed:', err)
  process.exit(1)
})
