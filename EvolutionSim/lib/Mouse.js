class Mouse{
    /**
     * @Param x X position of the mouse
     * @Param y Y position of the mouse
     * @Param leftClick 
     * @Param rightClick
     * @Param changed If the mouse was clicked or released this frame
     */

    constructor(){
        this.x;
        this.y;
        this.leftClick = false;
        this.rightClick = false;
    }

    update(){
        let coords = this.mapFromGrid(mouseX, mouseY);
        this.x = coords.x;
        this.y = coords.y;

        if(mouseIsPressed){
            if(!this.leftClick && !this.rightClick){
                if(mouseButton === LEFT){
                    this.leftClick = true;
                }
                else if(mouseButton === RIGHT){
                    this.rightClick = true;
                }
                else{
                    print("Something has gone horribly wrong, or perhaps you did a middle click");
                }
                this.changed = true;
            }
            else { this.changed = false; }
        }
        else{
            if(this.leftClick || mouse.rightClick){
                this.leftClick = false;
                this.rightClick = false;
                this.changed = true;
            }
            else { this.changed = false; }
        }
    }

    updateImage(){
        if(this.hoveredPart){
            this.displayGenes();
        }
    }

    get hoveredPart(){
        for(i in plants){
            if(this.x == plants[i].x && this.y == plants[i].y){
                return plants[i];
            }
        }
    }

    hovering(plant){
        coords = this.mapFromGrid(this.x, this.y);
        if(this.x == plant.x && this.y == plant.y){ 
            return true; 
        }
        else{ return false; }
    }

    hovering(x, y){
        coords = this.mapFromGrid(this.x, this.y);
        if(this.x == x && this.y == y){ 
            return true; 
        }
        else{ return false; }
    }

    nextTo(x, y){
        // Checks whether 2 squares are the same, adjacent, or diagonal
        let c2 = this.mapFromGrid(this.x, this.y);

        if(x == this.x && y == this.y){
            return -1;
        }
        else if (
            (Math.abs(x - this.x) == 1 && Math.abs(y - this.y) == 0) ||
            (Math.abs(x - this.x) == 0 && Math.abs(y - this.y) == 1)
        ){
            return 2;
        }
        else if (Math.abs(x - this.x) == 1 && Math.abs(y - this.y) == 1){
            return 1;
        }
        else { 
            console.log(x + ' ' + this.x + ' ' + y + ' ' + this.y);
            return 0; 
        }
    }

    mapFromGrid(x, y, w=0, h=0){
        // This one will always give me an integer
        // It effectively gives me the reigon I'm in
        let coords = {}
        coords.x = map(x, borderWidth + plantSize/2, width - borderWidth - plantSize/2, 1, gridWidth);
        coords.y = map(y, height - borderWidth - plantSize/2, borderWidth + plantSize/2, 1, gridHeight);
        coords.x += w / 2;
        coords.y += h / 2;
        coords.x = Math.round(coords.x);
        coords.y = Math.round(coords.y);
        return coords;
    }

    displayGenes(){
        let plant = this.hoveredPart;
        let genes = '';
        let geneList = [plant.p, plant.t, plant.m, plant.s, plant.b];
        let geneNames = ['p', 't', 'm', 's', 'b'];
        for(let i = 0; i < geneList.length; i++){
            switch(geneList[i]){
                case 2:
                    genes += geneNames[i].toUpperCase() + geneNames[i].toUpperCase();
                    break;
                case 1:
                    genes += geneNames[i].toUpperCase() + geneNames[i];
                    break;
                case 0:
                    genes += geneNames[i] + geneNames[i];
                    break;
                default:
                    console.log('A gene has achieved an illegal value');
                    break;
            }

            genes += ' ';
        }

        push();
            let myHeight = 14;
            textSize(myHeight);
            let myWidth = textWidth(genes);

            fill(0, 127);
            noStroke();
            rect(mouseX - 1, mouseY - myHeight + 2, myWidth, myHeight + 1);

            fill(255);
            text(genes, mouseX, mouseY);
        pop();
    }
}