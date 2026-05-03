import type { AppNotification } from '@/types';
import { MOCK_FRIENDS } from './userRepo';

let notifications: AppNotification[] = [
  {
    id: 'n1', type: 'follow_request', fromUser: MOCK_FRIENDS[0],
    createdAt: '2026-04-19T10:00:00.000Z', read: false,
  },
  {
    id: 'n2', type: 'like', fromUser: MOCK_FRIENDS[1],
    checkInId: -2, checkInName: 'Yirgacheffe Natural',
    createdAt: '2026-04-19T09:30:00.000Z', read: false,
  },
  {
    id: 'n3', type: 'share', fromUser: MOCK_FRIENDS[2],
    checkInId: -6, checkInName: 'Kenya AA',
    createdAt: '2026-04-18T16:45:00.000Z', read: false,
  },
  {
    id: 'n4', type: 'like', fromUser: MOCK_FRIENDS[0],
    checkInId: -1, checkInName: 'Gesha Village',
    createdAt: '2026-04-18T08:20:00.000Z', read: true,
  },
  {
    id: 'n5', type: 'follow_request', fromUser: MOCK_FRIENDS[2],
    createdAt: '2026-04-17T12:00:00.000Z', read: true,
  },
  {
    id: 'n6', type: 'like', fromUser: MOCK_FRIENDS[1],
    checkInId: -5, checkInName: 'Sumatra Mandheling',
    createdAt: '2026-04-16T18:00:00.000Z', read: true,
  },
];

export function getNotifications(): AppNotification[] {
  return notifications;
}

export function getUnreadCount(): number {
  return notifications.filter(n => !n.read).length;
}

export function markAllRead(): void {
  notifications = notifications.map(n => ({ ...n, read: true }));
}

export function acceptFollowRequest(id: string): void {
  notifications = notifications.filter(n => n.id !== id);
}

export function declineFollowRequest(id: string): void {
  notifications = notifications.filter(n => n.id !== id);
}
