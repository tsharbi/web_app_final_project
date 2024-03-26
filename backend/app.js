const express = require('express');
const mongoose = require('mongoose');
const path = require('path');


const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/recipe_db')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// Serve the frontend build files
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Define routes and middleware here
// ...

// Catch-all route handler for serving the frontend index.html file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));