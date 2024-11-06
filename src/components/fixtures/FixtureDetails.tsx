import React from 'react';
import { Fixture } from '../../types/fixture';
import { MapPin, Clock, Users, Award } from 'lucide-react';
import { cn } from '../../lib/utils';

interface FixtureDetailsProps {
  fixture: Fixture;
  onClose: () => void;
  onEdit: (fixture: Fixture) => void;
}

const FixtureDetails: React.FC<FixtureDetailsProps> = ({
  fixture,
  onClose,
  onEdit,
}) => {
  const statusColors = {
    scheduled: 'bg-blue-100 text-blue-800',
    live: 'bg-green-100 text-green-800',
    completed: 'bg-gray-100 text-gray-800',
    postponed: 'bg-yellow-100 text-yellow-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <span
            className={cn(
              'inline-flex rounded-full px-3 py-1 text-sm font-medium',
              statusColors[fixture.status]
            )}
          >
            {fixture.status.charAt(0).toUpperCase() + fixture.status.slice(1)}
          </span>
          <h3 className="mt-2 text-xl font-semibold">Match Details</h3>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(fixture)}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Edit Match
          </button>
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>

      <div className="rounded-lg bg-gray-50 p-6">
        <div className="flex items-center justify-between">
          <div className="text-center">
            <img
              src={fixture.homeTeam.logo}
              alt={fixture.homeTeam.name}
              className="mx-auto h-16 w-16 rounded-full object-cover"
            />
            <h4 className="mt-2 text-lg font-medium">
              {fixture.homeTeam.name}
            </h4>
            {fixture.status !== 'scheduled' && (
              <span className="text-3xl font-bold">
                {fixture.homeTeam.score}
              </span>
            )}
          </div>
          <div className="text-center">
            <span className="text-lg font-medium">VS</span>
          </div>
          <div className="text-center">
            <img
              src={fixture.awayTeam.logo}
              alt={fixture.awayTeam.name}
              className="mx-auto h-16 w-16 rounded-full object-cover"
            />
            <h4 className="mt-2 text-lg font-medium">
              {fixture.awayTeam.name}
            </h4>
            {fixture.status !== 'scheduled' && (
              <span className="text-3xl font-bold">
                {fixture.awayTeam.score}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4 rounded-lg bg-white p-6 shadow-sm">
          <h4 className="font-medium text-gray-900">Match Information</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock size={16} />
              <span>{fixture.date} at {fixture.time}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin size={16} />
              <span>{fixture.venue}</span>
            </div>
            {fixture.attendance && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users size={16} />
                <span>{fixture.attendance} Attendees</span>
              </div>
            )}
          </div>
        </div>

        {fixture.officials && (
          <div className="space-y-4 rounded-lg bg-white p-6 shadow-sm">
            <h4 className="font-medium text-gray-900">Match Officials</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Award size={16} />
                <span>Referee: {fixture.officials.referee}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Award size={16} />
                <span>Umpire 1: {fixture.officials.umpire1}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Award size={16} />
                <span>Umpire 2: {fixture.officials.umpire2}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Award size={16} />
                <span>Scorer: {fixture.officials.scorer}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FixtureDetails;