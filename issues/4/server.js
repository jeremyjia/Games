function getCookie(cname){
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) {
		var c = ca[i].trim();
		if (c.indexOf(name)==0) { return unescape(c.substring(name.length,c.length)); }
	}
	return "";
}

function setCookie(cname,cvalue,hours){
  var d = new Date();
  d.setTime(d.getTime()+(hours*60*60*1000));
  var expires = "expires="+d.toGMTString();
 document.cookie = cname+"="+escape(cvalue)+"; "+expires;
}

function sleep(delay) {
  var start = (new Date()).getTime();
  while ((new Date()).getTime() - start < delay) {
  continue;
  }
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

function getToken(){	
  return "f89b0eccf7"+"4c65a65513"+"60062c3e47"+"98d0df4577"; //Jeremyjia
}

//Web functions ------
function getOnlineUser(callBackFun){
  getGitHubComment(592918032, callBackFun);
}
function updateOnlineUser(jsonAll)
{
  updateGitHubComment(592918032, jsonAll);
}

function getGitHubComment(commentId, funObj){
    var url = "https://api.github.com/repos/jeremyjia/Games/issues/comments/"+commentId+"?access_token="+getToken();
    myAjaxCmd('GET',url, null, usercallback);

    function usercallback(response)
    {
       if(response.readyState == 4)
       {
         if(response.status == 200){
           var msgObj = JSON.parse(response.responseText);
           if(msgObj.body==null || msgObj.body==""){
           }else{ 
              var jsonObj = JSON.parse(msgObj.body);
              funObj(jsonObj);
           }	  
          }else{
                  alert("网络错误，可能是GitHub稳定性太差导致，请稍后再试！");
              }
        }			 
      }
    }

function updateGitHubComment(commentId, jsonAll)
{
  var url = "https://api.github.com/repos/jeremyjia/Games/issues/comments/"+commentId+"?access_token="+getToken();	
  var bodyData = JSON.stringify(jsonAll);
  var data= {
   "body": bodyData
  };
  
  myAjaxCmd('PATCH',url, data, function(res) {         
      });
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
    xmlHttpReg.send(JSON.stringify(data));
  }else if(method == "GET"){
    xmlHttpReg.setRequestHeader('If-Modified-Since', '0');
    xmlHttpReg.send(null);
  }
}