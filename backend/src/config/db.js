import mongoose from 'mongoose'

let isConnected = false

export async function connectDB() {
  const uri = process.env.MONGO_URI
  if (!uri) {
    console.warn('[db] MONGO_URI not set — API will start but database-backed routes will fail until configured.')
    return
  }
  try {
    await mongoose.connect(uri)
    isConnected = true
    console.log('[db] Connected to MongoDB')
  } catch (err) {
    console.error('[db] MongoDB connection failed:', err.message)
    console.warn('[db] Server will continue running; database-backed routes will return errors until MongoDB is reachable.')
  }
}

export function dbStatus() {
  return isConnected || mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
}
