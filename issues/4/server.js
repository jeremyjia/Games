function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trim();
    if (c.indexOf(name) == 0) { return unescape(c.substring(name.length, c.length)); }
  }
  return "";
}

function setCookie(cname, cvalue, hours) {
  var d = new Date();
  d.setTime(d.getTime() + (hours * 60 * 60 * 1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + escape(cvalue) + "; " + expires;
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
  var result = year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
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
      timeType = 1000 * 60;
      break;
    case "hour":
      timeType = 1000 * 3600;
      break;
    case "day":
      timeType = 1000 * 3600 * 24;
      break;
    default:
      break;
  }
  return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(timeType));
}

function getToken() {
	return "ghp_Od6GW3"+"J2NiP01Zsz"+"g9JQV0amzn"+"UxhF33iBES"; //Jeremyjia
}

//Web functions ------
function getOnlineUser(userCallbackFun) {
  getGitHubComment(592918032, innerUserCallback);

  function innerUserCallback(o) {
    var userObj = o.users;
    var newUsers = [];
    var nowTime = formateDate();
    var isNeedClear = false;
    for (var i = 0; i < userObj.length; i++) {
      if (userObj[i].isLogin && getTimeDiff(userObj[i].LastloginTime, nowTime, "minute") > 60) {
        isNeedClear = true;
        newUsers.push({ "name": userObj[i].name, "LastloginTime": userObj[i].LastloginTime, "isLogin": false });
      }
      else {
        newUsers.push({ "name": userObj[i].name, "LastloginTime": userObj[i].LastloginTime, "isLogin": userObj[i].isLogin });
      }
    }

    var jsonAll = {
      "users": newUsers
    };
    userCallbackFun(jsonAll); //Notify user'callback
    if (isNeedClear) {
      updateOnlineUser(jsonAll);
      alert("Clear the status of users whoes login time greater than 60 minutes!");
    }

  }
}
function updateOnlineUser(jsonAll) {
  updateGitHubComment(592918032, jsonAll);
}

function getGitHubComment(commentId, funObj) {
  var url = "https://api.github.com/repos/jeremyjia/Games/issues/comments/"+commentId;
  myAjaxCmd('GET', url, null, usercallback);

  function usercallback(response) {
    if (response.readyState == 4) {
      if (response.status == 200 || response.status == 201) {
        var msgObj = JSON.parse(response.responseText);
        if (msgObj.body == null || msgObj.body == "") {
        } else {
          var jsonObj = JSON.parse(msgObj.body);
          funObj(jsonObj);
        }
      } else {
        alert("网络错误，可能是GitHub稳定性太差导致，请稍后再试！"+response.status);
      }
    }
  }
}

function listGitHubComments(url, funObj) {
  myAjaxCmd('GET', url, null, usercallback);
  function usercallback(response) {
    if (response.readyState == 4) {
      if (response.status == 200 || response.status == 201) {
        var jsonObj = JSON.parse(response.responseText);
        funObj(jsonObj);
      } 
    }
  }
}

function updateGitHubComment(commentId, jsonAll) {
  var url = "https://api.github.com/repos/jeremyjia/Games/issues/comments/" + commentId;
  var bodyData = JSON.stringify(jsonAll);
  var data = {
    "body": bodyData
  };

  myAjaxCmd('PATCH', url, data, function (res) {
  });
}

function updateIssueBody(issueNumber, bodyString) {
  var url = "https://api.github.com/repos/jeremyjia/Games/issues/" + issueNumber;
  var bodyData = bodyString;
  var data = {
    "body": bodyData
  };

  myAjaxCmd('PATCH', url, data, function (res) {
  });
}

function addNewGitHubIssue(issueTitle, jsonAll, callbackFun) {
  var url = "https://api.github.com/repos/jeremyjia/Games/issues";
  var data = {
	"title": issueTitle,
    "body": jsonAll
  };

  myAjaxCmd('POST', url, data, function (response) {
    callbackFun(response);
  });
}

function addNewGitHubComment(issueId, jsonAll, callbackFun) {
  var url = "https://api.github.com/repos/jeremyjia/Games/issues/" + issueId + "/comments";
  var data = {
    "body": jsonAll
  };

  myAjaxCmd('POST', url, data, function (response) {
    callbackFun(response);
  });
}

function deleteGitHubComment(commentId, callbackFun) {
 var url = "https://api.github.com/repos/jeremyjia/Games/issues/comments/" + commentId;

  myAjaxCmd('DELETE', url, null, function (response) {
    callbackFun(response);
  });
}


function uploadFileToGitHub(message, filePath, base64FileContent, callbackFun) {
  var url = "https://api.github.com/repos/jeremyjia/Games/contents/" + filePath;
  var data = {
    "message": message,
    "content": base64FileContent
  };

  myAjaxCmd('PUT', url, data, function (response) {
    callbackFun(response);
  });
}


//This is a common method used for sending or receving information from Github
function myAjaxCmd(method, url, data, callback) {
  var xmlHttpReg = null;
  if (window.XMLHttpRequest) {
    xmlHttpReg = new XMLHttpRequest();
  } else {
    xmlHttpReg = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlHttpReg.onreadystatechange = function () {
    callback(xmlHttpReg);
  };
  xmlHttpReg.open(method, url, true);
  if (method == "PATCH" || method == "POST") {
    xmlHttpReg.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttpReg.setRequestHeader("Authorization", "token " + getToken());
    xmlHttpReg.send(JSON.stringify(data));
  }else if (method == "DELETE") {
    xmlHttpReg.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttpReg.setRequestHeader("Authorization", "token " + getToken());
    xmlHttpReg.send(null);
  } else if (method == "GET") {
    xmlHttpReg.setRequestHeader('If-Modified-Since', '0');
    xmlHttpReg.setRequestHeader("Authorization", "token " + getToken());
    xmlHttpReg.send(null);
  } else {
    xmlHttpReg.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttpReg.setRequestHeader("Authorization", "token " + getToken());
    xmlHttpReg.send(JSON.stringify(data));
  }
}