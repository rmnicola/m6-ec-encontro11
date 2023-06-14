import {Player} from './player.js'

export class Game {
    constructor(canvas_name, controller_type){
        this.canvas = document.getElementById(canvas_name);
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.controller_type = controller_type
        this.player = new Player(this, this.width/20, this.height*4/5, 0.1, this.controller_type)
        this.goal = this.player.x;
        this.animate();
    }
    restart(){
        this.player.x = this.width/20;
        this.player.target_vel = 0.0;
        this.player.actual_vel = 0.0;
        this.goal = this.player.x;
    }
    update(){
        if( !this.paused ) this.player.update();
    }
    draw(){
        this.ctx.strokeRect(this.width * 2/3, this.player.y, this.player.width, this.player.height)
        this.player.draw();
    }
    animate(){
        this.ctx.clearRect(0, 0, this.width, this.height)
        this.update();
        this.draw();
        requestAnimationFrame(this.animate.bind(this));
    }
}