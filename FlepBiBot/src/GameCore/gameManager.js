
import { GameState  } from "../GameState";
export  class GameManager {
    static isLose = false;
    static gameState = GameState.WAITING;

   static onLose()
   {
    GameManager.isLose = true;
    GameManager.gameState = GameState.LOSE;
   }

   static reset()
   {
    GameManager.gameState = GameState.WAITING;
    GameManager.isLose = false;
   }

   static playGame()
   {
    GameManager.gameState = GameState.PLAYING;
   }
}