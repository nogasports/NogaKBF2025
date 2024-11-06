import React from 'react';
import { Users, Star, Plus } from 'lucide-react';
import { useFan } from '../../contexts/FanContext';

const FanTeams = () => {
  const { currentFan, unfollowTeam } = useFan();

  const allTeams = [
    {
      teamId: '3',
      name: 'Thunder',
      logo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=100&h=100&fit=crop',
      division: 'Premier League',
    },
    {
      teamId: '4',
      name: 'Equity',
      logo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=100&h=100&fit=crop',
      division: 'Premier League',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">My Teams</h2>
        <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          <Plus size={20} />
          Follow New Team
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {currentFan.favoriteTeams.map((team) => (
          <div
            key={team.teamId}
            className="rounded-lg bg-white p-6 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <img
                src={team.logo}
                alt={team.name}
                className="h-16 w-16 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-900">{team.name}</h3>
                <p className="text-sm text-gray-500">{team.division}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-gray-500">
                Following since {new Date(team.followedSince).toLocaleDateString()}
              </span>
              <button
                onClick={() => unfollowTeam(team.teamId)}
                className="rounded-lg border border-red-600 px-4 py-2 text-red-600 hover:bg-red-50"
              >
                Unfollow
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          Suggested Teams
        </h3>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {allTeams.map((team) => (
            <div
              key={team.teamId}
              className="rounded-lg bg-white p-6 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <img
                  src={team.logo}
                  alt={team.name}
                  className="h-16 w-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{team.name}</h3>
                  <p className="text-sm text-gray-500">{team.division}</p>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button className="rounded-lg border border-blue-600 px-4 py-2 text-blue-600 hover:bg-blue-50">
                  Follow Team
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FanTeams;