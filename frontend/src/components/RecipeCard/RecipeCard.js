// src/components/RecipeCard.js
import React, { useState } from 'react';
import './RecipeCard.css';
import silhouette_recipe from './silhouette-recipe.jpg';
import { FaEye } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";

const RecipeCard = ({ recipe, onAddToFavorites }) => {
    const [showDetails, setShowDetails] = useState(false);

    const formatTime = (timeStr) => {
        if (!timeStr || timeStr === 'N/A') {
            return 'N/A';
        }
        // Creates format of time
        const hoursMatch = timeStr.match(/(\d+)H/);
        const minutesMatch = timeStr.match(/(\d+)M/);

        const hours = hoursMatch ? hoursMatch[1].padStart(2, '0') : '00';
        const minutes = minutesMatch ? minutesMatch[1].padStart(2, '0') : '00';

        return `${hours}:${minutes}`;
    };

    // Adds recipe to favorites
    const handleAddToFavorites = () => {
        onAddToFavorites(recipe);
    };

    return (
        // Creates format of recipe card
        <article className={`recipe-card ${showDetails ? 'expanded' : ''}`}>
            <img
                src={recipe.image || silhouette_recipe}
                alt={`Recipe for ${recipe.name}`}
                onError={(event) => {
                    event.currentTarget.src = silhouette_recipe;
                    event.currentTarget.onError = null;
                }}
                style={{ height: 'auto', width: '100%' }}
            />
            <section className="recipe-details">
                <h3>{recipe.name}</h3>
                <p><strong>Cook Time:</strong> {formatTime(recipe.cookTime)}</p>
                <p><strong>Prep Time:</strong> {formatTime(recipe.prepTime)}</p>
                <p><strong>Yield:</strong> {recipe.recipeYield}</p>
                {/*Shows when view recipe is clicked*/}
                {showDetails && (
                    <>
                        <div className="view-recipe-card">
                            <p><strong>Description:</strong> {recipe.description}</p>
                            <p className="ingredients"><strong>Ingredients</strong></p>
                            <ul>
                                {recipe.ingredients.map((recipeIngredient, index) => (
                                    <li key={index}>
                                        {recipeIngredient}
                                        <button><FaPlus/></button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
                )}

                {/*View recipe button and add recipe to favorites button*/}
                <button
                    className="view-recipe"
                    aria-label="View recipe details"
                    onClick={() => setShowDetails(!showDetails)}
                >
                    <FaEye /> {showDetails ? "Hide Recipe" : "View Recipe"}
                </button>
                <button
                    className="add-to-favorites"
                    aria-label="Add recipe to favorites"
                    onClick={handleAddToFavorites}
                >
                    <MdFavorite /> Add to Favorites
                </button>
            </section>
        </article>
    );
};

export default RecipeCard;
