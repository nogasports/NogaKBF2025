import { apiClient } from '../client';
import { ENDPOINTS } from '../endpoints';

export interface ScoreUpdate {
  homeScore: number;
  awayScore: number;
  quarter: number;
  timeRemaining: string;
  scorerId: string;
  points: number;
  playType: 'field_goal' | 'three_pointer' | 'free_throw';
}

export interface MatchReport {
  summary: string;
  highlights: string[];
  mvp: {
    playerId: string;
    stats: {
      points: number;
      rebounds: number;
      assists: number;
    };
  };
  incidents?: {
    type: 'injury' | 'technical_foul' | 'ejection';
    description: string;
    playerId?: string;
  }[];
  officials: {
    referee: string;
    umpire1: string;
    umpire2: string;
    scorer: string;
  };
  attendance: number;
}

export interface MatchDetails {
  id: string;
  homeTeam: {
    id: string;
    name: string;
    score: number;
    timeouts: number;
    fouls: number;
  };
  awayTeam: {
    id: string;
    name: string;
    score: number;
    timeouts: number;
    fouls: number;
  };
  venue: {
    id: string;
    name: string;
  };
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  startTime: string;
  quarter: number;
  timeRemaining: string;
  officials: {
    referee: string;
    umpire1: string;
    umpire2: string;
    scorer: string;
  };
}

export interface PlayerStats {
  playerId: string;
  minutes: number;
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
  fouls: number;
  fieldGoalsMade: number;
  fieldGoalsAttempted: number;
  threePointersMade: number;
  threePointersAttempted: number;
  freeThrowsMade: number;
  freeThrowsAttempted: number;
}

export const matchService = {
  async startMatch(matchId: string): Promise<void> {
    try {
      await apiClient.post(`${ENDPOINTS.MATCH_DETAIL(matchId)}/start`);
    } catch (error) {
      throw new Error('Failed to start match');
    }
  },

  async updateScore(matchId: string, score: ScoreUpdate): Promise<void> {
    try {
      await apiClient.post(`${ENDPOINTS.MATCH_DETAIL(matchId)}/score`, score);
    } catch (error) {
      throw new Error('Failed to update match score');
    }
  },

  async endMatch(matchId: string): Promise<void> {
    try {
      await apiClient.post(`${ENDPOINTS.MATCH_DETAIL(matchId)}/end`);
    } catch (error) {
      throw new Error('Failed to end match');
    }
  },

  async submitReport(matchId: string, report: MatchReport): Promise<void> {
    try {
      await apiClient.post(`${ENDPOINTS.MATCH_REPORT(matchId)}`, report);
    } catch (error) {
      throw new Error('Failed to submit match report');
    }
  },

  async getMatchDetails(matchId: string): Promise<MatchDetails> {
    try {
      const response = await apiClient.get(ENDPOINTS.MATCH_DETAIL(matchId));
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch match details');
    }
  },

  async updatePlayerStats(matchId: string, stats: PlayerStats): Promise<void> {
    try {
      await apiClient.post(`${ENDPOINTS.MATCH_STATISTICS(matchId)}`, stats);
    } catch (error) {
      throw new Error('Failed to update player statistics');
    }
  },

  async getPlayerStats(matchId: string, playerId: string): Promise<PlayerStats> {
    try {
      const response = await apiClient.get(`${ENDPOINTS.MATCH_STATISTICS(matchId)}/${playerId}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch player statistics');
    }
  },

  async updateMatchStatus(matchId: string, status: MatchDetails['status']): Promise<void> {
    try {
      await apiClient.patch(`${ENDPOINTS.MATCH_DETAIL(matchId)}/status`, { status });
    } catch (error) {
      throw new Error('Failed to update match status');
    }
  },

  async recordTimeout(matchId: string, team: 'home' | 'away'): Promise<void> {
    try {
      await apiClient.post(`${ENDPOINTS.MATCH_DETAIL(matchId)}/timeout`, { team });
    } catch (error) {
      throw new Error('Failed to record timeout');
    }
  },

  async recordFoul(
    matchId: string,
    data: {
      team: 'home' | 'away';
      playerId: string;
      foulType: 'personal' | 'technical' | 'flagrant' | 'offensive';
    }
  ): Promise<void> {
    try {
      await apiClient.post(`${ENDPOINTS.MATCH_DETAIL(matchId)}/foul`, data);
    } catch (error) {
      throw new Error('Failed to record foul');
    }
  },

  async getMatchTimeline(matchId: string): Promise<Array<{
    timestamp: string;
    type: 'score' | 'foul' | 'timeout' | 'substitution';
    details: Record<string, any>;
  }>> {
    try {
      const response = await apiClient.get(`${ENDPOINTS.MATCH_DETAIL(matchId)}/timeline`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch match timeline');
    }
  },
};