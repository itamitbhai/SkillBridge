import { Router } from 'express'
import { asyncHandler } from '../middleware/asyncHandler.js'
import Technology from '../models/Technology.js'
import LicensingRequest from '../models/LicensingRequest.js'

const router = Router()

// GET /api/technologies?category=&licensingStatus=&search=
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { category, licensingStatus, search } = req.query
    const query = {}
    if (category) query.category = category
    if (licensingStatus) query.licensingStatus = licensingStatus
    if (search) query.title = { $regex: search, $options: 'i' }

    const technologies = await Technology.find(query).sort({ createdAt: -1 }).lean()
    res.json({ data: technologies })
  })
)

// GET /api/technologies/:id
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const technology = await Technology.findById(req.params.id).lean()
    if (!technology) return res.status(404).json({ error: `Technology ${req.params.id} not found.` })
    res.json({ technology })
  })
)

// POST /api/technologies
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { title, institution, inventor, description, trl, category } = req.body
    if (!title || !institution || !inventor || !description || !trl || !category) {
      return res.status(400).json({ error: 'title, institution, inventor, description, trl and category are required.' })
    }
    const technology = await Technology.create(req.body)
    res.status(201).json({ technology })
  })
)

// POST /api/technologies/:id/license  { company, intendedUse, proposal }
router.post(
  '/:id/license',
  asyncHandler(async (req, res) => {
    const { company, intendedUse, proposal, companyId } = req.body
    if (!company || !intendedUse || !proposal) {
      return res.status(400).json({ error: 'company, intendedUse and proposal are required.' })
    }
    const technology = await Technology.findById(req.params.id)
    if (!technology) return res.status(404).json({ error: `Technology ${req.params.id} not found.` })

    const request = await LicensingRequest.create({
      technologyId: technology._id,
      companyId,
      company,
      intendedUse,
      proposal,
      status: 'Submitted',
    })

    if (technology.licensingStatus === 'Available') {
      technology.licensingStatus = 'Under Negotiation'
      await technology.save()
    }

    res.status(201).json({ request })
  })
)

export default router
