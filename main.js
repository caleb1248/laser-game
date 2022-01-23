import { Enemy } from "./game-components/enemy"
import { Game } from "./game-components/game";
import { Floor, Ceiling } from "./game-components/floorceiling";
import { Player } from "./game-components/player";
const ground = addImage('ground.png');
const ceiling = addImage('celing.png');
const playerImg = addImage('data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCgk8cmVjdCB3aWR0aD0iMzAiIGhlaWdodD0iMzAiPg0KCTwvcmVjdD4NCjwvc3ZnPg==');

function frame() {
	game.fill();

	player.move();
	player.render(game);

	floor.move();
	floor.render(game);
	celing.move();
	celing.render(game);

	enemy.goToTarget();
	enemy.render(game);
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