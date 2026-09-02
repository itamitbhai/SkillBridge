import mongoose from 'mongoose'

const collaborationSchema = new mongoose.Schema(
  {
    rndChallengeId: { type: mongoose.Schema.Types.ObjectId, ref: 'RnDChallenge' },
    institutionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Institution' },
    industryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Industry' },
    project: { type: String, required: true },
    institution: { type: String, required: true },
    industry: { type: String, required: true },
    status: { type: String, enum: ['Proposed', 'In Progress', 'Completed'], default: 'Proposed' },
    startDate: { type: Date },
    targetEndDate: { type: Date },
    members: [{ name: String, role: String, org: String }],
    milestones: [{ title: String, due: Date, status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' } }],
    documents: [{ name: String, uploadedBy: String, date: Date }],
    tasks: [{ title: String, assignee: String, status: { type: String, enum: ['Open', 'In Progress', 'Completed'], default: 'Open' } }],
    deliverables: { type: [String], default: [] },
  },
  { timestamps: true }
)

export default mongoose.model('Collaboration', collaborationSchema)
