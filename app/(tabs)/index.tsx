import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { getAllCheckIns } from '@/utils/database';
import CheckInCard from '@/components/CheckInCard';
import type { CheckIn } from '@/types';

export default function FeedScreen() {
  const router = useRouter();
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);

  useFocusEffect(
    useCallback(() => {
      setCheckIns(getAllCheckIns());
    }, [])
  );

  return (
    <View className="flex-1 bg-amber-50">
      <FlatList
        data={checkIns}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => <CheckInCard checkIn={item} />}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center mt-24">
            <Text className="text-5xl mb-4">☕</Text>
            <Text className="text-xl font-bold text-gray-700">No check-ins yet</Text>
            <Text className="text-sm text-gray-400 mt-1">Tap + to log your first coffee</Text>
          </View>
        }
      />

      <TouchableOpacity
        className="absolute bottom-8 right-6 w-14 h-14 rounded-full bg-amber-800 items-center justify-center shadow-lg"
        onPress={() => router.push('/checkin/new')}
        activeOpacity={0.85}
      >
        <Text className="text-white text-3xl leading-none">+</Text>
      </TouchableOpacity>
    </View>
  );
}
