import { GameState } from "../../GameState";
import { GameManager } from "../gameManager";


export class PlayerController
{
    constructor(gameMono, bird)
    {
        this.gameMono = gameMono;
        this.handleClick = this.handleClick.bind(this);
        this.bird = bird;
        this.setupInputListeners();
       
    }

    setupInputListeners() {
      
        this.gameMono.stage.eventMode = 'static';
        this.gameMono.stage.hitArea = this.gameMono.screen;
        this.gameMono.stage.on('pointerdown', this.handleClick);
    }
    
    handleClick(event) {

        if(GameManager.isLose) return;
        this.bird.isUseGravity = true;
        GameManager.gameState = GameState.PLAYING;
        this.bird.addJumpForce();
    }
    
    
    destroy() {
        this.app.stage.off('pointerdown', this.handleClick);
    }

    

}