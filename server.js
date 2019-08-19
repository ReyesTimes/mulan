const express = require('express');
const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');
const app = express();

require('dotenv').config();

app.use(express.json());

app.get('/', function (req, res) {
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
    //1/tENQHJvujRHTNo8r5pwHyJl7aQEJ1GoQzNvp-mse8O8

    transporter.sendMail({
        from: 'rated.mvp1@gmail.com',
        to: 'juan.reyes@sngular.com',
        subject: 'New contact form message', 
        text: 'blablabla'
    }, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log('Email send', data);
        }
    });

    res.status(200).send({ 'message': 'OH YEAH GET' })
});

app.listen(process.env.PORT || 8081);