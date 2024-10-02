import { Assets, Sprite } from 'pixi.js';
import { GameMonoBehavior } from './GameCore/mainScene.js';

// Asynchronous IIFE
(async () => {
    // Create a MainScene instance
    const app = new GameMonoBehavior();
    // Initialize the application
    await app.init({ background: '#021f4b', resizeTo: window });

})();