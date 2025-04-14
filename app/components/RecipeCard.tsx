import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Recipe } from '../types/recipe';
import { isFavorite } from '../utils/favoritesStorage';


type Props = { recipe: Recipe;};

export default function RecipeCard({ recipe }: Props){
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: '/RecipeDetails',
      params: {
        id: recipe.id,
        title: recipe.title,
        duration: recipe.duration,
        image: recipe.image || '',
        ingredients: JSON.stringify(recipe.ingredients),
        instructions: JSON.stringify(recipe.instructions),
        favorite: false
      },
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <View style={styles.imagePlaceholder}>
      {recipe.image ? (
        <Image
          source={{ uri: recipe.image }}
          style={{ width: 50, height: 50, borderRadius: 8 }}
          resizeMode="cover"
        />
        ) : (        
        <Ionicons name="image" size={30} color="#ccc" />
        )}
      </View>
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{recipe.title}</Text>
        <Text style={styles.cardTime}>{recipe.duration}</Text>
      </View>
      <TouchableOpacity>
        {/* <Ionicons name="heart" size={24} color="#6A4C93" /> */}
        <Ionicons name="heart-outline" size={24} color="black" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECECEC',
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  imagePlaceholder: {
    width: 50,
    height: 50,
    backgroundColor: '#DADADA',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginRight: 15,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontWeight: '600',
    fontSize: 16,
  },
  cardTime: {
    fontSize: 12,
    color: '#666',
  },
});
