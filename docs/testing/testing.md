# Testing Documentation

## Testing Stack

- Jest: Testing framework
- Supertest: HTTP assertions
- TypeORM Testing: Database testing utilities
- Redis Mock: Redis testing utilities

## Test Structure

```
tests/
├── unit/
│   ├── services/
│   ├── utils/
│   └── validators/
├── integration/
│   ├── auth/
│   ├── teams/
│   ├── players/
│   └── matches/
├── e2e/
│   └── api/
└── fixtures/
    └── testData/
```

## Running Tests

```bash
# Run all tests
npm test

# Run specific test suite
npm test -- auth.test.ts

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

## Test Examples

### Unit Test Example

```typescript
// services/auth.service.test.ts
import { AuthService } from '../../src/services/auth.service';
import { mockUser, mockToken } from '../fixtures/auth';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
  });

  describe('validateUser', () => {
    it('should validate user with correct credentials', async () => {
      const result = await authService.validateUser(
        mockUser.email,
        mockUser.password
      );
      expect(result).toBeDefined();
      expect(result.id).toBe(mockUser.id);
    });

    it('should throw error with incorrect credentials', async () => {
      await expect(
        authService.validateUser(mockUser.email, 'wrong-password')
      ).rejects.toThrow('Invalid credentials');
    });
  });
});
```

### Integration Test Example

```typescript
// integration/auth/login.test.ts
import request from 'supertest';
import { app } from '../../src/app';
import { AppDataSource } from '../../src/config/database';

describe('POST /api/auth/login', () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it('should login user with valid credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123',
        userType: 'player'
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('refreshToken');
  });
});
```

### E2E Test Example

```typescript
// e2e/api/match-flow.test.ts
import request from 'supertest';
import { app } from '../../src/app';
import { setupTestData, cleanupTestData } from '../fixtures/setup';

describe('Match Flow', () => {
  let authToken: string;
  let matchId: string;

  beforeAll(async () => {
    await setupTestData();
    // Login and get token
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'official@example.com',
        password: 'password123',
        userType: 'official'
      });
    authToken = response.body.token;
  });

  afterAll(async () => {
    await cleanupTestData();
  });

  it('should create and manage a match', async () => {
    // Create match
    const createResponse = await request(app)
      .post('/api/matches')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        homeTeamId: 'team1-id',
        awayTeamId: 'team2-id',
        scheduledTime: '2024-03-20T19:00:00Z',
        venue: 'Nyayo Stadium'
      });

    expect(createResponse.status).toBe(201);
    matchId = createResponse.body.id;

    // Start match
    const startResponse = await request(app)
      .post(`/api/matches/${matchId}/start`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(startResponse.status).toBe(200);

    // Update score
    const scoreResponse = await request(app)
      .post(`/api/matches/${matchId}/score`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        team: 'home',
        points: 2,
        playerId: 'player1-id'
      });

    expect(scoreResponse.status).toBe(200);

    // End match
    const endResponse = await request(app)
      .post(`/api/matches/${matchId}/end`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(endResponse.status).toBe(200);
  });
});
```

## Test Coverage

Aim for the following coverage targets:
- Statements: > 80%
- Branches: > 75%
- Functions: > 80%
- Lines: > 80%

## Mocking

### Example of Mocking External Services

```typescript
// Mock AWS S3
jest.mock('@aws-sdk/client-s3', () => ({
  S3Client: jest.fn().mockImplementation(() => ({
    send: jest.fn().mockResolvedValue({ Location: 'mock-url' })
  }))
}));

// Mock Redis
jest.mock('ioredis', () => {
  return jest.fn().mockImplementation(() => ({
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn()
  }));
});
```

## CI/CD Integration

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:14
        env:
          POSTGRES_USER: postgres
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: kbf_test
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

      redis:
        image: redis:6
        ports:
          - 6379:6379
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run tests
        run: npm test -- --coverage
        env:
          DB_HOST: localhost
          DB_PORT: 5432
          DB_USER: postgres
          DB_PASSWORD: postgres
          DB_NAME: kbf_test
          REDIS_URL: redis://localhost:6379
          
      - name: Upload coverage
        uses: codecov/codecov-action@v2
```