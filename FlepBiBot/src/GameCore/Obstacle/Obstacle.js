import { Graphics, Container } from "pixi.js";

export class Obstacle extends Container {
    constructor() {
        super();
        this.speed = 2;
        this.topObs = new Graphics();
        this.bottomObs = new Graphics();
        this.addChild(this.topObs, this.bottomObs);
        
        this.gapSize = 200;
        this.obstacleWidth = 60;
    }


    init(screenWidth, screenHeight)
    {
        const height =screenHeight;
        const minPipeHeight = 50;
        const maxPipeHeight = height - this.gapSize - minPipeHeight;
        const topPipeHeight = Math.random() * (maxPipeHeight - minPipeHeight) + minPipeHeight;
        
        const x = screenWidth;
        
        // Draw top pipe
        this.topObs.clear();
        this.topObs.rect(0, 0, this.obstacleWidth, topPipeHeight);
        this.topObs.fill({ color: 0x4CAF50 });
        this.topObs.position.x = x;
        this.topObs.position.y = 0;
        
        // Draw bottom pipe
        this.bottomObs.clear();
        this.bottomObs.rect(0, 0, this.obstacleWidth, height - topPipeHeight - this.gapSize);
        this.bottomObs.fill({ color: 0x4CAF50 });
        this.bottomObs.position.x = x;
        this.bottomObs.position.y = topPipeHeight + this.gapSize;        
    }
     
    update(deltaTime) {
        this.position.x -= this.speed * deltaTime;
    }

}