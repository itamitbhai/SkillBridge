import { Router } from 'express'
import { asyncHandler } from '../middleware/asyncHandler.js'
import Internship from '../models/Internship.js'
import StudentProfile from '../models/StudentProfile.js'
import { matchCandidateToIndustry } from '../services/aiService.js'

const router = Router()

// GET /api/industry/candidates?internshipId=&limit=
router.get(
  '/candidates',
  asyncHandler(async (req, res) => {
    const { internshipId, limit = 10 } = req.query
    if (!internshipId) return res.status(400).json({ error: 'internshipId query param is required.' })

    const [opportunity, students] = await Promise.all([
      Internship.findById(internshipId).lean(),
      StudentProfile.find().lean(),
    ])
    if (!opportunity) return res.status(404).json({ error: `Internship ${internshipId} not found.` })

    const ranked = matchCandidateToIndustry(students, opportunity).slice(0, Number(limit))
    res.json({ data: ranked })
  })
)

// POST /api/industry/opportunities  (alias for creating an internship posting)
router.post(
  '/opportunities',
  asyncHandler(async (req, res) => {
    const { title, company, discipline, description, location, duration, deadline } = req.body
    if (!title || !company || !discipline || !description || !location || !duration || !deadline) {
      return res.status(400).json({ error: 'title, company, discipline, description, location, duration and deadline are required.' })
    }
    const internship = await Internship.create({ ...req.body, deadline: new Date(deadline) })
    res.status(201).json({ internship })
  })
)

export default router
