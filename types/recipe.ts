export type Recipe = {
  id: string;
  title: string;
  duration: string; 
  image: string | null;
  ingredients: string[];
  instructions: string[];
};
