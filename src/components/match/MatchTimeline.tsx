import React from 'react';
import { Clock, Award, Flag, Users } from 'lucide-react';

interface TimelineEvent {
  timestamp: string;
  type: 'score' | 'foul' | 'timeout' | 'substitution';
  details: Record<string, any>;
}

interface MatchTimelineProps {
  events: TimelineEvent[];
}

const MatchTimeline: React.FC<MatchTimelineProps> = ({ events }) => {
  const getEventIcon = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'score':
        return Award;
      case 'foul':
        return Flag;
      case 'timeout':
        return Clock;
      case 'substitution':
        return Users;
      default:
        return Clock;
    }
  };

  const formatEventDetails = (event: TimelineEvent) => {
    switch (event.type) {
      case 'score':
        return `${event.details.playerName} scores ${event.details.points} points`;
      case 'foul':
        return `${event.details.playerName} commits ${event.details.foulType} foul`;
      case 'timeout':
        return `${event.details.team} team timeout`;
      case 'substitution':
        return `${event.details.inPlayer} in for ${event.details.outPlayer}`;
      default:
        return '';
    }
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold">Match Timeline</h3>
      
      <div className="space-y-4">
        {events.map((event, index) => {
          const Icon = getEventIcon(event.type);
          
          return (
            <div
              key={index}
              className="flex items-center gap-4 rounded-lg border p-4"
            >
              <div className="rounded-full bg-gray-100 p-2">
                <Icon className="h-5 w-5 text-gray-600" />
              </div>
              
              <div className="flex-1">
                <p className="font-medium text-gray-900">
                  {formatEventDetails(event)}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(event.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MatchTimeline;