//i4c4
var s= "v0.0.28 "; 
s += "<a target='_blank' href='https://github.com/jeremyjia/Games/edit/master/issues/4/c4.js'"
s += " style='color:blue;'";		s +=">"; s += "c4.js* ";
s += "<a target='_blank' href='https://jeremyjia.github.io/Games/issues/4/c4.js'"
s += " style='color:green;'";		s +=">"; s += "c4.js ";
s += "<a target='_blank' href='https://jeremyjia.github.io/Games/issues/4/c4Test.html'"
s += " style='color:brown;'";		s +=">"; s += "c4Test.html";

var md = blo0.blDiv(document.body, "div_ID_4_I4C4", s ,blGrey[0]);  
if(!md.run){
    md.run = true; 
	var style ="position: absolute;";
	style += "z-index: 9;";
	style += "background-color: #f1f1f1;";
	style += "text-align: center;";
	style += "border: 1px solid #d3d3d3;";
	style += "left: 400px";
	style += "top: 40px";
	style += "width: 540px";
	md .style =style;
	
	var title = blo0.blDiv(md , "div_ID_4_I4C4" + "Header", "Header");
	style ="padding: 10px;";
	style += "z-index: 10;";
	style += "cursor: move;";
	style += "text-align: center;";
	style += "border: 1px solid #fff;";
	style += "background-color: #2196F3;";
	title.style =style;
 
    blo0.blMakeDivMovable(md );
	md.style.left = "400px";
	md.style.top = "40px";

	md.v = blo0.blDiv(md,md.id+"v","Let's chat!",blColor[1]);
	md.v.ta = blo0.blTextarea(md.v, md.v.id+"ta", "", blGrey[3]);
	md.v.ta.style.width="98%"; 
	md.v.ta.style.height="240px"; 
	
	md.v.ta1 = blo0.blTextarea(md.v, md.v.id+"ta1", "", blGrey[4]);
	md.v.ta1.style.width="90%"; 
	md.v.ta1.style.height="50px"; 
	
	md.v.btnSend = blo0.blBtn(md.v,md.v.id+"btnSend","Send/Read",blColor[4]);
	md.v.btnClear = blo0.blBtn(md.v,md.v.id+"btnClear","ClearMsg",blColor[4]);
	
	md.v.btnSend.onclick= function(){	
	   var s = md.v.ta1.value;
	   if(s!=""){
		 SendMsg(s);
	   }
	   md.v.ta1.value="";
	   //setTimeout("readMsg()", 1000)
	}
	md.v.btnClear.onclick= function(){
	   allMsg="";
       SendMsg("Let's chat");
       //setTimeout("readMsg()", 200)	   
	}
	
	 var timerId = setInterval(function()
	 {
	  readMsg();
	  md.v.ta.value = allMsg;
	 },1000);
	
	var allMsg="";
    readMsg();
	
	function SendMsg(ss){
		     var xmlHttpReg = null;
          if (window.ActiveXObject) {
             xmlHttpReg = new ActiveXObject("Microsoft.XMLHTTP");
	 } else if (window.XMLHttpRequest) {
              xmlHttpReg = new XMLHttpRequest(); 
         }

        var url = "https://api.github.com/repos/jeremyjia/Games/issues/comments/526806470?access_token="+getToken();
		var myMsg=allMsg;
		if(myMsg!=""){
			myMsg+="\n";
		}
		myMsg+=ss;
		var data= {
		"body": myMsg
		};
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
					   alert("Write:"+xmlHttpReg.status);
				   }
              }
         }
	}
		
	function readMsg() 
	{	
        var xmlHttpReg = null;
          if (window.ActiveXObject) {
             xmlHttpReg = new ActiveXObject("Microsoft.XMLHTTP");
	   } else if (window.XMLHttpRequest) {
              xmlHttpReg = new XMLHttpRequest(); 
         }
		 var url = "https://api.github.com/repos/jeremyjia/Games/issues/comments/526806470?access_token="+getToken();
			  if (xmlHttpReg != null) {
				  xmlHttpReg.open("GET", url, true);
				  xmlHttpReg.setRequestHeader('If-Modified-Since', '0');
				  xmlHttpReg.send(null);
				  xmlHttpReg.onreadystatechange = readCallBack; 
			}else{
			  alert("xmlHttpRequest is null!");
		 }

          function readCallBack() {         
              if (xmlHttpReg.readyState == 4) {            
                  if (xmlHttpReg.status == 200) {
					 var msg = JSON.parse(xmlHttpReg.responseText);
					 if(msg.body==null || msg.body==""){
						 allMsg ="";
					 }else
					   allMsg=msg.body;
                   }else{
					   alert("The status code:"+xmlHttpReg.status);
					   clearInterval(timerId);
				   }
              }
         }
	}
	
	function getToken(){		        
		return "f89b0eccf7"+"4c65a65513"+"60062c3e47"+"98d0df4577";
	}

}
_on_off_div(this,md);

   
