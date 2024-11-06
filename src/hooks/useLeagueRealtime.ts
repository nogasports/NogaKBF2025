import { useState } from 'react';
import { useWebSocket } from './useWebSocket';

interface LeagueAnnouncement {
  id: string;
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  timestamp: string;
  metadata?: Record<string, any>;
}

interface LeagueUpdate {
  standings?: any;
  schedule?: any;
  announcements?: LeagueAnnouncement[];
}

export function useLeagueRealtime(leagueId: string) {
  const [announcements, setAnnouncements] = useState<LeagueAnnouncement[]>([]);
  const [standingsUpdate, setStandingsUpdate] = useState<any>(null);
  const [scheduleUpdate, setScheduleUpdate] = useState<any>(null);

  useWebSocket<LeagueUpdate>(`league.${leagueId}`, (update) => {
    if (update.standings) setStandingsUpdate(update.standings);
    if (update.schedule) setScheduleUpdate(update.schedule);
    if (update.announcements) {
      setAnnouncements(prev => [...update.announcements!, ...prev]);
    }
  });

  useWebSocket<LeagueAnnouncement>('league.announcements', (announcement) => {
    setAnnouncements(prev => [announcement, ...prev]);
  });

  return {
    announcements,
    standingsUpdate,
    scheduleUpdate,
  };
}