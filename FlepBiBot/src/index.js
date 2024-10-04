import { Assets, Sprite } from 'pixi.js';
import { GameMonoBehavior } from './GameCore/mainScene.js';

// Asynchronous IIFE
(async () => {
    // Create a MainScene instance
    const app = new GameMonoBehavior();
    // Initialize the application
    await app.init({  width: 600,           // Chiều rộng ban đầu
        height: 900,          // Chiều cao ban đầu
        backgroundColor: 0x1099bb,
        resolution: window.devicePixelRatio || 1,});

})();