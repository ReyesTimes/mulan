const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const { check, validationResult } = require('express-validator');

const app = express();

const renderMessage = require('./mail/renderMessage.js');

require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post('/', [
    check('email').isEmail(),
    check('description').isLength({ min: 10 }),
    check('name').isLength({ min: 3 }),
],function (req, res) {
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
        to: 'juan.reyes@sngular.com',
        subject: `Nuevo mensaje de ${req.body['name']} por medio del sitio Web.`,
        text: renderMessage(req.body)
    }, function (err, data) {
        if (!err) {
            res.status(200).send({ 'message': 'Email sending' })
        } else {
            res.status(500).send({ 'message': 'Error send email' })
        }
    });
});

app.listen(process.env.PORT || 8081);
