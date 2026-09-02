import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ['student', 'institution', 'industry', 'admin'], required: true },
    phone: { type: String, default: '' },
    avatar: { type: String, default: '' },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export default mongoose.model('User', userSchema)
