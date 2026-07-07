function timer(time){
    return new Promise((resolve, reject)=>{
        setTimeout(() =>{resolve(time)},time)
    }) ;
}

timer(2000).then(x => console.log(`Done after ${x}ms`))