import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { useRouter } from 'expo-router';
import { Alert, Button, Image, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  const openCamera = async () => {
    // Ask for camera permission
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync();

    if (cameraStatus !== 'granted' || mediaStatus !== 'granted') {
      Alert.alert('Permission Required', 'Camera and media access are needed.');
      return;
    }

    // Launch camera
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // ✅ updated
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      const asset = result.assets[0];

      // ✅ Save the image to gallery to get content:// URI
      const savedAsset = await MediaLibrary.createAssetAsync(asset.uri);
      console.log('📸 Saved asset URI:', savedAsset.uri);

      // Pass the URI to the preview screen
      router.push({
        pathname: '/preview',
        params: { uri: savedAsset.uri },
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Home Screen!</Text>

      <Image
        source={require('@/assets/images/partial-react-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Button title="Go to Explore1" onPress={() => router.push('/explore')} />
      <Button title="Open Camera" onPress={openCamera} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    width: 200,
    height: 120,
  },
});
