const tag = "[old/plx/i630.js_v0.0.45]";
const co = new C4I630(bl$("id_MDIV_4_i630"));
co.run();

function C4I630(d){
    var _p = d;
    var xmlHttp = false;

    this.run = function(){      _init(_p,this);    } 
    this.postAJX = function(url,oDiv){   
      _post_AJX (url,oDiv); 
    }
 
    const _makeAJX_obj = function(){
      try {
        xmlHttp = new XMLHttpRequest();
      } catch(trymicrosoft) {
        try {
            xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch(othermicrosoft) {
            try {
                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch(failed) {
                xmlHttp = false;
                alert("failed to create AJX Object.");
            }
        }
      }
    }
    const _post_AJX = function (url,_od){ 
      var myData = "UserName=aaa"; 
      xmlHttp.open("POST",url,true);
      //xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xmlHttp.setRequestHeader("Content-type", "application/json");
      xmlHttp.onreadystatechange=function(){
        _xd_POST_done(_od); 		 
      };
      xmlHttp.send(myData); 
      _od.innerHTML="很努力地加载中..." + url + "::" + Date();
    }
    const _xd_POST_done = function (_outShow) { 
      if (xmlHttp.readyState == 4) {
        _outShow.innerHTML = "done: " + Date();
          if (xmlHttp.status == 200) {
            _outShow.innerHTML = "200: " + Date();
          }
          else{
            _outShow.innerHTML = "error in server." + xmlHttp.status;
          }
      }
    }
  
    var _init = function(d,_co){ 
      _makeAJX_obj();
      d.tb = blo0.blDiv(d,d.id+"tb", "tb_4_"+tag,blGrey[1]);
      d.v1 = blo0.blDiv(d,d.id+"v1", tag+"v1", blGrey[0]);
      d.tb.b1 = blo0.blBtn(d.tb,d.tb.id+"b1","b1",blGrey[2]);
      d.tb.b2 = blo0.blBtn(d.tb,d.tb.id+"b2","b2",blGrey[2]);
      d.tb.b3 = blo0.blBtn(d.tb,d.tb.id+"b3","b3",blGrey[2]);
  
      var w = {};
      w._2do = function(txt){
          d.v1.innerHTML = txt;
      } 
      d.tb.b1.onclick = function(){
        blo0.blAjx(w,"https://littleflute.github.io/english/NewConceptEnglish/Book2/1.lrc");
      }
      d.tb.b2.onclick = function(){      
        _co.postAJX('http://localhost:8080/api/checkUserName',d.v1);
      }
      d.tb.b3.onclick = function(){       
        const url = 'http://localhost:8080/api/checkEmailAddress?EmailAddress=asdf'; 
        blo0.blAjx(w,url);//_co.postAJX(url,d.v1);

      }
    }
  }