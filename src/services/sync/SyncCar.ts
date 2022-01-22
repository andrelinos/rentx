import { useEffect, useRef } from 'react';
import { synchronize } from '@nozbe/watermelondb/sync';
import { useNetInfo } from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { database } from '../../database';
import { useAuth } from '../../hooks/auth';
import api from '../api';

export function Sync() {
  const { user, signOut } = useAuth();
  const theme = useTheme();
  const navigation = useNavigation();
  const netInfo = useNetInfo();
  const synchronizing = useRef(false);

  useEffect(() => {
    const syncChanges = async () => {
      if (netInfo.isConnected && !synchronizing.current) {
        synchronizing.current = true;
        try {
          await synchronize({
            database,
            pullChanges: async ({ lastPulledAt }) => {
              const response = await api.get(
                `cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`
              );

              const { changes, latestVersion } = response.data;

              return { changes, timestamp: latestVersion };
            },
            pushChanges: async ({ changes }) => {
              const user = changes.users;

              await api.post('/users/sync', user);
            },
          });
        } catch (error) {
          console.log((error as Error).message);
        } finally {
          synchronizing.current = false;
        }
      }
    };
    syncChanges();
  }, [netInfo.isConnected]);
}
