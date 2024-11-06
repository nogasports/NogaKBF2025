import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { fixtures } from '../data/mockData';

const FixturesList = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Upcoming Fixtures</h2>
        <select className="rounded-[4px] border border-gray-300 bg-white px-4 py-2">
          <option>All Divisions</option>
          <option>Premier League</option>
          <option>Division One</option>
        </select>
      </div>

      <div className="space-y-4">
        {fixtures.map((fixture) => (
          <div
            key={fixture.id}
            className="flex items-center justify-between rounded-[4px] bg-white p-6 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <img
                src={fixture.logo}
                alt=""
                className="h-12 w-12 rounded-[4px] object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-900">
                  {fixture.homeTeam} vs {fixture.awayTeam}
                </h3>
                <div className="mt-1 flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{fixture.date} at {fixture.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{fixture.venue}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FixturesList;