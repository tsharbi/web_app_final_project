// src/components/RecipeCard.js
import React from 'react';
import './RecipeCard.css';
import silhouette_recipe from './silhouette-recipe.jpg';
import { FaEye } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";

const RecipeCard = ({ recipe }) => {
    const formatTime = (timeStr) => {
        if (!timeStr || timeStr === 'N/A') {
            return 'N/A';
        }

        const hoursMatch = timeStr.match(/(\d+)H/);
        const minutesMatch = timeStr.match(/(\d+)M/);

        const hours = hoursMatch ? hoursMatch[1].padStart(2, '0') : '00';
        const minutes = minutesMatch ? minutesMatch[1].padStart(2, '0') : '00';

        return `${hours}:${minutes}`;
    };

    return (
        <article className="recipe-card" role="article">
            <img
                src={recipe.image || silhouette_recipe}
                alt={`Recipe for ${recipe.name}`}
                onError={(event) => {
                    event.currentTarget.src = silhouette_recipe;
                    event.currentTarget.onError = null;
                }}
                style={{ height: '200px', width: '100%' }}
            />
            <section className="recipe-details">
                <h3>{recipe.name}</h3>
                <p><strong>Cook Time:</strong> {formatTime(recipe.cookTime)}</p>
                <p><strong>Prep Time:</strong> {formatTime(recipe.prepTime)}</p>
                <p><strong>Yield:</strong> {recipe.recipeYield}</p>
                <button className="view-recipe" aria-label="View recipe details">
                    <FaEye /> View Recipe
                </button>
                <button className="add-to-favorites" aria-label="Add recipe to favorites">
                    <MdFavorite /> Add to Favorites
                </button>
            </section>
        </article>
    );
};

export default RecipeCard;