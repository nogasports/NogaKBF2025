import { useState, useCallback } from 'react';

interface UseApiOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

interface UseApiState<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
}

export function useApi<T>(
  apiFunction: (...args: any[]) => Promise<T>,
  options: UseApiOptions<T> = {}
) {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    error: null,
    isLoading: false,
  });

  const execute = useCallback(
    async (...args: any[]) => {
      try {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));
        const data = await apiFunction(...args);
        setState({ data, error: null, isLoading: false });
        options.onSuccess?.(data);
        return data;
      } catch (error) {
        const errorObj = error instanceof Error ? error : new Error('An error occurred');
        setState({ data: null, error: errorObj, isLoading: false });
        options.onError?.(errorObj);
        throw errorObj;
      }
    },
    [apiFunction, options]
  );

  return {
    ...state,
    execute,
  };
}