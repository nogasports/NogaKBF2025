import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';
import { LiveScore, PlayByPlay, MatchControl } from '../lib/api/services/matchEngine.service';

interface MatchUpdate {
  score?: LiveScore;
  play?: PlayByPlay;
  control?: MatchControl;
}

export function useMatchRealtime(matchId: string) {
  const [liveScore, setLiveScore] = useState<LiveScore | null>(null);
  const [plays, setPlays] = useState<PlayByPlay[]>([]);
  const [matchControl, setMatchControl] = useState<MatchControl | null>(null);

  useWebSocket<MatchUpdate>(`match.${matchId}`, (update) => {
    if (update.score) setLiveScore(update.score);
    if (update.play) setPlays(prev => [update.play, ...prev]);
    if (update.control) setMatchControl(update.control);
  });

  useWebSocket<LiveScore>(`match.${matchId}.score`, (score) => {
    setLiveScore(score);
  });

  useWebSocket<PlayByPlay>(`match.${matchId}.plays`, (play) => {
    setPlays(prev => [play, ...prev]);
  });

  useWebSocket<MatchControl>(`match.${matchId}.control`, (control) => {
    setMatchControl(control);
  });

  return {
    liveScore,
    plays,
    matchControl,
  };
}