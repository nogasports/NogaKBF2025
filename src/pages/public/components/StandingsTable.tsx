import React from 'react';
import { cn } from '../../../lib/utils';

interface StandingsTableProps {
  standings: Array<{
    position: number;
    team: string;
    logo: string;
    played: number;
    won: number;
    lost: number;
    points: number;
    form: ('W' | 'L')[];
  }>;
  leagues: Array<{
    id: string;
    name: string;
  }>;
}

const StandingsTable: React.FC<StandingsTableProps> = ({ standings, leagues }) => {
  return (
    <div className="rounded-[4px] bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">League Standings</h2>
        <select className="rounded-[4px] border border-gray-300 bg-white px-4 py-2">
          {leagues.map((league) => (
            <option key={league.id} value={league.id}>
              {league.name}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b text-left text-sm font-medium text-gray-500">
              <th className="pb-3 pr-4">Pos</th>
              <th className="pb-3 pr-4">Team</th>
              <th className="pb-3 pr-4 text-center">P</th>
              <th className="pb-3 pr-4 text-center">W</th>
              <th className="pb-3 pr-4 text-center">L</th>
              <th className="pb-3 text-center">Pts</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {standings.map((team) => (
              <tr key={team.team} className="text-sm">
                <td className="py-4 pr-4 font-medium text-gray-900">
                  {team.position}
                </td>
                <td className="py-4 pr-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={team.logo}
                      alt={team.team}
                      className="h-6 w-6 rounded-[4px] object-cover"
                    />
                    <span className="font-medium text-gray-900">{team.team}</span>
                  </div>
                </td>
                <td className="py-4 pr-4 text-center text-gray-500">
                  {team.played}
                </td>
                <td className="py-4 pr-4 text-center text-gray-500">
                  {team.won}
                </td>
                <td className="py-4 pr-4 text-center text-gray-500">
                  {team.lost}
                </td>
                <td className="py-4 text-center font-medium text-gray-900">
                  {team.points}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StandingsTable;