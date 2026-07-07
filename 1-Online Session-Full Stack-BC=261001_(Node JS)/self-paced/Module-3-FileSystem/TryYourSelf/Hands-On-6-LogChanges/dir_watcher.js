const fs =require('fs') ;

fs.watch('check', (event, filename) => {

    console.log(`${event} - ${filename}`) ;

})