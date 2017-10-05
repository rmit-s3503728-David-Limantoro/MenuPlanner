/**
 * ResetPassController
 *
 * @description :: Server-side logic for managing resetpasses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const nodemailer = require('nodemailer');

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

      var mailOptions = {
        from: emailAddr,
        to: user.email,
        subject: 'Your lost password',
        text: 'Your password is ',
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          return res.redirect("/pwdreset?passRequest=false");
        } else {
          return res.redirect("/pwdreset?passRequest=true");
        }
      });
    });
  },
};
