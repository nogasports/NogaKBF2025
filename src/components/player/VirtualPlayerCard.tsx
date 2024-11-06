import React from 'react';
import { QrCode, Award } from 'lucide-react';
import { Player } from '../../types/player';

interface VirtualPlayerCardProps {
  player: Player;
}

const VirtualPlayerCard: React.FC<VirtualPlayerCardProps> = ({ player }) => {
  return (
    <div className="mx-auto max-w-md overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white shadow-xl">
      <div className="flex justify-between">
        <div>
          <h3 className="text-xl font-bold">{player.team.name}</h3>
          <p className="text-sm opacity-75">Official Player Card</p>
        </div>
        <img
          src={player.team.logo}
          alt="Team Logo"
          className="h-12 w-12 rounded-full"
        />
      </div>

      <div className="mt-6 flex items-center gap-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-blue-700">
          <span className="text-2xl font-bold">#{player.jerseyNumber}</span>
        </div>
        <div>
          <h4 className="text-lg font-semibold">{player.name}</h4>
          <p className="text-sm opacity-75">{player.position}</p>
          <p className="text-sm opacity-75">License: {player.license.number}</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs opacity-75">Valid Until</p>
          <p className="font-medium">
            {new Date(player.license.validUntil).toLocaleDateString()}
          </p>
        </div>
        <div>
          <p className="text-xs opacity-75">Status</p>
          <p className="font-medium capitalize">{player.license.status}</p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div>
          <p className="text-xs opacity-75">Player ID</p>
          <p className="font-medium">{player.id}</p>
        </div>
        <div className="rounded-lg bg-white p-2">
          <QrCode className="h-16 w-16 text-blue-800" />
        </div>
      </div>
    </div>
  );
};

export default VirtualPlayerCard;