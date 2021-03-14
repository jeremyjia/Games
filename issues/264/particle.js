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