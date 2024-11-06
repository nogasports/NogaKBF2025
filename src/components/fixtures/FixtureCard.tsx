import React from 'react';
import { Fixture } from '../../types/fixture';
import { MapPin, Clock } from 'lucide-react';
import { cn } from '../../lib/utils';

interface FixtureCardProps {
  fixture: Fixture;
  onClick: (fixture: Fixture) => void;
}

const FixtureCard: React.FC<FixtureCardProps> = ({ fixture, onClick }) => {
  const statusColors = {
    scheduled: 'bg-blue-100 text-blue-800',
    live: 'bg-green-100 text-green-800',
    completed: 'bg-gray-100 text-gray-800',
    postponed: 'bg-yellow-100 text-yellow-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  return (
    <div
      onClick={() => onClick(fixture)}
      className="cursor-pointer rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-md"
    >
      <div className="mb-4 flex items-center justify-between">
        <span
          className={cn(
            'rounded-full px-3 py-1 text-xs font-medium',
            statusColors[fixture.status]
          )}
        >
          {fixture.status.charAt(0).toUpperCase() + fixture.status.slice(1)}
        </span>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock size={16} />
          <span>{fixture.time}</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={fixture.homeTeam.logo}
              alt={fixture.homeTeam.name}
              className="h-8 w-8 rounded-full object-cover"
            />
            <span className="font-medium">{fixture.homeTeam.name}</span>
          </div>
          {fixture.status !== 'scheduled' && (
            <span className="text-xl font-semibold">
              {fixture.homeTeam.score}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={fixture.awayTeam.logo}
              alt={fixture.awayTeam.name}
              className="h-8 w-8 rounded-full object-cover"
            />
            <span className="font-medium">{fixture.awayTeam.name}</span>
          </div>
          {fixture.status !== 'scheduled' && (
            <span className="text-xl font-semibold">
              {fixture.awayTeam.score}
            </span>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
        <MapPin size={16} />
        <span>{fixture.venue}</span>
      </div>
    </div>
  );
};

export default FixtureCard;