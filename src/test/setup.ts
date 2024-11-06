import { AppDataSource } from '../config/database';
import { redisClient } from '../lib/redis';

beforeAll(async () => {
  // Initialize test database connection
  await AppDataSource.initialize();
});

afterAll(async () => {
  // Close database connection
  await AppDataSource.destroy();
  // Close Redis connection
  await redisClient.quit();
});