var s = "id_mdiv_4_i4c5: v0.0.4 - ";
s += "<a target='_blank' href='https://github.com/jeremyjia/Games/edit/master/issues/4/c5.js'"
s += " style='color:blue;'";	s +=">"; s += "c5.js* ";
s += "<a target='_blank' href='https://jeremyjia.github.io/Games/issues/4/c5.js'"
s += " style='color:green;'";	s +=">"; s += "c5.js ";
s += "<a target='_blank' href='https://jeremyjia.github.io/Games/issues/4/c5Test.html'"
s += " style='color:green;'";	s +=">"; s += "c5Test.html";

var d = blo0.blMDiv(document.body,"id_mdiv_4_i4c5", s, 700,100,500,400, blGrey[5]); 
if(!d.v1){	
	var style ="position: absolute;";
	style += "z-index: 9;";
	style += "background-color: #f1f1f1;";
	style += "text-align: center;";
	style += "border: 1px solid #d3d3d3;";
	style += "left: 200px;";
	style += "top: 40px;";
	style += "width: 500px;";
	d.style =style;
	
	var userName = generateUserName(10);
	
    d.vToolBar = blo0.blDiv(d, d.id + "vToolBar ", 'vToolBar: ', blGrey[1]);
    d.vToolBar.btn1 = blo0.blBtn(d. vToolBar, d.vToolBar.id + "btn1 ", 'Begin New', blGrey[1]);
    d.vToolBar.btn1.onclick = function(){
	    initMap();
    }
	d.vToolBar.div = blo0.blDiv(d.vToolBar, d.vToolBar.id + "div1", "user", blGrey[1]);
	d.vToolBar.div.innerHTML="Login User: "+userName;
	d.vStatusBar = blo0.blDiv(d,d.id+"vStatusBar","turn",blColor[2]);
	d.vStatusBar.innerHTML ="Turn Black";
	blo0.blMakeDivMovable(d);
    d.v1 = blo0.blDiv(d, d.id + "v1", '<canvas id="canvas2" width="400" height="400"></canvas>', blGrey[1]);
    d.v1.style.width = "500px";
    d.v1.style.height = "400px";

    var url = "https://api.github.com/repos/jeremyjia/Games/issues/comments/526778839";
    var nCell = 20;
    var canv = bl$("canvas2");
	var ctx = canv.getContext("2d");
	var mdiv = bl$("id_mdiv_4_i4c5");
	
	var BLACK = 1;
	var WHITE = 2;
	var allMessage="";
	var isBlackRun=1;
	var curX=-1;
	var curY=-1;	
	var user="";
	var cellMatrix = [
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	];
	
	var zeroMatrix = [
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	];

       var timerId1 = setInterval(function()
	   {
		   	readMap();		  
			if(allMessage!="")
			{
			   isBlackRun=JSON.parse(allMessage).isBlackRunKey;
			   user=JSON.parse(allMessage).user;
			   var pos=JSON.parse(allMessage).curPosKey;
			   curX = pos.split(",")[0];
			   curY = pos.split(",")[1];
			   var arrData = JSON.parse(allMessage).arrayDataKey;
			   var array = jsonToArray(arrData);
	           fillData(array);
			
				if(isBlackRun){
				  if(user==""){
					 d.vStatusBar.innerHTML ="Turn Black"; 
				  }	else{
					  var msg="\""+user+"\""+" Done---Now Turn Black";
					  d.vStatusBar.innerHTML = msg;
				  }						  
				}
				else{
				  if(user==""){
					 d.vStatusBar.innerHTML ="Turn White"; 
				  }	else{
					  var msg="\""+user+"\""+" Done---Now Turn White";
					  d.vStatusBar.innerHTML = msg;
				  
				}
		       }
			}
		   
	   },1000);
	   
	  var timerId2 = setInterval(function()
	   {
		   ctx.clearRect(0,0,400,400);
		   ctx.strokeStyle = "rgb(0,0,150)";
		   ctx.lineWidth = 1;
		   ctx.beginPath();
		   for(var i=0;i<19;i++)
		   {
			  ctx.moveTo(10+i*nCell,10);
			  ctx.lineTo(10+i*nCell,370);
			  
			  ctx.moveTo(10,10+i*nCell);
			  ctx.lineTo(370,10+i*nCell);
		   }
		   ctx.stroke();
		   
		   for(var i=0;i<19;i++)
		   {
				for(var j=0;j<19;j++)
				{
				   if(cellMatrix[i][j] == BLACK)
				   {
					 ctx.fillStyle = "Black";
					 ctx.beginPath();
					 ctx.arc(i*nCell+10, j*nCell+10,10-1,0,Math.PI*2,false);
					 ctx.fill();
					 
					 if(i==curX && j==curY)
					 {
					   ctx.strokeStyle = "rgb(250,0,0)";
					   ctx.strokeRect(i*nCell,j*nCell,20,20);
					 }
					  
				   }else if(cellMatrix[i][j] == WHITE){
					 ctx.fillStyle="White";
					 ctx.beginPath();
					 ctx.arc(i*nCell+10, j*nCell+10,10-1,0,Math.PI*2,false);
					 ctx.fill();
					 
					 if(i==curX && j==curY)
					 {
					   ctx.strokeStyle = "rgb(0,250,0)";
					   ctx.strokeRect(i*nCell,j*nCell,20,20);
					 }
					 
				   }
				}
			}
	   
	   },20);

	function arrayToJson(arr) {
		var json = [];
		for (var i = 0; i < arr.length; i++) {
		  json[i] = '[' + arr[i].join(',') + ']';
		}
		return '[' + json.join(',') + ']';
	  }
	  
	  function jsonToArray(json){
		  var arr = [];
		  for(var i in json){
		    if(json[i] !='[' && json[i] !=']' && json[i] !=',' ){
				arr.push([json[i]]);
			}		
		  }
		  return arr;
      }
	  
	  function fillData(array)
	  {
		var dex=0;
		for (var i = 0; i<19; i++) 
		{
			for (var j = 0; j<19; j++) 
			{
				cellMatrix[i][j]=array[dex];
				dex++;		 
			}
		}
	  }

     function initMap()
	 {
		 ctx.clearRect(0,0,400,400);
		 isBlackRun=1;
		 curX=-1;
		 curY=-1;
		 SaveMap(zeroMatrix,"",0,0);
	 }

            //Right button click on Canvas
			mdiv.style.display = "none";
			canv.oncontextmenu = function(event)
			{  
				var event = event || window.event;
				mdiv.style.display = "block";
				var x = Math.floor((event.offsetX)/nCell);
				var y = Math.floor((event.offsetY)/nCell);
				console.log(x+","+y);	
				return false;
            };

           //Button click on Canvas
		   bl$("canvas2").onclick = function(event)
		   {
			  ctx.clearRect(0,0,400,400);
			  var x = Math.floor((event.offsetX)/nCell);
			  var y = Math.floor((event.offsetY)/nCell);
			  console.log(x+","+y);
			  if (cellMatrix[x][y] == BLACK || cellMatrix[x][y] == WHITE){
				 return;
			  }
              if(isBlackRun){			  
                cellMatrix[x][y]=BLACK;
			  }
			  else{
				cellMatrix[x][y]=WHITE;	
			  }
			  
              isBlackRun=!isBlackRun;		  
			  SaveMap(cellMatrix,userName,x,y);
              			  
			}
			
			
			function getHTTPRequest(){
			   var objHttpRequest = null;
			   if (window.ActiveXObject) {
					 objHttpRequest = new ActiveXObject("Microsoft.XMLHTTP");
			   } else if (window.XMLHttpRequest) {
					  objHttpRequest = new XMLHttpRequest(); 
			   }
			   return objHttpRequest;
			}
			//Save data to Server
			function SaveMap(array, u, X, Y)
			{
			   var jsonArrayData = arrayToJson(array);
			   var curPos = X+","+Y;
			   var jsonAll= {
				"isBlackRunKey": isBlackRun,
				"curPosKey": curPos,
				"user":u,
				"arrayDataKey":jsonArrayData
				};
				var bodyData = JSON.stringify(jsonAll);
				var data= {
				"body": bodyData
				};
				
				var xmlHttpReg = getHTTPRequest();
				if (xmlHttpReg != null) {
					xmlHttpReg.open("PATCH", url, true);
					xmlHttpReg.setRequestHeader("Authorization", "token " + getToken());    
					xmlHttpReg.send(JSON.stringify(data));
					xmlHttpReg.onreadystatechange = SendCallBack;
				}else{
					alert("xmlHttpRequest is null!");
				}

				function SendCallBack() {         
				   if (xmlHttpReg.readyState == 4) {            
					if (xmlHttpReg.status == 200) {
					}else{
					   alert("SaveMap:"+xmlHttpReg.status);
					}
				  }
				}
	        }
			
			//Read data from Server
			function readMap() 
			{	
				var xmlHttpReg = getHTTPRequest();	
				if (xmlHttpReg != null) {
					xmlHttpReg.open("GET", url, true);
					xmlHttpReg.setRequestHeader('If-Modified-Since', '0');
					xmlHttpReg.setRequestHeader("Authorization", "token " + getToken());
					xmlHttpReg.send(null);
					xmlHttpReg.onreadystatechange = readCallBack; 
				}else{
					alert("xmlHttpRequest is null!");
				 }

				  function readCallBack() {         
					  if (xmlHttpReg.readyState == 4) 
					  {            
						  if (xmlHttpReg.status == 200) 
						  {
							 var o = JSON.parse(xmlHttpReg.responseText);
							 if(o.body==null || o.body==""){
								 allMessage ="";
							 }else 
								 allMessage=o.body;
						   }
						   else
						   {
							   alert("The http status code:"+xmlHttpReg.status);
							   clearInterval(timerId1);
							   clearInterval(timerId2);
						   }
					  }
				 }
			}
			
			function getToken(){		        
		       return "ghp_Od6GW3"+"J2NiP01Zsz"+"g9JQV0amzn"+"UxhF33iBES";
	        }
			
			function generateUserName(n){
				var str = "",
				arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];		
				for(var i=0; i<n; i++){
					var pos = Math.round(Math.random() * (arr.length-1));
					str += arr[pos];
				}
				return str;
			}
 
}
_on_off_div(this,d);
