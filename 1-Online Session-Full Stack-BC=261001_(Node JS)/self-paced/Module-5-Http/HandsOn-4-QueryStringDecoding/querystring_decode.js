const querystring = require("querystring") ;
const qs = "name=myname&password=mypassword" ;

console.log(querystring.decode(qs) ) ;