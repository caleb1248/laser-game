exports.Enemy = class{
	constructor(game) {
		this.y = 300;
		this.x = 600;
		this.h = 40;
		this.w = 50;
		this.laser = new Laser();
		this.laser.y = this.y + 10;
		this.target = 300;
	}

	shoot() {
		this.laser.y = this.y + 10;
		this.laser.render();
	}

	render(game) {
		game.ctx.fillStyle = "#ff0000";
		game.ctx.fillRect(this.x, this.y, this.w, this.h);
	}

	setTarget() {
		this.target = player.y;
	}

	goToTarget() {
		if (this.y < this.target) {
			this.y++;
		} else if (this.y > this.target) {
			this.y--;
		} else if (this.y == this.target) { }
	}
}

class Laser {
	constructor() {
		this.x = 0;
		this.h = 20;
		this.w = 600;
	}

	render(game) {
		game.ctx.fillStyle = "#ffff00";
		game.ctx.fillRect(this.x, this.y, this.w, this.h)
	}
}