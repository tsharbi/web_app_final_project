import React, { useState, useEffect } from 'react';
import "./App.css";
import logo from './recipe-finder.png';
import RecipeCard from '../RecipeCard/RecipeCard';

const App = () => {
    const [recipes, setRecipes] = useState([]);
    const [dbPopulated, setDbPopulated] = useState(false);
    const [populateMessage, setPopulateMessage] = useState('');


    const populateDB = async () => {

        console.log('Populating database with recipes...');

//        try {
            const response = await fetch('http://localhost:5001/api/recipes/populate', {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 'signal': 'start' })
            });

//            if (response.ok) {
//                const data = await response.json();
//                setDbPopulated(true);
//                setPopulateMessage(data.message);
//            } else {
//                throw new Error('Failed to populate database');
//            }
//        } catch (error) {
//            console.error('Error populating database:', error);
//        }
    };

    return (
        <div className="app">
            <header className="app-header">
                <div className="top">
                    {!dbPopulated && (
                    <>
                        <button className="navbutton" onClick={populateDB}>Populate DB</button>
                        {console.log('just clicked button')}
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
                <form>
                    <input type="text" name="search" placeholder="Find Recipe"/>
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

