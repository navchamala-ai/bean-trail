export interface CheckIn {
  id: number;
  coffeeName: string;
  beanType: string;
  roaster: string;
  brewMethod: string;
  rating: number;
  tastingNotes: string;
  venueName: string;
  latitude: number | null;
  longitude: number | null;
  createdAt: string;
}

export type NewCheckIn = Omit<CheckIn, 'id' | 'createdAt'>;

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
