/**
 * SearchController
 *
 * @description :: Server-side logic for managing Searches
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  _config: {
    actions: false,
    shortcuts: false,
    rest: false
  },

  simpleSearch: function (req, res) {
    res.send(200, { message: "Simple Search", body: req.body });
  },

  advancedSearch: function (req, res) {
    res.send(200, { message: "Advanced Search", body: req.body });
  },

  dumpAll: function (req, res) {
    res.send(200, { message: "Dump all recipes", body: req.body });
  },
};

