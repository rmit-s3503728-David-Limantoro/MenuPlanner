/**
 * ResetPassController
 *
 * @description :: Server-side logic for managing resetpasses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const nodemailer = require('nodemailer');
var uuid = require('node-uuid');

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
  resetPassword: function (req, res, next) {
    var credential = req.body.login;
    User.findOne({
      or: [
        { username: credential },
        { email: credential }
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
