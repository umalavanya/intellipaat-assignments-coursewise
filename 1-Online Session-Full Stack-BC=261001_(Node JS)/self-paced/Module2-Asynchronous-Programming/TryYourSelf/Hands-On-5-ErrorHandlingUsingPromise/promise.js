function multiplyEvenNumbers(x,y){

    return new Promise((resolve, reject) =>{

        setTimeout(() =>{
            if ((x%2 !== 0) || (y%2 !== 0)){
                reject("Invalid Input")
            } else {
                resolve(x*y) ;
            }
        }, 2000) ;

    })

}


multiplyEvenNumbers(7,9)
.then((result)=>{
    console.log(result) ;
})
.catch(error =>console.log(error)) ;


multiplyEvenNumbers(8,10)
.then((result)=>{
    console.log(result) ;
})
.catch(error =>console.log(error)) ;