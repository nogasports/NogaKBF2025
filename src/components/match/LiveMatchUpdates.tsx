import React from 'react';
import { useMatchRealtime } from '../../hooks/useMatchRealtime';
import LiveScoreBoard from './LiveScoreBoard';
import PlayByPlayFeed from './PlayByPlayFeed';
import MatchControlPanel from './MatchControlPanel';

interface LiveMatchUpdatesProps {
  matchId: string;
  homeTeam: {
    name: string;
    logo: string;
  };
  awayTeam: {
    name: string;
    logo: string;
  };
  isOfficial?: boolean;
}

const LiveMatchUpdates: React.FC<LiveMatchUpdatesProps> = ({
  matchId,
  homeTeam,
  awayTeam,
  isOfficial = false,
}) => {
  const { liveScore, plays, matchControl } = useMatchRealtime(matchId);

  if (!liveScore) {
    return <div>Loading match data...</div>;
  }

  return (
    <div className="space-y-6">
      <LiveScoreBoard
        score={liveScore}
        homeTeam={homeTeam}
        awayTeam={awayTeam}
      />

      {isOfficial && matchControl && (
        <MatchControlPanel
          control={matchControl}
          onStart={() => {}}
          onPause={() => {}}
          onEnd={() => {}}
          onQuarterChange={() => {}}
          onTimeUpdate={() => {}}
          onShotClockReset={() => {}}
        />
      )}

      <PlayByPlayFeed plays={plays} />
    </div>
  );
};

export default LiveMatchUpdates;