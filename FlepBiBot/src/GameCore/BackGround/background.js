import { Container, Graphics } from "pixi.js"
export default class background  extends Container {
    constructor(gameMono) {
        super();
        this.gameMono = gameMono;
        this.trees = [];
        this.init();
    }

    init() {
        this.setup();
    }

    setup()
    {
        this.createStar();
       // this.createGround();
    }

    createStar() {
        let graphicStart = new Graphics();
        for (let i = 0; i < 20; i++) {
            const x = (i * 0.78695 * this.gameMono.screen.width) % this.gameMono.screen.width;
            const y = (i * 0.9382 * this.gameMono.screen.height) % this.gameMono.screen.height;
            const radius = 2 + Math.random() * 3;
            const rotation = Math.random() * Math.PI * 2;
            graphicStart.star(x, y, 5, radius, 0, rotation).fill({ color: 0xffdf00, alpha: radius / 5 });
        }
        this.addChild(graphicStart);

    }

    createGround()
    {
        let graphicGround = new Graphics();
        graphicGround.rect(0,this.gameMono.screen.height -  40 , this.gameMono.screen.width, this.gameMono.screen.height).fill({color : 'black'});
        this.addChild(graphicGround);
    }

    update(deltaTime)
    {
        this.trees.forEach(tree => {
            tree.x -= deltaTime;
            if (tree.x <= -(200 / 2 + 15))
            {
                tree.x += 4 * (200 + 15) + 15 * 3;
            }
        });
    }

}