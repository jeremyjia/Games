let c = document.querySelector('#canvas');
let ctx = c.getContext('2d');
c.width = window.innerWidth;
c.height = window.innerHeight;
let w = c.width;
let h = c.height;
let gravity = new Vector(0, 0.01);
let fs = [];
let prevTs;

function draw(ts) {
	clear();
	if (ts - prevTs > random(100, 300)) {
		fs.push(new Firework());
		prevTs = ts;
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

	window.requestAnimationFrame(ts => draw(ts));
}

function clear() {
	ctx.save();
	ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
	ctx.fillRect(0, 0, w, h);
	ctx.fillStyle = 'rgba(255,0,0,0.3)';
	ctx.font = "30px Arial";
	ctx.fillText("xdv0.21 : " + Date() ,50,50);
	ctx.restore();
}

window.requestAnimationFrame(ts => {
	prevTs = ts;
	fs.push(new Firework());
	draw(ts);
});
