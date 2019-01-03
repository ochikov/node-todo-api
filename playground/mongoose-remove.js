const { ObjectID } = require('mongodb');
const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');

// Todo.remove({}).then((result) => {
// 	console.log(result);
// });

//Todo.findOneAndRemove
//Todo.findByIdAndRemove

// Todo.findByIdAndRemove('5c2e7d093f3e7ddc92ecc262').then((todo) => {
// 	console.log(todo);
// })

Todo.findOneAndRemove({
	_id: '5c2e7d0a341236dcb1b324da'
}).then((doc) => {
	console.log(doc);
})