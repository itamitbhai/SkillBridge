import 'dotenv/config'
import { createApp } from './app.js'
import { connectDB } from './config/db.js'

const PORT = process.env.PORT || 4000

async function start() {
  await connectDB()
  const app = createApp()
  app.listen(PORT, () => {
    console.log(`[server] SkillBridge API listening on http://localhost:${PORT}`)
  })
}

start()
