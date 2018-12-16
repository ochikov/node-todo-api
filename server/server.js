var express = require('express');
var bodyParser = require('body-parser');
var { ObjectID } = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { Users } = require('./models/user');

var port = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
	var todo = new Todo({
		text: req.body.text
	});
	todo.save().then((doc) => {
		res.send(doc)
	}, (error) => {
		res.status(400).send(error);
	})
});

app.get('/todos', (req, res) => {
	Todo.find().then((todos) => {
		res.send({ todos })
	}, (error) => {
		res.status(400).send(error)
	});
});

app.get('/todos/:id', (req, res) => {
	var id = req.params.id;
	if (!ObjectID.isValid(id)) {
		res.status(404).send({ error: 'Invalid ID' });
	}
	Todo.findById(id).then((todo) => {
		if (!todo) {
			res.status(404).send({ error: 'There is no todo with this ID' });
		}
		res.send({ todo });
	}).catch((error) => {
		res.status(400).send({ error: 'Unable to fetch the todo' });
	});
});


app.listen(port, () => {
	console.log('Started the app at port: ', port);
});

module.exports = {
	app
}