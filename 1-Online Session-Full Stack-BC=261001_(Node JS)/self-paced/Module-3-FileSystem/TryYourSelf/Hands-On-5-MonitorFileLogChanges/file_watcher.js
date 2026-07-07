const fs =require('fs') ;

fs.watchFile('sample.txt', (current) =>{

    console.log('File was changed at ' + current.atime) ;

}) ;