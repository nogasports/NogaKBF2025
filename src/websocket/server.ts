import { Server, Socket } from 'socket.io';
import { Server as HTTPServer } from 'http';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';
import { verifyToken } from '../services/token.service';
import { logger } from '../utils/logger';

export class WebSocketServer {
  private io: Server;
  private connectedUsers: Map<string, Set<string>> = new Map();

  constructor(httpServer: HTTPServer) {
    this.io = new Server(httpServer, {
      cors: {
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST"],
        credentials: true
      },
      pingTimeout: 60000,
      pingInterval: 25000
    });

    this.setupRedis();
    this.setupMiddleware();
    this.setupEventHandlers();
  }

  private async setupRedis() {
    if (process.env.REDIS_URL) {
      const pubClient = createClient({ url: process.env.REDIS_URL });
      const subClient = pubClient.duplicate();

      await Promise.all([pubClient.connect(), subClient.connect()]);
      this.io.adapter(createAdapter(pubClient, subClient));
    }
  }

  private setupMiddleware() {
    this.io.use(async (socket, next) => {
      try {
        const token = socket.handshake.auth.token;
        if (!token) {
          throw new Error('No token provided');
        }

        const user = await verifyToken(token);
        socket.data.user = user;
        
        if (!this.connectedUsers.has(user.id)) {
          this.connectedUsers.set(user.id, new Set());
        }
        this.connectedUsers.get(user.id)?.add(socket.id);

        next();
      } catch (err) {
        next(new Error('Authentication failed'));
      }
    });
  }

  private setupEventHandlers() {
    this.io.on('connection', (socket: Socket) => {
      logger.info(`User connected: ${socket.data.user.id}`);

      socket.join(`user:${socket.data.user.id}`);

      socket.on('match:join', (matchId: string) => {
        socket.join(`match:${matchId}`);
        logger.info(`User ${socket.data.user.id} joined match ${matchId}`);
      });

      socket.on('match:leave', (matchId: string) => {
        socket.leave(`match:${matchId}`);
        logger.info(`User ${socket.data.user.id} left match ${matchId}`);
      });

      socket.on('team:join', (teamId: string) => {
        socket.join(`team:${teamId}`);
        logger.info(`User ${socket.data.user.id} joined team ${teamId}`);
      });

      socket.on('team:leave', (teamId: string) => {
        socket.leave(`team:${teamId}`);
        logger.info(`User ${socket.data.user.id} left team ${teamId}`);
      });

      socket.on('disconnect', () => {
        const userId = socket.data.user.id;
        this.connectedUsers.get(userId)?.delete(socket.id);
        if (this.connectedUsers.get(userId)?.size === 0) {
          this.connectedUsers.delete(userId);
        }
        logger.info(`User disconnected: ${userId}`);
      });
    });
  }

  public emitMatchUpdate(matchId: string, update: any) {
    this.io.to(`match:${matchId}`).emit('match:update', update);
    logger.info(`Match update emitted for match ${matchId}`, { update });
  }

  public emitTeamUpdate(teamId: string, update: any) {
    this.io.to(`team:${teamId}`).emit('team:update', update);
    logger.info(`Team update emitted for team ${teamId}`, { update });
  }

  public emitUserNotification(userId: string, notification: any) {
    this.io.to(`user:${userId}`).emit('notification', notification);
    logger.info(`Notification sent to user ${userId}`, { notification });
  }

  public broadcastAnnouncement(announcement: any) {
    this.io.emit('announcement', announcement);
    logger.info('Broadcast announcement sent', { announcement });
  }

  public getConnectedUsers(): string[] {
    return Array.from(this.connectedUsers.keys());
  }

  public isUserConnected(userId: string): boolean {
    return this.connectedUsers.has(userId);
  }
}