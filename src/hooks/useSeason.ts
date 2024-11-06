import { useState, useEffect } from 'react';
import { seasonService, Season } from '../lib/api/services/season.service';

export function useSeason(seasonId?: string) {
  const [season, setSeason] = useState<Season | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!seasonId) {
      setIsLoading(false);
      return;
    }

    const loadSeason = async () => {
      try {
        setIsLoading(true);
        const data = await seasonService.getSeason(seasonId);
        setSeason(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load season'));
      } finally {
        setIsLoading(false);
      }
    };

    loadSeason();
  }, [seasonId]);

  return {
    season,
    isLoading,
    error,
  };
}