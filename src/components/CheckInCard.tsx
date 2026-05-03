import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import StarRating from './StarRating';
import { flavorLabel } from '@/constants/flavors';
import type { CheckIn } from '@/types';

interface CheckInCardProps {
  checkIn: CheckIn;
}

function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });
}

export default function CheckInCard({ checkIn }: CheckInCardProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      className="bg-white rounded-2xl mb-3 shadow-sm border border-amber-50 overflow-hidden"
      onPress={() => router.push(`/checkin/${checkIn.id}`)}
      activeOpacity={0.7}
    >
      {checkIn.photoUri ? (
        <Image
          source={{ uri: checkIn.photoUri }}
          style={{ width: '100%', height: 130 }}
          resizeMode="cover"
        />
      ) : null}

      <View className="p-4">
        <View className="flex-row justify-between items-start">
          <View className="flex-1 mr-2">
            <Text className="text-lg font-bold text-gray-900">{checkIn.coffeeName}</Text>
            <Text className="text-sm text-amber-700 font-medium">{checkIn.roaster}</Text>
          </View>
          <StarRating rating={checkIn.rating} size="sm" />
        </View>

        <View className="flex-row gap-2 mt-2 flex-wrap">
          <View className="bg-amber-100 rounded-full px-3 py-0.5">
            <Text className="text-xs text-amber-800 font-medium">{checkIn.beanType}</Text>
          </View>
          <View className="bg-stone-100 rounded-full px-3 py-0.5">
            <Text className="text-xs text-stone-600 font-medium">{checkIn.brewMethod}</Text>
          </View>
        </View>

        {checkIn.flavorNotes.length > 0 && (
          <View className="flex-row gap-2 mt-1.5 flex-wrap">
            {checkIn.flavorNotes.slice(0, 3).map(key => (
              <View key={key} className="bg-green-50 rounded-full px-3 py-0.5">
                <Text className="text-xs text-green-700 font-medium">{flavorLabel(key)}</Text>
              </View>
            ))}
          </View>
        )}

        {checkIn.tastingNotes ? (
          <Text className="text-sm text-gray-500 mt-2 italic" numberOfLines={2}>
            "{checkIn.tastingNotes}"
          </Text>
        ) : null}

        <View className="flex-row justify-between mt-3 pt-2 border-t border-gray-100">
          <Text className="text-xs text-gray-400">{checkIn.venueName || 'Unknown location'}</Text>
          <Text className="text-xs text-gray-400">{formatDate(checkIn.createdAt)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
