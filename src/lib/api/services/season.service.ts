import { apiClient } from '../client';
import { ENDPOINTS } from '../endpoints';

export interface Season {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'active' | 'completed';
  registrationDeadline: string;
  registrationFee: number;
}

export interface CreateSeasonRequest {
  name: string;
  startDate: string;
  endDate: string;
  registrationDeadline: string;
  registrationFee: number;
}

export const seasonService = {
  async createSeason(data: CreateSeasonRequest): Promise<Season> {
    const response = await apiClient.post('/seasons', data);
    return response.data;
  },

  async getSeason(id: string): Promise<Season> {
    const response = await apiClient.get(`/seasons/${id}`);
    return response.data;
  },

  async updateSeason(id: string, data: Partial<CreateSeasonRequest>): Promise<Season> {
    const response = await apiClient.patch(`/seasons/${id}`, data);
    return response.data;
  },

  async listSeasons(filters?: {
    status?: string;
    year?: number;
  }): Promise<Season[]> {
    const response = await apiClient.get('/seasons', { params: filters });
    return response.data;
  },

  async deleteSeason(id: string): Promise<void> {
    await apiClient.delete(`/seasons/${id}`);
  },
};