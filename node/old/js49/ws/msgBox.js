const tag = "[old/js49/ws/msgBox.js_v0.22] ";
const l = require('../../../logger');
l.tag(tag); 
const eo = {};  
module.exports = eo;

var ml = []; 

eo.storeMsg = function(payLoad){
    ml.push(payLoad);
}
eo.checkMsg = function(id,clientList){    
    l.tag1(tag,id);
    l.tag1(tag,ml);
    for(j in ml){
        const payLoad = ml[j];
        
        var b = false;
        var cl = clientList;
        for(i in cl){
            if(!cl[i].isClosed )
            {
                if(i!="undefined")
                {
                   if(i==id){
                        cl[i].connection.send(JSON.stringify(payLoad));
                        b = true;
                   }     
                } 
            }
        }
    }
}