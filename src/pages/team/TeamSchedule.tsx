import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Trophy, Users, TrendingUp } from 'lucide-react';
import { useTeam } from '../../contexts/TeamContext';
import { cn } from '../../lib/utils';

const TeamSchedule = () => {
  const { selectedTeam } = useTeam();
  const [activeTab, setActiveTab] = useState<'schedule' | 'results' | 'standings'>('schedule');

  const upcomingMatches = [
    {
      id: '1',
      opponent: 'Thunder',
      date: '2024-03-20',
      time: '19:00',
      venue: 'Nyayo Stadium',
      type: 'League Match',
      competition: 'Premier League',
    },
    {
      id: '2',
      opponent: 'KPA',
      date: '2024-03-25',
      time: '16:00',
      venue: 'Makande Gymnasium',
      type: 'League Match',
      competition: 'Premier League',
    },
    {
      id: '3',
      opponent: 'Equity',
      date: '2024-03-30',
      time: '18:00',
      venue: 'Nyayo Stadium',
      type: 'Cup Match',
      competition: 'Kenya Basketball Federation Cup',
    },
  ];

  const recentResults = [
    {
      id: '1',
      opponent: 'Thunder',
      date: '2024-03-15',
      score: { home: 78, away: 72 },
      venue: 'Nyayo Stadium',
      type: 'League Match',
      result: 'W',
      competition: 'Premier League',
    },
    {
      id: '2',
      opponent: 'KPA',
      date: '2024-03-10',
      score: { home: 65, away: 70 },
      venue: 'Makande Gymnasium',
      type: 'League Match',
      result: 'L',
      competition: 'Premier League',
    },
    {
      id: '3',
      opponent: 'Equity',
      date: '2024-03-05',
      score: { home: 82, away: 75 },
      venue: 'Nyayo Stadium',
      type: 'Cup Match',
      result: 'W',
      competition: 'Kenya Basketball Federation Cup',
    },
  ];

  const leagueStandings = [
    {
      position: 1,
      team: 'KPA',
      played: 15,
      won: 12,
      lost: 3,
      points: 27,
      pointsDiff: '+125',
    },
    {
      position: 2,
      team: selectedTeam?.name || '',
      played: 15,
      won: 11,
      lost: 4,
      points: 26,
      pointsDiff: '+98',
    },
    {
      position: 3,
      team: 'Thunder',
      played: 15,
      won: 10,
      lost: 5,
      points: 25,
      pointsDiff: '+78',
    },
    {
      position: 4,
      team: 'Equity',
      played: 15,
      won: 9,
      lost: 6,
      points: 24,
      pointsDiff: '+45',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Competition Overview</h2>
        <div className="flex gap-2">
          <select className="rounded-lg border border-gray-300 bg-white px-4 py-2">
            <option>All Competitions</option>
            <option>Premier League</option>
            <option>KBF Cup</option>
          </select>
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            Download Calendar
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex gap-6">
          <button
            onClick={() => setActiveTab('schedule')}
            className={cn(
              'border-b-2 px-1 py-4 text-sm font-medium',
              activeTab === 'schedule'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            )}
          >
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>Schedule</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('results')}
            className={cn(
              'border-b-2 px-1 py-4 text-sm font-medium',
              activeTab === 'results'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            )}
          >
            <div className="flex items-center gap-2">
              <Trophy size={16} />
              <span>Results</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('standings')}
            className={cn(
              'border-b-2 px-1 py-4 text-sm font-medium',
              activeTab === 'standings'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            )}
          >
            <div className="flex items-center gap-2">
              <TrendingUp size={16} />
              <span>Standings</span>
            </div>
          </button>
        </nav>
      </div>

      {activeTab === 'schedule' && (
        <div className="space-y-4">
          {upcomingMatches.map((match) => (
            <div
              key={match.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <span className="font-medium">vs {match.opponent}</span>
                  <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                    {match.type}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>
                      {new Date(match.date).toLocaleDateString()} at {match.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{match.venue}</span>
                  </div>
                </div>
              </div>
              <button className="rounded-lg border border-blue-600 px-4 py-2 text-blue-600 hover:bg-blue-50">
                Match Details
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'results' && (
        <div className="space-y-4">
          {recentResults.map((match) => (
            <div
              key={match.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-gray-400" />
                  <span className="font-medium">vs {match.opponent}</span>
                  <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                    {match.type}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(match.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{match.venue}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {match.score.home} - {match.score.away}
                  </div>
                  <span
                    className={cn(
                      'rounded-full px-2 py-1 text-xs font-medium',
                      match.result === 'W'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    )}
                  >
                    {match.result === 'W' ? 'Won' : 'Lost'}
                  </span>
                </div>
                <button className="rounded-lg border border-blue-600 px-4 py-2 text-blue-600 hover:bg-blue-50">
                  Match Report
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'standings' && (
        <div className="rounded-lg bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Pos
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Team
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                    P
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                    W
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                    L
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                    PTS
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                    +/-
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {leagueStandings.map((team) => (
                  <tr
                    key={team.position}
                    className={cn(
                      'hover:bg-gray-50',
                      team.team === selectedTeam?.name && 'bg-blue-50'
                    )}
                  >
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                      {team.position}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                      {team.team}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500">
                      {team.played}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500">
                      {team.won}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500">
                      {team.lost}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center text-sm font-medium text-gray-900">
                      {team.points}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500">
                      {team.pointsDiff}
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

export default TeamSchedule;