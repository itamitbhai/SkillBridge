import { Router } from 'express'
import { asyncHandler } from '../middleware/asyncHandler.js'
import User from '../models/User.js'
import Institution from '../models/Institution.js'
import Industry from '../models/Industry.js'
import Internship from '../models/Internship.js'
import Technology from '../models/Technology.js'

const router = Router()

const VERIFIABLE = {
  institution: { model: Institution, field: 'verified' },
  industry: { model: Industry, field: 'verified' },
  internship: { model: Internship, field: 'verified' },
  technology: { model: Technology, field: 'patentStatus', pendingValue: 'Not Filed', approvedValue: 'Filed' },
}

// GET /api/admin/users
router.get(
  '/users',
  asyncHandler(async (req, res) => {
    const users = await User.find().sort({ createdAt: -1 }).lean()
    res.json({ data: users })
  })
)

// GET /api/admin/verifications?type=institution|industry|internship|technology
router.get(
  '/verifications',
  asyncHandler(async (req, res) => {
    const { type } = req.query
    const types = type ? [type] : Object.keys(VERIFIABLE)

    const results = {}
    for (const t of types) {
      const cfg = VERIFIABLE[t]
      if (!cfg) continue
      const query = cfg.pendingValue ? { [cfg.field]: cfg.pendingValue } : { [cfg.field]: false }
      results[t] = await cfg.model.find(query).lean()
    }

    res.json({ data: results })
  })
)

// PUT /api/admin/verifications/:id  { type, action: 'approve' | 'reject' }
router.put(
  '/verifications/:id',
  asyncHandler(async (req, res) => {
    const { type, action } = req.body
    const cfg = VERIFIABLE[type]
    if (!cfg) return res.status(400).json({ error: 'type must be one of institution, industry, internship, technology.' })
    if (!['approve', 'reject'].includes(action)) return res.status(400).json({ error: 'action must be approve or reject.' })

    const doc = await cfg.model.findById(req.params.id)
    if (!doc) return res.status(404).json({ error: `${type} ${req.params.id} not found.` })

    if (action === 'approve') {
      doc[cfg.field] = cfg.approvedValue !== undefined ? cfg.approvedValue : true
    }
    await doc.save()

    res.json({ [type]: doc })
  })
)

export default router
