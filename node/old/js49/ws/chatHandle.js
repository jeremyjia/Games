const tag = "[old/js49/ws/chatHandle.js_v0.31] ";
const l = require('../../../logger');
l.tag(tag); 
const eo = {};
 
eo.toDo = function(result,clientList,msgBox){  
    if (result.method === "mChat2All") {  
        const payLoad = {
            "method"        : "mChat2All",
            "fromClientId"  : result.fromClientId,
            "toClientId"    : result.toClientId,
            "msg"           : result.msg
        }  
        
        var b = false;
        var cl = clientList;
        for(i in cl){
            if(!cl[i].isClosed )
            {
                if(i!="undefined")
                {
                   if(i==result.toClientId || "all"==result.toClientId){
                        cl[i].connection.send(JSON.stringify(payLoad));
                        b = true;
                   }     
                } 
            }
        }
        
        if(false==b){   
            msgBox.storeMsg(payLoad);
        }
    }
}
module.exports = eo;