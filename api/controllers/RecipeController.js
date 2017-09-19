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
var dynamodb = new AWS.DynamoDB();
var s3 = new AWS.S3();
s3.abortMultipartUpload(params, function (err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});

module.exports = {
  _config: {
    actions: false,
    shortcuts: false,
    rest: false
  },

  newRecipe: function (req, res) {
    console.log(req.body);
    res.send(200, { message: "Create a new recipe", body: req.body });
  },

  updateRecipe: function (req, res) {
    console.log(req.body);
    res.send(200, { message: "Update existing recipe", body: req.body });
  },

  // deleteRecipe: function (req, res) {
  //   console.log(req.body);
  //   res.send(200, { message: "Delete existing recipe", body: req.body });
  // },
};

