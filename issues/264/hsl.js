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