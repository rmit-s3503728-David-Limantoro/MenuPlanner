/**
 * SearchController
 *
 * @description :: Server-side logic for managing Searches
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

  simpleSearch: function (req, res) {
    res.send(200, { message: "Simple Search", body: req.body });
  },

  // advancedSearch: function (req, res) {
  //   res.send(200, { message: "Advanced Search", body: req.body });
  // },

  dumpAll: function (req, res) {
    res.send(200, { message: "Dump all recipes", body: req.body });
  },
};

