const fs = require('fs') ;

console.log("Done before reading file synchronously") ;

const data = fs.readFileSync('sample.txt') ;

console.log(data.toString()) ;

console.log('Done after reading file synchronously') ;