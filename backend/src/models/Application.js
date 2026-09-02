import mongoose from 'mongoose'

const applicationSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'StudentProfile', required: true, index: true },
    internshipId: { type: mongoose.Schema.Types.ObjectId, ref: 'Internship', required: true, index: true },
    matchScore: { type: Number, min: 0, max: 100, default: 0 },
    status: {
      type: String,
      enum: ['Applied', 'Under Review', 'Shortlisted', 'Interview', 'Selected', 'Rejected'],
      default: 'Applied',
    },
    appliedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
)

export default mongoose.model('Application', applicationSchema)
