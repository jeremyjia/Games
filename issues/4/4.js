var v = bl$("id_div_4_issue4"); 
v.innerHTML += " v0.0.11";
v.d1 = blo0.blDiv(v,v.id+"d1","d1",blGrey[0]);  
function _Comments(o) {
				var _i = 0; 
				var _v = v.d1;
				for(i in o){
					_i++;
					var a = o[i].body;
					var btnJS = blo0.blBtn(_v, _v.id+"btnJS"+i,_i,blGrey[2]);
					btnJS.onclick = function(_txt){
				               return function(){
                                                              eval( _txt);
                                               }
				        }(a);
				}
			}
var _src = "https://api.github.com/repos/jeremyjia/Games/issues/4/comments";
w3.getHttpObject(_src, _Comments);
