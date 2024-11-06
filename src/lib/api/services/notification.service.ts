import { apiClient } from '../client';
import { ENDPOINTS } from '../endpoints';

export interface Notification {
  id: string;
  type: 'match' | 'schedule' | 'payment' | 'announcement' | 'document';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  recipients: string[];
  metadata?: Record<string, any>;
}

export interface NotificationPreferences {
  matchReminders: boolean;
  scheduleChanges: boolean;
  paymentReminders: boolean;
  announcements: boolean;
  email: boolean;
  push: boolean;
  sms: boolean;
}

export const notificationService = {
  async sendNotification(notification: Omit<Notification, 'id'>): Promise<Notification> {
    const response = await apiClient.post('/notifications/send', notification);
    return response.data;
  },

  async getNotifications(userId: string): Promise<Notification[]> {
    const response = await apiClient.get(`/notifications/user/${userId}`);
    return response.data;
  },

  async markAsRead(notificationId: string): Promise<void> {
    await apiClient.post(`/notifications/${notificationId}/read`);
  },

  async updatePreferences(userId: string, preferences: NotificationPreferences): Promise<void> {
    await apiClient.put(`/notifications/preferences/${userId}`, preferences);
  },

  async getPreferences(userId: string): Promise<NotificationPreferences> {
    const response = await apiClient.get(`/notifications/preferences/${userId}`);
    return response.data;
  },

  async scheduleNotification(notification: Omit<Notification, 'id'> & { scheduledFor: string }): Promise<void> {
    await apiClient.post('/notifications/schedule', notification);
  },

  async cancelScheduledNotification(notificationId: string): Promise<void> {
    await apiClient.delete(`/notifications/scheduled/${notificationId}`);
  },

  // WebSocket subscription for real-time notifications
  subscribeToNotifications(userId: string, callback: (notification: Notification) => void): void {
    // WebSocket subscription logic will be implemented here
  },

  unsubscribeFromNotifications(userId: string): void {
    // WebSocket unsubscription logic will be implemented here
  },
};