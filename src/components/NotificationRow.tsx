import { View, Text, TouchableOpacity } from 'react-native';
import type { AppNotification } from '@/types';
import UserAvatar from './UserAvatar';
import { acceptFollowRequest, declineFollowRequest } from '@/data/notificationRepo';

interface NotificationRowProps {
  notification: AppNotification;
  onUpdate: () => void;
}

function formatRelative(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function NotificationRow({ notification: n, onUpdate }: NotificationRowProps) {
  const copy =
    n.type === 'follow_request'
      ? 'wants to follow you'
      : n.type === 'like'
      ? `liked your check-in${n.checkInName ? ` · ${n.checkInName}` : ''}`
      : `shared your check-in${n.checkInName ? ` · ${n.checkInName}` : ''}`;

  return (
    <View className={`flex-row items-start px-4 py-3 gap-3 ${n.read ? '' : 'bg-amber-50'}`}>
      {!n.read && (
        <View className="absolute left-2 top-5 w-1.5 h-1.5 rounded-full bg-amber-600" />
      )}
      <UserAvatar user={n.fromUser} size={40} />
      <View className="flex-1">
        <Text className="text-sm text-gray-800">
          <Text className="font-semibold">{n.fromUser.displayName}</Text>
          {' '}{copy}
        </Text>
        <Text className="text-xs text-gray-400 mt-0.5">{formatRelative(n.createdAt)}</Text>

        {n.type === 'follow_request' && (
          <View className="flex-row gap-2 mt-2">
            <TouchableOpacity
              className="bg-amber-800 rounded-lg px-4 py-1.5"
              onPress={() => { acceptFollowRequest(n.id); onUpdate(); }}
            >
              <Text className="text-white text-xs font-semibold">Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-gray-100 rounded-lg px-4 py-1.5"
              onPress={() => { declineFollowRequest(n.id); onUpdate(); }}
            >
              <Text className="text-gray-600 text-xs font-semibold">Decline</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <Text className="text-xs text-gray-300">{formatRelative(n.createdAt)}</Text>
    </View>
  );
}
