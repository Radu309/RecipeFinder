import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Heart } from "lucide-react-native";
import { Recipe } from "./types/recipe";
import { saveFavorite,removeFavorite, isFavorite,} from './utils/favoritesStorage';

export default function RecipeDetails() {

  const screenWidth = Dimensions.get("window").width;
  const isTablet = screenWidth >= 768;

  const params = useLocalSearchParams();

  const cleanQuotes = (str: string) =>
    str.startsWith('"') && str.endsWith('"') ? str.slice(1, -1) : str;

  const ingredients =
    typeof params.ingredients === "string"
      ? cleanQuotes(params.ingredients).split(";").map((item) => item.trim())
      : [];

  const instructions =
    typeof params.instructions === "string"
      ? cleanQuotes(params.instructions).split(";").map((item) => item.trim())
      : [];

  const recipe: Recipe = {
    id: params.id as string,
    title: params.title as string,
    duration: params.duration as string,
    image: params.image ? (params.image as string) : null,
    ingredients,
    instructions,
    favorite: false
  };

  // const [isFavorite, setIsFavorite] = useState(false);
  const [isFavoriteState, setIsFavoriteState] = useState(false);

  // const toggleFavorite = () => setIsFavorite(!isFavorite);

  useEffect(() => {
    const checkFavorite = async () => {
      const result = await isFavorite(recipe.id);
      setIsFavoriteState(result);
    };
    checkFavorite();
  }, [recipe.id]);

  const toggleFavorite = async () => {
    if (isFavoriteState) {
      await removeFavorite(recipe.id);
    } else {
      await saveFavorite(recipe);
    }
    setIsFavoriteState((prev) => !prev);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.layout, isTablet ? styles.layoutTablet : styles.layoutPhone]}>
        <View style={isTablet ? styles.leftTablet : styles.leftPhone}>
          {recipe.image ? (
            <Image  source={{ uri: recipe.image }} resizeMode="cover"
            style={[isTablet ? styles.imageTablet : styles.imagePhone]}
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Ionicons name="image" size={150} color="#ccc" />
            </View>
          )}

          <View style={styles.header}>
            <Text style={styles.title}>{recipe.title}</Text>
            <TouchableOpacity onPress={toggleFavorite}>
              <Heart
                size={24}
                color={isFavoriteState ? 'red' : 'gray'}
                fill={isFavoriteState ? 'red' : 'none'}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.duration}>{recipe.duration}</Text>
        </View>

        <ScrollView
          style={isTablet ? styles.rightTablet : styles.rightPhone}
          contentContainerStyle={styles.content}
        >
          <View style={styles.block}>
            <Text style={styles.subtitle}>Ingredients:</Text>
            <View style={styles.list}>
              {recipe.ingredients.map((item, idx) => (
                <Text key={idx} style={styles.listItem}>• {item}</Text>
              ))}
            </View>
          </View>

          <View style={styles.block}>
            <Text style={styles.subtitle}>Instructions:</Text>
            <View style={styles.list}>
              {recipe.instructions.map((step, idx) => (
                <Text key={idx} style={styles.listItem}>{idx + 1}. {step}</Text>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  layout: {
    flex: 1,
    padding: 16,
  },

  layoutPhone: {
    width: 500,
    flexDirection: 'column',
    maxWidth: "70%",
    maxHeight: "90%",
    alignSelf: 'center',  },

  layoutTablet: {
    flexDirection: "row",
    maxWidth: "80%",
    maxHeight: "90%",
    gap: 24,
  },

  leftPhone: {
    width: "100%",
  },

  leftTablet: {
    flex: 1,
    paddingRight: 16,
  },

  rightPhone: {
    width: "100%",
    marginTop: 16,
  },

  rightTablet: {
    flex: 1,
    marginTop: 0,
  },

  imageTablet: {
    width: "100%",
    height: 300,
    borderRadius: 16,
  },
  imagePhone: {
    width: "100%",
    height: 200,
    borderRadius: 16,
  },

  imagePlaceholder: {
    width: "100%",
    height: 192,
    borderRadius: 16,
    backgroundColor: "#e5e5e5",
    alignItems: "center",
    justifyContent: "center",
  },

  header: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    flex: 1,
    marginRight: 8,
  },

  duration: {
    marginTop: 4,
    color: "#666",
  },

  content: {
    paddingBottom: 32,
  },

  block: {
    marginBottom: 24,
  },

  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },

  list: {
    paddingLeft: 12,
  },

  listItem: {
    marginBottom: 6,
    fontSize: 14,
  },
});
