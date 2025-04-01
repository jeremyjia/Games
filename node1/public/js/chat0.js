/**
 * ghChat.js 重构自 chat0.js
 * 去掉blo0相关代码
 * 测试发现 ClearMsg 实现不对
 * 修正 ghChat.js ： 
 *  以下代码保持原样不要动
 *  TOKENS: [
          "ghp_Od6GW3"+"J2NiP01Zsz"+"g9JQV0amzn"+"UxhF33iBES", //Jeremy
       "ghp_LWbSRdeNb"+"tr0wykbm2Q"+"TFqxdP6x4u"+"A4MQH0M" //XiYu
      ]
   请返回完整的新代码 ghChat.js    
 */

//chat0.js 
var md = blo0.blDiv(document.body, "div_ID_4_I4C4", "room1_v0.12" ,blGrey[0]);  
md.addTimerUser = function(o){
		if(!md.timerUsers) md.timerUsers = [];
		if(o) md.timerUsers.push(o);
}

md.timer2Users = function(_u){
		if(md.timerUsers){
			for(i in md.timerUsers){
				if(md.timerUsers[i].fTimer){
					md.timerUsers[i].fTimer(_u);
				}
			}
		}
}

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
	md.style =style;
	
	var title = blo0.blDiv(md , "div_ID_4_I4C4" + "Header", "Header");
	style ="padding: 10px;";
	style += "z-index: 10;";
	style += "cursor: move;";
	style += "text-align: center;";
	style += "border: 1px solid #fff;";
	style += "background-color: #2196F3;";
	title.style =style;
 
    blo0.blMakeDivMovable(md);
	md.style.left = "400px";
	md.style.top = "40px";

	md.v = blo0.blDiv(md,md.id+"v","",blColor[1]);
	
    md.v.userInfo = blo0.blDiv(md.v,md.v.id+"userInfo","User:",blColor[6]);
	md.v.btnExit = blo0.blBtn(md.v, md.v.id + "btnExit", 'Logoff', blGrey[1]);
	//Logoff on click
    md.v.btnExit.onclick = function(){
	   bl$(md.v.id).style.display = "none";
	   bl$(md.vLogin.id).style.display = "block";

	   clearInterval(timerId);   
	   getOnlineUser(false);
	   setTimeout(function(){logOff();}, 1000);
	   sleep(1000);
    }
	
	md.v.ta = blo0.blTextarea(md.v, "id_4_ta_showMsg", "", blGrey[3]);
	md.v.ta.style.width="98%"; 
	md.v.ta.style.height="240px"; 
	
	md.v.ta1 = blo0.blTextarea(md.v, "id_4_ta_SendMsg", "", blGrey[4]);
	md.v.ta1.style.width="98%"; 
	md.v.ta1.style.height="40px";
	
	md.v.btnSend = blo0.blBtn(md.v,"id_4_btnSend","SendMsg",blColor[4]);
	md.v.btnClear = blo0.blBtn(md.v,md.v.id+"btnClear","ClearMsg",blColor[4]);
	
	md.v.btnSend.onclick= function(){	
	   var s = md.v.ta1.value;
	   if(s!=""){
		 dispatchMessage(s);
	   }
	   md.v.ta1.value="";	
	}
	md.v.btnClear.onclick= function(){s
	   allMsg="";
       SendMsg("Let's chat");
	}
	
	md.vUser = blo0.blDiv(md.v, md.id+"div_user_list","",blColor[2]);
    md.vUser.style.width="98%"; 
	md.vUser.style.height="80px";
	
	var oAhref = blo0.blLink(md.vUser, md.vUser.id+"refresh","Get online user",'javascript:void(0);',blGrey[0]);
	oAhref.onclick = function(){
		clearStatus(); //Clear the status of users whoes login time greater than 24 hours!
		getOnlineUser(true);
    }

     function clearStatus()
	 {
		var userObj = globalJsonObj.users;
		var newUsers = [];
		var nowTime = formateDate();
		var isNeedClear=false;
		for(var i = 0; i < userObj.length; i++)
		{
			if(userObj[i].isLogin && getTimeDiff(userObj[i].LastloginTime, nowTime, "hour")>24){
			   isNeedClear = true;
			   newUsers.push({"name":userObj[i].name,"LastloginTime":userObj[i].LastloginTime,"isLogin":false});
			}
			else{
			   newUsers.push({"name":userObj[i].name,"LastloginTime":userObj[i].LastloginTime,"isLogin":userObj[i].isLogin});
			}
		}	
		if(isNeedClear)
		{
			var jsonAll= {
			 "users":newUsers
			};
		   updateOnlineUser(jsonAll);
		   alert("Clear the status of users whoes login time greater than 24 hours!");
		   sleep(2000);
		 }	 
	 }
     function logOff(){
		var userObj = globalJsonObj.users;
		var newUsers = [];
		var userName = md.vLogin.ta.value;
		for(var i = 0; i < userObj.length; i++)
		{
			if(userObj[i].name == userName){
				newUsers.push({"name":userObj[i].name,"LastloginTime":userObj[i].LastloginTime,"isLogin":false});
			}else{
				newUsers.push({"name":userObj[i].name,"LastloginTime":userObj[i].LastloginTime,"isLogin":userObj[i].isLogin});
			}
		}
		var jsonAll= {
		  "users":newUsers
		};
		updateOnlineUser(jsonAll);
	 }
	 
	 function toLogin(){
	   	var userObj = globalJsonObj.users;
		var userName = md.vLogin.ta.value;
		var newUsers = [];
		var bExist=false;
		for(var i = 0; i < userObj.length; i++){
			if(userObj[i].name != userName){
				newUsers.push({"name":userObj[i].name,"LastloginTime":userObj[i].LastloginTime,"isLogin":userObj[i].isLogin});
			}else{
				bExist = true;
				newUsers.push({"name":userObj[i].name,"LastloginTime":formateDate(),"isLogin":true});
			}
		}
		if(!bExist){
			newUsers.push({"name":userName,"LastloginTime":formateDate(),"isLogin":true});
		}
		var jsonAll= {
		  "users":newUsers
		};
		updateOnlineUser(jsonAll);
		
	    if(md.vUser.Temp)
		{
		   md.vUser.removeChild(md.vUser.Temp);
		   md.vUser.Temp = blo0.blDiv(md.vUser, md.vUser.id+"user_list","",blColor[2]);
		}
	 }
	 
     function showUser(jsonObj){
		var userObj = jsonObj.users;
		var loginUsers = [];
		for(var i = 0; i < userObj.length; i++){
			if(userObj[i].isLogin){
				loginUsers.push(userObj[i].name);
			}
		}
		
		if(md.vUser.Temp){
		  md.vUser.removeChild(md.vUser.Temp);
		}
		md.vUser.Temp = blo0.blDiv(md.vUser, md.vUser.id+"user_list","",blColor[2]); 
        loginUsers.forEach(listUser);
	 }
	 function listUser(value, index, array) {	
		 var user = value;
		 var oLi= document.createElement('li');
		 var oLabel = document.createElement("label");
		 var label_text = document.createTextNode(user);
		 oLabel.appendChild(label_text);
		 oLi.appendChild(oLabel);		
		 md.vUser.Temp.appendChild(oLi);
     }
	
	 var nTokenNum; 
	 var timerId;	 
	 function readTimer(){
		readMsg();
	    md.v.ta.value = allMsg; 
	    md.timer2Users(md.vLogin.ta.value);
	 }
	
	var allMsg="";
	var globalJsonObj;
	bl$(md.v.id).style.display = "none";
	//Login
	md.vLogin = blo0.blDiv(md,md.id+"vLogin","User Name:",blColor[1]);
	
	md.vLogin.ta = blo0.blTextarea(md.vLogin, md.vLogin.id+"ta", "", blGrey[3]);
	md.vLogin.ta.style.width="50%"; 
	md.vLogin.ta.style.height="25px";
	
	md.v.line = blo0.blDiv(md.vLogin, md.vLogin.id+"line","",blColor[1]);
	md.vLogin.btnLogin = blo0.blBtn(md.vLogin,md.vLogin.id+"btnLogin","Login",blColor[2]);	
	md.vLogin.btnLogin.onclick= function(){	
	
	   if(md.vLogin.ta.value==""){
		   alert("Please input a user name");
		   return;
	   }
	   nTokenNum = Math.round(Math.random() * (1));//0,1
	   if(nTokenNum==0) {
	     md.v.style.background=blColor[1];
	   }else{
		 md.v.style.background="#EC64B5";
	   }
	   var userName= md.vLogin.ta.value;
	   md.v.userInfo.innerHTML ="User:" + userName;
       bl$(md.v.id).style.display = "block";
	   bl$(md.vLogin.id).style.display = "none";
	   timerId = setInterval(readTimer, 1000);
	   getOnlineUser(false);
	   sleep(1000);
	   setTimeout(function(){toLogin();}, 1000);
	}
	//End Login
	
	function addBtn(number)
	{
	  md.v.d1 = blo0.blDiv(md,md.id+"vd1","",blColor[1]);
	  function _Comments(o) {
		var index = 0;
		var parentDiv = md.v.d1;
		for(i in o){
		 index++;
		 if(index == number)
		 {
			var a = o[i].body;
			
			var oTd = document.createElement('td');
			parentDiv.appendChild(oTd);
			
			var btnJS = blo0.blBtn(oTd, parentDiv.id+"btnJS"+index,index,blGrey[2]);
			btnJS.onclick = function(_txt){
				return function(){
					eval( _txt);
				}
			}(a);
			var oA = blo0.blLink(oTd, parentDiv.id+"blLink"+index,"Delete",'javascript:;',blGrey[0]);
			oA.onclick = function(){
              parentDiv.removeChild(this.parentNode);
            }
		 }
	
		}
	 }
	 
	 var _src = "https://api.github.com/repos/jeremyjia/Games/issues/4/comments";
	 w3.getHttpObject(_src, _Comments);
    }
	
	function dispatchMessage(message){
		var beginWith = message.toLowerCase().substr(0,4); 
		if( beginWith == "cmd:" ){
			var id = message.substr(message.indexOf(":")+1);
			if(id == "help"){
			  var help = "Please use \"cmd:number\" format to load our plugins.";
			  SendMsg(help);
			}else{
			  addBtn(id);
			}
		}else{
			var user_Name=md.vLogin.ta.value;
			var sMsg = formateDate()+"\n"+user_Name+":"+message;
			SendMsg(sMsg);
		}
		
	}
	function SendMsg(ss)
	{
	    var url = "https://api.github.com/repos/jeremyjia/Games/issues/comments/526806470";	
        var myMsg=allMsg;
		if(myMsg!=""){
			myMsg+="\n";
		}
		myMsg+=ss;
		var data= {
		"body": myMsg
		};
		
		myAjaxCmd('PATCH',url, data, function(res) {         
           if (res.readyState == 4) {            
              if (res.status != 200) {
				alert("Write:"+ res.status);
             }
           }
        });
	}
		
	function readMsg() 
	{
		var url = "https://api.github.com/repos/jeremyjia/Games/issues/comments/526806470";
		myAjaxCmd('GET',url, null, readCallBack);
	
        function readCallBack(resp){
			if(resp.readyState == 4){
			  if(resp.status==200){
				  var msg = JSON.parse(resp.responseText);
				  if(msg.body==null || msg.body==""){
					allMsg ="";
				  }else allMsg=msg.body;
			  }else{
				alert("The status code:"+resp.status);
				clearInterval(timerId); 
			  }
		    }			 
         }
	}
	
	function getOnlineUser(isShow){
		var url = "https://api.github.com/repos/jeremyjia/Games/issues/comments/543738078";
		myAjaxCmd('GET',url, null, usercallback);
	
        function usercallback(response){
			if(response.readyState == 4){
			  if(response.status==200){
				  var msgObj = JSON.parse(response.responseText);
				  if(msgObj.body==null || msgObj.body==""){
				  }else{ 
					var jO = JSON.parse(msgObj.body);
					globalJsonObj = jO;
					 if(isShow)
					   showUser(jO);
				}	  
			  }
		    }			 
         }
	}
	
	function updateOnlineUser(jsonAll)
	{
	    var url = "https://api.github.com/repos/jeremyjia/Games/issues/comments/543738078";	
		var bodyData = JSON.stringify(jsonAll);
		var data= {
		 "body": bodyData
		};
		
		myAjaxCmd('PATCH',url, data, function(res) {         
           if (res.readyState == 4) {            
              if (res.status != 200) {
				alert("Write:"+ res.status);
             }
           }
        });
	}
	
	var tokenArray = new Array();
	tokenArray[0] = "ghp_Od6GW3"+"J2NiP01Zsz"+"g9JQV0amzn"+"UxhF33iBES"; //Jeremy
	//tokenArray[1] = "github_pat_11ARID6XI03"+"EPRn2jvrEaJ_9p1xckKElpo9D9Xt616u6w2hEUKA"+"TOFrBlFetLWKljrX562X3OMpeB8Dz1D"; //Wangxu's tk
	tokenArray[1] = "ghp_LWbSRdeNb"+"tr0wykbm2Q"+"TFqxdP6x4u"+"A4MQH0M"; //XiYu	
	function getToken(){	
	  return tokenArray[nTokenNum];
	}
	
	function formateDate() {
		var datetime = new Date();
		var year = datetime.getFullYear(),
			month = ("0" + (datetime.getMonth() + 1)).slice(-2),
			date = ("0" + datetime.getDate()).slice(-2),
			hour = ("0" + datetime.getHours()).slice(-2),
			minute = ("0" + datetime.getMinutes()).slice(-2),
			second = ("0" + datetime.getSeconds()).slice(-2);
		var result = year + "-"+ month +"-"+ date +" "+ hour +":"+ minute +":" + second;
		return result;
	}
	
	function getTimeDiff(startTime, endTime, diffType) {
		//xxxx-xx-xx -> xxxx/xx/xx
		startTime = startTime.replace(/\-/g, "/");
		endTime = endTime.replace(/\-/g, "/");
		diffType = diffType.toLowerCase();
		var sTime = new Date(startTime);
		var eTime = new Date(endTime);
		var timeType;
		switch (diffType) {
		  case "minute":
            timeType = 1000*60;
          break;
		  case "hour":
			timeType =1000*3600;
		  break;
		  case "day":
			timeType = 1000*3600*24;
		  break;
		  default:
		  break;
        }
    return parseInt((eTime.getTime()-sTime.getTime())/parseInt(timeType));
}
	function sleep(delay) {
	  var start = (new Date()).getTime();
	  while ((new Date()).getTime() - start < delay) {
		continue;
	  }
	}
	//This is a common method used for sending or receving information from Github
	function myAjaxCmd(method, url, data, callback){
		var xmlHttpReg = null;
		if (window.XMLHttpRequest){
		  xmlHttpReg = new XMLHttpRequest();
		}else{
		  xmlHttpReg = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlHttpReg.onreadystatechange = function (){
	      callback(xmlHttpReg);
		};
		xmlHttpReg.open(method, url, true);
		if(method == "PATCH" || method == "POST"){
			xmlHttpReg.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xmlHttpReg.setRequestHeader("Authorization", "token " + getToken());
			xmlHttpReg.send(JSON.stringify(data));
		}else if(method == "GET"){
			xmlHttpReg.setRequestHeader('If-Modified-Since', '0');
			xmlHttpReg.setRequestHeader("Authorization", "token " + getToken());
			xmlHttpReg.send(null);
		}
	}
}
_on_off_div(this,md);

   
