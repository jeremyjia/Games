//i4c4
var s= "v0.0.130 "; 
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
 
    // 调用 jsClass 的 blo0.blMakeDivMovable 接口函数，让 DIV 可拖动
    blo0.blMakeDivMovable(md );
	md.style.left = "400px";
	md.style.top = "40px";

	// 调用 jsClass 的 blo0.blDiv 接口函数，创建 DIV。 
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
	   setTimeout("readMsg()", 1000)
	}
	md.v.btnClear.onclick= function(){
	   allMsg="";
       SendMsg("Let's chat");
       setTimeout("readMsg()", 200)	   
	}
	
	 setInterval(function()
	 {
	   md.v.ta.value = allMsg;
	 },500);
	
	var allMsg="";
    readMsg();
	
	function SendMsg(ss){
		     var xmlHttpReg = null;
          if (window.ActiveXObject) {//If IE
             xmlHttpReg = new ActiveXObject("Microsoft.XMLHTTP");
	 } else if (window.XMLHttpRequest) {
              xmlHttpReg = new XMLHttpRequest(); 
         }

         var url = "https://api.github.com/repos/jeremyjia/Games/issues/comments/515761823?access_token=7895f3eb0271620f7a5ad606896258a549fd8e15";
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
				  xmlHttpReg.onreadystatechange = callBackResult;
			  }else{
			  alert("xmlHttpRequest is null!");
		}

          function callBackResult() {         
              if (xmlHttpReg.readyState == 4) {            
                  if (xmlHttpReg.status == 200) {
                   }
              }
         }
	}
		
	function readMsg() 
	{	
        var xmlHttpReg = null;
          if (window.ActiveXObject) {//If IE
             xmlHttpReg = new ActiveXObject("Microsoft.XMLHTTP");
	   } else if (window.XMLHttpRequest) {
              xmlHttpReg = new XMLHttpRequest(); 
         }
		 var url = "https://api.github.com/repos/jeremyjia/Games/issues/comments/515761823";
			  if (xmlHttpReg != null) {
				  xmlHttpReg.open("GET", url, true);
				  xmlHttpReg.setRequestHeader('If-Modified-Since', '0');
				  xmlHttpReg.send(null);
				  xmlHttpReg.onreadystatechange = callBack; 
			}else{
			  alert("xmlHttpRequest is null!");
		 }

          function callBack() {         
              if (xmlHttpReg.readyState == 4) {            
                  if (xmlHttpReg.status == 200) {
					 var msg = JSON.parse(xmlHttpReg.responseText);
					 if(msg.body==null || msg.body==""){
						 allMsg ="";
					 }else
					   allMsg=msg.body;
                   }else{
					   alert("The status code:"+xmlHttpReg.status);
				   }
              }
         }
	}

}
// 调用 jsClass 库中的全局接口函数 _on_off_div，打开或关闭 DIV（此处为 md)
_on_off_div(this,md);

   
