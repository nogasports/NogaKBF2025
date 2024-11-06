export type FixtureStatus = 'scheduled' | 'live' | 'completed' | 'postponed' | 'cancelled';

export interface Fixture {
  id: string;
  homeTeam: {
    id: string;
    name: string;
    logo: string;
    score?: number;
  };
  awayTeam: {
    id: string;
    name: string;
    logo: string;
    score?: number;
  };
  date: string;
  time: string;
  venue: string;
  status: FixtureStatus;
  division: string;
  officials?: {
    referee: string;
    umpire1: string;
    umpire2: string;
    scorer: string;
  };
  attendance?: number;
}