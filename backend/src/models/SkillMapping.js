import mongoose from 'mongoose'

const skillMappingSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'StudentProfile', required: true, index: true },
    skills: { type: [String], default: [] },
    skillScore: { type: Number, min: 0, max: 100, default: 0 },
    gaps: [{ skill: String, current: Number, industryRequirement: Number, gap: Number }],
    recommendations: { type: [String], default: [] },
    industryMatches: [{ title: String, match: Number }],
  },
  { timestamps: true }
)

export default mongoose.model('SkillMapping', skillMappingSchema)
