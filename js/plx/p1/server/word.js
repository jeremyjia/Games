var tagWord = "word_v0.131"; 

var tb = bl$("id_4_tb_server");
var v = bl$("id_4_v_server");
  
const ow = new CWord(tb,v);

function CWord(_tb,_v){    
    this.blr_test_json = function(b,d){
        if(!d.v){
            d.v = blo0.blDiv(d,d.id+"blr_test_json","blr_test_json","Grey"); 
            var ta 	= blo0.blTextarea(d.v,d.v+"ta","ta...","lightblue");
            ta.style.width="95%"; 
            ta.style.height="30px"; 
            var tb1 = blo0.blDiv(d.v,d.v+"tb1","tb1",blGrey[0]);    
            var v = blo0.blDiv(d.v,d.v+"v1","v1","Gray");             
            var b1 = blo0.blBtn(tb1,tb1.id+"b1","b1",blGrey[1]);
            
            b1.onclick = function(){       
                var _data = {};
                _data.version = "v0.11"; 
                var fileName = blo0.blDate();         
                var url = "http://localhost:8080/json?fileName=" + fileName + ".json"; 
                blo0.blPOST(url,_data,function(txt){
                    
                    var sHTML = "<a target='_blank' href='http://localhost:8080/"+fileName+".json'>"+fileName+".json</a>";
                    v.innerHTML = sHTML;

                });
            }            
        }
        
        _on_off_div(b,d);
		b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];

    }
    this.bll0= "--0--";
    this.blrsave2Word = function(b,d){
        if(!d.v){
            d.v = blo0.blDiv(d,d.id+"blrsave2Word","blrsave2Word","Grey"); 
            var ta 	= blo0.blTextarea(d.v,d.v+"ta","ta...","lightblue");
            ta.style.width="95%"; 
            ta.style.height="30px"; 
            var tb2 = blo0.blDiv(d.v,d.v+"tb2","tb2",blGrey[0]);    
            var v = blo0.blDiv(d.v,d.v+"v2","v2","Gray");             
            var b1 = blo0.blBtn(tb2,tb2.id+"b1","b1",blGrey[1]);
            
            b1.onclick = function(){                 
                _save2word("titleTest",ta.value,v);
            }            
        }
        
        _on_off_div(b,d);
		b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];
    } 
    this.bll1="--1--";
    this.blrJSON2Word = function(b,d){
        if(!d.v){
            d.v = blo0.blDiv(d,d.id+"blrJSON2Word","blrJSON2Word","Grey"); 
            var taport 	= blo0.blTextarea(d.v,d.v+"taport","3002","lightblue");
            taport.style.width="95%"; 
            taport.style.height="30px"; 
            var taUrl 	= blo0.blTextarea(d.v,d.v+"taUrl","video2.json","lightblue");
            taUrl.style.width="95%"; 
            taUrl.style.height="30px"; 
            var tb3 = blo0.blDiv(d.v,d.v+"tb3","tb3",blGrey[0]);    
            var v = blo0.blDiv(d.v,d.v+"v3","v3","Gray");             
            var b1 = blo0.blBtn(tb3,tb3.id+"b1","b1",blGrey[1]);
            
            b1.onclick = function(){                 
                _json2word(taport.value,taUrl.value,v);
            }            
        }
        
        _on_off_div(b,d);
		b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];        
    }

    var _json2word = function(_port,_url,d){
        var now = Date();
        d.innerHTML = now;
        var fileName = blo0.blDate();
        var w = {};
        w._2do = function(txt){
            var sHTML = "<a target='_blank' href='http://localhost:";
            sHTML += _port;
            sHTML += "/"+fileName+".docx'>"+fileName+".docx</a>";
            d.innerHTML = sHTML;
        }
        var myName = fileName;
        var url = "http://localhost:"+_port+"/json2word?url=";
        url += _url;
        url +="&text=optional&fileName="+myName+".docx";
        blo0.blAjx(w,url);
    }
    var _save2word = function(title,contend,d){
        var now = Date();
        d.innerHTML = now;
        var fileName = blo0.blDate();
        var w = {};
        w._2do = function(txt){
            d.innerHTML = "<a target='_blank' href='http://localhost:8080/"+fileName+".docx'>"+fileName+".docx</a>";
        }
        var myName = fileName;
        var url = "http://localhost:8080/save2word?title=";
        url += title;
        url += "&text=";
        url += contend;
        url += "&fileName="+myName+".docx";
        blo0.blAjx(w,url);
    }

    if(!_tb.ls) _tb.ls = [];
    var b = blo0.blBtn(_tb,_tb.id+"_4_word","word",blGrey[1]); 
    b.style.float = "left";
    b.onclick = function(_ls,_thisBtn,_2v,_thisClassObj){
        return function(){
            blo0.blMarkBtnInList(_thisBtn,_ls,"green","grey");
            _2v.innerHTML = tagWord;      
            blo0.blShowObj2Div(_2v,_thisClassObj);
        }
    }(_tb.ls,b,_v,this);
    _tb.ls.push(b);
}