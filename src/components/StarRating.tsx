import { View, TouchableOpacity, Text } from 'react-native';

interface StarRatingProps {
  rating: number;
  onRate?: (rating: number) => void;
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = { sm: 16, md: 22, lg: 30 };

export default function StarRating({ rating, onRate, size = 'md' }: StarRatingProps) {
  const fontSize = sizeMap[size];

  return (
    <View className="flex-row">
      {[1, 2, 3, 4, 5].map(star => (
        <TouchableOpacity
          key={star}
          onPress={() => onRate?.(star)}
          disabled={!onRate}
          hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}
        >
          <Text style={{ fontSize, color: star <= rating ? '#d97706' : '#d1d5db' }}>★</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
