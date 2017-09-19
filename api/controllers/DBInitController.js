/**
 * DBInitController
 *
 * @description :: Server-side logic for managing Dbinits
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

var recipeTableParams = {
  TableName: "RecipeTable",
  KeySchema: [
    { AttributeName: "recipeID", KeyType: "HASH" },
    { AttributeName: "title", KeyType: "RANGE" },
  ],
  AttributeDefinitions: [
    { AttributeName: "recipeID", AttributeType: "N" },
    { AttributeName: "title", AttributeType: "S" },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10
  }
};

module.exports = {
  _config: {
    actions: false,
    shortcuts: false,
    rest: false
  },

  init: function (req, res, callback) {

    // Create table if it doesn't exist yet
    dynamodb.createTable(recipeTableParams, function (err, data) {
      if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
        res.send(400, { message: "Table already exists" });
      } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
        res.send(200, { message: "Created recipe table" });
      }
    });

  }
};

