/**
 * RecipeController
 *
 * @description :: Server-side logic for managing Recipes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var AWS = require("aws-sdk");
var credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
AWS.config.credentials = credentials;
AWS.config.update({
  region: "us-west-2", //oregon region
  endpoint: "https://dynamodb.us-west-2.amazonaws.com"
});
var docClient = new AWS.DynamoDB.DocumentClient();
// var s3 = new AWS.S3();
// s3.abortMultipartUpload(params, function (err, data) {
//   if (err) console.log(err, err.stack); // an error occurred
//   else     console.log(data);           // successful response
// });

var formidable = require('formidable');

module.exports = {
  _config: {
    actions: false,
    shortcuts: false,
    rest: false
  },

  newRecipe: function (req, res) {
    console.log(req.body);
    var body_title = req.body.title;
    var body_level = req.body.level;
    var body_yield = req.body.yield;
    var body_intro = req.body.intro;
    var body_ingredients = req.body.ingredients;
    var body_direction = req.body.direction;
    res.send(200, { message: "Create a new recipe", body: req.body });
  },

  updateRecipe: function (req, res) {
    console.log(req.body);
    var body_title = req.body.title;
    var body_level = req.body.level;
    var body_yield = req.body.yield;
    var body_intro = req.body.intro;
    var body_ingredients = req.body.ingredients;
    var body_direction = req.body.direction;
    res.send(200, { message: "Update existing recipe", body: req.body });
  },
};

