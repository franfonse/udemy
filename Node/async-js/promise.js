const p = new Promise((resolve, reject) => {
    // Kick off some async work
    // ...
    setTimeout(() => {
        resolve(1); // Pending --> resolved or fullfilled
        reject(new Error('message'));
    }, 2000);
});

p.then(result => console.log(result)).catch(err => console.log('Error', err.message));