import http from 'http';
import app from './app.js';
import { connectDB } from './config/db.js';
import { env } from './config/env.js';
import { seedProducts } from './services/productService.js';
import { ensureDefaultUser } from './services/userService.js';

const startServer = async () => {
  await connectDB();
  await Promise.all([seedProducts(), ensureDefaultUser()]);

  const server = http.createServer(app);
  server.listen(env.port, () => {
    console.log(`Server running in ${env.nodeEnv} mode on port ${env.port}`);
  });
};

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

