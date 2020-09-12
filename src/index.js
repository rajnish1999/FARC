const express = require('express');
require('./db/mongoose');

const department = require('./models/department');
const hospital = require('./models/hospital');
const test = require('./models/test');

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})