import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

interface PhotoPickerProps {
  uri: string | null;
  onChange: (uri: string | null) => void;
}

export default function PhotoPicker({ uri, onChange }: PhotoPickerProps) {
  async function pickImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') return;
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });
    if (!result.canceled && result.assets[0]) {
      onChange(result.assets[0].uri);
    }
  }

  async function takePhoto() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') return;
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });
    if (!result.canceled && result.assets[0]) {
      onChange(result.assets[0].uri);
    }
  }

  if (uri) {
    return (
      <View style={styles.container}>
        <Image source={{ uri }} style={styles.image} resizeMode="cover" />
        <TouchableOpacity style={styles.removeBtn} onPress={() => onChange(null)}>
          <Text style={styles.removeBtnText}>✕ Remove</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.row}>
      <TouchableOpacity style={styles.tile} onPress={pickImage} activeOpacity={0.8}>
        <Text style={styles.tileIcon}>🖼️</Text>
        <Text style={styles.tileLabel}>Library</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tile} onPress={takePhoto} activeOpacity={0.8}>
        <Text style={styles.tileIcon}>📷</Text>
        <Text style={styles.tileLabel}>Camera</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { borderRadius: 12, overflow: 'hidden' },
  image: { width: '100%', height: 180 },
  removeBtn: {
    position: 'absolute', top: 8, right: 8,
    backgroundColor: 'rgba(0,0,0,0.55)', borderRadius: 20,
    paddingHorizontal: 10, paddingVertical: 4,
  },
  removeBtnText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  row: { flexDirection: 'row', gap: 10 },
  tile: {
    flex: 1, backgroundColor: '#fff', borderRadius: 12, borderWidth: 1,
    borderColor: '#e5e7eb', borderStyle: 'dashed', height: 80,
    alignItems: 'center', justifyContent: 'center',
  },
  tileIcon: { fontSize: 22 },
  tileLabel: { fontSize: 12, color: '#6b7280', marginTop: 4, fontWeight: '500' },
});
