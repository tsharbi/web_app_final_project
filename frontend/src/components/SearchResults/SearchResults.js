// Import React and other necessary dependencies
import React from 'react';
import RecipeCard from '../RecipeCard/RecipeCard'; // Import the RecipeCard component
import '../RecipeCard/RecipeCard.css';

// Define the SearchResults component
const SearchResults = ({ searchResults }) => {
        <div className="recipe-cards-container">
            {/*Goes through data to display*/}
            {searchResults.map((recipe, index) => (
                <RecipeCard key={index} recipe={recipe}/>
            ))}
        </div>
    );
};

// Export the SearchResults component
export default SearchResults;
