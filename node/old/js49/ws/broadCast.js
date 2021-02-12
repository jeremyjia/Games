const tag = "[old/js49/ws/broadCast.js_v0.12]"; 
const eo = {};

var gBroadcast = null;
function CBroadcast(cl){
    var n = 0;
    var timeFun = function(){
        n++; 
        var idList = [];
        for(i in cl){
            if(!cl[i].isClosed )
            {
                if(i!="undefined") idList.push(i);
            }
        }
        for(i in cl){ 
            const breakNewsPayLoad = {
                "method": "mBreakNews",
                "news" : tag + " News." + n + " " + Date() ,
                "clientIdList": idList
            }
            cl[i].connection.send(JSON.stringify(breakNewsPayLoad))
        } 
        setTimeout(timeFun, 1111);
    }
    this.bcRun = function(){        timeFun();    }
}
eo.run = function(_cl){ 
    console.log(tag + Date() + " xdTest1");
    if(!gBroadcast){
        gBroadcast = new CBroadcast(_cl);
        gBroadcast.bcRun();
    } 
}
module.exports = eo;