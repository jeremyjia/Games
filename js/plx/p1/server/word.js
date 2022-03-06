var tagWord = "word_v0.112"; 

var tb = bl$("id_4_tb_server");
var v = bl$("id_4_v_server");
  
const ow = new CWord(tb,v);

function CWord(_tb,_v){    
    this.blr_test_json = function(b,d){
        if(!d.v){
            d.v = blo0.blDiv(d,d.id+"v","v","Grey"); 
            var ta 	= blo0.blTextarea(d.v,d.v+"ta","ta...","lightblue");
            ta.style.width="95%"; 
            ta.style.height="30px"; 
            var tb = blo0.blDiv(d.v,d.v+"tb","tb",blGrey[0]);    
            var v = blo0.blDiv(d.v,d.v+"v","v","Gray");             
            var b1 = blo0.blBtn(tb,tb.id+"b1","b1",blGrey[1]);
            
            b1.onclick = function(){       
                var _data = {};
                _data.version = "v0.11"; 
                var fileName = blo0.blDate();         
                var url = "http://localhost:8080/json?fileName=" + fileName + ".json"; 
                blo0.blPOST(url,_data,function(txt){
                    
                    var sHTML = "<a target='_blank' href='http://localhost:8080/"+fileName+".docx'>"+fileName+".docx</a>";
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
            d.v = blo0.blDiv(d,d.id+"v","v","Grey"); 
            var ta 	= blo0.blTextarea(d.v,d.v+"ta","ta...","lightblue");
            ta.style.width="95%"; 
            ta.style.height="30px"; 
            var tb = blo0.blDiv(d.v,d.v+"tb","tb",blGrey[0]);    
            var v = blo0.blDiv(d.v,d.v+"v","v","Gray");             
            var b1 = blo0.blBtn(tb,tb.id+"b1","b1",blGrey[1]);
            
            b1.onclick = function(){                 
                _save2word("titleTest",ta.value,v);
            }            
        }
        
        _on_off_div(b,d);
		b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];
    } 
    this.bll1="--1--";
    this.blrJSON2Word = function(b,d){
        var now = Date();
        d.innerHTML = now;
        var fileName = blo0.blDate();
        var w = {};
        w._2do = function(txt){
            d.innerHTML = txt;
        }
        var myName = fileName;
        var url = "http://localhost:8080/json2word?title=title1&text=text1............1111111,222&fileName="+myName+".docx";
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