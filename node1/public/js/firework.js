function random(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

class Hsl {
	constructor(h, s, l, a) {
		this.h = h;
		this.s = s;
		this.l = l;
		this.a = a;
	}

	toString() {
		return this.a ? 
			`hsla(${this.h}, ${this.s}%, ${this.l}%, ${this.a})` :
			`hsl(${this.h}, ${this.s}%, ${this.l}%)`;
	}

	static random() {
		let hsl = new Hsl();
		hsl.h = random(0, 360);
		hsl.s = random(0, 100);
		hsl.l = random(0, 100);
		return hsl;
	}
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

class Particle {
	constructor(x, y, vel, color, explodeLifespan) {
		this.r = 3;
		this.loc = new Vector(x, y);
		this.vel = vel || new Vector(0, 0);
		this.acc = new Vector(0, 0);
		this.explodeLifespan = explodeLifespan;
		this.explodeCurrentLs = 0;
		this.color = color;
	}

	update() {
		this.vel.add(this.acc);
		this.loc.add(this.vel);
		if (this.explodeLifespan) {
			this.explodeCurrentLs++;
			let progress = this.explodeCurrentLs / this.explodeLifespan;
			if (progress > 0.7 && progress < 1.0) {
				this.color.a = 1 - (progress - 0.7) / 0.3;
			}
		}
	}

	render(ctx) {
		ctx.save();
		ctx.beginPath();
		ctx.arc(this.loc.x, this.loc.y, this.r, 0, Math.PI * 2);
		ctx.fillStyle = this.color.toString();
		ctx.fill();
		ctx.restore();
	}

	applyForce(force) {
		this.acc.add(force);
	}

	wasDoneExploding() {
		return this.explodeCurrentLs > this.explodeLifespan;
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

let fs = [];

var nTimes = 0;

let gravity = new Vector(0, 0.01);
function animateFrame(time,ctx) {    
    var n = fs.length;
    ctx.fillStyle = 'red';
    ctx.font = "30px Verdana";
    ctx.fillText("v0.23: n=" + n, 110, 44);
 
	if (0==fs.length) {
		fs.push(new Firework()); 
	} 
    for (let firework of fs) {
		firework.applyForce(gravity);
		firework.update();
		firework.render(ctx);
	} 
	for (let i = 0; i < fs.length; i++) {
		if (fs[i].wasDone()) {
			fs.splice(i, 1);
		}
	} 
}