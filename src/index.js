const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

require('./db/mongoose');
const Department = require('./models/department');
const Hospital = require('./models/hospital');

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

const port = process.env.PORT || 3000;

// app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");


app.get('/', (req, res) => {
    Department.find({}).then((departments) => {
        // console.log(departments);
        res.render('index.ejs', {
            departments
        });
    })
});

app.get('/department', (req, res) => {
    Department.find({}).then((departments) => {
        res.status(200).send(departments);
    }).catch((e) => {
        res.status(500).send();
    })
})

app.get('/add_department', (req, res) => {
    res.render('dept_add');
})

app.post('/add_department', (req, res) => {
    const department = new Department(req.body)

    department.save().then(() => {
        res.redirect('/');
    }).catch((e) => {
        res.status(400).send(e);
    })
})

app.get('/deptWiseHosp/:dept_id', (req, res) => {
    const id = req.params.dept_id;
    
    Department.find({deptId: id}).then((department) => {
            console.log(department);
    }).catch((error) => {
        console.log("error : "+error);
    })
})

app.get('/hospital', (req, res) => {
    Hospital.find({}).then((hospitals) => {
        res.status(200).send(hospitals);
    }).catch((e) => {
        res.status(500),send(e);
    })
})

app.post('/hospital', (req, res) => {
    const hospital = new Hospital(req.body)
    // console.log(req.body);
    hospital.save().then(() => {
        res.status(201).send(hospital);
        console.log("post hosp");
    }).catch((error) => {
        res.status(400).send(error);
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})

console.log(__filename);