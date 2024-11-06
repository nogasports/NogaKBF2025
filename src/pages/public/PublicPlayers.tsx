import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { players } from './data/mockData';
import { Star, Award, Search, Filter, TrendingUp } from 'lucide-react';
import { cn } from '../../lib/utils';

const PublicPlayers = () => {
  const [category, setCategory] = useState('points');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    team: 'all',
    position: 'all',
  });

  const filteredPlayers = players
    .filter(player => {
      const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          player.team.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTeam = filters.team === 'all' || player.team === filters.team;
      const matchesPosition = filters.position === 'all' || player.position === filters.position;
      return matchesSearch && matchesTeam && matchesPosition;
    })
    .sort((a, b) => b.stats[category] - a.stats[category]);

  const teams = [...new Set(players.map(player => player.team))];
  const positions = [...new Set(players.map(player => player.position))];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation selectedLeague="" onLeagueChange={() => {}} />
      
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Players</h1>
          <p className="mt-2 text-gray-600">Discover the top basketball talents in Kenya</p>
        </div>

        {/* Filters Section */}
        <div className="mb-8 flex flex-wrap items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search players or teams..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-[4px] border border-gray-300 py-2 pl-10 pr-4 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>
          <select
            value={filters.team}
            onChange={(e) => setFilters({ ...filters, team: e.target.value })}
            className="rounded-[4px] border border-gray-300 bg-white px-4 py-2"
          >
            <option value="all">All Teams</option>
            {teams.map(team => (
              <option key={team} value={team}>{team}</option>
            ))}
          </select>
          <select
            value={filters.position}
            onChange={(e) => setFilters({ ...filters, position: e.target.value })}
            className="rounded-[4px] border border-gray-300 bg-white px-4 py-2"
          >
            <option value="all">All Positions</option>
            {positions.map(position => (
              <option key={position} value={position}>{position}</option>
            ))}
          </select>
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

        {/* Stats Leaders */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {['points', 'rebounds', 'assists', 'steals'].map((stat) => {
            const leader = [...players].sort((a, b) => b.stats[stat] - a.stats[stat])[0];
            return (
              <div key={stat} className="rounded-[4px] bg-white p-4 shadow">
                <p className="text-sm font-medium text-gray-500 capitalize">{stat} Leader</p>
                <div className="mt-2 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{leader.name}</p>
                    <p className="text-sm text-gray-500">{leader.team}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-orange-500" />
                    <span className="font-semibold text-gray-900">
                      {leader.stats[stat].toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Players Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPlayers.map((player) => (
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
                  <div className="mt-1 flex items-center gap-2">
                    <span className="rounded-[4px] bg-orange-500 px-2 py-0.5 text-xs font-medium">
                      {player.team}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="mb-4 flex items-center justify-between">
                  <span className="flex items-center gap-1 text-sm text-gray-500">
                    <Award className="h-4 w-4" />
                    {player.position} • #{player.number}
                  </span>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-4 w-4 text-orange-500" />
                    <span className="font-medium text-gray-900">
                      {player.stats[category].toFixed(1)} {category.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center">
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
                  <div>
                    <p className="text-xs text-gray-500">SPG</p>
                    <p className="font-medium text-gray-900">
                      {player.stats.steals.toFixed(1)}
                    </p>
                  </div>
                </div>
                <button className="mt-4 w-full rounded-[4px] bg-orange-600 px-4 py-2 text-white hover:bg-orange-700">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredPlayers.length === 0 && (
          <div className="rounded-[4px] bg-gray-50 p-8 text-center">
            <p className="text-gray-600">No players found matching your criteria.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default PublicPlayers;