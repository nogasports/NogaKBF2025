import { apiClient } from '../client';
import { ENDPOINTS } from '../endpoints';

export interface Venue {
  id: string;
  name: string;
  address: string;
  capacity: number;
  facilities: string[];
  contactInfo: {
    name: string;
    phone: string;
    email: string;
  };
}

export interface CreateVenueRequest {
  name: string;
  address: string;
  capacity: number;
  facilities: string[];
  contactInfo: {
    name: string;
    phone: string;
    email: string;
  };
}

export const venueService = {
  async createVenue(data: CreateVenueRequest): Promise<Venue> {
    const response = await apiClient.post('/venues', data);
    return response.data;
  },

  async getVenue(id: string): Promise<Venue> {
    const response = await apiClient.get(`/venues/${id}`);
    return response.data;
  },

  async updateVenue(id: string, data: Partial<CreateVenueRequest>): Promise<Venue> {
    const response = await apiClient.patch(`/venues/${id}`, data);
    return response.data;
  },

  async listVenues(filters?: {
    capacity?: number;
    facilities?: string[];
  }): Promise<Venue[]> {
    const response = await apiClient.get('/venues', { params: filters });
    return response.data;
  },

  async deleteVenue(id: string): Promise<void> {
    await apiClient.delete(`/venues/${id}`);
  },

  async checkAvailability(id: string, date: string): Promise<{
    available: boolean;
    existingBookings?: Array<{
      startTime: string;
      endTime: string;
      eventType: string;
    }>;
  }> {
    const response = await apiClient.get(`/venues/${id}/availability`, {
      params: { date },
    });
    return response.data;
  },
};