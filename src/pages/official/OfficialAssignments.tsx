import React, { useState } from 'react';
import { Calendar, MapPin, CheckCircle, XCircle } from 'lucide-react';

const OfficialAssignments = () => {
  const [filter, setFilter] = useState('pending');

  const assignments = [
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
      status: 'accepted',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Match Assignments</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2"
        >
          <option value="all">All Assignments</option>
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="declined">Declined</option>
        </select>
      </div>

      <div className="space-y-4">
        {assignments.map((assignment) => (
          <div
            key={assignment.id}
            className="flex items-center justify-between rounded-lg bg-white p-6 shadow-sm"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-lg font-medium">
                  {assignment.homeTeam} vs {assignment.awayTeam}
                </span>
                <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                  {assignment.competition}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(assignment.date).toLocaleDateString()} at {assignment.time}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{assignment.venue}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800">
                {assignment.role}
              </span>
              {assignment.status === 'pending' ? (
                <div className="flex gap-2">
                  <button className="flex items-center gap-1 rounded-lg border border-green-600 px-4 py-2 text-green-600 hover:bg-green-50">
                    <CheckCircle size={16} />
                    Accept
                  </button>
                  <button className="flex items-center gap-1 rounded-lg border border-red-600 px-4 py-2 text-red-600 hover:bg-red-50">
                    <XCircle size={16} />
                    Decline
                  </button>
                </div>
              ) : (
                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    assignment.status === 'accepted'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfficialAssignments;