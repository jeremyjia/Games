var s = "id_mdiv_4_i4c2: v0.0. 26 - ";
s += "<a target='_blank' href='https://github.com/jeremyjia/Games/edit/master/issues/4/c2.js'"
s += " style='color:blue;'";	s +=">"; s += "c2.js* ";
s += "<a target='_blank' href='https://jeremyjia.github.io/Games/issues/4/c2.js'"
s += " style='color:green;'";	s +=">"; s += "c2.js ";
s += "<a target='_blank' href='https://jeremyjia.github.io/Games/issues/4/c2Test.html'"
s += " style='color:green;'";	s +=">"; s += "c2Test.html";

var d = blo0.blMDiv(document.body,"id_mdiv_4_i4c2", s,    700,100,500,400, blGrey[5]); 
if(!d.v1){
    d. vToolBar = blo0.blDiv(d, d.id + "vToolBar ", 'vToolBar :', blGrey[1]);
    d. vToolBar. btn1 = blo0.blBtn(d. vToolBar, d. vToolBar.id + "btn1 ", ' btn1', blGrey[1]);
    d. vToolBar. btn1 .onclick = function(){
	    cleanAll();
	    initMap();
    }
    d.v1 = blo0.blDiv(d, d.id + "v1", '<canvas id="canvas1" width="400" height="400"></canvas>', blGrey[1]);
    d.v1.style.width = "500px";
    d.v1.style.height = "400px";

    var nCell = 40;
    var canv = bl$("canvas1");
	var ctx = canv.getContext("2d");
	var myStack = [];
	var myQueue = [];
	
	var WALL = 2;
	var PATH = 3;	
    var YES = 6;
	var NO = 7;	
	var UP = 1;
	var DOWN = 2;
	var LEFT = 3;
	var RIGHT = 4;
	var bDFS=1;
	var bBFS=1;
	
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
	
	var mazeBFS = [
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
		   ctx.lineWidth = 1;
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
		   ctx.arc(ptEnd.x*40+20+10, ptEnd.y*40+20+10, 20,0,Math.PI*2,false);
		   ctx.fill();

		    for(var i=0; i<9;i++)
			{
				for(var j=0; j<9;j++)
				{
				   if(cellMatrix[i][j] == WALL)
				   {
					   ctx.fillStyle = "rgb(0,0,150)";
					   ctx.beginPath();
					   ctx.fillRect(i*40+10,j*40+10,40,40);
					  
				   }else if(cellMatrix[i][j] == PATH){     
					 var index = pathIndex[i][j];
					 ctx.strokeStyle = "Red";
					 ctx.beginPath();
					 ctx.arc(i*40+20+10, j*40+20+10,20,0,Math.PI*2,false);
					 ctx.stroke();
					
                     ctx.beginPath();					
					 ctx.font = '12pt Arial';
					 ctx.strokeStyle = "rgb(0,255,255)";
					 ctx.lineWidth = 1;
					 ctx.beginPath();
					 ctx.strokeText(index, i*40+20+10-5,j*40+20+10-2);
					 
				   }
				}
			}
			drawBFSPath();
	   
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
	   
	   //Used  for DFS Search
	   var MyObj = function(index, pt, dir)
	   {
	     this.index = index;
		 this.pt = pt;
		 this.dir = dir;   
	   }
	  
	  //Used for BFS Search
	   var MyNode = function(index, pt, parent)
	   {
	     this.index = index;
		 this.pt = pt;
		 this.parent = parent;   
	   }
	   	   
	   var ptStart = new Position(0,0);
	   var ptEnd = new Position(0,0);
	   var ptNextPos = new Position(0,0);
	   var ptNextPosBFS = new Position(0,0);
	   var rtBFSNode=null;
	   var bClick=1;

	   function searchPathByDFS(start, end) 
		{
			var obj = new MyObj();
			var curstep = 1;
			obj.pt = start;
			obj.index = curstep;
			obj.dir = getInitDirection();
			markPos(obj.pt, YES, maze);
			myStack.push(obj);
	
			while (myStack.length>0) {
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
					markPos(o.pt, YES, maze);

				} else {
					myStack.pop();
					markPos(curObj.pt, NO, maze);
				}
			}
			return false;
		}
		
		function searchPathByBFS(start, end)
		{
		    var i=1;		
			myQueue.push(new MyNode(i,start, null));
			while (myQueue.length>0) 
			{
			   var curNode = myQueue.shift();
			   console.log("deQueue :("+curNode.pt.x+","+curNode.pt.y+")");
			   	if (curNode.pt.x == end.x && curNode.pt.y == end.y){
                    rtBFSNode = curNode; //rtBFSNode is a link list
					return true;
				}
			    var dir=4;
				i++;
				while (dir > 0) {
					nextPosition(curNode.pt, dir, ptNextPosBFS);
					if (canPass(ptNextPosBFS, mazeBFS)) {
						markPos(ptNextPosBFS, YES, mazeBFS);
						var p = new Position(0, 0);
					    p.move(ptNextPosBFS.x, ptNextPosBFS.y);
						myQueue.push(new MyNode(i, p, curNode));
					}
					dir--;
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
				nextPosition(tmp.pt, tmp.dir, ptNextPos);
				if (canPass(ptNextPos, maze)) {
					return true;
				} else {
					tmp.dir = nextDirection(tmp.dir);
				}
			}
			return false;
	    }
	
		function canPass(point, map) 
		{
			if(point.x>8 || point.x<0 || point.y>8 || point.y<0)
			{
				return false;
			}
			if (map[point.x][point.y] == 0) {
				return true;
			}
			return false;
		 }
		 
		function nextPosition(curpos, dir, newPos) 
		{		
			if (dir == RIGHT) {
				newPos.move(curpos.x+1,curpos.y);
				console.log("aaa "+newPos.x,+" "+newPos.y);
			} else if (dir == DOWN) {
				newPos.move(curpos.x,curpos.y+1);
				console.log("bbb "+newPos.x,+" "+newPos.y);
			} else if (dir == LEFT) {
				newPos.move(curpos.x-1,curpos.y);
				console.log("ccc "+newPos.x,+" "+newPos.y);
			} else if (dir == UP) {
				newPos.move(curpos.x,curpos.y-1);
				console.log("ddd "+newPos.x,+" "+newPos.y);
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
	   	function markPos(curpos, tag, map) 
		{
			switch (tag) {
			case YES:
				map[curpos.x][curpos.y] = YES;
				break;
			case NO:
				map[curpos.x][curpos.y] = NO;
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
				   mazeBFS[i][j] = WALL;
				   cellMatrix[i][j] = WALL;
			    }
			  }
			}
			
			if(cellMatrix[0][0] == WALL)
			{
			   cellMatrix[0][0] =0;
			   maze[0][0] = 0;
			   mazeBFS[0][0] = 0;
			}
		}
		
		function cleanAll() 
	    {
		   ctx.clearRect(0,0,400,400);
		   for (var i = 0; i<9; i++) 
		   {
			  for (var j = 0; j<9; j++) {
			     cellMatrix[i][j] = 0;
			     maze[i][j] = 0;
				 mazeBFS[i][j] =0;
			     pathIndex[i][j] = 0;
			  }
		  }
		   ptStart.move(0,0);
           ptEnd.move(0,0);		   
	           myStack = [];
			   myQueue = [];
	           bClick=1;
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
				 
				 if (mazeBFS[i][j] != WALL) {
				    mazeBFS[i][j] = 0;
			     }
			     if (cellMatrix[i][j] == PATH) {
				   cellMatrix[i][j] = 0;
				 }
			     pathIndex[i][j] = 0;
			  }
		  }
		}	

        function drawBFSPath()
		{
			var b=0;
			var x,y;
			while (rtBFSNode != null)
			{
				console.log("BFS path list:("+rtBFSNode.pt.x+","+rtBFSNode.pt.y+")");
				if(b==0){
					x=rtBFSNode.pt.x;
					y=rtBFSNode.pt.y;
					b=1;
				}else{
					ctx.lineWidth = 4;
					ctx.strokeStyle = "rgb(30,250,60)";
		            ctx.beginPath();	   
					ctx.moveTo(x*40+20+10, y*40+20+10);
			        ctx.lineTo(rtBFSNode.pt.x*40+20+10, rtBFSNode.pt.y*40+20+10);
					ctx.stroke();
					ctx.restore();
					x=rtBFSNode.pt.x;
					y=rtBFSNode.pt.y;
				}
				rtBFSNode = rtBFSNode.parent;
			}
		}		
	   
	   var mdiv = bl$("id_mdiv_4_i4c2");
	   mdiv.style.display = "none";
			//Right click on Canvas
			canv.oncontextmenu = function(event){  
			var event = event || window.event;
			mdiv.style.display = "block";
			var x = Math.floor((event.offsetX-10)/nCell);
		    var y = Math.floor((event.offsetY-10)/nCell);
		    console.log(x+   ","+y);
			
			ctx.clearRect(0,0,400,400);
			if (cellMatrix[x][y] == WALL){
			     cellMatrix[x][y] = 0;
			     maze[x][y] = 0;
			     mazeBFS[x][y] = 0;
		    }else {
				cellMatrix[x][y] = WALL;
				maze[x][y] = WALL;
			    mazeBFS[x][y] = WALL;
			}
            return false;
        };

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
               ptEnd.move(x,y);			   
			   myStack = [];
			   myQueue = [];
			   clearData();
			   bClick=1;
		   }
		   else
		   {
		      ptEnd.move(x,y);
			  
			  if(bDFS)
			  {
				  if(searchPathByDFS(ptStart, ptEnd))
				  {
					console.log("***DFS Successfully finding the path***");
					while(myStack.length > 0)
					{
						var obj = myStack.pop();
						console.log("("+obj.pt.x+","+obj.pt.y+"):"+obj.index);
						cellMatrix[obj.pt.x][obj.pt.y] = PATH;
						pathIndex[obj.pt.x][obj.pt.y] = obj.index;		
					}
					for (var i = 0; i < 9; i++) {
					   for (var j = 0; j < 9; j++) {
						if (maze[i][j] == YES) {
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
					 ptEnd.move(ptStart.x, ptStart.y);
					 return;
				  }	
			  }

              if(bBFS)
			  {
				  if(searchPathByBFS(ptStart, ptEnd))
				  {
					console.log("***BFS Successfully finding the path***");
					bClick = 0;
				  }
				  else{
					 console.log("***Not finding the path***");
					 alert("Sorry, not finding the path!");
					 myQueue = [];
					 clearData();
					 ptEnd.move(ptStart.x, ptStart.y);
				  }	
			  }		  
		   }
	   }
 
}
_on_off_div(this,d);
