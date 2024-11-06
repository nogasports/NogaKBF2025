import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';

interface TeamScheduleProps {
  teamId: string;
}

const TeamSchedule: React.FC<TeamScheduleProps> = () => {
  const upcomingMatches = [
    {
      id: '1',
      opponent: 'Thunder',
      date: '2024-03-20',
      time: '19:00',
      venue: 'Nyayo Stadium',
      type: 'League Match',
    },
    {
      id: '2',
      opponent: 'KPA',
      date: '2024-03-25',
      time: '16:00',
      venue: 'Makande Gymnasium',
      type: 'League Match',
    },
    {
      id: '3',
      opponent: 'Equity',
      date: '2024-03-30',
      time: '18:00',
      venue: 'Nyayo Stadium',
      type: 'Cup Match',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Upcoming Matches</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700">
          View Full Calendar
        </button>
      </div>

      <div className="space-y-4">
        {upcomingMatches.map((match) => (
          <div
            key={match.id}
            className="flex items-center justify-between rounded-lg border p-4"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gray-400" />
                <span className="font-medium">vs {match.opponent}</span>
                <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                  {match.type}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
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
            <button className="rounded-lg border border-blue-600 px-4 py-2 text-blue-600 hover:bg-blue-50">
              Match Details
            </button>
          </div>
        ))}
      </div>

      <div className="rounded-lg bg-blue-50 p-4">
        <h4 className="font-medium text-blue-900">Next Training Session</h4>
        <div className="mt-2 flex items-center gap-4 text-sm text-blue-700">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Tomorrow</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>06:00 AM - 08:00 AM</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>Team Training Facility</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamSchedule;