let c = document.querySelector('#canvas');
let ctx = c.getContext('2d');
c.width = window.innerWidth;
c.height = window.innerHeight;
let w = c.width;
let h = c.height;
let gravity = new Vector(0, 0.01);
let fireworks = [];
let prevTs;

function draw(ts) {
	clear();
	if (ts - prevTs > random(100, 300)) {
		fireworks.push(new Firework());
		prevTs = ts;
	}
	for (let firework of fireworks) {
		firework.applyForce(gravity);
		firework.update();
		firework.render(ctx);
	}
	for (let i = 0; i < fireworks.length; i++) {
		if (fireworks[i].wasDone()) {
			fireworks.splice(i, 1);
		}
	}

	window.requestAnimationFrame(ts => draw(ts));
}

function clear() {
	ctx.save();
	ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
	ctx.fillRect(0, 0, w, h);
	ctx.restore();
}

window.requestAnimationFrame(ts => {
	prevTs = ts;
	fireworks.push(new Firework());
	draw(ts);
});
