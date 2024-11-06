import { useState, useEffect, useCallback } from 'react';
import { 
  matchService, 
  MatchDetails, 
  ScoreUpdate, 
  MatchReport, 
  PlayerStats 
} from '../lib/api/services/match.service';
import { useWebSocket } from './useWebSocket';

export function useMatch(matchId: string) {
  const [match, setMatch] = useState<MatchDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Subscribe to real-time match updates
  useWebSocket(`match.${matchId}`, (data) => {
    setMatch(prevMatch => ({ ...prevMatch, ...data }));
  });

  useEffect(() => {
    const loadMatchDetails = async () => {
      try {
        setIsLoading(true);
        const details = await matchService.getMatchDetails(matchId);
        setMatch(details);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load match details'));
      } finally {
        setIsLoading(false);
      }
    };

    loadMatchDetails();
  }, [matchId]);

  const startMatch = useCallback(async () => {
    try {
      await matchService.startMatch(matchId);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to start match'));
      throw err;
    }
  }, [matchId]);

  const updateScore = useCallback(async (score: ScoreUpdate) => {
    try {
      await matchService.updateScore(matchId, score);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update score'));
      throw err;
    }
  }, [matchId]);

  const endMatch = useCallback(async () => {
    try {
      await matchService.endMatch(matchId);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to end match'));
      throw err;
    }
  }, [matchId]);

  const submitReport = useCallback(async (report: MatchReport) => {
    try {
      await matchService.submitReport(matchId, report);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to submit report'));
      throw err;
    }
  }, [matchId]);

  const updatePlayerStats = useCallback(async (stats: PlayerStats) => {
    try {
      await matchService.updatePlayerStats(matchId, stats);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update player stats'));
      throw err;
    }
  }, [matchId]);

  const recordTimeout = useCallback(async (team: 'home' | 'away') => {
    try {
      await matchService.recordTimeout(matchId, team);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to record timeout'));
      throw err;
    }
  }, [matchId]);

  const recordFoul = useCallback(async (data: {
    team: 'home' | 'away';
    playerId: string;
    foulType: 'personal' | 'technical' | 'flagrant' | 'offensive';
  }) => {
    try {
      await matchService.recordFoul(matchId, data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to record foul'));
      throw err;
    }
  }, [matchId]);

  return {
    match,
    isLoading,
    error,
    startMatch,
    updateScore,
    endMatch,
    submitReport,
    updatePlayerStats,
    recordTimeout,
    recordFoul,
  };
}