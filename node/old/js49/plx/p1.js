const tag = "[old/js49/plx/p1.js_v0.153]";
const p1Btn = bl$("id_plx1_btn");  
var _myPort = 8080; 
var vBreakNews = null;  

let clientId = null;
let gameId = null;
let playerColor = null;

 
const txtGameId = document.getElementById("txtGameId"); 
const divBoard = document.getElementById("divBoard");    

var wso = null;
  
p1Btn.onclick = function(){    
    if(!this.v){
        var t = new CTest();
        this.v = t.run();       
    } 
    var d = bl$("id_md");
    blon(this,d,"grey","green");
}
function _setSvr(wsurl,_btnDbg){
    var o = new WebSocket(wsurl);
    o.add1Game = function(_o){        
        return function(tb,_name){
            tb.innerHTML = "" + _name;
            var btnGame = blo0.blBtn(tb,tb.id+"btnGame","+Game",blGrey[3]);
            btnGame.onclick = function(){
                const payLoad = {
                    "method": "create",
                    "clientId": clientId
                }

                _o.send(JSON.stringify(payLoad));
            }

            var playGame = blo0.blBtn(tb,tb.id+"playGame","->playGame",blGrey[3]);
            playGame.onclick = function(){ 
                if (gameId === null)
                    gameId = txtGameId.value;
                
                const payLoad = {
                    "method": "join",
                    "clientId": clientId,
                    "gameId": gameId
                }

                wso.send(JSON.stringify(payLoad));
            }
            var chat2All = blo0.blBtn(tb,tb.id+"chat2All","->chat2All",blGrey[3]);
            chat2All.onclick = function(){
                var ta = bl$("id_ta_4_Chat");   
                var d = new Date();
                var msg = ta.value + " " + d.toLocaleTimeString();
                           
                const payLoad = {
                    "method"        : "mChat2All",
                    "fromClientId"  : clientId,
                    "toClientId"    : bl$("id_2ID_4_Chat").innerHTML,
                    "msg"           : msg 
                }
                wso.send(JSON.stringify(payLoad));
            }
        }
    }(o);
    o.onmessage = message => {
        //message.data
        const response = JSON.parse(message.data);
        
        if (response.method === "connect"){
            clientId = response.clientId;  
        } 
        if (response.method === "mChat2All"){ 
            var v = bl$("id_div_4_Chat"); 
            var s = response.msg + " _from_ " + response.fromClientId + " _to_ " + response.toClientId;
            v.v2.addMsg(s);
            _btnDbg.setS(s);
        } 
      
      
        if (response.method === "newGame"){
            gameId = response.game.id; 
            var v4game = bl$("id_div_4_Games");
            v4game.addGame(gameId);   
        }
     
        if (response.method === "mBreakNews"){
            vBreakNews.innerHTML = response.news;
            var n = 0;
            for(i in response.clientIdList){
                //if(response.clientIdList[i]!="undefined")
                {
                    var cs = blo0.blDiv(vBreakNews,vBreakNews.id+"clients" +i,"playerID: " + response.clientIdList[i],blColor[n]);
                    cs.onclick = function(_this,_id){                        
                        return function(){
                            var v = bl$("id_2ID_4_Chat");   
                            v.innerHTML = _id;
                        }
                    }(cs,response.clientIdList[i]);
                    n++;
                }
            }   
            var cs = blo0.blDiv(vBreakNews,vBreakNews.id+"clients - all"  ,"playerID: " + "ALL","white");
            cs.onclick = function(){  
                var v = bl$("id_2ID_4_Chat");   
                v.innerHTML = "all";            }
        }
    
    
        //update
        if (response.method === "update"){
            //{1: "red", 1}
            if (!response.game.state) return;
            for(const b of Object.keys(response.game.state))
            {
                const color = response.game.state[b];
                const ballObject = document.getElementById("ball" + b);
                ballObject.style.backgroundColor = color
            }    
        }
    
        //join
        if (response.method === "join"){
            const game = response.game;
          

            var v = bl$("id_div_4_Players");
            v.innerHTML = "";
            game.clients.forEach (c => {
    
                const d = document.createElement("div");
                d.style.width = "200px";
                d.style.background = c.color
                d.textContent = c.clientId;
                
                v.addPlayer(clientId,c.clientId,c.color);
    
                if (c.clientId === clientId) playerColor = c.color;
            })
    
    
            while(divBoard.firstChild)
            divBoard.removeChild (divBoard.firstChild)
    
            for (let i = 0; i < game.balls; i++){
    
                const b = document.createElement("button");
                b.id = "ball" + (i +1);
                b.tag = i+1
                b.textContent = i+1
                b.style.width = "150px"
                b.style.height = "150px"
                b.addEventListener("click", e => {
                    b.style.background = playerColor
                    const payLoad = {
                        "method": "play",
                        "clientId": clientId,
                        "gameId": gameId,
                        "ballId": b.tag,
                        "color": playerColor
                    }
                    wso.send(JSON.stringify(payLoad))
                })
                divBoard.appendChild(b);
            }
        }
    }
    _btnDbg.setS("_setSver OK");
    return o;
}

