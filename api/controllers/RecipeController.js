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
var bktName = "s3503728-rmit-menuplanner";
var s3 = new AWS.S3({
  region: 'us-west-2',
  endpoint: "https://s3.us-west-2.amazonaws.com"
});
// s3.abortMultipartUpload(params, function (err, data) {
//   if (err) console.log(err, err.stack); // an error occurred
//   else     console.log(data);           // successful response
// });

var uuid = require('node-uuid');
var fs = require('fs');
var path = require('path');

module.exports = {
  _config: {
    actions: false,
    shortcuts: false,
    rest: false
  },

  newRecipe: function (req, res) {
    req.file('avatar').upload({
      maxBytes: 1 * 1000 * 1000
    }, function (err, uploadedFiles) {
      if (err) {
        return res.redirect("/upload?uploadSuccess=false&filesize=invalid");
      }

      var uploadParams = { Bucket: bktName, Key: '', Body: '' };
      var file = uploadedFiles[0].fd;

      var fileStream = fs.createReadStream(file);
      fileStream.on('error', function (err) {
        console.log('File Error', err);
      });
      uploadParams.Body = fileStream;
      uploadParams.Key = path.basename(file);

      s3.upload(uploadParams, function (err, data) {
        if (err) {
          return res.redirect("/upload?uploadSuccess=false");
        } if (data) {
          var body_title = req.body.title;
          var body_level = req.body.level;
          var body_yield = req.body.yield;
          var body_introduction = req.body.introduction;
          var body_ingredients = req.body.ingredients;
          var body_direction = req.body.direction;
          var img_link = data.Location;

          var item = {
            recipeID: uuid.v4(),
            title: body_title,
            level: body_level,
            yield: body_yield,
            introduction: body_introduction,
            ingredients: body_ingredients,
            direction: body_direction,
            img: img_link
          }

          var params = {
            TableName: "RecipeTable",
            Item: item
          };

          docClient.put(params, function (err, data) {
            if (err) {
              return res.redirect("/upload?uploadSuccess=false");
            } else {
              return res.redirect("/upload?uploadSuccess=true");
            }
          });
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
    if (recipeID) {
      var params = {
        TableName: tblName,
        KeyConditionExpression: 'recipeID = :v1',
        ExpressionAttributeValues: {
          ':v1': recipeID,
        }
      };
      docClient.query(params, function (err, data) {
        if (err) {
          return res.send(400, { errorMsg: err });
        } else {
          return res.view('recipe', {
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
          return res.send(400, { errorMsg: err });
        } else {
          return res.view('result', {
            result: data
          });
        }
      });
    }
  },

};

