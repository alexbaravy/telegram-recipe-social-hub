
import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Category {
  id: string;
  name: string;
}

interface RecipeFiltersProps {
  searchQuery: string;
  selectedCategory: string;
  onSearchChange: (query: string) => void;
  onCategoryChange: (category: string) => void;
}

const RecipeFilters = ({ 
  searchQuery, 
  selectedCategory, 
  onSearchChange, 
  onCategoryChange 
}: RecipeFiltersProps) => {
  const categories: Category[] = [
    { id: 'all', name: 'All Recipes' },
    { id: 'breakfast', name: 'Breakfast' },
    { id: 'lunch', name: 'Lunch' },
    { id: 'dinner', name: 'Dinner' },
    { id: 'dessert', name: 'Dessert' },
    { id: 'snack', name: 'Snacks' },
  ];

  return (
    <>
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input 
          placeholder="Search your recipes..." 
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 border-orange-200 focus:border-orange-300"
        />
      </div>

      <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(category.id)}
            className={`whitespace-nowrap ${
              selectedCategory === category.id
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                : 'border-orange-200 text-orange-600 hover:bg-orange-50'
            }`}
          >
            {category.name}
          </Button>
        ))}
      </div>
    </>
  );
};

export default RecipeFilters;
