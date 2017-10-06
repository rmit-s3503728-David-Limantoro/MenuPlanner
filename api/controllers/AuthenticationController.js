/**
 * AuthenticationController
 *
 * @description :: Server-side logic for managing Authentications
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');

passport.use(new LocalStrategy({
  usernameField: 'log',
  passwordField: 'pwd',
  passReqToCallback: true
}, function (req, login, password, done) {
  process.nextTick(function () {
    User.findOne({
      or: [
        { username: login },
        { email: login }
      ],
    }).exec(function (err, user) {
      if(err){throw err;}
      validatePasswordAndLogIn(req, password, done, err, user);
    });
  });
}));

function validatePasswordAndLogIn(req, password, done, err, user) {
  // Catch any errors during find:
  if (err || !user) return done(null, false);

  bcrypt.compare(password, user.password).then(function (res) {
    if (res == false) {
      // Return error if comparison fails:
      return done(null, false);
    }

    // Successful return:
    return done(null, user);
  });
}

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
      return res.redirect("/?registerSuccess=true");
    });

  },

  login: function (req, res, next) {
    return passport.authenticate('local', {},
      function (err, user) {
        if (err) next(err);

        if (user) {
          // If valid user found, log in:
          req.logIn(user, function (err) {
            if (err) return done(null, false, {
              message: err
            });
            return res.redirect("/?loginSuccess=true");
          });
        } else {
          return res.redirect("/login?loginSuccess=failed");
        }
      }
    )(req, res, next);
  },

  logout: function (req, res, next) {
    req.logout();
    return res.redirect('/?loggedOut=true');
  },
};
