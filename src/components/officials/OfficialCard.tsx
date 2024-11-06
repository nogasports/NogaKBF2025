import React from 'react';
import { Official } from '../../types/official';
import { Award, Star, Calendar } from 'lucide-react';
import { cn } from '../../lib/utils';

interface OfficialCardProps {
  official: Official;
  onClick: (official: Official) => void;
}

const OfficialCard: React.FC<OfficialCardProps> = ({ official, onClick }) => {
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    suspended: 'bg-red-100 text-red-800',
  };

  const licenseLevelColors = {
    international: 'bg-purple-100 text-purple-800',
    national: 'bg-blue-100 text-blue-800',
    regional: 'bg-teal-100 text-teal-800',
  };

  return (
    <div
      onClick={() => onClick(official)}
      className="cursor-pointer rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-md"
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-4">
          {official.photo ? (
            <img
              src={official.photo}
              alt={official.name}
              className="h-16 w-16 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <Award className="h-8 w-8 text-gray-400" />
            </div>
          )}
          <div>
            <h3 className="font-semibold text-gray-900">{official.name}</h3>
            <p className="text-sm text-gray-500">{official.role}</p>
          </div>
        </div>
        <span
          className={cn(
            'rounded-full px-3 py-1 text-xs font-medium',
            statusColors[official.status]
          )}
        >
          {official.status}
        </span>
      </div>

      <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-4">
        <span
          className={cn(
            'rounded-full px-3 py-1 text-xs font-medium',
            licenseLevelColors[official.licenseLevel]
          )}
        >
          {official.licenseLevel} License
        </span>
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 text-yellow-400" />
          <span className="text-sm font-medium">{official.rating || 'N/A'}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="h-4 w-4" />
          <span>{official.completedMatches || 0} matches</span>
        </div>
        <div className="text-right">
          <span className="text-gray-600">License: {official.licenseNumber}</span>
        </div>
      </div>
    </div>
  );
};

export default OfficialCard;