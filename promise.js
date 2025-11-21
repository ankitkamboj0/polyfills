function myPromise(executer){
    let onResolve,
    onReject,
    value,
    isFullfilled=false,
    isRejected=false,
    isCalled = false;
    

    function resolve(val){
        isFullfilled=true;
        value = val;
        if(typeof onResolve === 'function'){
            onResolve(val);
            isCalled=true;
        }
    }
    function reject(val){
        isRejected=true;
        value=val;
        if(typeof onReject === 'function'){
            onReject(val);
            isCalled=true;
        }
    }
    this.then = function(callback){
        onResolve = callback;
        if(isFullfilled && !isCalled){
            onResolve(value);
            isCalled=true;
        }
        return this;
    }
    this.catch = function(callback){
        onReject = callback;
        if(isRejected && !isCalled){
            onReject(value);
            isCalled=true;
        }
        return this;
    }
    try {
        executer(resolve,reject);
    } catch (error) {
        reject(error);
    }
}

myPromise.resolve = (val) => new myPromise((resolve, reject)=>{
    resolve(val);
});

const pro = new myPromise((res,rej)=>{
    setTimeout(() => {
        rej("20")
    }, 2000);
})

pro.then((res)=>console.log(res)).catch((err)=>console.error("Failed",err));

// promise.all polyfill

const pro1 = myPromise.resolve(10);


pro1.then((res)=>console.log("custom",res));

class MyPromiseClass {
    constructor(executer){
        this.onResolve = null
        this.onReject = null
        this.value=null
        this.isFullfilled=false
        this.isRejected=false
        this.called=false

        const resolve = (val)=>{
            console.log("inside resolve")
            this.value=val;
            this.isFullfilled=true;
            if(typeof this.onResolve === 'function'){
                this.onResolve(val);
                this.called=true;
            }
        }
        const reject = (val) =>{
            this.value=val;
            this.isRejected=true;
            if(typeof this.onReject === 'function'){
                this.onReject(val);
                this.called=true;
            }
        }
        try {
            executer(resolve,reject);
        } catch (error) {
            reject(error);
        }
    }
    then(callback){
        this.onResolve = callback;
        if(this.isFullfilled && !this.called){
            this.onResolve(this.value)
            this.called=true;
        }
        return this
    }
    catch(callback){
        this.onReject=callback;
        if(this.isRejected && !this.called){
            this.onReject(this.value);
            this.called=true
        }
        return this;
    }
}

let promise = new MyPromiseClass((res,rej)=>{
    // setTimeout(()=>{
        rej("test class promise")
    // },1000)
});

promise.then((res)=>console.log(res)).catch((err)=>console.log(err));
