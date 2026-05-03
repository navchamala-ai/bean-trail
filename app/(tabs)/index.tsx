import { View, Text, FlatList, RefreshControl } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { getFeed } from '@/data/feedRepo';
import FeedCheckInItem from '@/components/FeedCheckInItem';
import FeedBadgeItem from '@/components/FeedBadgeItem';
import FloatingActionButton from '@/components/FloatingActionButton';
import type { FeedItem } from '@/types';

function EmptyFeed() {
  return (
    <View className="flex-1 items-center justify-center mt-24">
      <Text className="text-5xl mb-4">☕</Text>
      <Text className="text-xl font-bold text-gray-700">No check-ins yet</Text>
      <Text className="text-sm text-gray-400 mt-1">Tap + to log your first coffee</Text>
    </View>
  );
}

export default function FeedScreen() {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  function load() {
    setItems(getFeed());
  }

  useFocusEffect(useCallback(() => { load(); }, []));

  function onRefresh() {
    setRefreshing(true);
    load();
    setRefreshing(false);
  }

  return (
    <View className="flex-1 bg-amber-50">
      <FlatList
        data={items}
        keyExtractor={item =>
          item.kind === 'checkin'
            ? `checkin-${item.checkIn.userId}-${item.checkIn.id}`
            : `badge-${item.user.id}-${item.badge.id}`
        }
        renderItem={({ item }) =>
          item.kind === 'checkin' ? (
            <FeedCheckInItem
              checkIn={item.checkIn}
              user={item.user}
              likeCount={item.likeCount}
              likedByMe={item.likedByMe}
            />
          ) : (
            <FeedBadgeItem user={item.user} badge={item.badge} earnedAt={item.earnedAt} />
          )
        }
        contentContainerStyle={{ padding: 12, paddingBottom: 100 }}
        ListEmptyComponent={<EmptyFeed />}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#92400e" />}
      />
      <FloatingActionButton />
    </View>
  );
}
