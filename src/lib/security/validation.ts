import { z } from 'zod';

export type ValidationSchema = z.ZodType<any, any>;

export class RequestValidator {
  static validate<T>(data: unknown, schema: z.ZodType<T>): T {
    try {
      return schema.parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new ValidationError(error.errors);
      }
      throw error;
    }
  }
}

export class ValidationError extends Error {
  constructor(public readonly errors: z.ZodError['errors']) {
    super('Validation failed');
    this.name = 'ValidationError';
  }
}

// Common validation schemas
export const schemas = {
  login: z.object({
    email: z.string().email(),
    password: z.string().min(8),
    userType: z.enum(['admin', 'team', 'official', 'player', 'fan']),
  }),

  match: z.object({
    homeTeamId: z.string().uuid(),
    awayTeamId: z.string().uuid(),
    venueId: z.string().uuid(),
    scheduledDate: z.string().datetime(),
    leagueId: z.string().uuid(),
  }),

  score: z.object({
    matchId: z.string().uuid(),
    homeScore: z.number().int().min(0),
    awayScore: z.number().int().min(0),
    quarter: z.number().int().min(1).max(4),
    timeRemaining: z.string(),
  }),

  player: z.object({
    firstName: z.string().min(2),
    surname: z.string().min(2),
    dateOfBirth: z.string().datetime(),
    teamId: z.string().uuid(),
    jerseyNumber: z.string(),
    position: z.enum(['POINT_GUARD', 'SHOOTING_GUARD', 'SMALL_FORWARD', 'POWER_FORWARD', 'CENTER']),
    nationality: z.string(),
  }),

  payment: z.object({
    amount: z.number().positive(),
    type: z.enum(['registration', 'membership', 'fine', 'prize']),
    payerId: z.string().uuid(),
    paymentMethod: z.enum(['card', 'mpesa', 'bank_transfer']),
    description: z.string(),
    metadata: z.record(z.unknown()).optional(),
  }),
};