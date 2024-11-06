import React from 'react';
import { Team } from '../../types/team';
import { Users, MapPin } from 'lucide-react';

interface TeamCardProps {
  team: Team;
  onClick: (team: Team) => void;
}

const TeamCard: React.FC<TeamCardProps> = ({ team, onClick }) => {
  return (
    <div
      onClick={() => onClick(team)}
      className="cursor-pointer rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <img
            src={team.logo}
            alt={`${team.name} logo`}
            className="h-16 w-16 rounded-full object-cover"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{team.name}</h3>
            <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
              <MapPin size={16} />
              <span>{team.homeVenue}</span>
            </div>
            <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
              <Users size={16} />
              <span>{team.players.length} Players</span>
            </div>
          </div>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            team.status === 'active'
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {team.status}
        </span>
      </div>
    </div>
  );
};

export default TeamCard;