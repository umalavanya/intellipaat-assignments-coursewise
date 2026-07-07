function timer(time){
    return new Promise((resolve,reject)=>{
        setTimeout(() =>{resolve(time)},time)
    }) ;
}

async function sleep(time){
    let result = await timer(time) ;
    console.log(`Done after ${time}ms`)
}

sleep(2000) ;