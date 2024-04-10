

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


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/recipe_db')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

app.use(express.static(path.join(__dirname, '../frontend/build')));
app.use(express.json());

app.get('/hello', (req, res) => {
    console.log('hello');
});

console.log('just got here');
app.post('/api/recipes/populate', async (req, res) => {

    console.log('reached');
    const jsonFile = path.join('..', 'public', 'recipes.json');

    const { signal } = req.body;
    console.log('Received signal:', signal);
    console.log('reached 2');

    if (signal === 'start') {
        console.log('permision to start adding is granted');
    }



//    if (signal === 'start'){
//        const data = fs.readFileSync(jsonFile);
//        const recipes = JSON.parse(data);
//
//        let recipesAdded = 0;
//
//        // Iterate through each recipe and add them to the database
//        for (const singleRecipe of recipes) {
//            try {
//                const recipe = new Recipe(singleRecipe);
//                await recipe.save();
//                recipesAdded++;
//            } catch (err) {
//                console.error('Error creating recipe:', err);
//            }
//        }
//
//        // Send response with the number of recipes successfully added
//        res.status(200).json({ message: `${recipesAdded} recipes successfully added to the database` });
//    } else {
//        console.error('Error reading or parsing recipes JSON file:');
//        res.status(500).json({ error: 'Error reading or parsing recipes JSON file' });
//    }
});

// Catch-all route handler for serving the frontend index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../backend/public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
