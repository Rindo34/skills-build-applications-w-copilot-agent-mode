import mongoose, { Schema } from 'mongoose';
const leaderboardEntrySchema = new Schema({
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    period: { type: String, enum: ['weekly', 'monthly', 'all-time'], required: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
}, { timestamps: true, collection: 'leaderboards' });
leaderboardEntrySchema.index({ team: 1, period: 1 }, { unique: true });
export const LeaderboardEntryModel = mongoose.models.LeaderboardEntry ?? mongoose.model('LeaderboardEntry', leaderboardEntrySchema);
