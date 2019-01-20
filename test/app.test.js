const supertest = require('supertest');
const app = require('../app');
const assert = require('assert');
const xss = require("xss");
const scriptString = '<script>alert("xss");</script>';
const leadAndTrailString = '   leading and trailing spaces   ';
const filteredScriptString = xss(scriptString);
const trimmedLeadAndTrailString = leadAndTrailString.trim();

describe("my todolist page", () => 
{
    it("presents a todo list and allows the user to add, edit and delete todo items", (done) => 
    {
        supertest(app.app).get('/todo')
            .expect(200)
            .expect(/My todolist/, done)
    });
});

describe("add string to todo list", () => 
{
    it("adds the string to the todo list and navigates to my todolist page", (done) => 
    {
        let newTodo = 'New Todo';
        supertest(app.app).post('/todo/add/')
            .type('form')
            .send({ newtodo: newTodo })
            .expect('Location', /\/todo/)
            .expect(function (res) 
            {
                return assert.notEqual(app.todolist.find(x => x === newTodo), undefined);
            }).expect(302, done);
    });
});

describe("add empty string to todo list", () => 
{
    it("does not add the empty string to the todo list and navigates to my todolist page", (done) => 
    {
        let newTodo = '';
        supertest(app.app).post('/todo/add/')
            .type('form')
            .send({ newtodo: newTodo })
            .expect('Location', /\/todo/)
            .expect(function (res) 
            {
                return assert.equal(app.todolist.find(x => x === newTodo), undefined);
            }).expect(302, done);
    });
});

describe("add string with leading and trailing spaces to todo list", () => 
{
    it("adds the string without the leading and trailing spaces to the todo list and navigates to my todolist page", (done) => 
    {
        supertest(app.app).post('/todo/add/')
            .type('form')
            .send({ newtodo: leadAndTrailString })
            .expect('Location', /\/todo/)
            .expect(function (res) 
            {
                return assert.notEqual(app.todolist.find(x => x === trimmedLeadAndTrailString), undefined);
            }).expect(302, done);
    });
});

describe("add script string to todo list", () => 
{
    it("adds the filtered script string to the todo list and navigates to my todolist page", (done) => 
    {
        supertest(app.app).post('/todo/add/')
            .type('form')
            .send({ newtodo: scriptString })
            .expect('Location', /\/todo/)
            .expect((res) => 
            {
                return assert.notEqual(app.todolist.find(x => x === filteredScriptString), undefined);
            }).expect(302, done);
    });
});

describe("update todo list item string", () => 
{
    it("updates the todo list item string and navigates to my todolist page", (done) => 
    {
        let updatedTodo = 'Updated Todo';
        let index = 0;
        supertest(app.app).put('/todo/update/' + index)
            .type('form')
            .send({ updatedtodo: updatedTodo })
            .expect('Location', /\/todo/)
            .expect((res) => 
            {
                assert.equal(app.todolist[index], updatedTodo);
            }).expect(302, done);
    });
});

describe("update todo list item string to empty string", () => 
{
    it("does not update the todo list item string to an empty string and navigates to my todolist page", (done) => 
    {
        let updatedTodo = '';
        let index = 0;
        supertest(app.app).put('/todo/update/' + index)
            .type('form')
            .send({ updatedtodo: updatedTodo })
            .expect('Location', /\/todo/)
            .expect((res) => 
            {
                assert.notEqual(app.todolist[index], updatedTodo);
            }).expect(302, done);
    });
});

describe("update todo list item string to string with leading and trailing spaces", () => 
{
    it("updates the todo list item string to the string with the leading and trailing spaces and navigates to my todolist page", (done) => 
    {
        let index = 0;
        supertest(app.app).put('/todo/update/' + index)
            .type('form')
            .send({ updatedtodo: leadAndTrailString })
            .expect('Location', /\/todo/)
            .expect((res) => 
            {
                assert.equal(app.todolist[index], trimmedLeadAndTrailString);
            }).expect(302, done);
    });
});

describe("update todo list item string to a script string", () => 
{
    it("updates the todo list item string to the filtered script string and navigates to my todolist page", (done) => 
    {
        let index = 0;
        supertest(app.app).put('/todo/update/' + index)
            .type('form')
            .send({ updatedtodo: scriptString })
            .expect('Location', /\/todo/)
            .expect((res) => 
            {
                assert.equal(app.todolist[index], filteredScriptString);
            }).expect(302, done);
    });
});

describe("delete a todo list item", () => 
{
    it("deletes the todo list item and navigates to my todolist page", (done) => 
    {
        let index = app.todolist.findIndex(x => x == trimmedLeadAndTrailString);
        supertest(app.app).get('/todo/delete/' + index)
            .expect('Location', /\/todo/)    
            .expect((res) => 
            {
                assert.equal(app.todolist.find(x => x == trimmedLeadAndTrailString), undefined);
            }).expect(302, done);
    });
});