var s = "id_mdiv_4_i4c5: v0.0.1 - ";
s += "<a target='_blank' href='https://github.com/jeremyjia/Games/edit/master/issues/4/c5.js'"
s += " style='color:blue;'";	s +=">"; s += "c5.js* ";
s += "<a target='_blank' href='https://jeremyjia.github.io/Games/issues/4/c5.js'"
s += " style='color:green;'";	s +=">"; s += "c5.js ";
s += "<a target='_blank' href='https://jeremyjia.github.io/Games/issues/4/c5Test.html'"
s += " style='color:green;'";	s +=">"; s += "c5Test.html";

var d = blo0.blMDiv(document.body,"id_mdiv_4_i4c5", s, 700,100,500,400, blGrey[5]); 
if(!d.v1){
    d.vToolBar = blo0.blDiv(d, d.id + "vToolBar ", 'vToolBar: ', blGrey[1]);
    d.vToolBar.btn1 = blo0.blBtn(d. vToolBar, d.vToolBar.id + "btn1 ", 'Begin New', blGrey[1]);
    d.vToolBar.btn1.onclick = function(){
	    initMap();
    }
	d.vStatusBar = blo0.blDiv(d,d.id+"vStatusBar","turn",blColor[2]);
	d.vStatusBar.innerHTML ="Turn Black";
	blo0.blMakeDivMovable(d);
    d.v1 = blo0.blDiv(d, d.id + "v1", '<canvas id="canvas2" width="400" height="400"></canvas>', blGrey[1]);
    d.v1.style.width = "500px";
    d.v1.style.height = "400px";

    var url = "https://api.github.com/repos/jeremyjia/Games/issues/comments/526778839?access_token="+getToken();
    var nCell = 20;
    var canv = bl$("canvas2");
	var ctx = canv.getContext("2d");
	var mdiv = bl$("id_mdiv_4_i4c5");
	
	var BLACK = 1;
	var WHITE = 2;
	var allMsg="";
	var isBlackRun=1;
	
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
			if(allMsg!="")
			{
			   isBlackRun=JSON.parse(allMsg).isBlackRunKey;
			   var arrData = JSON.parse(allMsg).arrayDataKey;
			   var array = jsonToArray(arrData);
	           fillData(array);
			
				if(isBlackRun){			  
				  d.vStatusBar.innerHTML ="Turn Black";
				}
				else{
				  d.vStatusBar.innerHTML ="Turn White";
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
					 ctx.arc(i*nCell+10, j*nCell+5,10-1,0,Math.PI*2,false);
					 ctx.fill();
					  
				   }else if(cellMatrix[i][j] == WHITE){
					 ctx.fillStyle="White";
					 ctx.beginPath();
					 ctx.arc(i*nCell+10, j*nCell+5,10-1,0,Math.PI*2,false);
					 ctx.fill();
					 
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
		 SaveMap(zeroMatrix);
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
			  SaveMap(cellMatrix);
              			  
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
			function SaveMap(array)
			{
			   var jsonArrayData = arrayToJson(array);
			   var jsonAll= {
				"isBlackRunKey": isBlackRun,
				"arrayDataKey":jsonArrayData
				};
				var bodyData = JSON.stringify(jsonAll);
				var data= {
				"body": bodyData
				};
				
				var xmlHttpReg = getHTTPRequest();
				if (xmlHttpReg != null) {
					xmlHttpReg.open("PATCH", url, true);    
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
								 allMsg ="";
							 }else 
								 allMsg=o.body;
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
		       return "f89b0eccf7"+"4c65a65513"+"60062c3e47"+"98d0df4577";
	        }
 
}
_on_off_div(this,d);
