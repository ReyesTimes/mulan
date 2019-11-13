const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { check } = require('express-validator');

const app = express();

require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post('/', [
    check('email').isEmail(),
    check('description').isLength({ min: 10 }),
    check('name').isLength({ min: 3 }),
], require('./mail.js'));

app.use('/personal', require('./personal.js'));

app.listen(process.env.PORT || 8081, function () {
    console.log('Server is ready');
});
