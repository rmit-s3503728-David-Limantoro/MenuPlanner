/**
 * SearchController
 *
 * @description :: Server-side logic for managing Searches
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var AWS = require("aws-sdk");
var credentials = new AWS.SharedIniFileCredentials({ profile: 'default' });
AWS.config.credentials = credentials;
AWS.config.update({
  region: "us-west-2", //oregon region
  endpoint: "https://dynamodb.us-west-2.amazonaws.com"
});
var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();
// var s3 = new AWS.S3();
// s3.abortMultipartUpload(params, function (err, data) {
//   if (err) console.log(err, err.stack); // an error occurred
//   else     console.log(data);           // successful response
// });

module.exports = {
  _config: {
    actions: false,
    shortcuts: false,
    rest: false
  },

  getSpecificRecipe: function (req, res) {
    var recipeID = req.body.recipeID;
    var params = {
      TableName: "RecipeTable",
      Key: {
        recipeID: recipeID,
      }
    };
    docClient.query(params, function (err, data) {
      console.log(err);
      console.log(data);
      if (err) {
        res.send(400, { message: "Problem accessing database" });
      } else {
        res.send(200, { message: "All recipes dumped", data: data });
      }
    });
  },

  simpleSearch: function (req, res) {
    var params = {
      TableName: "RecipeTable",
      //TODO
    };
    docClient.scan(params, function (err, data) {
      if (err) {
        res.send(400, { message: "Problem accessing database" });
      } else {
        res.send(200, { message: "All recipes dumped", data: data });
      }
    });
  },

  dumpAll: function (req, res) {
    var params = {
      TableName: "RecipeTable",
    };
    docClient.scan(params, function (err, data) {
      if (err) {
        res.send(400, { message: "Problem accessing database" });
      } else {
        res.send(200, { message: "All recipes dumped", data: data });
      }
    });
  },

  loadRecipe: function (req, res) {
    res.send(200, { message: "Show recipes, only their ID and their titles", body: req.body });
  },

  // advancedSearch: function (req, res) {
  //   res.send(200, { message: "Advanced Search", body: req.body });
  // },
};

