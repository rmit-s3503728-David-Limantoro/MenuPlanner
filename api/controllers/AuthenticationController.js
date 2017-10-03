/**
 * AuthenticationController
 *
 * @description :: Server-side logic for managing Authentications
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypy = require('bcrypt');

passport.use(new LocalStrategy(
  function (username, password, done) {
    User.findOne({
      username: username
    }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          message: 'Incorrect username.'
        });
      }
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Incorrect password.'
        });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function (user, done) {
  done(null, user.username);
});

passport.deserializeUser(function (username, done) {
  User.findByUsername(username, function (err, user) {
    done(err, user);
  });
});


module.exports = {
  _config: {
    actions: false,
    shortcuts: false,
    rest: false
  },

  register: function (req, res, next) {
    var username = req.body.user_login;
    var email = req.body.user_email;
    var unhashedPassword = req.body.password;
    var passwordRepeat = req.body.confirm_password;

    if (username == "" || unhashedPassword == "" || (unhashedPassword !== passwordRepeat)) {
      return res.status(400).send({
        message: "Cannot register, invalid field"
      });
    }

    User.create({
      username: username,
      email: email,
      password: unhashedPassword
    }).exec(function (err, records) {
      if (err) {
        return res.status(400).send({
          message: "Cannot register, database error"
        });
      }
      return res.status(200).send({
        message: "User is created",
        redirect: "/"
      });
    });

  },

  login: function (req, res, next) {
    // TODO
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login'
    })
  },

  logout: function (req, res, next) {
    // TODO
  },
};
