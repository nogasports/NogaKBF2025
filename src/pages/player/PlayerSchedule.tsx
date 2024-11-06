import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Trophy, Users } from 'lucide-react';
import { usePlayer } from '../../contexts/PlayerContext';
import { cn } from '../../lib/utils';

const PlayerSchedule = () => {
  const { currentPlayer } = usePlayer();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming');

  const upcomingEvents = [
    {
      id: '1',
      type: 'match',
      opponent: 'Thunder',
      date: '2024-03-20',
      time: '19:00',
      venue: 'Nyayo Stadium',
      competition: 'Premier League',
      status: 'scheduled',
    },
    {
      id: '2',
      type: 'training',
      title: 'Team Practice',
      date: '2024-03-18',
      time: '06:00',
      venue: 'Team Training Facility',
      status: 'mandatory',
    },
    {
      id: '3',
      type: 'match',
      opponent: 'KPA',
      date: '2024-03-25',
      time: '16:00',
      venue: 'Makande Gymnasium',
      competition: 'Premier League',
      status: 'scheduled',
    },
  ];

  const completedEvents = [
    {
      id: '4',
      type: 'match',
      opponent: 'Equity',
      date: '2024-03-15',
      time: '18:00',
      venue: 'Nyayo Stadium',
      competition: 'Premier League',
      result: {
        score: '85-80',
        personalStats: '22 PTS, 5 REB, 4 AST',
      },
    },
    {
      id: '5',
      type: 'match',
      opponent: 'Ulinzi',
      date: '2024-03-10',
      time: '16:00',
      venue: 'Nyayo Stadium',
      competition: 'Premier League',
      result: {
        score: '78-72',
        personalStats: '18 PTS, 7 REB, 3 AST',
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Schedule</h2>
        <div className="flex gap-2">
          <select className="rounded-lg border border-gray-300 bg-white px-4 py-2">
            <option>All Events</option>
            <option>Matches Only</option>
            <option>Training Only</option>
          </select>
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            Download Calendar
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex gap-6">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={cn(
              'border-b-2 px-1 py-4 text-sm font-medium',
              activeTab === 'upcoming'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            )}
          >
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>Upcoming Events</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={cn(
              'border-b-2 px-1 py-4 text-sm font-medium',
              activeTab === 'completed'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            )}
          >
            <div className="flex items-center gap-2">
              <Trophy size={16} />
              <span>Completed Events</span>
            </div>
          </button>
        </nav>
      </div>

      {activeTab === 'upcoming' && (
        <div className="space-y-4">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="flex items-center justify-between rounded-lg bg-white p-6 shadow-sm"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {event.type === 'match' ? (
                    <>
                      <span className="text-lg font-medium">
                        vs {event.opponent}
                      </span>
                      <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                        {event.competition}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-lg font-medium">
                        {event.title}
                      </span>
                      <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                        {event.status}
                      </span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(event.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{event.venue}</span>
                  </div>
                </div>
              </div>
              <button className="rounded-lg border border-blue-600 px-4 py-2 text-blue-600 hover:bg-blue-50">
                View Details
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'completed' && (
        <div className="space-y-4">
          {completedEvents.map((event) => (
            <div
              key={event.id}
              className="flex items-center justify-between rounded-lg bg-white p-6 shadow-sm"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-medium">
                    vs {event.opponent}
                  </span>
                  <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                    {event.competition}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(event.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{event.venue}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-gray-900">
                  {event.result.score}
                </div>
                <div className="mt-1 text-sm text-gray-500">
                  {event.result.personalStats}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlayerSchedule;