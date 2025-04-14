import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useRecipeParams } from '../hooks/useRecipeParams';
import { isFavorite, toggleFavorite } from '../utils/favoritesStorage';

import RecipeImage from '../components/recipe-details/RecipeImage';
import RecipeHeader from '../components/recipe-details/RecipeHeader';
import RecipeIngredients from '../components/recipe-details/RecipeIngredients';
import RecipeInstructions from '../components/recipe-details/RecipeInstructions';

export default function RecipeDetailsScreen() {
  const recipe = useRecipeParams();
  const [isFavoriteState, setIsFavoriteState] = useState(false);

  const screenWidth = Dimensions.get('window').width;
  const isTablet = screenWidth >= 768;

  useEffect(() => {
    isFavorite(recipe.id).then(setIsFavoriteState);
  }, [recipe.id]);

  const handleToggleFavorite = async () => {
    const newState = await toggleFavorite(recipe);
    setIsFavoriteState(newState);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.layout, isTablet ? styles.layoutTablet : styles.layoutPhone]}>
        <View style={isTablet ? styles.leftTablet : styles.leftPhone}>
          <RecipeImage image={recipe.image} />
          <RecipeHeader
            title={recipe.title}
            duration={recipe.duration}
            isFavorite={isFavoriteState}
            onToggleFavorite={handleToggleFavorite}
          />
        </View>

        <ScrollView
          style={isTablet ? styles.rightTablet : styles.rightPhone}
          contentContainerStyle={styles.content}
        >
          <RecipeIngredients ingredients={recipe.ingredients} />
          <RecipeInstructions instructions={recipe.instructions} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  layout: { flex: 1, padding: 16 },
  layoutPhone: { width: 500, flexDirection: 'column', maxWidth: '70%', maxHeight: '90%', alignSelf: 'center' },
  layoutTablet: { flexDirection: 'row', maxWidth: '80%', maxHeight: '90%', gap: 24 },
  leftPhone: { width: '100%' },
  leftTablet: { flex: 1, paddingRight: 16 },
  rightPhone: { width: '100%', marginTop: 16 },
  rightTablet: { flex: 1, marginTop: 0 },
  content: { paddingBottom: 32 },
});