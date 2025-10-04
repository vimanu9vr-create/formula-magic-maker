import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export const useUsageCount = () => {
  const [usageCount, setUsageCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchUsageCount = async () => {
    if (!user) {
      setUsageCount(0);
      setLoading(false);
      return;
    }

    try {
      // Calculate today's usage since 00:00 UTC from the requests table
      const now = new Date();
      const utcMidnight = new Date(Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        0, 0, 0, 0
      )).toISOString();
      
      const { count, error } = await supabase
        .from('requests')
        .select('*', { count: 'exact' })
        .eq('user_id', user.id)
        .gte('timestamp', utcMidnight);

      if (error) {
        console.error('Error fetching usage count:', error);
        setUsageCount(0);
      } else {
        setUsageCount(count || 0);
      }
    } catch (error) {
      console.error('Error fetching usage count:', error);
      setUsageCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsageCount();
  }, [user]);

  const refreshUsageCount = () => {
    if (user) {
      fetchUsageCount();
    }
  };

  return {
    usageCount,
    loading,
    refreshUsageCount
  };
};