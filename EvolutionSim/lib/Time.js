class Time{

    constructor(parent = null){
        this.parent = parent;

        this.runTime = 0;
        this.deltaTime;
        this.waitFunc = [];
    }

    update(){
        this.deltaTime = deltaTime / 1000;
        this.runTime += this.deltaTime;
        for(let i = 0; i < this.waitFunc.length; i++){
            if(this.waitFunc[i].startTime < this.runTime){
                this.waitFunc[i].parent[this.waitFunc[i].funcName](...this.waitFunc[i].args);
                this.waitFunc.splice(i, 1);
            }
        }
    }

    delayedFunction(parent = this.parent, functionName, waitTime, args = []){
        const newElement = {
            parent: parent,
            funcName: functionName,
            startTime: waitTime + this.runTime,
            args
        }

        newElement.args = args;

        this.waitFunc.push(newElement);
    }

    isWaiting(funcName){
        let isWaiting = false;
        for(i = 0; i < this.waitFunc.length; i++){
            if(this.waitFunc[i].funcName == funcName){
                isWaiting = true;
            }
        }
        return isWaiting;
    }
}