function random(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

class Vector {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	add(vec) {
		this.x += vec.x;
		this.y += vec.y;
	}

	sub(vec) {
		this.x -= vec.x;
		this.y -= vec.y;
	}

	mult(value) {
		this.x *= value;
		this.y *= value;
	}

	static randomVector() {
		let angle = random(0, 360) * Math.PI / 180;
		let len = random(1, 5);
		let x = Math.cos(angle) * len;
		let y = Math.sin(angle) * len;
		return new Vector(x, y);
	}
}

class Firework {
	constructor() {
		let vel = new Vector(
			random(0, 15) * (random(0, 1) ? -1 : 1),
			random(-18, -10)
		);
		this.color = Hsl.random();
		this.color.s = 100;
		this.color.l = 70;
		this.exploder = new Particle(w / 2, h, vel, this.color);
		this.explodeParticles = [];
		this.nOfParticles = random(30, 40);
		this.isExploded = false;
	}

	update() {
		if (this.exploder.vel.y > 0 && !this.isExploded) {
			this.isExploded = true;
			this.initExplodeParticles();
		}
		if (!this.isExploded) {
			this.exploder.update();
		} else {
			for (let p of this.explodeParticles) {
				if (!p.wasDoneExploding()) {
					p.update();
				}
			}
		}
	}

	render(ctx) {
		if (!this.isExploded) {
			this.exploder.render(ctx);
		} else if (!this.done) {
			for (let p of this.explodeParticles) {
				if (!p.wasDoneExploding()) {
					p.render(ctx);
				}
			}
		}
	}

	applyForce(force) {
		if (!this.isExploded) {
			this.exploder.applyForce(force);
		} else if (!this.done) {
			for (let p of this.explodeParticles) {
				if (!p.wasDoneExploding()) {
					p.applyForce(force);
				}
			}
		}
	}

	initExplodeParticles() {
		for (let i = 0; i < this.nOfParticles; i++) {
			let particle = new Particle(
				this.exploder.loc.x, 
				this.exploder.loc.y,
				Vector.randomVector(),
				this.color,
				50
			);
			this.explodeParticles.push(particle);
		}
	}

	wasDone() {
		if (this.explodeParticles.length === 0) return false;

		for (let p of this.explodeParticles) {
			if (!p.wasDoneExploding()) {
				return false;
			}
		}
		return true;
	}
}