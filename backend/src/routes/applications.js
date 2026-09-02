import { Router } from 'express'
import { asyncHandler } from '../middleware/asyncHandler.js'
import Application from '../models/Application.js'

const router = Router()

// GET /api/applications?studentId=&internshipId=&status=
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { studentId, internshipId, status } = req.query
    const query = {}
    if (studentId) query.studentId = studentId
    if (internshipId) query.internshipId = internshipId
    if (status) query.status = status

    const applications = await Application.find(query)
      .populate('internshipId', 'title company location')
      .sort({ appliedAt: -1 })
      .lean()

    res.json({ data: applications })
  })
)

export default router
