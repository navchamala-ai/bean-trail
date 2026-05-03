import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { toggleLike } from '@/data/likeRepo';

interface LikeButtonProps {
  userId: string;
  checkInId: number;
  count: number;
  likedByMe: boolean;
  onToggle: (count: number, likedByMe: boolean) => void;
}

export default function LikeButton({ userId, checkInId, count, likedByMe, onToggle }: LikeButtonProps) {
  function handlePress() {
    const next = toggleLike(userId, checkInId);
    onToggle(next.count, next.likedByMe);
  }

  return (
    <TouchableOpacity style={styles.btn} onPress={handlePress} activeOpacity={0.7}>
      <Text style={[styles.heart, likedByMe && styles.heartActive]}>
        {likedByMe ? '♥' : '♡'}
      </Text>
      {count > 0 && (
        <Text style={[styles.count, likedByMe && styles.countActive]}>{count}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingVertical: 4, paddingHorizontal: 2 },
  heart: { fontSize: 18, color: '#d1d5db' },
  heartActive: { color: '#ef4444' },
  count: { fontSize: 13, color: '#9ca3af', fontWeight: '500' },
  countActive: { color: '#ef4444' },
});
