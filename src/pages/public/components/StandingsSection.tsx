import React, { useState } from 'react';
import { Trophy } from 'lucide-react';
import { standings } from '../data/mockData';

const StandingsSection = () => {
  const [selectedDivision, setSelectedDivision] = useState('mens-premier');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">League Standings</h2>
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
                        className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium text-white ${
                          result === 'W' ? 'bg-green-500' : 'bg-red-500'
                        }`}
                      >
                        {result}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StandingsSection;