var s = "id_mdiv_4_i4c2: v0.0. 13 - ";
s += "<a target='_blank' href='https://github.com/jeremyjia/Games/edit/master/issues/4/c2.js'"
s += " style='color:blue;'";	s +=">"; s += "c2.js* ";
s += "<a target='_blank' href='https://jeremyjia.github.io/Games/issues/4/c2.js'"
s += " style='color:green;'";	s +=">"; s += "c2.js ";
s += "<a target='_blank' href='https://jeremyjia.github.io/Games/issues/4/c2Test.html'"
s += " style='color:green;'";	s +=">"; s += "c2Test.html";

var d = blo0.blMDiv(document.body,"id_mdiv_4_i4c2", s,    700,100,500,400, blGrey[5]); 
if(!d.v1){
    d.v1 = blo0.blDiv(d, d.id + "v1", '<canvas id="canvas1" width="400" height="400"></canvas>', blGrey[1]);
    d.v1.style.width = "500px";
    d.v1.style.height = "400px";

    var nCell = 40;
    var canv = bl$("canvas1");
    var ctx = canv.getContext("2d");

   setInterval(function()
   {
   	   ctx.beginPath();
	   for(var i=0; i<15;i++)
	   {
		  ctx.moveTo(10+i*40, 10);
		  ctx.lineTo(10+i*40, 370);
		  
		  ctx.moveTo(10, 10+i*40);
		  ctx.lineTo(370, 10+i*40);
	   }
    ctx.stroke();
   	ctx.beginPath();
	ctx.fillStyle = "Red";
	ctx.arc(pt.x*40+20+10, pt.y*40+20+10, 20,0,Math.PI*2,false);
	ctx.fill();
   
   },20);
   
   //Constructor function
   var Position = function(x,y)
   { this.x = x;
     this.y = y;
   };
   Position.prototype.move = function(x,y)
   {
   this.x = x;
   this.y = y;
   }
   var pt = new Position(0,0);
   
   bl$("canvas1").onclick = function(event)
     { 
      ctx.clearRect(0,0,400,400);
	   var x = Math.floor((event.offsetX - 10)/nCell);
	   var y = Math.floor((event.offsetY - 10)/nCell);
	   console.log(x+" "+y);
       pt.move(x,y);  

     }
 
}
_on_off_div(null,d);