import { Application, Container, Graphics } from 'pixi.js';

class ObstacleManager {
    constructor(app) {
        this.app = app;
        this.obstacles = [];
        this.container = new Container();
        this.app.stage.addChild(this.container);

        this.gapSize = 200;
        this.obstacleWidth = 50;
        this.speed = 2;
        this.spawnInterval = 3000; // milliseconds

        this.lastSpawnTime = 0;
    }

    createObstacle() {
        const obstacle = {
            topPipe: new Graphics(),
            bottomPipe: new Graphics(),
        };

        this.container.addChild(obstacle.topPipe, obstacle.bottomPipe);
        this.obstacles.push(obstacle);

        this.positionObstacle(obstacle);
    }

    positionObstacle(obstacle) {
        const height = this.app.screen.height;
        const minPipeHeight = 50;
        const maxPipeHeight = height - this.gapSize - minPipeHeight;
        const topPipeHeight = Math.random() * (maxPipeHeight - minPipeHeight) + minPipeHeight;

        const x = this.app.screen.width;

        // Draw top pipe
        obstacle.topPipe.clear();
        obstacle.topPipe.beginFill(0x4CAF50);
        obstacle.topPipe.drawRect(0, 0, this.obstacleWidth, topPipeHeight);
        obstacle.topPipe.endFill();
        obstacle.topPipe.position.set(x, 0);

        // Draw bottom pipe
        obstacle.bottomPipe.clear();
        obstacle.bottomPipe.beginFill(0x4CAF50);
        obstacle.bottomPipe.drawRect(0, 0, this.obstacleWidth, height - topPipeHeight - this.gapSize);
        obstacle.bottomPipe.endFill();
        obstacle.bottomPipe.position.set(x, topPipeHeight + this.gapSize);
    }

    update(delta) {
        const currentTime = Date.now();

        // Spawn new obstacle if it's time
        if (currentTime - this.lastSpawnTime > this.spawnInterval) {
            this.createObstacle();
            this.lastSpawnTime = currentTime;
        }

        // Update obstacle positions
        for (let i = this.obstacles.length - 1; i >= 0; i--) {
            const obstacle = this.obstacles[i];
            obstacle.topPipe.x -= this.speed * delta;
            obstacle.bottomPipe.x -= this.speed * delta;

            // Remove obstacle if it's off screen
            if (obstacle.topPipe.x + this.obstacleWidth < 0) {
                this.container.removeChild(obstacle.topPipe, obstacle.bottomPipe);
                this.obstacles.splice(i, 1);
            }
        }
    }

    checkCollision(bird) {
        for (const obstacle of this.obstacles) {
            const birdBounds = bird.getBounds();
            if (obstacle.topPipe.getBounds().intersects(birdBounds) ||
                obstacle.bottomPipe.getBounds().intersects(birdBounds)) {
                return true;
            }
        }
        return false;
    }

    reset() {
        for (const obstacle of this.obstacles) {
            this.container.removeChild(obstacle.topPipe, obstacle.bottomPipe);
        }
        this.obstacles = [];
        this.lastSpawnTime = 0;
    }
}

// Usage example:
const app = new Application({
    width: 800,
    height: 600,
    backgroundColor: 0x1099bb,
});
document.body.appendChild(app.view);

const obstacleManager = new ObstacleManager(app);

// Assume we have a bird object
const bird = new Graphics();
bird.beginFill(0xFF0000);
bird.drawCircle(0, 0, 20);
bird.endFill();
bird.position.set(100, 300);
app.stage.addChild(bird);

app.ticker.add((delta) => {
    obstacleManager.update(delta);
    
    if (obstacleManager.checkCollision(bird)) {
        console.log('Collision detected!');
        // Handle game over logic here
    }
});

