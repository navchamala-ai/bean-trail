import { View, Text, Image, StyleSheet } from 'react-native';
import type { User } from '@/types';

interface UserAvatarProps {
  user: User;
  size?: number;
}

const COLORS = ['#92400e', '#b45309', '#d97706', '#059669', '#0891b2', '#7c3aed'];

function colorForUser(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  return COLORS[Math.abs(hash) % COLORS.length];
}

export default function UserAvatar({ user, size = 36 }: UserAvatarProps) {
  const initials = user.displayName
    .split(' ')
    .map(w => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  if (user.avatarUri) {
    return (
      <Image
        source={{ uri: user.avatarUri }}
        style={{ width: size, height: size, borderRadius: size / 2 }}
      />
    );
  }

  return (
    <View
      style={[
        styles.circle,
        { width: size, height: size, borderRadius: size / 2, backgroundColor: colorForUser(user.id) },
      ]}
    >
      <Text style={[styles.initials, { fontSize: size * 0.38 }]}>{initials}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: { alignItems: 'center', justifyContent: 'center' },
  initials: { color: '#fff', fontWeight: '700' },
});
