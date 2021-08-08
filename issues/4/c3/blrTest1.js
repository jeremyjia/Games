

var v = bl$("id_4_div_i4_c3_blrTest1");
var ta = bl$("id_4_ta_blrRunJS");
var _getCurPath = function(){
    var _curPath= "";
    var sss = blo0.blURL(); 
    var pos = sss.search("issues");
        
    var pos = sss.search("issues");
    if(pos!=-1){
        _curPath = "c3/";
    }
    else{
        _curPath = "issues/4/c3/"
    }
    return _curPath;
}
v.bs = [];
v.getBtn = function(i){
    return v.bs[i];
}

var n = 1;
var s = blo0.blBtn(v,v.id+"s"+n,"fwTest",blGrey[0]); s.n = n; v.bs.push(s); n++;
var s = blo0.blBtn(v,v.id+"s"+n,"voa2Video",blGrey[0]); s.n = n; v.bs.push(s); n++;
var s = blo0.blBtn(v,v.id+"s"+n,"blsEditor",blGrey[0]); s.n = n; v.bs.push(s); n++;
var s = blo0.blBtn(v,v.id+"s"+n,n,blGrey[0]); s.n = n; v.bs.push(s); n++;

for(i in v.bs){
    v.bs[i].onclick = function(_i,_bs){
        return function(){  	
            var _thisBtn = _bs[_i];						  
            for(j in _bs){                           
                if(_bs[j].n==_bs[_i].n){
                    _bs[j].style.backgroundColor = "yellow";
				}
				else{
                    _bs[j].style.backgroundColor = "grey";
				}
			}
            
            if(!_thisBtn.load){blo0.blScript("id_4_js_i4_c3_sample" + _thisBtn.n, _getCurPath() + "sample" + _thisBtn.n + ".js");_thisBtn.load=true;} 
            else{
                ta.value = _thisBtn.value;
            } 
        }
    }(i,v.bs);
} 