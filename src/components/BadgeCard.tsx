import { View, Text } from 'react-native';
import type { Badge } from '@/types';

interface BadgeCardProps {
  badge: Badge;
  earned: boolean;
  earnedAt?: string;
}

export default function BadgeCard({ badge, earned, earnedAt }: BadgeCardProps) {
  return (
    <View
      className={`items-center p-3 rounded-2xl border ${
        earned ? 'bg-white border-amber-100' : 'bg-gray-50 border-gray-100'
      }`}
      style={{ width: '30%', minWidth: 90 }}
    >
      <Text style={{ fontSize: 28, opacity: earned ? 1 : 0.25 }}>{badge.emoji}</Text>
      <Text
        className={`text-xs font-semibold text-center mt-1 ${
          earned ? 'text-gray-800' : 'text-gray-400'
        }`}
        numberOfLines={2}
      >
        {badge.name}
      </Text>
      {earned && earnedAt ? (
        <Text className="text-xs text-amber-600 mt-0.5">
          {new Date(earnedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </Text>
      ) : !earned ? (
        <Text className="text-xs text-gray-300 mt-0.5" numberOfLines={2}>
          {badge.description}
        </Text>
      ) : null}
    </View>
  );
}
