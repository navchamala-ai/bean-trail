import type { User } from '@/types';

export const ME: User = {
  id: 'me',
  username: 'you',
  displayName: 'You',
  avatarUri: null,
  bio: 'Coffee lover on a bean trail ☕',
};

export const MOCK_FRIENDS: User[] = [
  {
    id: 'alice',
    username: 'alice_brews',
    displayName: 'Alice',
    avatarUri: null,
    bio: 'Espresso enthusiast & latte artist',
  },
  {
    id: 'james',
    username: 'james_pours',
    displayName: 'James',
    avatarUri: null,
    bio: 'Pour over devotee. Light roasts only.',
  },
  {
    id: 'mia',
    username: 'mia_roasts',
    displayName: 'Mia',
    avatarUri: null,
    bio: 'Single origin hunter 🌍',
  },
];

const ALL_USERS: Record<string, User> = Object.fromEntries(
  [ME, ...MOCK_FRIENDS].map(u => [u.id, u])
);

export function getUserById(id: string): User {
  return ALL_USERS[id] ?? ME;
}

export function getFriends(): User[] {
  return MOCK_FRIENDS;
}
