// Filter and Search Types
export interface LeagueFilters {
  season?: string;
  status?: 'active' | 'upcoming' | 'completed';
  search?: string;
}

export interface TeamFilters {
  leagueId?: string;
  location?: string;
  registered?: boolean;
  leagueFeePaid?: boolean;
  search?: string;
}

export interface PlayerFilters {
  leagueId?: string;
  teamId?: string;
  position?: PlayerPosition;
  nationality?: string;
  search?: string;
}

export interface MatchFilters {
  leagueId?: string;
  teamId?: string;
  status?: MatchStatus;
  startDate?: string;
  endDate?: string;
  venue?: string;
}

export interface StandingsFilters {
  leagueId: string;
  round?: number;
}

export interface ScheduleFilters {
  leagueId: string;
  teamId?: string;
  startDate?: string;
  endDate?: string;
  round?: number;
}