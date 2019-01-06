const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');
var data = {
	id: 10
}
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

var token = jwt.sign(data, '123abc');
console.log(token);

var decoded = jwt.verify(token, '123abc');
console.log(decoded)
