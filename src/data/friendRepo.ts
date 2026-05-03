import type { CheckIn } from '@/types';

// Mock check-ins for friends — negative IDs to distinguish from SQLite records
export const FRIEND_CHECK_INS: CheckIn[] = [
  {
    id: -1, userId: 'alice', coffeeName: 'Gesha Village', beanType: 'Arabica',
    roaster: 'Blue Bottle Coffee', brewMethod: 'Pour Over', rating: 5,
    tastingNotes: 'Absolutely stunning — floral and tea-like.',
    flavorNotes: ['floral.jasmine', 'fruity.stone_fruit', 'sweet.honey'],
    photoUri: null, venueName: 'Blue Bottle SF', latitude: 37.7749, longitude: -122.4194,
    createdAt: '2026-04-19T08:12:00.000Z',
  },
  {
    id: -2, userId: 'james', coffeeName: 'Yirgacheffe Natural', beanType: 'Arabica',
    roaster: 'Counter Culture', brewMethod: 'Pour Over', rating: 4,
    tastingNotes: 'Bright and fruity with a smooth finish.',
    flavorNotes: ['fruity.berry', 'fruity.citrus', 'sweet.chocolate'],
    photoUri: null, venueName: 'Stumptown Coffee', latitude: 45.5231, longitude: -122.6765,
    createdAt: '2026-04-18T14:30:00.000Z',
  },
  {
    id: -3, userId: 'mia', coffeeName: 'Colombian Huila', beanType: 'Arabica',
    roaster: 'Intelligentsia', brewMethod: 'AeroPress', rating: 5,
    tastingNotes: 'Red apple, caramel, and a lingering sweetness.',
    flavorNotes: ['fruity.stone_fruit', 'sweet.caramel', 'nutty.almond'],
    photoUri: null, venueName: 'Intelligentsia Chicago', latitude: 41.8781, longitude: -87.6298,
    createdAt: '2026-04-18T09:45:00.000Z',
  },
  {
    id: -4, userId: 'alice', coffeeName: 'Guatemala Antigua', beanType: 'Arabica',
    roaster: 'Stumptown', brewMethod: 'Espresso', rating: 4,
    tastingNotes: 'Rich chocolate and subtle smokiness.',
    flavorNotes: ['sweet.chocolate', 'roasted.smoky', 'nutty.hazelnut'],
    photoUri: null, venueName: 'Stumptown NYC', latitude: 40.7128, longitude: -74.0060,
    createdAt: '2026-04-17T11:00:00.000Z',
  },
  {
    id: -5, userId: 'james', coffeeName: 'Sumatra Mandheling', beanType: 'Robusta',
    roaster: 'Peet\'s Coffee', brewMethod: 'French Press', rating: 3,
    tastingNotes: 'Full-bodied and earthy — classic Sumatra character.',
    flavorNotes: ['other.earthy', 'other.herbal', 'roasted.tobacco'],
    photoUri: null, venueName: '', latitude: null, longitude: null,
    createdAt: '2026-04-16T07:20:00.000Z',
  },
  {
    id: -6, userId: 'mia', coffeeName: 'Kenya AA', beanType: 'Arabica',
    roaster: 'Heart Coffee', brewMethod: 'Cold Brew', rating: 5,
    tastingNotes: 'Blackcurrant and tomato — wild and complex.',
    flavorNotes: ['fruity.berry', 'fruity.citrus', 'sweet.honey'],
    photoUri: null, venueName: 'Heart Coffee Portland', latitude: 45.5231, longitude: -122.6765,
    createdAt: '2026-04-15T16:00:00.000Z',
  },
  {
    id: -7, userId: 'alice', coffeeName: 'Panama Boquete', beanType: 'Arabica',
    roaster: 'Onyx Coffee Lab', brewMethod: 'Pour Over', rating: 5,
    tastingNotes: 'Like drinking a rose garden.',
    flavorNotes: ['floral.rose', 'fruity.tropical', 'sweet.vanilla'],
    photoUri: null, venueName: 'Onyx Lab Bentonville', latitude: 36.3729, longitude: -94.2088,
    createdAt: '2026-04-14T10:30:00.000Z',
  },
  {
    id: -8, userId: 'james', coffeeName: 'Brazil Santos', beanType: 'Arabica',
    roaster: 'La Colombe', brewMethod: 'Drip', rating: 3,
    tastingNotes: 'Mild and nutty, good for a weekday morning.',
    flavorNotes: ['nutty.almond', 'sweet.chocolate', 'other.earthy'],
    photoUri: null, venueName: 'La Colombe Philadelphia', latitude: 39.9526, longitude: -75.1652,
    createdAt: '2026-04-13T08:00:00.000Z',
  },
];

// Mock friend badge events visible in feed
export const FRIEND_BADGE_EVENTS: { userId: string; badgeId: string; earnedAt: string }[] = [
  { userId: 'alice', badgeId: 'brew_master', earnedAt: '2026-04-18T09:00:00.000Z' },
  { userId: 'mia', badgeId: 'roaster_tour', earnedAt: '2026-04-16T14:00:00.000Z' },
  { userId: 'james', badgeId: 'double_digits', earnedAt: '2026-04-13T07:00:00.000Z' },
];

export function getFriendCheckIns(): CheckIn[] {
  return FRIEND_CHECK_INS;
}

export function getFriendBadgeEvents(): { userId: string; badgeId: string; earnedAt: string }[] {
  return FRIEND_BADGE_EVENTS;
}
