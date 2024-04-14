// Search.js
import React, { useState } from 'react';

const Search = ({ onSearch }) => {
    // Creates variables
    const [searchValue, setSearchValue] = useState('');

    // Takes search value
    const handleInputChange = (event) => {
        setSearchValue(event.target.value);
    };

    // Sends search variable
    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(searchValue);
    };

    // Handles when submit button is pressed
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSubmit(event);
        }
    };

    return (
        // Search bar
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
    );
};

export default Search;
