import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RecipeHeader({
  title,
  duration,
  isFavorite,
  onToggleFavorite,
}: {
  title: string;
  duration: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}) {
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={onToggleFavorite}>
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            color={isFavorite ? '#6A4C93' : 'black'}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.duration}>{duration}</Text>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 8,
  },
  duration: {
    marginTop: 4,
    color: '#666',
  },
});
