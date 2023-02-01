const express = require("express");
const app = express();
const models = require('./database/models');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/", (req, res) => {
    models.Question.findAll({raw: true, order: [['id', 'DESC']]}).then(questions => res.render("index.ejs", {questions}));
});

app.get("/question", (req, res) => {
    res.render("questions.ejs");
});

app.get("/question/:id", (req, res) => {
    var id = req.params.id;

    models.Question.findOne({
        where: {id: id}
    })
    .then(question => {
        if (!question)
            res.redirect("/");

        models.Response.findAll({
            where: {questionId: question.id},
            order: [['id', 'DESC']]
        }).then(replies => {
            res.render("question.ejs", {question, replies});    
        })  
    });
});

app.post("/question", (req, res) => {
    var title = req.body.title;
    var description = req.body.description;
    
    models.Question.create({
        title: title,
        description: description
    })
    .then(() => res.redirect("/question"));
});

app.post("/reply", (req, res) => {
    var reply = req.body.reply
    var questionId = req.body.questionId

    console.log(reply, questionId);

    models.Response.create({
        body: reply,
        questionId: questionId
    })
    .then(() => res.redirect("/question/" + questionId));
});

app.listen(8080, ()=> {
    console.log("Running!");
});