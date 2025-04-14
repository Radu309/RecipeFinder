import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function RecipeIngredients({ ingredients }: { ingredients: string[] }) {
  return (
    <View style={styles.block}>
      <Text style={styles.subtitle}>Ingredients:</Text>
      <View style={styles.list}>
        {ingredients.map((item, idx) => (
          <Text key={idx} style={styles.listItem}>• {item}</Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: { marginBottom: 24 },
  subtitle: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  list: { paddingLeft: 12 },
  listItem: { marginBottom: 6, fontSize: 14 },
});
