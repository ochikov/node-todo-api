// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
	if (err) {
		console.log('Unable to connect to database server');
		return;
	}
	console.log('Success connected!');
	const db = client.db('TodoApp');
	// db.collection('Todos').insertOne({
	// 	text: 'Eat lunch',
	// 	completed: 'false'
	// }, (err, result) => {
	// 	if (err) {
	// 		console.log('Unable to insert todo', err);
	// 		return;
	// 	}

	// 	console.log(JSON.stringify(result.ops, undefined, 2));
	// })

	db.collection('Users').insertOne({
		name: 'Ogi',
		age: 25,
		location: 'Botevgrad'
	}, (err, result) => {
		if (err) {
			console.log('Unable to insert user in users', err);
			return;
		}
		console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
	});
	client.close();
});