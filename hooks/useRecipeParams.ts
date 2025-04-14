import { useLocalSearchParams } from 'expo-router';
import { Recipe } from '../types/recipe';

export function useRecipeParams(): Recipe {
  const params = useLocalSearchParams();

  const cleanQuotes = (str: string) =>
    str.startsWith('"') && str.endsWith('"') ? str.slice(1, -1) : str;

  const ingredients =
    typeof params.ingredients === 'string'
      ? cleanQuotes(params.ingredients).split(';').map((i) => i.trim())
      : [];

  const instructions =
    typeof params.instructions === 'string'
      ? cleanQuotes(params.instructions).split(';').map((i) => i.trim())
      : [];

  return {
    id: params.id as string,
    title: params.title as string,
    duration: params.duration as string,
    image: params.image ? (params.image as string) : null,
    ingredients,
    instructions,
  };
}
