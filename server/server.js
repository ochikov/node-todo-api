var express = require('express');
var bodyParser = require('body-parser');

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
})


app.listen(port, () => {
	console.log('Started the app at port: ', port);
});

module.exports = {
	app
}