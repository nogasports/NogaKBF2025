import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { standings } from './data/mockData';
import { Trophy, TrendingUp } from 'lucide-react';
import { cn } from '../../lib/utils';

const PublicStandings = () => {
  const [selectedDivision, setSelectedDivision] = useState('mens-premier');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation selectedLeague="" onLeagueChange={() => {}} />
      
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">League Standings</h1>
            <p className="mt-2 text-sm text-gray-600">2024 Season</p>
          </div>
          <select
            value={selectedDivision}
            onChange={(e) => setSelectedDivision(e.target.value)}
            className="rounded-[4px] border border-gray-300 bg-white px-4 py-2"
          >
            <option value="mens-premier">Men's Premier League</option>
            <option value="womens-premier">Women's Premier League</option>
            <option value="mens-div1">Men's Division One</option>
          </select>
        </div>

        <div className="overflow-hidden rounded-[4px] bg-white shadow">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-orange-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-orange-700">
                    Position
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-orange-700">
                    Team
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-orange-700">
                    P
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-orange-700">
                    W
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-orange-700">
                    L
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-orange-700">
                    PTS
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-orange-700">
                    +/-
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-orange-700">
                    Form
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-orange-700">
                    Trend
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {standings.map((team) => (
                  <tr key={team.team} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        {team.position === 1 && (
                          <Trophy className="mr-2 h-4 w-4 text-yellow-500" />
                        )}
                        <span className="font-medium text-gray-900">
                          {team.position}
                        </span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        <img
                          src={team.logo}
                          alt={team.team}
                          className="h-8 w-8 rounded-[4px] object-cover"
                        />
                        <span className="ml-3 font-medium text-gray-900">
                          {team.team}
                        </span>
                      </div>
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
                    <td className="whitespace-nowrap px-6 py-4 text-center font-medium text-gray-900">
                      {team.points}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500">
                      {team.pointsDiff}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex justify-center gap-1">
                        {team.form.map((result, index) => (
                          <span
                            key={index}
                            className={cn(
                              'flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium text-white',
                              result === 'W' ? 'bg-green-500' : 'bg-red-500'
                            )}
                          >
                            {result}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center">
                      <TrendingUp className={cn(
                        'mx-auto h-5 w-5',
                        team.position <= 3 ? 'text-green-500' : 'text-gray-400'
                      )} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[4px] bg-white p-6 shadow">
            <h2 className="text-lg font-semibold text-gray-900">League Leaders</h2>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Points Per Game</p>
                  <p className="text-sm text-gray-500">John Doe - Ulinzi Warriors</p>
                </div>
                <span className="font-semibold text-gray-900">22.5</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Rebounds Per Game</p>
                  <p className="text-sm text-gray-500">James Smith - KPA</p>
                </div>
                <span className="font-semibold text-gray-900">10.2</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Assists Per Game</p>
                  <p className="text-sm text-gray-500">Michael Johnson - Thunder</p>
                </div>
                <span className="font-semibold text-gray-900">7.2</span>
              </div>
            </div>
          </div>

          <div className="rounded-[4px] bg-white p-6 shadow">
            <h2 className="text-lg font-semibold text-gray-900">Team Stats</h2>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Highest Scoring</p>
                  <p className="text-sm text-gray-500">KPA</p>
                </div>
                <span className="font-semibold text-gray-900">85.3 PPG</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Best Defense</p>
                  <p className="text-sm text-gray-500">Ulinzi Warriors</p>
                </div>
                <span className="font-semibold text-gray-900">68.5 PPG</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Point Differential</p>
                  <p className="text-sm text-gray-500">Thunder</p>
                </div>
                <span className="font-semibold text-gray-900">+12.4</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PublicStandings;