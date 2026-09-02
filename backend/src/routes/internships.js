import { Router } from 'express'
import { asyncHandler } from '../middleware/asyncHandler.js'
import Internship from '../models/Internship.js'
import Application from '../models/Application.js'
import StudentProfile from '../models/StudentProfile.js'
import { matchStudentToInternship } from '../services/aiService.js'

const router = Router()

// GET /api/internships?discipline=&location=&verified=&search=&page=&pageSize=
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { discipline, location, verified, search, page = 1, pageSize = 12 } = req.query
    const query = {}
    if (discipline) query.discipline = discipline
    if (location) query.location = location
    if (verified !== undefined) query.verified = verified === 'true'
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
      ]
    }

    const skip = (Number(page) - 1) * Number(pageSize)
    const [internships, total] = await Promise.all([
      Internship.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(pageSize)).lean(),
      Internship.countDocuments(query),
    ])

    res.json({ data: internships, total, page: Number(page), pageSize: Number(pageSize) })
  })
)

// GET /api/internships/:id
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const internship = await Internship.findById(req.params.id).lean()
    if (!internship) return res.status(404).json({ error: `Internship ${req.params.id} not found.` })
    res.json({ internship })
  })
)

// POST /api/internships
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { title, company, discipline, description, skills, location, duration, deadline } = req.body
    if (!title || !company || !discipline || !description || !location || !duration || !deadline) {
      return res.status(400).json({ error: 'title, company, discipline, description, location, duration and deadline are required.' })
    }
    const internship = await Internship.create({ ...req.body, deadline: new Date(deadline) })
    res.status(201).json({ internship })
  })
)

// POST /api/internships/:id/apply  { studentId }
router.post(
  '/:id/apply',
  asyncHandler(async (req, res) => {
    const { studentId } = req.body
    if (!studentId) return res.status(400).json({ error: 'studentId is required.' })

    const [internship, student] = await Promise.all([
      Internship.findById(req.params.id).lean(),
      StudentProfile.findById(studentId).lean(),
    ])
    if (!internship) return res.status(404).json({ error: `Internship ${req.params.id} not found.` })
    if (!student) return res.status(404).json({ error: `Student ${studentId} not found.` })

    const { score } = matchStudentToInternship(student, internship)

    const application = await Application.create({
      studentId,
      internshipId: internship._id,
      matchScore: score,
      status: 'Applied',
    })

    res.status(201).json({ application })
  })
)

export default router
