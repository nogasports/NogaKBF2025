import React, { useState } from 'react';
import { MapPin, Trophy, Users, Calendar } from 'lucide-react';
import { teams } from '../data/mockData';

const TeamsSection = () => {
  const [selectedDivision, setSelectedDivision] = useState('all');

  const filteredTeams = selectedDivision === 'all' 
    ? teams 
    : teams.filter(team => team.division === selectedDivision);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Teams</h2>
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
                <div className="mt-1 flex items-center gap-2">
                  <span className="rounded-[4px] bg-orange-500 px-2 py-0.5 text-xs font-medium">
                    {team.division}
                  </span>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="mb-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>Est. {team.founded}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>{team.roster.players} Players</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{team.homeVenue}</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Trophy className="h-4 w-4 text-orange-500" />
                    <span className="font-medium">Achievements</span>
                  </div>
                  <ul className="ml-6 list-disc space-y-1 text-sm text-gray-600">
                    {team.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 rounded-[4px] border border-orange-600 px-4 py-2 text-orange-600 hover:bg-orange-50">
                  View Roster
                </button>
                <button className="flex-1 rounded-[4px] bg-orange-600 px-4 py-2 text-white hover:bg-orange-700">
                  Team Profile
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTeams.length === 0 && (
        <div className="rounded-[4px] bg-gray-50 p-8 text-center">
          <p className="text-gray-600">No teams found in this division.</p>
        </div>
      )}
    </div>
  );
};

export default TeamsSection;