// app/preview.tsx
import { useLocalSearchParams } from 'expo-router';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function PreviewScreen() {
  const params = useLocalSearchParams();
  const uri = typeof params.uri === 'string' ? params.uri : null;

  if (!uri) {
    return (
      <View style={styles.container}>
        <Text>No image selected</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Image Preview</Text>
      <Image source={{ uri }} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  image: {
    width: 300,
    height: 400,
    resizeMode: 'contain',
    borderRadius: 10,
    backgroundColor: '#ccc',
  },
});
