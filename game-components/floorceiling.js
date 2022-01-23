exports.Floor = class {
    constructor() {
        this.x = 0;
        this.y = 380;
    }

    move() {
        this.x -= 2;
        if (this.x == -20) {
            this.x = 0;
        }
    }

    render(game) {
        game.ctx.drawImage(ground, this.x, this.y, 720, 20);
    }
}
exports.Ceiling = class extends exports.Floor{
    constructor() {
        super();
        this.x = 0
        this.y = 0;
    }
    render(game) {
        game.ctx.drawImage(ceiling, this.x, this.y, 720, 20);
    }
}