import mongoose from 'mongoose'

const licensingRequestSchema = new mongoose.Schema(
  {
    technologyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Technology', required: true, index: true },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Industry' },
    company: { type: String, required: true },
    intendedUse: { type: String, required: true },
    proposal: { type: String, required: true },
    status: {
      type: String,
      enum: ['Submitted', 'Under Review', 'Negotiation', 'Approved', 'Rejected'],
      default: 'Submitted',
    },
  },
  { timestamps: true }
)

export default mongoose.model('LicensingRequest', licensingRequestSchema)
