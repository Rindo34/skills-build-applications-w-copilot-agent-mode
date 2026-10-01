import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import { ActivityModel } from '../models/Activity.js';
import { LeaderboardEntryModel } from '../models/LeaderboardEntry.js';
import { TeamModel } from '../models/Team.js';
import { UserModel } from '../models/User.js';
import { WorkoutModel } from '../models/Workout.js';

const updateOptions = {
  returnDocument: 'after',
  upsert: true,
  runValidators: true,
  setDefaultsOnInsert: true,
} as const;

const seedUsers = [
  { username: 'alexm', displayName: 'Alex Morgan', email: 'alex.morgan@octofit.dev', points: 420 },
  { username: 'jordanl', displayName: 'Jordan Lee', email: 'jordan.lee@octofit.dev', points: 365 },
  { username: 'caseyr', displayName: 'Casey Rivera', email: 'casey.rivera@octofit.dev', points: 510 },
  { username: 'taylork', displayName: 'Taylor Kim', email: 'taylor.kim@octofit.dev', points: 390 },
];

const seedTeams = [
  {
    slug: 'trailblazers',
    name: 'Trailblazers',
    description: 'Outdoor miles and steady progress.',
    memberEmails: ['alex.morgan@octofit.dev', 'jordan.lee@octofit.dev'],
    points: 3280,
  },
  {
    slug: 'pace-makers',
    name: 'Pace Makers',
    description: 'A little faster, together.',
    memberEmails: ['casey.rivera@octofit.dev', 'taylor.kim@octofit.dev'],
    points: 3015,
  },
];

const seedActivities = [
  {
    seedKey: 'alex-run-2026-09-28',
    email: 'alex.morgan@octofit.dev',
    activityType: 'running',
    durationMinutes: 32,
    distanceKm: 5.2,
    calories: 360,
    recordedAt: new Date('2026-09-28T07:30:00.000Z'),
  },
  {
    seedKey: 'jordan-cycle-2026-09-28',
    email: 'jordan.lee@octofit.dev',
    activityType: 'cycling',
    durationMinutes: 48,
    distanceKm: 16.4,
    calories: 430,
    recordedAt: new Date('2026-09-28T16:00:00.000Z'),
  },
  {
    seedKey: 'casey-strength-2026-09-29',
    email: 'casey.rivera@octofit.dev',
    activityType: 'strength',
    durationMinutes: 40,
    calories: 280,
    recordedAt: new Date('2026-09-29T08:00:00.000Z'),
  },
  {
    seedKey: 'taylor-yoga-2026-09-29',
    email: 'taylor.kim@octofit.dev',
    activityType: 'yoga',
    durationMinutes: 35,
    calories: 150,
    recordedAt: new Date('2026-09-29T18:00:00.000Z'),
  },
];

const seedWorkouts = [
  {
    slug: 'morning-mobility',
    title: 'Morning Mobility',
    description: 'A gentle sequence to build range of motion and start moving.',
    activityType: 'yoga',
    difficulty: 'beginner',
    durationMinutes: 20,
    exercises: ['Cat-cow', 'Worlds greatest stretch', 'Low lunge', 'Standing fold'],
  },
  {
    slug: 'steady-5k',
    title: 'Steady 5K',
    description: 'An even-paced endurance run with a relaxed finish.',
    activityType: 'running',
    difficulty: 'intermediate',
    durationMinutes: 35,
    exercises: ['Easy warm-up', 'Steady run', 'Cool-down walk'],
  },
  {
    slug: 'full-body-basics',
    title: 'Full-body Basics',
    description: 'A balanced strength circuit using bodyweight movements.',
    activityType: 'strength',
    difficulty: 'beginner',
    durationMinutes: 30,
    exercises: ['Squats', 'Incline push-ups', 'Glute bridges', 'Dead bugs'],
  },
  {
    slug: 'hill-intervals',
    title: 'Hill Intervals',
    description: 'Short uphill efforts to develop running power and control.',
    activityType: 'running',
    difficulty: 'advanced',
    durationMinutes: 40,
    exercises: ['Warm-up jog', 'Six hill repeats', 'Recovery jog', 'Cool-down'],
  },
];

/** Seed the octofit_db database with test data. */
async function seedDatabase(): Promise<void> {
  try {
    await connectDatabase();

    const users = await Promise.all(
      seedUsers.map((user) => UserModel.findOneAndUpdate({ email: user.email }, { $set: user }, updateOptions)),
    );
    const userByEmail = new Map(users.map((user) => [user.email, user]));

    function getUserId(email: string) {
      const user = userByEmail.get(email);
      if (!user) throw new Error(`Seed user not found: ${email}`);
      return user._id;
    }

    const teams = await Promise.all(
      seedTeams.map(({ memberEmails, ...team }) =>
        TeamModel.findOneAndUpdate(
          { slug: team.slug },
          { $set: { ...team, members: memberEmails.map(getUserId) } },
          updateOptions,
        ),
      ),
    );
    const teamBySlug = new Map(teams.map((team) => [team.slug, team]));

    await Promise.all(
      seedActivities.map(({ email, ...activity }) =>
        ActivityModel.findOneAndUpdate(
          { seedKey: activity.seedKey },
          { $set: { ...activity, user: getUserId(email) } },
          updateOptions,
        ),
      ),
    );

    await Promise.all(
      seedTeams.map((team, rank) => {
        const savedTeam = teamBySlug.get(team.slug);
        if (!savedTeam) throw new Error(`Seed team not found: ${team.slug}`);
        return LeaderboardEntryModel.findOneAndUpdate(
          { team: savedTeam._id, period: 'all-time' },
          { $set: { points: team.points, rank: rank + 1 } },
          updateOptions,
        );
      }),
    );

    await Promise.all(
      seedWorkouts.map((workout) =>
        WorkoutModel.findOneAndUpdate({ slug: workout.slug }, { $set: workout }, updateOptions),
      ),
    );

    const [usersCount, teamsCount, activitiesCount, leaderboardCount, workoutsCount] = await Promise.all([
      UserModel.countDocuments(),
      TeamModel.countDocuments(),
      ActivityModel.countDocuments(),
      LeaderboardEntryModel.countDocuments(),
      WorkoutModel.countDocuments(),
    ]);

    console.log('OctoFit seed complete:', {
      users: usersCount,
      teams: teamsCount,
      activities: activitiesCount,
      leaderboardEntries: leaderboardCount,
      workouts: workoutsCount,
    });
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase().catch((error: unknown) => {
  console.error('Error seeding database:', error);
  process.exitCode = 1;
});
