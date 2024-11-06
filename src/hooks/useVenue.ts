import { useState, useEffect } from 'react';
import { venueService, Venue } from '../lib/api/services/venue.service';

export function useVenue(venueId?: string) {
  const [venue, setVenue] = useState<Venue | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!venueId) {
      setIsLoading(false);
      return;
    }

    const loadVenue = async () => {
      try {
        setIsLoading(true);
        const data = await venueService.getVenue(venueId);
        setVenue(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load venue'));
      } finally {
        setIsLoading(false);
      }
    };

    loadVenue();
  }, [venueId]);

  const checkAvailability = async (date: string) => {
    if (!venueId) return null;
    
    try {
      return await venueService.checkAvailability(venueId, date);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to check venue availability'));
      throw err;
    }
  };

  return {
    venue,
    isLoading,
    error,
    checkAvailability,
  };
}