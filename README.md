# Todo list exercise

## Install

- Install https://nodejs.org/en/
- Download archive from link provided
- Unzip file and cd into it
- run `npm install`

## Run
`npm start`

## Run Tests
First, install `mocha` and `supertest`

```
npm install --save-dev mocha supertest
```

And then run

```
npm test
```

## High level application requirements
1. Multiple users should be able to view the shared public todo list
2. Should be able to add items
3. Should be able to delete items
4. Should be able to edit items (Missing feature)
5. Must be able to deploy in docker (Missing feature)

## Tasks
1. Add missing requirement #4 to the application
2. Add sufficient test coverage to the application and update readme on howto run the tests
3. Add missing requirement #5 to the application (Dockerfile and update readme with instructions)

## Bonus
4. Display test coverage after tests are executed
5. Find and fix the XSS vulnerability in the application. Also make sure that it wont happen again by including a test.

> ### Notes
> - Update the code as needed and document what you have done in the readme below
> - Will be nice if you can git tag the tasks by number

## Solution

### Task 1:

* Added a PUT endpoint with a path of `'/todo/update/:id'` to app.js, this allows a todolist item to be updated by specifying the index of the todolist item via the `id` query string parameter and the value of the todolist item via the `updatedtodo` parameter in the body of the request.
* Installed the `method-override` module and configured the Express application so that it makes use of `methodOverride('_method')` to allow PUT requests from UI `<form>` elements by specifying the `_method=PUT` query string as part of the form action.
* Added an edit button(✎) to the left of each todo item, this button displays an edit section once clicked and contains the following elements: a `<form>` that posts to the `'/todo/update/:id?_method=PUT'` path, an `<input>` box used to change the todo item value, a confirm(✔) button to post the form, and a cancel(🗙) button to cancel the edit process.
* Added a few functions to the `<script>` elment of the todo.ejs file, these functions control the toggle of the edit section for each todo item.
* Added start script(`"start": "node app.js"`) to `package.json` which allows the app to be run with the following command: `npm start`

### Task 2:
* Installed `mocha` and `supertest` with the following command: `npm install --save-dev mocha supertest`. `supertest` is used to test the express app endpoints. `mocha` is the test framework needed to run the tests.
* Created a `test` folder in the root of the app as this is where `mocha` looks for tests to run.
* Added a `app.test.js` file to the `test` folder that contains the tests for `app.js`.
* Export the app(`module.exports.app = app;`) and todolist(`module.exports.todolist = todolist;`) in `app.js`, this was done as `app.test.js` requires `app` for supertest and the `todolist` for assertion.
*  Added tests to `app.test.js` for all endpoints of the app. I made use of `supertest` to test the GET, PUT and POST endpoints of the app, and made use of the `mocha` `assert` module to do assertion on the `todolist`. 
* Added test script(`"test": "mocha"`) to `package.json` which allows the application tests to be run with the following command: `npm test`

