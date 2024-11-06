import { EventEmitter } from 'events';

interface WebSocketMessage {
  type: string;
  topic: string;
  payload: any;
}

class WebSocketClient extends EventEmitter {
  private static instance: WebSocketClient;
  private socket: WebSocket | null = null;
  private reconnectAttempts = 0;
  private readonly MAX_RECONNECT_ATTEMPTS = 5;
  private readonly RECONNECT_INTERVAL = 1000;
  private subscriptions = new Map<string, Set<(data: any) => void>>();

  private constructor() {
    super();
  }

  static getInstance(): WebSocketClient {
    if (!WebSocketClient.instance) {
      WebSocketClient.instance = new WebSocketClient();
    }
    return WebSocketClient.instance;
  }

  connect(url: string = import.meta.env.VITE_WS_URL): void {
    if (this.socket?.readyState === WebSocket.OPEN) return;

    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
      this.resubscribeAll();
    };

    this.socket.onmessage = (event: MessageEvent) => {
      try {
        const message: WebSocketMessage = JSON.parse(event.data);
        this.handleMessage(message);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    this.socket.onclose = () => {
      console.log('WebSocket disconnected');
      this.attemptReconnect();
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  private handleMessage(message: WebSocketMessage): void {
    const subscribers = this.subscriptions.get(message.topic);
    if (subscribers) {
      subscribers.forEach(callback => {
        try {
          callback(message.payload);
        } catch (error) {
          console.error('Error in subscriber callback:', error);
        }
      });
    }
  }

  private attemptReconnect(): void {
    if (this.reconnectAttempts >= this.MAX_RECONNECT_ATTEMPTS) {
      console.error('Max reconnection attempts reached');
      return;
    }

    setTimeout(() => {
      this.reconnectAttempts++;
      this.connect();
    }, this.RECONNECT_INTERVAL * Math.pow(2, this.reconnectAttempts));
  }

  private resubscribeAll(): void {
    this.subscriptions.forEach((_, topic) => {
      this.sendSubscription(topic);
    });
  }

  private sendSubscription(topic: string): void {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({
        type: 'subscribe',
        topic,
      }));
    }
  }

  subscribe(topic: string, callback: (data: any) => void): () => void {
    if (!this.subscriptions.has(topic)) {
      this.subscriptions.set(topic, new Set());
      this.sendSubscription(topic);
    }

    this.subscriptions.get(topic)?.add(callback);

    return () => {
      const subscribers = this.subscriptions.get(topic);
      if (subscribers) {
        subscribers.delete(callback);
        if (subscribers.size === 0) {
          this.subscriptions.delete(topic);
          this.sendUnsubscription(topic);
        }
      }
    };
  }

  private sendUnsubscription(topic: string): void {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({
        type: 'unsubscribe',
        topic,
      }));
    }
  }

  send(topic: string, payload: any): void {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({
        type: 'message',
        topic,
        payload,
      }));
    } else {
      console.error('WebSocket is not connected');
    }
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
      this.subscriptions.clear();
    }
  }
}

export const wsClient = WebSocketClient.getInstance();