const MAX_DIFF = 10
const MAX_VEL = 3

export class Player{
    constructor(game, height_ratio) {
        this.game = game;
        this.height = game.height * height_ratio;
        this.width = this.height;
        this.x = game.width / 30;
        this.y = game.height / 1.5;
        this.velocity = 0;
        this.counter = 0;
    }
    update(){
        const diff = this.game.goal - this.x
        if( diff > MAX_DIFF){
            this.accel = 0.1;
            this.counter=0;
        }
        else if( diff < - MAX_DIFF){
            this.accel = -0.1;
            this.counter=0;
        }
        else{
            this.accel = 0;
        }
        this.x+=this.velocity;
        this.velocity+=this.accel;
        if (this.velocity > MAX_VEL)
            this.velocity = MAX_VEL
        if (this.velocity < -MAX_VEL)
            this.velocity = - MAX_VEL
    }
    draw(context){
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}