import React, { useState } from 'react';
import { Calendar, MapPin, Edit2, CheckCircle } from 'lucide-react';

const OfficialResults = () => {
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<any>(null);

  const matches = [
    {
      id: '1',
      homeTeam: 'Thunder',
      awayTeam: 'KPA',
      date: '2024-03-20',
      time: '19:00',
      venue: 'Nyayo Stadium',
      competition: 'Premier League',
      role: 'Referee',
      status: 'pending',
    },
    {
      id: '2',
      homeTeam: 'Equity',
      awayTeam: 'Ulinzi',
      date: '2024-03-25',
      time: '16:00',
      venue: 'Makande Gymnasium',
      competition: 'Premier League',
      role: 'Referee',
      status: 'completed',
      score: {
        home: 78,
        away: 72,
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Match Results</h2>
        <select className="rounded-lg border border-gray-300 bg-white px-4 py-2">
          <option value="all">All Matches</option>
          <option value="pending">Pending Results</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="space-y-4">
        {matches.map((match) => (
          <div
            key={match.id}
            className="flex items-center justify-between rounded-lg bg-white p-6 shadow-sm"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-lg font-medium">
                  {match.homeTeam} vs {match.awayTeam}
                </span>
                <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
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
              {match.status === 'completed' ? (
                <div className="flex items-center gap-4">
                  <span className="text-lg font-semibold">
                    {match.score.home} - {match.score.away}
                  </span>
                  <span className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                    <CheckCircle size={16} />
                    Completed
                  </span>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setSelectedMatch(match);
                    setShowScoreModal(true);
                  }}
                  className="flex items-center gap-2 rounded-lg border border-blue-600 px-4 py-2 text-blue-600 hover:bg-blue-50"
                >
                  <Edit2 size={16} />
                  Enter Score
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Score Entry Modal */}
      {showScoreModal && selectedMatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6">
            <h3 className="text-lg font-semibold text-gray-900">Enter Match Score</h3>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {selectedMatch.homeTeam}
                  </label>
                  <input
                    type="number"
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                    placeholder="Score"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {selectedMatch.awayTeam}
                  </label>
                  <input
                    type="number"
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                    placeholder="Score"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Match Report
                </label>
                <textarea
                  rows={3}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                  placeholder="Enter match report..."
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowScoreModal(false)}
                  className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Handle score submission
                    setShowScoreModal(false);
                  }}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  Submit Score
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfficialResults;