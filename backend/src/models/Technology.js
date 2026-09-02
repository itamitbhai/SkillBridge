import mongoose from 'mongoose'

const technologySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    institution: { type: String, required: true },
    institutionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Institution' },
    inventor: { type: String, required: true },
    description: { type: String, required: true },
    patentStatus: { type: String, enum: ['Not Filed', 'Filed', 'Granted'], default: 'Not Filed' },
    trl: { type: Number, min: 1, max: 9, required: true },
    category: { type: String, required: true },
    applicationArea: { type: [String], default: [] },
    licensingStatus: { type: String, enum: ['Available', 'Under Negotiation', 'Licensed'], default: 'Available' },
  },
  { timestamps: true }
)

export default mongoose.model('Technology', technologySchema)
