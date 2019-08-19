const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.json());

app.get('/', function (req, res) {
    const transporter = nodemailer.createTransport({
        sendmail: true,
        newline: 'unix',
        path: '/usr/sbin/sendmail'
    });

    transporter.sendMail({
        from: 'juan.reyes@sngular.com',
        to: 'rated.mvp1@gmail.com',
        subject: 'New contact form message',
        text: 'blablabla'
    });

    res.status(200).send({ 'message': 'OH YEAH GET' })
});

app.listen(process.env.PORT || 8081);