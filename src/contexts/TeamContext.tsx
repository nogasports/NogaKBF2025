import React, { createContext, useContext, useState } from 'react';
import { Team } from '../types/team';

interface TeamContextType {
  selectedTeam: Team | null;
  setSelectedTeam: (team: Team | null) => void;
  teams: Team[];
  setTeams: (teams: Team[]) => void;
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);

export const TeamProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);

  return (
    <TeamContext.Provider value={{ selectedTeam, setSelectedTeam, teams, setTeams }}>
      {children}
    </TeamContext.Provider>
  );
};

export const useTeam = () => {
  const context = useContext(TeamContext);
  if (context === undefined) {
    throw new Error('useTeam must be used within a TeamProvider');
  }
  return context;
};