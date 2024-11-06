// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface LeagueResponse {
  league: League;
  teams: Team[];
  standings: Standing[];
  schedule: Schedule[];
}

export interface TeamResponse {
  team: Team;
  players: Player[];
  staff: TeamStaff[];
  matches: Match[];
  stats: {
    wins: number;
    losses: number;
    pointsFor: number;
    pointsAgainst: number;
    position: number;
  };
}

export interface PlayerResponse {
  player: Player;
  team: Team;
  stats: {
    gamesPlayed: number;
    averagePoints: number;
    averageRebounds: number;
    averageAssists: number;
    averageMinutes: number;
  };
  matchStats: MatchStats[];
}

export interface OfficialResponse {
  official: Official;
  assignments: Match[];
  stats: {
    matchesOfficiated: number;
    upcomingAssignments: number;
  };
}