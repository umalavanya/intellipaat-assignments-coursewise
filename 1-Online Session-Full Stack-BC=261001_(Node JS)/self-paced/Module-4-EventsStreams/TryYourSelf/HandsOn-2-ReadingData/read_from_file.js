const fs = require('fs') ; 
const readStream = fs.createReadStream('sample.txt') ;

readStream.on("data", (data) => {
    let chunk = data.toString() ;
    console.log(chunk) ;
})
