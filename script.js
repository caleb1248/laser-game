const ground = document.querySelector("#ground");
const ceiling = document.querySelector("#celing");
const waveUp = document.querySelector("#waveUp");
const waveDown = document.querySelector("#waveDown");

class GameObject {
	// The base class for every object in the game
	constructor() {
		this.x = 0;
		this.y = 0;
		this.w = null;
		this.h = null;
	}

	getBoundingBox () {
		return {x: this.x, y: this.y, w: this.w, h: this.h};
	}
}
class Game {
	constructor() {
		this.canvas = document.getElementById('canvas');
		this.ctx = this.canvas.getContext('2d');

		this.ctx.fillRect(0, 0, canvas.width, canvas.height);
		this.w = 0;
		this.h = 0;

		this.resize();
		window.addEventListener('resize', this.resize.bind(this));
	}

	set width(value) {
		this.w = value;
		this.canvas.width = value;
	}

	set height(value) {
		this.h = value;
		this.canvas.height = value;
	}

	get width() {
		return this.w;
	}

	get height() {
		return this.h;
	}

	resize() {
		this.height = window.innerHeight;
		this.width = window.innerWidth;
	}

	render () {
		requestAnimationFrame(this.render);
		if (this.detectCollision(this.player.getBoundingBox(), this.boss.laser.getBoundingBox)) {

		}
	}

	detectCollision (r1, r2) {
		if (r2.x < r1.x + r1.w && r1.x < r2.x + r2.w && r2.y < r1.y + r1.h && r1.y < r2.y + r2.h) return true;
	}

}

class Player extends GameObject {
	constructor() {
		super();
		this.u = false;
		this.image = waveDown;
		this.up = false;
		this.w = this.image.width;
		this.h = this.image.height;
	}

	set up(value) {
		this.u = !!value;
		this.image = value ? waveUp : waveDown;
	}

	get up() {
		return this.u;
	}

	keyUp(e) {
		console.log(event.key)
		if (e.key == ' ') {
			this.up = false;
			e.preventDefault();
		}
	}

	keyDown(e) {
		if (e.key == ' ') {
			this.up = true;
			e.preventDefault();
		}
	}

	createEventListeners() {
		window.addEventListener('keydown', this.keyDown.bind(this));
		window.addEventListener('keyup', this.keyUp.bind(this));
	}

	move() {
		this.up ? this.y++ : this.y--;
		
	}
}
class Enemy extends GameObject {
	constructor() {
		this.y = window.innerHeight / 2;
		this.x = window.innerWidth - 100;
	}
}
class Background {
	constructor() {
		this.ground = ground;
		this.ceiling = ceiling;
	}
	move() {

	}
}
const game = new Game();
const player = new Player();
player.createEventListeners();