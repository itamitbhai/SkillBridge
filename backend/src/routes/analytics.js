import { Router } from 'express'
import { asyncHandler } from '../middleware/asyncHandler.js'
import StudentProfile from '../models/StudentProfile.js'
import Institution from '../models/Institution.js'
import Industry from '../models/Industry.js'
import Internship from '../models/Internship.js'
import Application from '../models/Application.js'
import Collaboration from '../models/Collaboration.js'
import Technology from '../models/Technology.js'
import { analyzeIndustryDemand } from '../services/aiService.js'

const router = Router()

// GET /api/analytics/dashboard — Platform ecosystem overview
router.get(
  '/dashboard',
  asyncHandler(async (req, res) => {
    const [registeredStudents, academicInstitutions, industryPartners, verifiedInternships, activeCollaborations, patentsTechnologies, placements] =
      await Promise.all([
        StudentProfile.countDocuments(),
        Institution.countDocuments(),
        Industry.countDocuments(),
        Internship.countDocuments({ verified: true }),
        Collaboration.countDocuments({ status: { $ne: 'Completed' } }),
        Technology.countDocuments(),
        Application.countDocuments({ status: 'Selected' }),
      ])

    res.json({ registeredStudents, academicInstitutions, industryPartners, verifiedInternships, activeCollaborations, patentsTechnologies, placements })
  })
)

// GET /api/analytics/skills — industry demand vs. registered student skill supply
router.get(
  '/skills',
  asyncHandler(async (req, res) => {
    const demand = analyzeIndustryDemand()
    const students = await StudentProfile.find().select('skills').lean()
    const total = students.length || 1

    const skillGaps = demand.map((d) => {
      const supplyCount = students.filter((s) => (s.skills || []).some((sk) => sk.toLowerCase() === d.skill.toLowerCase())).length
      return { skill: d.skill, demand: d.demand, supply: Math.round((supplyCount / total) * 100) }
    })

    res.json({ skillGaps })
  })
)

// GET /api/analytics/internships — application/placement trend by month
router.get(
  '/internships',
  asyncHandler(async (req, res) => {
    const applications = await Application.find().lean()
    const buckets = {}
    for (const a of applications) {
      const month = new Date(a.appliedAt).toLocaleString('en-US', { month: 'short' })
      if (!buckets[month]) buckets[month] = { month, applications: 0, placements: 0 }
      buckets[month].applications += 1
      if (a.status === 'Selected') buckets[month].placements += 1
    }
    res.json({ monthlyTrends: Object.values(buckets) })
  })
)

// GET /api/analytics/placements — placement rate summary
router.get(
  '/placements',
  asyncHandler(async (req, res) => {
    const total = await Application.countDocuments()
    const selected = await Application.countDocuments({ status: 'Selected' })
    res.json({ totalApplications: total, totalPlacements: selected, placementRate: total ? Math.round((selected / total) * 100) : 0 })
  })
)

export default router
