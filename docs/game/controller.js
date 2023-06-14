const MAX_DIFF = 1;
const MAX_INT_ERROR = 800;

class Controller {
    constructor(player_object){
        this.player = player_object;
    }
}

export class SimpleController extends Controller{
    control(){
        const diff = this.player.position_error[0] = this.player.game.goal - this.player.x
        const old_diff = this.player.position_error[-1]
        if( diff > MAX_DIFF ) {
            this.player.target_vel = this.player.max_vel;
        }
        else if( diff < -MAX_DIFF ) {
            this.player.target_vel = -this.player.max_vel;
        }
        else {
            this.player.target_vel = 0;
        }
        this.player.position_error[-1] = diff;
    }
}

export class PIDController extends Controller{
    constructor(player_object){
        super(player_object);
        this.p = 0.0;
        this.i = 0.0;
        this.d = 0.0;
        this.diffI = 0.0;
        this.counter = 0;
    }
    control(){
        const diff = this.player.position_error[0] = this.player.game.goal - this.player.x;
        const old_diff = this.player.position_error[-1];
        const diffE = diff - old_diff;
        this.diffI += diff;
        if( this.diffI > MAX_INT_ERROR ) this.diffI = MAX_INT_ERROR;
        this.player.target_vel = this.p * diff + (this.i * this.diffI) + (this.d * diffE);
        if( diff < MAX_DIFF && diff > -MAX_DIFF) {
            this.player.target_vel = 0.0;
            this.diffI = 0.0;
        }
        this.player.position_error[-1] = diff;
    }
}