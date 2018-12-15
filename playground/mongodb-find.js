// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
	if (err) {
		console.log('Unable to connect to database server');
		return;
	}
	console.log('Success connected!');
	const db = client.db('TodoApp');
	// db.collection('Todos').find({ _id: new ObjectID('5c14ee5a03b38f19aa03227b') }).toArray().then((docs) => {
	// 	console.log('Todos:');
	// 	console.log(JSON.stringify(docs, undefined, 2));
	// }, (error) => {
	// 	console.log('Unable to fetch Todos', error)
	// })

	db.collection('Todos').find().count().then((count) => {
		console.log('Todos:');
		console.log('Todos Count: ', count)
		// console.log(JSON.stringify(docs, undefined, 2));
	}, (error) => {
		console.log('Unable to fetch Todos', error)
	})

	db.collection('Users').find().count().then((count) => {
		console.log('Todos Number is: ', count)
	}, (err) => {
		console.log('Unable to fetch USERS', err)
	})

	db.collection('Users').find({ name: 'Ogi' }).toArray().then((docs) => {
		console.log(JSON.stringify(docs, undefined, 2));
	}, (err) => {
		console.log('Unable to fetch USERS:', err);
	});
	client.close();
});