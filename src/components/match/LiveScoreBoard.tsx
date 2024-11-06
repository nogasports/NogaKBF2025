import React from 'react';
import { Clock } from 'lucide-react';
import { LiveScore } from '../../lib/api/services/matchEngine.service';

interface LiveScoreBoardProps {
  score: LiveScore;
  homeTeam: {
    name: string;
    logo: string;
  };
  awayTeam: {
    name: string;
    logo: string;
  };
}

const LiveScoreBoard: React.FC<LiveScoreBoardProps> = ({
  score,
  homeTeam,
  awayTeam,
}) => {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-gray-500" />
          <span className="text-lg font-medium">Q{score.quarter} - {score.timeRemaining}</span>
        </div>
        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
          LIVE
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-center">
          <img
            src={homeTeam.logo}
            alt={homeTeam.name}
            className="mx-auto h-16 w-16 rounded-full object-cover"
          />
          <h3 className="mt-2 font-medium">{homeTeam.name}</h3>
          <p className="text-4xl font-bold">{score.homeScore}</p>
        </div>

        <div className="text-center">
          <span className="text-2xl font-bold">VS</span>
        </div>

        <div className="text-center">
          <img
            src={awayTeam.logo}
            alt={awayTeam.name}
            className="mx-auto h-16 w-16 rounded-full object-cover"
          />
          <h3 className="mt-2 font-medium">{awayTeam.name}</h3>
          <p className="text-4xl font-bold">{score.awayScore}</p>
        </div>
      </div>

      <div className="mt-4 text-center text-sm text-gray-500">
        Last Update: {new Date(score.lastUpdate).toLocaleTimeString()}
      </div>
    </div>
  );
};

export default LiveScoreBoard;