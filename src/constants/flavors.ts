export interface FlavorCategory {
  id: string;
  label: string;
  emoji: string;
  flavors: string[];
}

export const FLAVOR_CATEGORIES: FlavorCategory[] = [
  { id: 'fruity', label: 'Fruity', emoji: '🍓', flavors: ['Berry', 'Citrus', 'Stone Fruit', 'Tropical'] },
  { id: 'sweet', label: 'Sweet', emoji: '🍫', flavors: ['Chocolate', 'Caramel', 'Vanilla', 'Honey'] },
  { id: 'nutty', label: 'Nutty', emoji: '🌰', flavors: ['Almond', 'Hazelnut', 'Walnut'] },
  { id: 'floral', label: 'Floral', emoji: '🌸', flavors: ['Jasmine', 'Rose', 'Lavender'] },
  { id: 'roasted', label: 'Roasted', emoji: '🔥', flavors: ['Smoky', 'Toasted', 'Tobacco'] },
  { id: 'other', label: 'Other', emoji: '🌿', flavors: ['Earthy', 'Herbal', 'Spicy', 'Woody'] },
];

export function flavorKey(categoryId: string, flavor: string): string {
  return `${categoryId}.${flavor.toLowerCase().replace(' ', '_')}`;
}

export function flavorLabel(key: string): string {
  const parts = key.split('.');
  const flavor = parts[1] ?? key;
  return flavor.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
