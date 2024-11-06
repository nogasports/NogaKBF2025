import React from 'react';
import { PlayByPlay } from '../../lib/api/services/matchEngine.service';

interface PlayByPlayFeedProps {
  plays: PlayByPlay[];
}

const PlayByPlayFeed: React.FC<PlayByPlayFeedProps> = ({ plays }) => {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold">Play by Play</h3>
      
      <div className="space-y-4">
        {plays.map((play) => (
          <div
            key={play.id}
            className="flex items-center justify-between rounded-lg border p-4"
          >
            <div className="flex items-center gap-4">
              <div className="text-sm">
                <p className="font-medium text-gray-900">
                  {play.player ? (
                    <>
                      {play.player.name} ({play.player.team === 'home' ? 'H' : 'A'})
                      {play.points && ` - ${play.points} pts`}
                    </>
                  ) : play.action}
                </p>
                <p className="text-gray-500">{play.description}</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">
              {new Date(play.timestamp).toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayByPlayFeed;