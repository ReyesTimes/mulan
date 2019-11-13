const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const renderMessage = require('./mail/renderMessage.js');
module.exports = function (req, res) {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
  }
  
  const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          type: 'OAuth2',
          user: process.env.EMAIL,
          clientId: process.env.CLIENTID,
          clientSecret: process.env.CLIENTSECRET,
          refreshToken: process.env.REFRESHTOKEN,
          accessToken: process.env.ACCESSTOKEN,
      }
  });

  transporter.sendMail({
      from: req.body['email'],
      to: 'contacto@ssrefiscales.com.mx',
      subject: `Nuevo mensaje de ${req.body['name']} por medio del sitio Web.`,
      text: renderMessage(req.body)
  }, function (err) {
      if (!err) {
          res.status(200).send({ 'message': 'Email sending' })
      } else {
          res.status(500).send({ 'message': 'Error send email' })
      }
  });
};