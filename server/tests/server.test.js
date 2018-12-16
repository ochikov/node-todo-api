const expect = require('expect');
const request = require('supertest');

const { app } = require('../server');
const { Todo } = require('../models/todo');

const todos = [
	{
		text: 'First Test Todo'
	},
	{
		text: 'Second Test Todo'
	},
	{
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