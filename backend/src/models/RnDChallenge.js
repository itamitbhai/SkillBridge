import mongoose from 'mongoose'

const rndChallengeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    industry: { type: String, required: true },
    industryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Industry' },
    description: { type: String, required: true },
    category: { type: String, required: true },
    skills: { type: [String], default: [] },
    funding: { type: Number, default: 0 },
    duration: { type: String, default: '' },
    collaborationType: { type: String, default: 'Industry + Academia' },
    status: { type: String, enum: ['Open', 'In Progress', 'Closed'], default: 'Open' },
  },
  { timestamps: true }
)

export default mongoose.model('RnDChallenge', rndChallengeSchema)
