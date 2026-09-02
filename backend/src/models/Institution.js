import mongoose from 'mongoose'

const institutionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    type: { type: String, enum: ['Government', 'Deemed University', 'Autonomous', 'Private Affiliated'], required: true },
    discipline: { type: String, enum: ['Computer Science & Engineering', 'Information Technology', 'Electronics & Communication', 'Electrical Engineering', 'Mechanical Engineering'], required: true },
    location: { type: String, required: true },
    state: { type: String, required: true },
    accreditation: { type: String, default: '' },
    verified: { type: Boolean, default: false },
    contact: {
      name: String,
      email: String,
      phone: String,
    },
  },
  { timestamps: true }
)

export default mongoose.model('Institution', institutionSchema)
