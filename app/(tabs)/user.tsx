import { View, Text, ScrollView, FlatList } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { getProfileStats, getAllCheckIns, type ProfileStats } from '@/data/checkInRepo';
import { getEarnedBadges } from '@/data/badgeRepo';
import { ME } from '@/data/userRepo';
import CheckInCard from '@/components/CheckInCard';
import BadgeGrid from '@/components/BadgeGrid';
import SegmentedTabs from '@/components/SegmentedTabs';
import UserAvatar from '@/components/UserAvatar';
import type { CheckIn, EarnedBadge } from '@/types';

export default function UserScreen() {
  const [tab, setTab] = useState(0);
  const [stats, setStats] = useState<ProfileStats>({ totalCheckIns: 0, avgRating: 0, topRoasters: [], topBrewMethods: [] });
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const [earnedBadges, setEarnedBadges] = useState<EarnedBadge[]>([]);

  useFocusEffect(
    useCallback(() => {
      setStats(getProfileStats());
      setCheckIns(getAllCheckIns());
      setEarnedBadges(getEarnedBadges());
    }, [])
  );

  return (
    <View className="flex-1 bg-amber-50">
      {/* Profile header */}
      <View className="bg-amber-800 pt-4 pb-6 px-4 items-center gap-2">
        <UserAvatar user={ME} size={64} />
        <Text className="text-white text-lg font-bold mt-1">{ME.displayName}</Text>
        <Text className="text-amber-200 text-sm">@{ME.username}</Text>
        <View className="flex-row gap-6 mt-3">
          <View className="items-center">
            <Text className="text-white text-xl font-bold">{stats.totalCheckIns}</Text>
            <Text className="text-amber-300 text-xs">Check-ins</Text>
          </View>
          <View className="items-center">
            <Text className="text-white text-xl font-bold">
              {stats.avgRating > 0 ? stats.avgRating.toFixed(1) : '—'}
            </Text>
            <Text className="text-amber-300 text-xs">Avg Rating</Text>
          </View>
          <View className="items-center">
            <Text className="text-white text-xl font-bold">{earnedBadges.length}</Text>
            <Text className="text-amber-300 text-xs">Badges</Text>
          </View>
        </View>
      </View>

      <SegmentedTabs
        tabs={['Check-ins', 'Profile']}
        activeIndex={tab}
        onChange={setTab}
      />

      {tab === 0 ? (
        <FlatList
          data={checkIns}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <View className="px-3">
              <CheckInCard checkIn={item} />
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 32, paddingTop: 4 }}
          ListEmptyComponent={
            <View className="items-center mt-16">
              <Text className="text-4xl mb-3">☕</Text>
              <Text className="text-gray-500 font-medium">No check-ins yet</Text>
            </View>
          }
        />
      ) : (
        <ScrollView contentContainerStyle={{ padding: 16, gap: 16, paddingBottom: 32 }}>
          {/* Stats */}
          <View className="flex-row gap-3">
            <View className="flex-1 bg-white rounded-2xl p-4 shadow-sm">
              <Text className="text-xs text-gray-400 font-medium mb-1">TOP ROASTERS</Text>
              {stats.topRoasters.length === 0 ? (
                <Text className="text-sm text-gray-300">No data yet</Text>
              ) : (
                stats.topRoasters.map((r, i) => (
                  <View key={r.roaster} className="flex-row justify-between py-1">
                    <Text className="text-sm text-gray-700">
                      <Text className="text-amber-700 font-bold">{i + 1}. </Text>{r.roaster}
                    </Text>
                    <Text className="text-sm text-gray-400">{r.count}×</Text>
                  </View>
                ))
              )}
            </View>
          </View>

          <View className="bg-white rounded-2xl p-4 shadow-sm">
            <Text className="text-xs text-gray-400 font-medium mb-2">BREW METHODS</Text>
            {stats.topBrewMethods.length === 0 ? (
              <Text className="text-sm text-gray-300">No data yet</Text>
            ) : (
              stats.topBrewMethods.map((b, i) => (
                <View key={b.brewMethod} className="flex-row justify-between py-1">
                  <Text className="text-sm text-gray-700">
                    <Text className="text-amber-700 font-bold">{i + 1}. </Text>{b.brewMethod}
                  </Text>
                  <Text className="text-sm text-gray-400">{b.count}×</Text>
                </View>
              ))
            )}
          </View>

          {/* Badges */}
          <View className="bg-white rounded-2xl p-4 shadow-sm">
            <Text className="text-xs text-gray-400 font-medium mb-3">BADGES</Text>
            <BadgeGrid earnedBadges={earnedBadges} />
          </View>
        </ScrollView>
      )}
    </View>
  );
}
