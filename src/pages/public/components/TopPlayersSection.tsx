import React, { useState } from 'react';
import { Star, TrendingUp, Award } from 'lucide-react';
import { players } from '../data/mockData';

const TopPlayersSection = () => {
  const [category, setCategory] = useState('points');

  const sortedPlayers = [...players].sort((a, b) => {
    return b.stats[category] - a.stats[category];
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Top Players</h2>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-[4px] border border-gray-300 bg-white px-4 py-2"
        >
          <option value="points">Points Per Game</option>
          <option value="rebounds">Rebounds</option>
          <option value="assists">Assists</option>
          <option value="steals">Steals</option>
          <option value="blocks">Blocks</option>
        </select>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sortedPlayers.map((player) => (
          <div
            key={player.id}
            className="overflow-hidden rounded-[4px] bg-white shadow transition-all hover:shadow-lg"
          >
            <div className="relative h-48">
              <img
                src={player.photo}
                alt={player.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg font-bold">{player.name}</h3>
                <p className="text-sm opacity-75">{player.team}</p>
              </div>
            </div>
            <div className="p-4">
              <div className="mb-4 flex items-center justify-between">
                <span className="flex items-center gap-1 text-sm text-gray-500">
                  <Award className="h-4 w-4" />
                  {player.position} • #{player.number}
                </span>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="font-medium text-gray-900">
                    {player.stats[category].toFixed(1)}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xs text-gray-500">PPG</p>
                  <p className="font-medium text-gray-900">
                    {player.stats.points.toFixed(1)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">RPG</p>
                  <p className="font-medium text-gray-900">
                    {player.stats.rebounds.toFixed(1)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">APG</p>
                  <p className="font-medium text-gray-900">
                    {player.stats.assists.toFixed(1)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPlayersSection;