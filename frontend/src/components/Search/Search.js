// Search.js
import React, { useState } from 'react';

const Search = ({ onSearch }) => {
    const [searchValue, setSearchValue] = useState('');

    const handleInputChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(searchValue);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSubmit(event);
        }
    };

    return (
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
