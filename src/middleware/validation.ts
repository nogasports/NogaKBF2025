import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

// Auth Schemas
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['admin', 'team', 'official', 'player', 'fan']),
});

// Player Schema
const playerSchema = z.object({
  name: z.string().min(2),
  jerseyNumber: z.string(),
  position: z.enum(['POINT_GUARD', 'SHOOTING_GUARD', 'SMALL_FORWARD', 'POWER_FORWARD', 'CENTER']),
  dateOfBirth: z.string().datetime(),
  nationality: z.string(),
  height: z.string(),
  weight: z.string(),
  teamId: z.string().uuid(),
});

// Match Schema
const matchSchema = z.object({
  homeTeamId: z.string().uuid(),
  awayTeamId: z.string().uuid(),
  scheduledTime: z.string().datetime(),
  venue: z.string(),
  refereeId: z.string().uuid().optional(),
  status: z.enum(['scheduled', 'live', 'completed', 'postponed', 'cancelled']).optional(),
});

// Official Schema
const officialSchema = z.object({
  name: z.string().min(2),
  licenseNumber: z.string(),
  role: z.enum(['REFEREE', 'UMPIRE', 'TABLE_OFFICIAL', 'COMMISSIONER']),
  licenseExpiry: z.string().datetime(),
});

// Season Schema
const seasonSchema = z.object({
  name: z.string().min(2),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
});

// Validation Middlewares
export const validateLogin = validate(loginSchema);
export const validateRegister = validate(registerSchema);
export const validatePlayer = validate(playerSchema);
export const validateMatch = validate(matchSchema);
export const validateOfficial = validate(officialSchema);
export const validateSeason = validate(seasonSchema);

function validate(schema: z.ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: error.errors
      });
    }
  };
}