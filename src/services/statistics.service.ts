import { AppDataSource } from '../config/database';
import { Player } from '../entities/Player';
import { Team } from '../entities/Team';
import { Match } from '../entities/Match';
import { logger } from '../utils/logger';

interface PlayerStats {
  playerId: string;
  matchId: string;
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
  fouls: number;
  minutesPlayed: number;
}

interface TeamStats {
  teamId: string;
  matchId: string;
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
  fouls: number;
  fieldGoalsAttempted: number;
  fieldGoalsMade: number;
  threePointersAttempted: number;
  threePointersMade: number;
  freeThrowsAttempted: number;
  freeThrowsMade: number;
}

export class StatisticsService {
  private playerStatsRepository = AppDataSource.getRepository('player_stats');
  private teamStatsRepository = AppDataSource.getRepository('team_stats');

  public async recordPlayerStats(stats: PlayerStats): Promise<void> {
    try {
      await this.playerStatsRepository.save(stats);
      logger.info(`Recorded stats for player ${stats.playerId} in match ${stats.matchId}`);
    } catch (error) {
      logger.error('Error recording player stats:', error);
      throw error;
    }
  }

  public async recordTeamStats(stats: TeamStats): Promise<void> {
    try {
      await this.teamStatsRepository.save(stats);
      logger.info(`Recorded stats for team ${stats.teamId} in match ${stats.matchId}`);
    } catch (error) {
      logger.error('Error recording team stats:', error);
      throw error;
    }
  }

  public async getPlayerSeasonStats(playerId: string, seasonId: string): Promise<any> {
    try {
      const stats = await this.playerStatsRepository
        .createQueryBuilder('stats')
        .where('stats.player_id = :playerId', { playerId })
        .andWhere('stats.season_id = :seasonId', { seasonId })
        .getMany();

      return this.aggregatePlayerStats(stats);
    } catch (error) {
      logger.error('Error getting player season stats:', error);
      throw error;
    }
  }

  public async getTeamSeasonStats(teamId: string, seasonId: string): Promise<any> {
    try {
      const stats = await this.teamStatsRepository
        .createQueryBuilder('stats')
        .where('stats.team_id = :teamId', { teamId })
        .andWhere('stats.season_id = :seasonId', { seasonId })
        .getMany();

      return this.aggregateTeamStats(stats);
    } catch (error) {
      logger.error('Error getting team season stats:', error);
      throw error;
    }
  }

  public async getLeagueLeaders(seasonId: string, category: string): Promise<any[]> {
    try {
      return await this.playerStatsRepository
        .createQueryBuilder('stats')
        .select(`player.name, team.name as team, AVG(stats.${category}) as value`)
        .innerJoin('stats.player', 'player')
        .innerJoin('player.team', 'team')
        .where('stats.season_id = :seasonId', { seasonId })
        .groupBy('player.id, team.id')
        .orderBy(`AVG(stats.${category})`, 'DESC')
        .limit(10)
        .getRawMany();
    } catch (error) {
      logger.error('Error getting league leaders:', error);
      throw error;
    }
  }

  private aggregatePlayerStats(stats: any[]): any {
    return {
      gamesPlayed: stats.length,
      pointsPerGame: this.calculateAverage(stats, 'points'),
      reboundsPerGame: this.calculateAverage(stats, 'rebounds'),
      assistsPerGame: this.calculateAverage(stats, 'assists'),
      stealsPerGame: this.calculateAverage(stats, 'steals'),
      blocksPerGame: this.calculateAverage(stats, 'blocks'),
      turnoversPerGame: this.calculateAverage(stats, 'turnovers'),
      foulsPerGame: this.calculateAverage(stats, 'fouls'),
      minutesPerGame: this.calculateAverage(stats, 'minutesPlayed'),
    };
  }

  private aggregateTeamStats(stats: any[]): any {
    return {
      gamesPlayed: stats.length,
      pointsPerGame: this.calculateAverage(stats, 'points'),
      reboundsPerGame: this.calculateAverage(stats, 'rebounds'),
      assistsPerGame: this.calculateAverage(stats, 'assists'),
      stealsPerGame: this.calculateAverage(stats, 'steals'),
      blocksPerGame: this.calculateAverage(stats, 'blocks'),
      turnoversPerGame: this.calculateAverage(stats, 'turnovers'),
      fieldGoalPercentage: this.calculatePercentage(stats, 'fieldGoalsMade', 'fieldGoalsAttempted'),
      threePointPercentage: this.calculatePercentage(stats, 'threePointersMade', 'threePointersAttempted'),
      freeThrowPercentage: this.calculatePercentage(stats, 'freeThrowsMade', 'freeThrowsAttempted'),
    };
  }

  private calculateAverage(stats: any[], field: string): number {
    const sum = stats.reduce((acc, stat) => acc + stat[field], 0);
    return Number((sum / stats.length).toFixed(1));
  }

  private calculatePercentage(stats: any[], made: string, attempted: string): number {
    const totalMade = stats.reduce((acc, stat) => acc + stat[made], 0);
    const totalAttempted = stats.reduce((acc, stat) => acc + stat[attempted], 0);
    return Number(((totalMade / totalAttempted) * 100).toFixed(1));
  }
}