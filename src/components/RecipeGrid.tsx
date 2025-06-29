
import React from 'react';
import { ExternalLink } from 'lucide-react';

interface Recipe {
  id: number;
  title: string;
  author: string;
  authorAvatar: string;
  image: string;
  likes: number;
  comments: number;
  time: string;
  difficulty: string;
  description: string;
  category: string;
}

interface RecipeGridProps {
  recipes: Recipe[];
  searchQuery: string;
  selectedCategory: string;
  categories: { id: string; name: string; }[];
  onRecipeClick: (recipe: Recipe) => void;
}

const RecipeGrid = ({ 
  recipes, 
  searchQuery, 
  selectedCategory, 
  categories, 
  onRecipeClick 
}: RecipeGridProps) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        {recipes.map(recipe => (
          <div key={recipe.id} className="relative group cursor-pointer" onClick={() => onRecipeClick(recipe)}>
            <img 
              src={recipe.image} 
              alt={recipe.title}
              className="w-full h-32 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded-lg flex items-center justify-center">
              <ExternalLink className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>
            <div className="absolute bottom-2 left-2 right-2">
              <p className="text-white text-sm font-medium truncate">{recipe.title}</p>
              <p className="text-white text-xs opacity-90">{recipe.likes} likes</p>
            </div>
          </div>
        ))}
      </div>

      {recipes.length === 0 && (searchQuery || selectedCategory !== 'all') && (
        <div className="text-center py-8">
          <p className="text-gray-500">
            {searchQuery 
              ? `No recipes found matching "${searchQuery}"${selectedCategory !== 'all' ? ` in ${categories.find(c => c.id === selectedCategory)?.name}` : ''}`
              : `No recipes found in ${categories.find(c => c.id === selectedCategory)?.name}`
            }
          </p>
        </div>
      )}
    </>
  );
};

export default RecipeGrid;
