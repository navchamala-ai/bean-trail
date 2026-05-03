import { View, Text, FlatList, RefreshControl } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { getNotifications, markAllRead } from '@/data/notificationRepo';
import NotificationRow from '@/components/NotificationRow';
import FloatingActionButton from '@/components/FloatingActionButton';
import type { AppNotification } from '@/types';

export default function NotificationsScreen() {
  const [items, setItems] = useState<AppNotification[]>([]);

  function load() {
    setItems(getNotifications());
    markAllRead();
  }

  useFocusEffect(useCallback(() => { load(); }, []));

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <NotificationRow notification={item} onUpdate={load} />
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
        ItemSeparatorComponent={() => <View className="h-px bg-gray-50 ml-16" />}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center mt-24">
            <Text className="text-4xl mb-3">🔔</Text>
            <Text className="text-lg font-bold text-gray-600">All caught up</Text>
            <Text className="text-sm text-gray-400 mt-1">No new notifications</Text>
          </View>
        }
      />
      <FloatingActionButton />
    </View>
  );
}
