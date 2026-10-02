import mongoose, { Schema } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, required: true, trim: true },
    schedule: { type: String, trim: true },
    maxAttendance: { type: Number, min: 1 },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    points: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true },
);

export const TeamModel = mongoose.models.Team ?? mongoose.model('Team', teamSchema);