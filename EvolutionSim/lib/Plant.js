class Plant{
    /**
     * @Param {Number} x X position of the plant
     * @Param {Number} y Y position of the plant
     * 
     * @Param {Number} p Whether the plant shoots
     * @Param {Number} t Whether the plant tanks damage
     * @Param {Number} m Whether the plant does a punch attack
     * @Param {Number} s Whether the plant generates sun
     * @Param {Number} b Whether the plant has a bonus
     * 
     * @Param {Object} img The image of the plant
     * @Param {Number} scale How wide the image should be
     */

    constructor (data){

        this.x = data.x;
        this.y = data.y;

        this.p = data.p;
        this.t = data.t;
        this.m = data.m;
        this.s = data.s;
        this.b = data.b;

        this.img = data.img;
        this.scale = data.scale;
        this.img.resize(this.scale, this.scale);

        this.bullets = [];
        this.punches = [];

        this.setTimers();

        this.reproducing = false;
    }

    serialize() {
        let out = {};
        out.x = this.x;
        out.y = this.y;
        out.p = this.p;
        out.t = this.t;
        out.m = this.m;
        out.s = this.s;
        out.b = this.b;
        
        return out;
    }

    setTimers(){
        this.delay = {}
        this.times = {}


        if (this.p == 2){
            this.delay.p = 3;
            this.times.p = 1.1;
            time.delayedFunction(this, 'shoot', this.delay.p);
        }
        if (this.m == 2){
            this.delay.m = 2;
            this.times.m = 0.4;
            time.delayedFunction(this, 'punch', this.delay.m);
        }
        if (this.s == 2){
            this.delay.s = 20;
            this.times.s = 20;
            time.delayedFunction(this, 'generateSun', this.delay.s);
        }
        // All plants reproduce the same (right now)
        this.times.r = 8;
    }

    update() {
        // Bullets and punches are updated in sketch
        // Plants don't actually do anything in a normal frame, everything is on timers
    }

    updateImage(){
        coords = mapToGrid(this.x, this.y, this.scale, this.scale)
        image(this.img, coords.x, coords.y);
    }

    updateChildren(){
        for(let i = 0; i < this.bullets.length; i++){
            this.bullets[i].update();
        }
        for(let i = 0; i < this.bullets.length; i++){
            if(this.bullets[i].touchingEdge){
                this.bullets.splice(i, 1);
            }
        }
        for(let i = 0; i < this.punches.length; i++){
            this.punches[i].update();
        }
        for(let i = 0; i < this.punches.length; i++){
            if(!this.punches[i].punching){
                this.punches.splice(i, 1);
            }
        }
    }

    shoot() {
        let bullet = new Bullet(this.x, this.y, bulletImg);
        this.bullets.push(bullet);
        time.delayedFunction(this, 'shoot', this.times.p);
    }

    punch() {
        let punch = new Punch(this.x + 0.7, this.y, punchImg);
        this.punches.push(punch);
        time.delayedFunction(this, 'punch', this.times.m);
    }

    generateSun() {
        // Generate a sun
        sun += 25;
        time.delayedFunction(this, 'generateSun', this.times.s);
    }

    reproduce(otherPlant, x, y) {
        if(!this.reporucing){
            time.delayedFunction(this, 'endReproduce', this.times.r, [otherPlant, x, y]);
            otherPlant.reproduceAsOther();
            this.reproducing = true;
        }
    }

    endReproduce(otherPlant, x, y) {


        function setGenes(parent, otherParent){
            let childGenes = []
            for(let i = 0; i < parent.length; i++){
                childGenes.push(0);
                switch (parent[i]){
                    case 2:
                        childGenes[i]++;
                        break;
                    case 1:
                        if(random.rand()) { childGenes[i]++; }
                        break;
                    case 0:
                        break;
                    default:
                        console.log("Something has gone horribly wrong");
                }
                switch (otherParent[i]){
                    case 2:
                        childGenes[i]++;
                        break;
                    case 1:
                        if(random.rand()) { childGenes[i]++; }
                        break;
                    case 0:
                        break;
                    default:
                        console.log("Something has gone horribly wrong");
                }
            }

            return childGenes;
        }

        function findImage(genes){
            if (genes.p == 2){
                return peashooterImg;
            }
            else if (genes.t == 2){
                return wallnutImg;
            }
            else if (genes.m == 2){
                return cabbageImg;
            }
            else if (genes.s == 2){
                return sunflowerImg;
            }
            else{
                return crossbreedImg;
            }
        }

        let child = {}

        let myGenes = [this.p, this.t, this.m, this.s, this.b];
        let otherGenes = [otherPlant.p, otherPlant.t, otherPlant.m, otherPlant.s, otherPlant.b]
        let childGenes = setGenes(myGenes, otherGenes);

        child.x = x;
        child.y = y;
        child.p = childGenes[0];
        child.t = childGenes[1];
        child.m = childGenes[2];
        child.s = childGenes[3];
        child.b = childGenes[4];
        child.img = findImage(child);
        child.scale = 100;

        
        if(!child.img){
            console.log(child);
        }


        let newPlant = new Plant(child);
        plants.push(newPlant);

        this.reproducing = false;
        otherPlant.endReproduceAsOther();
    }

    reproduceAsOther() {
        this.reproducing = true;
    }

    endReproduceAsOther() {
        this.reproducing = false;
    }

    get indexInList(){
        for(i in plants){
            if(plants[i] == this){
                return i;
            }
        }
    }

    checkMouse(){
        if(mouse.hoveredPart == this && mouse.rightClick && mouse.changed){
            plants.splice(this.indexInList, 1);
        }
    }
}