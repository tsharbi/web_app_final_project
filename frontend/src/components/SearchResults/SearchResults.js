// src/components/SearchResults.js
import React from 'react';
import RecipeCard from '../RecipeCard/RecipeCard';
import '../RecipeCard/RecipeCard.css';

const SearchResults = ({ searchResults, onAddToFavorites }) => {
    return (
        <div className="recipe-cards-container">
            {searchResults.map((recipe, index) => (
                <RecipeCard
                    className="recipe-card"
                    key={index}
                    recipe={recipe}
                    onAddToFavorites={onAddToFavorites}
                />
            ))}
        </div>
    );
};

export default SearchResults;
