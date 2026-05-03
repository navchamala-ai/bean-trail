import { Tabs } from 'expo-router';
import { Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import { getUnreadCount } from '@/data/notificationRepo';

function NotifIcon({ color }: { color: string }) {
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    setUnread(getUnreadCount());
  }, []);

  return (
    <View>
      <Text style={{ color, fontSize: 20 }}>🔔</Text>
      {unread > 0 && (
        <View style={{
          position: 'absolute', top: -2, right: -4,
          backgroundColor: '#ef4444', borderRadius: 8,
          minWidth: 16, height: 16, alignItems: 'center', justifyContent: 'center',
        }}>
          <Text style={{ color: '#fff', fontSize: 10, fontWeight: '700' }}>{unread}</Text>
        </View>
      )}
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#92400e',
        tabBarInactiveTintColor: '#9ca3af',
        tabBarStyle: { borderTopColor: '#e5e7eb' },
        headerStyle: { backgroundColor: '#92400e' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: '600' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Bean Trail',
          tabBarLabel: 'Feed',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>☕</Text>,
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Notifications',
          tabBarLabel: 'Activity',
          tabBarIcon: ({ color }) => <NotifIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: 'My Profile',
          tabBarLabel: 'You',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>👤</Text>,
        }}
      />
    </Tabs>
  );
}
