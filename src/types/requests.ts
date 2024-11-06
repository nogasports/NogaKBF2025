// API Request Types
export interface CreateLeagueRequest {
  name: string;
  fee: number;
  season: string;
  startDate: string;
  endDate: string;
  description: string;
  logo?: File;
}

export interface UpdateLeagueRequest extends Partial<CreateLeagueRequest> {
  id: string;
}

export interface CreateTeamRequest {
  leagueId: string;
  name: string;
  kbfId: string;
  location: string;
  establishedYear: number;
  homeVenue: string;
  homeKit: string;
  awayKit: string;
  mainContact: {
    firstName: string;
    surname: string;
    role: string;
    email: string;
    phone: string;
  };
  logo?: File;
}

export interface UpdateTeamRequest extends Partial<CreateTeamRequest> {
  id: string;
}

export interface CreatePlayerRequest {
  leagueId: string;
  teamId: string;
  kbfId: string;
  firstName: string;
  surname: string;
  dateOfBirth: string;
  heightFt: number;
  weightKg: number;
  position: PlayerPosition;
  nationality: string;
  passportId: string;
  previousTeam?: string;
  passportPhoto?: File;
  idCopy?: File;
  jerseyNumber: string;
  isCaptain: boolean;
  contractStart: string;
  contractEnd: string;
}

export interface UpdatePlayerRequest extends Partial<CreatePlayerRequest> {
  id: string;
}

export interface CreateMatchRequest {
  leagueId: string;
  homeTeamId: string;
  awayTeamId: string;
  matchDate: string;
  matchTime: string;
  venue: string;
  officiatingCrew: string[];
}

export interface UpdateMatchRequest extends Partial<CreateMatchRequest> {
  id: string;
  status?: MatchStatus;
  homeTeamScore?: number;
  awayTeamScore?: number;
  attendance?: number;
  matchSummary?: string;
  isRescheduled?: boolean;
}

export interface CreateMatchStatsRequest {
  matchId: string;
  playerId: string;
  minutesPlayed: number;
  points: number;
  rebounds: number;
  assists: number;
  blocks: number;
  steals: number;
  fouls: number;
  turnovers: number;
  fieldGoalsMade: number;
  fieldGoalsAttempted: number;
}

export interface UpdateMatchStatsRequest extends Partial<CreateMatchStatsRequest> {
  id: string;
}