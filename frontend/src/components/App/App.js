import React, { useState, useEffect } from 'react';
import "./App.css";
import logo from './recipe-finder.png';
import RecipeCard from '../RecipeCard/RecipeCard';

const App = () => {
    const [recipes, setRecipes] = useState([]);
    const [dbPopulated, setDbPopulated] = useState(false);
    const [populateMessage, setPopulateMessage] = useState('');
    const [searchValue, setSearchValue] = useState('');
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

    const handleInputChange = (event) => {
            setSearchValue(event.target.value);
    };

    const handleSubmit = (event) => {
            event.preventDefault();
            console.log('Entered value:', searchValue);
    };

    const handleKeyPress = (event) => {
            if (event.key === 'Enter') {
                handleSubmit(event);
            }
    };


    return (
        // Syntax of the buttons
        <div className="app">
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

                </div>
                <div>
                    <img src={logo} alt="logo"/>
                </div>
            </header>
            <main className="show-result">
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    name="search"
                                    placeholder="Find Recipe"
                                    value={searchValue}
                                    onChange={handleInputChange}
                                    onKeyPress={handleKeyPress}
                                />
                            </form>
                        </main>


            <main className="show-result">
                <div className="recipe-cards-container">
                    {recipes.map((recipe, index) => (
                        <RecipeCard key={index} recipe={recipe} />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default App;

