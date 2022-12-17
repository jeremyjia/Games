var canvas;
var canvasContent;
var w = 1024;
var h = 768;
var bInit = false;

function animateFrame(time) {
    canvas = document.getElementById('myCanvas');
    canvasContent = canvas.getContext('2d'); 
    canvasContent.clearRect(0, 0, 2048, 1536);
	 if(!bInit)
	 {
	    for(var k=0;k<30;k++){
			createRain();
		}
		bInit = true;
	 }
	run();
}
    function Rain(){};
	function random(min,max)
	{
	  return Math.random()*(max-min)+min;
	}
			
		Rain.prototype={					
				init:function(){
					this.x = random(0,w);
					this.y = 0;								
					this.v = random(4,6);
					this.h = random(0.8*h,0.9*h);
					this.r = 1;								
					this.vr = random(0,1);
					this.ro = 20;
					this.a = 1;							
					this.va = 0.96;
				},
				draw:function(){							
					if(this.y < this.h){					
						canvasContent.fillStyle="lightblue";		
						canvasContent.fillRect(this.x,this.y,2,10);
					}
					else{									
						if(this.r < this.ro){				
							canvasContent.strokeStyle="rgba(255,255,255,"+this.a+")";
							canvasContent.beginPath();					
							canvasContent.arc(this.x,this.y,this.r,0,Math.PI*2);
							canvasContent.stroke();	
						}
						else{
							canvasContent.strokeStyle="rgba(105,105,105,"+this.a+")";
							canvasContent.beginPath();
							canvasContent.arc(this.x,this.y,this.r,0,Math.PI*2);
							canvasContent.stroke();
						}
						
					}
					
				},

				move:function(){
					if(this.y < this.h){	
						this.y+=this.v;		
					}
					else{					
						if(this.a >	0.02){		
							this.r+=this.vr;	
							this.a *=this.va;	
						}
						else{					
							this.init();		
						}
					}
					this.draw(); 				
				}
			}
			
			var rainArray=[];		
			function createRain(){	
				var rain = new Rain();
				rain.init();			
				rain.draw();			
				rainArray.push(rain);
			}
			
			function moveRain(){
				canvasContent.fillStyle="rgba(0,0,0,0.01)";  
				canvasContent.fillRect(0,0,w,h);			
				for(var k=0;k<rainArray.length;k++){
					rainArray[k].move();
				}
			}
			
			function run(){
				moveRain();
			}
			