import mongoose, { Schema } from 'mongoose';
const activitySchema = new Schema({
    seedKey: { type: String, required: true, unique: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    activityType: {
        type: String,
        enum: ['walking', 'running', 'cycling', 'strength', 'yoga'],
        required: true,
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    distanceKm: { type: Number, min: 0 },
    calories: { type: Number, required: true, min: 0 },
    recordedAt: { type: Date, required: true },
}, { timestamps: true });
export const ActivityModel = mongoose.models.Activity ?? mongoose.model('Activity', activitySchema);
