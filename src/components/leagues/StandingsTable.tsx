import React from 'react';
import { TeamStanding } from '../../types/league';
import { cn } from '../../lib/utils';

interface StandingsTableProps {
  standings: TeamStanding[];
}

const StandingsTable: React.FC<StandingsTableProps> = ({ standings }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Position
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
              PF
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
              PA
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
              +/-
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
              PTS
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
              Form
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {standings.map((team) => (
            <tr
              key={team.teamId}
              className="hover:bg-gray-50"
            >
              <td className="whitespace-nowrap px-6 py-4 text-sm">
                {team.position}
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <div className="flex items-center">
                  <img
                    src={team.teamLogo}
                    alt={team.teamName}
                    className="h-8 w-8 rounded-full"
                  />
                  <span className="ml-3 font-medium">{team.teamName}</span>
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-center text-sm">
                {team.played}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-center text-sm">
                {team.won}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-center text-sm">
                {team.lost}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-center text-sm">
                {team.pointsFor}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-center text-sm">
                {team.pointsAgainst}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-center text-sm">
                {team.pointsDiff}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-center text-sm font-semibold">
                {team.points}
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StandingsTable;