const test = function(_this){ 
    if(!_this.ui){
        _this.ui = blo0.blMD("id_4_main_ui", "mdTest_v0.31",50,50,555,113,blGrey[1]);
        _this.n = 1;

        const fnToolbar = function(_ui){
            const tb1 = blo0.blDiv(_ui,"tb1","tb1",blGrey[1]);
            const v1 = blo0.blDiv(_ui,"v1","v1",blGrey[2]);
            const bs = [1,2,3,4];
            for(i in bs){
                let b = blo0.blBtn(tb1,tb1.id+i,i,blColor[i]);
                b.onclick = function(_bs,_i,_b){
                    return function(){
                       v1.innerHTML = this.id ;
                    }
                }(bs,i,b);
            }
        }(_this.ui);

        const fnAbout = function(){            
            var s = ""; 
            s += blo0.blhMakeLink('index.html','https://jeremyjia.github.io/Games/issues/455/index.html',
                'color:green;','_blank');
            
                s += blo0.blhMakeLink('littleflute_index.html','https://littleflute.github.io/Games/issues/455/index.html',
                    'color:brown;','_blank');
                
            s += blo0.blhMakeLink('i455','https://github.com/jeremyjia/Games/issues/455',
                'color:green;','_blank');
                
            s += blo0.blhMakeLink(' blog','https://github.com/littleflute/blog',
                'color:yellow;','_blank');
            s += blo0.blhMakeLink('21voa','https://www.21voa.com/',
                    'color:blue;','_blank');
            const aboutMe = blo0.blDiv(_this.ui,"aboutMe",s,blGrey[0]);
        }();

    }
    if(_this.n>1){			blon(_this,_this.ui,"grey","green");		}		_this.n++;

}
var toTest = function (){
    var ao = bl$("id_4_test");
    ao.innerHTML = blo0.v;
    ao.style.backgroundColor = "lightblue";
    ao.onclick = function(){
       test(this);
    }
    ao.click();
    ao.click();
  }();