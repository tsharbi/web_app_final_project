const mongoose = require('mongoose');

// schema
const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  ingredients: {
    type: [String],
    required: true
  },
  prepTime: String,
  cookTime: String,
  recipeYield: String
});


const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
