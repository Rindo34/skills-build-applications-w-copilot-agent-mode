import cors from 'cors';
import express from 'express';
import { connectDatabase } from './config/database.js';
import { ActivityModel } from './models/Activity.js';
import { LeaderboardEntryModel } from './models/LeaderboardEntry.js';
import { TeamModel } from './models/Team.js';
import { UserModel } from './models/User.js';
import { WorkoutModel } from './models/Workout.js';

const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(cors());
app.use(express.json());

app.get('/api', (_request, response) => {
  response.json({
    users: `${baseUrl}/api/users`,
    activities: `${baseUrl}/api/activities`,
    teams: `${baseUrl}/api/teams`,
    leaderboard: `${baseUrl}/api/leaderboard`,
    workouts: `${baseUrl}/api/workouts`,
  });
});

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', database: 'connected', baseUrl });
});

app.get('/api/users', async (_request, response, next) => {
  try {
    response.json(await UserModel.find().sort({ points: -1 }).lean());
  } catch (error) {
    next(error);
  }
});

app.get('/api/teams', async (_request, response, next) => {
  try {
    response.json(await TeamModel.find().populate('members').sort({ name: 1 }));
  } catch (error) {
    next(error);
  }
});

app.get('/api/activities', async (_request, response, next) => {
  try {
    response.json(
      await ActivityModel.find().populate('user', 'username displayName').sort({ recordedAt: -1 }).lean(),
    );
  } catch (error) {
    next(error);
  }
});

async function startServer(): Promise<void> {
  await connectDatabase();
  app.listen(port, '0.0.0.0', () => {
    console.log(`OctoFit API listening on port ${port} (${baseUrl}/api)`);
  });
}

app.get('/api/leaderboard', async (_request, response, next) => {
  try {
    response.json(await LeaderboardEntryModel.find().populate('team').sort({ rank: 1 }));
  } catch (error) {
    next(error);
  }
});

app.get('/api/workouts', async (_request, response, next) => {
  try {
    response.json(await WorkoutModel.find().sort({ difficulty: 1, title: 1 }));
  } catch (error) {
    next(error);
  }
});

app.use((error: Error, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  console.error('API error:', error);
  response.status(500).json({ error: 'Internal server error' });
});

startServer().catch((error: unknown) => {
  console.error('Failed to start OctoFit API:', error);
  process.exitCode = 1;
});