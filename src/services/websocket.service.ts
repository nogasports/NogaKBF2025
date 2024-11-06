import { WebSocketServer } from '../websocket/server';
import { logger } from '../utils/logger';

export class WebSocketService {
  private static instance: WebSocketService;
  private wsServer: WebSocketServer;

  private constructor(wsServer: WebSocketServer) {
    this.wsServer = wsServer;
  }

  public static initialize(wsServer: WebSocketServer): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService(wsServer);
    }
    return WebSocketService.instance;
  }

  public static getInstance(): WebSocketService {
    if (!WebSocketService.instance) {
      throw new Error('WebSocketService not initialized');
    }
    return WebSocketService.instance;
  }

  public sendMatchUpdate(matchId: string, update: any) {
    try {
      this.wsServer.emitMatchUpdate(matchId, {
        ...update,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      logger.error('Error sending match update', { error, matchId, update });
    }
  }

  public sendTeamUpdate(teamId: string, update: any) {
    try {
      this.wsServer.emitTeamUpdate(teamId, {
        ...update,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      logger.error('Error sending team update', { error, teamId, update });
    }
  }

  public sendNotification(userId: string, notification: any) {
    try {
      this.wsServer.emitUserNotification(userId, {
        ...notification,
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      logger.error('Error sending notification', { error, userId, notification });
    }
  }

  public broadcastAnnouncement(message: string, data?: any) {
    try {
      this.wsServer.broadcastAnnouncement({
        message,
        data,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      logger.error('Error broadcasting announcement', { error, message, data });
    }
  }

  public getConnectedUsers(): string[] {
    return this.wsServer.getConnectedUsers();
  }

  public isUserConnected(userId: string): boolean {
    return this.wsServer.isUserConnected(userId);
  }
}