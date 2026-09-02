import mongoose from 'mongoose'

const studentProfileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    institution: { type: String, required: true },
    course: { type: String, required: true },
    discipline: { type: String, enum: ['Computer Science & Engineering', 'Information Technology', 'Electronics & Communication', 'Electrical Engineering', 'Mechanical Engineering'], required: true },
    year: { type: String, required: true },
    skills: { type: [String], default: [] },
    certifications: { type: [String], default: [] },
    projects: { type: [String], default: [] },
    researchInterests: { type: [String], default: [] },
    careerInterests: { type: [String], default: [] },
    resume: { type: String, default: '' },
    skillScore: { type: Number, default: 0, min: 0, max: 100 },
  },
  { timestamps: true }
)

export default mongoose.model('StudentProfile', studentProfileSchema)
