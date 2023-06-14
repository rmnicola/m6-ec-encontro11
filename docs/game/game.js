import {Player} from './player.js'

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

window.addEventListener('load', function(){
    class Game {
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.player = new Player(this, 0.1)
            this.goal = this.width / 2;
        }
        update(){
            this.player.update();
        }
        draw(context){
            context.fillRect(this.goal, this.player.y, this.player.width, this.player.height)
            this.player.draw(context);
        }
    }
    const game = new Game(canvas.width, canvas.height);
    console.log(game);
    
    function animate(){
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        game.update();
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate();
});