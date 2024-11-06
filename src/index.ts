import { createServer } from 'http';
import { app } from './app';
import { AppDataSource } from './config/database';
import { WebSocketServer } from './websocket/server';
import { WebSocketService } from './services/websocket.service';
import { logger } from './utils/logger';

const httpServer = createServer(app);
const wsServer = new WebSocketServer(httpServer);
WebSocketService.initialize(wsServer);

const port = process.env.PORT || 3000;

async function startServer() {
  try {
    await AppDataSource.initialize();
    logger.info('Database connection established');

    httpServer.listen(port, () => {
      logger.info(`Server running on port ${port}`);
    });
  } catch (error) {
    logger.error('Error starting server:', error);
    process.exit(1);
  }
}

startServer();