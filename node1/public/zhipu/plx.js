const ui = bl$("id_uiPlx");
const ptb = blo0.blDiv(ui,ui.id+"ptb","bv0.52","lightgreen");
const pv = blo0.blDiv(ui,ui.id+"pv","v","lightblue");
const btn1 = blo0.blBtn(ptb,ptb.id+"btn1","1","gray");
btn1.style.float = "left";
btn1.onclick = function(){
    pv.innerHTML = blo0.blStr2JpSVG2(ta.value); 
} 


blo0.blStr2JpSVG2 = function (txt){    
    var r = "";
    var blcWork = function(sInit){
      this.blMakeSVG = function(){ return _makeSVG(1000,1415); }

      const _getNoteId = function(c){
        var sID = "";
        if(c=='1'|| c=='2'|| c=='3'|| c=='4'|| c=='5'|| c=='6'|| c=='7'){
            sID = "shuzi_c_" + c;
        }
        else if(c=='|'){
            sID = "xiaojiexian";
        } 
        else if(c=='-'){
            sID = "yanyinfu";
        }
        else if(c==','){
            sID = "yingao_di";
        }
        else if(c=='.'){
            sID = "fudian";
        }
        else if(c=='/'){
            sID = "jianShi";
        }
        return sID;
      }
      var _mkMusic = function(ls){  
        var ms = ls[0].split(" ");
        var c = [];
        for(i in ls){
          c[i] = 0;
        }
        for(i in ls){
          if(i==0) continue; 
          for(j in ms){
            if(ms[j]=='-' || ms[j]=='|'){
              continue;
            }
            var l = ls[i][c[i]];
            c[i]++;
            if(ls[i][c[i]]=="，" || ls[i][c[i]]=="。") {
              l += ls[i][c[i]];
              c[i]++;
            }
            ms[j] += "_"+l; 
          }
        }
        return ms;
      }
        

        var _nts = function(lsNotes,x,y,dx,_makeText,_use_shuzi_by_id,_use_yingao_by_id){     
            
            var s = "";
            s += _makeText("nts: xv0.223",222, 11, 36, "brown");
            var l = lsNotes;

            for(i in l){            
                var idNote = "";
                if(l[i][0]=='('){
                    idNote = _getNoteId(l[i][1]);
                    s += _use_shuzi_by_id("bl_lianYinXian_1",x + i*dx -30,y-81);  
                }
                else{
                    idNote = _getNoteId(l[i][0]);
                }
                s += _use_shuzi_by_id(idNote,x + i*dx,y);  
            
                var nt = l[i].split(',');
                if(nt.length>1){
                    for(var j = 0; j < (nt.length -1);j++){
                        s += _use_yingao_by_id("yingao_di",x + i*dx,y + j*8);
                    }
                }

                var nt = l[i].split("'");
                if(nt.length>1){
                    for(var j = 0; j < (nt.length -1);j++){
                        s += _use_yingao_by_id("yingao_di",x + i*dx,y - j*8 -28);
                    }
                } 

                var fdNt = l[i].split('.');    
                if(fdNt.length>1){
                    for(var j = 0; j < (fdNt.length -1);j++){
                        s += _use_yingao_by_id("fudian",x + i*dx,y - j*8);
                    }
                }
                var jsNt = l[i].split('/');    
                if(jsNt.length>1){
                    for(var j = 0; j < (jsNt.length -1);j++){
                        s += _use_yingao_by_id("jianShi",x + i*dx,y - j*8); 
                    }
                }
                var ly = l[i].split('_');    
                if(ly.length>1){
                    for(var j = 0; j < (ly.length -1);j++){
                        s += _makeText(ly[j+1],x + i*dx,y + j*24 + 10, 20, "black");
                    }
                }
            }
            return s;
        }

      
      var _makeSVG = function (w,h){        
        var s = '<svg ';
        s +='width="' + w +'" ';
        s +='height="' + h + '" ';
        s +='version="1.1" ';
        s +='viewBox="0 0 ' + w + '' + h + '" ';
        s +='encoding="UTF-8" xmlns="http://www.w3.org/2000/svg">';
        s += '<rect x="0" y="0" height="100%" width="100%" fill="white" />';
        
        s += _makeText("Title",500,1, 36, "yellow");
        s += _defs();
        s += _uses(555,11);
        
        
        var a = sInit.split(/Q[1-7]*:/g); 
        var dy = 31;
        var y = 111;
        var x = 55;
        var dx = 30;
        for(i in a)
        {
          if(i==0) continue; 
          var r = a[i].split(/C[1-4]*:/g);

          var music = _mkMusic(r);      
          s += _nts(music,x,y, dx,_makeText,_use_shuzi_by_id,_use_yingao_by_id);    
           
          y += dy*3;
        }

        s += '</svg>';
        return s;
      }
      
      var _uses = function(x,y){
        var _x = x;
        var _y = y;
        var _dx = 30;
        var s = "";
        s += _use_shuzi_by_id("bl_lianYinXian_1",_x,_y); _x += _dx;
        s += _use_shuzi_by_id("shuzi_c_1",_x,_y); _x += _dx;
        s += _use_shuzi_by_id("shuzi_c_2",_x,_y); _x += _dx;
        s += _use_shuzi_by_id("shuzi_c_3",_x,_y); _x += _dx;
        s += _use_shuzi_by_id("shuzi_c_4",_x,_y); _x += _dx;
        s += _use_shuzi_by_id("shuzi_c_5",_x,_y); _x += _dx;
        s += _use_yingao_by_id("yingao_di",_x,_y); _x += _dx;
        s += _use_shuzi_by_id("shuzi_c_6",_x,_y); _x += _dx;
        s += _use_shuzi_by_id("shuzi_c_7",_x,_y);   _x += _dx;
        s += _use_shuzi_by_id("xiaojiexian",_x,_y); _x += _dx;
        s += _use_shuzi_by_id("yanyinfu",_x,_y); _x += _dx;
        s += _use_yingao_by_id("fudian",_x,_y); _x += _dx;
        s += _use_yingao_by_id("jianShi",_x,_y); _x += _dx;
        
        return s;
      }
      var _defs = function(){
        const CDefs = function(){  
          this.bl_lianYinXian_1 = function(){ return _2_def_bl_lianYinXian_1(); }
          this.shuzi_c_1 = function(){ return _2_def_shuzi_c_1(); }
          this.shuzi_c_2 = function(){ return _2_def_shuzi_c_2(); }
          this.shuzi_c_3 = function(){ return _2_def_shuzi_c_3(); }
          this.shuzi_c_4 = function(){ return _2_def_shuzi_c_4(); }
          this.shuzi_c_5 = function(){ return _2_def_shuzi_c_5(); }
          this.yingao_di = function(){ return _2_def_yingao_di(); }
          this.fudian = function(){ return _2_def_fudian(); }
          this.jianShi = function(){ return _2_def_jianShi(); }
          this.shuzi_c_6 = function(){ return _2_def_shuzi_c_6(); }
          this.shuzi_c_7 = function(){ return _2_def_shuzi_c_7(); } 
          this.xiaojiexian = function(){ return _2_def_xiaojiexian(); }
          this.yanyinfu = function(){ return _2_def_yanyinfu(); }
           

          var _2_def_yingao_di = function(){
            const id = "yingao_di";
            var s = '';
            s += '<g id="'+id+'" ';
            s += 'transform="translate(-50,-50)">';
            s += '<ellipse ry="1.9" rx="1.9" cy="63" cx="49.3" fill="#1b1b1b"/>';

            s += '</g>';
            return s;

          }
          
          var _2_def_fudian = function(){
            const id = "fudian";
            var s = '';
            s += '<g id="'+id+'" ';
            s += 'transform="translate(-50,-50)">';
            s += '<ellipse fill="#1b1b1b" cx="62.35" cy="49.75" rx="2.45" ry="2.45"/>';
            s += '</g>';
            return s;
          } 
          
          var _2_def_jianShi = function(){
            const id = "jianShi"; //xd2do
            var s = '';
            s += '<g id="'+id+'" ';
            s += 'transform="translate(-50,-50)">';

            //s += '<rect height="17.9" width="11.1" y="41.05" x="44.45" stroke-width="0" fill="#1fffff"/>';
            s += '<rect height="3.2" width="11" y="64.05" x="44.5" stroke-width="null" fill="#1b1bab"/>';
            
            s += '</g>';
            return s;
          }
          var _2_def_bl_lianYinXian_1 = function(){
            const id = "bl_lianYinXian_1";
            var s = '';
            s += '<g id="'+id+'" ';
            s += 'transform="translate(-50,-50)">';
       
            s += '<path d="M 84,114 C 90.5,104,100.5,104,107,114 M 107,114 C  100.5,105,90.5,105,84,114" stroke-width="0.5" stroke="#fb1b1b"/>';            

            s += '</g>';
            return s;
          }
          var _2_def_shuzi_c_1 = function(){
            const id = "shuzi_c_1";
            var s = '';
            s += '<g id="'+id+'" ';
            s += 'transform="translate(-50,-50)">';
            
            s += '<rect height="17.9" width="11.1" y="41.05" x="44.45" stroke-width="0" fill="#ffffff"/>';
            
            s += '<path fill="black" d="m51.71225,56.72592c0,0.80306 0.32822,1.2029 0.98409,1.2029l1.85934,0l0,0.98408l-8.96846,0l0,-0.98408l1.74994,0c0.65642,-0.07163 0.98409,-0.43763 0.98409,-1.0935l0,-12.24893c-1.16737,0.65644 -2.26085,1.13125 -3.28105,1.42172l-0.43762,-0.76528c2.18699,-1.09351 4.04689,-2.47802 5.57743,-4.15573l1.53112,0l0,15.63882l0.00111,0l0.00001,0z"/>';            
            
            s += '</g>';
            return s;
          }
          var _2_def_shuzi_c_2 = function(){
            const id = "shuzi_c_2";
            var s = '';
            s += '<g id="'+id+'" ';
            s += 'transform="translate(-50,-50)">';
            
            s += '<rect height="17.9" width="11.1" y="41.05" x="44.45" stroke-width="0" fill="#ffffff"/>';
            
            s += '<path fill="black" d="m44.23404,57.96309c0.29169,-0.36531 0.73117,-0.84104 1.31789,-1.42776c4.61288,-4.68482 6.66194,-7.8705 6.15051,-9.55537c-0.07361,-2.34241 -1.0262,-3.55098 -2.85551,-3.6246c-1.68486,0.14779 -2.74564,1.20857 -3.18512,3.18512l-1.09814,0c0.58504,-3.51473 2.45228,-5.34404 5.60115,-5.49184c3.07526,0.21974 4.72275,1.86723 4.9425,4.94249c0.14612,1.90516 -1.13607,3.99158 -3.84435,6.26038c-1.61124,1.46568 -2.85551,2.70996 -3.73447,3.73448l5.27211,0c1.24426,0.07362 1.93918,-0.6213 2.08697,-2.08698l0.8784,0l-0.54879,5.05236l-10.98313,0l0,-0.98827z"/>';            
            
            s += '</g>';
            return s;
          }
          var _2_def_shuzi_c_3 = function(){
            const id = "shuzi_c_3";
            var s = '';
            s += '<g id="'+id+'" ';
            s += 'transform="translate(-50,-50)">';
            
            s += '<rect height="17.9" width="11.1" y="41.05" x="44.45" stroke-width="0" fill="#ffffff"/>';
            
            s += '<path fill="black" d="m47.99024,49.51211c1.95488,-1.59247 2.8959,-3.00457 2.8242,-4.23684c-0.0728,-1.30343 -0.72481,-1.99072 -1.95542,-2.06409c-1.08611,0 -1.95543,0.65199 -2.60742,1.95543l-0.86876,-0.326c0.94048,-2.46124 2.60741,-3.72882 4.99694,-3.80218c2.24391,0.14617 3.47619,1.15947 3.69351,3.04153c0,1.44905 -0.97743,2.75303 -2.93286,3.91029l0.10867,0c2.60741,0.14618 4.01951,1.70224 4.23684,4.67096c-0.29015,3.98365 -2.60741,6.08305 -6.95237,6.30038c-2.46288,-0.14618 -3.80218,-0.86932 -4.01951,-2.17275c0.07115,-0.86877 0.57864,-1.33929 1.52076,-1.4121c0.57862,0 1.15781,0.3988 1.73809,1.19532c0.57862,0.86877 1.23064,1.30343 1.95543,1.30343c1.52077,-0.14397 2.31672,-1.4121 2.39009,-3.80218c-0.0728,-2.53405 -1.01495,-3.87334 -2.82475,-4.01951c-0.14618,0 -0.29013,0.03751 -0.43466,0.10866c-0.14618,0.07282 -0.29015,0.10866 -0.43466,0.10866l-0.43411,-0.75899z"/>';            
            
            s += '</g>';
            return s;
          }
          var _2_def_shuzi_c_4 = function(){
            const id = "shuzi_c_4";
            var s = '';
            s += '<g id="'+id+'" ';
            s += 'transform="translate(-50,-50)">';
            
            s += '<rect height="17.9" width="11.1" y="41.05" x="44.45" stroke-width="0" fill="#ffffff"/>';
            
            s += '<path fill="black" d="m50.16211,54.39056l-6.07059,0l0,-1.19232l8.02201,-12.14174l1.40976,0l0,11.49109l2.38519,0l0,1.84297l-2.38519,0l0,4.55295l-3.36062,0l0,-4.55295l-0.00056,0zm0,-8.45579l-0.10844,0l-4.22763,6.61282l4.33606,0l0,-6.61282z"/>';            
            
            s += '</g>';
            return s;
          }
          var _2_def_shuzi_c_5 = function(){
            const id = "shuzi_c_5";
            var s = '';
            s += '<g id="'+id+'" ';
            s += 'transform="translate(-50,-50)">';
            
            s += '<rect height="17.9" width="11.1" y="41.05" x="44.45" stroke-width="0" fill="#ffffff"/>';
            
            s += '<path fill="black" d="m46.03386,41.2363l6.28103,0c0.58697,0 0.91767,-0.1824 0.99153,-0.55116l0.88186,0l-0.44093,3.30586l-6.72194,0l-0.11024,3.4161c0.73358,-0.22047 1.50465,-0.33071 2.31377,-0.33071c3.89339,0.22047 5.95088,2.16774 6.17079,5.84065c-0.29433,3.82066 -2.60865,5.84066 -6.94241,6.06112c-2.42457,-0.07386 -3.71043,-0.77164 -3.85703,-2.09386c0.07218,-0.95404 0.55059,-1.43302 1.43246,-1.43302c0.66141,0 1.24837,0.44093 1.76316,1.32222c0.51311,0.80912 1.06427,1.21257 1.65292,1.21257c1.61488,-0.14661 2.49675,-1.39497 2.64503,-3.7468c-0.07386,-2.64502 -1.21256,-4.03943 -3.41608,-4.18715c-0.73527,0 -1.47052,0.18409 -2.20411,0.55059l-0.77106,-0.44093l0.33126,-8.92548z"/>';            
            
            s += '</g>';
            return s;
          }
          var _2_def_shuzi_c_6 = function(){
            const id = "shuzi_c_6";
            var s = '';
            s += '<g id="'+id+'" ';
            s += 'transform="translate(-50,-50)">';

            s += '<rect height="17.9" width="11.1" y="41.05" x="44.45" stroke-width="0" fill="#ffffff"/>';
            s += '<path fill="black" d="m54.20902,41.95901c-3.38233,1.22426 -5.39627,3.56153 -6.04348,7.01512c0.93435,-0.64775 1.90543,-0.97109 2.91377,-0.97109c2.94941,0.14523 4.4959,1.90709 4.64057,5.28833c-0.21591,3.59825 -2.05065,5.46696 -5.50423,5.6122c-3.74183,-0.14524 -5.72017,-2.48251 -5.93554,-7.01512c0.28661,-5.82813 3.41632,-9.42473 9.38911,-10.79202l0.53979,0.86257zm-3.99337,7.33899c-0.79243,0 -1.54814,0.32388 -2.26658,0.97108c0,0.07233 0,0.21592 0,0.43183c-0.07233,0.79243 -0.10796,1.51088 -0.10796,2.15862c0,3.45358 0.75517,5.18037 2.26659,5.18037c1.51086,0.07235 2.19368,-1.40291 2.05066,-4.42466c0.14357,-2.94995 -0.50418,-4.38849 -1.94272,-4.31724z"/>';            
            
            s += '</g>';
            return s;
          }
          var _2_def_shuzi_c_7 = function(){
            const id = "shuzi_c_7";
            var s = '';
            s += '<g id="'+id+'" ';
            s += 'transform="translate(-50,-50)">';

            s += '<rect height="17.9" width="11.1" y="41.05" x="44.45" stroke-width="0" fill="#ffffff"/>';
            s += '<path fill="black" d="m53.05094,44.17476l-5.65846,0c-0.88795,0 -1.44293,0.111 -1.66436,0.33298c-0.29636,0.1493 -0.51834,0.62934 -0.66595,1.44236l-0.99839,0l0.44398,-4.88206l11.42848,0l0,1.10938l-6.43599,16.75452l-2.88472,0l6.43542,-14.75719z"/>';            
            
            s += '</g>';
            return s;
          } 
          var _2_def_xiaojiexian = function(){
            const id = "xiaojiexian";
            var s = '';
            s += '<g id="'+id+'" ';
            s += 'transform="translate(-50,-50)">';

            s += '<rect fill="#ffffff" stroke-width="0" x="45.05" y="35.85" width="9.9" height="28.4"/>';
            s += '<rect height="29" width="1.5" y="35.5" x="49.25" stroke-width="null" fill="#1b1b1b"/>';
            
            s += '</g>';
            return s;
          }
          var _2_def_yanyinfu = function(){
            const id = "yanyinfu";
            var s = '';
            s += '<g id="'+id+'" ';
            s += 'transform="translate(-50,-50)">';

            s += '<rect height="17.9" width="11.1" y="41.05" x="44.45" stroke-width="0" fill="#ffffff"/>';
            s += '<rect height="3.2" width="11" y="48.4" x="44.5" stroke-width="null" fill="#1b1b1b"/>';
            
            s += '</g>';
            return s;
          }
        }


        var od = new CDefs();
        var s = '<defs>';
        s += od.bl_lianYinXian_1();
        s += od.shuzi_c_1();
        s += od.shuzi_c_2();
        s += od.shuzi_c_3();
        s += od.shuzi_c_4();
        s += od.shuzi_c_5();
        s += od.yingao_di();
        s += od.fudian();
        s += od.jianShi();
        s += od.shuzi_c_6();
        s += od.shuzi_c_7();
        s += od.xiaojiexian(); 
        s += od.yanyinfu();
        s += '</defs>';
        return s;
      } 

      var _makeText = function(sText,x,y,sz,fillColor){
        var s = '<text ';
        s += 'x="'+x+'" y="'+y+'" ';
        s += 'dy="30.078" text-anchor="middle" ';
        s += 'fill = "'+ fillColor +'" ';
        s += 'style="font-weight:bold;" font-size="'+ sz + '" font-family="Microsoft YaHei">';
        s += sText;
        s += '</text>';
        return s;
      }
      
      var _use_shuzi_by_id = function(id,x,y){
        var s = '<use x="'+x+'" y="'+y+'" ';
        s += 'onmousedown="selectElement(this)" ';
        s += 'xlink:href="#'+id+'" ';
        s += ' time="1" audio="5," notepos="0_1_1" code="5," xmlns:xlink="http://www.w3.org/1999/xlink" ></use>';
        return s;
      }
      
      var _use_yingao_by_id = function(id,x,y){        
        var s = '<use x="'+x+'" y="'+y+'" ';
        s += 'xlink:href="#'+id+'" ';
        s += ' xmlns:xlink="http://www.w3.org/1999/xlink" ></use>';
        return s;
      }
      
    }
    
    var w = new blcWork(txt);
    r = w.blMakeSVG();
    return r;
}