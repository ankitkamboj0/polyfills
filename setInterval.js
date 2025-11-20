// Basic example

// setInterval(() => {
//     console.log('This message is logged every second');
// }, 1000);
let count = 0
const customSetInterval = (callback,delay,...args)=>{
    const timerId = Math.random().toString(36).substring(7);
    let isCleared = false;
    function repeat(){
        if(isCleared) return;
        callback(...args);
        setTimeout(repeat,delay);
    }

    setTimeout(repeat, delay);
    return {
        id:timerId,
        clear:()=>isCleared=true
    }
}

const interval = customSetInterval(()=>{
    count++
    console.log("interval calling", count);
},1000);

setTimeout(()=>{
    interval.clear();
},5000)