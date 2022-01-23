const ground = addImage('ground.png');
const ceiling = addImage('celing.png');
const playerImg = addImage('data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCgk8cmVjdCB3aWR0aD0iMzAiIGhlaWdodD0iMzAiPg0KCTwvcmVjdD4NCjwvc3ZnPg==');
class Game {
	constructor() {
		this.canvas = document.querySelector('canvas#canvas');
		this.ctx = canvas.getContext("2d");
		this.w = 0;
		this.h = 0;
		this.fill();
	}
	fill() {
		this.ctx.fillStyle = "#e1e1e1";
		this.ctx.fillRect(0, 0, 700, 400)
	}
}

class Player {
	constructor() {
		this.x = 100;
		this.y = 100;
		this.w = 30;
		this.h = 30;
		this.up = false;
	}

	keyUp(e) {
		e.preventDefault();
		if (e.key == 'ArrowUp') {
			this.up = false;
		} else if (e.key == ' ') {
			this.up = false;
		} else if (e.key == 'Spacebar') {
			// This if statement is for space bar detection for older browsers
			this.up = false;
		}
	}

	keyDown(e) {
		e.preventDefault();
		if (e.key == 'ArrowUp') {
			this.up = true;
		} else if (e.key == ' ') {
			this.up = true;
		} else if (e.key == 'Spacebar') {
			// This if statement is for space bar detection for older browsers
			this.up = true;
		}
	}
	createEventListeners() {
		window.addEventListener('keydown', this.keyDown.bind(this));
		window.addEventListener('keyup', this.keyUp.bind(this));

	}

	move() {
		if (this.up) {
			this.y -= 2;
		} else if (this.up === false) {
			this.y += 2;
		}
		if (this.y <= 0) this.y = 0;
		if (this.y >= 370) this.y = 370;
	}

	render() {
		game.ctx.drawImage(playerImg, this.x, this.y);
	}

	detectSpikeCollision() {
		if (this.y < 20) {
			return true;
		} else if (this.y + 30 > 380) {
			return true;
		} else {
			return false;
		}
	}

	detectLaserCollision() {
		if (shooting) {
			if (this.y <= enemy.laser.y + 20) {
				if (this.y + 30 > enemy.laser.y) {
					return true;
				}
			}
		}
		return false;
	}
}

class Enemy {
	constructor() {
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

	render() {
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

class Floor {
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

	render() {
		game.ctx.drawImage(ground, this.x, this.y, 720, 20);
	}
}
class Ceiling extends Floor {
	constructor() {
		super();
		this.x = 0
		this.y = 0;
	}
	render() {
		game.ctx.drawImage(ceiling, this.x, this.y, 720, 20);
	}
}
class Laser {
	constructor() {
		this.x = 0;
		this.h = 20;
		this.w = 600;
	}

	render() {
		game.ctx.fillStyle = "#ffff00";
		game.ctx.fillRect(this.x, this.y, this.w, this.h)
	}
}

function frame() {
	game.fill();

	player.move();
	player.render();

	floor.move();
	floor.render();
	celing.move();
	celing.render();

	enemy.goToTarget();
	enemy.render();
	if (shooting) {
		enemy.shoot();
	}

	game.ctx.fillStyle = "#000000";
	game.ctx.fillText("Your score: " + score.toString(), 20, 60)

	if (player.detectSpikeCollision()) {
		restart();
	}

	if (player.detectLaserCollision()) {
		restart();
	}
}

function addImage(source) {
	const image = document.createElement('img');
	image.setAttribute('src', source);
	image.setAttribute('style', 'display:none');
	return image;
}

function restart() {
	alert("you died");
	enemy = new Enemy();
	player = new Player();
	player.createEventListeners();
	playing = false;
	if (score > highScore) {
		highScore = score;
	}
}

function startStopShooting() {
	if (playing) {
		if (shooting) {
			shooting = false;
			enemy.setTarget();
			score++;
		} else {
			shooting = true;
		}
	}
}

function homescreen() {
	game.ctx.fillStyle = "#e1e1e1";
	game.ctx.fillRect(0, 0, 700, 400);
	game.ctx.font = "40px Arial";
	game.ctx.fillStyle = "black";
	game.ctx.fillText("Laser game", 250, 80);
	game.ctx.fillText("Your score: " + score, 230, 160);
	game.ctx.fillText("High score: " + highScore, 230, 240);
	game.ctx.font = "30px Arial";
	game.ctx.fillText("Click to start playing", 230, 330);
}

let playing = false;
var game = new Game();
var player = new Player();
var enemy = new Enemy();
var floor = new Floor();
var celing = new Ceiling();
let score = 0;
let shooting = true;
let highScore = 0;
setInterval(() => {
	if (playing) {
		frame();
	} else {
		homescreen();
	}
});
setInterval(startStopShooting, 1000);