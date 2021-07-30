const express = require('express');
const app = express();
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const { User, initData } = require('./initDB')
//Global variables
const ObjectID = require("mongoose").Types.ObjectId;

let login = false;
let msg = "";
let user = null;
let projects = [];
//Body parser

app.use(express.urlencoded({ extended: true }));

// EJS
app.set('view engine', 'ejs');

// Public Folder
app.use(express.static('./public'));

//APIS
app.get('/', async (req, res) => {
    const result = await User.find({});
    if (result.length === 0) {
        initData();
        res.redirect('/')
    }
    else {
        user = result[0];
        res.render('index', { login, user: result[0] });
    }
})
app.get('/login', (req, res) => {
    res.render('login', { login, msg })
})
app.get('/update', (req, res) => {
    if(user==null){
        res.redirect('/')
    }
    res.render('update', { login, user, msg })
})

app.get('/logout', (req, res) => {
    login = false;
    res.redirect('/')
})

app.post('/login', async (req, res) => {
    const { uname, password } = req.body;
    const result = await User.findOne({
        email: uname, password
    });
    if (!result) {
        msg = "No User Found!"
        res.redirect('/login');
        return;
    }
    msg = ""
    login = true;
    user = result;
    res.redirect('/')
})

app.post('/update', async (req, res) => {
    const { id, name, email, education, skills, about, projectId, projectName, startDate, endDate, projectDesc } = req.body;
    if (!ObjectID.isValid(id)) {
        return res.status(400).send("<h1>No record found with the given id</h1>");
    }
    const existUser = await User.findOne({ _id: id });
    if (!existUser) {
        msg = "Sorry! No User Found!";
        login = false;
        res.redirect('/login');
        return;
    }
    const newProjects = [];
    if (projectId=="null") {
        const newProject = {
            projectName,
            startDate,
            endDate,
            projectDesc
        };
        newProjects.push(newProject);
    }
    existUser.projects.forEach(item => {
        if (item._id == projectId) {
            item.projectName = projectName;
            item.startDate = startDate;
            item.endDate = endDate;
            item.projectDesc = projectDesc;
        }
        newProjects.push(item)
    });

    const newUser = {
        name,
        email,
        education,
        skills: skills.split(",").map(item => item.trim()),
        about,
        projects: newProjects.sort()
    }
    
    const result = await User.updateOne({ email: existUser.email }, {
        $set: newUser
    });
    user = result;
    res.redirect('/')
})


const port = 4400;

app.listen(port, () => console.log(`Server started on port ${port}`));