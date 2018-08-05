const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
    id: 10
};

var token = jwt.sign(data, 'somesecret');
console.log("Token", token)

var decoded = jwt.verify(token, 'somesecret');
console.log('Decoded', decoded);

// var data = {
//     id: 4
// };

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// };

// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if (resultHash ===  token.hash)
// {
//     console.log('Message not changed');
// }
