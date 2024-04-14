const mongoose = require('mongoose');

// Creates mongoose scheme for a recipe
let recipeSchema = new mongoose.Schema({
  // Includes all of the different aspects of the recipe
  name: {
    type: String,
    required: true
  },

  image: {
    type: String,
    required: true
  },

  description: String,
  recipeYield: String,
  cookTime: String,
  prepTime: String,

  ingredients: {
    type: [String],
    required: true
  },

});

module.exports = mongoose.model('Recipe', recipeSchema);
