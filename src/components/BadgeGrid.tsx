import { View, Text } from 'react-native';
import { BADGE_CATALOG } from '@/constants/badges';
import BadgeCard from './BadgeCard';
import type { EarnedBadge } from '@/types';

interface BadgeGridProps {
  earnedBadges: EarnedBadge[];
}

const CATEGORIES = [
  { key: 'milestone', label: '🏅 Milestones' },
  { key: 'variety', label: '🌱 Variety' },
  { key: 'streak', label: '🔥 Streaks' },
  { key: 'location', label: '📍 Locations' },
] as const;

export default function BadgeGrid({ earnedBadges }: BadgeGridProps) {
  const earnedMap = new Map(earnedBadges.map(eb => [eb.badge.id, eb.earnedAt]));

  return (
    <View className="gap-5">
      {CATEGORIES.map(cat => {
        const badges = BADGE_CATALOG.filter(b => b.category === cat.key);
        return (
          <View key={cat.key}>
            <Text className="text-sm font-bold text-gray-700 mb-2">{cat.label}</Text>
            <View className="flex-row flex-wrap gap-2">
              {badges.map(badge => (
                <BadgeCard
                  key={badge.id}
                  badge={badge}
                  earned={earnedMap.has(badge.id)}
                  earnedAt={earnedMap.get(badge.id)}
                />
              ))}
            </View>
          </View>
        );
      })}
    </View>
  );
}
