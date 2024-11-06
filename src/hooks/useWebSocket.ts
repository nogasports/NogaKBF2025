import { useEffect, useCallback } from 'react';
import { wsClient } from '../lib/websocket/client';

export function useWebSocket<T = any>(topic: string, callback: (data: T) => void) {
  useEffect(() => {
    const unsubscribe = wsClient.subscribe(topic, callback);
    return () => unsubscribe();
  }, [topic, callback]);

  const send = useCallback((payload: any) => {
    wsClient.send(topic, payload);
  }, [topic]);

  return { send };
}