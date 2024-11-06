import React from 'react';
import { Bell, Calendar, Users, AlertCircle } from 'lucide-react';
import { useTeamRealtime } from '../../hooks/useTeamRealtime';
import { useLeagueRealtime } from '../../hooks/useLeagueRealtime';

interface RealtimeNotificationsProps {
  teamId?: string;
  leagueId?: string;
}

const RealtimeNotifications: React.FC<RealtimeNotificationsProps> = ({
  teamId,
  leagueId,
}) => {
  const team = teamId ? useTeamRealtime(teamId) : null;
  const league = leagueId ? useLeagueRealtime(leagueId) : null;

  const allNotifications = [
    ...(team?.notifications || []),
    ...(league?.announcements || []),
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const getIcon = (type: string) => {
    switch (type) {
      case 'schedule':
        return Calendar;
      case 'roster':
        return Users;
      case 'announcement':
        return Bell;
      default:
        return AlertCircle;
    }
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold">Latest Updates</h3>

      <div className="space-y-4">
        {allNotifications.map((notification) => {
          const Icon = getIcon(notification.type);

          return (
            <div
              key={notification.id}
              className="flex items-center gap-4 rounded-lg border p-4"
            >
              <div className="rounded-full bg-blue-50 p-2">
                <Icon className="h-5 w-5 text-blue-600" />
              </div>

              <div className="flex-1">
                <p className="font-medium text-gray-900">
                  {notification.title || notification.message}
                </p>
                {notification.title && (
                  <p className="text-sm text-gray-500">{notification.message}</p>
                )}
                <p className="mt-1 text-xs text-gray-400">
                  {new Date(notification.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          );
        })}

        {allNotifications.length === 0 && (
          <p className="text-center text-gray-500">No new notifications</p>
        )}
      </div>
    </div>
  );
};

export default RealtimeNotifications;