function fakePromise(time, data) {
    return new Promise((resolve, reject) => {
        // Optional: Add validation
        if (typeof time !== 'number' || time < 0) {
            reject(new Error('Time must be a positive number'));
            return;
        }
        
        setTimeout(() => {
            resolve(data); // data is already a JSON object
        }, time);
    });
}

async function dataTimer(time, data) {
    let timerCall = await fakePromise(time, data);
    return timerCall;
}

let data = {
    name: "Uma",
    phone: "9737497923"
};

dataTimer(5000, data)
    .then(result => {
        console.log(result); // Output: { name: 'Uma', phone: '9737497923' }
    })
    .catch(error => {
        console.error('Error:', error.message);
    });