import mongoose, { Schema } from 'mongoose';
const workoutSchema = new Schema({
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    activityType: {
        type: String,
        enum: ['walking', 'running', 'cycling', 'strength', 'yoga'],
        required: true,
    },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    exercises: [{ type: String, required: true, trim: true }],
}, { timestamps: true });
export const WorkoutModel = mongoose.models.Workout ?? mongoose.model('Workout', workoutSchema);
