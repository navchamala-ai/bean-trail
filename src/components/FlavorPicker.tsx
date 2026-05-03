import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { FLAVOR_CATEGORIES, flavorKey } from '@/constants/flavors';

interface FlavorPickerProps {
  selected: string[];
  onChange: (keys: string[]) => void;
  maxSelections?: number;
}

export default function FlavorPicker({ selected, onChange, maxSelections = 5 }: FlavorPickerProps) {
  function toggle(key: string) {
    if (selected.includes(key)) {
      onChange(selected.filter(k => k !== key));
    } else if (selected.length < maxSelections) {
      onChange([...selected, key]);
    }
  }

  return (
    <View className="gap-3">
      {FLAVOR_CATEGORIES.map(category => (
        <View key={category.id}>
          <Text className="text-xs font-semibold text-gray-400 mb-1.5 tracking-wide">
            {category.emoji} {category.label.toUpperCase()}
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {category.flavors.map(flavor => {
              const key = flavorKey(category.id, flavor);
              const active = selected.includes(key);
              const disabled = !active && selected.length >= maxSelections;
              return (
                <TouchableOpacity
                  key={key}
                  onPress={() => toggle(key)}
                  disabled={disabled}
                  className={`px-3 py-1.5 rounded-full border ${
                    active
                      ? 'bg-amber-700 border-amber-700'
                      : disabled
                      ? 'bg-gray-50 border-gray-100'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <Text
                    className={`text-xs font-medium ${
                      active ? 'text-white' : disabled ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    {flavor}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      ))}
      {maxSelections > 0 && (
        <Text className="text-xs text-gray-400 text-right">
          {selected.length}/{maxSelections} selected
        </Text>
      )}
    </View>
  );
}
