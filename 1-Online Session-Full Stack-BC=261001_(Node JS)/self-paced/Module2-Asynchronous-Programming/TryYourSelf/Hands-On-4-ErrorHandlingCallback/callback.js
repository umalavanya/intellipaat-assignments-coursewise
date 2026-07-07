function multiplyEvenNumbers(x,y,callback){
    if ((x%2 !== 0) || (y%2 !== 0) ){
        setTimeout(() => {
            callback("Invalid input!!")
            
        }, 2000);

    } else {
        setTimeout(() =>{
            callback(null, x*y)
        }, 2000)
    }
}


multiplyEvenNumbers(7,9,(error, result) =>{

    if(error != null){
        console.log(error) ;
        return ;
    }
    console.log(result) ;

})

multiplyEvenNumbers(8,10,(error, result) =>{

    if(error != null){
        console.log(error) ;
        return ;
    }
    console.log(result) ;

})