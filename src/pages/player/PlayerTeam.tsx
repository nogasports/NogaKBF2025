import React from 'react';
import { Users, Award, Calendar, MapPin } from 'lucide-react';
import { usePlayer } from '../../contexts/PlayerContext';

const PlayerTeam = () => {
  const { currentPlayer } = usePlayer();

  const teammates = [
    {
      id: '1',
      name: 'John Doe',
      number: '23',
      position: 'Guard',
      stats: {
        ppg: 18.5,
        rpg: 4.2,
        apg: 5.8,
      },
    },
    {
      id: '2',
      name: 'James Smith',
      number: '15',
      position: 'Forward',
      stats: {
        ppg: 15.8,
        rpg: 7.5,
        apg: 2.3,
      },
    },
    {
      id: '3',
      name: 'Michael Johnson',
      number: '11',
      position: 'Center',
      stats: {
        ppg: 12.4,
        rpg: 9.2,
        apg: 1.5,
      },
    },
  ];

  const upcomingGames = [
    {
      opponent: 'Thunder',
      date: '2024-03-20',
      time: '19:00',
      venue: 'Nyayo Stadium',
    },
    {
      opponent: 'KPA',
      date: '2024-03-25',
      time: '16:00',
      venue: 'Makande Gymnasium',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Team Overview</h2>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
            {currentPlayer.team.division}
          </span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Team Stats</h3>
            <select className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm">
              <option>Last 5 Games</option>
              <option>Season</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border p-4">
              <p className="text-sm text-gray-500">League Position</p>
              <p className="mt-2 text-2xl font-semibold">2nd</p>
            </div>
            <div className="rounded-lg border p-4">
              <p className="text-sm text-gray-500">Win Rate</p>
              <p className="mt-2 text-2xl font-semibold">75%</p>
            </div>
            <div className="rounded-lg border p-4">
              <p className="text-sm text-gray-500">Points Per Game</p>
              <p className="mt-2 text-2xl font-semibold">82.5</p>
            </div>
            <div className="rounded-lg border p-4">
              <p className="text-sm text-gray-500">Form</p>
              <div className="mt-2 flex gap-1">
                <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                  W
                </span>
                <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                  W
                </span>
                <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800">
                  L
                </span>
                <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                  W
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Upcoming Games
          </h3>
          <div className="space-y-4">
            {upcomingGames.map((game, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="space-y-1">
                  <p className="font-medium text-gray-900">
                    vs {game.opponent}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(game.date).toLocaleDateString()} at {game.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{game.venue}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Roster</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Player
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                  PPG
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                  RPG
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                  APG
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {teammates.map((player) => (
                <tr key={player.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10">
                        <Users className="h-10 w-10 rounded-full bg-gray-100 p-2 text-gray-500" />
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-900">
                          {player.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          #{player.number} • {player.position}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500">
                    {player.stats.ppg}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500">
                    {player.stats.rpg}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500">
                    {player.stats.apg}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PlayerTeam;