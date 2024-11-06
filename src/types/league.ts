// League Types
export interface League {
  id: string;
  name: string;
  fee: number;
  season: string;
  startDate: string;
  endDate: string;
  description: string;
  logo: string;
}

export interface Team {
  id: string;
  leagueId: string;
  name: string;
  kbfId: string;
  registered: boolean;
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
  leagueFeePaid: boolean;
  logo: string;
}

export interface Player {
  id: string;
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
  passportPhoto: string;
  idCopy: string;
  jerseyNumber: string;
  isCaptain: boolean;
  contractStart: string;
  contractEnd: string;
}

export interface TeamStaff {
  id: string;
  leagueId: string;
  teamId: string;
  kbfId: string;
  firstName: string;
  surname: string;
  dateOfBirth: string;
  position: StaffPosition;
  nationality: string;
  passportId: string;
  previousTeam?: string;
  phone: string;
  email: string;
  coachLicense: string;
  contractStart: string;
  contractEnd: string;
  passportPhoto: string;
  idCopy: string;
}

export interface Official {
  id: string;
  kbfId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  role: OfficialRole;
  nationality: string;
  passportId: string;
  phone: string;
  email: string;
  officialLicense: string;
  contractStart: string;
  contractEnd: string;
  passportPhoto: string;
  idCopy: string;
}

export interface Match {
  id: string;
  leagueId: string;
  homeTeamId: string;
  awayTeamId: string;
  matchDate: string;
  matchTime: string;
  venue: string;
  status: MatchStatus;
  homeTeamScore?: number;
  awayTeamScore?: number;
  attendance?: number;
  officiatingCrew: string[];
  matchSummary?: string;
  isRescheduled: boolean;
}

export interface MatchStats {
  id: string;
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

export interface Standing {
  id: string;
  leagueId: string;
  teamId: string;
  wins: number;
  losses: number;
  pointsFor: number;
  pointsAgainst: number;
  pointsDifference: number;
  rank: number;
  tieBreakerCriteria?: string;
}

export interface Schedule {
  id: string;
  leagueId: string;
  round: number;
  homeTeamId: string;
  awayTeamId: string;
  matchDate: string;
  matchTime: string;
  venue: string;
}

// Enums
export enum PlayerPosition {
  POINT_GUARD = 'POINT_GUARD',
  SHOOTING_GUARD = 'SHOOTING_GUARD',
  SMALL_FORWARD = 'SMALL_FORWARD',
  POWER_FORWARD = 'POWER_FORWARD',
  CENTER = 'CENTER',
}

export enum StaffPosition {
  HEAD_COACH = 'HEAD_COACH',
  ASSISTANT_COACH = 'ASSISTANT_COACH',
  TEAM_MANAGER = 'TEAM_MANAGER',
  PHYSIOTHERAPIST = 'PHYSIOTHERAPIST',
  TEAM_DOCTOR = 'TEAM_DOCTOR',
}

export enum OfficialRole {
  REFEREE = 'REFEREE',
  UMPIRE = 'UMPIRE',
  TABLE_OFFICIAL = 'TABLE_OFFICIAL',
  COMMISSIONER = 'COMMISSIONER',
}

export enum MatchStatus {
  SCHEDULED = 'SCHEDULED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  POSTPONED = 'POSTPONED',
  CANCELLED = 'CANCELLED',
}