import React, { useState } from 'react';
import { BarChart3, TrendingUp, Activity, Users, Target, ChevronDown, ArrowUp, ArrowDown } from 'lucide-react';
import { useTeam } from '../../contexts/TeamContext';
import { cn } from '../../lib/utils';

const TeamStatistics = () => {
  const { selectedTeam } = useTeam();
  const [timeRange, setTimeRange] = useState('season');
  const [activeTab, setActiveTab] = useState<'team' | 'players'>('team');

  const teamStats = {
    offense: {
      pointsPerGame: 82.5,
      fieldGoalPercentage: 45.3,
      threePointPercentage: 35.8,
      freeThrowPercentage: 75.2,
      assistsPerGame: 21.8,
      turnoversPerGame: 13.2,
    },
    defense: {
      pointsAllowedPerGame: 76.8,
      reboundsPerGame: 38.2,
      stealsPerGame: 7.5,
      blocksPerGame: 4.2,
      opposingFieldGoalPercentage: 42.1,
    },
    trends: [
      { game: 'vs Thunder', points: 78, trend: 'up' },
      { game: 'vs KPA', points: 85, trend: 'up' },
      { game: 'vs Equity', points: 82, trend: 'down' },
      { game: 'vs Pirates', points: 90, trend: 'up' },
      { game: 'vs Lions', points: 75, trend: 'down' },
    ],
  };

  const playerStats = [
    {
      id: '1',
      name: 'John Doe',
      number: '23',
      gamesPlayed: 15,
      pointsPerGame: 18.5,
      reboundsPerGame: 7.2,
      assistsPerGame: 4.5,
      efficiency: 22.3,
      trend: 'up',
    },
    {
      id: '2',
      name: 'James Smith',
      number: '15',
      gamesPlayed: 15,
      pointsPerGame: 15.8,
      reboundsPerGame: 3.5,
      assistsPerGame: 6.8,
      efficiency: 19.8,
      trend: 'up',
    },
    {
      id: '3',
      name: 'Michael Johnson',
      number: '11',
      gamesPlayed: 12,
      pointsPerGame: 12.4,
      reboundsPerGame: 8.5,
      assistsPerGame: 1.5,
      efficiency: 18.2,
      trend: 'down',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Team Statistics</h2>
        <div className="flex gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2"
          >
            <option value="season">Full Season</option>
            <option value="last10">Last 10 Games</option>
            <option value="last5">Last 5 Games</option>
          </select>
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            Download Report
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex gap-6">
          <button
            onClick={() => setActiveTab('team')}
            className={cn(
              'border-b-2 px-1 py-4 text-sm font-medium',
              activeTab === 'team'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            )}
          >
            <div className="flex items-center gap-2">
              <BarChart3 size={16} />
              <span>Team Stats</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('players')}
            className={cn(
              'border-b-2 px-1 py-4 text-sm font-medium',
              activeTab === 'players'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            )}
          >
            <div className="flex items-center gap-2">
              <Users size={16} />
              <span>Player Stats</span>
            </div>
          </button>
        </nav>
      </div>

      {activeTab === 'team' ? (
        <div className="space-y-6">
          {/* Team Performance Overview */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">Points Per Game</p>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
              <p className="mt-2 text-2xl font-semibold">{teamStats.offense.pointsPerGame}</p>
              <p className="mt-1 text-xs text-green-600">+2.3 from last season</p>
            </div>
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">Field Goal %</p>
                <Activity className="h-4 w-4 text-blue-500" />
              </div>
              <p className="mt-2 text-2xl font-semibold">{teamStats.offense.fieldGoalPercentage}%</p>
              <p className="mt-1 text-xs text-blue-600">League Rank: 3rd</p>
            </div>
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">Assists Per Game</p>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
              <p className="mt-2 text-2xl font-semibold">{teamStats.offense.assistsPerGame}</p>
              <p className="mt-1 text-xs text-green-600">+1.5 from last season</p>
            </div>
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">Rebounds Per Game</p>
                <Target className="h-4 w-4 text-orange-500" />
              </div>
              <p className="mt-2 text-2xl font-semibold">{teamStats.defense.reboundsPerGame}</p>
              <p className="mt-1 text-xs text-orange-600">League Rank: 5th</p>
            </div>
          </div>

          {/* Offensive & Defensive Stats */}
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">Offensive Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Points Per Game</span>
                  <span className="font-medium">{teamStats.offense.pointsPerGame}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Field Goal %</span>
                  <span className="font-medium">{teamStats.offense.fieldGoalPercentage}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">3-Point %</span>
                  <span className="font-medium">{teamStats.offense.threePointPercentage}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Free Throw %</span>
                  <span className="font-medium">{teamStats.offense.freeThrowPercentage}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Assists Per Game</span>
                  <span className="font-medium">{teamStats.offense.assistsPerGame}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Turnovers Per Game</span>
                  <span className="font-medium">{teamStats.offense.turnoversPerGame}</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">Defensive Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Points Allowed</span>
                  <span className="font-medium">{teamStats.defense.pointsAllowedPerGame}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Rebounds Per Game</span>
                  <span className="font-medium">{teamStats.defense.reboundsPerGame}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Steals Per Game</span>
                  <span className="font-medium">{teamStats.defense.stealsPerGame}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Blocks Per Game</span>
                  <span className="font-medium">{teamStats.defense.blocksPerGame}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Opp. Field Goal %</span>
                  <span className="font-medium">{teamStats.defense.opposingFieldGoalPercentage}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Scoring Trends */}
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Scoring Trends</h3>
            <div className="space-y-4">
              {teamStats.trends.map((game, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{game.game}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{game.points} pts</span>
                    {game.trend === 'up' ? (
                      <ArrowUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <ArrowDown className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-lg bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Player
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                    GP
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
                  <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                    EFF
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                    Trend
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {playerStats.map((player) => (
                  <tr key={player.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">{player.name}</div>
                          <div className="text-sm text-gray-500">#{player.number}</div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500">
                      {player.gamesPlayed}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500">
                      {player.pointsPerGame}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500">
                      {player.reboundsPerGame}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500">
                      {player.assistsPerGame}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center text-sm font-medium text-gray-900">
                      {player.efficiency}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center">
                      {player.trend === 'up' ? (
                        <ArrowUp className="mx-auto h-4 w-4 text-green-500" />
                      ) : (
                        <ArrowDown className="mx-auto h-4 w-4 text-red-500" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamStatistics;