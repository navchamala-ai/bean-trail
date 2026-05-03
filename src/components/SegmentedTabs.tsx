import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface SegmentedTabsProps {
  tabs: string[];
  activeIndex: number;
  onChange: (index: number) => void;
}

export default function SegmentedTabs({ tabs, activeIndex, onChange }: SegmentedTabsProps) {
  return (
    <View style={styles.container}>
      {tabs.map((tab, i) => (
        <TouchableOpacity
          key={tab}
          style={[styles.tab, i === activeIndex && styles.activeTab]}
          onPress={() => onChange(i)}
          activeOpacity={0.8}
        >
          <Text style={[styles.label, i === activeIndex && styles.activeLabel]}>{tab}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', backgroundColor: '#f3f4f6',
    borderRadius: 10, padding: 3, marginHorizontal: 16, marginBottom: 12,
  },
  tab: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 8 },
  activeTab: { backgroundColor: '#fff', shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 4, elevation: 2 },
  label: { fontSize: 14, fontWeight: '500', color: '#9ca3af' },
  activeLabel: { color: '#92400e', fontWeight: '700' },
});
