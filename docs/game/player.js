import * as controllers from './controller.js'
const MAX_VEL_DIFF = 0.2;
const MIN_VEL = 0.8;
const ACCEL = 0.3;

export class Player{
    constructor(game, pos_x, pos_y, height_ratio, controller_type) {
        this.game = game;
        this.height = game.height * height_ratio;
        this.width = this.height;
        this.x = pos_x;
        this.y = pos_y;
        this.target_vel = 0.0;
        this.actual_vel = 0.0;
        this.max_vel = 0.0;
        this.position_error = [0.0, 0.0];
        switch (controller_type) {
            case "simple":
                this.controller = new controllers.SimpleController(this);
                console.log("Simple...");
                break;
            case "pid":
                this.controller = new controllers.PIDController(this)
                console.log("Proportional...");
            default:
                console.log("Ué...");
                break;
        }
    }
    control(){
        this.controller.control()
    }
    apply_accel(){
        const vel_diff = this.target_vel - this.actual_vel
        if( vel_diff > MAX_VEL_DIFF ) {
            this.actual_vel += ACCEL
        }
        else if( vel_diff < -MAX_VEL_DIFF ) {
            this.actual_vel -= ACCEL
        }
    }
    update(){
        this.control()
        this.apply_accel()
        if( this.actual_vel > MIN_VEL || this.actual_vel < -MIN_VEL )
            this.x+=this.actual_vel;
    }
    draw(){
        this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}