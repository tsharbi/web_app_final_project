const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const fs = require('fs');
const path = require('path');
const Recipe = require('./models/Recipe');

const corsOptions = {
origin: 'http://localhost:3000'
}

const app = express();
app.use(cors(corsOptions));

const port = process.env.PORT || 5001;


// Connect to mongoDB
mongoose.connect('mongodb://localhost:27017/recipe_db')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

app.use(express.static(path.join(__dirname, '../frontend/build')));
app.use(express.json());

// receives the post request from the frontend
app.post('/api/recipes/populate', async (req, res) => {

    const jsonFile = path.join(__dirname, 'recipes.json');

    const { signal } = req.body;

    // if command start is passed through then we start adding
    if (signal === 'start') {
        let recipesAdded = 0;
        console.log('permission to start adding is granted');

        // parse the json file
        const data = fs.readFileSync(jsonFile);
        const recipes = JSON.parse(data);

        const recipesToProcess = 782;

        // loop through all recipes and create recipes using recipe model
        for (let i = 0; i < recipesToProcess && i < recipes.length; i++) {
                const singleRecipe = recipes[i];
                try {
                    const recipe = new Recipe(singleRecipe);
                    recipe.save();
                    recipesAdded++;

                } catch (err) {
                    console.error('Error creating recipe:', err);
                }
        }

        // sends the response of total recipes added back to the frontend
        res.status(200).json({ message: `${recipesAdded} recipes successfully added to the database` });

    }
});

// Catch-all route handler for serving the frontend index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../backend/public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
