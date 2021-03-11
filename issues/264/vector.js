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