import { WebSocketService } from './websocket.service';
import { Match } from '../entities/Match';
import { AppDataSource } from '../config/database';
import { logger } from '../utils/logger';

export interface LiveScore {
  homeScore: number;
  awayScore: number;
  quarter: number;
  timeRemaining: string;
  lastUpdate: string;
}

export interface PlayByPlay {
  id: string;
  matchId: string;
  timestamp: string;
  action: string;
  player?: {
    id: string;
    name: string;
    team: 'home' | 'away';
  };
  points?: number;
  description: string;
}

export interface MatchControl {
  status: 'not_started' | 'in_progress' | 'quarter_break' | 'halftime' | 'completed';
  currentQuarter: number;
  timeRemaining: string;
  shotClock: number;
}

export class MatchEngineService {
  private wsService = WebSocketService.getInstance();
  private matchRepository = AppDataSource.getRepository(Match);
  private activeMatches = new Map<string, {
    control: MatchControl;
    score: LiveScore;
    timer?: NodeJS.Timeout;
  }>();

  public async startMatch(matchId: string): Promise<void> {
    try {
      const match = await this.matchRepository.findOneOrFail({ where: { id: matchId } });
      
      const initialState = {
        control: {
          status: 'in_progress' as const,
          currentQuarter: 1,
          timeRemaining: '10:00',
          shotClock: 24
        },
        score: {
          homeScore: 0,
          awayScore: 0,
          quarter: 1,
          timeRemaining: '10:00',
          lastUpdate: new Date().toISOString()
        }
      };

      this.activeMatches.set(matchId, initialState);
      this.startTimer(matchId);

      match.status = 'live';
      await this.matchRepository.save(match);

      this.wsService.sendMatchUpdate(matchId, {
        type: 'status',
        status: 'live',
        control: initialState.control,
        score: initialState.score
      });

      logger.info(`Match ${matchId} started`);
    } catch (error) {
      logger.error(`Error starting match ${matchId}:`, error);
      throw error;
    }
  }

  private startTimer(matchId: string): void {
    const match = this.activeMatches.get(matchId);
    if (!match) return;

    match.timer = setInterval(() => {
      const [minutes, seconds] = match.control.timeRemaining.split(':').map(Number);
      let totalSeconds = minutes * 60 + seconds - 1;

      if (totalSeconds < 0) {
        this.handleQuarterEnd(matchId);
        return;
      }

      const newMinutes = Math.floor(totalSeconds / 60);
      const newSeconds = totalSeconds % 60;
      match.control.timeRemaining = `${newMinutes}:${newSeconds.toString().padStart(2, '0')}`;
      match.score.timeRemaining = match.control.timeRemaining;

      // Update shot clock
      if (match.control.shotClock > 0) {
        match.control.shotClock--;
      }

      this.wsService.sendMatchUpdate(matchId, {
        type: 'time',
        timeRemaining: match.control.timeRemaining,
        shotClock: match.control.shotClock
      });
    }, 1000);
  }

  private handleQuarterEnd(matchId: string): void {
    const match = this.activeMatches.get(matchId);
    if (!match) return;

    clearInterval(match.timer);

    if (match.control.currentQuarter < 4) {
      match.control.currentQuarter++;
      match.control.timeRemaining = '10:00';
      match.control.status = 'quarter_break';
      match.score.quarter = match.control.currentQuarter;

      this.wsService.sendMatchUpdate(matchId, {
        type: 'quarter',
        quarter: match.control.currentQuarter,
        status: match.control.status
      });

      // Resume after break
      setTimeout(() => {
        match.control.status = 'in_progress';
        this.startTimer(matchId);
      }, 120000); // 2 minutes break
    } else {
      this.endMatch(matchId);
    }
  }

  public async updateScore(matchId: string, update: {
    team: 'home' | 'away';
    points: number;
    playerId: string;
  }): Promise<void> {
    const match = this.activeMatches.get(matchId);
    if (!match) throw new Error('Match not found or not started');

    if (update.team === 'home') {
      match.score.homeScore += update.points;
    } else {
      match.score.awayScore += update.points;
    }

    match.score.lastUpdate = new Date().toISOString();

    this.wsService.sendMatchUpdate(matchId, {
      type: 'score',
      ...match.score,
      scorer: update.playerId,
      points: update.points
    });

    await this.matchRepository.update(matchId, {
      homeScore: match.score.homeScore,
      awayScore: match.score.awayScore
    });
  }

  public async endMatch(matchId: string): Promise<void> {
    const match = this.activeMatches.get(matchId);
    if (!match) throw new Error('Match not found or not started');

    if (match.timer) {
      clearInterval(match.timer);
    }

    match.control.status = 'completed';
    
    await this.matchRepository.update(matchId, {
      status: 'completed',
      homeScore: match.score.homeScore,
      awayScore: match.score.awayScore
    });

    this.wsService.sendMatchUpdate(matchId, {
      type: 'status',
      status: 'completed',
      finalScore: {
        home: match.score.homeScore,
        away: match.score.awayScore
      }
    });

    this.activeMatches.delete(matchId);
    logger.info(`Match ${matchId} completed`);
  }

  public resetShotClock(matchId: string): void {
    const match = this.activeMatches.get(matchId);
    if (!match) return;

    match.control.shotClock = 24;
    this.wsService.sendMatchUpdate(matchId, {
      type: 'shotClock',
      value: 24
    });
  }

  public getMatchState(matchId: string): { control: MatchControl; score: LiveScore } | null {
    const match = this.activeMatches.get(matchId);
    return match ? { control: match.control, score: match.score } : null;
  }
}