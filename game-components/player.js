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

	render(game) {
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

	detectLaserCollision(shooting, enemy) {
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