const { ObjectID } = require('mongodb');
const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');

const id = '5c166715bcf7095f73651c09';
if (!ObjectID.isValid(id)) {
	console.log('Id not valid')
	return;
}
// Todo.find({
// 	_id: id
// }).then((todos) => {
// 	console.log(todos)
// });

// Todo.findOne({
// 	_id: id
// }).then((todos) => {
// 	console.log(todos)
// });

// Todo.findById(id).then((todo) => {
// 	if (!todo) {
// 		console.log('Id not found!')
// 		return;
// 	}
// 	console.log(todo)
// }).catch((err) => {
// 	console.log(err)
// })
const userId = '5c1531f99f4d39f5bb6eb35b'

if (!ObjectID.isValid(userId)) {
	console.log('User Id is not valid');
	return;
}

User.findById(userId).then((user) => {
	if (!user) {
		console.log('Id not found');
		return;
	}
	console.log(user)
}).catch((err) => {
	console.log(err);
})