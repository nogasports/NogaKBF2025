// API Endpoints
export const ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REFRESH_TOKEN: '/auth/refresh',
  LOGOUT: '/auth/logout',

  // Seasons
  SEASONS: '/seasons',
  SEASON_DETAIL: (id: string) => `/seasons/${id}`,
  SEASON_TEAMS: (id: string) => `/seasons/${id}/teams`,
  SEASON_STANDINGS: (id: string) => `/seasons/${id}/standings`,

  // Matches
  MATCHES: '/matches',
  MATCH_DETAIL: (id: string) => `/matches/${id}`,
  MATCH_STATISTICS: (id: string) => `/matches/${id}/statistics`,
  MATCH_REPORT: (id: string) => `/matches/${id}/report`,

  // Venues
  VENUES: '/venues',
  VENUE_DETAIL: (id: string) => `/venues/${id}`,
  VENUE_AVAILABILITY: (id: string) => `/venues/${id}/availability`,

  // Teams
  TEAMS: '/teams',
  TEAM_DETAIL: (id: string) => `/teams/${id}`,
  TEAM_PLAYERS: (id: string) => `/teams/${id}/players`,
  TEAM_STAFF: (id: string) => `/teams/${id}/staff`,

  // Players
  PLAYERS: '/players',
  PLAYER_DETAIL: (id: string) => `/players/${id}`,
  PLAYER_STATS: (id: string) => `/players/${id}/stats`,

  // Officials
  OFFICIALS: '/officials',
  OFFICIAL_DETAIL: (id: string) => `/officials/${id}`,
  OFFICIAL_ASSIGNMENTS: (id: string) => `/officials/${id}/assignments`,

  // Payments
  PAYMENTS: '/payments',
  PAYMENT_DETAIL: (id: string) => `/payments/${id}`,
  PAYMENT_VERIFY: (id: string) => `/payments/${id}/verify`,
  PAYMENT_RECEIPT: (id: string) => `/payments/${id}/receipt`,

  // Documents
  DOCUMENTS: '/documents',
  DOCUMENT_DETAIL: (id: string) => `/documents/${id}`,
  DOCUMENT_VERIFY: (id: string) => `/documents/${id}/verify`,

  // Notifications
  NOTIFICATIONS: '/notifications',
  NOTIFICATION_PREFERENCES: (userId: string) => `/notifications/preferences/${userId}`,
  NOTIFICATION_MARK_READ: (id: string) => `/notifications/${id}/read`,
};