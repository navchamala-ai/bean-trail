import { View, Text, ScrollView } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { getProfileStats, type ProfileStats } from '@/utils/database';

export default function ProfileScreen() {
  const [stats, setStats] = useState<ProfileStats>({
    totalCheckIns: 0,
    avgRating: 0,
    topRoasters: [],
    topBrewMethods: [],
  });

  useFocusEffect(
    useCallback(() => {
      setStats(getProfileStats());
    }, [])
  );

  return (
    <ScrollView className="flex-1 bg-amber-50" contentContainerStyle={{ padding: 16 }}>
      <View className="flex-row gap-3 mb-6">
        <View className="flex-1 bg-white rounded-2xl p-4 items-center shadow-sm">
          <Text className="text-3xl font-bold text-amber-800">{stats.totalCheckIns}</Text>
          <Text className="text-xs text-gray-500 mt-1">Check-ins</Text>
        </View>
        <View className="flex-1 bg-white rounded-2xl p-4 items-center shadow-sm">
          <Text className="text-3xl font-bold text-amber-800">
            {stats.avgRating > 0 ? stats.avgRating.toFixed(1) : '—'}
          </Text>
          <Text className="text-xs text-gray-500 mt-1">Avg Rating</Text>
        </View>
      </View>

      <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
        <Text className="text-base font-bold text-gray-800 mb-3">Top Roasters</Text>
        {stats.topRoasters.length === 0 ? (
          <Text className="text-sm text-gray-400">No data yet</Text>
        ) : (
          stats.topRoasters.map((r, i) => (
            <View
              key={r.roaster}
              className="flex-row justify-between items-center py-2 border-b border-gray-50"
            >
              <Text className="text-sm text-gray-700">
                <Text className="text-amber-700 font-medium">{i + 1}. </Text>
                {r.roaster}
              </Text>
              <Text className="text-sm text-gray-400">{r.count}×</Text>
            </View>
          ))
        )}
      </View>

      <View className="bg-white rounded-2xl p-4 shadow-sm">
        <Text className="text-base font-bold text-gray-800 mb-3">Brew Methods</Text>
        {stats.topBrewMethods.length === 0 ? (
          <Text className="text-sm text-gray-400">No data yet</Text>
        ) : (
          stats.topBrewMethods.map((b, i) => (
            <View
              key={b.brewMethod}
              className="flex-row justify-between items-center py-2 border-b border-gray-50"
            >
              <Text className="text-sm text-gray-700">
                <Text className="text-amber-700 font-medium">{i + 1}. </Text>
                {b.brewMethod}
              </Text>
              <Text className="text-sm text-gray-400">{b.count}×</Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}
