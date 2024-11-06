import { AppDataSource } from '../config/database';
import { redisClient } from '../lib/redis';

beforeAll(async () => {
  // Initialize test database connection
  await AppDataSource.initialize();
});

afterEach(async () => {
  // Clear test data after each test
  const entities = AppDataSource.entityMetadatas;
  for (const entity of entities) {
    const repository = AppDataSource.getRepository(entity.name);
    await repository.clear();
  }
  
  // Clear Redis cache
  await redisClient.flushall();
});

afterAll(async () => {
  // Close database connection
  await AppDataSource.destroy();
  
  // Close Redis connection
  await redisClient.quit();
});