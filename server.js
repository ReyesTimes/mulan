const express = require('express');
const nodemailer = require('nodemailer');
const validator = require('validator');
const xssFilters = require('xss-filters');
const bodyParser = require('body-parser')
const app = express();

require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const rejectFunctions = new Map([
    [ 'name', v => v.length < 5 ],
    [ 'email', v => !validator.isEmail(v) ],
    [ 'telephone', v => v.length < 5 ],
    [ 'description', v => v.length < 5 ]
])

const validateAndSanitize = (key, value) => {
    // If map has key and function returns false, return sanitized input. Else, return false
    return rejectFunctions.has(key) && !rejectFunctions.get(key)(value) && xssFilters.inHTMLData(value)
}

/*app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});*/

app.post('/', function (req, res) {
    const attributes = ['name', 'email', 'description', 'telephone'];

    // Map each attribute name to the validated and sanitized equivalent (false if validation failed)
    const sanitizedAttributes = attributes.map(n => validateAndSanitize(n, req.body[n]))

    // True if some of the attributes new values are false -> validation failed
    const someInvalid = sanitizedAttributes.some(r => !r)

    console.log(someInvalid, ':D');
    /*const transporter = nodemailer.createTransport({
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
        from: 'rated.mvp1@gmail.com',
        to: 'contacto@ssrefiscales.com.mx',
        subject: 'Nuevo mensaje de contacto', 
        text: 'blablabla'
    }, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log('Email send', data);
        }
    });*/

    res.status(200).send({ 'message': 'OH YEAH GET' })
});

app.listen(process.env.PORT || 8081);
