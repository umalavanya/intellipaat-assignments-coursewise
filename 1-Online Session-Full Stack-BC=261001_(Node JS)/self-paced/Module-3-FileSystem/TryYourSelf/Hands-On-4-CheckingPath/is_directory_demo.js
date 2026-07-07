const fs = require('fs') ;

fs.stat("check", (error, stats) => {
    if(error) {
        console.log(error) ;
        return ;
    }

    if(stats.isDirectory()){
        console.log("Given path is a directory")
    } else if (stats.isFile()){
        console.log("Given path is a file")
    }

}) ;


fs.stat("sample.txt", (error, stats) => {
    if(error) {
        console.log(error) ;
        return ;
    }

    if(stats.isDirectory()){
        console.log("Given path is a directory")
    } else if (stats.isFile()){
        console.log("Given path is a file")
    }

}) ;


