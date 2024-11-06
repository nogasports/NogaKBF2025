import React from 'react';
import { Calendar, MapPin, Trophy } from 'lucide-react';

const TeamMatches = () => {
  const matches = [
    {
      id: '1',
      opponent: 'Thunder',
      date: '2024-03-20',
      time: '19:00',
      venue: 'Nyayo Stadium',
      result: 'W 78-72',
      competition: 'League Match',
    },
    {
      id: '2',
      opponent: 'KPA',
      date: '2024-03-15',
      time: '16:00',
      venue: 'Makande Gymnasium',
      result: 'W 85-80',
      competition: 'Cup Match',
    },
    {
      id: '3',
      opponent: 'Equity',
      date: '2024-03-10',
      time: '18:00',
      venue: 'Nyayo Stadium',
      result: 'L 82-88',
      competition: 'League Match',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Matches</h2>
        <div className="flex gap-2">
          <select className="rounded-lg border border-gray-300 bg-white px-4 py-2">
            <option>All Competitions</option>
            <option>League Matches</option>
            <option>Cup Matches</option>
          </select>
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            Match Report
          </button>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-sm">
        <div className="space-y-4">
          {matches.map((match) => (
            <div
              key={match.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-gray-400" />
                  <span className="font-medium">vs {match.opponent}</span>
                  <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                    {match.competition}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(match.date).toLocaleDateString()} at {match.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{match.venue}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`font-semibold ${
                  match.result.startsWith('W') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {match.result}
                </span>
                <button className="rounded-lg border border-blue-600 px-4 py-2 text-blue-600 hover:bg-blue-50">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamMatches;