/**
 * RecipeController
 *
 * @description :: Server-side logic for managing Recipes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var AWS = require("aws-sdk");
var credentials = new AWS.SharedIniFileCredentials({ profile: 'default' });
AWS.config.credentials = credentials;
AWS.config.update({
  region: "us-west-2", //oregon region
  endpoint: "https://dynamodb.us-west-2.amazonaws.com"
});
var docClient = new AWS.DynamoDB.DocumentClient();
var tblName = "RecipeTable";
// var s3 = new AWS.S3();
// s3.abortMultipartUpload(params, function (err, data) {
//   if (err) console.log(err, err.stack); // an error occurred
//   else     console.log(data);           // successful response
// });

var uuid = require('node-uuid');

module.exports = {
  _config: {
    actions: false,
    shortcuts: false,
    rest: false
  },

  newRecipe: function (req, res) {
    req.file('avatar').upload({
      maxBytes: 10000000,
      dirname: './my-dir'
    }, function (err, uploadedFiles) {
      if (err) {
        return res.negotiate(err);
      }

      // If no files were uploaded, respond with an error.
      console.log(err);
      console.log(uploadedFiles);

      // // Save the "fd" and the url where the avatar for a user can be accessed
      // User.update(req.session.me, {
      //   // Generate a unique URL where the avatar can be downloaded.
      //   avatarUrl: require('util').format('%s/user/avatar/%s', sails.config.appUrl, req.session.me),
      //   // Grab the first file and use it's `fd` (file descriptor)
      //   avatarFd: uploadedFiles[0].fd
      // }).exec(function (err) {
      //   if (err) return res.negotiate(err);
      //   return res.ok();
      // });

      var body_title = req.body.title;
      var body_level = req.body.level;
      var body_yield = req.body.yield;
      var body_introduction = req.body.introduction;
      var body_ingredients = req.body.ingredients;
      var body_direction = req.body.direction;

      var item = {
        recipeID: uuid.v4(),
        title: body_title,
        level: body_level,
        yield: body_yield,
        introduction: body_introduction,
        ingredients: body_ingredients,
        direction: body_direction,
      }

      var params = {
        TableName: "RecipeTable",
        Item: item
      };

      docClient.put(params, function (err, data) {
        if (err) {
          res.redirect("/upload?uploadSuccess=false");
        } else {
          res.redirect("/upload?uploadSuccess=true");
        }
      });
    });
  },

  // updateRecipe: function (req, res) {
  //   var body_title = req.body.title;
  //   var body_level = req.body.level;
  //   var body_yield = req.body.yield;
  //   var body_intro = req.body.intro;
  //   var body_ingredients = req.body.ingredients;
  //   var body_direction = req.body.direction;
  //   res.send(200, { message: "Update existing recipe", body: req.body });
  // },

  loadRecipePage: function (req, res) {
    var recipeID = req.query.id;
    if (recipeID){
      var params = {
        TableName: tblName,
        KeyConditionExpression: 'recipeID = :v1',
        ExpressionAttributeValues: {
          ':v1': recipeID,
        }
      };
      docClient.query(params, function (err, data) {
        if (err) {
          res.send(400, { errorMsg: err });
        } else {
          res.view('recipe', {
            result: data
          });
        }
      });
    } else {
      var params = {
        TableName: tblName,
      };
      docClient.scan(params, function (err, data) {
        if (err) {
          res.send(400, { errorMsg: err });
        } else {
          res.view('result', {
            result: data
          });
        }
      });
    }
  },

};

