import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { insertCheckIn } from '@/data/checkInRepo';
import { evaluateAndPersist } from '@/data/badgeRepo';
import { getAllCheckIns } from '@/data/checkInRepo';
import StarRating from '@/components/StarRating';
import PhotoPicker from '@/components/PhotoPicker';
import FlavorPicker from '@/components/FlavorPicker';
import { BEAN_TYPES, BREW_METHODS } from '@/types';

export default function NewCheckInScreen() {
  const router = useRouter();

  const [coffeeName, setCoffeeName] = useState('');
  const [beanType, setBeanType] = useState('Arabica');
  const [roaster, setRoaster] = useState('');
  const [brewMethod, setBrewMethod] = useState('Espresso');
  const [rating, setRating] = useState(3);
  const [tastingNotes, setTastingNotes] = useState('');
  const [flavorNotes, setFlavorNotes] = useState<string[]>([]);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [venueName, setVenueName] = useState('');
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState('');

  useEffect(() => { fetchLocation(); }, []);

  async function fetchLocation() {
    setLocationLoading(true);
    setLocationError('');
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') { setLocationError('Location permission denied'); return; }
      const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      setLatitude(loc.coords.latitude);
      setLongitude(loc.coords.longitude);
    } catch {
      setLocationError('Could not get location');
    } finally {
      setLocationLoading(false);
    }
  }

  function handleSave() {
    if (!coffeeName.trim()) { Alert.alert('Missing field', 'Please enter a coffee name.'); return; }
    if (!roaster.trim()) { Alert.alert('Missing field', 'Please enter a roaster.'); return; }

    insertCheckIn({
      coffeeName: coffeeName.trim(),
      beanType,
      roaster: roaster.trim(),
      brewMethod,
      rating,
      tastingNotes: tastingNotes.trim(),
      flavorNotes,
      photoUri,
      venueName: venueName.trim(),
      latitude,
      longitude,
    });

    evaluateAndPersist(getAllCheckIns());
    router.back();
  }

  return (
    <ScrollView className="flex-1 bg-amber-50" keyboardShouldPersistTaps="handled">
      <View className="p-4 gap-5">

        {/* Photo */}
        <View>
          <Text className="text-sm font-semibold text-gray-700 mb-2">Photo</Text>
          <PhotoPicker uri={photoUri} onChange={setPhotoUri} />
        </View>

        {/* Coffee Name */}
        <View>
          <Text className="text-sm font-semibold text-gray-700 mb-1">Coffee Name *</Text>
          <TextInput
            className="bg-white rounded-xl px-4 py-3 text-gray-900 border border-gray-100"
            placeholder="e.g. Ethiopian Yirgacheffe"
            placeholderTextColor="#9ca3af"
            value={coffeeName}
            onChangeText={setCoffeeName}
          />
        </View>

        {/* Roaster */}
        <View>
          <Text className="text-sm font-semibold text-gray-700 mb-1">Roaster *</Text>
          <TextInput
            className="bg-white rounded-xl px-4 py-3 text-gray-900 border border-gray-100"
            placeholder="e.g. Blue Bottle Coffee"
            placeholderTextColor="#9ca3af"
            value={roaster}
            onChangeText={setRoaster}
          />
        </View>

        {/* Bean Type */}
        <View>
          <Text className="text-sm font-semibold text-gray-700 mb-2">Bean Type</Text>
          <View className="flex-row flex-wrap gap-2">
            {BEAN_TYPES.map(type => (
              <TouchableOpacity
                key={type}
                onPress={() => setBeanType(type)}
                className={`px-4 py-2 rounded-full border ${beanType === type ? 'bg-amber-800 border-amber-800' : 'bg-white border-gray-200'}`}
              >
                <Text className={`text-sm font-medium ${beanType === type ? 'text-white' : 'text-gray-600'}`}>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Brew Method */}
        <View>
          <Text className="text-sm font-semibold text-gray-700 mb-2">Brew Method</Text>
          <View className="flex-row flex-wrap gap-2">
            {BREW_METHODS.map(method => (
              <TouchableOpacity
                key={method}
                onPress={() => setBrewMethod(method)}
                className={`px-4 py-2 rounded-full border ${brewMethod === method ? 'bg-amber-800 border-amber-800' : 'bg-white border-gray-200'}`}
              >
                <Text className={`text-sm font-medium ${brewMethod === method ? 'text-white' : 'text-gray-600'}`}>{method}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Rating */}
        <View>
          <Text className="text-sm font-semibold text-gray-700 mb-2">Rating</Text>
          <StarRating rating={rating} onRate={setRating} size="lg" />
        </View>

        {/* Flavor Notes */}
        <View>
          <Text className="text-sm font-semibold text-gray-700 mb-2">Flavor Notes</Text>
          <View className="bg-white rounded-xl p-3 border border-gray-100">
            <FlavorPicker selected={flavorNotes} onChange={setFlavorNotes} />
          </View>
        </View>

        {/* Tasting Notes */}
        <View>
          <Text className="text-sm font-semibold text-gray-700 mb-1">Tasting Notes</Text>
          <TextInput
            className="bg-white rounded-xl px-4 py-3 text-gray-900 border border-gray-100"
            placeholder="Describe your experience in your own words..."
            placeholderTextColor="#9ca3af"
            value={tastingNotes}
            onChangeText={setTastingNotes}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>

        {/* Venue */}
        <View>
          <Text className="text-sm font-semibold text-gray-700 mb-1">Venue</Text>
          <TextInput
            className="bg-white rounded-xl px-4 py-3 text-gray-900 border border-gray-100"
            placeholder="Cafe name or place"
            placeholderTextColor="#9ca3af"
            value={venueName}
            onChangeText={setVenueName}
          />
          <View className="flex-row items-center mt-2">
            {locationLoading ? (
              <>
                <ActivityIndicator size="small" color="#92400e" />
                <Text className="text-xs text-gray-400 ml-2">Getting GPS location...</Text>
              </>
            ) : latitude ? (
              <Text className="text-xs text-green-600">📍 GPS location captured</Text>
            ) : (
              <TouchableOpacity onPress={fetchLocation}>
                <Text className="text-xs text-amber-700">
                  {locationError ? `⚠ ${locationError} — tap to retry` : '📍 Tap to get GPS location'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Save */}
        <TouchableOpacity
          className="bg-amber-800 rounded-2xl py-4 items-center mt-2 mb-8"
          onPress={handleSave}
          activeOpacity={0.85}
        >
          <Text className="text-white font-bold text-base">Log Coffee</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
