import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import UserAvatar from './UserAvatar';
import StarRating from './StarRating';
import LikeButton from './LikeButton';
import { flavorLabel } from '@/constants/flavors';
import type { CheckIn, User } from '@/types';

interface FeedCheckInItemProps {
  checkIn: CheckIn;
  user: User;
  likeCount: number;
  likedByMe: boolean;
}

function formatRelative(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function FeedCheckInItem({ checkIn, user, likeCount: initialCount, likedByMe: initialLiked }: FeedCheckInItemProps) {
  const router = useRouter();
  const [likeCount, setLikeCount] = useState(initialCount);
  const [likedByMe, setLikedByMe] = useState(initialLiked);
  const isOwn = checkIn.userId === 'me';

  function handlePress() {
    if (isOwn) router.push(`/checkin/${checkIn.id}`);
  }

  return (
    <View style={styles.card}>
      {/* User header */}
      <View style={styles.header}>
        <UserAvatar user={user} size={36} />
        <View style={styles.headerText}>
          <Text style={styles.displayName}>{user.displayName}</Text>
          <Text style={styles.time}>{formatRelative(checkIn.createdAt)}</Text>
        </View>
        <StarRating rating={checkIn.rating} size="sm" />
      </View>

      {/* Photo */}
      {checkIn.photoUri ? (
        <TouchableOpacity onPress={handlePress} activeOpacity={isOwn ? 0.85 : 1}>
          <Image source={{ uri: checkIn.photoUri }} style={styles.photo} resizeMode="cover" />
        </TouchableOpacity>
      ) : null}

      {/* Body */}
      <TouchableOpacity onPress={handlePress} activeOpacity={isOwn ? 0.85 : 1} style={styles.body}>
        <Text style={styles.coffeeName}>{checkIn.coffeeName}</Text>
        <Text style={styles.roaster}>{checkIn.roaster}</Text>

        <View style={styles.chips}>
          <View style={styles.chip}><Text style={styles.chipText}>{checkIn.beanType}</Text></View>
          <View style={[styles.chip, styles.chipStone]}><Text style={styles.chipTextStone}>{checkIn.brewMethod}</Text></View>
        </View>

        {checkIn.flavorNotes.length > 0 && (
          <View style={styles.chips}>
            {checkIn.flavorNotes.map(key => (
              <View key={key} style={styles.flavorChip}>
                <Text style={styles.flavorChipText}>{flavorLabel(key)}</Text>
              </View>
            ))}
          </View>
        )}

        {checkIn.tastingNotes ? (
          <Text style={styles.notes} numberOfLines={2}>"{checkIn.tastingNotes}"</Text>
        ) : null}

        {checkIn.venueName ? (
          <Text style={styles.venue}>📍 {checkIn.venueName}</Text>
        ) : null}
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.footer}>
        <LikeButton
          userId={checkIn.userId}
          checkInId={checkIn.id}
          count={likeCount}
          likedByMe={likedByMe}
          onToggle={(count, liked) => { setLikeCount(count); setLikedByMe(liked); }}
        />
        {isOwn && (
          <TouchableOpacity onPress={handlePress}>
            <Text style={styles.viewDetail}>View →</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 16, marginBottom: 12, overflow: 'hidden', borderWidth: 1, borderColor: '#fef3c7' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 12, gap: 10 },
  headerText: { flex: 1 },
  displayName: { fontSize: 14, fontWeight: '700', color: '#1f2937' },
  time: { fontSize: 11, color: '#9ca3af', marginTop: 1 },
  photo: { width: '100%', height: 180 },
  body: { padding: 12, paddingTop: 8, gap: 6 },
  coffeeName: { fontSize: 17, fontWeight: '700', color: '#111827' },
  roaster: { fontSize: 13, fontWeight: '600', color: '#b45309' },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 2 },
  chip: { backgroundColor: '#fef3c7', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3 },
  chipText: { fontSize: 11, color: '#92400e', fontWeight: '600' },
  chipStone: { backgroundColor: '#f3f4f6' },
  chipTextStone: { fontSize: 11, color: '#6b7280', fontWeight: '600' },
  flavorChip: { backgroundColor: '#f0fdf4', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3 },
  flavorChipText: { fontSize: 11, color: '#15803d', fontWeight: '600' },
  notes: { fontSize: 13, color: '#6b7280', fontStyle: 'italic', marginTop: 2 },
  venue: { fontSize: 12, color: '#9ca3af', marginTop: 2 },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12, paddingVertical: 8, borderTopWidth: 1, borderTopColor: '#f9fafb' },
  viewDetail: { fontSize: 12, color: '#b45309', fontWeight: '600' },
});
