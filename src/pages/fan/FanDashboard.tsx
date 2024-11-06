import React from 'react';
import { Calendar, Users, Trophy, Star } from 'lucide-react';
import { useFan } from '../../contexts/FanContext';

const FanDashboard = () => {
  const { currentFan } = useFan();

  const upcomingMatches = [
    {
      id: '1',
      homeTeam: 'Ulinzi Warriors',
      awayTeam: 'Thunder',
      date: '2024-03-20',
      time: '19:00',
      venue: 'Nyayo Stadium',
    },
    {
      id: '2',
      homeTeam: 'KPA',
      awayTeam: 'Equity',
      date: '2024-03-25',
      time: '16:00',
      venue: 'Makande Gymnasium',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Fan Dashboard</h2>
        <select className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm">
          <option>All Teams</option>
          {currentFan.favoriteTeams.map((team) => (
            <option key={team.teamId} value={team.teamId}>
              {team.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Upcoming Matches
          </h3>
          <div className="space-y-4">
            {upcomingMatches.map((match) => (
              <div
                key={match.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="space-y-1">
                  <p className="font-medium text-gray-900">
                    {match.homeTeam} vs {match.awayTeam}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(match.date).toLocaleDateString()} at {match.time}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="rounded-lg border border-blue-600 px-4 py-2 text-blue-600 hover:bg-blue-50">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            My Teams
          </h3>
          <div className="space-y-4">
            {currentFan.favoriteTeams.map((team) => (
              <div
                key={team.teamId}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={team.logo}
                    alt={team.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{team.name}</p>
                    <p className="text-sm text-gray-500">{team.division}</p>
                  </div>
                </div>
                <button className="rounded-lg border border-blue-600 px-4 py-2 text-blue-600 hover:bg-blue-50">
                  View Team
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          Recent Match Votes
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-4">
              <Star className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="font-medium text-gray-900">
                  John Doe - Ulinzi Warriors
                </p>
                <p className="text-sm text-gray-500">
                  Player of the Match - March 15, 2024
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FanDashboard;