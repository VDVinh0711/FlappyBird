
import { Container } from "pixi.js";
import { Obstacle } from "./Obstacle.js";
import { GameManager } from "../gameManager.js";
import { ScoreManager } from "../scoreManager.js";
import { GameState } from "../../GameState.js";
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

    spawmObstacle(deltaTime)
    {

        if(GameManager.gameState == GameState.WAITING) return;
        this.currentime+= deltaTime;
        if(this.currentime >= this.timeSpawm)
        {
           
            this.currentime = 0;
            let newObs = new Obstacle();
            newObs.init(this.gameMono.screen.width, this.gameMono.screen.height);
            this.obs.push(newObs);
            this.addChild(newObs);
        }

        
    }


    update(deltaTime)
    {

        if(GameManager.gameState == GameState.WAITING || GameManager.gameState == GameState.LOSE) return;

        this.spawmObstacle(deltaTime);
        
        for(let i =this.obs.length-1 ;i>= 0 ;i--)
        {

            //update obs
            this.obs[i].update(deltaTime);

            //addscore
            
            this.obsGoPassBird(this.gameMono.bird , this.obs[i]);

            //check des obs
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

    obsGoPassBird(bird,obs)
    {
       
        let birdBound = bird.getBounds();
        let topObsBound = obs.topObs.getBounds();
        if( birdBound.maxX !=  Math.floor(topObsBound.minX ) ) return;
        ScoreManager.addScore();
    }
    checkColision(bird)
    {
        this.obs.forEach(obstacle => {
            let isColi = this.coliWithBottom(bird,obstacle.bottomObs) || this.colisWithTopObs(bird,obstacle.topObs);
            if(isColi)
            {
                GameManager.onLose();
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