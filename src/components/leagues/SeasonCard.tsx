import React from 'react';
import { Season } from '../../types/league';
import { Calendar, Trophy, Users } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SeasonCardProps {
  season: Season;
  onClick: (season: Season) => void;
}

const SeasonCard: React.FC<SeasonCardProps> = ({ season, onClick }) => {
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    upcoming: 'bg-blue-100 text-blue-800',
    completed: 'bg-gray-100 text-gray-800',
  };

  const totalTeams = season.divisions.reduce(
    (acc, div) => acc + div.teams.length,
    0
  );

  return (
    <div
      onClick={() => onClick(season)}
      className="cursor-pointer rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-md"
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">{season.name}</h3>
        <span
          className={cn(
            'rounded-full px-3 py-1 text-xs font-medium',
            statusColors[season.status]
          )}
        >
          {season.status}
        </span>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          <span>
            {new Date(season.startDate).toLocaleDateString()} -{' '}
            {new Date(season.endDate).toLocaleDateString()}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Trophy className="h-4 w-4" />
          <span>{season.divisions.length} Divisions</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users className="h-4 w-4" />
          <span>{totalTeams} Teams</span>
        </div>
      </div>
    </div>
  );
};

export default SeasonCard;