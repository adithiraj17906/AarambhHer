import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDb, isConnectedToPostgres } from './db.js';
import jobsRouter from './routes/jobs.js';
import gigsRouter from './routes/gigs.js';
import videosRouter from './routes/videos.js';
import advisorRouter from './routes/advisor.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/jobs', jobsRouter);
app.use('/api/gigs', gigsRouter);
app.use('/api/videos', videosRouter);
app.use('/api/advisor', advisorRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    database: isConnectedToPostgres ? 'postgresql (connected)' : 'in-memory fallback (active)',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Root welcome endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to SheWorks (AarambhHer) Backend API',
    endpoints: {
      health: '/api/health',
      jobs: '/api/jobs',
      gigs: '/api/gigs',
      videos: '/api/videos',
      advisor: '/api/advisor/replies',
      advisorChat: '/api/advisor/chat'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start Server
async function startServer() {
  await initDb();
  app.listen(PORT, () => {
    console.log(`🚀 SheWorks Server running on port ${PORT}`);
    console.log(`📡 Base URL: http://localhost:${PORT}`);
    console.log(`📋 Health Check: http://localhost:${PORT}/api/health`);
  });
}

startServer();
