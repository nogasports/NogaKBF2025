export interface MatchUpdate {
  type: 'score' | 'status' | 'stats';
  matchId: string;
  data: any;
  timestamp: string;
}

export interface TeamUpdate {
  type: 'roster' | 'schedule' | 'stats';
  teamId: string;
  data: any;
  timestamp: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'match' | 'team' | 'system';
  title: string;
  message: string;
  data?: any;
  timestamp: string;
}