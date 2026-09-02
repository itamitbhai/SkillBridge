import { Router } from 'express'
import { asyncHandler } from '../middleware/asyncHandler.js'
import RnDChallenge from '../models/RnDChallenge.js'

const router = Router()

// GET /api/rnd?category=&status=&search=
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { category, status, search } = req.query
    const query = {}
    if (category) query.category = category
    if (status) query.status = status
    if (search) query.title = { $regex: search, $options: 'i' }

    const challenges = await RnDChallenge.find(query).sort({ createdAt: -1 }).lean()
    res.json({ data: challenges })
  })
)

// GET /api/rnd/:id
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const challenge = await RnDChallenge.findById(req.params.id).lean()
    if (!challenge) return res.status(404).json({ error: `Challenge ${req.params.id} not found.` })
    res.json({ challenge })
  })
)

// POST /api/rnd
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { title, industry, description, category, skills } = req.body
    if (!title || !industry || !description || !category) {
      return res.status(400).json({ error: 'title, industry, description and category are required.' })
    }
    const challenge = await RnDChallenge.create(req.body)
    res.status(201).json({ challenge })
  })
)

export default router
