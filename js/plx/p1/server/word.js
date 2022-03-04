var tagWord = "word_v0.43"; 

var tb = bl$("id_4_tb_server");
var v = bl$("id_4_v_server");
  
const ow = new CWord(tb,v);

function CWord(_tb,_v){    
    this.blrsave2Word = function(b,d){
        var now = Date();
        d.innerHTML = now;
        var fileName = blo0.blDate();
        var w = {};
        w._2do = function(txt){
            d.innerHTML = txt;
        }
        var myName = fileName;
        var url = "http://localhost:8080/save2word?title=title1&text=text1............1111111,222&fileName="+myName+".docx";
        blo0.blAjx(w,url);
    } 
    this.blrJSON2Word = function(b,d){
        d.innerHTML = Date();
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