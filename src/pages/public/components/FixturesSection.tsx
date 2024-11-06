import React, { useState } from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { fixtures } from '../data/mockData';

const FixturesSection = () => {
  const [view, setView] = useState<'upcoming' | 'results'>('upcoming');
  const [selectedDivision, setSelectedDivision] = useState('all');

  const filteredFixtures = fixtures.filter((fixture) => {
    const isCorrectView = view === 'upcoming' 
      ? fixture.status === 'scheduled'
      : fixture.status === 'completed';
    
    const isCorrectDivision = selectedDivision === 'all' || fixture.division === selectedDivision;
    
    return isCorrectView && isCorrectDivision;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-900">
            {view === 'upcoming' ? 'Upcoming Fixtures' : 'Results'}
          </h2>
          <div className="flex rounded-[4px] border border-gray-300">
            <button
              onClick={() => setView('upcoming')}
              className={cn(
                'px-4 py-2 text-sm font-medium',
                view === 'upcoming'
                  ? 'bg-orange-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              )}
            >
              Upcoming
            </button>
            <button
              onClick={() => setView('results')}
              className={cn(
                'px-4 py-2 text-sm font-medium',
                view === 'results'
                  ? 'bg-orange-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              )}
            >
              Results
            </button>
          </div>
        </div>
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
        {filteredFixtures.map((fixture) => (
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
                  {fixture.status === 'completed' && (
                    <p className="text-2xl font-bold text-gray-900">
                      {fixture.homeTeam.score}
                    </p>
                  )}
                </div>
                <div className="text-center">
                  {fixture.status === 'completed' ? (
                    <div>
                      <p className="text-sm font-medium text-green-600">Final Score</p>
                    </div>
                  ) : (
                    <p className="text-lg font-medium">VS</p>
                  )}
                </div>
                <div className="text-center">
                  <img
                    src={fixture.awayTeam.logo}
                    alt={fixture.awayTeam.name}
                    className="mx-auto h-16 w-16 rounded-[4px] object-cover"
                  />
                  <p className="mt-2 font-medium">{fixture.awayTeam.name}</p>
                  {fixture.status === 'completed' && (
                    <p className="text-2xl font-bold text-gray-900">
                      {fixture.awayTeam.score}
                    </p>
                  )}
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
                    <Clock className="h-4 w-4" />
                    <span>{fixture.time}</span>
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

      {filteredFixtures.length === 0 && (
        <div className="rounded-[4px] bg-gray-50 p-8 text-center">
          <p className="text-gray-600">
            No {view === 'upcoming' ? 'upcoming fixtures' : 'results'} found for the selected division.
          </p>
        </div>
      )}
    </div>
  );
};

export default FixturesSection;