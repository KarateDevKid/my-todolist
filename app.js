const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const xss = require("xss");

const app = express();
app.use(methodOverride('_method'));

let todolist = [];

/* The to do list and the form are displayed */
app.get('/todo', function(req, res) {
    res.render('todo.ejs', { todolist, clickHandler:"func1();" });
})

/* Adding an item to the to do list */
.post('/todo/add/', urlencodedParser, (req, res) => {
    let text = xss(req.body.newtodo);
    text = text.trim();
    if (text != '') {
        todolist.push(text);
    }
    res.redirect('/todo');
})

/* Updating an item in the to do list */
.put('/todo/update/:id', urlencodedParser, (req, res) => 
{
    let id = req.params.id;
    let text = xss(req.body.updatedtodo);
    text = text.trim();
    if(text != '' && id != '')
    {
         if(todolist[id])
         {
            todolist[id] = text;
         }
    }
    res.redirect('/todo');
})

/* Deletes an item from the to do list */
.get('/todo/delete/:id', function(req, res) {
    if (req.params.id != '') {
        todolist.splice(req.params.id, 1);
    }
    res.redirect('/todo');
})

/* Redirects to the to do list if the page requested is not found */
.use(function(req, res, next){
    res.redirect('/todo');
})

.listen(8080);

module.exports.app = app;
module.exports.todolist = todolist;