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
	var myStack = [];
	var WALL = 2;
	var PATH = 3;
	
        var YES = 1;
	var NO = 0;
	
	var UP = 1;
	var DOWN = 2;
	var LEFT = 3;
	var RIGHT = 4;
	var SUCCESS = 6;
	var FAILED = 7;
	
	var cellMatrix = [
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0]
	];
	
	var maze = [
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0]
	];
	
	var pathIndex = [
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0]
	];

	   setInterval(function()
	   {
	       ctx.strokeStyle = "Black";
		   ctx.beginPath();
		   for(var i=0; i<15;i++)
		   {
			  ctx.moveTo(10+i*40, 10);
			  ctx.lineTo(10+i*40, 370);
			  
			  ctx.moveTo(10, 10+i*40);
			  ctx.lineTo(370, 10+i*40);
		   }
		   ctx.stroke();

		   ctx.fillStyle = "Red";
		   ctx.beginPath();
		   ctx.arc(ptStart.x*40+20+10, ptStart.y*40+20+10, 20,0,Math.PI*2,false);
		   ctx.fill();
		
			for(var i=0; i<9;i++)
			{
				for(var j=0; j<9;j++)
				{
				   if(cellMatrix[i][j] == WALL)
				   {
					   ctx.fillStyle = "Blue";
					   ctx.beginPath();
					   ctx.fillRect(i*40+10,j*40+10,40,40);
					  
				   }else if(cellMatrix[i][j] == PATH){     
					 var index = pathIndex[i][j];
					 ctx.fillStyle = "Red";
					 ctx.beginPath();
					 ctx.arc(i*40+20+10, j*40+20+10,20,0,Math.PI*2,false);
					 ctx.fill();
					 
					 ctx.strokeStyle = "Yellow";
					 ctx.beginPath();
					 ctx.strokeText(index, i*40+20+10,j*40+20+10-5);
					 
				   }
				}
			}
	   
	   },20);
	   
	   initMap();
	   
	   //Constructor function, similar as C++ Class
	   var Position = function(x,y)
	   { 
	     this.x = x;
		 this.y = y;
	   };
	   Position.prototype.move = function(x,y)
	   {
		   this.x = x;
		   this.y = y;
	   }
	   
	   var MyObj = function(index, pt, dir)
	   {
	     this.index = index;
		 this.pt = pt;
		 this.dir = dir;   
	   }
	   	   
	   var ptStart = new Position(0,0);
	   var ptEnd = new Position(0,0);
	   var ptNextPos = new Position(0,0);
	   var bClick=1;

	   bl$("canvas1").onclick = function(event)
	   {
		  ctx.clearRect(0,0,400,400);
		  var x = Math.floor((event.offsetX-10)/nCell);
		  var y = Math.floor((event.offsetY-10)/nCell);
		  console.log(x+","+y);
		  if (cellMatrix[x][y] == WALL){
			 return;
		  }		
		   if(bClick == 0)
		   {
			   ptStart.move(x,y);	   
			   myStack = [];
			   clearData();
			   bClick=1;
		   }
		   else
		   {
		      ptEnd.move(x,y);
			  if(searchPathByDFS(ptStart, ptEnd))
			  {
			    console.log("***Successfully finding the path***");
				while(myStack.length > 0)
				{
					var obj = myStack.pop();
					console.log("("+obj.pt.x+","+obj.pt.y+"):"+obj.index);
					cellMatrix[obj.pt.x][obj.pt.y] = PATH;
					pathIndex[obj.pt.x][obj.pt.y] = obj.index;		
				}
				for (var i = 0; i < 9; i++) {
				   for (var j = 0; j < 9; j++) {
					if (maze[i][j] == 6) {
						cellMatrix[i][j] = PATH;
					}
				  }
			    }
                bClick = 0;
			  }
			  else 
			  {
			     console.log("***Not finding the path***");
				 alert("Sorry, not finding the path!");
				 myStack = [];
			     clearData();
			  }		  
		   }	   
	   }


	   
		function searchPathByDFS(start, end) 
		{
			var obj = new MyObj();
			var curstep = 1;
			obj.pt = start;
			obj.index = curstep;
			obj.dir = getInitDirection();
			markPos(obj.pt, YES);
			myStack.push(obj);
	
			while (myStack.length>0) {
				console.log("Stack length is:"+myStack.length);
				var curObj= myStack[myStack.length-1];
				if (curObj.pt.x == end.x && curObj.pt.y == end.y){
					return true;
				}

				if (getNextCanPassPos(curObj)) {
					var o = new MyObj();
					o.dir = getInitDirection();
					var p = new Position(0, 0);
					p.move(ptNextPos.x, ptNextPos.y);
					o.pt = p;
					o.index = ++curstep;
                    console.log("Pushing to stack: ("+o.pt.x+","+o.pt.y+"):"+o.index);
					myStack.push(o);
					markPos(o.pt, YES);

				} else {
					myStack.pop();
					markPos(curObj.pt, NO);
				}
			}
			return false;
		}
		   
	   	function getNextCanPassPos(o) 
		{
			var tmp = new MyObj();
			tmp.dir = o.dir;
			tmp.pt = o.pt;
			while (tmp.dir != -1) {
				nexPos(tmp.pt, tmp.dir);
				if (canPass()) {
					return true;
				} else {
					tmp.dir = nextDirection(tmp.dir);
				}
			}
			return false;
	    }
	
		 function canPass() 
		 {
			if(ptNextPos.x>8 || ptNextPos.x<0 || ptNextPos.y>8 || ptNextPos.y<0)
			{
				return false;
			}
			if (maze[ptNextPos.x][ptNextPos.y] == 0) {
				return true;
			}
			return false;
		 }

		function nexPos(curpos, dir) {		
			if (dir == RIGHT) {
				ptNextPos.move(curpos.x+1,curpos.y);
				console.log("aaa"+ptNextPos.x,+" "+ptNextPos.y);
			} else if (dir == DOWN) {
				ptNextPos.move(curpos.x,curpos.y+1);
				console.log("bbb"+ptNextPos.x,+" "+ptNextPos.y);
			} else if (dir == LEFT) {
				ptNextPos.move(curpos.x-1,curpos.y);
				console.log("ccc"+ptNextPos.x,+" "+ptNextPos.y);
			} else if (dir == UP) {
				ptNextPos.move(curpos.x,curpos.y-1);
				console.log("ddd"+ptNextPos.x,+" "+ptNextPos.y);
			}
		}

		 function nextDirection(dir) 
		 {
			if (dir == RIGHT) {
			  return DOWN;
			} else if (dir == DOWN) {
			  return LEFT;
			} else if (dir == LEFT) {
			  return UP;
			}
			return -1;
		}
		
		function getInitDirection() {
		   return RIGHT;
		}
	   	function markPos(curpos, tag) 
		{
			switch (tag) {
			case YES:
				maze[curpos.x][curpos.y] = SUCCESS;
				break;
			case NO:
				maze[curpos.x][curpos.y] = FAILED;
				break;
		    }
	    }

		function initMap()
		{
			for (var i = 0; i<9; i++) 
			{
			  for (var j = 0; j<9; j++) 
			  {
			    var v = Math.ceil(Math.random()*10);
				if (v==2 || v==4 || v==6) {
				   maze[i][j] = WALL;
				   cellMatrix[i][j] = WALL;
			    }
			  }
			}
			
			if(cellMatrix[0][0] == 2)
			{
			   cellMatrix[0][0] =0;
			   maze[0][0] = 0;
			}
		}
		
		function clearData() 
		{
		   for (var i = 0; i<9; i++) 
		   {
			  for (var j = 0; j<9; j++) 
			  {
				 if (maze[i][j] != WALL) {
				    maze[i][j] = 0;
			     }
			     if (cellMatrix[i][j] == PATH) {
				   cellMatrix[i][j] = 0;
				 }
			     pathIndex[i][j] = 0;
			  }
		  }
		}		
 
}
_on_off_div(null,d);
