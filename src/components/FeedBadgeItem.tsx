import { View, Text, StyleSheet } from 'react-native';
import UserAvatar from './UserAvatar';
import type { Badge, User } from '@/types';

interface FeedBadgeItemProps {
  user: User;
  badge: Badge;
  earnedAt: string;
}

function formatRelative(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function FeedBadgeItem({ user, badge, earnedAt }: FeedBadgeItemProps) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <UserAvatar user={user} size={36} />
        <View style={styles.text}>
          <Text style={styles.copy}>
            <Text style={styles.name}>{user.displayName}</Text>
            {' '}earned a new badge
          </Text>
          <Text style={styles.time}>{formatRelative(earnedAt)}</Text>
        </View>
      </View>
      <View style={styles.badge}>
        <Text style={styles.badgeEmoji}>{badge.emoji}</Text>
        <View>
          <Text style={styles.badgeName}>{badge.name}</Text>
          <Text style={styles.badgeDesc}>{badge.description}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fffbeb', borderRadius: 16, marginBottom: 12, padding: 14, borderWidth: 1, borderColor: '#fde68a' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  text: { flex: 1 },
  copy: { fontSize: 13, color: '#374151' },
  name: { fontWeight: '700' },
  time: { fontSize: 11, color: '#9ca3af', marginTop: 1 },
  badge: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 12, backgroundColor: '#fff', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: '#fde68a' },
  badgeEmoji: { fontSize: 32 },
  badgeName: { fontSize: 15, fontWeight: '700', color: '#92400e' },
  badgeDesc: { fontSize: 12, color: '#a16207', marginTop: 2 },
});
