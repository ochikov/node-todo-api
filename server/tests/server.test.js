const expect = require('expect');
const request = require('supertest');

const { app } = require('../server');
const { Todo } = require('../models/todo');

beforeEach((done) => {
	Todo.remove({}).then(() => {
		done();
		return;
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
				Todo.find().then((todos) => {
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
					expect(todos.length).toBe(0);
					done();
				}).catch((err) => {
					done(err);
					return;
				});
			});
	});
})