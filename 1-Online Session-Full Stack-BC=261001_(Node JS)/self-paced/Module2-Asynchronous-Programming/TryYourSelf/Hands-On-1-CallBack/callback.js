function timer(time, callback){
    setTimeout(()=>{
        callback(time)
    }, time)
}

timer(2000, (x) =>{
    console.log(`Done after ${x}ms`)
})