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
      // Calculate usage in the last 24 hours from the requests table
      const now = new Date();
      const cutoffISO = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
      
      const { count, error } = await supabase
        .from('requests')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .gte('timestamp', cutoffISO);

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