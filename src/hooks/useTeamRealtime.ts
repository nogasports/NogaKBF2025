import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface TeamNotification {
  id: string;
  type: string;
  message: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

interface TeamUpdate {
  roster?: {
    added?: any[];
    removed?: string[];
    updated?: any[];
  };
  schedule?: {
    added?: any[];
    removed?: string[];
    updated?: any[];
  };
  notifications?: TeamNotification[];
}

export function useTeamRealtime(teamId: string) {
  const [notifications, setNotifications] = useState<TeamNotification[]>([]);
  const [rosterUpdates, setRosterUpdates] = useState<TeamUpdate['roster'] | null>(null);
  const [scheduleUpdates, setScheduleUpdates] = useState<TeamUpdate['schedule'] | null>(null);

  useWebSocket<TeamUpdate>(`team.${teamId}`, (update) => {
    if (update.roster) setRosterUpdates(update.roster);
    if (update.schedule) setScheduleUpdates(update.schedule);
    if (update.notifications) {
      setNotifications(prev => [...update.notifications!, ...prev]);
    }
  });

  useWebSocket<TeamNotification>(`team.${teamId}.notifications`, (notification) => {
    setNotifications(prev => [notification, ...prev]);
  });

  return {
    notifications,
    rosterUpdates,
    scheduleUpdates,
  };
}