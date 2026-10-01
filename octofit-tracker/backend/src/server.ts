import cors from 'cors';
import express from 'express';
import { connectDatabase } from './config/database.js';
import { ActivityModel } from './models/Activity.js';
import { UserModel } from './models/User.js';

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
  });
});

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', database: 'connected' });
});

app.get('/api/users', async (_request, response, next) => {
  try {
    response.json(await UserModel.find().sort({ points: -1 }).lean());
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

startServer().catch((error: unknown) => {
  console.error('Failed to start OctoFit API:', error);
  process.exitCode = 1;
});