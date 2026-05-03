import '../global.css';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { runMigrations } from '@/data/migrations';
import { ensureSeeded } from '@/data/seed';

export default function RootLayout() {
  useEffect(() => {
    runMigrations();
    ensureSeeded();
  }, []);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="checkin/new"
        options={{
          presentation: 'modal',
          title: 'Log Coffee',
          headerStyle: { backgroundColor: '#92400e' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: '600' },
        }}
      />
      <Stack.Screen
        name="checkin/[id]"
        options={{
          title: 'Check-in',
          headerStyle: { backgroundColor: '#92400e' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: '600' },
        }}
      />
    </Stack>
  );
}
