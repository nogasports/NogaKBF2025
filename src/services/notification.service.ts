import { WebSocketService } from './websocket.service';
import { AppDataSource } from '../config/database';
import { logger } from '../utils/logger';

interface Notification {
  id: string;
  userId: string;
  type: 'match' | 'team' | 'system' | 'payment';
  title: string;
  message: string;
  data?: any;
  read: boolean;
  createdAt: Date;
}

interface NotificationPreferences {
  matchAlerts: boolean;
  teamUpdates: boolean;
  systemAnnouncements: boolean;
  paymentNotifications: boolean;
  email: boolean;
  push: boolean;
}

export class NotificationService {
  private wsService = WebSocketService.getInstance();
  private notificationRepository = AppDataSource.getRepository('notifications');
  private preferencesRepository = AppDataSource.getRepository('notification_preferences');

  public async sendNotification(notification: Omit<Notification, 'id' | 'read' | 'createdAt'>): Promise<void> {
    try {
      const preferences = await this.getPreferences(notification.userId);
      
      // Check if user wants this type of notification
      if (!this.shouldSendNotification(notification.type, preferences)) {
        return;
      }

      const newNotification = await this.notificationRepository.save({
        ...notification,
        read: false,
        createdAt: new Date()
      });

      // Send real-time notification if user is connected
      if (this.wsService.isUserConnected(notification.userId)) {
        this.wsService.sendNotification(notification.userId, newNotification);
      }

      // Send email if enabled
      if (preferences.email) {
        await this.sendEmailNotification(notification);
      }

      // Send push notification if enabled
      if (preferences.push) {
        await this.sendPushNotification(notification);
      }

      logger.info(`Notification sent to user ${notification.userId}`, { notification });
    } catch (error) {
      logger.error('Error sending notification:', error);
      throw error;
    }
  }

  public async getNotifications(userId: string, page: number = 1, limit: number = 20): Promise<Notification[]> {
    try {
      return await this.notificationRepository.find({
        where: { userId },
        order: { createdAt: 'DESC' },
        skip: (page - 1) * limit,
        take: limit
      });
    } catch (error) {
      logger.error('Error getting notifications:', error);
      throw error;
    }
  }

  public async markAsRead(userId: string, notificationId: string): Promise<void> {
    try {
      await this.notificationRepository.update(
        { id: notificationId, userId },
        { read: true }
      );
    } catch (error) {
      logger.error('Error marking notification as read:', error);
      throw error;
    }
  }

  public async markAllAsRead(userId: string): Promise<void> {
    try {
      await this.notificationRepository.update(
        { userId, read: false },
        { read: true }
      );
    } catch (error) {
      logger.error('Error marking all notifications as read:', error);
      throw error;
    }
  }

  public async getPreferences(userId: string): Promise<NotificationPreferences> {
    try {
      const preferences = await this.preferencesRepository.findOne({
        where: { userId }
      });

      return preferences || this.getDefaultPreferences();
    } catch (error) {
      logger.error('Error getting notification preferences:', error);
      throw error;
    }
  }

  public async updatePreferences(userId: string, preferences: Partial<NotificationPreferences>): Promise<void> {
    try {
      await this.preferencesRepository.upsert(
        { userId, ...preferences },
        ['userId']
      );
    } catch (error) {
      logger.error('Error updating notification preferences:', error);
      throw error;
    }
  }

  private getDefaultPreferences(): NotificationPreferences {
    return {
      matchAlerts: true,
      teamUpdates: true,
      systemAnnouncements: true,
      paymentNotifications: true,
      email: true,
      push: false
    };
  }

  private shouldSendNotification(type: Notification['type'], preferences: NotificationPreferences): boolean {
    switch (type) {
      case 'match':
        return preferences.matchAlerts;
      case 'team':
        return preferences.teamUpdates;
      case 'system':
        return preferences.systemAnnouncements;
      case 'payment':
        return preferences.paymentNotifications;
      default:
        return true;
    }
  }

  private async sendEmailNotification(notification: Notification): Promise<void> {
    // Implement email sending logic here
    logger.info(`Email notification would be sent to user ${notification.userId}`);
  }

  private async sendPushNotification(notification: Notification): Promise<void> {
    // Implement push notification logic here
    logger.info(`Push notification would be sent to user ${notification.userId}`);
  }
}