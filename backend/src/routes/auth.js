import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { asyncHandler } from '../middleware/asyncHandler.js'
import User from '../models/User.js'
import StudentProfile from '../models/StudentProfile.js'

const router = Router()

function toPublicUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    phone: user.phone,
    avatar: user.avatar,
    verified: user.verified,
  }
}

// POST /api/auth/register
router.post(
  '/register',
  asyncHandler(async (req, res) => {
    const { name, email, password, role, phone, profile } = req.body
    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'name, email, password and role are required.' })
    }

    const existing = await User.findOne({ email: email.toLowerCase() })
    if (existing) return res.status(409).json({ error: 'An account with this email already exists.' })

    const passwordHash = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email: email.toLowerCase(), password: passwordHash, role, phone })

    if (role === 'student' && profile) {
      await StudentProfile.create({
        userId: user._id,
        institution: profile.institution || '',
        course: profile.course || '',
        discipline: profile.discipline || 'Computer Science & Engineering',
        year: profile.year || '1st Year',
      })
    }

    res.status(201).json({ user: toPublicUser(user), token: `demo-session-${user._id}` })
  })
)

// POST /api/auth/login
router.post(
  '/login',
  asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required.' })

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password')
    if (!user) return res.status(401).json({ error: 'Invalid email or password.' })

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) return res.status(401).json({ error: 'Invalid email or password.' })

    res.json({ user: toPublicUser(user), token: `demo-session-${user._id}` })
  })
)

// GET /api/auth/me
router.get(
  '/me',
  asyncHandler(async (req, res) => {
    const token = (req.headers.authorization || '').replace('Bearer ', '')
    const userId = token.replace('demo-session-', '')
    if (!userId) return res.status(401).json({ error: 'Not authenticated.' })

    const user = await User.findById(userId)
    if (!user) return res.status(401).json({ error: 'Session not found.' })

    res.json({ user: toPublicUser(user) })
  })
)

export default router
