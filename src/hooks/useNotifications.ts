import { useState, useEffect, useCallback } from 'react';
import { notificationService, Notification, NotificationPreferences } from '../lib/api/services/notification.service';

export function useNotifications(userId: string) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [preferences, setPreferences] = useState<NotificationPreferences | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        setIsLoading(true);
        const [notifs, prefs] = await Promise.all([
          notificationService.getNotifications(userId),
          notificationService.getPreferences(userId),
        ]);
        setNotifications(notifs);
        setPreferences(prefs);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load notifications'));
      } finally {
        setIsLoading(false);
      }
    };

    loadNotifications();

    // Subscribe to real-time notifications
    notificationService.subscribeToNotifications(userId, (notification) => {
      setNotifications(prev => [notification, ...prev]);
    });

    return () => {
      notificationService.unsubscribeFromNotifications(userId);
    };
  }, [userId]);

  const markAsRead = useCallback(async (notificationId: string) => {
    try {
      await notificationService.markAsRead(notificationId);
      setNotifications(prev =>
        prev.map(n =>
          n.id === notificationId ? { ...n, read: true } : n
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to mark notification as read'));
      throw err;
    }
  }, []);

  const updatePreferences = useCallback(async (newPreferences: NotificationPreferences) => {
    try {
      await notificationService.updatePreferences(userId, newPreferences);
      setPreferences(newPreferences);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update preferences'));
      throw err;
    }
  }, [userId]);

  return {
    notifications,
    preferences,
    isLoading,
    error,
    markAsRead,
    updatePreferences,
  };
}