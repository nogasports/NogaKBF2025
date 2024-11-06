export interface Player {
  id: string;
  name: string;
  jerseyNumber: string;
  position: string;
  dateOfBirth: string;
  nationality: string;
  height: string;
  weight: string;
  status: 'active' | 'injured' | 'suspended';
  team: {
    id: string;
    name: string;
    logo: string;
    division: string;
  };
  stats: {
    gamesPlayed: number;
    pointsPerGame: number;
    reboundsPerGame: number;
    assistsPerGame: number;
    efficiency: number;
  };
  license: {
    number: string;
    validUntil: string;
    status: 'active' | 'expired' | 'suspended';
  };
}

export interface PlayerNotificationSettings {
  matchUpdates: boolean;
  trainingReminders: boolean;
  teamAnnouncements: boolean;
  performanceReviews: boolean;
}

export interface PlayerPreferences {
  language: string;
  timezone: string;
  theme: 'light' | 'dark' | 'system';
}