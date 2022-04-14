class Punch{
    /**
     * @Param x X position of the punch
     * @Param y Y Position of the punch
     * @Param img The punch image
     */

    constructor(x, y, img){
        this.x = x;
        this.y = y;

        this.scale = 70;
        this.img = img;
        this.img.resize(this.scale, this.scale);

        this.punching = true;
        this.punchTime = 0.1;
        time.delayedFunction(this, 'endPunch', this.punchTime);
    }

    update(){
        let coords = mapToGrid(this.x, this.y, this.scale, this.scale)
        image(this.img, coords.x, coords.y);
    }

    endPunch(){
        this.punching = false;
    }
}