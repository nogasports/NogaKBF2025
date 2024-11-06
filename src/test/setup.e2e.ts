import { AppDataSource } from '../config/database';
import { redisClient } from '../lib/redis';
import { app } from '../app';
import { Server } from 'http';
import supertest from 'supertest';

let server: Server;

beforeAll(async () => {
  // Initialize test database connection
  await AppDataSource.initialize();
  
  // Start server
  server = app.listen(0);
});

afterAll(async () => {
  // Close server
  server.close();
  
  // Close database connection
  await AppDataSource.destroy();
  
  // Close Redis connection
  await redisClient.quit();
});