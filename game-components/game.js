exports.Game = class{
	constructor(cv) {
		this.canvas = cv;
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