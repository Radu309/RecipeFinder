import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';
import ErrorMessage from './components/ErrorMessage';
import PrimaryButton from './components/PrimaryButton';

import { fetchRecipesFromAI } from './services/openrouter/fetchRecipesFromAI';
import { fetchPexelsImageByTitle } from './services/openrouter//fetchPexelsImageByTitle';
import { fetchDifferentRecipesFromAI } from './services/openrouter/fetchDifferentRecipesFromAI';
import { Recipe } from './types/recipe';
import { saveFavorite,removeFavorite, getFavorites,} from './utils/favoritesStorage';

export default function Home() {
  const [input, setInput] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [recipeTitles, setRecipeTitles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const[isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    
  }, [isSearching]);
  
  const loadFavorites = async () => {
    const favorites = await getFavorites();
    setRecipes(favorites);
  };

  useEffect(() => {
    if (input.trim() === '') {
        loadFavorites();
    //   setRecipes([]); 
        setError(null);
        setIsSearching(false);
        setRecipeTitles([]);
    }
  }, [input]);

  const handleSearch = async (differentRecipes: boolean) => {
    if (!input.trim()) return;

    setIsSearching(true);
    setLoading(true);
    setError(null);
    setRecipes([]);

    try {
        let raw;
        if (differentRecipes == false){
            setRecipeTitles([]);
            raw = await fetchRecipesFromAI(input);
        }
        else{
            raw = await fetchDifferentRecipesFromAI(recipeTitles.toString());
        }
      
      const parsed = JSON.parse(raw || '[]');

      if (Array.isArray(parsed)) {
        const formatted: Recipe[] = await Promise.all(
            parsed.map(async (recipe, index) => {
              const imageFromPexels = await fetchPexelsImageByTitle(recipe.title);
              console.log(`[IMG] ${recipe.title} -> ${imageFromPexels}`); 
          
              return {
                id: `${recipe.title}-${index}`,
                title: recipe.title,
                duration: recipe.duration,
                image: imageFromPexels || recipe.image || null,
                ingredients: recipe.ingredients || [],
                instructions: recipe.instructions || [],
                favorite: false,
              };
            })
          );
          
        setRecipeTitles([...recipeTitles, ...formatted.map(recipe => recipe.title)]);
        console.log(recipeTitles)
        setRecipes(formatted);
      } else {
        setError('Invalid format received from AI.');
      }
    } catch (err) {
      console.error('Parse error:', err);
      setError('Failed to fetch recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centeredContent}>
        <SearchBar
          placeholder="What do you feel like eating?"
          value={input}
          onChangeText={setInput}
          onSubmit={() => handleSearch(false)} 
        />

        <Text style={styles.sectionTitle}>
          {isSearching ? 'Suggested recipes' : 'Favorites'}
        </Text>

        {loading && <ActivityIndicator size="large" color="#6A4C93" />}
        {error && <ErrorMessage message={error} />}

        <RecipeList recipes={recipes}/>

        {!loading && isSearching && (
          <PrimaryButton onPress={() => handleSearch(true)} text="I don't like these" />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    paddingTop: 20,
  },
  centeredContent: {
    width: 500,
    flexDirection: 'column',
    maxWidth: "70%",
    maxHeight: "90%",
    alignSelf: 'center',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
});
