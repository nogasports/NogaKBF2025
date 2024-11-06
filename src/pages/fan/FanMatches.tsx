import React, { useState } from 'react';
import { Calendar, MapPin, Star, Trophy } from 'lucide-react';
import { useFan } from '../../contexts/FanContext';

const FanMatches = () => {
  const [showVoteModal, setShowVoteModal] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<any>(null);

  const matches = [
    {
      id: '1',
      homeTeam: {
        id: '1',
        name: 'Ulinzi Warriors',
        logo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=100&h=100&fit=crop',
      },
      awayTeam: {
        id: '2',
        name: 'Thunder',
        logo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=100&h=100&fit=crop',
      },
      date: '2024-03-20',
      time: '19:00',
      venue: 'Nyayo Stadium',
      status: 'completed',
      score: {
        home: 78,
        away: 72,
      },
      canVote: true,
    },
  ];

  const players = [
    {
      id: '1',
      name: 'John Doe',
      team: 'Ulinzi Warriors',
      stats: '22 PTS, 5 REB, 4 AST',
    },
    {
      id: '2',
      name: 'James Smith',
      team: 'Thunder',
      stats: '18 PTS, 8 REB, 3 AST',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Match Center</h2>
        <div className="flex gap-2">
          <select className="rounded-lg border border-gray-300 bg-white px-4 py-2">
            <option>All Teams</option>
            <option>My Teams</option>
          </select>
          <select className="rounded-lg border border-gray-300 bg-white px-4 py-2">
            <option>All Matches</option>
            <option>Completed</option>
            <option>Upcoming</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {matches.map((match) => (
          <div
            key={match.id}
            className="rounded-lg bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <img
                    src={match.homeTeam.logo}
                    alt={match.homeTeam.name}
                    className="mx-auto h-16 w-16 rounded-full object-cover"
                  />
                  <p className="mt-2 font-medium">{match.homeTeam.name}</p>
                </div>
                {match.status === 'completed' ? (
                  <div className="text-center">
                    <div className="text-3xl font-bold">
                      {match.score.home} - {match.score.away}
                    </div>
                    <p className="text-sm text-gray-500">Final Score</p>
                  </div>
                ) : (
                  <div className="text-2xl font-bold">VS</div>
                )}
                <div className="text-center">
                  <img
                    src={match.awayTeam.logo}
                    alt={match.awayTeam.name}
                    className="mx-auto h-16 w-16 rounded-full object-cover"
                  />
                  <p className="mt-2 font-medium">{match.awayTeam.name}</p>
                </div>
              </div>
              {match.canVote && (
                <button
                  onClick={() => {
                    setSelectedMatch(match);
                    setShowVoteModal(true);
                  }}
                  className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  <Star size={20} />
                  Vote MVP
                </button>
              )}
            </div>
            <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
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
        ))}
      </div>

      {showVoteModal && selectedMatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Vote for Player of the Match
            </h3>
            <div className="mt-4 space-y-4">
              {players.map((player) => (
                <div
                  key={player.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <p className="font-medium text-gray-900">{player.name}</p>
                    <p className="text-sm text-gray-500">
                      {player.team} • {player.stats}
                    </p>
                  </div>
                  <button className="rounded-lg border border-blue-600 px-4 py-2 text-blue-600 hover:bg-blue-50">
                    Vote
                  </button>
                </div>
              ))}
              <div className="mt-6 flex justify-end gap-2">
                <button
                  onClick={() => setShowVoteModal(false)}
                  className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FanMatches;