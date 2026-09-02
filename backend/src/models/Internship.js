import mongoose from 'mongoose'

const internshipSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Industry' },
    discipline: { type: String, enum: ['Computer Science & Engineering', 'Information Technology', 'Electronics & Communication', 'Electrical Engineering', 'Mechanical Engineering'], required: true },
    description: { type: String, required: true },
    skills: { type: [String], default: [] },
    location: { type: String, required: true },
    state: { type: String, default: '' },
    duration: { type: String, required: true },
    stipend: { type: Number, default: 0 },
    type: { type: String, enum: ['On-site', 'Remote', 'Hybrid'], default: 'On-site' },
    verified: { type: Boolean, default: false },
    deadline: { type: Date, required: true },
    supervisor: { type: String, default: '' },
    eligibility: { type: String, default: '' },
    responsibilities: { type: [String], default: [] },
    learningOutcomes: { type: [String], default: [] },
    verification: {
      institutionVerified: { type: Boolean, default: false },
      industryVerified: { type: Boolean, default: false },
      supervisorAssigned: { type: Boolean, default: false },
      durationVerified: { type: Boolean, default: false },
      certificateProvided: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
)

export default mongoose.model('Internship', internshipSchema)
