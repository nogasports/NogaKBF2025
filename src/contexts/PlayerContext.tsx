import React, { createContext, useContext, useState } from 'react';
import { Player } from '../types/player';

// Mock data for demonstration
const mockPlayer: Player = {
  id: '1',
  name: 'John Doe',
  jerseyNumber: '23',
  position: 'Guard',
  dateOfBirth: '1995-05-15',
  nationality: 'Kenyan',
  height: '6\'2"',
  weight: '185',
  status: 'active',
  team: {
    id: '1',
    name: 'Ulinzi Warriors',
    logo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=100&h=100&fit=crop',
    division: 'Premier League',
  },
  stats: {
    gamesPlayed: 15,
    pointsPerGame: 18.5,
    reboundsPerGame: 7.2,
    assistsPerGame: 4.5,
    efficiency: 22.3,
  },
  license: {
    number: 'KBF-PL-001',
    validUntil: '2024-12-31',
    status: 'active',
  },
};

interface PlayerContextType {
  currentPlayer: Player;
  setCurrentPlayer: (player: Player) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPlayer, setCurrentPlayer] = useState<Player>(mockPlayer);

  return (
    <PlayerContext.Provider value={{ currentPlayer, setCurrentPlayer }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};