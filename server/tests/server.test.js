const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('../server');
const { Todo } = require('../models/todo');

const todos = [
	{
		_id: new ObjectID(),
		text: 'First Test Todo'
	},
	{
		text: 'Second Test Todo'
	},
	{
		_id: new ObjectID(),
		text: 'Third Test Todo'
	}
];

beforeEach((done) => {
	Todo.remove({}).then(() => {
		return Todo.insertMany(todos);
	}).then(() => {
		done();
	})
});

describe('POST /todos', () => {
	it('should create a new todo', (done) => {
		var text = 'Test todo text';

		request(app)
			.post('/todos')
			.send({ text })
			.expect(200)
			.expect((res) => {
				expect(res.body.text).toBe(text);
				// expect(res.body).toBeA('array', 'It is not array')
			})
			.end((err, res) => {
				if (err) {
					done(err);
					return;
				}
				Todo.find({ text }).then((todos) => {
					expect(todos.length).toBe(1);
					expect(todos[0].text).toBe(text);
					done();
				}).catch((err) => {
					done(err);
					return;
				})
			})
	});

	it('should create todo with invalid body data', (done) => {
		request(app)
			.post('/todos')
			.send({})
			.expect(400)
			.end((err, res) => {
				if (err) {
					done(err);
					return;
				}
				Todo.find().then((todos) => {
					expect(todos.length).toBe(3);
					done();
				}).catch((err) => {
					done(err);
					return;
				});
			});
	});
});

describe('GET /todos', () => {
	it('should get all todos', (done) => {
		request(app)
			.get('/todos')
			.expect(200)
			.expect((res) => {
				expect(res.body.todos.length).toBe(3)
			})
			.end(done)
	})
});

describe('GET /todos/:id', () => {
	it('should return a todo doc', (done) => {
		request(app)
			.get(`/todos/${todos[0]._id.toHexString()}`)
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.text).toBe(todos[0].text);
			})
			.end(done)
	});

	it('should return 404 if todo not found', (done) => {
		request(app)
			.get(`/todos/${new ObjectID().toHexString()}`)
			.expect(404)
			.end(done)
	});

	it('should return 404 for non object IDs', (done) => {
		request(app)
			.get(`/todos/${123}`)
			.expect(404)
			.end(done)
	});
});

describe('DELETE /todos/:id', () => {
	it('should remove a todo doc', (done) => {
		const hexId = todos[0]._id.toHexString();
		request(app)
			.delete(`/todos/${hexId}`)
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.text).toBe(todos[0].text);
			})
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				Todo.findById(hexId).then((todo) => {
					console.log(todo)
					expect(todo).toBeNull();
					done();
				}).catch((err) => {
					done(err);
				});
			});
	});

	it('should return 404 if todo not found', (done) => {
		request(app)
			.delete(`/todos/${new ObjectID().toHexString()}`)
			.expect(404)
			.end(done)
	});

	it('should return 404 for non object IDs', (done) => {
		request(app)
			.delete(`/todos/${123}`)
			.expect(404)
			.end(done)
	});
});