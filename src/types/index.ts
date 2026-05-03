export interface CheckIn {
  id: number;
  userId: string;
  coffeeName: string;
  beanType: string;
  roaster: string;
  brewMethod: string;
  rating: number;
  tastingNotes: string;
  flavorNotes: string[];
  photoUri: string | null;
  venueName: string;
  latitude: number | null;
  longitude: number | null;
  createdAt: string;
}

export type NewCheckIn = Omit<CheckIn, 'id' | 'createdAt' | 'userId'>;

export interface User {
  id: string;
  username: string;
  displayName: string;
  avatarUri: string | null;
  bio: string;
}

export interface Badge {
  id: string;
  name: string;
  emoji: string;
  description: string;
  category: 'variety' | 'streak' | 'milestone' | 'location';
}

export interface EarnedBadge {
  badge: Badge;
  earnedAt: string;
}

export type NotificationType = 'follow_request' | 'like' | 'share';

export interface AppNotification {
  id: string;
  type: NotificationType;
  fromUser: User;
  checkInId?: number;
  checkInName?: string;
  createdAt: string;
  read: boolean;
}

export type FeedItem =
  | { kind: 'checkin'; checkIn: CheckIn; user: User; likeCount: number; likedByMe: boolean }
  | { kind: 'badge'; user: User; badge: Badge; earnedAt: string };

export const BEAN_TYPES = ['Arabica', 'Robusta', 'Liberica', 'Blend', 'Other'] as const;
export const BREW_METHODS = [
  'Espresso',
  'Pour Over',
  'French Press',
  'AeroPress',
  'Cold Brew',
  'Drip',
  'Moka Pot',
  'Other',
] as const;

export type BeanType = (typeof BEAN_TYPES)[number];
export type BrewMethod = (typeof BREW_METHODS)[number];
