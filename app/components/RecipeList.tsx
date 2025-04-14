import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Recipe } from '../types/recipe';
import RecipeCard from './RecipeCard';


interface RecipeListProps {
  recipes: Recipe[];
  onItemPress?: (recipe: Recipe) => void;
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
  return (
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <RecipeCard recipe={item}
          />
        )}
      />
  );
};

export default RecipeList;

const styles = StyleSheet.create({
  list: {
    paddingBottom: 16,
  },
});
