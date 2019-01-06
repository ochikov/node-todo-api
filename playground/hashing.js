const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var data = {
	id: 10
}

var password = '123abc!';
var hashedPassword = '$2a$10$SWR57EDyglvv8UEU3QHfgu9UmSfMu5cj9YUtts7AQiV3HyUE83weO'

bcrypt.genSalt(10, (err, salt) => {
	bcrypt.hash(password, salt, (err, hash) => {
		hashedPassword = hash;
	});
});

bcrypt.compare(password, hashedPassword, (err, result) => {
	console.log(result);
});

// var message = 'I am user number 1';
// var hash = SHA256(message).toString();
// console.log(hash);

// var data = {
// 	id: 4
// }

// var token = {
// 	data,
// 	hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }

// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if (resultHash === token.hash) {
// 	console.log('DATA WAS NOT CHANGED');
// } else {
// 	console.log('DATA WAS CHANGED DONT TRUST');
// }

// var token = jwt.sign(data, '123abc');
// console.log(token);

// var decoded = jwt.verify(token, '123abc');
// console.log(decoded)
