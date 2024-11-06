import { useState, useEffect, useCallback } from 'react';
import { matchEngineService, LiveScore, PlayByPlay, MatchControl } from '../lib/api/services/matchEngine.service';

export function useMatchEngine(matchId: string) {
  const [liveScore, setLiveScore] = useState<LiveScore | null>(null);
  const [playByPlay, setPlayByPlay] = useState<PlayByPlay[]>([]);
  const [matchControl, setMatchControl] = useState<MatchControl | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribe = matchEngineService.subscribeToMatchUpdates(matchId, {
      onScoreUpdate: (score) => setLiveScore(score),
      onPlayByPlay: (play) => setPlayByPlay(prev => [play, ...prev]),
      onControlUpdate: (control) => setMatchControl(control),
    });

    return () => {
      unsubscribe();
    };
  }, [matchId]);

  const startMatch = useCallback(async () => {
    try {
      await matchEngineService.startMatch(matchId);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to start match'));
      throw err;
    }
  }, [matchId]);

  const updateScore = useCallback(async (update: {
    team: 'home' | 'away';
    points: number;
    playerId: string;
  }) => {
    try {
      const score = await matchEngineService.updateScore(matchId, update);
      setLiveScore(score);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update score'));
      throw err;
    }
  }, [matchId]);

  const recordPlay = useCallback(async (play: Omit<PlayByPlay, 'id' | 'matchId'>) => {
    try {
      const newPlay = await matchEngineService.recordPlayByPlay(matchId, play);
      setPlayByPlay(prev => [newPlay, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to record play'));
      throw err;
    }
  }, [matchId]);

  const updateControl = useCallback(async (control: Partial<MatchControl>) => {
    try {
      const updatedControl = await matchEngineService.updateMatchControl(matchId, control);
      setMatchControl(updatedControl);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update match control'));
      throw err;
    }
  }, [matchId]);

  const endMatch = useCallback(async () => {
    try {
      await matchEngineService.endMatch(matchId);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to end match'));
      throw err;
    }
  }, [matchId]);

  return {
    liveScore,
    playByPlay,
    matchControl,
    error,
    startMatch,
    updateScore,
    recordPlay,
    updateControl,
    endMatch,
  };
}