import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { dbStatus } from './config/db.js'
import { notFound, errorHandler } from './middleware/errorHandler.js'

import authRoutes from './routes/auth.js'
import studentsRoutes from './routes/students.js'
import internshipsRoutes from './routes/internships.js'
import applicationsRoutes from './routes/applications.js'
import industryRoutes from './routes/industry.js'
import rndRoutes from './routes/rnd.js'
import technologiesRoutes from './routes/technologies.js'
import analyticsRoutes from './routes/analytics.js'
import adminRoutes from './routes/admin.js'
import aiRoutes from './routes/ai.js'

export function createApp() {
  const app = express()

  app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }))
  app.use(express.json({ limit: '2mb' }))
  app.use(morgan('dev'))

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', database: dbStatus() })
  })

  app.use('/api/auth', authRoutes)
  app.use('/api/students', studentsRoutes)
  app.use('/api/internships', internshipsRoutes)
  app.use('/api/applications', applicationsRoutes)
  app.use('/api/industry', industryRoutes)
  app.use('/api/rnd', rndRoutes)
  app.use('/api/technologies', technologiesRoutes)
  app.use('/api/analytics', analyticsRoutes)
  app.use('/api/admin', adminRoutes)
  app.use('/api/ai', aiRoutes)

  app.use(notFound)
  app.use(errorHandler)

  return app
}
