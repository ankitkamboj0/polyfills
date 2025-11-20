const timer = {}
const customSetTimeout = (callback,delay,...args)=>{
  const timerId = Math.random().toString(36).substring(7);
  const start = Date.now();
  timer[timerId] = true;
  function check(){
    if(!timer[timerId]) return;
    if(Date.now()-start >= delay){
        callback(...args);
      delete timer[timerId];
    }else{
      requestAnimationFrame(check);
    }
  }
  
  requestAnimationFrame(check);
  return timerId;
}

const  clearCustomTimeout = (timerId)=>{
  delete timer[timerId];
}

const test = customSetTimeout(()=>{
  console.log("test")
},5000)

// clearCustomTimeout(test);
