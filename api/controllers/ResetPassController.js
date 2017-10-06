/**
 * ResetPassController
 *
 * @description :: Server-side logic for managing resetpasses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const nodemailer = require('nodemailer');
var uuid = require('node-uuid');
var bcrypt = require('bcrypt');

var emailAddr = 'testert185@gmail.com';
var emailPass = 'something';

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: emailAddr,
    pass: emailPass
  }
});

module.exports = {
  resetChangePassword: function (req, res, next) {
    var token = req.body.token;
    var newPassword = req.body.password;
    var newPasswordRepeat = req.body.passwordRepeat;
    if (newPassword == "" || newPassword !== newPasswordRepeat) {
      res.redirect("/pwdreset?token=" + token + "&resetPassword=false");
    } else {
      ResetPassToken.findOne({
        token: token
      }).exec(function (err, match) {
        if (err) {
          return res.err()
        }

        bcrypt.hash(newPassword, 10, function (err, hash) {
          if (err) {
            res.redirect("/pwdreset?token=" + token + "&resetPassword=error");
          };
          newPassword = hash;
          User.update({
            email: match.associatedAccountEmail
          }, {
            password: newPassword,
          }).exec(function (err, user) {
            if (err) {
              res.redirect("/pwdreset?token=" + token + "&resetPassword=error");
            };
            return res.redirect("/?resetPassword=true");
          });
        });

      });
    }
  },

  requestPassReset: function (req, res, next) {
    var credential = req.body.login;
    User.findOne({
      or: [{
          username: credential
        },
        {
          associatedAccountEmail: credential
        }
      ],
    }).exec(function (err, user) {

      if (err || !user) {
        return res.redirect("/pwdreset?passRequest=false");
      }

      var token = uuid.v4();

      ResetPassToken.create({
        token: token,
        associatedAccountEmail: user.email
      }).exec(function (err, records) {

        var mailOptions = {
          from: emailAddr,
          to: user.email,
          subject: 'Your lost password',
          text: 'This is your password reset link (append this to the end of the website URL):\r\n\r\n"/pwdreset?token=' + token + '"',
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            return res.redirect("/pwdreset?passRequest=false");
          } else {
            return res.redirect("/pwdreset?passRequest=true");
          }
        });

      });
    });
  },
};
