import React from 'react';
import { Player } from '../../types/team';
import { UserCircle, ArrowLeftRight } from 'lucide-react';

interface PlayerListProps {
  players: Player[];
  onEditPlayer: (player: Player) => void;
  onTransferRequest: (player: Player) => void;
}

const PlayerList: React.FC<PlayerListProps> = ({ players, onEditPlayer, onTransferRequest }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Player
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Position
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Jersey
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {players.map((player) => (
            <tr key={player.id}>
              <td className="whitespace-nowrap px-6 py-4">
                <div className="flex items-center">
                  <UserCircle className="mr-3 h-8 w-8 text-gray-400" />
                  <div>
                    <div className="font-medium text-gray-900">{player.name}</div>
                    <div className="text-sm text-gray-500">
                      {player.nationality}
                    </div>
                  </div>
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {player.position}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                #{player.jerseyNumber}
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <span
                  className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                    player.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : player.status === 'injured'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {player.status}
                </span>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onEditPlayer(player)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onTransferRequest(player)}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-900"
                  >
                    <ArrowLeftRight size={16} />
                    Transfer
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerList;