import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RecipeImage({ image }: { image: string | null }) {
  const screenWidth = Dimensions.get('window').width;
  const isTablet = screenWidth >= 768;

  return image ? (
    <Image
      source={{ uri: image }}
      resizeMode="cover"
      style={isTablet ? styles.imageTablet : styles.imagePhone}
    />
  ) : (
    <View style={styles.imagePlaceholder}>
      <Ionicons name="image" size={150} color="#ccc" />
    </View>
  );
}

const styles = StyleSheet.create({
  imageTablet: {
    width: '100%',
    height: 300,
    borderRadius: 16,
  },
  imagePhone: {
    width: '100%',
    height: 200,
    borderRadius: 16,
  },
  imagePlaceholder: {
    width: '100%',
    height: 192,
    borderRadius: 16,
    backgroundColor: '#e5e5e5',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
