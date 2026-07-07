const fs = require('fs') ;

console.log("Done before reading file asynchronously") ;

fs.readFile('sample.txt', (error, data) =>{
    if(error){
        console.log(error) ;
        return ;
    }
    console.log(data.toString()) ;
})
console.log("Done after reading fiel asynchronously") ;