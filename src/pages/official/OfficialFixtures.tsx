import React, { useState } from 'react';
import { Calendar, MapPin, Search, Filter } from 'lucide-react';
import { useOfficial } from '../../contexts/OfficialContext';

const OfficialFixtures = () => {
  const [filter, setFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');

  const fixtures = [
    {
      id: '1',
      homeTeam: 'Thunder',
      awayTeam: 'KPA',
      date: '2024-03-20',
      time: '19:00',
      venue: 'Nyayo Stadium',
      competition: 'Premier League',
      status: 'upcoming',
      role: 'Referee',
    },
    {
      id: '2',
      homeTeam: 'Equity',
      awayTeam: 'Ulinzi',
      date: '2024-03-25',
      time: '16:00',
      venue: 'Makande Gymnasium',
      competition: 'Premier League',
      status: 'upcoming',
      role: 'Referee',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">League Fixtures</h2>
        <div className="flex gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2"
          >
            <option value="all">All Competitions</option>
            <option value="premier">Premier League</option>
            <option value="division1">Division One</option>
          </select>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2"
          />
        </div>
      </div>

      <div className="space-y-4">
        {fixtures.map((fixture) => (
          <div
            key={fixture.id}
            className="flex items-center justify-between rounded-lg bg-white p-6 shadow-sm"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-lg font-medium">
                  {fixture.homeTeam} vs {fixture.awayTeam}
                </span>
                <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                  {fixture.competition}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(fixture.date).toLocaleDateString()} at {fixture.time}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{fixture.venue}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800">
                {fixture.role}
              </span>
              <button className="rounded-lg border border-blue-600 px-4 py-2 text-blue-600 hover:bg-blue-50">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfficialFixtures;