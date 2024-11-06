import { apiClient } from '../client';
import { ENDPOINTS } from '../endpoints';

export interface DashboardStats {
  totalTeams: number;
  upcomingMatches: number;
  activeOfficials: number;
  activePlayers: number;
  recentActivities: Array<{
    id: string;
    type: string;
    title: string;
    description: string;
    timestamp: string;
    status: string;
  }>;
  upcomingDeadlines: Array<{
    id: string;
    title: string;
    date: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
  }>;
}

export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    const response = await apiClient.get('/dashboard/stats');
    return response.data;
  },

  async getRecentActivities(): Promise<DashboardStats['recentActivities']> {
    const response = await apiClient.get('/dashboard/activities');
    return response.data;
  },

  async getUpcomingDeadlines(): Promise<DashboardStats['upcomingDeadlines']> {
    const response = await apiClient.get('/dashboard/deadlines');
    return response.data;
  },
};