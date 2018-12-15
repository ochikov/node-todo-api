// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoAppPlay', (err, client) => {
	if (err) {
		console.log('Unable to connect to database server');
		return;
	}
	console.log('Success connected!');
	const db = client.db('TodoAppPlay');

	db.collection('Todos').findOneAndUpdate({
		_id: new ObjectID('5c15183939916449dbbdafbd')
	}, {
			$set: {
				completed: true
			}
		}, { returnOriginal: false }).then((res) => {
			console.log(res)
		})

	db.collection('Users').findOneAndUpdate(
		{ _id: new ObjectID('5c151d1d8da79457ebc75ef7') },
		{ $set: { name: 'Chikov', location: 'Sofia' }, $inc: { age: 1 } },
		{ returnOriginal: false }).then((result) => {
			console.log(result);
		});
	// client.close();
});