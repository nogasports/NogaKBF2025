import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { fixtures } from './data/mockData';
import { Calendar, MapPin } from 'lucide-react';

const PublicScores = () => {
  const [selectedDivision, setSelectedDivision] = useState('all');

  const filteredFixtures = selectedDivision === 'all'
    ? fixtures
    : fixtures.filter(fixture => fixture.division === selectedDivision);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation selectedLeague="" onLeagueChange={() => {}} />
      
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Latest Scores</h1>
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

        <div className="space-y-4">
          {filteredFixtures.filter(fixture => fixture.status === 'completed').map((fixture) => (
            <div
              key={fixture.id}
              className="overflow-hidden rounded-[4px] bg-white p-6 shadow transition-all hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <img
                      src={fixture.homeTeam.logo}
                      alt={fixture.homeTeam.name}
                      className="mx-auto h-16 w-16 rounded-[4px] object-cover"
                    />
                    <p className="mt-2 font-medium">{fixture.homeTeam.name}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {fixture.homeTeam.score}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-green-600">Final Score</p>
                  </div>
                  <div className="text-center">
                    <img
                      src={fixture.awayTeam.logo}
                      alt={fixture.awayTeam.name}
                      className="mx-auto h-16 w-16 rounded-[4px] object-cover"
                    />
                    <p className="mt-2 font-medium">{fixture.awayTeam.name}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {fixture.awayTeam.score}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="mb-2 rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-800">
                    {fixture.division}
                  </div>
                  <div className="flex flex-col gap-1 text-sm text-gray-500">
                    <div className="flex items-center justify-end gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{fixture.date}</span>
                    </div>
                    <div className="flex items-center justify-end gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{fixture.venue}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PublicScores;