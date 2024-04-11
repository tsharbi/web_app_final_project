const mongoose = require('mongoose');

// schema
let recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: String,
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
