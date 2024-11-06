import { useEffect } from 'react';
import { monitoring } from '../lib/monitoring';
import { useMatch } from './useMatch';
import { useMatchRealtime } from './useMatchRealtime';

export function useMatchAnalytics(matchId: string) {
  const { match } = useMatch(matchId);
  const { liveScore, plays } = useMatchRealtime(matchId);

  useEffect(() => {
    if (match) {
      monitoring.trackEvent('match_view', {
        matchId,
        teams: `${match.homeTeam.name} vs ${match.awayTeam.name}`,
      });
    }
  }, [match, matchId]);

  useEffect(() => {
    if (liveScore) {
      monitoring.trackEvent('match_score_update', {
        matchId,
        score: `${liveScore.homeScore}-${liveScore.awayScore}`,
        quarter: liveScore.quarter,
      });
    }
  }, [liveScore, matchId]);

  useEffect(() => {
    if (plays.length > 0) {
      monitoring.trackEvent('match_play', {
        matchId,
        play: plays[0],
      });
    }
  }, [plays, matchId]);

  return {
    trackAttendance: (count: number) => {
      monitoring.trackEvent('match_attendance', {
        matchId,
        count,
        timestamp: new Date().toISOString(),
      });
    },
    trackEngagement: (type: 'view' | 'interaction' | 'share') => {
      monitoring.trackEvent('match_engagement', {
        matchId,
        type,
        timestamp: new Date().toISOString(),
      });
    },
  };
}