import React, { createContext, useContext, useState } from 'react';
import { Fan, FavoriteTeam } from '../types/fan';

const mockFan: Fan = {
  id: '1',
  name: 'John Smith',
  email: 'john.smith@example.com',
  favoriteTeams: [
    {
      teamId: '1',
      name: 'Ulinzi Warriors',
      logo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=100&h=100&fit=crop',
      division: 'Premier League',
      followedSince: '2023-01-01',
    },
    {
      teamId: '2',
      name: 'KPA',
      logo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=100&h=100&fit=crop',
      division: 'Premier League',
      followedSince: '2023-06-15',
    },
  ],
  preferences: {
    notifications: {
      matchAlerts: true,
      teamNews: true,
      leagueUpdates: true,
    },
    theme: 'light',
  },
};

interface FanContextType {
  currentFan: Fan;
  setCurrentFan: (fan: Fan) => void;
  followTeam: (team: FavoriteTeam) => void;
  unfollowTeam: (teamId: string) => void;
}

const FanContext = createContext<FanContextType | undefined>(undefined);

export const FanProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentFan, setCurrentFan] = useState<Fan>(mockFan);

  const followTeam = (team: FavoriteTeam) => {
    setCurrentFan({
      ...currentFan,
      favoriteTeams: [...currentFan.favoriteTeams, team],
    });
  };

  const unfollowTeam = (teamId: string) => {
    setCurrentFan({
      ...currentFan,
      favoriteTeams: currentFan.favoriteTeams.filter((team) => team.teamId !== teamId),
    });
  };

  return (
    <FanContext.Provider value={{ currentFan, setCurrentFan, followTeam, unfollowTeam }}>
      {children}
    </FanContext.Provider>
  );
};

export const useFan = () => {
  const context = useContext(FanContext);
  if (context === undefined) {
    throw new Error('useFan must be used within a FanProvider');
  }
  return context;
};