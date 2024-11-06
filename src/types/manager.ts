export interface TeamManager {
  id: string;
  name: string;
  email: string;
  phone: string;
  photo?: string;
  teams: {
    id: string;
    name: string;
    role: 'head_manager' | 'assistant_manager';
    logo: string;
    division: string;
  }[];
  status: 'active' | 'inactive';
  licenseNumber?: string;
  licenseExpiry?: string;
}

export interface ManagerNotificationSettings {
  matchUpdates: boolean;
  trainingReminders: boolean;
  playerUpdates: boolean;
  leagueAnnouncements: boolean;
  teamPerformance: boolean;
}

export interface ManagerPreferences {
  defaultTeam?: string;
  language: string;
  timezone: string;
  theme: 'light' | 'dark' | 'system';
}