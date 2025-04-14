import AsyncStorage from '@react-native-async-storage/async-storage';
import { Recipe } from '../types/recipe';

const FAVORITES_KEY = 'favorites_list';

export const getFavorites = async (): Promise<Recipe[]> => {
  const json = await AsyncStorage.getItem(FAVORITES_KEY);
  return json ? JSON.parse(json) : [];
};

export const saveFavorites = async (favorites: Recipe[]) => {
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

export const isFavorite = async (id: string): Promise<boolean> => {
  const favorites = await getFavorites();
  return favorites.some((r) => r.id === id);
};

export const toggleFavorite = async (recipe: Recipe): Promise<boolean> => {
  let favorites = await getFavorites();
  const exists = favorites.find((r) => r.id === recipe.id);

  if (exists) {
    favorites = favorites.filter((r) => r.id !== recipe.id);
  } else {
    favorites.push(recipe);
  }

  await saveFavorites(favorites);
  return !exists;
};
