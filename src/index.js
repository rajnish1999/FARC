const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


require('./db/mongoose');
const departmentRouter = require('./routers/department');
const hospitalRouter = require('./routers/hospital');
const userRouter = require('./routers/user');
const landingPageRouter = require('./routers/landingPage');

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname,'views'));

const port = process.env.PORT || 3000;

// app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

app.use(departmentRouter);
app.use(hospitalRouter);
app.use(userRouter);
app.use(landingPageRouter);

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})
