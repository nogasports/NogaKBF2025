import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { teams } from './data/mockData';
import { MapPin, Trophy, Users } from 'lucide-react';

const PublicTeams = () => {
  const [selectedDivision, setSelectedDivision] = useState('all');

  const filteredTeams = selectedDivision === 'all'
    ? teams
    : teams.filter(team => team.division === selectedDivision);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation selectedLeague="" onLeagueChange={() => {}} />
      
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Teams</h1>
          <select
            value={selectedDivision}
            onChange={(e) => setSelectedDivision(e.target.value)}
            className="rounded-[4px] border border-gray-300 bg-white px-4 py-2"
          >
            <option value="all">All Divisions</option>
            <option value="Men's Premier League">Men's Premier League</option>
            <option value="Women's Premier League">Women's Premier League</option>
            <option value="Men's Division One">Men's Division One</option>
          </select>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTeams.map((team) => (
            <div
              key={team.id}
              className="overflow-hidden rounded-[4px] bg-white shadow transition-all hover:shadow-lg"
            >
              <div className="relative h-48">
                <img
                  src={team.logo}
                  alt={team.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">{team.name}</h3>
                  <p className="text-sm opacity-75">{team.division}</p>
                </div>
              </div>
              <div className="p-4">
                <div className="mb-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{team.homeVenue}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Trophy className="h-4 w-4" />
                    <span>{team.achievements[0]}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>
                      {team.roster.players} Players • {team.roster.coaches} Coaches
                    </span>
                  </div>
                </div>
                <button className="w-full rounded-[4px] bg-orange-600 px-4 py-2 text-white hover:bg-orange-700">
                  View Team Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PublicTeams;