p1Btn.onclick();

function CTest(){
    var md = null;
    var x = screen.width*0.021;
    var y = screen.height*0.15;
    var w =  screen.width*0.8545;
    var h = screen.height*0.15;
    var myObj = {};
    myObj.playground = function(b,v){
        var c = "white";
        if(!md.playground)
        {
            md.playground = blo0.blDiv(md,md.id+"playground","",c); 

            var v = blo0.blDiv(md.playground,md.playground.id+"v","",blGrey[3]);

            var cvs = blo0.blCanvase(v,w,444,"grey");      
            blo0.blText(cvs,"test",55,55,30,"green");          
            b.b = false;                
        } 
        blon(b,md.playground,blGrey[0],c); 
    }
  
    
    myObj.server = function(b,v){
        var c = "lightgreen"; 
        if(!md.server)
        {
            var sss = 'blo0.blText(cvs,"server.dbg",222,211,20,"blue");';
            md.server = blo0.blDiv(md.v,md.v.id+"server","server",c);
            b.b = false;        
            var tb = blo0.blDiv(md.server,md.server.id+"sv","",blGrey[0]);
            var dbgBtn = blo0.dbgBtn(tb,"dbg","grey",c,
                    function(cvs,_x,_y,_w,_h){
                        blo0.blRect(cvs,_x,_y,_w,_h,"yellow");
                        blo0.blText(cvs,"server.drawing: ",_x,_y-5,20,c);
                        eval(sss);
                    },
                    function(_btn){//init	  				
                        if(wso!=null){          
                            _btn.setS("xd init : wso = " + wso);
                        }  
                        else{
                            _btn.setS("xd init : wso = " + wso);

                        }
                    },
                    function(_btn,_x,_y){//mousedown	  				  
                        _btn.setDown(true);
                    },
                    function(_btn,_x,_y){//mouseup	  
                        _btn.setDown(false);
                    },
                    function(_btn,_x,_y){	//mousemove	 
                        if(_btn.getDown()){
                            
                        } 
                    }
            ); 
            var btnLogin = blo0.blBtn(tb,"idBtnLogin","login",blGrey[1]);
            btnLogin.token = "";
            btnLogin.onclick = function(){ 
                var s = "UserName: <input type = 'text' id = 'idUser' value='u1'><br>";
                s += "PassWord: <input type = 'text' id = 'idPW'  value='u1'><br>";
                s += "<button id = 'idSignUp'>Sign up</button><br>";
                if(!this.v){
                    this.signup = function(){
                        var u = bl$("idUser");
                        var pw = bl$("idPW");
                        var settings = {
                            "url": "http://localhost:" + _myPort + "/api/NewPlayer",
                            "method": "POST",
                            "timeout": 0,
                            "headers": {
                                "accept": "application/json",
                                "Content-Type": "application/json"
                            },
                            "data": JSON.stringify({"UserName":u.value,"Password":pw.value}),
                        };
                        $.ajax(settings).done(function (response) {  
                            btnLogin.v.innerHTML=JSON.stringify(response);
                            if(response.code==1){ 
                                btnLogin.innerHTML = response.info;
                                btnLogin.innerHTML = "to log in";
                            }
                            else if(0==response.code){
                                btnLogin.innerHTML = response.info;
                                btnLogin.innerHTML = "try again";
                            }
                        });   
                    }
                    this.v = blo0.blDiv(tb,tb.id+"vLogin","vLogin",blGrey[0]); 
                    this.v.innerHTML = s;
                    var btnSignUp = bl$("idSignUp");
                    btnSignUp.onclick = function(){                        btnLogin.signup();              }
                } 
                else if("login"==btnLogin.innerHTML){
                    var u = bl$("idUser");
                    var pw = bl$("idPW");
                    var settings = {
                        "url": "http://localhost:" + _myPort + "/api/login",
                        "method": "POST",
                        "timeout": 0,
                        "headers": {
                            "accept": "application/json",
                            "Content-Type": "application/json"
                        },
                        "data": JSON.stringify({"UserName":u.value,"Password":pw.value}),
                    };
                    $.ajax(settings).done(function (response) {  
                        if(response.code==1){
                            btnLogin.userName = response.userName;
                            btnLogin.userID = response.userID;
                            btnLogin.token = response.token;
                            btnLogin.innerHTML = "logout";
                            btnLogin.v.innerHTML="";
                            var tb1 = blo0.blDiv(btnLogin.v,"id_tb1","token",blGrey[0]);
                            
                            vBreakNews = blo0.blDiv(btnLogin.v,btnLogin.v.id+"BreakNews","news","white"); 

                            var v4players = blo0.blDiv(btnLogin.v,"id_div_4_Players","allPlayers",blGrey[4]);
                            var v4games = blo0.blDiv(btnLogin.v,"id_div_4_Games","Games",blGrey[2]);
                            var v4Chat = blo0.blDiv(btnLogin.v,"id_div_4_Chat","v4Chat","lightgreen");
                            v4Chat.v1 = blo0.blDiv(v4Chat,v4Chat.id+"v1","v1",blGrey[3]);
                            v4Chat.v2 = blo0.blDiv(v4Chat,v4Chat.id+"v2","v2","skeyblue");
                            v4Chat.v2.addMsg = function(msg){
                                if(!this.n) this.n = 0;
                                this.n++;
                                if(this.n>5){
                                    this.innerHTML = "";
                                    this.n = 0;
                                }
                                var dm = blo0.blDiv(this,this.id+this.n,"dm"+this.n + "_" + msg,blGrey[this.n]);
                                                                
                            }
                            v4Chat.v1.v2D = blo0.blDiv(v4Chat.v1,"id_2ID_4_Chat","2ID","brown");
                            v4Chat.v1.ta = blo0.blTextarea(v4Chat.v1,"id_ta_4_Chat","msg...","lightblue");
                            v4Chat.v1.ta.style.width = 100 + "%";
                            v4Chat.v1.ta.style.height = 111 + "px";


                            
                            v4players.addPlayer = function(_vpl){
                                _vpl.ls = [];
                                return function(myID,loopID,clr){
                                    var l = _vpl.ls.length;
                                    var s = "player"+l+":id="+loopID;
                                    if(myID==loopID) s+= "[*]";
                                    var p = blo0.blDiv(_vpl,_vpl.id+l,s,clr);
                                    _vpl.ls.push(p);
                                }
                            }(v4players);
                            v4games.addGame = function(_vgs){                                
                                _vgs.ls = [];
                                return function(id){
                                    var l = _vgs.ls.length;
                                    var g = blo0.blDiv(_vgs,_vgs.id+l,"g"+l+":id="+id,blGrey[3]);
                                    g.onclick = function(_g,_id){
                                        return function(){
                                            txtGameId.value = _id;                     
                                        }
                                    }(g,id);
                                    _vgs.ls.push(g);
                                }
                            }(v4games);
                            tb1.b1 = blo0.blBtn(tb1,tb1.id+"b1","b1",blGrey[1]);
                            tb1.b1.onclick = function(){
                                if(!this.v1){
                                    var v1 = blo0.blDiv(btnLogin.v,"id_v1","v1",blGrey[0]);
                                    v1.ta = blo0.blTextarea(v1,v1.id+"ta","","lightblue");
                                    v1.ta.style.width = 100 + "%";
                                    v1.ta.style.height = 111 + "px";
                                    this.v1 = v1;
                                    v1.ta.value = btnLogin.token;
                                }   
                                blon(this,this.v1,"grey","green");
                            }
                            
                            tb1.btnConnect = blo0.blBtn(tb1,tb1.id+"btnConnect","connect",blGrey[1]);
                            tb1.btnConnect.onclick = function(){
                                var url = "ws://localhost:9090?";
                                url += "userName="+btnLogin.userName;
                                url += "&userID="+btnLogin.userID;
                                url += "&token="+btnLogin.token;
                                wso = _setSvr(url,dbgBtn);  
                                wso.add1Game(tb1,btnLogin.userName);
                                addFun1(tb1,btnLogin,wso);
                            }
                        }
                        else if(0==response.code){
                            btnLogin.innerHTML = "try again";
                            btnLogin.v.innerHTML=JSON.stringify(response);
                        }
                    });   
                }
                else if("logout"==btnLogin.innerHTML || "try again"==btnLogin.innerHTML 
                        ||"to log in" == btnLogin.innerHTML
                ){
                    if("logout"==btnLogin.innerHTML )
                    {
                        if(wso) wso.close();
                    }


                    btnLogin.token = "";
                    btnLogin.innerHTML = "login";
                    btnLogin.v.innerHTML = s;
                    var btnSignUp = bl$("idSignUp");
                    btnSignUp.onclick = function(){       btnLogin.signup();     }
                }
            }
        } 
        blon(b,md.server,blGrey[0],c);
    } 
    
    this.run = function(){
        var cs = blGrey;
        md = blo0.blMD("id_md", tag ,x,y,w,h,cs[0]);
        md.tb = blo0.blDiv(md,md.id+"tb","md.tb",cs[1]); 
        md.v = blo0.blDiv(md,md.id+"v","md.v",cs[2]); 
        var n = 0;
        for(i in myObj){
            var b = blo0.blBtn(md.tb,md.tb.id+"_btn_"+ i, i,cs[n]);
            b.style.float = "left";
            b.onclick = function(_this,_v,_i){
                return function(){
                    myObj[_i](_this,_v);
                }
            }(b,md.v,i);
            n++;
        } 
    }
    return md;
}

