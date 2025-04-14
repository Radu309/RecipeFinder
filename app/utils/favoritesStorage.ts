import AsyncStorage from '@react-native-async-storage/async-storage';
import { Recipe } from '../types/recipe';

const FAVORITES_KEY = 'favorite_recipes';

export async function getFavorites(): Promise<Recipe[]> {
  const data = await AsyncStorage.getItem(FAVORITES_KEY);
  return data ? JSON.parse(data) : [];
}

export async function saveFavorite(recipe: Recipe): Promise<void> {
  const existing = await getFavorites();
  const updated = [...existing, recipe];
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
}

export async function removeFavorite(recipeId: string): Promise<void> {
  const existing = await getFavorites();
  const updated = existing.filter((r) => r.id !== recipeId);
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
}

export async function isFavorite(recipeId: string): Promise<boolean> {
  const existing = await getFavorites();
  return existing.some((r) => r.id === recipeId);
}
