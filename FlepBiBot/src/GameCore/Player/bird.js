import { Graphics } from "pixi.js";
import { BirdState } from "./BirdState";

export class Bird extends Graphics
{
    constructor(gameMono)
    {
        super();
        this.gameMono = gameMono;
        this.state = BirdState.WAITING;
        
        this.init();
        this.vx = 0;
        this.vy = 0;
    }

    init()
    {
        this.drawBird();
    }
    addGravity(deltaTime)
    {
        if(this.state == BirdState.WAITING) return;
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
    }

    drawBird()
    {
        let xCenter = this.gameMono.screen.width/2;
        let yCenter = this.gameMono.screen.height/2;
        this.rect(xCenter-10,yCenter-10,20,20).fill('red');
    }

    addJumpForce()
    {
        this.vy += 20;
    }
}