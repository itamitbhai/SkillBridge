import mongoose from 'mongoose'

const industrySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    industryType: {
      type: String,
      enum: ['IT Services', 'Product', 'Analytics', 'Cloud', 'FinTech', 'E-commerce', 'Core Engineering'],
      required: true,
    },
    location: { type: String, required: true },
    state: { type: String, required: true },
    description: { type: String, default: '' },
    skillsRequired: { type: [String], default: [] },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export default mongoose.model('Industry', industrySchema)
