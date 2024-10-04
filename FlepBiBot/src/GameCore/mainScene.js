import { Application } from "pixi.js";
import background from './BackGround/background.js';
import ObstacleManager from "./Obstacle/obstacleManager.js";
import { PlayerController } from "./Player/playercontroller.js";

import { Bird } from "./Player/bird.js";
import { GameManager } from "./gameManager.js";
export class GameMonoBehavior extends Application {
    constructor() {
        super();
        
        
    }

    async init(options = {}) {
        await super.init(options);
        document.body.appendChild(this.canvas);
        this.setup();
    }


    setup() {

       
       
        //setupBackground
        this.bg = new background(this);
        this.stage.addChild(this.bg);
 
        //setup OBS
        this.obstacles = new ObstacleManager(this);
        this.stage.addChild(this.obstacles);


       
       
        //setupBird
        this.bird = new Bird(this);
        this.stage.addChild(this.bird);
        
        this.playercontroller = new PlayerController(this,this.bird);
        //Setup Loop
        this.ticker.add((time) => {
            this.gameUpDate(time.deltaTime);
        })
    }



    gameUpDate(deltaTime) {
        this.bg.update(deltaTime);
        this.obstacles.update(deltaTime);
        this.bird.update(deltaTime);
    }
}