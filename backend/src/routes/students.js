import { Router } from 'express'
import { asyncHandler } from '../middleware/asyncHandler.js'
import StudentProfile from '../models/StudentProfile.js'
import SkillMapping from '../models/SkillMapping.js'
import { analyzeStudentSkills } from '../services/aiService.js'

const router = Router()

// GET /api/students/:id
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const student = await StudentProfile.findById(req.params.id).lean()
    if (!student) return res.status(404).json({ error: `Student ${req.params.id} not found.` })
    res.json({ student })
  })
)

// PUT /api/students/:id
router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const student = await StudentProfile.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!student) return res.status(404).json({ error: `Student ${req.params.id} not found.` })
    res.json({ student })
  })
)

// POST /api/students/skill-analysis  { studentId?, skills } or { studentId?, text }
router.post(
  '/skill-analysis',
  asyncHandler(async (req, res) => {
    const { studentId, skills, text } = req.body
    const input = skills || text
    if (!input) return res.status(400).json({ error: 'skills (array) or text (string) is required.' })

    const analysis = analyzeStudentSkills(input)

    if (studentId) {
      await SkillMapping.create({
        studentId,
        skills: analysis.matchedSkills,
        skillScore: analysis.overallScore,
        gaps: analysis.skillGaps.map((g) => ({ skill: g.skill, current: g.supply, industryRequirement: g.demand, gap: g.demand - g.supply })),
        recommendations: analysis.recommendedSkills,
        industryMatches: analysis.careerPaths.map((c) => ({ title: c.title, match: c.match })),
      })
      await StudentProfile.findByIdAndUpdate(studentId, { skillScore: analysis.overallScore })
    }

    res.json(analysis)
  })
)

export default router