function addFun1(_tb,_btn,_wso){    
    var b = blo0.blBtn(_tb,_tb.id+"Fun1","Fun1",blGrey[3]);
    b.onclick = function(){ 
        if(!b.v){
            b.v = blo0.blMDiv(b.parentElement.parentElement,"v4Fun1", "Fun1",333,11,500,222,blGrey[0]);
            var tb = blo0.blDiv(b.v,b.v.id+"tb","tb",blGrey[3]);
            var v = blo0.blDiv(b.v,b.v.id+"v","v",blGrey[3]);
            tb.b1 = blo0.blBtn(tb,tb.id+"b1","allPlayers",blGrey[0]);
            tb.b1.onclick = function(){
                var settings = {
                    "url": "http://localhost:" + _myPort + "/api/getAllPlayers",
                    "method": "GET",
                    "timeout": 0,
                    "headers": {
                        "Authorization": " Bearer " + _btn.token
                    },
                };
            
                $.ajax(settings).done(function (response) {
                    //var s = "var a = "+response;                    eval (s); 
                    var a = response.str;//JSON.stringify(response); 
                    //blo0.blShowObj2Div(v,a);
                    //*
                    v.innerHTML = "allPlayers:"+a.length;
                    var d0 = blo0.blDiv(v,v.id+"d0"+i,"d0",blGrey[0]);
                    var ls = [];
                    for(i in a){
                        var n = ls.length;
                        var v4u = blo0.blDiv(v,v.id+n, n,blColor[n]);

                        
                        var btnSendMsg = blo0.blBtn(v4u,v4u.id+"btnSendMsg","->Msg",blGrey[0]); 
                        btnSendMsg.style.float = "left";
                        btnSendMsg.onclick = function(_2ID){
                            return function(){
                                var ta = bl$("id_ta_4_Chat");   
                                var d = new Date();
                                var msg = ta.value + " " + d.toLocaleTimeString();
                                    
                                const payLoad = {
                                    "method"        : "mChat2All",
                                    "fromClientId"  : _btn.userID,
                                    "toClientId"    : _2ID,
                                    "msg"           : msg
                                }
                                _wso.send(JSON.stringify(payLoad));    
                            }     
                        }(a[i].UserID);

                        var btnAddFriend = blo0.blBtn(v4u,v4u.id+"btnAddFriend","+Friend",blGrey[0]); 
                        btnAddFriend.style.float = "left";
                         
                        var btnID = blo0.blBtn(v4u,v4u.id+"id",a[i].UserID,a[i].UserID==_btn.userID?"lightblue":"grey"); 
                        var btnName = blo0.blBtn(v4u,v4u.id+"UserName",a[i].UserName,blGrey[0]);
                        btnAddFriend.onclick = function(_this,_id){
                            return function(){
                                
                                var settings = {
                                    "url": "http://localhost:" + _myPort + "/api/RequestToMakeFriend",
                                    "method": "POST",
                                    "timeout": 0,
                                    "headers": {
                                        "accept": "application/json",
                                        "Content-Type": "application/json",
                                        "Authorization": " Bearer " + _btn.token
                                    },
                                    "data": JSON.stringify({"FromID":_btn.userID,"ToID":_id,"status": "Unkown"}),
                                };
                                $.ajax(settings).done(function (response) {
                                    d0.innerHTML = response;
                                });
                                
                                d0.innerHTML = _btn.userName + ": ->" + _id;
                            }
                        }(btnAddFriend,a[i].UserID);

                        ls.push(v4u);
                    }  
                    //*/  
                });
            }
            
            tb.b2 = blo0.blBtn(tb,tb.id+"b2","pendingFriends",blGrey[0]);
            tb.b2.onclick = function(){
                v.innerHTML = "pendingFriends:";
                var settings = {
                    "url": "http://localhost:" + _myPort + "/api/getPendingFriends",
                    "method": "GET",
                    "timeout": 0,
                    "headers": {
                        "Authorization": " Bearer " + _btn.token
                    },
                };
            
                $.ajax(settings).done(function (txt) {
                    var o = txt.str;
                    var s = o.length; 
                    v.innerHTML = "pendingFriends:";
                    var d0 = blo0.blDiv(v,v.id+"d0"+i,s,blColor[n]);
                    
                    var ls = [];
                    
                    for(i in o){
                        
                        var c = "grey";
                        
                        var n = ls.length;
                        var d = blo0.blDiv(v,v.id+"d"+i,i,blColor[n]);
                        var b1 = blo0.blBtn(d,d.id+"b1","from",o[i].FromID==_btn.userID?"lightblue":"grey");
                        b1.style.float="left";
                        b1.onclick = function(_this,_fromID){
                            return function(){
                                d0.innerHTML =  _fromID;
                            }
                        }(b1,o[i].FromID);
                        
                        var c = "yellow";
                        if(o[i].status=="Yes") c = "green";
                        else if(o[i].status=="No") c = "red";

                        var btnReqID = blo0.blBtn(d,d.id+"btnReqID",o[i].RequestID + "-"+o[i].status,c); 
                        var b2 = blo0.blBtn(d,d.id+"b2","toID",o[i].ToID==_btn.userID?"lightblue":"grey"); 
                        b2.onclick = function(_this,_toID){
                            return function(){
                                d0.innerHTML =  _toID;
                            }
                        }(b2,o[i].ToID);
                        if(o[i].ToID==_btn.userID && o[i].status=="Unkown"){
                            var b3 = blo0.blBtn(d,d.id+"b3","Yes","green");                        
                            var b4 = blo0.blBtn(d,d.id+"b4","No","grey"); 
                            b3.onclick = b4.onclick = function(_oi){
                                return function(){
                                    var settings = {
                                        "url": "http://localhost:" + _myPort + "/api/ReponseToMakeFriend",
                                        "method": "POST",
                                        "timeout": 0,
                                        "headers": {
                                            "accept": "application/json",
                                            "Content-Type": "application/json",
                                            "Authorization": " Bearer " + _btn.token
                                        }, 
                                        "data": JSON.stringify({"ReqID":_oi.RequestID,"FromID":_oi.FromID,"ToID":_oi.ToID,"status":this.innerHTML}),
                                    };
                                    $.ajax(settings).done(function (response) {
                                        d0.innerHTML = response;
                                    });
                                }
                            }(o[i]);
                        }
                        ls.push(d);
                    }
                });
            }
            tb.b3 = blo0.blBtn(tb,tb.id+"b3","Friends",blGrey[0]);
            tb.b3.onclick = function(){
                v.innerHTML = "Friends:";
                var settings = {
                    "url": "http://localhost:" + _myPort + "/api/getFriends",
                    "method": "GET",
                    "timeout": 0,
                    "headers": {
                        "Authorization": " Bearer " + _btn.token
                    },
                };
            
                $.ajax(settings).done(function (txt) { 
                    var s = "var o="+JSON.stringify(txt);
                    v.innerHTML = "Friends:";
                    var d0 = blo0.blDiv(v,v.id+"d0"+i,"d0",blColor[n]);
                    eval(s);
                    var ls = [];
                    var s = "var o="+o.str;
                    eval(s);
                    for(i in o){                                  
                        var n = ls.length;
                        var d = blo0.blDiv(v,v.id+"d"+i,i,blColor[n]);
                        
                        var b1 = blo0.blBtn(d,d.id+"b1","from",o[i].FromID==_btn.userID?"lightblue":"grey");
                        b1.style.float="left";
                        b1.onclick = function(_this,_fromID){
                            return function(){
                                d0.innerHTML =  _fromID;
                            }
                        }(b1,o[i].FromID);
                         
                        var b2 = blo0.blBtn(d,d.id+"b2","toID",o[i].ToID==_btn.userID?"lightblue":"grey"); 
                        b2.onclick = function(_this,_toID){
                            return function(){
                                d0.innerHTML =  _toID;
                            }
                        }(b2,o[i].ToID);

                        ls.push(d);
                    }
                });
            }
        }
        blon(b,b.v,"grey","green");
    }
}