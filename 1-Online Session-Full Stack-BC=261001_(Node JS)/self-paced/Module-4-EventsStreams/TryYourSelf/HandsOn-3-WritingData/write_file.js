const fs = require('fs') ;

const data = "Written using streams" ;

const writeStreams = fs.createWriteStream('demo.txt') ;

writeStreams.write(data) ;