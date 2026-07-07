function multiplyEvenNumbers(x,y){
    return new Promise((resolve, reject) => {

        setTimeout(() => {
            if ((x%2 !== 0) || (y%2 !== 0)){

                reject("Invalid Input!!") ;

            }
                resolve(x*y) ;
            
        }, 2000) ;

    })
}


async function multiply(x,y){
    try{
        let result = await multiplyEvenNumbers(x,y) ;
        console.log(result) ;
    } catch(error){

        console.log(error)


    }
    
}


multiply(7,9) ;

multiply(8,10) ;