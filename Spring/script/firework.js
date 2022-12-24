var oPlx = function(fwV){ 
	var c4Plx = function(){
		
		var fs = []; 
		var gravity = new CVector(0, 0.01);
		this.loop = function(nTick){
			var n = fs.length;
	
			var canvas = document.getElementById('myCanvas');
			var ctx = canvas.getContext('2d');  
			ctx.fillStyle = 'red';
			ctx.font = "30px Verdana";
			ctx.fillText( fwV + " n=" + n + " time=" + nTick, 110, 44);
			var d = new Date(); 
			ctx.fillText( d.toLocaleString(), 110, 88);
		
			if (0==fs.length) {
				fs.push(new CFirework(800,600)); 
				fs.push(new CFirework(444,333)); 
				fs.push(new CFirework(555,222)); 
			}  
			for (i in fs) {
				fs[i].applyForce(gravity);
				fs[i].update();
				fs[i].render(ctx);
			} 
			for (var i = 0; i < fs.length; i++) {
				if (fs[i].wasDone()) {
					fs.splice(i, 1);
				}
			}
		}
		function CParticle(x, y, vel, color, explodeLifespan){
			this.r = 3;
			this.loc = new CVector(x, y);
			this.vel = vel || new CVector(0, 0);
			this.acc = new CVector(0, 0);
			this.explodeLifespan = explodeLifespan;
			this.explodeCurrentLs = 0;
			this.color = color;
			
			this.update = function() {
				this.vel.add(this.acc);
				this.loc.add(this.vel);
				if (this.explodeLifespan) {
					this.explodeCurrentLs++;
					var progress = this.explodeCurrentLs / this.explodeLifespan;
					if (progress > 0.7 && progress < 1.0) {
						this.color.a = 1 - (progress - 0.7) / 0.3;
					}
				}
			}
			
			this.render = function(ctx) {
				//ctx.save();
				ctx.beginPath();
				ctx.arc(this.loc.x, this.loc.y, this.r, 0, Math.PI * 2);
				ctx.fillStyle = this.color.toString();
				ctx.fill();
				//ctx.restore();
			}
		
			this.applyForce = function(force) {
				this.acc.add(force);
			}
		
			this.wasDoneExploding = function() {
				return this.explodeCurrentLs > this.explodeLifespan;
			}
		}  
		
		function CFirework(_width,_height){
			var _w = _width, _h = _height;
			var vel = new CVector(
				_gRandom(0, 15) * (_gRandom(0, 1) ? -1 : 1),
				_gRandom(-18, -10)
			);
			this.color = _gColor();
			this.color.s = 100;
			this.color.l = 70;
			this.exploder = new CParticle(_w / 2, _h, vel, this.color);
			this.explodeParticles = [];
			this.nOfParticles = _gRandom(30, 40);
			this.isExploded = false;
		
			this.update = function() {
				if (this.exploder.vel.y > 0 && !this.isExploded) {
					this.isExploded = true;
					this.initExplodeParticles();
				}
				if (!this.isExploded) {
					this.exploder.update();
				} else {
					for (i in this.explodeParticles) {
						if (!this.explodeParticles[i].wasDoneExploding()) {
							this.explodeParticles[i].update();
						}
					}
				}
			}
		
			this.render = function(ctx) {
				if (!this.isExploded) {
					this.exploder.render(ctx);
				} else if (!this.done) {
					for (i in this.explodeParticles) {
						if (!this.explodeParticles[i].wasDoneExploding()) {
							this.explodeParticles[i].render(ctx);
						}
					}
				}
			}
		
			this.applyForce = function(force) {
				if (!this.isExploded) {
					this.exploder.applyForce(force);
				} else if (!this.done) {
					for (i in this.explodeParticles) {
						if (!this.explodeParticles[i].wasDoneExploding()) {
							this.explodeParticles[i].applyForce(force);
						}
					}
				}
			}
		
			this.initExplodeParticles = function() {
				for (var i = 0; i < this.nOfParticles; i++) {
					var particle = new CParticle(
						this.exploder.loc.x, 
						this.exploder.loc.y,
						_gNewVector(),
						this.color,
						50
					);
					this.explodeParticles.push(particle);
				}
			}
		
			this.wasDone = function() {
				if (this.explodeParticles.length === 0) return false;
		
				for (i in this.explodeParticles) {
					if (!this.explodeParticles[i].wasDoneExploding()) {
						return false;
					}
				}
				return true;
			}
		}
		function CVector(_x,_y){
			this.x = _x;
			this.y = _y;
			this.add = function(vec){
				this.x += vec.x;
				this.y += vec.y;
			}
		}
		
		var _gNewVector = function(){
			var angle = _gRandom(0, 360) * Math.PI / 180;
			var len = _gRandom(1, 5);
			var x = Math.cos(angle) * len;
			var y = Math.sin(angle) * len;
			return new CVector(x, y);
		}
		var _gColor = function(){
			var c = new CColor();
			c.h = _gRandom(0, 360);
			c.s = _gRandom(0, 100);
			c.l = _gRandom(0, 100);
			return c;
		}
		
		function _gRandom(min, max) {
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
		}
	 
		function CColor(){
			this.h = 0;
			this.s = 0;
			this.l = 0;
			this.a = 0;
			this.toString = function(){
				var s1 = 'hsla(';
				s1 += this.h;
				s1 += ',';
				s1 += this.s;
				s1 += '%,';
				s1 += this.l;
				s1 += '%,';
				s1 += this.a;
				s1 += ')';
				var s2 = 'hsla(';
				s2 += this.h;
				s2 += ',';
				s2 += this.s;
				s2 += '%,';
				s2 += this.l;
				s2 += '%)';  
				return this.a ? s1 : s2;
			}
		}
	
		
	}
	return new c4Plx();
}("[fireworks.js]_v0.142");

function animateFrame(time) {    
	oPlx.loop(time);
}