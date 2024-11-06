export interface FavoriteTeam {
  teamId: string;
  name: string;
  logo: string;
  division: string;
  followedSince: string;
}

export interface Fan {
  id: string;
  name: string;
  email: string;
  favoriteTeams: FavoriteTeam[];
  preferences: {
    notifications: {
      matchAlerts: boolean;
      teamNews: boolean;
      leagueUpdates: boolean;
    };
    theme: 'light' | 'dark' | 'system';
  };
}

export interface MatchVote {
  matchId: string;
  playerId: string;
  playerName: string;
  team: string;
  votedAt: string;
}