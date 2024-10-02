
import { Container } from "pixi.js";
import { Obstacle } from "./Obstacle.js";
export default class ObstacleManager extends Container
{
    constructor(gameMono)
    {
        super();
        this.gameMono = gameMono;
        this.obs = [];
        this.timeSpawm = 200;
        this.hasColi = false;   
        this.currentime = 0;
        
    }

    spawmObstacle()
    {
        let newObs = new Obstacle(this.gameMono,2);
        this.obs.push(newObs);
        this.addChild(newObs);
    }


    update(deltaTime)
    {
        this.currentime+= deltaTime;
        if(this.currentime >= this.timeSpawm)
        {
            this.currentime = 0;
            this.spawmObstacle();
            console.log("spawm");
        }
        for(let i =this.obs.length-1 ;i>= 0 ;i--)
        {
            this.obs[i].update(deltaTime);
            if(this.obs[i].x <= 0- this.gameMono.screen.width)
            {
               this.deSpawmObstacle(i);
            }
        }
        this.checkColision(this.gameMono.bird);


    }

    deSpawmObstacle(index)
    {
        let obs = this.obs[index];
        this.removeChild(obs);
        this.obs.splice(index,1);
    }

    checkColision(bird)
    {
        this.obs.forEach(obstacle => {
            let isColi = this.coliWithBottom(bird,obstacle.bottomObs) || this.colisWithTopObs(bird,obstacle.topObs);
            if(isColi)
            {

                //emit event when coli
                console.log("coli");
            }
        });
    }

    
    colisWithTopObs(bird,topObs)
    {
       let birdBound = bird.getBounds();
       let topObsBound = topObs.getBounds();
       return birdBound.minY <= topObsBound.maxY && birdBound.maxX >=topObsBound.minX &&
       birdBound.minX  <= topObsBound.maxX  ;     
    }


    coliWithBottom(bird,bottomObs)
    {
        let birdBound = bird.getBounds();
        let botObsBound = bottomObs.getBounds();
        return birdBound.maxY >= botObsBound.minY && birdBound.maxX >=botObsBound.minX &&
        birdBound.minX <= botObsBound.maxX;
 
    }
}