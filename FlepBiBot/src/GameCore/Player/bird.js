import { Graphics } from "pixi.js";
import { GameManager } from "../gameManager";
import { GameState } from "../../GameState";


export class Bird extends Graphics
{
    constructor(gameMono)
    {
        super();
        this.gameMono = gameMono;
        this.jumpForce = -8;      // Jump force
     
        // Movement variables
        this.vx = 0;
        this.vy = 0;
        
        this.isUseGravity = false;
        this.init();
    }

    init()
    {
        this.drawBird();
    }
    addGravity(deltaTime)
    {
        if(!this.isUseGravity) return;
        this.vy+= 0.1 * deltaTime;
    }
    updateVelocity(deltaTime)
    {
        this.x += this.vx * deltaTime;
        this.y += this.vy * deltaTime;
    }
    update(deltaTime)
    {
        this.addGravity(deltaTime);
        this.updateVelocity(deltaTime);
        this.detectColision();
    }

    drawBird()
    {
        let xCenter = this.gameMono.screen.width/2;
        let yCenter = this.gameMono.screen.height/2;
        this.rect(xCenter-10,yCenter-10,20,20).fill('red');
    }
    addJumpForce()
    {
        this.vy = this.vy * 0.5 + this.jumpForce * 0.5;
    } 

    reset()
    {
        this.isUseGravity = false;
    }

    detectColision()
    {

        let birdBound = this.getBounds();
        let birdheight = birdBound.maxY - birdBound.minY;
        let halfscreenHeight = this.gameMono.screen.height/2;
        console.log(birdBound)
        if(birdBound.minY <=  0 )
        {
            this.y = -halfscreenHeight + birdheight/2 ;
            console.log("set");
        }
        if(birdBound.maxY >= this.gameMono.screen.height)
        {
            this.y = halfscreenHeight - birdheight/2;
        }

    }
}