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
var docClient = new AWS.DynamoDB.DocumentClient();

var tblName = "RecipeTable";

module.exports = {
  _config: {
    actions: false,
    shortcuts: false,
    rest: false
  },

  getSpecificRecipe: function (req, res) {
    var recipeID = req.body.recipeID;
    var params = {
      TableName: tblName,
      KeyConditionExpression: 'recipeID = :v1',
      ExpressionAttributeValues: {
        ':v1': 'recipeID',
      }
    };
    docClient.query(params, function (err, data) {
      if (err) {
        res.send(400, { errorMsg: err });
      } else {
        res.send(200, { data: data });
      }
    });
  },

  simpleSearch: function (req, res) {
    var withoutRedirect = req.body.withoutRedirect;
    var searchTerm = req.body.searchTerm;
    var params = {
      TableName: tblName,
      ConditionalOperator: "OR",
      ScanFilter: {
        'ingredients': {
          ComparisonOperator: "CONTAINS",
          AttributeValueList: [
            searchTerm
          ]
        },
        'introduction': {
          ComparisonOperator: "CONTAINS",
          AttributeValueList: [
            searchTerm
          ]
        },
        'direction': {
          ComparisonOperator: "CONTAINS",
          AttributeValueList: [
            searchTerm
          ]
        },
        'title': {
          ComparisonOperator: "CONTAINS",
          AttributeValueList: [
            searchTerm
          ]
        },
      },
    };
    docClient.scan(params, function (err, data) {
      if (err) {
        res.send(400, { errorMsg: err });
      } else {
        if (withoutRedirect) {
          res.send(200, { result: data })
        } else {
          res.redirect("/searchResult", { result: data });
        }
      }
    });
  },
  
  dumpAll: function (req, res) {
    var params = {
      TableName: tblName,
    };
    docClient.scan(params, function (err, data) {
      if (err) {
        res.send(400, { errorMsg: err });
      } else {
        res.send(200, { data: data });
      }
    });
  },

  loadRecipe: function (req, res) {
    var params = {
      TableName: tblName,
    };
    docClient.scan(params, function (err, data) {
      if (err) {
        res.send(400, { errorMsg: err });
      } else {
        var result = [];
        for (i = 0; i < data.Items.length; i++) {
          result.push({
            recipeID: data.Items[i].recipeID,
            title: data.Items[i].title,
            introduction: data.Items[i].introduction
          });
        }
        res.send(200, { result: result });
      }
    });
  },

  // advancedSearch: function (req, res) {
  //   res.send(200, { message: "Advanced Search", body: req.body });
  // },
};