const querystring = require('querystring') ;

const data = {
    'name' : 'myname',
    'password': 'mypassword',
} ;

console.log(querystring.encode(data)) ;