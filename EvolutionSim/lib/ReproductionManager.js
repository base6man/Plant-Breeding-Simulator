class ReproductionManager{
    constructor(){
        this.reproductions = [];

        this.p1 = null;
        this.p2 = null;
        this.matingStep = 0; // 0: not started, 1: got first plant, 2: second plant, 3: done
    }

    update(){
        this.checkForMating();
    }

    updateImage(){
        push();
            noFill();
            //strokeWeight(4);
            if(this.p1){ 
                coords = mapToGrid(this.p1.x, this.p1.y, this.p1.scale, this.p1.scale);
                rect(coords.x, coords.y, this.p1.scale, this.p1.scale); 
            }
            if(this.p2){ 
                coords = mapToGrid(this.p2.x, this.p2.y, this.p2.scale, this.p2.scale);
                rect(coords.x, coords.y, this.p2.scale, this.p2.scale); 
            }
        pop();
    }

    checkForMating(){
        if(mouse.leftClick && mouse.changed){

            if(mouse.hoveredPart == this.p1){
                if(this.p2){ 
                    this.p1 = this.p2;
                    this.p2 = null;
                    this.matingStep = 1;
                }
                else{ 
                    this.p1 = null; 
                    this.matingStep = 0;
                }
                return;
            }
            else if (mouse.hoveredPart == this.p2){ 
                this.p2 = null; 
                this.matingStep = 1;
                return;
            }

            if(this.matingStep == 0 && mouse.hoveredPart && !mouse.hoveredPart.reproducing){
                this.p1 = mouse.hoveredPart;
                this.matingStep = 1;
            }
            else if(this.matingStep == 1 && mouse.hoveredPart && !mouse.hoveredPart.reproducing){

                if(mouse.nextTo(this.p1.x, this.p1.y) >= 1 && mouse.hoveredPart != this.p1){
                    this.p2 = mouse.hoveredPart;
                    this.matingStep = 2;
                }
            }
            else if (this.matingStep == 2 && !mouse.hoveredPart){

                if(mouse.nextTo(this.p1.x, this.p1.y) == 2 || mouse.nextTo(this.p2.x, this.p2.y) == 2){

                    let x = mouse.x;
                    let y = mouse.y;
                    this.p1.reproduce(this.p2, x, y);

                    this.p1 = null;
                    this.p2 = null;
                    this.matingStep = 0;
                }
            }
            else if (mouse.hoveredPart.reproducing){
                console.log("Already Reproducing!");
            }
        }
    }

    reproduceAtIntervals(plant1, plant2, startX, startY){
        // Allows certain plants to reproduce over and over for testing reasons
        // Used in an earlier build, will leave in because it's a good script
        
        let args = [plant1, plant2, startX, startY]
        console.log('plant1: ' + plant1);
        time.delayedFunction(this, 'reproduceAtIntervals_loop', 1, args);
    }

    reproduceAtIntervals_loop(p1, p2, x, y){
        plants[p1].reproduce(plants[p2], x, y);

        if(y + 100 > height){
            return;
        }
        else if(x + 100 > width){
            x = 0;
            y += 100;
        }
        else { x += 100; }

        const args = [p1, p2, x, y]
        time.delayedFunction(this, 'reproduceAtIntervals_loop', 1, args);
    }
}