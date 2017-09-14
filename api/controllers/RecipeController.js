/**
 * RecipeController
 *
 * @description :: Server-side logic for managing Recipes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  _config: {
    actions: false,
    shortcuts: false,
    rest: false
  },

  newRecipe: function (req, res) {
    res.send(200, { message: "Create a new recipe" });
  },

  updateRecipe: function (req, res) {
    res.send(200, { message: "Update existing recipe" });
  },

  deleteRecipe: function (req, res) {
    res.send(200, { message: "Delete existing recipe" });
  },
};

