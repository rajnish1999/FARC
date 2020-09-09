const express = require('express');
require('./db/mongoose');

const department = require('./models/department');
const hospital = require('./models/hospital');
const test = require('./models/test');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());


app.listen(port, () => {
    console.log('Server is up on port ' + port);
})