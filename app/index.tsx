import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function Index() {
  return (
    <View className="flex-1 bg-white items-center justify-center">
      <Text className="text-2xl font-bold">Welcome to Bean Trail</Text>
      <StatusBar style="auto" />
    </View>
  );
}
