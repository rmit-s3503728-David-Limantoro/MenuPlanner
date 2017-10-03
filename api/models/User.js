/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var bcrypt = require('bcrypt');

module.exports = {

  attributes: {
    username: {
      type: 'string',
      required: true,
      unique: true,
    },
    email: {
      type: 'string',
      required: true,
    },
    password: {
      type: 'string',
      required: true
    },
  },
  

  beforeCreate: function (values, cb) {
    bcrypt.hash(values.password, 10, function(err, hash) {
      if(err) return cb(err);
      values.password = hash;
      cb();
    });
  },

  findByUsername: function (username, callback) {
    User.findOne({
      username: username
    }).exec(function (err, record) {
      if (err) {
        return err;
      }
      return callback();
    });
  },

};
