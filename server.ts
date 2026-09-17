import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import busArrivalHandler from './api/bus-arrival';

// Load environment variables from .env
dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for parsing JSON
  app.use(express.json());

  // LTA DataMall v3 Bus Arrival Serverless Route
  app.all('/api/bus-arrival', (req, res) => {
    return busArrivalHandler(req, res);
  });

  app.all('/api/BusArrival', (req, res) => {
    return busArrivalHandler(req, res);
  });

  app.all('/api', (req, res, next) => {
    if (req.query.BusStopCode || req.query.busStopCode) {
      return busArrivalHandler(req, res);
    }
    next();
  });

  // Health and connectivity check endpoint
  app.get('/api/health', (req, res) => {
    const hasKey = Boolean(process.env.LTA_ACCOUNT_KEY || process.env.LTA_DATAMALL_KEY || process.env.ACCOUNT_KEY);
    res.json({
      status: 'ok',
      service: 'SmartCommute SG Serverless Gateway',
      ltaAccountKeyConfigured: hasKey,
      endpoint: '/api/bus-arrival?BusStopCode=83139',
    });
  });

  // Vite middleware for development vs static build in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
