import { View, Text, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { getCheckInById, deleteCheckIn } from '@/data/checkInRepo';
import { getEarnedBadges } from '@/data/badgeRepo';
import StarRating from '@/components/StarRating';
import { flavorLabel } from '@/constants/flavors';
import type { CheckIn, EarnedBadge } from '@/types';

function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row justify-between items-start py-2 border-b border-gray-50">
      <Text className="text-sm text-gray-400 font-medium w-28">{label}</Text>
      <Text className="text-sm text-gray-700 flex-1 text-right">{value}</Text>
    </View>
  );
}

export default function CheckInDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [checkIn, setCheckIn] = useState<CheckIn | null>(null);
  const [earnedOnThis, setEarnedOnThis] = useState<EarnedBadge[]>([]);

  useEffect(() => {
    if (!id) return;
    const ci = getCheckInById(Number(id));
    setCheckIn(ci);
    if (ci) {
      const all = getEarnedBadges();
      const date = ci.createdAt.slice(0, 10);
      setEarnedOnThis(all.filter(eb => eb.earnedAt.slice(0, 10) === date));
    }
  }, [id]);

  function handleDelete() {
    Alert.alert('Delete Check-in', 'Are you sure you want to delete this check-in?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => { deleteCheckIn(Number(id)); router.back(); } },
    ]);
  }

  if (!checkIn) {
    return (
      <View className="flex-1 items-center justify-center bg-amber-50">
        <Text className="text-gray-400">Check-in not found</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-amber-50" contentContainerStyle={{ padding: 16 }}>
      {/* Photo */}
      {checkIn.photoUri ? (
        <Image
          source={{ uri: checkIn.photoUri }}
          style={{ width: '100%', height: 220, borderRadius: 16, marginBottom: 12 }}
          resizeMode="cover"
        />
      ) : null}

      {/* Header card */}
      <View className="bg-white rounded-2xl p-5 mb-4 shadow-sm">
        <Text className="text-2xl font-bold text-gray-900">{checkIn.coffeeName}</Text>
        <Text className="text-base text-amber-700 font-semibold mt-1">{checkIn.roaster}</Text>
        <View className="mt-3">
          <StarRating rating={checkIn.rating} size="lg" />
        </View>
      </View>

      {/* Flavor chips */}
      {checkIn.flavorNotes.length > 0 && (
        <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
          <Text className="text-xs font-semibold text-gray-400 mb-2 tracking-widest">FLAVOR NOTES</Text>
          <View className="flex-row flex-wrap gap-2">
            {checkIn.flavorNotes.map(key => (
              <View key={key} className="bg-green-50 rounded-full px-3 py-1">
                <Text className="text-xs text-green-700 font-medium">{flavorLabel(key)}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Details */}
      <View className="bg-white rounded-2xl p-5 mb-4 shadow-sm">
        <DetailRow label="Bean Type" value={checkIn.beanType} />
        <DetailRow label="Brew Method" value={checkIn.brewMethod} />
        {checkIn.venueName ? <DetailRow label="Venue" value={checkIn.venueName} /> : null}
        {checkIn.latitude !== null && checkIn.longitude !== null ? (
          <DetailRow label="Coordinates" value={`${checkIn.latitude.toFixed(4)}, ${checkIn.longitude.toFixed(4)}`} />
        ) : null}
        <DetailRow label="Date" value={formatDate(checkIn.createdAt)} />
      </View>

      {/* Tasting notes */}
      {checkIn.tastingNotes ? (
        <View className="bg-white rounded-2xl p-5 mb-4 shadow-sm">
          <Text className="text-xs font-semibold text-gray-400 mb-2 tracking-widest">TASTING NOTES</Text>
          <Text className="text-gray-700 leading-6 italic">"{checkIn.tastingNotes}"</Text>
        </View>
      ) : null}

      {/* Badges earned on this day */}
      {earnedOnThis.length > 0 && (
        <View className="bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-4">
          <Text className="text-xs font-semibold text-amber-700 mb-2 tracking-widest">🏅 BADGES EARNED</Text>
          <View className="flex-row flex-wrap gap-3">
            {earnedOnThis.map(eb => (
              <View key={eb.badge.id} className="items-center">
                <Text style={{ fontSize: 28 }}>{eb.badge.emoji}</Text>
                <Text className="text-xs text-amber-800 font-semibold mt-0.5">{eb.badge.name}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Delete */}
      <TouchableOpacity
        className="bg-red-50 border border-red-200 rounded-2xl py-3 items-center mt-2"
        onPress={handleDelete}
      >
        <Text className="text-red-500 font-medium">Delete Check-in</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
