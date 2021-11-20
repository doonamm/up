//dung JSON.method de parse tu json sang obj hay de stringify tu obj sang json
const json_string = '{"name": "Do Dang Kien Nam", "age": "19"}';

const obj = JSON.parse(json_string);

console.log('Name: ', obj.name);
console.log('Age: ', obj.age);
console.log('----\nObject:', obj);

const string = JSON.stringify(obj);

console.log('---\nString:', string);

const persist = require('node-persist');
persist.init({
    dir: __dirname + '/session',
    expiredInterval: false,
    ttl: 2000
}).then(()=>{
    persist.setItem('student1', string);
    // persist.getItem('student').then(content => console.log(content));
});

const crypto = require('crypto-js');

const message = crypto.AES.encrypt('Content that need encrypted', 'itsasecret123').toString();

console.log(message);

const bytes = crypto.AES.decrypt(message, 'itsasecret123');

const message_decode = bytes.toString(crypto.enc.Utf8);

console.log(message_decode);

console.log(__filename);