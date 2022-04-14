class Bullet{
    /**
     * @Param {Number} x 
     * @Param {Number} y
     * @Param {Object} img
     * @Param {Number} Vx
     * @Param {Number} Vy
     */


    constructor (x, y, img, Vx = 1, Vy = 0){
        this.x = x;
        this.y = y;

        this.img = img;
        this.scale = 50;
        this.img.resize(this.scale, this.scale);

        this.vMult = 6;
        this.Vx = Vx;
        this.Vy = Vy;
    }

    update(){
        this.x += this.Vx * time.deltaTime * this.vMult;
        this.y += this.Vy * time.deltaTime * this.vMult;
        coords = mapToGrid(this.x, this.y, this.scale, this.scale)
        image(this.img, coords.x, coords.y);
    }

    get touchingEdge(){
        if(this.x < 0 || this.x > width + this.img.width){
            return true;
        }
        else if (this.y < 0 || this.y > height + this.img.height){
            return true;
        }
        else{
            return false;
        }
    }
}