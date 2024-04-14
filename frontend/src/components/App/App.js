// src/components/App/App.js
import React, { useState } from 'react';
import "./App.css";
import logo from './recipe-finder.png';
import Search from '../Search/Search';
import SearchResults from '../SearchResults/SearchResults';

const App = () => {
    const [recipes, setRecipes] = useState([]);
    const [dbPopulated, setDbPopulated] = useState(false);
    const [populateMessage, setPopulateMessage] = useState('');
    const [favorites, setFavorites] = useState([]);
    const [showFavorites, setShowFavorites] = useState(false);
    const signal = "start";

    const populateDB = async () => {
        // send post request to backend to start adding recipes
        const response = await fetch('http://localhost:5001/api/recipes/populate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ signal })
        });

        // receives the number of recipes added and prints
        if (response.ok) {
            const data = await response.json();
            setDbPopulated(true);
            setPopulateMessage(data.message);
        }
    };

    const handleSearch = async (searchValue) => {
        try {
            // Receives the search value from the user from the backend
            const response = await fetch(`http://localhost:5001/api/search?searchValue=${searchValue}`);
            if (response.ok) {
                // If response is ok, then it reads the json
                const recipe = await response.json();
                setRecipes(recipe); // Update the recipes state with the search results
            } else {
                // If failed, it gives error
                console.error('Failed to fetch search results in database:', response.statusText);
            }
        } catch (error) {
            // Prints error
            console.error('Error searching recipes in database:', error);
        }
    };

    // Adds a recipe to favorites
    const handleAddToFavorites = (recipe) => {
        setFavorites([...favorites, recipe]);
    };

    // Removes a recipe from favorites
    const handleRemoveFromFavorites = (recipe) => {
        const updatedFavorites = favorites.filter((fav) => fav.name !== recipe.name);
        setFavorites(updatedFavorites);
    };

    return (
        // Creates outline for website design
        <div className="app">
            {/*Creates header*/}
            <header className="app-header">
                <div className="top">
                    {!dbPopulated && (
                        <>
                            <button className="navbutton" onClick={populateDB}>Populate DB</button>
                        </>
                    )}

                    {dbPopulated && (
                        <div className="populate-message">{populateMessage}</div>
                    )}
                    {/*Creates favorite button*/}
                    <button className="navbutton" onClick={() => setShowFavorites(!showFavorites)}>
                        Favorites
                    </button>
                    {showFavorites && (
                        <div className="favorites-dropdown">
                            {favorites.map((recipe, index) => (
                                <div key={index}>
                                    {recipe.name}
                                    <button onClick={() => handleRemoveFromFavorites(recipe)}>
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/*Displays logo*/}
                <div>
                    <img src={logo} alt="logo"/>
                </div>
            </header>
             {/*Search bar*/}
            <main className="show-result">
                <Search onSearch={handleSearch} />
            </main>

            {/*Shows search results*/}
            <SearchResults
                searchResults={recipes}
                onAddToFavorites={handleAddToFavorites}
            />
        </div>
    );
};

export default App;

