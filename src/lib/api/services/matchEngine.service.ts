import { apiClient } from '../client';
import { ENDPOINTS } from '../endpoints';
import { WebSocketClient } from '../../websocket/client';

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

export const matchEngineService = {
  async startMatch(matchId: string): Promise<void> {
    await apiClient.post(`${ENDPOINTS.MATCH_LIVE_SCORE(matchId)}/start`);
  },

  async updateScore(matchId: string, update: {
    team: 'home' | 'away';
    points: number;
    playerId: string;
  }): Promise<LiveScore> {
    const response = await apiClient.post(
      `${ENDPOINTS.MATCH_LIVE_SCORE(matchId)}/score`,
      update
    );
    return response.data;
  },

  async recordPlayByPlay(matchId: string, play: Omit<PlayByPlay, 'id' | 'matchId'>): Promise<PlayByPlay> {
    const response = await apiClient.post(
      `${ENDPOINTS.MATCH_LIVE_SCORE(matchId)}/plays`,
      play
    );
    return response.data;
  },

  async updateMatchControl(matchId: string, control: Partial<MatchControl>): Promise<MatchControl> {
    const response = await apiClient.patch(
      `${ENDPOINTS.MATCH_LIVE_SCORE(matchId)}/control`,
      control
    );
    return response.data;
  },

  async endMatch(matchId: string): Promise<void> {
    await apiClient.post(`${ENDPOINTS.MATCH_LIVE_SCORE(matchId)}/end`);
  },

  subscribeToMatchUpdates(matchId: string, callbacks: {
    onScoreUpdate?: (score: LiveScore) => void;
    onPlayByPlay?: (play: PlayByPlay) => void;
    onControlUpdate?: (control: MatchControl) => void;
  }): () => void {
    const ws = WebSocketClient.getInstance();
    
    if (callbacks.onScoreUpdate) {
      ws.subscribe(`match.${matchId}.score`, callbacks.onScoreUpdate);
    }
    
    if (callbacks.onPlayByPlay) {
      ws.subscribe(`match.${matchId}.plays`, callbacks.onPlayByPlay);
    }
    
    if (callbacks.onControlUpdate) {
      ws.subscribe(`match.${matchId}.control`, callbacks.onControlUpdate);
    }

    return () => {
      ws.unsubscribe(`match.${matchId}.score`);
      ws.unsubscribe(`match.${matchId}.plays`);
      ws.unsubscribe(`match.${matchId}.control`);
    };
  },
};