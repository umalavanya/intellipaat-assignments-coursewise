const fs = require('fs') ;

const readStream = fs.createReadStream('sample.txt') ;
const writeStream = fs.createWriteStream('new-sample.txt') ;

readStream.on("data", (chunk) =>{
 console.log(`writing '${chunk}' to new-sample.txt`) ;
 writeStream.write(chunk) ;


})


readStream.on("end", () => {

    console.log("Stream Ended") ;
    writeStream.end() ;

})