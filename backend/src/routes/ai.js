import { Router } from 'express'
import { asyncHandler } from '../middleware/asyncHandler.js'
import { analyzeStudentSkills } from '../services/aiService.js'

const router = Router()

// POST /api/ai/skill-analysis  { input }
// Matches the endpoint frontend/src/services/aiService.js calls when
// USE_REMOTE_API is enabled — swap analyzeStudentSkills() for a call into
// the real Python ML service without changing this route's contract.
router.post(
  '/skill-analysis',
  asyncHandler(async (req, res) => {
    const { input } = req.body
    if (!input) return res.status(400).json({ error: 'input (skills array or text) is required.' })
    res.json(analyzeStudentSkills(input))
  })
)

export default router
