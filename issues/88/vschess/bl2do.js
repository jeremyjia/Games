(function(window,undefined){
    var DefaultPath=document.documentElement.lastChild.lastChild.src.split("/");
    DefaultPath[DefaultPath.length-1]="";
    DefaultPath=DefaultPath.join("/");
    var ZeroClipboard={
        version:"1.0.7",
        clients:{},
        moviePath:DefaultPath+'copy.swf',
        nextId:0,
        $:function(thingy){
                if(typeof(thingy)=='string'){
                    thingy=document.getElementById(thingy);
                }
                if(!thingy.addClass){
                    thingy.hide=function(){
                        this.style.display='none';
                    };
                    thingy.show=function(){
                        this.style.display='';
                    };
                    thingy.addClass=function(name){
                        this.removeClass(name);
                        this.className+=' '+name;
                    };
                    thingy.removeClass=function(name){
                        var classes=this.className.split(/\s+/);
                        var idx=-1;
                        for(var k=0;k<classes.length;k++){
                            if(classes[k]==name){
                                {
                                    idx=k;
                                    k=classes.length;
                                }
                            }
                        }
                        if(idx>-1){
                            classes.splice(idx,1);
                            this.className=classes.join(' ');
                        }
                        return this;
                    };
                    thingy.hasClass=function(name){
                        return!!this.className.match(new RegExp("\\s*"+name+"\\s*"));
                    };
                }
                return thingy;
        },
        dispatch:function(id,eventName,args){
                var client=this.clients[id];
                if(client){
                    client.receiveEvent(eventName,args);
                }
        },
        register:function(id,client){
                this.clients[id]=client;
        },
        getDOMObjectPosition:function(obj,stopObj){
                var info={
                    left:0,
                    top:0,
                    width:obj.width?obj.width:obj.offsetWidth,
                    height:obj.height?obj.height:obj.offsetHeight
                };
                while(obj&&(obj!=stopObj)){
                    info.left+=obj.offsetLeft;
                    info.top+=obj.offsetTop;
                    obj=obj.offsetParent;
                }
                return info;
        },
        Client:function(elem){
                this.handlers={};
                this.id=ZeroClipboard.nextId++;
                this.movieId='vschess_copybutton_'+this.id;
                ZeroClipboard.register(this.id,this);
                if(elem){
                    this.glue(elem);
                }
        }
    };
    ZeroClipboard.Client.prototype={
            id:0,
            ready:false,
            movie:null,
            clipText:'',
            handCursorEnabled:true,
            cssEffects:true,
            handlers:
            null,
            glue:function(elem,appendElem,stylesToAdd){
                this.domElement=ZeroClipboard.$(elem);
                var zIndex=12000;
                if(this.domElement.style.zIndex){
                    zIndex=parseInt(this.domElement.style.zIndex,10)+1;
                }
                if(typeof(appendElem)=='string'){
                    appendElem=ZeroClipboard.$(appendElem);
                }
                else if(typeof(appendElem)=='undefined'){
                    appendElem=document.getElementsByTagName('body')[0];
                }
                var box=ZeroClipboard.getDOMObjectPosition(this.domElement,appendElem);
                this.div=document.createElement('div');
                var style=this.div.style;
                style.position='absolute';
                style.left=''+box.left+'px';
                style.top=''+box.top+'px';
                style.width=''+box.width+'px';
                style.height=''+box.height+'px';
                style.zIndex=zIndex;
                if(typeof(stylesToAdd)=='object'){
                    for(addedStyle in stylesToAdd){
                        style[addedStyle]=stylesToAdd[addedStyle];
                    }
                }
                appendElem.appendChild(this.div);
                this.div.innerHTML=this.getHTML(box.width,box.height);
            },
            getHTML:function(width,height){
                var html='';
                var flashvars='id='+this.id+'&width='+width+'&height='+height;
                html+='<embed id="'+this.movieId+'" src="'+ZeroClipboard.moviePath+'" loop="false" menu="false" quality="best" bgcolor="#ffffff" width="'+width+'" height="'+height+'" name="'+this.movieId+'" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="'+flashvars+'" wmode="transparent" />';
                return html;
            },
            hide:function(){
                if(this.div){
                    this.div.style.left='-2000px';
                }
            },
            show:function(){
                this.reposition();
            },
            reposition:function(elem){
                if(elem){
                    this.domElement=ZeroClipboard.$(elem);
                    if(!this.domElement){t
                        his.hide();
                    }
                }
                if(this.domElement&&this.div){
                    var box=ZeroClipboard.getDOMObjectPosition(this.domElement);
                    var style=this.div.style;
                    style.left=''+box.left+'px';
                    style.top=''+box.top+'px';
                }
            },
            setText:function(newText){
                this.clipText=newText;
                if(this.ready){
                    this.movie.setText(newText);
                }
            },
            addEventListener:function(eventName,func){
                eventName=eventName.toString().toLowerCase().replace(/^on/,'');
                if(!this.handlers[eventName]){
                    this.handlers[eventName]=[];
                }
                this.handlers[eventName].push(func);
            },
            setHandCursor:function(enabled){
                this.handCursorEnabled=enabled;
                if(this.ready){
                    this.movie.setHandCursor(enabled);
                }
            },
            receiveEvent:function(eventName,args){
                eventName=eventName.toString().toLowerCase().replace(/^on/,'');
                switch(eventName){
                    case'load':
                        this.movie=document.getElementById(this.movieId);
                        if(!this.movie){
                            var self=this;
                            setTimeout(function(){
                                self.receiveEvent('load',null);
                            },1);
                            return;
                        }
                        if(!this.ready&&navigator.userAgent.match(/Firefox/)&&navigator.userAgent.match(/Windows/)){
                            var self=this;
                            setTimeout(function(){
                                self.receiveEvent('load',null);
                            },100);
                            this.ready=true;
                            return;
                        }
                        this.ready=true;
                        this.movie.setText(this.clipText);
                        this.movie.setHandCursor(this.handCursorEnabled);
                        break;
                    case'mouseover':
                        if(this.domElement&&this.cssEffects){
                            this.domElement.addClass('hover');
                            if(this.recoverActive){
                                this.domElement.addClass('active');
                            }
                        }
                        break;
                    case'mouseout':
                        if(this.domElement&&this.cssEffects){
                            this.recoverActive=false;
                            if(this.domElement.hasClass('active')){
                                this.domElement.removeClass('active');
                                this.recoverActive=true;
                            }
                            this.domElement.removeClass('hover');
                        }
                        break;
                }
                if(this.handlers[eventName]){
                    for(var idx=0,len=this.handlers[eventName].length;idx<len;idx++){
                        var func=this.handlers[eventName][idx];
                        if(typeof(func)=='function'){
                            func(this,args);
                        }
                        else if((typeof(func)=='object')&&(func.length==2)){
                            func[0][func[1]](this,args);
                        }
                        else if(typeof(func)=='string'){
                            window[func](this,args);
                        }
                    }
                }
            }
    };
    
    if(typeof window.ZeroClipboard=="undefined"){
        window.ZeroClipboard=ZeroClipboard;
    }
})(window);

(function($,window){
    Array.prototype.clone=function(){
        return this.slice(0);
    };
    var IE=false,IE6=false,IE7=false,IE8=false,IE9=false,IE10=false,IE11=false,IEother=false;
    var WebKit=false,Opera=false,FireFox=false,Other=false;
    (function(){
        var browser=navigator.userAgent.toLowerCase();
        if(/msie/.test(browser)){
            IE=true;if(/msie 6\.0/.test(browser)){
                IE6=true;
            }
            else if(/msie 7\.0/.test(browser)){
                IE7=true;
            }
            else if(/msie 8\.0/.test(browser)){
                IE8=true;
            }
            else if(/msie 9\.0/.test(browser)){
                IE9=true;
            }
            else if(/msie 10\.0/.test(browser)){
                IE10=true;
            }
            else if(/msie 11\.0/.test(browser)){
                IE11=true;
            }
            else{
                IEother=true;
            }
        }
        else if(/chrome/.test(browser)||/webkit/.test(browser)){
            WebKit=true;
        }
        else if(/opera/.test(browser)){
            Opera=true;
        }
        else if(/mozilla/.test(browser)){
            FireFox=true;
        }
        else{
            Other=true;
        }
    })();

    var document=window.document;
    var DefaultPath=document.documentElement.lastChild.lastChild.src.split("/");
    DefaultPath[DefaultPath.length-1]="";
    DefaultPath=DefaultPath.join("/");

    var vschess={
        version:"vschess-bv: 1.2. 13",
        chessid:0,
        copycontent:0,
        iframe:0,
        turl:"this",
        savepgncopy:new ZeroClipboard.Client(),
        server:DefaultPath+"vschess.php?",
        picpath:DefaultPath+"chinese/",
        chessmanstyle:"normal",
        soundpath:DefaultPath+"sounds/",
        soundlist:"n1 n2 n3 n4 n5 n6 n7 n8 n9 click bomb eat move check lose illegal r n b a c rk bk rp bp jin tui ping qian zhong hou".split(" ")};$.each(("play time step result automove autoMove time_each sound soundState turn move clip format usermove setsteps oldcontent "+"tips pfchess pfreload livepause pf2str senddom saveqq saveqqm currentfen beginfen situation resetdom putchessman "+"checkmove controlbar eachstep moveindex comments eachposition animate getnewdom chinesestep chinesestepm chinesepgn "+"chinesepgnm chinesehtml chinesehtmlm wxfstep wxfstepm wxfpgn wxfpgnm wxfhtml wxfhtmlm iccsstep iccsstepm iccspgn "+"iccspgnm iccshtml iccsmhtml chineseSoundStatus volume").split(" "),function(){
            vschess[this.toString()]=[];
        });

        vschess.help=(function(){
            var $html=[],$i=0;
            $html.push("微思象棋播放器 ",vschess.version,"<br />");
            $html.push("----------------------------------------------------------------------------<br />");
            $html.push(++$i,".","单击“播放”按钮，可以自动播放棋局。","<br />");
            $html.push(++$i,".","播放过程中，单击“暂停”按钮，棋局停止自动播放。","<br />");
            $html.push(++$i,".","单击“X秒”按钮，可以选择播放速度。","<br />");
            $html.push(++$i,".","单击“前进”“后退”按钮，每次变化1步。","<br />");
            $html.push(++$i,".","按住“前进”“后退”按钮，可以快进与快退。","<br />");
            $html.push(++$i,".","单击“快进”“快退”按钮，每次变化5个回合，即10步。","<br />");
            $html.push(++$i,".","单击“功能”按钮，可以复制当前局面，保存棋谱，翻转棋盘等。","<br />");
            $html.push(++$i,".","多种棋谱格式可选，单击对应的按钮以选择相应的格式。","<br />");
            $html.push(++$i,".","复制局面后，可以直接在专业象棋软件中粘贴使用。","<br />");
            $html.push(++$i,".","文字棋盘推荐粘贴到Word中，并设置字体为宋体，调整行距至最佳。","<br />");
            $html.push(++$i,".","分析局面时，建议将局面复制到专业象棋软件中进行分析。","<br />");
            $html.push(++$i,".","可以直接在棋盘上走棋，便于分析局面。","<br />");
            $html.push(++$i,".","在着法列表中可以调整变招顺序或删除着法。","<br />");
            $html.push(++$i,".","注释修改后直接在注释区外面任意处单击即可保存。","<br />");
            $html.push(++$i,".","编辑局面会失去当前棋谱，请注意保存。","<br />");
            $html.push(++$i,".","单击“选项”按钮，可以控制走子声音、走子检查等。","<br />");
            $html.push(++$i,".","手机查看功能支持多种移动设备，只需扫描二维码即可。","<br />");
            $html.push("----------------------------------------------------------------------------<br />");
            $html.push("官方网站：<a href=\"http://www.xiaxiangqi.com/\" target=\"_blank\">http://www.xiaxiangqi.com/</a><br />");
            $html.push("Email：<a href=\"mailto:fastlight@fastlight.cn\">fastlight@fastlight.cn</a><br />");
            $html.push("Copyright &copy; 2009-2014 <a href=\"http://www.fastlight.cn/\" target=\"_blank\">飞影阁</a> 版权所有<br />");
            return $html.join("");
        })();

        vschess.turnfen=function($str){
            var $i=0,$j=0;
            var $array=$str.split(" ");
            var $old=$array[0];
            var $new=[],$oldline=[];
            $old=$old.split("/");
            for($i=0;$i<10;++$i){
                $oldline=$old[$i].split("");
                for($j=$oldline.length-1;$j>=0;--$j){
                    $new.push($oldline[$j]);
                }
                if($i!=9){$new.push("/");
            }
        }
        $new.push(" ",$array[1]," - - ",$array[4]," ",$array[5]);
        return $new.join("");
        };
        vschess.comment=function($str){var $pgn=$str.indexOf("[Game \"Chinese Chess\"]");if($pgn==-1){return"";}
else{var $format=0,$array=[],$cmt=[],$temp="",$temparray=[],$i=0,$j=0;if($str.indexOf("[Format \"ICCS\"]")>=0){$format=1;}
else if($str.indexOf("[Format \"WXF\"]")>=0){$format=2;}
if($format==0){$str=$str.replace(/\[(.*)\]/g,"").replace(/\((.*)\)/g,"").replace(/[0-9]+\./g,"").replace(/1\-0(.*)/g,"").replace(/0\-1(.*)/g,"").replace(/1\/2\-1\/2(.*)/g,"").replace(/\*(.*)/g,"");}
else if($format==1){$str=$str.replace(/\[(.*)\]/g,"").replace(/\((.*)\)/g,"").replace(/[0-9]+\./g,"").replace(/1\-0(.*)/g,"").replace(/0\-1(.*)/g,"").replace(/1\/2\-1\/2(.*)/g,"").replace(/\*(.*)/g,"");}
else{$str=$str.replace(/\[(.*)\]/g,"").replace(/\((.*)\)/g,"").replace(/1\-0(.*)/g,"").replace(/0\-1(.*)/g,"").replace(/1\/2\-1\/2(.*)/g,"").replace(/\*(.*)/g,"");}
var $reg=/\{([^\{\}]*)\}/;for($i=0;$temp=$reg.exec($str);++$i){$temparray[$i]=$temp[1];$str=$str.replace($reg,"COMMENT");}
if($format==0){$array=$str.split(/[\u8eca\u4fe5\u99ac\u508c\u5305\u7832\u5e25\u5c07\u8f66\u9a6c\u76f8\u8c61\u4ed5\u58eb\u5e05\u5c06\u70ae\u5175\u5352\u524d\u4e2d\u540e\u4e00\u4e8c\u4e09\u56db\u4e94][\u8eca\u4fe5\u99ac\u508c\u5305\u7832\u5e25\u5c07\u8f66\u9a6c\u76f8\u76f8\u4ed5\u58eb\u70ae\u5175\u5352\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\uff11\uff12\uff13\uff14\uff15\uff16\uff17\uff18\uff191-9][\u8fdb\u9000\u5e73][\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\uff11\uff12\uff13\uff14\uff15\uff16\uff17\uff18\uff191-9]/);}
else if($format==1){$array=$str.split(/[ABCDEFGHI][0-9]-[ABCDEFGHI][0-9]/);}
else{$array=$str.split(/[RNBAKCP][0-9a-e\+\-\.][\+\-\.][0-9]/);}
for($i=0;$i<$array.length;++$i){if($array[$i].indexOf("COMMENT")>=0){$cmt.push($i+"@"+encodeURIComponent($temparray[$j++]));}}
$cmt=$cmt.join(",");return $cmt;}};vschess.convertshijia=function($str){var $_RegExp_fen=/([0-9]+) ([0-9]+) ([0-9]+) ([0-9]+) ([0-9]+) ([0-9]+) ([0-9]+) ([0-9]+) ([0-9]+) ([0-9]+) ([0-9]+) ([0-9]+) ([0-9]+) ([0-9]+) ([0-9]+) ([0-9]+) ([0-9]+) ([0-9]+) ([0-9]+) ([0-9]+) ([0-9]+) ([0-9]+) ([0-9]+) ([0-9]+) ([0-9]+) ([0-9]+) ([0-9]+) ([0-9]+) ([0-9]+) ([0-9]+) ([0-9]+) ([0-9]+)(?:[\s]+)\+([BbRr])/;var $begin=$_RegExp_fen.exec($str),$fen_begin="";if($begin){var $qizi="*PPPPPCCNNRRBBAAKpppppccnnrrbbaak".split("");var $qipan={52:0,53:1,54:2,55:3,56:4,57:5,58:6,59:7,60:8,68:9,69:10,70:11,71:12,72:13,73:14,74:15,75:16,76:17,84:18,85:19,86:20,87:21,88:22,89:23,90:24,91:25,92:26,100:27,101:28,102:29,103:30,104:31,105:32,106:33,107:34,108:35,116:36,117:37,118:38,119:39,120:40,121:41,122:42,123:43,124:44,132:45,133:46,134:47,135:48,136:49,137:50,138:51,139:52,140:53,148:54,149:55,150:56,151:57,152:58,153:59,154:60,155:61,156:62,164:63,165:64,166:65,167:66,168:67,169:68,170:69,171:70,172:71,180:72,181:73,182:74,183:75,184:76,185:77,186:78,187:79,188:80,196:81,197:82,198:83,199:84,200:85,201:86,202:87,203:88,204:89};var $situation=[],$i=0;for($i=0;$i<90;++$i){$situation.push("*");}
for($i=1;$i<=32;++$i){$situation[$qipan[parseInt($begin[$i])]]=$qizi[$i];}
for($i=0;$i<90;++$i){$fen_begin+=$situation[$i];if($i%9==8&&$i!=89){$fen_begin+="/";}}
$fen_begin=$fen_begin.replace(/\*\*\*\*\*\*\*\*\*/g,"9").replace(/\*\*\*\*\*\*\*\*/g,"8").replace(/\*\*\*\*\*\*\*/g,"7").replace(/\*\*\*\*\*\*/g,"6").replace(/\*\*\*\*\*/g,"5").replace(/\*\*\*\*/g,"4").replace(/\*\*\*/g,"3").replace(/\*\*/g,"2").replace(/\*/g,"1");if($begin[33]=="B"||$begin[33]=="b"){$fen_begin+=" b - - 0 1";}
else{$fen_begin+=" w - - 0 1";}}
else{$fen_begin="rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1";}
var $_RegExp_step=/([0-9][a-zA-Z]-[0-9][a-zA-Z])/g,$step;$fen_begin+=":";while($step=$_RegExp_step.exec($str)){$step=$step[1].toUpperCase().split("");switch($step[0]){case"0":$fen_begin+="A";break;case"1":$fen_begin+="B";break;case"2":$fen_begin+="C";break;case"3":$fen_begin+="D";break;case"4":$fen_begin+="E";break;case"5":$fen_begin+="F";break;case"6":$fen_begin+="G";break;case"7":$fen_begin+="H";break;case"8":$fen_begin+="I";break;}
switch($step[1]){case"A":$fen_begin+="0";break;case"B":$fen_begin+="1";break;case"C":$fen_begin+="2";break;case"D":$fen_begin+="3";break;case"E":$fen_begin+="4";break;case"F":$fen_begin+="5";break;case"G":$fen_begin+="6";break;case"H":$fen_begin+="7";break;case"I":$fen_begin+="8";break;case"J":$fen_begin+="9";break;}
switch($step[3]){case"0":$fen_begin+="A";break;case"1":$fen_begin+="B";break;case"2":$fen_begin+="C";break;case"3":$fen_begin+="D";break;case"4":$fen_begin+="E";break;case"5":$fen_begin+="F";break;case"6":$fen_begin+="G";break;case"7":$fen_begin+="H";break;case"8":$fen_begin+="I";break;}
switch($step[4]){case"A":$fen_begin+="0";break;case"B":$fen_begin+="1";break;case"C":$fen_begin+="2";break;case"D":$fen_begin+="3";break;case"E":$fen_begin+="4";break;case"F":$fen_begin+="5";break;case"G":$fen_begin+="6";break;case"H":$fen_begin+="7";break;case"I":$fen_begin+="8";break;case"J":$fen_begin+="9";break;}}
$fen_begin+=":2";return $fen_begin.replace("::2","");};vschess.convertqqnew=function($str){var $temp,$_RegExp_step=/(?:[0-9]+) 32 (?:[0-9]+) ([0-9]+) ([0-9]+) ([0-9]+) ([0-9]+) 0 (?:[0-9]+) 0/g;var $out="rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1:",$col;while($temp=$_RegExp_step.exec($str)){switch(parseInt($temp[2])){case 8:$out+="A";break;case 7:$out+="B";break;case 6:$out+="C";break;case 5:$out+="D";break;case 4:$out+="E";break;case 3:$out+="F";break;case 2:$out+="G";break;case 1:$out+="H";break;case 0:$out+="I";break;}
$out+=$temp[1];switch(parseInt($temp[4])){case 8:$out+="A";break;case 7:$out+="B";break;case 6:$out+="C";break;case 5:$out+="D";break;case 4:$out+="E";break;case 3:$out+="F";break;case 2:$out+="G";break;case 1:$out+="H";break;case 0:$out+="I";break;}
$out+=$temp[3];}
return $out+":2";};vschess.convertgloballink=function($str){var $reg=/\u4e2d \u56fd \u8c61 \u68cb \u5bf9 \u5c40 \u8bb0 \u5f55([\S\s]*)\u9ed1\u65b9/;$str=$str.replace($reg,"[Game \"Chinese Chess\"]");return vschess.converter($str);};vschess.convertjj=function($str){var $layout=/init="([0-9,]+)"/.exec($str)[1],$fen=[],i;$layout=$layout.split(",");for(i=0;i<90;++i){switch($layout[i]){case"0":$fen.push("K");break;case"1":$fen.push("R");break;case"2":$fen.push("N");break;case"3":$fen.push("C");break;case"4":$fen.push("A");break;case"5":$fen.push("B");break;case"6":$fen.push("P");break;case"7":$fen.push("k");break;case"8":$fen.push("r");break;case"9":$fen.push("n");break;case"10":$fen.push("c");break;case"11":$fen.push("a");break;case"12":$fen.push("b");break;case"13":$fen.push("p");break;default:$fen.push("*");break;}}
var $result,$player;if($result=/description="(.{4})"/.exec($str)[1]){switch($result.split("")[3]){case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":$player="b";break
default:$player="w";break;}}
else{$player="w";}
var $fen_begin="";for(i=0;i<90;++i){$fen_begin+=$fen[i];if(i%9==8&&i!=89){$fen_begin+="/";}}
$fen_begin=$fen_begin.replace(/\*\*\*\*\*\*\*\*\*/g,"9").replace(/\*\*\*\*\*\*\*\*/g,"8").replace(/\*\*\*\*\*\*\*/g,"7").replace(/\*\*\*\*\*\*/g,"6").replace(/\*\*\*\*\*/g,"5").replace(/\*\*\*\*/g,"4").replace(/\*\*\*/g,"3").replace(/\*\*/g,"2").replace(/\*/g,"1");if($player=="b"){$fen_begin+=" b - - 0 1";}
else{$fen_begin+=" w - - 0 1";}
var $resultTemp;var $_RegExp=/x1="([0-9])" y1="([0-9])" x2="([0-9])" y2="([0-9])"/g,$step=[];while($result=$_RegExp.exec($str)){if($resultTemp==$result[0]){continue;}
$resultTemp=$result[0];switch($result[1]){case"0":$step.push("I");break;case"1":$step.push("H");break;case"2":$step.push("G");break;case"3":$step.push("F");break;case"4":$step.push("E");break;case"5":$step.push("D");break;case"6":$step.push("C");break;case"7":$step.push("B");break;case"8":$step.push("A");break;}
$step.push(9-parseInt($result[2]));switch($result[3]){case"0":$step.push("I");break;case"1":$step.push("H");break;case"2":$step.push("G");break;case"3":$step.push("F");break;case"4":$step.push("E");break;case"5":$step.push("D");break;case"6":$step.push("C");break;case"7":$step.push("B");break;case"8":$step.push("A");break;}
$step.push(9-parseInt($result[4]));}
if($step.length==0){return $fen_begin;}
else{return $fen_begin+":"+$step.join("")+":2";}};vschess.converter=function($str){if($str.indexOf('action name="layout"')>-1){return vschess.convertjj($str);}
if($str.indexOf("中 国 象 棋 对 局 记 录")>-1){return vschess.convertgloballink($str);}
var $format;$format=/[0-9]+ 32 [0-9+] [0-9+] [0-9+] [0-9+] [0-9+] 0 [0-9+] 0/.exec($str);if($format){return vschess.convertqqnew($str);}
$format=/Moves(.*)Ends(.*)CommentsEnd/.exec($str);if($format){return vschess.convertshijia($str);}
var $i,$j,$k,$break_flag=0;var $box_each=[];var $specialsoldier=[],$specialsoldiercol=0;var $row,$col,$colw,$coln,$point,$list="",$cmt="";var $pgn=$str.indexOf("[Game \"Chinese Chess\"]");$cmt=vschess.comment($str);if($pgn==-1&&!/[\u8eca\u4fe5\u99ac\u508c\u5305\u7832\u5e25\u5c07\u8f66\u9a6c\u76f8\u8c61\u4ed5\u58eb\u5e05\u5c06\u70ae\u5175\u5352\u524d\u4e2d\u540e\u4e00\u4e8c\u4e09\u56db\u4e94][\u8eca\u4fe5\u99ac\u508c\u5305\u7832\u5e25\u5c07\u8f66\u9a6c\u76f8\u76f8\u4ed5\u58eb\u70ae\u5175\u5352\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\uff11\uff12\uff13\uff14\uff15\uff16\uff17\uff18\uff191-9][\u8fdb\u9000\u5e73][\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\uff11\uff12\uff13\uff14\uff15\uff16\uff17\uff18\uff191-9]/.exec($str)){$format=/(?:[1-9rnhbeakcpRNHBEAKCP]{1,9}\/){9}[1-9rnhbeakcpRNHBEAKCP]{1,9} [w|b|r] - - [0-9]+ [0-9]+:[0-9a-iA-I]+:[0-3]:(.*)/.exec($str);if($format){return $format[0];}
$format=/(?:[1-9rnhbeakcpRNHBEAKCP]{1,9}\/){9}[1-9rnhbeakcpRNHBEAKCP]{1,9} [w|b|r] - - [0-9]+ [0-9]+:[0-9a-iA-I]+:[0-3]/.exec($str);if($format){return $format[0];}
$format=/(?:[1-9rnhbeakcpRNHBEAKCP]{1,9}\/){9}[1-9rnhbeakcpRNHBEAKCP]{1,9} [w|b|r] - - [0-9]+ [0-9]+:[0-9a-iA-I]+/.exec($str);if($format){return $format[0]+":2";}
$format=/(?:[1-9rnhbeakcpRNHBEAKCP]{1,9}\/){9}[1-9rnhbeakcpRNHBEAKCP]{1,9} [w|b|r] - - [0-9]+ [0-9]+/.exec($str);if($format){return $format[0];}
$format=/(?:[1-9rnhbeakcpRNHBEAKCP]{1,9}\/){9}[1-9rnhbeakcpRNHBEAKCP]{1,9} [w|b|r]/.exec($str);if($format){return $format[0]+" - - 0 1";}
return"rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1";}
else{var $final=2;if(/1\-0/.test($str)){$final=3;}
if(/0\-1/.test($str)){$final=0;}
if(/1\/2\-1\/2/.test($str)){$final=1;}
var $format=0;if($str.indexOf("[Format \"ICCS\"]")>=0){$format=1;}
else if($str.indexOf("[Format \"WXF\"]")>=0){$format=2;}
var $fen_begin=/\[FEN \"((?:[1-9rnhbeakcpRNHBEAKCP]{1,9}\/){9}[1-9rnhbeakcpRNHBEAKCP]{1,9} ([w|b|r]) - - [0-9]+ [0-9]+)\"\]/.exec($str);if($fen_begin){if($fen_begin[2]=="b"){var $wxfplayer=1;}
else{var $wxfplayer=0;}
$fen_begin=$fen_begin[1];}
else{var $wxfplayer=0;$fen_begin="rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1";}
if($format==0){var $_RegExp_step=/[\u8eca\u4fe5\u99ac\u508c\u5305\u7832\u5e25\u5c07\u8f66\u9a6c\u76f8\u8c61\u4ed5\u58eb\u5e05\u5c06\u70ae\u5175\u5352\u524d\u4e2d\u540e\u4e00\u4e8c\u4e09\u56db\u4e94][\u8eca\u4fe5\u99ac\u508c\u5305\u7832\u5e25\u5c07\u8f66\u9a6c\u76f8\u76f8\u4ed5\u58eb\u70ae\u5175\u5352\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\uff11\uff12\uff13\uff14\uff15\uff16\uff17\uff18\uff191-9][\u8fdb\u9000\u5e73][\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\uff11\uff12\uff13\uff14\uff15\uff16\uff17\uff18\uff191-9]/g;var $temp,$temp_each,$str_each=[];$temp=$str.replace(/\((.*)\)/g,"").replace(/\[(.*)\]/g,"").replace(/\{([^{^}]*)\}/g,"");while($temp_each=$_RegExp_step.exec($temp)){$str_each[$str_each.length]=$temp_each[0].replace(/\u8eca/g,"\u8f66").replace(/\u99ac/g,"\u9a6c").replace(/\u7832/g,"\u70ae").replace(/\u5c07/g,"\u5c06").replace(/\u5e25/g,"\u5e05").replace(/\u508c/g,"\u9a6c").replace(/\u4fe5/g,"\u8f66").replace(/\u5305/g,"\u70ae").replace(/1/g,"\uff11").replace(/2/g,"\uff12").replace(/3/g,"\uff13").replace(/4/g,"\uff14").replace(/5/g,"\uff15").replace(/6/g,"\uff16").replace(/7/g,"\uff17").replace(/8/g,"\uff18").replace(/9/g,"\uff19");}}
else if($format==1){$str=$str.replace(/[0-9]+\./g,"").replace(/\s/g,"").replace(/\((.*)\)/g,"").replace(/\[(.*)\]/g,"").replace(/\{([^{^}]*)\}/g,"").replace(/1-0(.*)/g,"").replace(/0-1(.*)/g,"").replace(/1\/2-1\/2(.*)/g,"").replace(/\*(.*)/g,"").replace(/-/g,"");if($cmt){return $fen_begin+":"+$str+":"+$final+":"+$cmt;}
else{return $fen_begin+":"+$str+":"+$final;}}
else{var $_RegExp_step=/[RNHBEAKCPrnhbeakcp][0-9a-eA-E\+\-\.][\+\-\.][0-9]/g;var $temp,$temp_each,$str_each=[];$temp=$str.replace(/\s/g,"").replace(/\((.*)\)/g,"").replace(/\[(.*)\]/g,"").replace(/\{([^{^}]*)\}/g,"").replace(/1-0(.*)/g,"").replace(/0-1(.*)/g,"").replace(/1\/2-1\/2(.*)/g,"").replace(/\*(.*)/g,"").toLowerCase();for($i=0;$temp_each=$_RegExp_step.exec($temp);++$i){$str_each[$str_each.length]=$temp_each.toString();if(($wxfplayer+$i)%2==0){$str_each[$i]=$str_each[$i].replace("r+","\u524d\u8f66").replace("r-","\u540e\u8f66").replace("n+","\u524d\u9a6c").replace("n-","\u540e\u9a6c").replace("h+","\u524d\u9a6c").replace("h-","\u540e\u9a6c").replace("c+","\u524d\u70ae").replace("c-","\u540e\u70ae").replace("p+","\u524d\u5175").replace("p.","\u4e2d\u5175").replace("p-","\u540e\u5175").replace("pa","\u4e00\u5175").replace("pb","\u4e8c\u5175").replace("pc","\u4e09\u5175").replace("pd","\u56db\u5175").replace("pe","\u4e94\u5175").replace("r","\u8f66").replace("n","\u9a6c").replace("h","\u9a6c").replace("b","\u76f8").replace("e","\u76f8").replace("a","\u4ed5").replace("k","\u5e05").replace("c","\u70ae").replace("p","\u5175").replace(/1/g,"\u4e00").replace(/2/g,"\u4e8c").replace(/3/g,"\u4e09").replace(/4/g,"\u56db").replace(/5/g,"\u4e94").replace(/6/g,"\u516d").replace(/7/g,"\u4e03").replace(/8/g,"\u516b").replace(/9/g,"\u4e5d").replace("+","\u8fdb").replace("-","\u9000").replace(".","\u5e73");}
else{$str_each[$i]=$str_each[$i].replace("r+","\u524d\u8f66").replace("r-","\u540e\u8f66").replace("n+","\u524d\u9a6c").replace("n-","\u540e\u9a6c").replace("h+","\u524d\u9a6c").replace("h-","\u540e\u9a6c").replace("c+","\u524d\u70ae").replace("c-","\u540e\u70ae").replace("p+","\u524d\u5352").replace("p.","\u4e2d\u5352").replace("p-","\u540e\u5352").replace("pa","\u4e00\u5352").replace("pb","\u4e8c\u5352").replace("pc","\u4e09\u5352").replace("pd","\u56db\u5352").replace("pe","\u4e94\u5352").replace("r","\u8f66").replace("n","\u9a6c").replace("h","\u9a6c").replace("b","\u8c61").replace("e","\u8c61").replace("a","\u58eb").replace("k","\u5c06").replace("c","\u70ae").replace("p","\u5352").replace(/1/g,"\uff11").replace(/2/g,"\uff12").replace(/3/g,"\uff13").replace(/4/g,"\uff14").replace(/5/g,"\uff15").replace(/6/g,"\uff16").replace(/7/g,"\uff17").replace(/8/g,"\uff18").replace(/9/g,"\uff19").replace("+","\u8fdb").replace("-","\u9000").replace(".","\u5e73");}}}}
var $fen=$fen_begin.split(" ");var $jumian=$fen[0].replace(/1/g,"*").replace(/2/g,"**").replace(/3/g,"***").replace(/4/g,"****").replace(/5/g,"*****").replace(/6/g,"******").replace(/7/g,"*******").replace(/8/g,"********").replace(/9/g,"*********").replace(/\//g,"");$jumian=$jumian.split("");var $player=$fen[1]=="b"?1:0;for($i=0;$i<9;++$i){$box_each[$i]=[];for($j=0;$j<10;++$j){$box_each[$i][$j]=$jumian[$j*9+$i];}}
for($i=0;$i<$str_each.length;++$i){$str_each[$i]=$str_each[$i].split("");if(($player+$i)%2==0){switch($str_each[$i][0]){case"\u8f66":{switch($str_each[$i][1]){case"\u4e00":$col=8;$colw="I";break;case"\u4e8c":$col=7;$colw="H";break;case"\u4e09":$col=6;$colw="G";break;case"\u56db":$col=5;$colw="F";break;case"\u4e94":$col=4;$colw="E";break;case"\u516d":$col=3;$colw="D";break;case"\u4e03":$col=2;$colw="C";break;case"\u516b":$col=1;$colw="B";break;case"\u4e5d":$col=0;$colw="A";break;}
for($j=0;$j<10;++$j){if($box_each[$col][$j]=="R"){$row=9-$j;$point=$colw+$row;$list+=$point;$box_each[$col][$j]="*";break;}}
switch($str_each[$i][2]){case"\u5e73":{switch($str_each[$i][3]){case"\u4e00":$col=8;$colw="I";break;case"\u4e8c":$col=7;$colw="H";break;case"\u4e09":$col=6;$colw="G";break;case"\u56db":$col=5;$colw="F";break;case"\u4e94":$col=4;$colw="E";break;case"\u516d":$col=3;$colw="D";break;case"\u4e03":$col=2;$colw="C";break;case"\u516b":$col=1;$colw="B";break;case"\u4e5d":$col=0;$colw="A";break;}
$box_each[$col][$j]="R";$point=$colw+$row;$list+=$point;break;}
case"\u8fdb":{switch($str_each[$i][3]){case"\u4e00":$row=$row+1;break;case"\u4e8c":$row=$row+2;break;case"\u4e09":$row=$row+3;break;case"\u56db":$row=$row+4;break;case"\u4e94":$row=$row+5;break;case"\u516d":$row=$row+6;break;case"\u4e03":$row=$row+7;break;case"\u516b":$row=$row+8;break;case"\u4e5d":$row=$row+9;break;}
$box_each[$col][9-$row]="R";$point=$colw+$row;$list+=$point;break;}
case"\u9000":{switch($str_each[$i][3]){case"\u4e00":$row=$row-1;break;case"\u4e8c":$row=$row-2;break;case"\u4e09":$row=$row-3;break;case"\u56db":$row=$row-4;break;case"\u4e94":$row=$row-5;break;case"\u516d":$row=$row-6;break;case"\u4e03":$row=$row-7;break;case"\u516b":$row=$row-8;break;case"\u4e5d":$row=$row-9;break;}
$box_each[$col][9-$row]="R";$point=$colw+$row;$list+=$point;break;}}
break;}
case"\u9a6c":{switch($str_each[$i][1]){case"\u4e00":$col=8;$colw="I";break;case"\u4e8c":$col=7;$colw="H";break;case"\u4e09":$col=6;$colw="G";break;case"\u56db":$col=5;$colw="F";break;case"\u4e94":$col=4;$colw="E";break;case"\u516d":$col=3;$colw="D";break;case"\u4e03":$col=2;$colw="C";break;case"\u516b":$col=1;$colw="B";break;case"\u4e5d":$col=0;$colw="A";break;}
for($j=0;$j<10;++$j){if($box_each[$col][$j]=="N"||$box_each[$col][$j]=="H"){$row=9-$j;$point=$colw+$row;$list+=$point;$box_each[$col][$j]="*";break;}}
switch($str_each[$i][3]){case"\u4e00":$coln=8;$colw="I";break;case"\u4e8c":$coln=7;$colw="H";break;case"\u4e09":$coln=6;$colw="G";break;case"\u56db":$coln=5;$colw="F";break;case"\u4e94":$coln=4;$colw="E";break;case"\u516d":$coln=3;$colw="D";break;case"\u4e03":$coln=2;$colw="C";break;case"\u516b":$coln=1;$colw="B";break;case"\u4e5d":$coln=0;$colw="A";break;}
switch($str_each[$i][2]){case"\u8fdb":{if(Math.abs($col-$coln)==1){$row=$row+2;}
else{$row=$row+1;}
break;}
case"\u9000":{if(Math.abs($col-$coln)==1){$row=$row-2;}
else{$row=$row-1;}
break;}}
$box_each[$coln][9-$row]="N";$point=$colw+$row;$list+=$point;break;}
case"\u76f8":{switch($str_each[$i][0]+$str_each[$i][1]+$str_each[$i][2]+$str_each[$i][3]){case"\u76f8\u4e00\u8fdb\u4e09":$box_each[8][7]="*";$box_each[6][5]="B";$list+="I2G4";break;case"\u76f8\u4e09\u9000\u4e00":$box_each[6][5]="*";$box_each[8][7]="B";$list+="G4I2";break;case"\u76f8\u4e00\u9000\u4e09":$box_each[8][7]="*";$box_each[6][9]="B";$list+="I2G0";break;case"\u76f8\u4e09\u8fdb\u4e00":$box_each[6][9]="*";$box_each[8][7]="B";$list+="G0I2";break;case"\u76f8\u4e94\u8fdb\u4e09":$box_each[4][7]="*";$box_each[6][5]="B";$list+="E2G4";break;case"\u76f8\u4e09\u9000\u4e94":$box_each[6][5]="*";$box_each[4][7]="B";$list+="G4E2";break;case"\u76f8\u4e94\u9000\u4e09":$box_each[4][7]="*";$box_each[6][9]="B";$list+="E2G0";break;case"\u76f8\u4e09\u8fdb\u4e94":$box_each[6][9]="*";$box_each[4][7]="B";$list+="G0E2";break;case"\u76f8\u4e94\u8fdb\u4e03":$box_each[4][7]="*";$box_each[2][5]="B";$list+="E2C4";break;case"\u76f8\u4e03\u9000\u4e94":$box_each[2][5]="*";$box_each[4][7]="B";$list+="C4E2";break;case"\u76f8\u4e94\u9000\u4e03":$box_each[4][7]="*";$box_each[2][9]="B";$list+="E2C0";break;case"\u76f8\u4e03\u8fdb\u4e94":$box_each[2][9]="*";$box_each[4][7]="B";$list+="C0E2";break;case"\u76f8\u4e5d\u8fdb\u4e03":$box_each[0][7]="*";$box_each[2][5]="B";$list+="A2C4";break;case"\u76f8\u4e03\u9000\u4e5d":$box_each[2][5]="*";$box_each[0][7]="B";$list+="C4A2";break;case"\u76f8\u4e5d\u9000\u4e03":$box_each[0][7]="*";$box_each[2][9]="B";$list+="A2C0";break;case"\u76f8\u4e03\u8fdb\u4e5d":$box_each[2][9]="*";$box_each[0][7]="B";$list+="C0A2";break;}
break;}
case"\u4ed5":{switch($str_each[$i][0]+$str_each[$i][1]+$str_each[$i][2]+$str_each[$i][3]){case"\u4ed5\u4e94\u8fdb\u56db":$box_each[4][8]="*";$box_each[5][7]="A";$list+="E1F2";break;case"\u4ed5\u56db\u9000\u4e94":$box_each[5][7]="*";$box_each[4][8]="A";$list+="F2E1";break;case"\u4ed5\u4e94\u9000\u56db":$box_each[4][8]="*";$box_each[5][9]="A";$list+="E1F0";break;case"\u4ed5\u56db\u8fdb\u4e94":$box_each[5][9]="*";$box_each[4][8]="A";$list+="F0E1";break;case"\u4ed5\u4e94\u8fdb\u516d":$box_each[4][8]="*";$box_each[3][7]="A";$list+="E1D2";break;case"\u4ed5\u516d\u9000\u4e94":$box_each[3][7]="*";$box_each[4][8]="A";$list+="D2E1";break;case"\u4ed5\u4e94\u9000\u516d":$box_each[4][8]="*";$box_each[3][9]="A";$list+="E1D0";break;case"\u4ed5\u516d\u8fdb\u4e94":$box_each[3][9]="*";$box_each[4][8]="A";$list+="D0E1";break;}
break;}
case"\u5e05":{switch($str_each[$i][1]){case"\u56db":$col=5;$colw="F";break;case"\u4e94":$col=4;$colw="E";break;case"\u516d":$col=3;$colw="D";break;}
for($j=7;$j<10;++$j){if($box_each[$col][$j]=="K"){$row=9-$j;$point=$colw+$row;$list+=$point;$box_each[$col][$j]="*";break;}}
switch($str_each[$i][2]){case"\u5e73":{switch($str_each[$i][3]){case"\u56db":$col=5;$colw="F";break;case"\u4e94":$col=4;$colw="E";break;case"\u516d":$col=3;$colw="D";break;}
$box_each[$col][$j]="K";$point=$colw+$row;$list+=$point;break;}
case"\u8fdb":{$row=$row+1;$box_each[$col][9-$row]="K";$point=$colw+$row;$list+=$point;break;}
case"\u9000":{$row=$row-1;$box_each[$col][9-$row]="K";$point=$colw+$row;$list+=$point;break;}}
break;}
case"\u70ae":{switch($str_each[$i][1]){case"\u4e00":$col=8;$colw="I";break;case"\u4e8c":$col=7;$colw="H";break;case"\u4e09":$col=6;$colw="G";break;case"\u56db":$col=5;$colw="F";break;case"\u4e94":$col=4;$colw="E";break;case"\u516d":$col=3;$colw="D";break;case"\u4e03":$col=2;$colw="C";break;case"\u516b":$col=1;$colw="B";break;case"\u4e5d":$col=0;$colw="A";break;}
for($j=0;$j<10;++$j){if($box_each[$col][$j]=="C"){$row=9-$j;$point=$colw+$row;$list+=$point;$box_each[$col][$j]="*";break;}}
switch($str_each[$i][2]){case"\u5e73":{switch($str_each[$i][3]){case"\u4e00":$col=8;$colw="I";break;case"\u4e8c":$col=7;$colw="H";break;case"\u4e09":$col=6;$colw="G";break;case"\u56db":$col=5;$colw="F";break;case"\u4e94":$col=4;$colw="E";break;case"\u516d":$col=3;$colw="D";break;case"\u4e03":$col=2;$colw="C";break;case"\u516b":$col=1;$colw="B";break;case"\u4e5d":$col=0;$colw="A";break;}
$box_each[$col][$j]="C";$point=$colw+$row;$list+=$point;break;}
case"\u8fdb":{switch($str_each[$i][3]){case"\u4e00":$row=$row+1;break;case"\u4e8c":$row=$row+2;break;case"\u4e09":$row=$row+3;break;case"\u56db":$row=$row+4;break;case"\u4e94":$row=$row+5;break;case"\u516d":$row=$row+6;break;case"\u4e03":$row=$row+7;break;case"\u516b":$row=$row+8;break;case"\u4e5d":$row=$row+9;break;}
$box_each[$col][9-$row]="C";$point=$colw+$row;$list+=$point;break;}
case"\u9000":{switch($str_each[$i][3]){case"\u4e00":$row=$row-1;break;case"\u4e8c":$row=$row-2;break;case"\u4e09":$row=$row-3;break;case"\u56db":$row=$row-4;break;case"\u4e94":$row=$row-5;break;case"\u516d":$row=$row-6;break;case"\u4e03":$row=$row-7;break;case"\u516b":$row=$row-8;break;case"\u4e5d":$row=$row-9;break;}
$box_each[$col][9-$row]="C";$point=$colw+$row;$list+=$point;break;}}
break;}
case"\u5175":{switch($str_each[$i][1]){case"\u4e00":$col=8;$colw="I";break;case"\u4e8c":$col=7;$colw="H";break;case"\u4e09":$col=6;$colw="G";break;case"\u56db":$col=5;$colw="F";break;case"\u4e94":$col=4;$colw="E";break;case"\u516d":$col=3;$colw="D";break;case"\u4e03":$col=2;$colw="C";break;case"\u516b":$col=1;$colw="B";break;case"\u4e5d":$col=0;$colw="A";break;}
for($j=0;$j<7;++$j){if($box_each[$col][$j]=="P"){$row=9-$j;$point=$colw+$row;$list+=$point;$box_each[$col][$j]="*";break;}}
switch($str_each[$i][2]){case"\u5e73":{switch($str_each[$i][3]){case"\u4e00":$col=8;$colw="I";break;case"\u4e8c":$col=7;$colw="H";break;case"\u4e09":$col=6;$colw="G";break;case"\u56db":$col=5;$colw="F";break;case"\u4e94":$col=4;$colw="E";break;case"\u516d":$col=3;$colw="D";break;case"\u4e03":$col=2;$colw="C";break;case"\u516b":$col=1;$colw="B";break;case"\u4e5d":$col=0;$colw="A";break;}
$box_each[$col][$j]="P";$point=$colw+$row;$list+=$point;break;}
case"\u8fdb":{$row=$row+1;$box_each[$col][9-$row]="P";$point=$colw+$row;$list+=$point;break;}}
break;}
case"\u524d":{switch($str_each[$i][1]){case"\u8f66":{for($k=0;$k<9;++$k){for($j=0;$j<9;++$j){if($box_each[$k][$j]=="R"){$col=$k;switch($col){case 8:$colw="I";break;case 7:$colw="H";break;case 6:$colw="G";break;case 5:$colw="F";break;case 4:$colw="E";break;case 3:$colw="D";break;case 2:$colw="C";break;case 1:$colw="B";break;case 0:$colw="A";break;}
$row=9-$j;$point=$colw+$row;$list+=$point;$box_each[$col][$j]="*";$break_flag=1;break;}}
if($break_flag==1){$break_flag=0;break;}}
switch($str_each[$i][2]){case"\u5e73":{switch($str_each[$i][3]){case"\u4e00":$col=8;$colw="I";break;case"\u4e8c":$col=7;$colw="H";break;case"\u4e09":$col=6;$colw="G";break;case"\u56db":$col=5;$colw="F";break;case"\u4e94":$col=4;$colw="E";break;case"\u516d":$col=3;$colw="D";break;case"\u4e03":$col=2;$colw="C";break;case"\u516b":$col=1;$colw="B";break;case"\u4e5d":$col=0;$colw="A";break;}
$box_each[$col][$j]="R";$point=$colw+$row;$list+=$point;break;}
case"\u8fdb":{switch($str_each[$i][3]){case"\u4e00":$row=$row+1;break;case"\u4e8c":$row=$row+2;break;case"\u4e09":$row=$row+3;break;case"\u56db":$row=$row+4;break;case"\u4e94":$row=$row+5;break;case"\u516d":$row=$row+6;break;case"\u4e03":$row=$row+7;break;case"\u516b":$row=$row+8;break;case"\u4e5d":$row=$row+9;break;}
$box_each[$col][9-$row]="R";$point=$colw+$row;$list+=$point;break;}
case"\u9000":{switch($str_each[$i][3]){case"\u4e00":$row=$row-1;break;case"\u4e8c":$row=$row-2;break;case"\u4e09":$row=$row-3;break;case"\u56db":$row=$row-4;break;case"\u4e94":$row=$row-5;break;case"\u516d":$row=$row-6;break;case"\u4e03":$row=$row-7;break;case"\u516b":$row=$row-8;break;case"\u4e5d":$row=$row-9;break;}
$box_each[$col][9-$row]="R";$point=$colw+$row;$list+=$point;break;}}
break;}
case"\u9a6c":{for($k=0;$k<9;++$k){for($j=0;$j<9;++$j){if($box_each[$k][$j]=="N"||$box_each[$k][$j]=="H"){$col=$k;switch($col){case 8:$colw="I";break;case 7:$colw="H";break;case 6:$colw="G";break;case 5:$colw="F";break;case 4:$colw="E";break;case 3:$colw="D";break;case 2:$colw="C";break;case 1:$colw="B";break;case 0:$colw="A";break;}
$row=9-$j;$point=$colw+$row;$list+=$point;$box_each[$col][$j]="*";$break_flag=1;break;}}
if($break_flag==1){$break_flag=0;break;}}
switch($str_each[$i][3]){case"\u4e00":$coln=8;$colw="I";break;case"\u4e8c":$coln=7;$colw="H";break;case"\u4e09":$coln=6;$colw="G";break;case"\u56db":$coln=5;$colw="F";break;case"\u4e94":$coln=4;$colw="E";break;case"\u516d":$coln=3;$colw="D";break;case"\u4e03":$coln=2;$colw="C";break;case"\u516b":$coln=1;$colw="B";break;case"\u4e5d":$coln=0;$colw="A";break;}
switch($str_each[$i][2]){case"\u8fdb":{if(Math.abs($col-$coln)==1){$row=$row+2;}
else{$row=$row+1;}
break;}
case"\u9000":{if(Math.abs($col-$coln)==1){$row=$row-2;}
else{$row=$row-1;}
break;}}
$box_each[$coln][9-$row]="N";$point=$colw+$row;$list+=$point;break;}
case"\u70ae":{for($k=0;$k<9;++$k){for($j=0;$j<9;++$j){if($box_each[$k][$j]=="C"){$col=$k;switch($col){case 8:$colw="I";break;case 7:$colw="H";break;case 6:$colw="G";break;case 5:$colw="F";break;case 4:$colw="E";break;case 3:$colw="D";break;case 2:$colw="C";break;case 1:$colw="B";break;case 0:$colw="A";break;}
$row=9-$j;$point=$colw+$row;$list+=$point;$box_each[$col][$j]="*";$break_flag=1;break;}}
if($break_flag==1){$break_flag=0;break;}}
switch($str_each[$i][2]){case"\u5e73":{switch($str_each[$i][3]){case"\u4e00":$col=8;$colw="I";break;case"\u4e8c":$col=7;$colw="H";break;case"\u4e09":$col=6;$colw="G";break;case"\u56db":$col=5;$colw="F";break;case"\u4e94":$col=4;$colw="E";break;case"\u516d":$col=3;$colw="D";break;case"\u4e03":$col=2;$colw="C";break;case"\u516b":$col=1;$colw="B";break;case"\u4e5d":$col=0;$colw="A";break;}
$box_each[$col][$j]="C";$point=$colw+$row;$list+=$point;break;}
case"\u8fdb":{switch($str_each[$i][3]){case"\u4e00":$row=$row+1;break;case"\u4e8c":$row=$row+2;break;case"\u4e09":$row=$row+3;break;case"\u56db":$row=$row+4;break;case"\u4e94":$row=$row+5;break;case"\u516d":$row=$row+6;break;case"\u4e03":$row=$row+7;break;case"\u516b":$row=$row+8;break;case"\u4e5d":$row=$row+9;break;}
$box_each[$col][9-$row]="C";$point=$colw+$row;$list+=$point;break;}
case"\u9000":{switch($str_each[$i][3]){case"\u4e00":$row=$row-1;break;case"\u4e8c":$row=$row-2;break;case"\u4e09":$row=$row-3;break;case"\u56db":$row=$row-4;break;case"\u4e94":$row=$row-5;break;case"\u516d":$row=$row-6;break;case"\u4e03":$row=$row-7;break;case"\u516b":$row=$row-8;break;case"\u4e5d":$row=$row-9;break;}
$box_each[$col][9-$row]="C";$point=$colw+$row;$list+=$point;break;}}
break;}
case"\u5175":{for($k=0;$k<9;++$k){$specialsoldiercol=0;for($j=0;$j<7;++$j){if($box_each[$k][$j]=="P"){++$specialsoldiercol;}}
if($specialsoldiercol<2){continue;}
for($j=0;$j<5;++$j){if($box_each[$k][$j]=="P"){$col=$k;switch($col){case 8:$colw="I";break;case 7:$colw="H";break;case 6:$colw="G";break;case 5:$colw="F";break;case 4:$colw="E";break;case 3:$colw="D";break;case 2:$colw="C";break;case 1:$colw="B";break;case 0:$colw="A";break;}
$row=9-$j;$point=$colw+$row;$list+=$point;$box_each[$col][$j]="*";$break_flag=1;break;}}
if($break_flag==1){$break_flag=0;break;}}
switch($str_each[$i][2]){case"\u5e73":{switch($str_each[$i][3]){case"\u4e00":$col=8;$colw="I";break;case"\u4e8c":$col=7;$colw="H";break;case"\u4e09":$col=6;$colw="G";break;case"\u56db":$col=5;$colw="F";break;case"\u4e94":$col=4;$colw="E";break;case"\u516d":$col=3;$colw="D";break;case"\u4e03":$col=2;$colw="C";break;case"\u516b":$col=1;$colw="B";break;case"\u4e5d":$col=0;$colw="A";break;}
$box_each[$col][$j]="P";$point=$colw+$row;$list+=$point;break;}
case"\u8fdb":{$row=$row+1;$box_each[$col][9-$row]="P";$point=$colw+$row;$list+=$point;break;}}
break;}
case"\u76f8":{switch($str_each[$i][0]+$str_each[$i][1]+$str_each[$i][2]+$str_each[$i][3]){case"\u524d\u76f8\u9000\u4e00":$box_each[6][5]="*";$box_each[8][7]="B";$list+="G4I2";break;case"\u524d\u76f8\u9000\u4e5d":$box_each[2][5]="*";$box_each[0][7]="B";$list+="C4A2";break;case"\u524d\u76f8\u9000\u4e94":{if($box_each[2][5]=="B"){$box_each[2][5]="*";$box_each[4][7]="B";$list+="C4E2";}
else{$box_each[6][5]="*";$box_each[4][7]="B";$list+="G4E2";}
break;}}
break;}
case"\u4ed5":{if($box_each[3][7]=="A"){$box_each[3][7]="*";$box_each[4][8]="A";$list+="D2E1";}
else{$box_each[5][7]="*";$box_each[4][8]="A";$list+="F2E1";}
break;}}
break;}
case"\u540e":{switch($str_each[$i][1]){case"\u8f66":{for($k=0;$k<9;++$k){for($j=9;$j>0;--$j){if($box_each[$k][$j]=="R"){$col=$k;switch($col){case 8:$colw="I";break;case 7:$colw="H";break;case 6:$colw="G";break;case 5:$colw="F";break;case 4:$colw="E";break;case 3:$colw="D";break;case 2:$colw="C";break;case 1:$colw="B";break;case 0:$colw="A";break;}
$row=9-$j;$point=$colw+$row;$list+=$point;$box_each[$col][$j]="*";$break_flag=1;break;}}
if($break_flag==1){$break_flag=0;break;}}
switch($str_each[$i][2]){case"\u5e73":{switch($str_each[$i][3]){case"\u4e00":$col=8;$colw="I";break;case"\u4e8c":$col=7;$colw="H";break;case"\u4e09":$col=6;$colw="G";break;case"\u56db":$col=5;$colw="F";break;case"\u4e94":$col=4;$colw="E";break;case"\u516d":$col=3;$colw="D";break;case"\u4e03":$col=2;$colw="C";break;case"\u516b":$col=1;$colw="B";break;case"\u4e5d":$col=0;$colw="A";break;}
$box_each[$col][$j]="R";$point=$colw+$row;$list+=$point;break;}
case"\u8fdb":{switch($str_each[$i][3]){case"\u4e00":$row=$row+1;break;case"\u4e8c":$row=$row+2;break;case"\u4e09":$row=$row+3;break;case"\u56db":$row=$row+4;break;case"\u4e94":$row=$row+5;break;case"\u516d":$row=$row+6;break;case"\u4e03":$row=$row+7;break;case"\u516b":$row=$row+8;break;case"\u4e5d":$row=$row+9;break;}
$box_each[$col][9-$row]="R";$point=$colw+$row;$list+=$point;break;}
case"\u9000":{switch($str_each[$i][3]){case"\u4e00":$row=$row-1;break;case"\u4e8c":$row=$row-2;break;case"\u4e09":$row=$row-3;break;case"\u56db":$row=$row-4;break;case"\u4e94":$row=$row-5;break;case"\u516d":$row=$row-6;break;case"\u4e03":$row=$row-7;break;case"\u516b":$row=$row-8;break;case"\u4e5d":$row=$row-9;break;}
$box_each[$col][9-$row]="R";$point=$colw+$row;$list+=$point;break;}}
break;}
case"\u9a6c":{for($k=0;$k<9;++$k){for($j=9;$j>0;--$j){if($box_each[$k][$j]=="N"||$box_each[$k][$j]=="H"){$col=$k;switch($col){case 8:$colw="I";break;case 7:$colw="H";break;case 6:$colw="G";break;case 5:$colw="F";break;case 4:$colw="E";break;case 3:$colw="D";break;case 2:$colw="C";break;case 1:$colw="B";break;case 0:$colw="A";break;}
$row=9-$j;$point=$colw+$row;$list+=$point;$box_each[$col][$j]="*";$break_flag=1;break;}}
if($break_flag==1){$break_flag=0;break;}}
switch($str_each[$i][3]){case"\u4e00":$coln=8;$colw="I";break;case"\u4e8c":$coln=7;$colw="H";break;case"\u4e09":$coln=6;$colw="G";break;case"\u56db":$coln=5;$colw="F";break;case"\u4e94":$coln=4;$colw="E";break;case"\u516d":$coln=3;$colw="D";break;case"\u4e03":$coln=2;$colw="C";break;case"\u516b":$coln=1;$colw="B";break;case"\u4e5d":$coln=0;$colw="A";break;}
switch($str_each[$i][2]){case"\u8fdb":{if(Math.abs($col-$coln)==1){$row=$row+2;}
else{$row=$row+1;}
break;}
case"\u9000":{if(Math.abs($col-$coln)==1){$row=$row-2;}
else{$row=$row-1;}
break;}}
$box_each[$coln][9-$row]="N";$point=$colw+$row;$list+=$point;break;}
case"\u70ae":{for($k=0;$k<9;++$k){for($j=9;$j>0;--$j){if($box_each[$k][$j]=="C"){$col=$k;switch($col){case 8:$colw="I";break;case 7:$colw="H";break;case 6:$colw="G";break;case 5:$colw="F";break;case 4:$colw="E";break;case 3:$colw="D";break;case 2:$colw="C";break;case 1:$colw="B";break;case 0:$colw="A";break;}
$row=9-$j;$point=$colw+$row;$list+=$point;$box_each[$col][$j]="*";$break_flag=1;break;}}
if($break_flag==1){$break_flag=0;break;}}
switch($str_each[$i][2]){case"\u5e73":{switch($str_each[$i][3]){case"\u4e00":$col=8;$colw="I";break;case"\u4e8c":$col=7;$colw="H";break;case"\u4e09":$col=6;$colw="G";break;case"\u56db":$col=5;$colw="F";break;case"\u4e94":$col=4;$colw="E";break;case"\u516d":$col=3;$colw="D";break;case"\u4e03":$col=2;$colw="C";break;case"\u516b":$col=1;$colw="B";break;case"\u4e5d":$col=0;$colw="A";break;}
$box_each[$col][$j]="C";$point=$colw+$row;$list+=$point;break;}
case"\u8fdb":{switch($str_each[$i][3]){case"\u4e00":$row=$row+1;break;case"\u4e8c":$row=$row+2;break;case"\u4e09":$row=$row+3;break;case"\u56db":$row=$row+4;break;case"\u4e94":$row=$row+5;break;case"\u516d":$row=$row+6;break;case"\u4e03":$row=$row+7;break;case"\u516b":$row=$row+8;break;case"\u4e5d":$row=$row+9;break;}
$box_each[$col][9-$row]="C";$point=$colw+$row;$list+=$point;break;}
case"\u9000":{switch($str_each[$i][3]){case"\u4e00":$row=$row-1;break;case"\u4e8c":$row=$row-2;break;case"\u4e09":$row=$row-3;break;case"\u56db":$row=$row-4;break;case"\u4e94":$row=$row-5;break;case"\u516d":$row=$row-6;break;case"\u4e03":$row=$row-7;break;case"\u516b":$row=$row-8;break;case"\u4e5d":$row=$row-9;break;}
$box_each[$col][9-$row]="C";$point=$colw+$row;$list+=$point;break;}}
break;}
case"\u5175":{for($k=0;$k<9;++$k){$specialsoldiercol=0;for($j=6;$j>=0;--$j){if($box_each[$k][$j]=="P"){++$specialsoldiercol;}}
if($specialsoldiercol<2){continue;}
for($j=6;$j>0;--$j){if($box_each[$k][$j]=="P"){$col=$k;switch($col){case 8:$colw="I";break;case 7:$colw="H";break;case 6:$colw="G";break;case 5:$colw="F";break;case 4:$colw="E";break;case 3:$colw="D";break;case 2:$colw="C";break;case 1:$colw="B";break;case 0:$colw="A";break;}
$row=9-$j;$point=$colw+$row;$list+=$point;$box_each[$col][$j]="*";$break_flag=1;break;}}
if($break_flag==1){$break_flag=0;break;}}
switch($str_each[$i][2]){case"\u5e73":{switch($str_each[$i][3]){case"\u4e00":$col=8;$colw="I";break;case"\u4e8c":$col=7;$colw="H";break;case"\u4e09":$col=6;$colw="G";break;case"\u56db":$col=5;$colw="F";break;case"\u4e94":$col=4;$colw="E";break;case"\u516d":$col=3;$colw="D";break;case"\u4e03":$col=2;$colw="C";break;case"\u516b":$col=1;$colw="B";break;case"\u4e5d":$col=0;$colw="A";break;}
$box_each[$col][$j]="P";$point=$colw+$row;$list+=$point;break;}
case"\u8fdb":{$row=$row+1;$box_each[$col][9-$row]="P";$point=$colw+$row;$list+=$point;break;}}
break;}
case"\u76f8":{switch($str_each[$i][0]+$str_each[$i][1]+$str_each[$i][2]+$str_each[$i][3]){case"\u540e\u76f8\u8fdb\u4e00":$box_each[6][9]="*";$box_each[8][7]="B";$list+="G0I2";break;case"\u540e\u76f8\u8fdb\u4e5d":$box_each[2][9]="*";$box_each[0][7]="B";$list+="C0A2";break;case"\u540e\u76f8\u8fdb\u4e94":{if($box_each[2][9]=="B"){$box_each[2][9]="*";$box_each[4][7]="B";$list+="C0E2";}
else{$box_each[6][9]="*";$box_each[4][7]="B";$list+="G0E2";}
break;}}
break;}
case"\u4ed5":{if($box_each[3][9]=="A"){$box_each[3][9]="*";$box_each[4][8]="A";$list+="D0E1";}
else{$box_each[5][9]="*";$box_each[4][8]="A";$list+="F0E1";}
break;}}
break;}
default:{$specialsoldier.length=0;for($j=8;$j>=0;--$j){$specialsoldiercol=0;for($k=0;$k<7;++$k){if($box_each[$j][$k]=="P"){++$specialsoldiercol;}}
if($specialsoldiercol<2){continue;}
for($k=0;$k<7;++$k){if($box_each[$j][$k]=="P"){switch($j){case 8:$colw="I";break;case 7:$colw="H";break;case 6:$colw="G";break;case 5:$colw="F";break;case 4:$colw="E";break;case 3:$colw="D";break;case 2:$colw="C";break;case 1:$colw="B";break;case 0:$colw="A";break;}
$specialsoldier[$specialsoldier.length]=eval('({"col": '+$j+', "colw": "'+$colw+'", "row": '+(9-$k)+'})');}}}
switch($str_each[$i][0]){case"\u4e2d":$col=$specialsoldier[1].col;$colw=$specialsoldier[1].colw;$row=$specialsoldier[1].row;break;case"\u4e00":$col=$specialsoldier[0].col;$colw=$specialsoldier[0].colw;$row=$specialsoldier[0].row;break;case"\u4e8c":$col=$specialsoldier[1].col;$colw=$specialsoldier[1].colw;$row=$specialsoldier[1].row;break;case"\u4e09":$col=$specialsoldier[2].col;$colw=$specialsoldier[2].colw;$row=$specialsoldier[2].row;break;case"\u56db":$col=$specialsoldier[3].col;$colw=$specialsoldier[3].colw;$row=$specialsoldier[3].row;break;case"\u4e94":$col=$specialsoldier[4].col;$colw=$specialsoldier[4].colw;$row=$specialsoldier[4].row;break;}
$box_each[$col][9-$row]="*";$point=$colw+$row;$list+=$point;switch($str_each[$i][2]){case"\u5e73":{switch($str_each[$i][3]){case"\u4e00":$col=8;$colw="I";break;case"\u4e8c":$col=7;$colw="H";break;case"\u4e09":$col=6;$colw="G";break;case"\u56db":$col=5;$colw="F";break;case"\u4e94":$col=4;$colw="E";break;case"\u516d":$col=3;$colw="D";break;case"\u4e03":$col=2;$colw="C";break;case"\u516b":$col=1;$colw="B";break;case"\u4e5d":$col=0;$colw="A";break;}
$box_each[$col][9-$row]="P";$point=$colw+$row;$list+=$point;break;}
case"\u8fdb":{$row=$row+1;$box_each[$col][9-$row]="P";$point=$colw+$row;$list+=$point;break;}}
break;}}}
else{switch($str_each[$i][0]){case"\u8f66":{switch($str_each[$i][1]){case"\uff19":$col=8;$colw="I";break;case"\uff18":$col=7;$colw="H";break;case"\uff17":$col=6;$colw="G";break;case"\uff16":$col=5;$colw="F";break;case"\uff15":$col=4;$colw="E";break;case"\uff14":$col=3;$colw="D";break;case"\uff13":$col=2;$colw="C";break;case"\uff12":$col=1;$colw="B";break;case"\uff11":$col=0;$colw="A";break;}
for($j=0;$j<10;++$j){if($box_each[$col][$j]=="r"){$row=9-$j;$point=$colw+$row;$list+=$point;$box_each[$col][$j]="*";break;}}
switch($str_each[$i][2]){case"\u5e73":{switch($str_each[$i][3]){case"\uff19":$col=8;$colw="I";break;case"\uff18":$col=7;$colw="H";break;case"\uff17":$col=6;$colw="G";break;case"\uff16":$col=5;$colw="F";break;case"\uff15":$col=4;$colw="E";break;case"\uff14":$col=3;$colw="D";break;case"\uff13":$col=2;$colw="C";break;case"\uff12":$col=1;$colw="B";break;case"\uff11":$col=0;$colw="A";break;}
$box_each[$col][$j]="r";$point=$colw+$row;$list+=$point;break;}
case"\u8fdb":{switch($str_each[$i][3]){case"\uff11":$row=$row-1;break;case"\uff12":$row=$row-2;break;case"\uff13":$row=$row-3;break;case"\uff14":$row=$row-4;break;case"\uff15":$row=$row-5;break;case"\uff16":$row=$row-6;break;case"\uff17":$row=$row-7;break;case"\uff18":$row=$row-8;break;case"\uff19":$row=$row-9;break;}
$box_each[$col][9-$row]="r";$point=$colw+$row;$list+=$point;break;}
case"\u9000":{switch($str_each[$i][3]){case"\uff11":$row=$row+1;break;case"\uff12":$row=$row+2;break;case"\uff13":$row=$row+3;break;case"\uff14":$row=$row+4;break;case"\uff15":$row=$row+5;break;case"\uff16":$row=$row+6;break;case"\uff17":$row=$row+7;break;case"\uff18":$row=$row+8;break;case"\uff19":$row=$row+9;break;}
$box_each[$col][9-$row]="r";$point=$colw+$row;$list+=$point;break;}}
break;}
case"\u9a6c":{switch($str_each[$i][1]){case"\uff19":$col=8;$colw="I";break;case"\uff18":$col=7;$colw="H";break;case"\uff17":$col=6;$colw="G";break;case"\uff16":$col=5;$colw="F";break;case"\uff15":$col=4;$colw="E";break;case"\uff14":$col=3;$colw="D";break;case"\uff13":$col=2;$colw="C";break;case"\uff12":$col=1;$colw="B";break;case"\uff11":$col=0;$colw="A";break;}
for($j=0;$j<10;++$j){if($box_each[$col][$j]=="n"||$box_each[$col][$j]=="h"){$row=9-$j;$point=$colw+$row;$list+=$point;$box_each[$col][$j]="*";break;}}
switch($str_each[$i][3]){case"\uff19":$coln=8;$colw="I";break;case"\uff18":$coln=7;$colw="H";break;case"\uff17":$coln=6;$colw="G";break;case"\uff16":$coln=5;$colw="F";break;case"\uff15":$coln=4;$colw="E";break;case"\uff14":$coln=3;$colw="D";break;case"\uff13":$coln=2;$colw="C";break;case"\uff12":$coln=1;$colw="B";break;case"\uff11":$coln=0;$colw="A";break;}
switch($str_each[$i][2]){case"\u8fdb":{if(Math.abs($col-$coln)==1){$row=$row-2;}
else{$row=$row-1;}
break;}
case"\u9000":{if(Math.abs($col-$coln)==1){$row=$row+2;}
else{$row=$row+1;}
break;}}
$box_each[$coln][9-$row]="n";$point=$colw+$row;$list+=$point;break;}
case"\u8c61":{switch($str_each[$i][0]+$str_each[$i][1]+$str_each[$i][2]+$str_each[$i][3]){case"\u8c61\uff11\u8fdb\uff13":$box_each[0][2]="*";$box_each[2][4]="b";$list+="A7C5";break;case"\u8c61\uff13\u9000\uff11":$box_each[2][4]="*";$box_each[0][2]="b";$list+="C5A7";break;case"\u8c61\uff11\u9000\uff13":$box_each[0][2]="*";$box_each[2][0]="b";$list+="A7C9";break;case"\u8c61\uff13\u8fdb\uff11":$box_each[2][0]="*";$box_each[0][2]="b";$list+="C9A7";break;case"\u8c61\uff15\u8fdb\uff13":$box_each[4][2]="*";$box_each[2][4]="b";$list+="E7C5";break;case"\u8c61\uff13\u9000\uff15":$box_each[2][4]="*";$box_each[4][2]="b";$list+="C5E7";break;case"\u8c61\uff15\u9000\uff13":$box_each[4][2]="*";$box_each[2][0]="b";$list+="E7C9";break;case"\u8c61\uff13\u8fdb\uff15":$box_each[2][0]="*";$box_each[4][2]="b";$list+="C9E7";break;case"\u8c61\uff15\u8fdb\uff17":$box_each[4][2]="*";$box_each[6][4]="b";$list+="E7G5";break;case"\u8c61\uff17\u9000\uff15":$box_each[6][4]="*";$box_each[4][2]="b";$list+="G5E7";break;case"\u8c61\uff15\u9000\uff17":$box_each[4][2]="*";$box_each[6][0]="b";$list+="E7G9";break;case"\u8c61\uff17\u8fdb\uff15":$box_each[6][0]="*";$box_each[4][2]="b";$list+="G9E7";break;case"\u8c61\uff19\u8fdb\uff17":$box_each[8][2]="*";$box_each[8][4]="b";$list+="I7G5";break;case"\u8c61\uff17\u9000\uff19":$box_each[6][4]="*";$box_each[8][2]="b";$list+="G5I7";break;case"\u8c61\uff19\u9000\uff17":$box_each[8][2]="*";$box_each[6][0]="b";$list+="I7G9";break;case"\u8c61\uff17\u8fdb\uff19":$box_each[6][0]="*";$box_each[8][2]="b";$list+="G9I7";break;}
break;}
case"\u58eb":{switch($str_each[$i][0]+$str_each[$i][1]+$str_each[$i][2]+$str_each[$i][3]){case"\u58eb\uff15\u8fdb\uff14":$box_each[4][1]="*";$box_each[3][2]="a";$list+="E8D7";break;case"\u58eb\uff14\u9000\uff15":$box_each[3][2]="*";$box_each[4][1]="a";$list+="D7E8";break;case"\u58eb\uff15\u9000\uff14":$box_each[4][1]="*";$box_each[3][0]="a";$list+="E8D9";break;case"\u58eb\uff14\u8fdb\uff15":$box_each[3][0]="*";$box_each[4][1]="a";$list+="D9E8";break;case"\u58eb\uff15\u8fdb\uff16":$box_each[4][1]="*";$box_each[5][2]="a";$list+="E8F7";break;case"\u58eb\uff16\u9000\uff15":$box_each[5][2]="*";$box_each[4][1]="a";$list+="F7E8";break;case"\u58eb\uff15\u9000\uff16":$box_each[4][1]="*";$box_each[5][0]="a";$list+="E8F9";break;case"\u58eb\uff16\u8fdb\uff15":$box_each[5][0]="*";$box_each[4][1]="a";$list+="F9E8";break;}
break;}
case"\u5c06":{switch($str_each[$i][1]){case"\uff16":$col=5;$colw="F";break;case"\uff15":$col=4;$colw="E";break;case"\uff14":$col=3;$colw="D";break;}
for($j=0;$j<3;++$j){if($box_each[$col][$j]=="k"){$row=9-$j;$point=$colw+$row;$list+=$point;$box_each[$col][$j]="*";break;}}
switch($str_each[$i][2]){case"\u5e73":{switch($str_each[$i][3]){case"\uff16":$col=5;$colw="F";break;case"\uff15":$col=4;$colw="E";break;case"\uff14":$col=3;$colw="D";break;}
$box_each[$col][$j]="k";$point=$colw+$row;$list+=$point;break;}
case"\u8fdb":{$row=$row-1;$box_each[$col][9-$row]="k";$point=$colw+$row;$list+=$point;break;}
case"\u9000":{$row=$row+1;$box_each[$col][9-$row]="k";$point=$colw+$row;$list+=$point;break;}}
break;}
case"\u70ae":{switch($str_each[$i][1]){case"\uff19":$col=8;$colw="I";break;case"\uff18":$col=7;$colw="H";break;case"\uff17":$col=6;$colw="G";break;case"\uff16":$col=5;$colw="F";break;case"\uff15":$col=4;$colw="E";break;case"\uff14":$col=3;$colw="D";break;case"\uff13":$col=2;$colw="C";break;case"\uff12":$col=1;$colw="B";break;case"\uff11":$col=0;$colw="A";break;}
for($j=0;$j<10;++$j){if($box_each[$col][$j]=="c"){$row=9-$j;$point=$colw+$row;$list+=$point;$box_each[$col][$j]="*";break;}}
switch($str_each[$i][2]){case"\u5e73":{switch($str_each[$i][3]){case"\uff19":$col=8;$colw="I";break;case"\uff18":$col=7;$colw="H";break;case"\uff17":$col=6;$colw="G";break;case"\uff16":$col=5;$colw="F";break;case"\uff15":$col=4;$colw="E";break;case"\uff14":$col=3;$colw="D";break;case"\uff13":$col=2;$colw="C";break;case"\uff12":$col=1;$colw="B";break;case"\uff11":$col=0;$colw="A";break;}
$box_each[$col][$j]="c";$point=$colw+$row;$list+=$point;break;}
case"\u8fdb":{switch($str_each[$i][3]){case"\uff11":$row=$row-1;break;case"\uff12":$row=$row-2;break;case"\uff13":$row=$row-3;break;case"\uff14":$row=$row-4;break;case"\uff15":$row=$row-5;break;case"\uff16":$row=$row-6;break;case"\uff17":$row=$row-7;break;case"\uff18":$row=$row-8;break;case"\uff19":$row=$row-9;break;}
$box_each[$col][9-$row]="c";$point=$colw+$row;$list+=$point;break;}
case"\u9000":{switch($str_each[$i][3]){case"\uff11":$row=$row+1;break;case"\uff12":$row=$row+2;break;case"\uff13":$row=$row+3;break;case"\uff14":$row=$row+4;break;case"\uff15":$row=$row+5;break;case"\uff16":$row=$row+6;break;case"\uff17":$row=$row+7;break;case"\uff18":$row=$row+8;break;case"\uff19":$row=$row+9;break;}
$box_each[$col][9-$row]="c";$point=$colw+$row;$list+=$point;break;}}
break;}
case"\u5352":{switch($str_each[$i][1]){case"\uff19":$col=8;$colw="I";break;case"\uff18":$col=7;$colw="H";break;case"\uff17":$col=6;$colw="G";break;case"\uff16":$col=5;$colw="F";break;case"\uff15":$col=4;$colw="E";break;case"\uff14":$col=3;$colw="D";break;case"\uff13":$col=2;$colw="C";break;case"\uff12":$col=1;$colw="B";break;case"\uff11":$col=0;$colw="A";break;}
for($j=3;$j<10;++$j){if($box_each[$col][$j]=="p"){$row=9-$j;$point=$colw+$row;$list+=$point;$box_each[$col][$j]="*";break;}}
switch($str_each[$i][2]){case"\u5e73":{switch($str_each[$i][3]){case"\uff19":$col=8;$colw="I";break;case"\uff18":$col=7;$colw="H";break;case"\uff17":$col=6;$colw="G";break;case"\uff16":$col=5;$colw="F";break;case"\uff15":$col=4;$colw="E";break;case"\uff14":$col=3;$colw="D";break;case"\uff13":$col=2;$colw="C";break;case"\uff12":$col=1;$colw="B";break;case"\uff11":$col=0;$colw="A";break;}
$box_each[$col][$j]="p";$point=$colw+$row;$list+=$point;break;}
case"\u8fdb":{$row=$row-1;$box_each[$col][9-$row]="p";$point=$colw+$row;$list+=$point;break;}}
break;}
case"\u524d":{switch($str_each[$i][1]){case"\u8f66":{for($k=0;$k<9;++$k){for($j=9;$j>0;--$j){if($box_each[$k][$j]=="r"){$col=$k;switch($col){case 8:$colw="I";break;case 7:$colw="H";break;case 6:$colw="G";break;case 5:$colw="F";break;case 4:$colw="E";break;case 3:$colw="D";break;case 2:$colw="C";break;case 1:$colw="B";break;case 0:$colw="A";break;}
$row=9-$j;$point=$colw+$row;$list+=$point;$box_each[$col][$j]="*";$break_flag=1;break;}}
if($break_flag==1){$break_flag=0;break;}}
switch($str_each[$i][2]){case"\u5e73":{switch($str_each[$i][3]){case"\uff19":$col=8;$colw="I";break;case"\uff18":$col=7;$colw="H";break;case"\uff17":$col=6;$colw="G";break;case"\uff16":$col=5;$colw="F";break;case"\uff15":$col=4;$colw="E";break;case"\uff14":$col=3;$colw="D";break;case"\uff13":$col=2;$colw="C";break;case"\uff12":$col=1;$colw="B";break;case"\uff11":$col=0;$colw="A";break;}
$box_each[$col][$j]="r";$point=$colw+$row;$list+=$point;break;}
case"\u8fdb":{switch($str_each[$i][3]){case"\uff11":$row=$row-1;break;case"\uff12":$row=$row-2;break;case"\uff13":$row=$row-3;break;case"\uff14":$row=$row-4;break;case"\uff15":$row=$row-5;break;case"\uff16":$row=$row-6;break;case"\uff17":$row=$row-7;break;case"\uff18":$row=$row-8;break;case"\uff19":$row=$row-9;break;}
$box_each[$col][9-$row]="r";$point=$colw+$row;$list+=$point;break;}
case"\u9000":{switch($str_each[$i][3]){case"\uff11":$row=$row+1;break;case"\uff12":$row=$row+2;break;case"\uff13":$row=$row+3;break;case"\uff14":$row=$row+4;break;case"\uff15":$row=$row+5;break;case"\uff16":$row=$row+6;break;case"\uff17":$row=$row+7;break;case"\uff18":$row=$row+8;break;case"\uff19":$row=$row+9;break;}
$box_each[$col][9-$row]="r";$point=$colw+$row;$list+=$point;break;}}
break;}
case"\u9a6c":{for($k=0;$k<9;++$k){for($j=9;$j>0;--$j){if($box_each[$k][$j]=="n"||$box_each[$k][$j]=="h"){$col=$k;switch($col){case 8:$colw="I";break;case 7:$colw="H";break;case 6:$colw="G";break;case 5:$colw="F";break;case 4:$colw="E";break;case 3:$colw="D";break;case 2:$colw="C";break;case 1:$colw="B";break;case 0:$colw="A";break;}
$row=9-$j;$point=$colw+$row;$list+=$point;$box_each[$col][$j]="*";$break_flag=1;break;}}
if($break_flag==1){$break_flag=0;break;}}
switch($str_each[$i][3]){case"\uff19":$coln=8;$colw="I";break;case"\uff18":$coln=7;$colw="H";break;case"\uff17":$coln=6;$colw="G";break;case"\uff16":$coln=5;$colw="F";break;case"\uff15":$coln=4;$colw="E";break;case"\uff14":$coln=3;$colw="D";break;case"\uff13":$coln=2;$colw="C";break;case"\uff12":$coln=1;$colw="B";break;case"\uff11":$coln=0;$colw="A";break;}
switch($str_each[$i][2]){case"\u8fdb":{if(Math.abs($col-$coln)==1){$row=$row-2;}
else{$row=$row-1;}
break;}
case"\u9000":{if(Math.abs($col-$coln)==1){$row=$row+2;}
else{$row=$row+1;}
break;}}
$box_each[$coln][9-$row]="n";$point=$colw+$row;$list+=$point;break;}
case"\u70ae":{for($k=0;$k<9;++$k){for($j=9;$j>0;--$j){if($box_each[$k][$j]=="c"){$col=$k;switch($col){case 8:$colw="I";break;case 7:$colw="H";break;case 6:$colw="G";break;case 5:$colw="F";break;case 4:$colw="E";break;case 3:$colw="D";break;case 2:$colw="C";break;case 1:$colw="B";break;case 0:$colw="A";break;}
$row=9-$j;$point=$colw+$row;$list+=$point;$box_each[$col][$j]="*";$break_flag=1;break;}}
if($break_flag==1){$break_flag=0;break;}}
switch($str_each[$i][2]){case"\u5e73":{switch($str_each[$i][3]){case"\uff19":$col=8;$colw="I";break;case"\uff18":$col=7;$colw="H";break;case"\uff17":$col=6;$colw="G";break;case"\uff16":$col=5;$colw="F";break;case"\uff15":$col=4;$colw="E";break;case"\uff14":$col=3;$colw="D";break;case"\uff13":$col=2;$colw="C";break;case"\uff12":$col=1;$colw="B";break;case"\uff11":$col=0;$colw="A";break;}
$box_each[$col][$j]="c";$point=$colw+$row;$list+=$point;break;}
case"\u8fdb":{switch($str_each[$i][3]){case"\uff11":$row=$row-1;break;case"\uff12":$row=$row-2;break;case"\uff13":$row=$row-3;break;case"\uff14":$row=$row-4;break;case"\uff15":$row=$row-5;break;case"\uff16":$row=$row-6;break;case"\uff17":$row=$row-7;break;case"\uff18":$row=$row-8;break;case"\uff19":$row=$row-9;break;}
$box_each[$col][9-$row]="c";$point=$colw+$row;$list+=$point;break;}
case"\u9000":{switch($str_each[$i][3]){case"\uff11":$row=$row+1;break;case"\uff12":$row=$row+2;break;case"\uff13":$row=$row+3;break;case"\uff14":$row=$row+4;break;case"\uff15":$row=$row+5;break;case"\uff16":$row=$row+6;break;case"\uff17":$row=$row+7;break;case"\uff18":$row=$row+8;break;case"\uff19":$row=$row+9;break;}
$box_each[$col][9-$row]="c";$point=$colw+$row;$list+=$point;break;}}
break;}
case"\u5352":{for($k=0;$k<9;++$k){$specialsoldiercol=0;for($j=9;$j>2;--$j){if($box_each[$k][$j]=="p"){++$specialsoldiercol;}}
if($specialsoldiercol<2){continue;}
for($j=9;$j>4;--$j){if($box_each[$k][$j]=="p"){$col=$k;switch($col){case 8:$colw="I";break;case 7:$colw="H";break;case 6:$colw="G";break;case 5:$colw="F";break;case 4:$colw="E";break;case 3:$colw="D";break;case 2:$colw="C";break;case 1:$colw="B";break;case 0:$colw="A";break;}
$row=9-$j;$point=$colw+$row;$list+=$point;$box_each[$col][$j]="*";$break_flag=1;break;}}
if($break_flag==1){$break_flag=0;break;}}
switch($str_each[$i][2]){case"\u5e73":{switch($str_each[$i][3]){case"\uff19":$col=8;$colw="I";break;case"\uff18":$col=7;$colw="H";break;case"\uff17":$col=6;$colw="G";break;case"\uff16":$col=5;$colw="F";break;case"\uff15":$col=4;$colw="E";break;case"\uff14":$col=3;$colw="D";break;case"\uff13":$col=2;$colw="C";break;case"\uff12":$col=1;$colw="B";break;case"\uff11":$col=0;$colw="A";break;}
$box_each[$col][$j]="p";$point=$colw+$row;$list+=$point;break;}
case"\u8fdb":{$row=$row-1;$box_each[$col][9-$row]="p";$point=$colw+$row;$list+=$point;break;}}
break;}
case"\u8c61":{switch($str_each[$i][0]+$str_each[$i][1]+$str_each[$i][2]+$str_each[$i][3]){case"\u524d\u8c61\u9000\uff11":$box_each[2][4]="*";$box_each[0][2]="b";$list+="C5A7";break;case"\u524d\u8c61\u9000\uff19":$box_each[6][4]="*";$box_each[8][2]="b";$list+="G5I7";break;case"\u524d\u8c61\u9000\uff15":{if($box_each[2][4]=="b"){$box_each[2][4]="*";$box_each[4][2]="b";$list+="C5E7";}
else{$box_each[6][4]="*";$box_each[4][2]="b";$list+="G5E7";}
break;}}
break;}
case"\u58eb":{if($box_each[5][2]=="a"){$box_each[5][2]="*";$box_each[4][1]="a";$list+="F7E8";}
else{$box_each[3][2]="*";$box_each[4][1]="a";$list+="D7E8";}
break;}}
break;}
case"\u540e":{switch($str_each[$i][1]){case"\u8f66":{for($k=0;$k<9;++$k){for($j=0;$j<9;++$j){if($box_each[$k][$j]=="r"){$col=$k;switch($col){case 8:$colw="I";break;case 7:$colw="H";break;case 6:$colw="G";break;case 5:$colw="F";break;case 4:$colw="E";break;case 3:$colw="D";break;case 2:$colw="C";break;case 1:$colw="B";break;case 0:$colw="A";break;}
$row=9-$j;$point=$colw+$row;$list+=$point;$box_each[$col][$j]="*";$break_flag=1;break;}}
if($break_flag==1){$break_flag=0;break;}}
switch($str_each[$i][2]){case"\u5e73":{switch($str_each[$i][3]){case"\uff19":$col=8;$colw="I";break;case"\uff18":$col=7;$colw="H";break;case"\uff17":$col=6;$colw="G";break;case"\uff16":$col=5;$colw="F";break;case"\uff15":$col=4;$colw="E";break;case"\uff14":$col=3;$colw="D";break;case"\uff13":$col=2;$colw="C";break;case"\uff12":$col=1;$colw="B";break;case"\uff11":$col=0;$colw="A";break;}
$box_each[$col][$j]="r";$point=$colw+$row;$list+=$point;break;}
case"\u8fdb":{switch($str_each[$i][3]){case"\uff11":$row=$row-1;break;case"\uff12":$row=$row-2;break;case"\uff13":$row=$row-3;break;case"\uff14":$row=$row-4;break;case"\uff15":$row=$row-5;break;case"\uff16":$row=$row-6;break;case"\uff17":$row=$row-7;break;case"\uff18":$row=$row-8;break;case"\uff19":$row=$row-9;break;}
$box_each[$col][9-$row]="r";$point=$colw+$row;$list+=$point;break;}
case"\u9000":{switch($str_each[$i][3]){case"\uff11":$row=$row+1;break;case"\uff12":$row=$row+2;break;case"\uff13":$row=$row+3;break;case"\uff14":$row=$row+4;break;case"\uff15":$row=$row+5;break;case"\uff16":$row=$row+6;break;case"\uff17":$row=$row+7;break;case"\uff18":$row=$row+8;break;case"\uff19":$row=$row+9;break;}
$box_each[$col][9-$row]="r";$point=$colw+$row;$list+=$point;break;}}
break;}
case"\u9a6c":{for($k=0;$k<9;++$k){for($j=0;$j<9;++$j){if($box_each[$k][$j]=="n"||$box_each[$k][$j]=="h"){$col=$k;switch($col){case 8:$colw="I";break;case 7:$colw="H";break;case 6:$colw="G";break;case 5:$colw="F";break;case 4:$colw="E";break;case 3:$colw="D";break;case 2:$colw="C";break;case 1:$colw="B";break;case 0:$colw="A";break;}
$row=9-$j;$point=$colw+$row;$list+=$point;$box_each[$col][$j]="*";$break_flag=1;break;}}
if($break_flag==1){$break_flag=0;break;}}
switch($str_each[$i][3]){case"\uff19":$coln=8;$colw="I";break;case"\uff18":$coln=7;$colw="H";break;case"\uff17":$coln=6;$colw="G";break;case"\uff16":$coln=5;$colw="F";break;case"\uff15":$coln=4;$colw="E";break;case"\uff14":$coln=3;$colw="D";break;case"\uff13":$coln=2;$colw="C";break;case"\uff12":$coln=1;$colw="B";break;case"\uff11":$coln=0;$colw="A";break;}
switch($str_each[$i][2]){case"\u8fdb":{if(Math.abs($col-$coln)==1){$row=$row-2;}
else{$row=$row-1;}
break;}
case"\u9000":{if(Math.abs($col-$coln)==1){$row=$row+2;}
else{$row=$row+1;}
break;}}
$box_each[$coln][9-$row]="n";$point=$colw+$row;$list+=$point;break;}
case"\u70ae":{for($k=0;$k<9;++$k){for($j=0;$j<9;++$j){if($box_each[$k][$j]=="c"){$col=$k;switch($col){case 8:$colw="I";break;case 7:$colw="H";break;case 6:$colw="G";break;case 5:$colw="F";break;case 4:$colw="E";break;case 3:$colw="D";break;case 2:$colw="C";break;case 1:$colw="B";break;case 0:$colw="A";break;}
$row=9-$j;$point=$colw+$row;$list+=$point;$box_each[$col][$j]="*";$break_flag=1;break;}}
if($break_flag==1){$break_flag=0;break;}}
switch($str_each[$i][2]){case"\u5e73":{switch($str_each[$i][3]){case"\uff19":$col=8;$colw="I";break;case"\uff18":$col=7;$colw="H";break;case"\uff17":$col=6;$colw="G";break;case"\uff16":$col=5;$colw="F";break;case"\uff15":$col=4;$colw="E";break;case"\uff14":$col=3;$colw="D";break;case"\uff13":$col=2;$colw="C";break;case"\uff12":$col=1;$colw="B";break;case"\uff11":$col=0;$colw="A";break;}
$box_each[$col][$j]="c";$point=$colw+$row;$list+=$point;break;}
case"\u8fdb":{switch($str_each[$i][3]){case"\uff11":$row=$row-1;break;case"\uff12":$row=$row-2;break;case"\uff13":$row=$row-3;break;case"\uff14":$row=$row-4;break;case"\uff15":$row=$row-5;break;case"\uff16":$row=$row-6;break;case"\uff17":$row=$row-7;break;case"\uff18":$row=$row-8;break;case"\uff19":$row=$row-9;break;}
$box_each[$col][9-$row]="c";$point=$colw+$row;$list+=$point;break;}
case"\u9000":{switch($str_each[$i][3]){case"\uff11":$row=$row+1;break;case"\uff12":$row=$row+2;break;case"\uff13":$row=$row+3;break;case"\uff14":$row=$row+4;break;case"\uff15":$row=$row+5;break;case"\uff16":$row=$row+6;break;case"\uff17":$row=$row+7;break;case"\uff18":$row=$row+8;break;case"\uff19":$row=$row+9;break;}
$box_each[$col][9-$row]="c";$point=$colw+$row;$list+=$point;break;}}
break;}
case"\u5352":{for($k=0;$k<9;++$k){$specialsoldiercol=0;for($j=3;$j<10;++$j){if($box_each[$k][$j]=="p"){++$specialsoldiercol;}}
if($specialsoldiercol<2){continue;}
for($j=3;$j<9;++$j){if($box_each[$k][$j]=="p"){$col=$k;switch($col){case 8:$colw="I";break;case 7:$colw="H";break;case 6:$colw="G";break;case 5:$colw="F";break;case 4:$colw="E";break;case 3:$colw="D";break;case 2:$colw="C";break;case 1:$colw="B";break;case 0:$colw="A";break;}
$row=9-$j;$point=$colw+$row;$list+=$point;$box_each[$col][$j]="*";$break_flag=1;break;}}
if($break_flag==1){$break_flag=0;break;}}
switch($str_each[$i][2]){case"\u5e73":{switch($str_each[$i][3]){case"\uff19":$col=8;$colw="I";break;case"\uff18":$col=7;$colw="H";break;case"\uff17":$col=6;$colw="G";break;case"\uff16":$col=5;$colw="F";break;case"\uff15":$col=4;$colw="E";break;case"\uff14":$col=3;$colw="D";break;case"\uff13":$col=2;$colw="C";break;case"\uff12":$col=1;$colw="B";break;case"\uff11":$col=0;$colw="A";break;}
$box_each[$col][$j]="p";$point=$colw+$row;$list+=$point;break;}
case"\u8fdb":{$row=$row-1;$box_each[$col][9-$row]="p";$point=$colw+$row;$list+=$point;break;}}
break;}
case"\u8c61":{switch($str_each[$i][0]+$str_each[$i][1]+$str_each[$i][2]+$str_each[$i][3]){case"\u540e\u8c61\u8fdb\uff11":$box_each[2][0]="*";$box_each[0][2]="b";$list+="C9A7";break;case"\u540e\u8c61\u8fdb\uff19":$box_each[6][0]="*";$box_each[8][2]="b";$list+="G9I7";break;case"\u540e\u8c61\u8fdb\uff15":{if($box_each[2][0]=="b"){$box_each[2][0]="*";$box_each[4][2]="b";$list+="C9E7";}
else{$box_each[6][0]="*";$box_each[4][2]="b";$list+="G9E7";}
break;}}
break;}
case"\u58eb":{if($box_each[5][0]=="a"){$box_each[5][0]="*";$box_each[4][1]="a";$list+="F9E8";}
else{$box_each[3][0]="*";$box_each[4][1]="a";$list+="D9E8";}
break;}}
break;}
default:{$specialsoldier.length=0;for($j=0;$j<9;++$j){$specialsoldiercol=0;for($k=9;$k>2;--$k){if($box_each[$j][$k]=="p"){++$specialsoldiercol;}}
if($specialsoldiercol<2){continue;}
for($k=9;$k>2;--$k){if($box_each[$j][$k]=="p"){switch($j){case 8:$colw="I";break;case 7:$colw="H";break;case 6:$colw="G";break;case 5:$colw="F";break;case 4:$colw="E";break;case 3:$colw="D";break;case 2:$colw="C";break;case 1:$colw="B";break;case 0:$colw="A";break;}
$specialsoldier[$specialsoldier.length]=eval('({"col": '+$j+', "colw": "'+$colw+'", "row": '+(9-$k)+'})');}}}
switch($str_each[$i][0]){case"\u4e2d":$col=$specialsoldier[1].col;$colw=$specialsoldier[1].colw;$row=$specialsoldier[1].row;break;case"\u4e00":$col=$specialsoldier[0].col;$colw=$specialsoldier[0].colw;$row=$specialsoldier[0].row;break;case"\u4e8c":$col=$specialsoldier[1].col;$colw=$specialsoldier[1].colw;$row=$specialsoldier[1].row;break;case"\u4e09":$col=$specialsoldier[2].col;$colw=$specialsoldier[2].colw;$row=$specialsoldier[2].row;break;case"\u56db":$col=$specialsoldier[3].col;$colw=$specialsoldier[3].colw;$row=$specialsoldier[3].row;break;case"\u4e94":$col=$specialsoldier[4].col;$colw=$specialsoldier[4].colw;$row=$specialsoldier[4].row;break;}
$box_each[$col][9-$row]="*";$point=$colw+$row;$list+=$point;switch($str_each[$i][2]){case"\u5e73":{switch($str_each[$i][3]){case"\uff19":$col=8;$colw="I";break;case"\uff18":$col=7;$colw="H";break;case"\uff17":$col=6;$colw="G";break;case"\uff16":$col=5;$colw="F";break;case"\uff15":$col=4;$colw="E";break;case"\uff14":$col=3;$colw="D";break;case"\uff13":$col=2;$colw="C";break;case"\uff12":$col=1;$colw="B";break;case"\uff11":$col=0;$colw="A";break;}
$box_each[$col][9-$row]="p";$point=$colw+$row;$list+=$point;break;}
case"\u8fdb":{$row=$row-1;$box_each[$col][9-$row]="p";$point=$colw+$row;$list+=$point;break;}}
break;}}}}
if($cmt){return $fen_begin+":"+$list+":"+$final+":"+$cmt;}
else{return $fen_begin+":"+$list+":"+$final;}};vschess.chinesesteps=function($str){var $mirror=arguments[1]?true:false;var $steps=[],$step_each=[],$specialsoldier=[];var $colindex=0,$indexfrom=0,$indexto=0,$colsoldiernum=0,$specialsoldiernum=0;var $samecol=0,$i=0,$j=0,$k=0,$m=0;var $format=$str.split(",");$steps[0]=$format[0];if($format){var $fen=$format[0];var $temp=$fen.split(" ");var $beginplayer=$temp[1];var $beginround=parseInt($temp[5][0]);var $currentplayer=$temp[1];var $currentround=parseInt($temp[5][0]);var $jumian=$temp[0].replace(/1/g,"*").replace(/2/g,"**").replace(/3/g,"***").replace(/4/g,"****").replace(/5/g,"*****").replace(/6/g,"******").replace(/7/g,"*******").replace(/8/g,"********").replace(/9/g,"*********").replace(/\//g,"").split("");for($i=0;$i<$format.length-1;++$i){$step_each[$i]=$format[$i+1].split("");switch($step_each[$i][0]){case"a":$colindex=0;break;case"b":$colindex=1;break;case"c":$colindex=2;break;case"d":$colindex=3;break;case"e":$colindex=4;break;case"f":$colindex=5;break;case"g":$colindex=6;break;case"h":$colindex=7;break;case"i":$colindex=8;break;}
$indexfrom=(9-parseInt($step_each[$i][1]))*9+$colindex;switch($step_each[$i][2]){case"a":$colindex=0;break;case"b":$colindex=1;break;case"c":$colindex=2;break;case"d":$colindex=3;break;case"e":$colindex=4;break;case"f":$colindex=5;break;case"g":$colindex=6;break;case"h":$colindex=7;break;case"i":$colindex=8;break;}
$indexto=(9-parseInt($step_each[$i][3]))*9+$colindex;if($beginplayer=="b"!=$i%2){switch($jumian[$indexfrom]){case"r":{$samecol=0;for($j=$indexfrom-9;$j>=0;$j-=9){if($jumian[$j]=="r"){$samecol=1;$steps[$i+1]="\u524d\u8f66";}}
for($j=$indexfrom+9;$j<90;$j+=9){if($jumian[$j]=="r"){$samecol=1;$steps[$i+1]="\u540e\u8f66";}}
if($samecol==0){if($mirror){switch($step_each[$i][0]){case"a":$steps[$i+1]="\u8f66\uff19";break;case"b":$steps[$i+1]="\u8f66\uff18";break;case"c":$steps[$i+1]="\u8f66\uff17";break;case"d":$steps[$i+1]="\u8f66\uff16";break;case"e":$steps[$i+1]="\u8f66\uff15";break;case"f":$steps[$i+1]="\u8f66\uff14";break;case"g":$steps[$i+1]="\u8f66\uff13";break;case"h":$steps[$i+1]="\u8f66\uff12";break;case"i":$steps[$i+1]="\u8f66\uff11";break;}}
else{switch($step_each[$i][0]){case"a":$steps[$i+1]="\u8f66\uff11";break;case"b":$steps[$i+1]="\u8f66\uff12";break;case"c":$steps[$i+1]="\u8f66\uff13";break;case"d":$steps[$i+1]="\u8f66\uff14";break;case"e":$steps[$i+1]="\u8f66\uff15";break;case"f":$steps[$i+1]="\u8f66\uff16";break;case"g":$steps[$i+1]="\u8f66\uff17";break;case"h":$steps[$i+1]="\u8f66\uff18";break;case"i":$steps[$i+1]="\u8f66\uff19";break;}}}
if(Math.abs($indexfrom-$indexto)<9){if($mirror){switch($indexto%9){case 0:$steps[$i+1]+="\u5e73\uff19";break;case 1:$steps[$i+1]+="\u5e73\uff18";break;case 2:$steps[$i+1]+="\u5e73\uff17";break;case 3:$steps[$i+1]+="\u5e73\uff16";break;case 4:$steps[$i+1]+="\u5e73\uff15";break;case 5:$steps[$i+1]+="\u5e73\uff14";break;case 6:$steps[$i+1]+="\u5e73\uff13";break;case 7:$steps[$i+1]+="\u5e73\uff12";break;case 8:$steps[$i+1]+="\u5e73\uff11";break;}}
else{switch($indexto%9){case 0:$steps[$i+1]+="\u5e73\uff11";break;case 1:$steps[$i+1]+="\u5e73\uff12";break;case 2:$steps[$i+1]+="\u5e73\uff13";break;case 3:$steps[$i+1]+="\u5e73\uff14";break;case 4:$steps[$i+1]+="\u5e73\uff15";break;case 5:$steps[$i+1]+="\u5e73\uff16";break;case 6:$steps[$i+1]+="\u5e73\uff17";break;case 7:$steps[$i+1]+="\u5e73\uff18";break;case 8:$steps[$i+1]+="\u5e73\uff19";break;}}}
else{switch(($indexfrom-$indexto)/9){case-1:$steps[$i+1]+="\u8fdb\uff11";break;case-2:$steps[$i+1]+="\u8fdb\uff12";break;case-3:$steps[$i+1]+="\u8fdb\uff13";break;case-4:$steps[$i+1]+="\u8fdb\uff14";break;case-5:$steps[$i+1]+="\u8fdb\uff15";break;case-6:$steps[$i+1]+="\u8fdb\uff16";break;case-7:$steps[$i+1]+="\u8fdb\uff17";break;case-8:$steps[$i+1]+="\u8fdb\uff18";break;case-9:$steps[$i+1]+="\u8fdb\uff19";break;case 1:$steps[$i+1]+="\u9000\uff11";break;case 2:$steps[$i+1]+="\u9000\uff12";break;case 3:$steps[$i+1]+="\u9000\uff13";break;case 4:$steps[$i+1]+="\u9000\uff14";break;case 5:$steps[$i+1]+="\u9000\uff15";break;case 6:$steps[$i+1]+="\u9000\uff16";break;case 7:$steps[$i+1]+="\u9000\uff17";break;case 8:$steps[$i+1]+="\u9000\uff18";break;case 9:$steps[$i+1]+="\u9000\uff19";break;}}
break;}
case"c":{$samecol=0;for($j=$indexfrom-9;$j>=0;$j-=9){if($jumian[$j]=="c"){$samecol=1;$steps[$i+1]="\u524d\u70ae";}}
for($j=$indexfrom+9;$j<90;$j+=9){if($jumian[$j]=="c"){$samecol=1;$steps[$i+1]="\u540e\u70ae";}}
if($samecol==0){if($mirror){switch($step_each[$i][0]){case"a":$steps[$i+1]="\u70ae\uff19";break;case"b":$steps[$i+1]="\u70ae\uff18";break;case"c":$steps[$i+1]="\u70ae\uff17";break;case"d":$steps[$i+1]="\u70ae\uff16";break;case"e":$steps[$i+1]="\u70ae\uff15";break;case"f":$steps[$i+1]="\u70ae\uff14";break;case"g":$steps[$i+1]="\u70ae\uff13";break;case"h":$steps[$i+1]="\u70ae\uff12";break;case"i":$steps[$i+1]="\u70ae\uff11";break;}}
else{switch($step_each[$i][0]){case"a":$steps[$i+1]="\u70ae\uff11";break;case"b":$steps[$i+1]="\u70ae\uff12";break;case"c":$steps[$i+1]="\u70ae\uff13";break;case"d":$steps[$i+1]="\u70ae\uff14";break;case"e":$steps[$i+1]="\u70ae\uff15";break;case"f":$steps[$i+1]="\u70ae\uff16";break;case"g":$steps[$i+1]="\u70ae\uff17";break;case"h":$steps[$i+1]="\u70ae\uff18";break;case"i":$steps[$i+1]="\u70ae\uff19";break;}}}
if(Math.abs($indexfrom-$indexto)<9){if($mirror){switch($indexto%9){case 0:$steps[$i+1]+="\u5e73\uff19";break;case 1:$steps[$i+1]+="\u5e73\uff18";break;case 2:$steps[$i+1]+="\u5e73\uff17";break;case 3:$steps[$i+1]+="\u5e73\uff16";break;case 4:$steps[$i+1]+="\u5e73\uff15";break;case 5:$steps[$i+1]+="\u5e73\uff14";break;case 6:$steps[$i+1]+="\u5e73\uff13";break;case 7:$steps[$i+1]+="\u5e73\uff12";break;case 8:$steps[$i+1]+="\u5e73\uff11";break;}}
else{switch($indexto%9){case 0:$steps[$i+1]+="\u5e73\uff11";break;case 1:$steps[$i+1]+="\u5e73\uff12";break;case 2:$steps[$i+1]+="\u5e73\uff13";break;case 3:$steps[$i+1]+="\u5e73\uff14";break;case 4:$steps[$i+1]+="\u5e73\uff15";break;case 5:$steps[$i+1]+="\u5e73\uff16";break;case 6:$steps[$i+1]+="\u5e73\uff17";break;case 7:$steps[$i+1]+="\u5e73\uff18";break;case 8:$steps[$i+1]+="\u5e73\uff19";break;}}}
else{switch(($indexfrom-$indexto)/9){case-1:$steps[$i+1]+="\u8fdb\uff11";break;case-2:$steps[$i+1]+="\u8fdb\uff12";break;case-3:$steps[$i+1]+="\u8fdb\uff13";break;case-4:$steps[$i+1]+="\u8fdb\uff14";break;case-5:$steps[$i+1]+="\u8fdb\uff15";break;case-6:$steps[$i+1]+="\u8fdb\uff16";break;case-7:$steps[$i+1]+="\u8fdb\uff17";break;case-8:$steps[$i+1]+="\u8fdb\uff18";break;case-9:$steps[$i+1]+="\u8fdb\uff19";break;case 1:$steps[$i+1]+="\u9000\uff11";break;case 2:$steps[$i+1]+="\u9000\uff12";break;case 3:$steps[$i+1]+="\u9000\uff13";break;case 4:$steps[$i+1]+="\u9000\uff14";break;case 5:$steps[$i+1]+="\u9000\uff15";break;case 6:$steps[$i+1]+="\u9000\uff16";break;case 7:$steps[$i+1]+="\u9000\uff17";break;case 8:$steps[$i+1]+="\u9000\uff18";break;case 9:$steps[$i+1]+="\u9000\uff19";break;}}
break;}
case"k":{if($mirror){switch($step_each[$i][0]){case"d":$steps[$i+1]="\u5c06\uff16";break;case"e":$steps[$i+1]="\u5c06\uff15";break;case"f":$steps[$i+1]="\u5c06\uff14";break;}}
else{switch($step_each[$i][0]){case"d":$steps[$i+1]="\u5c06\uff14";break;case"e":$steps[$i+1]="\u5c06\uff15";break;case"f":$steps[$i+1]="\u5c06\uff16";break;}}
switch($indexfrom-$indexto){case-9:$steps[$i+1]+="\u8fdb\uff11";break;case-45:$steps[$i+1]+="\u8fdb\uff15";break;case-54:$steps[$i+1]+="\u8fdb\uff16";break;case-63:$steps[$i+1]+="\u8fdb\uff17";break;case-72:$steps[$i+1]+="\u8fdb\uff18";break;case-81:$steps[$i+1]+="\u8fdb\uff19";break;case 9:$steps[$i+1]+="\u9000\uff11";break;default:{if($mirror){switch($indexto){case 3:case 12:case 21:$steps[$i+1]+="\u5e73\uff16";break;case 4:case 13:case 22:$steps[$i+1]+="\u5e73\uff15";break;case 5:case 14:case 23:$steps[$i+1]+="\u5e73\uff14";break;}}
else{switch($indexto){case 3:case 12:case 21:$steps[$i+1]+="\u5e73\uff14";break;case 4:case 13:case 22:$steps[$i+1]+="\u5e73\uff15";break;case 5:case 14:case 23:$steps[$i+1]+="\u5e73\uff16";break;}}
break;}}
break;}
case"n":case"h":{$samecol=0;for($j=$indexfrom-9;$j>=0;$j-=9){if($jumian[$j]=="n"||$jumian[$j]=="h"){$samecol=1;$steps[$i+1]="\u524d\u9a6c";}}
for($j=$indexfrom+9;$j<90;$j+=9){if($jumian[$j]=="n"||$jumian[$j]=="h"){$samecol=1;$steps[$i+1]="\u540e\u9a6c";}}
if($samecol==0){if($mirror){switch($step_each[$i][0]){case"a":$steps[$i+1]="\u9a6c\uff19";break;case"b":$steps[$i+1]="\u9a6c\uff18";break;case"c":$steps[$i+1]="\u9a6c\uff17";break;case"d":$steps[$i+1]="\u9a6c\uff16";break;case"e":$steps[$i+1]="\u9a6c\uff15";break;case"f":$steps[$i+1]="\u9a6c\uff14";break;case"g":$steps[$i+1]="\u9a6c\uff13";break;case"h":$steps[$i+1]="\u9a6c\uff12";break;case"i":$steps[$i+1]="\u9a6c\uff11";break;}}
else{switch($step_each[$i][0]){case"a":$steps[$i+1]="\u9a6c\uff11";break;case"b":$steps[$i+1]="\u9a6c\uff12";break;case"c":$steps[$i+1]="\u9a6c\uff13";break;case"d":$steps[$i+1]="\u9a6c\uff14";break;case"e":$steps[$i+1]="\u9a6c\uff15";break;case"f":$steps[$i+1]="\u9a6c\uff16";break;case"g":$steps[$i+1]="\u9a6c\uff17";break;case"h":$steps[$i+1]="\u9a6c\uff18";break;case"i":$steps[$i+1]="\u9a6c\uff19";break;}}}
if($indexfrom<$indexto){if($mirror){switch($indexto%9){case 0:$steps[$i+1]+="\u8fdb\uff19";break;case 1:$steps[$i+1]+="\u8fdb\uff18";break;case 2:$steps[$i+1]+="\u8fdb\uff17";break;case 3:$steps[$i+1]+="\u8fdb\uff16";break;case 4:$steps[$i+1]+="\u8fdb\uff15";break;case 5:$steps[$i+1]+="\u8fdb\uff14";break;case 6:$steps[$i+1]+="\u8fdb\uff13";break;case 7:$steps[$i+1]+="\u8fdb\uff12";break;case 8:$steps[$i+1]+="\u8fdb\uff11";break;}}
else{switch($indexto%9){case 0:$steps[$i+1]+="\u8fdb\uff11";break;case 1:$steps[$i+1]+="\u8fdb\uff12";break;case 2:$steps[$i+1]+="\u8fdb\uff13";break;case 3:$steps[$i+1]+="\u8fdb\uff14";break;case 4:$steps[$i+1]+="\u8fdb\uff15";break;case 5:$steps[$i+1]+="\u8fdb\uff16";break;case 6:$steps[$i+1]+="\u8fdb\uff17";break;case 7:$steps[$i+1]+="\u8fdb\uff18";break;case 8:$steps[$i+1]+="\u8fdb\uff19";break;}}}
else{if($mirror){switch($indexto%9){case 0:$steps[$i+1]+="\u9000\uff19";break;case 1:$steps[$i+1]+="\u9000\uff18";break;case 2:$steps[$i+1]+="\u9000\uff17";break;case 3:$steps[$i+1]+="\u9000\uff16";break;case 4:$steps[$i+1]+="\u9000\uff15";break;case 5:$steps[$i+1]+="\u9000\uff14";break;case 6:$steps[$i+1]+="\u9000\uff13";break;case 7:$steps[$i+1]+="\u9000\uff12";break;case 8:$steps[$i+1]+="\u9000\uff11";break;}}
else{switch($indexto%9){case 0:$steps[$i+1]+="\u9000\uff11";break;case 1:$steps[$i+1]+="\u9000\uff12";break;case 2:$steps[$i+1]+="\u9000\uff13";break;case 3:$steps[$i+1]+="\u9000\uff14";break;case 4:$steps[$i+1]+="\u9000\uff15";break;case 5:$steps[$i+1]+="\u9000\uff16";break;case 6:$steps[$i+1]+="\u9000\uff17";break;case 7:$steps[$i+1]+="\u9000\uff18";break;case 8:$steps[$i+1]+="\u9000\uff19";break;}}}
break;}
case"b":case"e":{if($mirror){switch($step_each[$i][0]+$step_each[$i][1]+$step_each[$i][2]+$step_each[$i][3]){case"a7c5":$steps[$i+1]="\u8c61\uff19\u8fdb\uff17";break;case"c5a7":$steps[$i+1]="\u8c61\uff17\u9000\uff19";break;case"a7c9":$steps[$i+1]="\u8c61\uff19\u9000\uff17";break;case"c9a7":$steps[$i+1]="\u8c61\uff17\u8fdb\uff19";break;case"e7c5":$steps[$i+1]="\u8c61\uff15\u8fdb\uff17";break;case"c5e7":$steps[$i+1]="\u8c61\uff17\u9000\uff15";break;case"e7c9":$steps[$i+1]="\u8c61\uff15\u9000\uff17";break;case"c9e7":$steps[$i+1]="\u8c61\uff17\u8fdb\uff15";break;case"e7g5":$steps[$i+1]="\u8c61\uff15\u8fdb\uff13";break;case"g5e7":$steps[$i+1]="\u8c61\uff13\u9000\uff15";break;case"e7g9":$steps[$i+1]="\u8c61\uff15\u9000\uff13";break;case"g9e7":$steps[$i+1]="\u8c61\uff13\u8fdb\uff15";break;case"i7g5":$steps[$i+1]="\u8c61\uff11\u8fdb\uff13";break;case"g5i7":$steps[$i+1]="\u8c61\uff13\u9000\uff11";break;case"i7g9":$steps[$i+1]="\u8c61\uff11\u9000\uff13";break;case"g9i7":$steps[$i+1]="\u8c61\uff13\u8fdb\uff11";break;}}
else{switch($step_each[$i][0]+$step_each[$i][1]+$step_each[$i][2]+$step_each[$i][3]){case"a7c5":$steps[$i+1]="\u8c61\uff11\u8fdb\uff13";break;case"c5a7":$steps[$i+1]="\u8c61\uff13\u9000\uff11";break;case"a7c9":$steps[$i+1]="\u8c61\uff11\u9000\uff13";break;case"c9a7":$steps[$i+1]="\u8c61\uff13\u8fdb\uff11";break;case"e7c5":$steps[$i+1]="\u8c61\uff15\u8fdb\uff13";break;case"c5e7":$steps[$i+1]="\u8c61\uff13\u9000\uff15";break;case"e7c9":$steps[$i+1]="\u8c61\uff15\u9000\uff13";break;case"c9e7":$steps[$i+1]="\u8c61\uff13\u8fdb\uff15";break;case"e7g5":$steps[$i+1]="\u8c61\uff15\u8fdb\uff17";break;case"g5e7":$steps[$i+1]="\u8c61\uff17\u9000\uff15";break;case"e7g9":$steps[$i+1]="\u8c61\uff15\u9000\uff17";break;case"g9e7":$steps[$i+1]="\u8c61\uff17\u8fdb\uff15";break;case"i7g5":$steps[$i+1]="\u8c61\uff19\u8fdb\uff17";break;case"g5i7":$steps[$i+1]="\u8c61\uff17\u9000\uff19";break;case"i7g9":$steps[$i+1]="\u8c61\uff19\u9000\uff17";break;case"g9i7":$steps[$i+1]="\u8c61\uff17\u8fdb\uff19";break;}}
break;}
case"a":{if($mirror){switch($step_each[$i][0]+$step_each[$i][1]+$step_each[$i][2]+$step_each[$i][3]){case"e8d7":$steps[$i+1]="\u58eb\uff15\u8fdb\uff16";break;case"d7e8":$steps[$i+1]="\u58eb\uff16\u9000\uff15";break;case"e8d9":$steps[$i+1]="\u58eb\uff15\u9000\uff16";break;case"d9e8":$steps[$i+1]="\u58eb\uff16\u8fdb\uff15";break;case"e8f7":$steps[$i+1]="\u58eb\uff15\u8fdb\uff14";break;case"f7e8":$steps[$i+1]="\u58eb\uff14\u9000\uff15";break;case"e8f9":$steps[$i+1]="\u58eb\uff15\u9000\uff14";break;case"f9e8":$steps[$i+1]="\u58eb\uff14\u8fdb\uff15";break;}}
else{switch($step_each[$i][0]+$step_each[$i][1]+$step_each[$i][2]+$step_each[$i][3]){case"e8d7":$steps[$i+1]="\u58eb\uff15\u8fdb\uff14";break;case"d7e8":$steps[$i+1]="\u58eb\uff14\u9000\uff15";break;case"e8d9":$steps[$i+1]="\u58eb\uff15\u9000\uff14";break;case"d9e8":$steps[$i+1]="\u58eb\uff14\u8fdb\uff15";break;case"e8f7":$steps[$i+1]="\u58eb\uff15\u8fdb\uff16";break;case"f7e8":$steps[$i+1]="\u58eb\uff16\u9000\uff15";break;case"e8f9":$steps[$i+1]="\u58eb\uff15\u9000\uff16";break;case"f9e8":$steps[$i+1]="\u58eb\uff16\u8fdb\uff15";break;}}
break;}
case"p":{$specialsoldiernum=0;for($j=0;$j<90;++$j){$specialsoldier[$j]="*";}
for($j=81;$j<90;++$j){$m=$j;if($mirror){$m=170-$j;}
$colsoldiernum=0;for($k=$m;$k>26;$k-=9){if($jumian[$k]=="p"){++$colsoldiernum;}}
if($colsoldiernum>1){for($k=$m;$k>26;$k-=9){if($jumian[$k]=="p"){switch(++$specialsoldiernum){case 1:$specialsoldier[$k]="\u4e00\u5352";break;case 2:$specialsoldier[$k]="\u4e8c\u5352";break;case 3:$specialsoldier[$k]="\u4e09\u5352";break;case 4:$specialsoldier[$k]="\u56db\u5352";break;case 5:$specialsoldier[$k]="\u4e94\u5352";break;}}}}}
if($specialsoldiernum==3){for($j=89;$j>26;--$j){switch($specialsoldier[$j]){case"\u4e00\u5352":$specialsoldier[$j]="\u524d\u5352";break;case"\u4e8c\u5352":$specialsoldier[$j]="\u4e2d\u5352";break;case"\u4e09\u5352":$specialsoldier[$j]="\u540e\u5352";break;}}}
else if($specialsoldiernum==2){for($j=89;$j>26;--$j){switch($specialsoldier[$j]){case"\u4e00\u5352":$specialsoldier[$j]="\u524d\u5352";break;case"\u4e8c\u5352":$specialsoldier[$j]="\u540e\u5352";break;}}}
if($specialsoldier[$indexfrom]=="*"){if($mirror){switch($step_each[$i][0]){case"a":$steps[$i+1]="\u5352\uff19";break;case"b":$steps[$i+1]="\u5352\uff18";break;case"c":$steps[$i+1]="\u5352\uff17";break;case"d":$steps[$i+1]="\u5352\uff16";break;case"e":$steps[$i+1]="\u5352\uff15";break;case"f":$steps[$i+1]="\u5352\uff14";break;case"g":$steps[$i+1]="\u5352\uff13";break;case"h":$steps[$i+1]="\u5352\uff12";break;case"i":$steps[$i+1]="\u5352\uff11";break;}}
else{switch($step_each[$i][0]){case"a":$steps[$i+1]="\u5352\uff11";break;case"b":$steps[$i+1]="\u5352\uff12";break;case"c":$steps[$i+1]="\u5352\uff13";break;case"d":$steps[$i+1]="\u5352\uff14";break;case"e":$steps[$i+1]="\u5352\uff15";break;case"f":$steps[$i+1]="\u5352\uff16";break;case"g":$steps[$i+1]="\u5352\uff17";break;case"h":$steps[$i+1]="\u5352\uff18";break;case"i":$steps[$i+1]="\u5352\uff19";break;}}}
else{$steps[$i+1]=$specialsoldier[$indexfrom];}
if($indexfrom-$indexto==-9){$steps[$i+1]+="\u8fdb\uff11";}
else{if($mirror){switch($indexto%9){case 0:$steps[$i+1]+="\u5e73\uff19";break;case 1:$steps[$i+1]+="\u5e73\uff18";break;case 2:$steps[$i+1]+="\u5e73\uff17";break;case 3:$steps[$i+1]+="\u5e73\uff16";break;case 4:$steps[$i+1]+="\u5e73\uff15";break;case 5:$steps[$i+1]+="\u5e73\uff14";break;case 6:$steps[$i+1]+="\u5e73\uff13";break;case 7:$steps[$i+1]+="\u5e73\uff12";break;case 8:$steps[$i+1]+="\u5e73\uff11";break;}}
else{switch($indexto%9){case 0:$steps[$i+1]+="\u5e73\uff11";break;case 1:$steps[$i+1]+="\u5e73\uff12";break;case 2:$steps[$i+1]+="\u5e73\uff13";break;case 3:$steps[$i+1]+="\u5e73\uff14";break;case 4:$steps[$i+1]+="\u5e73\uff15";break;case 5:$steps[$i+1]+="\u5e73\uff16";break;case 6:$steps[$i+1]+="\u5e73\uff17";break;case 7:$steps[$i+1]+="\u5e73\uff18";break;case 8:$steps[$i+1]+="\u5e73\uff19";break;}}}
break;}}}
else{switch($jumian[$indexfrom]){case"R":{$samecol=0;for($j=$indexfrom-9;$j>=0;$j-=9){if($jumian[$j]=="R"){$samecol=1;$steps[$i+1]="\u540e\u8f66";}}
for($j=$indexfrom+9;$j<90;$j+=9){if($jumian[$j]=="R"){$samecol=1;$steps[$i+1]="\u524d\u8f66";}}
if($samecol==0){if($mirror){switch($step_each[$i][0]){case"a":$steps[$i+1]="\u8f66\u4e00";break;case"b":$steps[$i+1]="\u8f66\u4e8c";break;case"c":$steps[$i+1]="\u8f66\u4e09";break;case"d":$steps[$i+1]="\u8f66\u56db";break;case"e":$steps[$i+1]="\u8f66\u4e94";break;case"f":$steps[$i+1]="\u8f66\u516d";break;case"g":$steps[$i+1]="\u8f66\u4e03";break;case"h":$steps[$i+1]="\u8f66\u516b";break;case"i":$steps[$i+1]="\u8f66\u4e5d";break;}}
else{switch($step_each[$i][0]){case"a":$steps[$i+1]="\u8f66\u4e5d";break;case"b":$steps[$i+1]="\u8f66\u516b";break;case"c":$steps[$i+1]="\u8f66\u4e03";break;case"d":$steps[$i+1]="\u8f66\u516d";break;case"e":$steps[$i+1]="\u8f66\u4e94";break;case"f":$steps[$i+1]="\u8f66\u56db";break;case"g":$steps[$i+1]="\u8f66\u4e09";break;case"h":$steps[$i+1]="\u8f66\u4e8c";break;case"i":$steps[$i+1]="\u8f66\u4e00";break;}}}
if(Math.abs($indexfrom-$indexto)<9){if($mirror){switch($indexto%9){case 0:$steps[$i+1]+="\u5e73\u4e00";break;case 1:$steps[$i+1]+="\u5e73\u4e8c";break;case 2:$steps[$i+1]+="\u5e73\u4e09";break;case 3:$steps[$i+1]+="\u5e73\u56db";break;case 4:$steps[$i+1]+="\u5e73\u4e94";break;case 5:$steps[$i+1]+="\u5e73\u516d";break;case 6:$steps[$i+1]+="\u5e73\u4e03";break;case 7:$steps[$i+1]+="\u5e73\u516b";break;case 8:$steps[$i+1]+="\u5e73\u4e5d";break;}}
else{switch($indexto%9){case 0:$steps[$i+1]+="\u5e73\u4e5d";break;case 1:$steps[$i+1]+="\u5e73\u516b";break;case 2:$steps[$i+1]+="\u5e73\u4e03";break;case 3:$steps[$i+1]+="\u5e73\u516d";break;case 4:$steps[$i+1]+="\u5e73\u4e94";break;case 5:$steps[$i+1]+="\u5e73\u56db";break;case 6:$steps[$i+1]+="\u5e73\u4e09";break;case 7:$steps[$i+1]+="\u5e73\u4e8c";break;case 8:$steps[$i+1]+="\u5e73\u4e00";break;}}}
else{switch(($indexfrom-$indexto)/9){case 1:$steps[$i+1]+="\u8fdb\u4e00";break;case 2:$steps[$i+1]+="\u8fdb\u4e8c";break;case 3:$steps[$i+1]+="\u8fdb\u4e09";break;case 4:$steps[$i+1]+="\u8fdb\u56db";break;case 5:$steps[$i+1]+="\u8fdb\u4e94";break;case 6:$steps[$i+1]+="\u8fdb\u516d";break;case 7:$steps[$i+1]+="\u8fdb\u4e03";break;case 8:$steps[$i+1]+="\u8fdb\u516b";break;case 9:$steps[$i+1]+="\u8fdb\u4e5d";break;case-1:$steps[$i+1]+="\u9000\u4e00";break;case-2:$steps[$i+1]+="\u9000\u4e8c";break;case-3:$steps[$i+1]+="\u9000\u4e09";break;case-4:$steps[$i+1]+="\u9000\u56db";break;case-5:$steps[$i+1]+="\u9000\u4e94";break;case-6:$steps[$i+1]+="\u9000\u516d";break;case-7:$steps[$i+1]+="\u9000\u4e03";break;case-8:$steps[$i+1]+="\u9000\u516b";break;case-9:$steps[$i+1]+="\u9000\u4e5d";break;}}
break;}
case"C":{$samecol=0;for($j=$indexfrom-9;$j>=0;$j-=9){if($jumian[$j]=="C"){$samecol=1;$steps[$i+1]="\u540e\u70ae";}}
for($j=$indexfrom+9;$j<90;$j+=9){if($jumian[$j]=="C"){$samecol=1;$steps[$i+1]="\u524d\u70ae";}}
if($samecol==0){if($mirror){switch($step_each[$i][0]){case"a":$steps[$i+1]="\u70ae\u4e00";break;case"b":$steps[$i+1]="\u70ae\u4e8c";break;case"c":$steps[$i+1]="\u70ae\u4e09";break;case"d":$steps[$i+1]="\u70ae\u56db";break;case"e":$steps[$i+1]="\u70ae\u4e94";break;case"f":$steps[$i+1]="\u70ae\u516d";break;case"g":$steps[$i+1]="\u70ae\u4e03";break;case"h":$steps[$i+1]="\u70ae\u516b";break;case"i":$steps[$i+1]="\u70ae\u4e5d";break;}}
else{switch($step_each[$i][0]){case"a":$steps[$i+1]="\u70ae\u4e5d";break;case"b":$steps[$i+1]="\u70ae\u516b";break;case"c":$steps[$i+1]="\u70ae\u4e03";break;case"d":$steps[$i+1]="\u70ae\u516d";break;case"e":$steps[$i+1]="\u70ae\u4e94";break;case"f":$steps[$i+1]="\u70ae\u56db";break;case"g":$steps[$i+1]="\u70ae\u4e09";break;case"h":$steps[$i+1]="\u70ae\u4e8c";break;case"i":$steps[$i+1]="\u70ae\u4e00";break;}}}
if(Math.abs($indexfrom-$indexto)<9){if($mirror){switch($indexto%9){case 0:$steps[$i+1]+="\u5e73\u4e00";break;case 1:$steps[$i+1]+="\u5e73\u4e8c";break;case 2:$steps[$i+1]+="\u5e73\u4e09";break;case 3:$steps[$i+1]+="\u5e73\u56db";break;case 4:$steps[$i+1]+="\u5e73\u4e94";break;case 5:$steps[$i+1]+="\u5e73\u516d";break;case 6:$steps[$i+1]+="\u5e73\u4e03";break;case 7:$steps[$i+1]+="\u5e73\u516b";break;case 8:$steps[$i+1]+="\u5e73\u4e5d";break;}}
else{switch($indexto%9){case 0:$steps[$i+1]+="\u5e73\u4e5d";break;case 1:$steps[$i+1]+="\u5e73\u516b";break;case 2:$steps[$i+1]+="\u5e73\u4e03";break;case 3:$steps[$i+1]+="\u5e73\u516d";break;case 4:$steps[$i+1]+="\u5e73\u4e94";break;case 5:$steps[$i+1]+="\u5e73\u56db";break;case 6:$steps[$i+1]+="\u5e73\u4e09";break;case 7:$steps[$i+1]+="\u5e73\u4e8c";break;case 8:$steps[$i+1]+="\u5e73\u4e00";break;}}}
else{switch(($indexfrom-$indexto)/9){case 1:$steps[$i+1]+="\u8fdb\u4e00";break;case 2:$steps[$i+1]+="\u8fdb\u4e8c";break;case 3:$steps[$i+1]+="\u8fdb\u4e09";break;case 4:$steps[$i+1]+="\u8fdb\u56db";break;case 5:$steps[$i+1]+="\u8fdb\u4e94";break;case 6:$steps[$i+1]+="\u8fdb\u516d";break;case 7:$steps[$i+1]+="\u8fdb\u4e03";break;case 8:$steps[$i+1]+="\u8fdb\u516b";break;case 9:$steps[$i+1]+="\u8fdb\u4e5d";break;case-1:$steps[$i+1]+="\u9000\u4e00";break;case-2:$steps[$i+1]+="\u9000\u4e8c";break;case-3:$steps[$i+1]+="\u9000\u4e09";break;case-4:$steps[$i+1]+="\u9000\u56db";break;case-5:$steps[$i+1]+="\u9000\u4e94";break;case-6:$steps[$i+1]+="\u9000\u516d";break;case-7:$steps[$i+1]+="\u9000\u4e03";break;case-8:$steps[$i+1]+="\u9000\u516b";break;case-9:$steps[$i+1]+="\u9000\u4e5d";break;}}
break;}
case"K":{if($mirror){switch($step_each[$i][0]){case"d":$steps[$i+1]="\u5e05\u56db";break;case"e":$steps[$i+1]="\u5e05\u4e94";break;case"f":$steps[$i+1]="\u5e05\u516d";break;}}
else{switch($step_each[$i][0]){case"d":$steps[$i+1]="\u5e05\u516d";break;case"e":$steps[$i+1]="\u5e05\u4e94";break;case"f":$steps[$i+1]="\u5e05\u56db";break;}}
switch($indexfrom-$indexto){case 9:$steps[$i+1]+="\u8fdb\u4e00";break;case 45:$steps[$i+1]+="\u8fdb\u4e94";break;case 54:$steps[$i+1]+="\u8fdb\u516d";break;case 63:$steps[$i+1]+="\u8fdb\u4e03";break;case 72:$steps[$i+1]+="\u8fdb\u516b";break;case 81:$steps[$i+1]+="\u8fdb\u4e5d";break;case-9:$steps[$i+1]+="\u9000\u4e00";break;default:{if($mirror){switch($indexto){case 66:case 75:case 84:$steps[$i+1]+="\u5e73\u56db";break;case 67:case 76:case 85:$steps[$i+1]+="\u5e73\u4e94";break;case 68:case 77:case 86:$steps[$i+1]+="\u5e73\u516d";break;}}
else{switch($indexto){case 66:case 75:case 84:$steps[$i+1]+="\u5e73\u516d";break;case 67:case 76:case 85:$steps[$i+1]+="\u5e73\u4e94";break;case 68:case 77:case 86:$steps[$i+1]+="\u5e73\u56db";break;}}
break;}}
break;}
case"N":case"H":{$samecol=0;for($j=$indexfrom-9;$j>=0;$j-=9){if($jumian[$j]=="N"||$jumian[$j]=="H"){$samecol=1;$steps[$i+1]="\u540e\u9a6c";}}
for($j=$indexfrom+9;$j<90;$j+=9){if($jumian[$j]=="N"||$jumian[$j]=="H"){$samecol=1;$steps[$i+1]="\u524d\u9a6c";}}
if($samecol==0){if($mirror){switch($step_each[$i][0]){case"a":$steps[$i+1]="\u9a6c\u4e00";break;case"b":$steps[$i+1]="\u9a6c\u4e8c";break;case"c":$steps[$i+1]="\u9a6c\u4e09";break;case"d":$steps[$i+1]="\u9a6c\u56db";break;case"e":$steps[$i+1]="\u9a6c\u4e94";break;case"f":$steps[$i+1]="\u9a6c\u516d";break;case"g":$steps[$i+1]="\u9a6c\u4e03";break;case"h":$steps[$i+1]="\u9a6c\u516b";break;case"i":$steps[$i+1]="\u9a6c\u4e5d";break;}}
else{switch($step_each[$i][0]){case"a":$steps[$i+1]="\u9a6c\u4e5d";break;case"b":$steps[$i+1]="\u9a6c\u516b";break;case"c":$steps[$i+1]="\u9a6c\u4e03";break;case"d":$steps[$i+1]="\u9a6c\u516d";break;case"e":$steps[$i+1]="\u9a6c\u4e94";break;case"f":$steps[$i+1]="\u9a6c\u56db";break;case"g":$steps[$i+1]="\u9a6c\u4e09";break;case"h":$steps[$i+1]="\u9a6c\u4e8c";break;case"i":$steps[$i+1]="\u9a6c\u4e00";break;}}}
if($indexfrom>$indexto){if($mirror){switch($indexto%9){case 0:$steps[$i+1]+="\u8fdb\u4e00";break;case 1:$steps[$i+1]+="\u8fdb\u4e8c";break;case 2:$steps[$i+1]+="\u8fdb\u4e09";break;case 3:$steps[$i+1]+="\u8fdb\u56db";break;case 4:$steps[$i+1]+="\u8fdb\u4e94";break;case 5:$steps[$i+1]+="\u8fdb\u516d";break;case 6:$steps[$i+1]+="\u8fdb\u4e03";break;case 7:$steps[$i+1]+="\u8fdb\u516b";break;case 8:$steps[$i+1]+="\u8fdb\u4e5d";break;}}
else{switch($indexto%9){case 0:$steps[$i+1]+="\u8fdb\u4e5d";break;case 1:$steps[$i+1]+="\u8fdb\u516b";break;case 2:$steps[$i+1]+="\u8fdb\u4e03";break;case 3:$steps[$i+1]+="\u8fdb\u516d";break;case 4:$steps[$i+1]+="\u8fdb\u4e94";break;case 5:$steps[$i+1]+="\u8fdb\u56db";break;case 6:$steps[$i+1]+="\u8fdb\u4e09";break;case 7:$steps[$i+1]+="\u8fdb\u4e8c";break;case 8:$steps[$i+1]+="\u8fdb\u4e00";break;}}}
else{if($mirror){switch($indexto%9){case 0:$steps[$i+1]+="\u9000\u4e00";break;case 1:$steps[$i+1]+="\u9000\u4e8c";break;case 2:$steps[$i+1]+="\u9000\u4e09";break;case 3:$steps[$i+1]+="\u9000\u56db";break;case 4:$steps[$i+1]+="\u9000\u4e94";break;case 5:$steps[$i+1]+="\u9000\u516d";break;case 6:$steps[$i+1]+="\u9000\u4e03";break;case 7:$steps[$i+1]+="\u9000\u516b";break;case 8:$steps[$i+1]+="\u9000\u4e5d";break;}}
else{switch($indexto%9){case 0:$steps[$i+1]+="\u9000\u4e5d";break;case 1:$steps[$i+1]+="\u9000\u516b";break;case 2:$steps[$i+1]+="\u9000\u4e03";break;case 3:$steps[$i+1]+="\u9000\u516d";break;case 4:$steps[$i+1]+="\u9000\u4e94";break;case 5:$steps[$i+1]+="\u9000\u56db";break;case 6:$steps[$i+1]+="\u9000\u4e09";break;case 7:$steps[$i+1]+="\u9000\u4e8c";break;case 8:$steps[$i+1]+="\u9000\u4e00";break;}}}
break;}
case"B":case"E":{if($mirror){switch($step_each[$i][0]+$step_each[$i][1]+$step_each[$i][2]+$step_each[$i][3]){case"i2g4":$steps[$i+1]="\u76f8\u4e5d\u8fdb\u4e03";break;case"g4i2":$steps[$i+1]="\u76f8\u4e03\u9000\u4e5d";break;case"i2g0":$steps[$i+1]="\u76f8\u4e5d\u9000\u4e03";break;case"g0i2":$steps[$i+1]="\u76f8\u4e03\u8fdb\u4e5d";break;case"e2g4":$steps[$i+1]="\u76f8\u4e94\u8fdb\u4e03";break;case"g4e2":$steps[$i+1]="\u76f8\u4e03\u9000\u4e94";break;case"e2g0":$steps[$i+1]="\u76f8\u4e94\u9000\u4e03";break;case"g0e2":$steps[$i+1]="\u76f8\u4e03\u8fdb\u4e94";break;case"e2c4":$steps[$i+1]="\u76f8\u4e94\u8fdb\u4e09";break;case"c4e2":$steps[$i+1]="\u76f8\u4e09\u9000\u4e94";break;case"e2c0":$steps[$i+1]="\u76f8\u4e94\u9000\u4e09";break;case"c0e2":$steps[$i+1]="\u76f8\u4e09\u8fdb\u4e94";break;case"a2c4":$steps[$i+1]="\u76f8\u4e00\u8fdb\u4e09";break;case"c4a2":$steps[$i+1]="\u76f8\u4e09\u9000\u4e00";break;case"a2c0":$steps[$i+1]="\u76f8\u4e00\u9000\u4e09";break;case"c0a2":$steps[$i+1]="\u76f8\u4e09\u8fdb\u4e00";break;}}
else{switch($step_each[$i][0]+$step_each[$i][1]+$step_each[$i][2]+$step_each[$i][3]){case"i2g4":$steps[$i+1]="\u76f8\u4e00\u8fdb\u4e09";break;case"g4i2":$steps[$i+1]="\u76f8\u4e09\u9000\u4e00";break;case"i2g0":$steps[$i+1]="\u76f8\u4e00\u9000\u4e09";break;case"g0i2":$steps[$i+1]="\u76f8\u4e09\u8fdb\u4e00";break;case"e2g4":$steps[$i+1]="\u76f8\u4e94\u8fdb\u4e09";break;case"g4e2":$steps[$i+1]="\u76f8\u4e09\u9000\u4e94";break;case"e2g0":$steps[$i+1]="\u76f8\u4e94\u9000\u4e09";break;case"g0e2":$steps[$i+1]="\u76f8\u4e09\u8fdb\u4e94";break;case"e2c4":$steps[$i+1]="\u76f8\u4e94\u8fdb\u4e03";break;case"c4e2":$steps[$i+1]="\u76f8\u4e03\u9000\u4e94";break;case"e2c0":$steps[$i+1]="\u76f8\u4e94\u9000\u4e03";break;case"c0e2":$steps[$i+1]="\u76f8\u4e03\u8fdb\u4e94";break;case"a2c4":$steps[$i+1]="\u76f8\u4e5d\u8fdb\u4e03";break;case"c4a2":$steps[$i+1]="\u76f8\u4e03\u9000\u4e5d";break;case"a2c0":$steps[$i+1]="\u76f8\u4e5d\u9000\u4e03";break;case"c0a2":$steps[$i+1]="\u76f8\u4e03\u8fdb\u4e5d";break;}}
break;}
case"A":{if($mirror){switch($step_each[$i][0]+$step_each[$i][1]+$step_each[$i][2]+$step_each[$i][3]){case"e1f2":$steps[$i+1]="\u4ed5\u4e94\u8fdb\u516d";break;case"f2e1":$steps[$i+1]="\u4ed5\u516d\u9000\u4e94";break;case"e1f0":$steps[$i+1]="\u4ed5\u4e94\u9000\u516d";break;case"f0e1":$steps[$i+1]="\u4ed5\u516d\u8fdb\u4e94";break;case"e1d2":$steps[$i+1]="\u4ed5\u4e94\u8fdb\u56db";break;case"d2e1":$steps[$i+1]="\u4ed5\u56db\u9000\u4e94";break;case"e1d0":$steps[$i+1]="\u4ed5\u4e94\u9000\u56db";break;case"d0e1":$steps[$i+1]="\u4ed5\u56db\u8fdb\u4e94";break;}}
else{switch($step_each[$i][0]+$step_each[$i][1]+$step_each[$i][2]+$step_each[$i][3]){case"e1f2":$steps[$i+1]="\u4ed5\u4e94\u8fdb\u56db";break;case"f2e1":$steps[$i+1]="\u4ed5\u56db\u9000\u4e94";break;case"e1f0":$steps[$i+1]="\u4ed5\u4e94\u9000\u56db";break;case"f0e1":$steps[$i+1]="\u4ed5\u56db\u8fdb\u4e94";break;case"e1d2":$steps[$i+1]="\u4ed5\u4e94\u8fdb\u516d";break;case"d2e1":$steps[$i+1]="\u4ed5\u516d\u9000\u4e94";break;case"e1d0":$steps[$i+1]="\u4ed5\u4e94\u9000\u516d";break;case"d0e1":$steps[$i+1]="\u4ed5\u516d\u8fdb\u4e94";break;}}
break;}
case"P":{$specialsoldiernum=0;for($j=0;$j<63;++$j){$specialsoldier[$j]="*";}
for($j=8;$j>=0;--$j){$m=$j;if($mirror){$m=8-$j;}
$colsoldiernum=0;for($k=$m;$k<63;$k+=9){if($jumian[$k]=="P"){++$colsoldiernum;}}
if($colsoldiernum>1){for($k=$m;$k<63;$k+=9){if($jumian[$k]=="P"){switch(++$specialsoldiernum){case 1:$specialsoldier[$k]="\u4e00\u5175";break;case 2:$specialsoldier[$k]="\u4e8c\u5175";break;case 3:$specialsoldier[$k]="\u4e09\u5175";break;case 4:$specialsoldier[$k]="\u56db\u5175";break;case 5:$specialsoldier[$k]="\u4e94\u5175";break;}}}}}
if($specialsoldiernum==3){for($j=0;$j<63;++$j){switch($specialsoldier[$j]){case"\u4e00\u5175":$specialsoldier[$j]="\u524d\u5175";break;case"\u4e8c\u5175":$specialsoldier[$j]="\u4e2d\u5175";break;case"\u4e09\u5175":$specialsoldier[$j]="\u540e\u5175";break;}}}
else if($specialsoldiernum==2){for($j=0;$j<63;++$j){switch($specialsoldier[$j]){case"\u4e00\u5175":$specialsoldier[$j]="\u524d\u5175";break;case"\u4e8c\u5175":$specialsoldier[$j]="\u540e\u5175";break;}}}
if($specialsoldier[$indexfrom]=="*"){if($mirror){switch($step_each[$i][0]){case"a":$steps[$i+1]="\u5175\u4e00";break;case"b":$steps[$i+1]="\u5175\u4e8c";break;case"c":$steps[$i+1]="\u5175\u4e09";break;case"d":$steps[$i+1]="\u5175\u56db";break;case"e":$steps[$i+1]="\u5175\u4e94";break;case"f":$steps[$i+1]="\u5175\u516d";break;case"g":$steps[$i+1]="\u5175\u4e03";break;case"h":$steps[$i+1]="\u5175\u516b";break;case"i":$steps[$i+1]="\u5175\u4e5d";break;}}
else{switch($step_each[$i][0]){case"a":$steps[$i+1]="\u5175\u4e5d";break;case"b":$steps[$i+1]="\u5175\u516b";break;case"c":$steps[$i+1]="\u5175\u4e03";break;case"d":$steps[$i+1]="\u5175\u516d";break;case"e":$steps[$i+1]="\u5175\u4e94";break;case"f":$steps[$i+1]="\u5175\u56db";break;case"g":$steps[$i+1]="\u5175\u4e09";break;case"h":$steps[$i+1]="\u5175\u4e8c";break;case"i":$steps[$i+1]="\u5175\u4e00";break;}}}
else{$steps[$i+1]=$specialsoldier[$indexfrom];}
if($indexfrom-$indexto==9){$steps[$i+1]+="\u8fdb\u4e00";}
else{if($mirror){switch($indexto%9){case 0:$steps[$i+1]+="\u5e73\u4e00";break;case 1:$steps[$i+1]+="\u5e73\u4e8c";break;case 2:$steps[$i+1]+="\u5e73\u4e09";break;case 3:$steps[$i+1]+="\u5e73\u56db";break;case 4:$steps[$i+1]+="\u5e73\u4e94";break;case 5:$steps[$i+1]+="\u5e73\u516d";break;case 6:$steps[$i+1]+="\u5e73\u4e03";break;case 7:$steps[$i+1]+="\u5e73\u516b";break;case 8:$steps[$i+1]+="\u5e73\u4e5d";break;}}
else{switch($indexto%9){case 0:$steps[$i+1]+="\u5e73\u4e5d";break;case 1:$steps[$i+1]+="\u5e73\u516b";break;case 2:$steps[$i+1]+="\u5e73\u4e03";break;case 3:$steps[$i+1]+="\u5e73\u516d";break;case 4:$steps[$i+1]+="\u5e73\u4e94";break;case 5:$steps[$i+1]+="\u5e73\u56db";break;case 6:$steps[$i+1]+="\u5e73\u4e09";break;case 7:$steps[$i+1]+="\u5e73\u4e8c";break;case 8:$steps[$i+1]+="\u5e73\u4e00";break;}}}
break;}}}
$jumian[$indexto]=$jumian[$indexfrom];$jumian[$indexfrom]="*";}}
return $steps;};vschess.wxfsteps=function($str){var $mirror=arguments[1]?true:false;var $steps=[],$step_each=[],$specialsoldier=[];var $colindex=0,$indexfrom=0,$indexto=0,$colsoldiernum=0,$specialsoldiernum=0;var $samecol=0,$i=0,$j=0,$k=0,$m=0;var $format=$str.split(",");$steps[0]=$format[0];if($format){var $fen=$format[0];var $temp=$fen.split(" ");var $beginplayer=$temp[1];var $beginround=parseInt($temp[5][0]);var $currentplayer=$temp[1];var $currentround=parseInt($temp[5][0]);var $jumian=$temp[0].replace(/1/g,"*").replace(/2/g,"**").replace(/3/g,"***").replace(/4/g,"****").replace(/5/g,"*****").replace(/6/g,"******").replace(/7/g,"*******").replace(/8/g,"********").replace(/9/g,"*********").replace(/\//g,"").split("");for($i=0;$i<$format.length-1;++$i){$step_each[$i]=$format[$i+1].split("");switch($step_each[$i][0]){case"a":$colindex=0;break;case"b":$colindex=1;break;case"c":$colindex=2;break;case"d":$colindex=3;break;case"e":$colindex=4;break;case"f":$colindex=5;break;case"g":$colindex=6;break;case"h":$colindex=7;break;case"i":$colindex=8;break;}
$indexfrom=(9-parseInt($step_each[$i][1]))*9+$colindex;switch($step_each[$i][2]){case"a":$colindex=0;break;case"b":$colindex=1;break;case"c":$colindex=2;break;case"d":$colindex=3;break;case"e":$colindex=4;break;case"f":$colindex=5;break;case"g":$colindex=6;break;case"h":$colindex=7;break;case"i":$colindex=8;break;}
$indexto=(9-parseInt($step_each[$i][3]))*9+$colindex;if($beginplayer=="b"!=$i%2){switch($jumian[$indexfrom]){case"r":{$samecol=0;for($j=$indexfrom-9;$j>=0;$j-=9){if($jumian[$j]=="r"){$samecol=1;$steps[$i+1]="R+";}}
for($j=$indexfrom+9;$j<90;$j+=9){if($jumian[$j]=="r"){$samecol=1;$steps[$i+1]="R-";}}
if($samecol==0){if($mirror){switch($step_each[$i][0]){case"a":$steps[$i+1]="R9";break;case"b":$steps[$i+1]="R8";break;case"c":$steps[$i+1]="R7";break;case"d":$steps[$i+1]="R6";break;case"e":$steps[$i+1]="R5";break;case"f":$steps[$i+1]="R4";break;case"g":$steps[$i+1]="R3";break;case"h":$steps[$i+1]="R2";break;case"i":$steps[$i+1]="R1";break;}}
else{switch($step_each[$i][0]){case"a":$steps[$i+1]="R1";break;case"b":$steps[$i+1]="R2";break;case"c":$steps[$i+1]="R3";break;case"d":$steps[$i+1]="R4";break;case"e":$steps[$i+1]="R5";break;case"f":$steps[$i+1]="R6";break;case"g":$steps[$i+1]="R7";break;case"h":$steps[$i+1]="R8";break;case"i":$steps[$i+1]="R9";break;}}}
if(Math.abs($indexfrom-$indexto)<9){if($mirror){switch($indexto%9){case 0:$steps[$i+1]+=".9";break;case 1:$steps[$i+1]+=".8";break;case 2:$steps[$i+1]+=".7";break;case 3:$steps[$i+1]+=".6";break;case 4:$steps[$i+1]+=".5";break;case 5:$steps[$i+1]+=".4";break;case 6:$steps[$i+1]+=".3";break;case 7:$steps[$i+1]+=".2";break;case 8:$steps[$i+1]+=".1";break;}}
else{switch($indexto%9){case 0:$steps[$i+1]+=".1";break;case 1:$steps[$i+1]+=".2";break;case 2:$steps[$i+1]+=".3";break;case 3:$steps[$i+1]+=".4";break;case 4:$steps[$i+1]+=".5";break;case 5:$steps[$i+1]+=".6";break;case 6:$steps[$i+1]+=".7";break;case 7:$steps[$i+1]+=".8";break;case 8:$steps[$i+1]+=".9";break;}}}
else{switch(($indexfrom-$indexto)/9){case-1:$steps[$i+1]+="+1";break;case-2:$steps[$i+1]+="+2";break;case-3:$steps[$i+1]+="+3";break;case-4:$steps[$i+1]+="+4";break;case-5:$steps[$i+1]+="+5";break;case-6:$steps[$i+1]+="+6";break;case-7:$steps[$i+1]+="+7";break;case-8:$steps[$i+1]+="+8";break;case-9:$steps[$i+1]+="+9";break;case 1:$steps[$i+1]+="-1";break;case 2:$steps[$i+1]+="-2";break;case 3:$steps[$i+1]+="-3";break;case 4:$steps[$i+1]+="-4";break;case 5:$steps[$i+1]+="-5";break;case 6:$steps[$i+1]+="-6";break;case 7:$steps[$i+1]+="-7";break;case 8:$steps[$i+1]+="-8";break;case 9:$steps[$i+1]+="-9";break;}}
break;}
case"c":{$samecol=0;for($j=$indexfrom-9;$j>=0;$j-=9){if($jumian[$j]=="c"){$samecol=1;$steps[$i+1]="C+";}}
for($j=$indexfrom+9;$j<90;$j+=9){if($jumian[$j]=="c"){$samecol=1;$steps[$i+1]="C-";}}
if($samecol==0){if($mirror){switch($step_each[$i][0]){case"a":$steps[$i+1]="C9";break;case"b":$steps[$i+1]="C8";break;case"c":$steps[$i+1]="C7";break;case"d":$steps[$i+1]="C6";break;case"e":$steps[$i+1]="C5";break;case"f":$steps[$i+1]="C4";break;case"g":$steps[$i+1]="C3";break;case"h":$steps[$i+1]="C2";break;case"i":$steps[$i+1]="C1";break;}}
else{switch($step_each[$i][0]){case"a":$steps[$i+1]="C1";break;case"b":$steps[$i+1]="C2";break;case"c":$steps[$i+1]="C3";break;case"d":$steps[$i+1]="C4";break;case"e":$steps[$i+1]="C5";break;case"f":$steps[$i+1]="C6";break;case"g":$steps[$i+1]="C7";break;case"h":$steps[$i+1]="C8";break;case"i":$steps[$i+1]="C9";break;}}}
if(Math.abs($indexfrom-$indexto)<9){if($mirror){switch($indexto%9){case 0:$steps[$i+1]+=".9";break;case 1:$steps[$i+1]+=".8";break;case 2:$steps[$i+1]+=".7";break;case 3:$steps[$i+1]+=".6";break;case 4:$steps[$i+1]+=".5";break;case 5:$steps[$i+1]+=".4";break;case 6:$steps[$i+1]+=".3";break;case 7:$steps[$i+1]+=".2";break;case 8:$steps[$i+1]+=".1";break;}}
else{switch($indexto%9){case 0:$steps[$i+1]+=".1";break;case 1:$steps[$i+1]+=".2";break;case 2:$steps[$i+1]+=".3";break;case 3:$steps[$i+1]+=".4";break;case 4:$steps[$i+1]+=".5";break;case 5:$steps[$i+1]+=".6";break;case 6:$steps[$i+1]+=".7";break;case 7:$steps[$i+1]+=".8";break;case 8:$steps[$i+1]+=".9";break;}}}
else{switch(($indexfrom-$indexto)/9){case-1:$steps[$i+1]+="+1";break;case-2:$steps[$i+1]+="+2";break;case-3:$steps[$i+1]+="+3";break;case-4:$steps[$i+1]+="+4";break;case-5:$steps[$i+1]+="+5";break;case-6:$steps[$i+1]+="+6";break;case-7:$steps[$i+1]+="+7";break;case-8:$steps[$i+1]+="+8";break;case-9:$steps[$i+1]+="+9";break;case 1:$steps[$i+1]+="-1";break;case 2:$steps[$i+1]+="-2";break;case 3:$steps[$i+1]+="-3";break;case 4:$steps[$i+1]+="-4";break;case 5:$steps[$i+1]+="-5";break;case 6:$steps[$i+1]+="-6";break;case 7:$steps[$i+1]+="-7";break;case 8:$steps[$i+1]+="-8";break;case 9:$steps[$i+1]+="-9";break;}}
break;}
case"k":{if($mirror){switch($step_each[$i][0]){case"d":$steps[$i+1]="K6";break;case"e":$steps[$i+1]="K5";break;case"f":$steps[$i+1]="K4";break;}}
else{switch($step_each[$i][0]){case"d":$steps[$i+1]="K4";break;case"e":$steps[$i+1]="K5";break;case"f":$steps[$i+1]="K6";break;}}
switch($indexfrom-$indexto){case-9:$steps[$i+1]+="+1";break;case-45:$steps[$i+1]+="+5";break;case-54:$steps[$i+1]+="+6";break;case-63:$steps[$i+1]+="+7";break;case-72:$steps[$i+1]+="+8";break;case-81:$steps[$i+1]+="+9";break;case 9:$steps[$i+1]+="-1";break;default:{if($mirror){switch($indexto){case 3:case 12:case 21:$steps[$i+1]+=".6";break;case 4:case 13:case 22:$steps[$i+1]+=".5";break;case 5:case 14:case 23:$steps[$i+1]+=".4";break;}}
else{switch($indexto){case 3:case 12:case 21:$steps[$i+1]+=".4";break;case 4:case 13:case 22:$steps[$i+1]+=".5";break;case 5:case 14:case 23:$steps[$i+1]+=".6";break;}}
break;}}
break;}
case"n":case"h":{$samecol=0;for($j=$indexfrom-9;$j>=0;$j-=9){if($jumian[$j]=="n"||$jumian[$j]=="h"){$samecol=1;$steps[$i+1]="N+";}}
for($j=$indexfrom+9;$j<90;$j+=9){if($jumian[$j]=="n"||$jumian[$j]=="h"){$samecol=1;$steps[$i+1]="N-";}}
if($samecol==0){if($mirror){switch($step_each[$i][0]){case"a":$steps[$i+1]="N9";break;case"b":$steps[$i+1]="N8";break;case"c":$steps[$i+1]="N7";break;case"d":$steps[$i+1]="N6";break;case"e":$steps[$i+1]="N5";break;case"f":$steps[$i+1]="N4";break;case"g":$steps[$i+1]="N3";break;case"h":$steps[$i+1]="N2";break;case"i":$steps[$i+1]="N1";break;}}
else{switch($step_each[$i][0]){case"a":$steps[$i+1]="N1";break;case"b":$steps[$i+1]="N2";break;case"c":$steps[$i+1]="N3";break;case"d":$steps[$i+1]="N4";break;case"e":$steps[$i+1]="N5";break;case"f":$steps[$i+1]="N6";break;case"g":$steps[$i+1]="N7";break;case"h":$steps[$i+1]="N8";break;case"i":$steps[$i+1]="N9";break;}}}
if($indexfrom<$indexto){if($mirror){switch($indexto%9){case 0:$steps[$i+1]+="+9";break;case 1:$steps[$i+1]+="+8";break;case 2:$steps[$i+1]+="+7";break;case 3:$steps[$i+1]+="+6";break;case 4:$steps[$i+1]+="+5";break;case 5:$steps[$i+1]+="+4";break;case 6:$steps[$i+1]+="+3";break;case 7:$steps[$i+1]+="+2";break;case 8:$steps[$i+1]+="+1";break;}}
else{switch($indexto%9){case 0:$steps[$i+1]+="+1";break;case 1:$steps[$i+1]+="+2";break;case 2:$steps[$i+1]+="+3";break;case 3:$steps[$i+1]+="+4";break;case 4:$steps[$i+1]+="+5";break;case 5:$steps[$i+1]+="+6";break;case 6:$steps[$i+1]+="+7";break;case 7:$steps[$i+1]+="+8";break;case 8:$steps[$i+1]+="+9";break;}}}
else{if($mirror){switch($indexto%9){case 0:$steps[$i+1]+="-9";break;case 1:$steps[$i+1]+="-8";break;case 2:$steps[$i+1]+="-7";break;case 3:$steps[$i+1]+="-6";break;case 4:$steps[$i+1]+="-5";break;case 5:$steps[$i+1]+="-4";break;case 6:$steps[$i+1]+="-3";break;case 7:$steps[$i+1]+="-2";break;case 8:$steps[$i+1]+="-1";break;}}
else{switch($indexto%9){case 0:$steps[$i+1]+="-1";break;case 1:$steps[$i+1]+="-2";break;case 2:$steps[$i+1]+="-3";break;case 3:$steps[$i+1]+="-4";break;case 4:$steps[$i+1]+="-5";break;case 5:$steps[$i+1]+="-6";break;case 6:$steps[$i+1]+="-7";break;case 7:$steps[$i+1]+="-8";break;case 8:$steps[$i+1]+="-9";break;}}}
break;}
case"b":case"e":{if($mirror){switch($step_each[$i][0]+$step_each[$i][1]+$step_each[$i][2]+$step_each[$i][3]){case"a7c5":$steps[$i+1]="B9+7";break;case"c5a7":$steps[$i+1]="B7-9";break;case"a7c9":$steps[$i+1]="B9-7";break;case"c9a7":$steps[$i+1]="B7+9";break;case"e7c5":$steps[$i+1]="B5+7";break;case"c5e7":$steps[$i+1]="B7-5";break;case"e7c9":$steps[$i+1]="B5-7";break;case"c9e7":$steps[$i+1]="B7+5";break;case"e7g5":$steps[$i+1]="B5+3";break;case"g5e7":$steps[$i+1]="B3-5";break;case"e7g9":$steps[$i+1]="B5-3";break;case"g9e7":$steps[$i+1]="B3+5";break;case"i7g5":$steps[$i+1]="B1+3";break;case"g5i7":$steps[$i+1]="B3-1";break;case"i7g9":$steps[$i+1]="B1-3";break;case"g9i7":$steps[$i+1]="B3+1";break;}}
else{switch($step_each[$i][0]+$step_each[$i][1]+$step_each[$i][2]+$step_each[$i][3]){case"a7c5":$steps[$i+1]="B1+3";break;case"c5a7":$steps[$i+1]="B3-1";break;case"a7c9":$steps[$i+1]="B1-3";break;case"c9a7":$steps[$i+1]="B3+1";break;case"e7c5":$steps[$i+1]="B5+3";break;case"c5e7":$steps[$i+1]="B3-5";break;case"e7c9":$steps[$i+1]="B5-3";break;case"c9e7":$steps[$i+1]="B3+5";break;case"e7g5":$steps[$i+1]="B5+7";break;case"g5e7":$steps[$i+1]="B7-5";break;case"e7g9":$steps[$i+1]="B5-7";break;case"g9e7":$steps[$i+1]="B7+5";break;case"i7g5":$steps[$i+1]="B9+7";break;case"g5i7":$steps[$i+1]="B7-9";break;case"i7g9":$steps[$i+1]="B9-7";break;case"g9i7":$steps[$i+1]="B7+9";break;}}
break;}
case"a":{if($mirror){switch($step_each[$i][0]+$step_each[$i][1]+$step_each[$i][2]+$step_each[$i][3]){case"e8d7":$steps[$i+1]="A5+6";break;case"d7e8":$steps[$i+1]="A6-5";break;case"e8d9":$steps[$i+1]="A5-6";break;case"d9e8":$steps[$i+1]="A6+5";break;case"e8f7":$steps[$i+1]="A5+4";break;case"f7e8":$steps[$i+1]="A4-5";break;case"e8f9":$steps[$i+1]="A5-4";break;case"f9e8":$steps[$i+1]="A4+5";break;}}
else{switch($step_each[$i][0]+$step_each[$i][1]+$step_each[$i][2]+$step_each[$i][3]){case"e8d7":$steps[$i+1]="A5+4";break;case"d7e8":$steps[$i+1]="A4-5";break;case"e8d9":$steps[$i+1]="A5-4";break;case"d9e8":$steps[$i+1]="A4+5";break;case"e8f7":$steps[$i+1]="A5+6";break;case"f7e8":$steps[$i+1]="A6-5";break;case"e8f9":$steps[$i+1]="A5-6";break;case"f9e8":$steps[$i+1]="A6+5";break;}}
break;}
case"p":{$specialsoldiernum=0;for($j=0;$j<90;++$j){$specialsoldier[$j]="*";}
for($j=81;$j<90;++$j){$m=$j;if($mirror){$m=170-$j;}
$colsoldiernum=0;for($k=$m;$k>26;$k-=9){if($jumian[$k]=="p"){++$colsoldiernum;}}
if($colsoldiernum>1){for($k=$m;$k>26;$k-=9){if($jumian[$k]=="p"){switch(++$specialsoldiernum){case 1:$specialsoldier[$k]="Pa";break;case 2:$specialsoldier[$k]="Pb";break;case 3:$specialsoldier[$k]="Pc";break;case 4:$specialsoldier[$k]="Pd";break;case 5:$specialsoldier[$k]="Pe";break;}}}}}
if($specialsoldiernum==3){for($j=89;$j>26;--$j){switch($specialsoldier[$j]){case"Pa":$specialsoldier[$j]="P+";break;case"Pb":$specialsoldier[$j]="P.";break;case"Pc":$specialsoldier[$j]="P-";break;}}}
else if($specialsoldiernum==2){for($j=89;$j>26;--$j){switch($specialsoldier[$j]){case"Pa":$specialsoldier[$j]="P+";break;case"Pb":$specialsoldier[$j]="P-";break;}}}
if($specialsoldier[$indexfrom]=="*"){if($mirror){switch($step_each[$i][0]){case"a":$steps[$i+1]="P9";break;case"b":$steps[$i+1]="P8";break;case"c":$steps[$i+1]="P7";break;case"d":$steps[$i+1]="P6";break;case"e":$steps[$i+1]="P5";break;case"f":$steps[$i+1]="P4";break;case"g":$steps[$i+1]="P3";break;case"h":$steps[$i+1]="P2";break;case"i":$steps[$i+1]="P1";break;}}
else{switch($step_each[$i][0]){case"a":$steps[$i+1]="P1";break;case"b":$steps[$i+1]="P2";break;case"c":$steps[$i+1]="P3";break;case"d":$steps[$i+1]="P4";break;case"e":$steps[$i+1]="P5";break;case"f":$steps[$i+1]="P6";break;case"g":$steps[$i+1]="P7";break;case"h":$steps[$i+1]="P8";break;case"i":$steps[$i+1]="P9";break;}}}
else{$steps[$i+1]=$specialsoldier[$indexfrom];}
if($indexfrom-$indexto==-9){$steps[$i+1]+="+1";}
else{if($mirror){switch($indexto%9){case 0:$steps[$i+1]+=".9";break;case 1:$steps[$i+1]+=".8";break;case 2:$steps[$i+1]+=".7";break;case 3:$steps[$i+1]+=".6";break;case 4:$steps[$i+1]+=".5";break;case 5:$steps[$i+1]+=".4";break;case 6:$steps[$i+1]+=".3";break;case 7:$steps[$i+1]+=".2";break;case 8:$steps[$i+1]+=".1";break;}}
else{switch($indexto%9){case 0:$steps[$i+1]+=".1";break;case 1:$steps[$i+1]+=".2";break;case 2:$steps[$i+1]+=".3";break;case 3:$steps[$i+1]+=".4";break;case 4:$steps[$i+1]+=".5";break;case 5:$steps[$i+1]+=".6";break;case 6:$steps[$i+1]+=".7";break;case 7:$steps[$i+1]+=".8";break;case 8:$steps[$i+1]+=".9";break;}}}
break;}}}
else{switch($jumian[$indexfrom]){case"R":{$samecol=0;for($j=$indexfrom-9;$j>=0;$j-=9){if($jumian[$j]=="R"){$samecol=1;$steps[$i+1]="R-";}}
for($j=$indexfrom+9;$j<90;$j+=9){if($jumian[$j]=="R"){$samecol=1;$steps[$i+1]="R+";}}
if($samecol==0){if($mirror){switch($step_each[$i][0]){case"a":$steps[$i+1]="R1";break;case"b":$steps[$i+1]="R2";break;case"c":$steps[$i+1]="R3";break;case"d":$steps[$i+1]="R4";break;case"e":$steps[$i+1]="R5";break;case"f":$steps[$i+1]="R6";break;case"g":$steps[$i+1]="R7";break;case"h":$steps[$i+1]="R8";break;case"i":$steps[$i+1]="R9";break;}}
else{switch($step_each[$i][0]){case"a":$steps[$i+1]="R9";break;case"b":$steps[$i+1]="R8";break;case"c":$steps[$i+1]="R7";break;case"d":$steps[$i+1]="R6";break;case"e":$steps[$i+1]="R5";break;case"f":$steps[$i+1]="R4";break;case"g":$steps[$i+1]="R3";break;case"h":$steps[$i+1]="R2";break;case"i":$steps[$i+1]="R1";break;}}}
if(Math.abs($indexfrom-$indexto)<9){if($mirror){switch($indexto%9){case 0:$steps[$i+1]+=".1";break;case 1:$steps[$i+1]+=".2";break;case 2:$steps[$i+1]+=".3";break;case 3:$steps[$i+1]+=".4";break;case 4:$steps[$i+1]+=".5";break;case 5:$steps[$i+1]+=".6";break;case 6:$steps[$i+1]+=".7";break;case 7:$steps[$i+1]+=".8";break;case 8:$steps[$i+1]+=".9";break;}}
else{switch($indexto%9){case 0:$steps[$i+1]+=".9";break;case 1:$steps[$i+1]+=".8";break;case 2:$steps[$i+1]+=".7";break;case 3:$steps[$i+1]+=".6";break;case 4:$steps[$i+1]+=".5";break;case 5:$steps[$i+1]+=".4";break;case 6:$steps[$i+1]+=".3";break;case 7:$steps[$i+1]+=".2";break;case 8:$steps[$i+1]+=".1";break;}}}
else{switch(($indexfrom-$indexto)/9){case 1:$steps[$i+1]+="+1";break;case 2:$steps[$i+1]+="+2";break;case 3:$steps[$i+1]+="+3";break;case 4:$steps[$i+1]+="+4";break;case 5:$steps[$i+1]+="+5";break;case 6:$steps[$i+1]+="+6";break;case 7:$steps[$i+1]+="+7";break;case 8:$steps[$i+1]+="+8";break;case 9:$steps[$i+1]+="+9";break;case-1:$steps[$i+1]+="-1";break;case-2:$steps[$i+1]+="-2";break;case-3:$steps[$i+1]+="-3";break;case-4:$steps[$i+1]+="-4";break;case-5:$steps[$i+1]+="-5";break;case-6:$steps[$i+1]+="-6";break;case-7:$steps[$i+1]+="-7";break;case-8:$steps[$i+1]+="-8";break;case-9:$steps[$i+1]+="-9";break;}}
break;}
case"C":{$samecol=0;for($j=$indexfrom-9;$j>=0;$j-=9){if($jumian[$j]=="C"){$samecol=1;$steps[$i+1]="C-";}}
for($j=$indexfrom+9;$j<90;$j+=9){if($jumian[$j]=="C"){$samecol=1;$steps[$i+1]="C+";}}
if($samecol==0){if($mirror){switch($step_each[$i][0]){case"a":$steps[$i+1]="C1";break;case"b":$steps[$i+1]="C2";break;case"c":$steps[$i+1]="C3";break;case"d":$steps[$i+1]="C4";break;case"e":$steps[$i+1]="C5";break;case"f":$steps[$i+1]="C6";break;case"g":$steps[$i+1]="C7";break;case"h":$steps[$i+1]="C8";break;case"i":$steps[$i+1]="C9";break;}}
else{switch($step_each[$i][0]){case"a":$steps[$i+1]="C9";break;case"b":$steps[$i+1]="C8";break;case"c":$steps[$i+1]="C7";break;case"d":$steps[$i+1]="C6";break;case"e":$steps[$i+1]="C5";break;case"f":$steps[$i+1]="C4";break;case"g":$steps[$i+1]="C3";break;case"h":$steps[$i+1]="C2";break;case"i":$steps[$i+1]="C1";break;}}}
if(Math.abs($indexfrom-$indexto)<9){if($mirror){switch($indexto%9){case 0:$steps[$i+1]+=".1";break;case 1:$steps[$i+1]+=".2";break;case 2:$steps[$i+1]+=".3";break;case 3:$steps[$i+1]+=".4";break;case 4:$steps[$i+1]+=".5";break;case 5:$steps[$i+1]+=".6";break;case 6:$steps[$i+1]+=".7";break;case 7:$steps[$i+1]+=".8";break;case 8:$steps[$i+1]+=".9";break;}}
else{switch($indexto%9){case 0:$steps[$i+1]+=".9";break;case 1:$steps[$i+1]+=".8";break;case 2:$steps[$i+1]+=".7";break;case 3:$steps[$i+1]+=".6";break;case 4:$steps[$i+1]+=".5";break;case 5:$steps[$i+1]+=".4";break;case 6:$steps[$i+1]+=".3";break;case 7:$steps[$i+1]+=".2";break;case 8:$steps[$i+1]+=".1";break;}}}
else{switch(($indexfrom-$indexto)/9){case 1:$steps[$i+1]+="+1";break;case 2:$steps[$i+1]+="+2";break;case 3:$steps[$i+1]+="+3";break;case 4:$steps[$i+1]+="+4";break;case 5:$steps[$i+1]+="+5";break;case 6:$steps[$i+1]+="+6";break;case 7:$steps[$i+1]+="+7";break;case 8:$steps[$i+1]+="+8";break;case 9:$steps[$i+1]+="+9";break;case-1:$steps[$i+1]+="-1";break;case-2:$steps[$i+1]+="-2";break;case-3:$steps[$i+1]+="-3";break;case-4:$steps[$i+1]+="-4";break;case-5:$steps[$i+1]+="-5";break;case-6:$steps[$i+1]+="-6";break;case-7:$steps[$i+1]+="-7";break;case-8:$steps[$i+1]+="-8";break;case-9:$steps[$i+1]+="-9";break;}}
break;}
case"K":{if($mirror){switch($step_each[$i][0]){case"d":$steps[$i+1]="K4";break;case"e":$steps[$i+1]="K5";break;case"f":$steps[$i+1]="K6";break;}}
else{switch($step_each[$i][0]){case"d":$steps[$i+1]="K6";break;case"e":$steps[$i+1]="K5";break;case"f":$steps[$i+1]="K4";break;}}
switch($indexfrom-$indexto){case 9:$steps[$i+1]+="+1";break;case 45:$steps[$i+1]+="+5";break;case 54:$steps[$i+1]+="+6";break;case 63:$steps[$i+1]+="+7";break;case 72:$steps[$i+1]+="+8";break;case 81:$steps[$i+1]+="+9";break;case-9:$steps[$i+1]+="-1";break;default:{if($mirror){switch($indexto){case 66:case 75:case 84:$steps[$i+1]+=".4";break;case 67:case 76:case 85:$steps[$i+1]+=".5";break;case 68:case 77:case 86:$steps[$i+1]+=".6";break;}}
else{switch($indexto){case 66:case 75:case 84:$steps[$i+1]+=".6";break;case 67:case 76:case 85:$steps[$i+1]+=".5";break;case 68:case 77:case 86:$steps[$i+1]+=".4";break;}}
break;}}
break;}
case"N":case"H":{$samecol=0;for($j=$indexfrom-9;$j>=0;$j-=9){if($jumian[$j]=="N"||$jumian[$j]=="H"){$samecol=1;$steps[$i+1]="N-";}}
for($j=$indexfrom+9;$j<90;$j+=9){if($jumian[$j]=="N"||$jumian[$j]=="H"){$samecol=1;$steps[$i+1]="N+";}}
if($samecol==0){if($mirror){switch($step_each[$i][0]){case"a":$steps[$i+1]="N1";break;case"b":$steps[$i+1]="N2";break;case"c":$steps[$i+1]="N3";break;case"d":$steps[$i+1]="N4";break;case"e":$steps[$i+1]="N5";break;case"f":$steps[$i+1]="N6";break;case"g":$steps[$i+1]="N7";break;case"h":$steps[$i+1]="N8";break;case"i":$steps[$i+1]="N9";break;}}
else{switch($step_each[$i][0]){case"a":$steps[$i+1]="N9";break;case"b":$steps[$i+1]="N8";break;case"c":$steps[$i+1]="N7";break;case"d":$steps[$i+1]="N6";break;case"e":$steps[$i+1]="N5";break;case"f":$steps[$i+1]="N4";break;case"g":$steps[$i+1]="N3";break;case"h":$steps[$i+1]="N2";break;case"i":$steps[$i+1]="N1";break;}}}
if($indexfrom>$indexto){if($mirror){switch($indexto%9){case 0:$steps[$i+1]+="+1";break;case 1:$steps[$i+1]+="+2";break;case 2:$steps[$i+1]+="+3";break;case 3:$steps[$i+1]+="+4";break;case 4:$steps[$i+1]+="+5";break;case 5:$steps[$i+1]+="+6";break;case 6:$steps[$i+1]+="+7";break;case 7:$steps[$i+1]+="+8";break;case 8:$steps[$i+1]+="+9";break;}}
else{switch($indexto%9){case 0:$steps[$i+1]+="+9";break;case 1:$steps[$i+1]+="+8";break;case 2:$steps[$i+1]+="+7";break;case 3:$steps[$i+1]+="+6";break;case 4:$steps[$i+1]+="+5";break;case 5:$steps[$i+1]+="+4";break;case 6:$steps[$i+1]+="+3";break;case 7:$steps[$i+1]+="+2";break;case 8:$steps[$i+1]+="+1";break;}}}
else{if($mirror){switch($indexto%9){case 0:$steps[$i+1]+="-1";break;case 1:$steps[$i+1]+="-2";break;case 2:$steps[$i+1]+="-3";break;case 3:$steps[$i+1]+="-4";break;case 4:$steps[$i+1]+="-5";break;case 5:$steps[$i+1]+="-6";break;case 6:$steps[$i+1]+="-7";break;case 7:$steps[$i+1]+="-8";break;case 8:$steps[$i+1]+="-9";break;}}
else{switch($indexto%9){case 0:$steps[$i+1]+="-9";break;case 1:$steps[$i+1]+="-8";break;case 2:$steps[$i+1]+="-7";break;case 3:$steps[$i+1]+="-6";break;case 4:$steps[$i+1]+="-5";break;case 5:$steps[$i+1]+="-4";break;case 6:$steps[$i+1]+="-3";break;case 7:$steps[$i+1]+="-2";break;case 8:$steps[$i+1]+="-1";break;}}}
break;}
case"B":case"E":{if($mirror){switch($step_each[$i][0]+$step_each[$i][1]+$step_each[$i][2]+$step_each[$i][3]){case"i2g4":$steps[$i+1]="B9+7";break;case"g4i2":$steps[$i+1]="B7-9";break;case"i2g0":$steps[$i+1]="B9-7";break;case"g0i2":$steps[$i+1]="B7+9";break;case"e2g4":$steps[$i+1]="B5+7";break;case"g4e2":$steps[$i+1]="B7-5";break;case"e2g0":$steps[$i+1]="B5-7";break;case"g0e2":$steps[$i+1]="B7+5";break;case"e2c4":$steps[$i+1]="B5+3";break;case"c4e2":$steps[$i+1]="B3-5";break;case"e2c0":$steps[$i+1]="B5-3";break;case"c0e2":$steps[$i+1]="B3+5";break;case"a2c4":$steps[$i+1]="B1+3";break;case"c4a2":$steps[$i+1]="B3-1";break;case"a2c0":$steps[$i+1]="B1-3";break;case"c0a2":$steps[$i+1]="B3+1";break;}}
else{switch($step_each[$i][0]+$step_each[$i][1]+$step_each[$i][2]+$step_each[$i][3]){case"i2g4":$steps[$i+1]="B1+3";break;case"g4i2":$steps[$i+1]="B3-1";break;case"i2g0":$steps[$i+1]="B1-3";break;case"g0i2":$steps[$i+1]="B3+1";break;case"e2g4":$steps[$i+1]="B5+3";break;case"g4e2":$steps[$i+1]="B3-5";break;case"e2g0":$steps[$i+1]="B5-3";break;case"g0e2":$steps[$i+1]="B3+5";break;case"e2c4":$steps[$i+1]="B5+7";break;case"c4e2":$steps[$i+1]="B7-5";break;case"e2c0":$steps[$i+1]="B5-7";break;case"c0e2":$steps[$i+1]="B7+5";break;case"a2c4":$steps[$i+1]="B9+7";break;case"c4a2":$steps[$i+1]="B7-9";break;case"a2c0":$steps[$i+1]="B9-7";break;case"c0a2":$steps[$i+1]="B7+9";break;}}
break;}
case"A":{if($mirror){switch($step_each[$i][0]+$step_each[$i][1]+$step_each[$i][2]+$step_each[$i][3]){case"e1f2":$steps[$i+1]="A5+6";break;case"f2e1":$steps[$i+1]="A6-5";break;case"e1f0":$steps[$i+1]="A5-6";break;case"f0e1":$steps[$i+1]="A6+5";break;case"e1d2":$steps[$i+1]="A5+4";break;case"d2e1":$steps[$i+1]="A4-5";break;case"e1d0":$steps[$i+1]="A5-4";break;case"d0e1":$steps[$i+1]="A4+5";break;}}
else{switch($step_each[$i][0]+$step_each[$i][1]+$step_each[$i][2]+$step_each[$i][3]){case"e1f2":$steps[$i+1]="A5+4";break;case"f2e1":$steps[$i+1]="A4-5";break;case"e1f0":$steps[$i+1]="A5-4";break;case"f0e1":$steps[$i+1]="A4+5";break;case"e1d2":$steps[$i+1]="A5+6";break;case"d2e1":$steps[$i+1]="A6-5";break;case"e1d0":$steps[$i+1]="A5-6";break;case"d0e1":$steps[$i+1]="A6+5";break;}}
break;}
case"P":{$specialsoldiernum=0;for($j=0;$j<63;++$j){$specialsoldier[$j]="*";}
for($j=8;$j>=0;--$j){$m=$j;if($mirror){$m=8-$j;}
$colsoldiernum=0;for($k=$m;$k<63;$k+=9){if($jumian[$k]=="P"){++$colsoldiernum;}}
if($colsoldiernum>1){for($k=$m;$k<63;$k+=9){if($jumian[$k]=="P"){switch(++$specialsoldiernum){case 1:$specialsoldier[$k]="Pa";break;case 2:$specialsoldier[$k]="Pb";break;case 3:$specialsoldier[$k]="Pc";break;case 4:$specialsoldier[$k]="Pd";break;case 5:$specialsoldier[$k]="Pe";break;}}}}}
if($specialsoldiernum==3){for($j=0;$j<63;++$j){switch($specialsoldier[$j]){case"Pa":$specialsoldier[$j]="P+";break;case"Pb":$specialsoldier[$j]="P.";break;case"Pc":$specialsoldier[$j]="P-";break;}}}
else if($specialsoldiernum==2){for($j=0;$j<63;++$j){switch($specialsoldier[$j]){case"Pa":$specialsoldier[$j]="P+";break;case"Pb":$specialsoldier[$j]="P-";break;}}}
if($specialsoldier[$indexfrom]=="*"){if($mirror){switch($step_each[$i][0]){case"a":$steps[$i+1]="P1";break;case"b":$steps[$i+1]="P2";break;case"c":$steps[$i+1]="P3";break;case"d":$steps[$i+1]="P4";break;case"e":$steps[$i+1]="P5";break;case"f":$steps[$i+1]="P6";break;case"g":$steps[$i+1]="P7";break;case"h":$steps[$i+1]="P8";break;case"i":$steps[$i+1]="P9";break;}}
else{switch($step_each[$i][0]){case"a":$steps[$i+1]="P9";break;case"b":$steps[$i+1]="P8";break;case"c":$steps[$i+1]="P7";break;case"d":$steps[$i+1]="P6";break;case"e":$steps[$i+1]="P5";break;case"f":$steps[$i+1]="P4";break;case"g":$steps[$i+1]="P3";break;case"h":$steps[$i+1]="P2";break;case"i":$steps[$i+1]="P1";break;}}}
else{$steps[$i+1]=$specialsoldier[$indexfrom];}
if($indexfrom-$indexto==9){$steps[$i+1]+="+1";}
else{if($mirror){switch($indexto%9){case 0:$steps[$i+1]+=".1";break;case 1:$steps[$i+1]+=".2";break;case 2:$steps[$i+1]+=".3";break;case 3:$steps[$i+1]+=".4";break;case 4:$steps[$i+1]+=".5";break;case 5:$steps[$i+1]+=".6";break;case 6:$steps[$i+1]+=".7";break;case 7:$steps[$i+1]+=".8";break;case 8:$steps[$i+1]+=".9";break;}}
else{switch($indexto%9){case 0:$steps[$i+1]+=".9";break;case 1:$steps[$i+1]+=".8";break;case 2:$steps[$i+1]+=".7";break;case 3:$steps[$i+1]+=".6";break;case 4:$steps[$i+1]+=".5";break;case 5:$steps[$i+1]+=".4";break;case 6:$steps[$i+1]+=".3";break;case 7:$steps[$i+1]+=".2";break;case 8:$steps[$i+1]+=".1";break;}}}
break;}}}
$jumian[$indexto]=$jumian[$indexfrom];$jumian[$indexfrom]="*";}}
return $steps;};vschess.iccssteps=function($str){var $mirror=arguments[1]?true:false;var $format=$str.split(","),$temp;for(var $i=1;$i<$format.length;++$i){$temp=$format[$i].toUpperCase().split("");if($mirror){switch($temp[0]){case"A":$format[$i]="I";break;case"B":$format[$i]="H";break;case"C":$format[$i]="G";break;case"D":$format[$i]="F";break;case"E":$format[$i]="E";break;case"F":$format[$i]="D";break;case"G":$format[$i]="C";break;case"H":$format[$i]="B";break;case"I":$format[$i]="A";break;}
$format[$i]+=$temp[1]+"-";switch($temp[2]){case"A":$format[$i]+="I";break;case"B":$format[$i]+="H";break;case"C":$format[$i]+="G";break;case"D":$format[$i]+="F";break;case"E":$format[$i]+="E";break;case"F":$format[$i]+="D";break;case"G":$format[$i]+="C";break;case"H":$format[$i]+="B";break;case"I":$format[$i]+="A";break;}
$format[$i]+=$temp[3];}
else{$format[$i]=$temp[0]+$temp[1]+"-"+$temp[2]+$temp[3];}}
return $format;};vschess.checkthreat=function($jumian){var $i,$king,$cflag=0,$jumian,$player;$jumian=$jumian.clone();$player=arguments[1];var $left,$right,$top,$bottom;if($player=="b"){for($king=3;$king<24;++$king){if($jumian[$king]=="k"){$left=$king-$king%9;for($i=$king-1;$i>=$left;--$i){if($jumian[$i]!="*"&&$jumian[$i]!="R"){break;}
if($jumian[$i]=="R"){return true;}}
$right=$left+8;for($i=$king+1;$i<=$right;++$i){if($jumian[$i]!="*"&&$jumian[$i]!="R"){break;}
if($jumian[$i]=="R"){return true;}}
if($jumian[$king-9]=="R"||($jumian[$king-9]=="*"&&$jumian[$king-18]=="R")){return true;}
for($i=$king+9;$i<=87;$i+=9){if($jumian[$i]!="*"&&$jumian[$i]!="R"&&$jumian[$i]!="K"){break;}
if($jumian[$i]=="R"||$jumian[$i]=="K"){return true;}}
if($jumian[$king+10]=="*"&&($jumian[$king+11]=="N"||$jumian[$king+19]=="N")){return true;}
if($jumian[$king-10]=="*"&&($jumian[$king-11]=="N"||$jumian[$king-19]=="N")){return true;}
if($jumian[$king+8]=="*"&&($jumian[$king+7]=="N"||$jumian[$king+17]=="N")){return true;}
if($jumian[$king-8]=="*"&&($jumian[$king-7]=="N"||$jumian[$king-17]=="N")){return true;}
if($jumian[$king-9]!="*"&&$jumian[$king-18]=="C"){return true;}
$cflag=0;for($i=$king-1;$i>=$left;--$i){if($cflag==0&&$jumian[$i]!="*"){$cflag=1;continue;}
if($cflag==1&&$jumian[$i]!="*"&&$jumian[$i]!="C"){break;}
if($cflag==1&&$jumian[$i]=="C"){return true;}}
$cflag=0;for($i=$king+1;$i<=$right;++$i){if($cflag==0&&$jumian[$i]!="*"){$cflag=1;continue;}
if($cflag==1&&$jumian[$i]!="*"&&$jumian[$i]!="C"){break;}
if($cflag==1&&$jumian[$i]=="C"){return true;}}
$cflag=0;for($i=$king+9;$i<=87;$i+=9){if($cflag==0&&$jumian[$i]!="*"){$cflag=1;continue;}
if($cflag==1&&$jumian[$i]!="*"&&$jumian[$i]!="C"){break;}
if($cflag==1&&$jumian[$i]=="C"){return true;}}
if($jumian[$king-1]=="P"||$jumian[$king+1]=="P"||$jumian[$king+9]=="P"){return true;}}}}
else{for($king=86;$king>65;--$king){if($jumian[$king]=="K"){$left=$king-$king%9;for($i=$king-1;$i>=$left;--$i){if($jumian[$i]!="*"&&$jumian[$i]!="r"){break;}
if($jumian[$i]=="r"){return true;}}
$right=$left+8;for($i=$king+1;$i<=$right;++$i){if($jumian[$i]!="*"&&$jumian[$i]!="r"){break;}
if($jumian[$i]=="r"){return true;}}
if($jumian[$king+9]=="r"||($jumian[$king+9]=="*"&&$jumian[$king+18]=="r")){return true;}
for($i=$king-9;$i>2;$i-=9){if($jumian[$i]!="*"&&$jumian[$i]!="r"&&$jumian[$i]!="k"){break;}
if($jumian[$i]=="r"||$jumian[$i]=="k"){return true;}}
if($jumian[$king+10]=="*"&&($jumian[$king+11]=="n"||$jumian[$king+19]=="n")){return true;}
if($jumian[$king-10]=="*"&&($jumian[$king-11]=="n"||$jumian[$king-19]=="n")){return true;}
if($jumian[$king+8]=="*"&&($jumian[$king+7]=="n"||$jumian[$king+17]=="n")){return true;}
if($jumian[$king-8]=="*"&&($jumian[$king-7]=="n"||$jumian[$king-17]=="n")){return true;}
if($jumian[$king+9]!="*"&&$jumian[$king+18]=="c"){return true;}
$cflag=0;for($i=$king-1;$i>=$left;--$i){if($cflag==0&&$jumian[$i]!="*"){$cflag=1;continue;}
if($cflag==1&&$jumian[$i]!="*"&&$jumian[$i]!="c"){break;}
if($cflag==1&&$jumian[$i]=="c"){return true;}}
$cflag=0;for($i=$king+1;$i<=$right;++$i){if($cflag==0&&$jumian[$i]!="*"){$cflag=1;continue;}
if($cflag==1&&$jumian[$i]!="*"&&$jumian[$i]!="c"){break;}
if($cflag==1&&$jumian[$i]=="c"){return true;}}
$cflag=0;for($i=$king-9;$i>2;$i-=9){if($cflag==0&&$jumian[$i]!="*"){$cflag=1;continue;}
if($cflag==1&&$jumian[$i]!="*"&&$jumian[$i]!="c"){break;}
if($cflag==1&&$jumian[$i]=="c"){return true;}}
if($jumian[$king-1]=="p"||$jumian[$king+1]=="p"||$jumian[$king-9]=="p"){return true;}}}}
return false;};vschess.checklose=function($jumian){var $i,$j,$k,$left,$right,$top,$bottom,$temp,$cflag,$jumian,$player,$originaljumian;$originaljumian=$jumian.clone();$player=arguments[1];if($player=="b"){var $ismine=function($m){if($originaljumian[$m]=="*"||$originaljumian[$m].toUpperCase()==$originaljumian[$m]){return false;}
return true;};for($i=0;$i<90;++$i){if(!$ismine($i)){continue;}
$left=$i-$i%9;$right=$left+8;switch($originaljumian[$i]){case"r":{for($j=$i-1;$j>=$left;--$j){if($ismine($j)){break;}
$jumian=$originaljumian.clone();$jumian[$i]="*";$jumian[$j]="r";if(!vschess.checkthreat($jumian,"b")){return false;}
if($originaljumian[$j]!="*"){break;}}
for($j=$i+1;$j<=$right;++$j){if($ismine($j)){break;}
$jumian=$originaljumian.clone();$jumian[$i]="*";$jumian[$j]="r";if(!vschess.checkthreat($jumian,"b")){return false;}
if($originaljumian[$j]!="*"){break;}}
for($j=$i-9;$j>=0;$j-=9){if($ismine($j)){break;}
$jumian=$originaljumian.clone();$jumian[$i]="*";$jumian[$j]="r";if(!vschess.checkthreat($jumian,"b")){return false;}
if($originaljumian[$j]!="*"){break;}}
for($j=$i+9;$j<90;$j+=9){if($ismine($j)){break;}
$jumian=$originaljumian.clone();$jumian[$i]="*";$jumian[$j]="r";if(!vschess.checkthreat($jumian,"b")){return false;}
if($originaljumian[$j]!="*"){break;}}
break;}
case"n":{if($i%9>1){if($originaljumian[$i-1]=="*"){if($i>10&&!$ismine($i-11)){$jumian=$originaljumian.clone();$jumian[$i]="*";$jumian[$i-11]="n";if(!vschess.checkthreat($jumian,"b")){return false;}}
if($i<83&&!$ismine($i+7)){$jumian=$originaljumian.clone();$jumian[$i]="*";$jumian[$i+7]="n";if(!vschess.checkthreat($jumian,"b")){return false;}}}}
if($i%9<7){if($originaljumian[$i+1]=="*"){if($i>6&&!$ismine($i-7)){$jumian=$originaljumian.clone();$jumian[$i]="*";$jumian[$i-7]="n";if(!vschess.checkthreat($jumian,"b")){return false;}}
if($i<79&&!$ismine($i+11)){$jumian=$originaljumian.clone();$jumian[$i]="*";$jumian[$i+11]="n";if(!vschess.checkthreat($jumian,"b")){return false;}}}}
if($i>17){if($originaljumian[$i-9]=="*"){if($i%9>0&&!$ismine($i-19)){$jumian=$originaljumian.clone();$jumian[$i]="*";$jumian[$i-19]="n";if(!vschess.checkthreat($jumian,"b")){return false;}}
if($i%9<8&&!$ismine($i-17)){$jumian=$originaljumian.clone();$jumian[$i]="*";$jumian[$i-17]="n";if(!vschess.checkthreat($jumian,"b")){return false;}}}}
if($i<72){if($originaljumian[$i+9]=="*"){if($i%9>0&&!$ismine($i+17)){$jumian=$originaljumian.clone();$jumian[$i]="*";$jumian[$i+17]="n";if(!vschess.checkthreat($jumian,"b")){return false;}}
if($i%9<8&&!$ismine($i+19)){$jumian=$originaljumian.clone();$jumian[$i]="*";$jumian[$i+19]="n";if(!vschess.checkthreat($jumian,"b")){return false;}}}}
break;}
case"b":{switch($i){case 2:{if($originaljumian[10]=="*"&&!$ismine(18)){$jumian=$originaljumian.clone();$jumian[2]="*";$jumian[18]="b";if(!vschess.checkthreat($jumian,"b")){return false;}}
if($originaljumian[12]=="*"&&!$ismine(22)){$jumian=$originaljumian.clone();$jumian[2]="*";$jumian[22]="b";if(!vschess.checkthreat($jumian,"b")){return false;}}
break;}
case 6:{if($originaljumian[14]=="*"&&!$ismine(22)){$jumian=$originaljumian.clone();$jumian[6]="*";$jumian[22]="b";if(!vschess.checkthreat($jumian,"b")){return false;}}
if($originaljumian[16]=="*"&&!$ismine(26)){$jumian=$originaljumian.clone();$jumian[6]="*";$jumian[26]="b";if(!vschess.checkthreat($jumian,"b")){return false;}}
break;}
case 18:{if($originaljumian[10]=="*"&&!$ismine(2)){$jumian=$originaljumian.clone();$jumian[18]="*";$jumian[2]="b";if(!vschess.checkthreat($jumian,"b")){return false;}}
if($originaljumian[28]=="*"&&!$ismine(38)){$jumian=$originaljumian.clone();$jumian[18]="*";$jumian[38]="b";if(!vschess.checkthreat($jumian,"b")){return false;}}
break;}
case 22:{if($originaljumian[12]=="*"&&!$ismine(2)){$jumian=$originaljumian.clone();$jumian[22]="*";$jumian[2]="b";if(!vschess.checkthreat($jumian,"b")){return false;}}
if($originaljumian[14]=="*"&&!$ismine(6)){$jumian=$originaljumian.clone();$jumian[22]="*";$jumian[6]="b";if(!vschess.checkthreat($jumian,"b")){return false;}}
if($originaljumian[30]=="*"&&!$ismine(38)){$jumian=$originaljumian.clone();$jumian[22]="*";$jumian[38]="b";if(!vschess.checkthreat($jumian,"b")){return false;}}
if($originaljumian[32]=="*"&&!$ismine(42)){$jumian=$originaljumian.clone();$jumian[22]="*";$jumian[42]="b";if(!vschess.checkthreat($jumian,"b")){return false;}}
break;}
case 26:{if($originaljumian[16]=="*"&&!$ismine(6)){$jumian=$originaljumian.clone();$jumian[26]="*";$jumian[6]="b";if(!vschess.checkthreat($jumian,"b")){return false;}}
if($originaljumian[34]=="*"&&!$ismine(42)){$jumian=$originaljumian.clone();$jumian[26]="*";$jumian[42]="b";if(!vschess.checkthreat($jumian,"b")){return false;}}
break;}
case 38:{if($originaljumian[28]=="*"&&!$ismine(18)){$jumian=$originaljumian.clone();$jumian[38]="*";$jumian[18]="b";if(!vschess.checkthreat($jumian,"b")){return false;}}
if($originaljumian[30]=="*"&&!$ismine(22)){$jumian=$originaljumian.clone();$jumian[38]="*";$jumian[22]="b";if(!vschess.checkthreat($jumian,"b")){return false;}}
break;}
case 42:{if($originaljumian[32]=="*"&&!$ismine(22)){$jumian=$originaljumian.clone();$jumian[42]="*";$jumian[22]="b";if(!vschess.checkthreat($jumian,"b")){return false;}}
if($originaljumian[34]=="*"&&!$ismine(26)){$jumian=$originaljumian.clone();$jumian[42]="*";$jumian[26]="b";if(!vschess.checkthreat($jumian,"b")){return false;}}
break;}}
break;}
case"a":{switch($i){case 3:{if(!$ismine(13)){$jumian=$originaljumian.clone();$jumian[3]="*";$jumian[13]="a";if(!vschess.checkthreat($jumian,"b")){return false;}}
break;}
case 5:{if(!$ismine(13)){$jumian=$originaljumian.clone();$jumian[5]="*";$jumian[13]="a";if(!vschess.checkthreat($jumian,"b")){return false;}}
break;}
case 13:{if(!$ismine(3)){$jumian=$originaljumian.clone();$jumian[13]="*";$jumian[3]="a";if(!vschess.checkthreat($jumian,"b")){return false;}}
if(!$ismine(5)){$jumian=$originaljumian.clone();$jumian[13]="*";$jumian[5]="a";if(!vschess.checkthreat($jumian,"b")){return false;}}
if(!$ismine(21)){$jumian=$originaljumian.clone();$jumian[13]="*";$jumian[21]="a";if(!vschess.checkthreat($jumian,"b")){return false;}}
if(!$ismine(23)){$jumian=$originaljumian.clone();$jumian[13]="*";$jumian[23]="a";if(!vschess.checkthreat($jumian,"b")){return false;}}
break;}
case 21:{if(!$ismine(13)){$jumian=$originaljumian.clone();$jumian[21]="*";$jumian[13]="a";if(!vschess.checkthreat($jumian,"b")){return false;}}
break;}
case 23:{if(!$ismine(13)){$jumian=$originaljumian.clone();$jumian[23]="*";$jumian[13]="a";if(!vschess.checkthreat($jumian,"b")){return false;}}
break;}}
break;}
case"k":{if($i%9>3){if(!$ismine($i-1)){$jumian=$originaljumian.clone();$jumian[$i]="*";$jumian[$i-1]="k";if(!vschess.checkthreat($jumian,"b")){return false;}}}
if($i%9<5){if(!$ismine($i+1)){$jumian=$originaljumian.clone();$jumian[$i]="*";$jumian[$i+1]="k";if(!vschess.checkthreat($jumian,"b")){return false;}}}
if($i>11){if(!$ismine($i-9)){$jumian=$originaljumian.clone();$jumian[$i]="*";$jumian[$i-9]="k";if(!vschess.checkthreat($jumian,"b")){return false;}}}
if($i<15){if(!$ismine($i+9)){$jumian=$originaljumian.clone();$jumian[$i]="*";$jumian[$i+9]="k";if(!vschess.checkthreat($jumian,"b")){return false;}}}
break;}
case"c":{$cflag=0;for($j=$i-1;$j>=$left;--$j){if($cflag==0){if($originaljumian[$j]!="*"){$cflag=1;continue;}
else{$jumian=$originaljumian.clone();$jumian[$i]="*";$jumian[$j]="c";if(!vschess.checkthreat($jumian,"b")){return false;}}}
else{if($originaljumian[$j]=="*"){continue;}
if(!$ismine($j)){$jumian=$originaljumian.clone();$jumian[$i]="*";$jumian[$j]="c";if(!vschess.checkthreat($jumian,"b")){return false;}}
break;}}
$cflag=0;for($j=$i+1;$j<=$right;++$j){if($cflag==0){if($originaljumian[$j]!="*"){$cflag=1;continue;}
else{$jumian=$originaljumian.clone();$jumian[$i]="*";$jumian[$j]="c";if(!vschess.checkthreat($jumian,"b")){return false;}}}
else{if($originaljumian[$j]=="*"){continue;}
if(!$ismine($j)){$jumian=$originaljumian.clone();$jumian[$i]="*";$jumian[$j]="c";if(!vschess.checkthreat($jumian,"b")){return false;}}
break;}}
$cflag=0;for($j=$i-9;$j>=0;$j-=9){if($cflag==0){if($originaljumian[$j]!="*"){$cflag=1;continue;}
else{$jumian=$originaljumian.clone();$jumian[$i]="*";$jumian[$j]="c";if(!vschess.checkthreat($jumian,"b")){return false;}}}
else{if($originaljumian[$j]=="*"){continue;}
if(!$ismine($j)){$jumian=$originaljumian.clone();$jumian[$i]="*";$jumian[$j]="c";if(!vschess.checkthreat($jumian,"b")){return false;}}
break;}}
$cflag=0;for($j=$i+9;$j<90;$j+=9){if($cflag==0){if($originaljumian[$j]!="*"){$cflag=1;continue;}
else{$jumian=$originaljumian.clone();$jumian[$i]="*";$jumian[$j]="c";if(!vschess.checkthreat($jumian,"b")){return false;}}}
else{if($originaljumian[$j]=="*"){continue;}
if(!$ismine($j)){$jumian=$originaljumian.clone();$jumian[$i]="*";$jumian[$j]="c";if(!vschess.checkthreat($jumian,"b")){return false;}}
break;}}
break;}
case"p":{if($i<45){if(!$ismine($i+9)){$jumian=$originaljumian.clone();$jumian[$i]="*";$jumian[$i+9]="p";if(!vschess.checkthreat($jumian,"b")){return false;}}}
else{if($i%9>0){if(!$ismine($i-1)){$jumian=$originaljumian.clone();$jumian[$i]="*";$jumian[$i-1]="p";if(!vschess.checkthreat($jumian,"b")){return false;}}}
if($i%9<8){if(!$ismine($i+1)){$jumian=$originaljumian.clone();$jumian[$i]="*";$jumian[$i+1]="p";if(!vschess.checkthreat($jumian,"b")){return false;}}}
if($i<81){if(!$ismine($i+9)){$jumian=$originaljumian.clone();$jumian[$i]="*";$jumian[$i+9]="p";if(!vschess.checkthreat($jumian,"b")){return false;}}}}}}}}
else{var $ismine=function($m){if($originaljumian[$m]=="*"||$originaljumian[$m].toLowerCase()==$originaljumian[$m]){return false;}
return true;};for($i=0;$i<90;++$i){if(!$ismine($i)){continue;}
$left=$i-$i%9;$right=$left+8;switch($originaljumian[$i]){case"R":{for($j=$i-1;$j>=$left;--$j){if($ismine($j)){break;}
$jumian=$originaljumian.clone();$jumian[$i]="*";$jumian[$j]="R";if(!vschess.checkthreat($jumian,"w")){return false;}
if($originaljumian[$j]!="*"){break;}}
for($j=$i+1;$j<=$right;++$j){if($ismine($j)){break;}
$jumian=$originaljumian.clone();$jumian[$i]="*";$jumian[$j]="R";if(!vschess.checkthreat($jumian,"w")){return false;}
if($originaljumian[$j]!="*"){break;}}
for($j=$i-9;$j>=0;$j-=9){if($ismine($j)){break;}
$jumian=$originaljumian.clone();$jumian[$i]="*";$jumian[$j]="R";if(!vschess.checkthreat($jumian,"w")){return false;}
if($originaljumian[$j]!="*"){break;}}
for($j=$i+9;$j<90;$j+=9){if($ismine($j)){break;}
$jumian=$originaljumian.clone();$jumian[$i]="*";$jumian[$j]="R";if(!vschess.checkthreat($jumian,"w")){return false;}
if($originaljumian[$j]!="*"){break;}}
break;}
case"N":{if($i%9>1){if($originaljumian[$i-1]=="*"){if($i>10&&!$ismine($i-11)){$jumian=$originaljumian.clone();$jumian[$i]="*";$jumian[$i-11]="N";if(!vschess.checkthreat($jumian,"w")){return false;}}
if($i<83&&!$ismine($i+7)){$jumian=$originaljumian.clone();$jumian[$i]="*";$jumian[$i+7]="N";if(!vschess.checkthreat($jumian,"w")){return false;}}}}
if($i%9<7){if($originaljumian[$i+1]=="*"){if($i>6&&!$ismine($i-7)){$jumian=$originaljumian.clone();$jumian[$i]="*";$jumian[$i-7]="N";if(!vschess.checkthreat($jumian,"w")){return false;}}
if($i<79&&!$ismine($i+11)){$jumian=$originaljumian.clone();$jumian[$i]="*";$jumian[$i+11]="N";if(!vschess.checkthreat($jumian,"w")){return false;}}}}
if($i>17){if($originaljumian[$i-9]=="*"){if($i%9>0&&!$ismine($i-19)){$jumian=$originaljumian.clone();$jumian[$i]="*";$jumian[$i-19]="N";if(!vschess.checkthreat($jumian,"w")){return false;}}
if($i%9<8&&!$ismine($i-17)){$jumian=$originaljumian.clone();$jumian[$i]="*";$jumian[$i-17]="N";if(!vschess.checkthreat($jumian,"w")){return false;}}}}
if($i<72){if($originaljumian[$i+9]=="*"){if($i%9>0&&!$ismine($i+17)){$jumian=$originaljumian.clone();$jumian[$i]="*";$jumian[$i+17]="N";if(!vschess.checkthreat($jumian,"w")){return false;}}
if($i%9<8&&!$ismine($i+19)){$jumian=$originaljumian.clone();$jumian[$i]="*";$jumian[$i+19]="N";if(!vschess.checkthreat($jumian,"w")){return false;}}}}
break;}
case"B":{switch($i){case 47:{if($originaljumian[55]=="*"&&!$ismine(63)){$jumian=$originaljumian.clone();$jumian[47]="*";$jumian[63]="B";if(!vschess.checkthreat($jumian,"w")){return false;}}
if($originaljumian[57]=="*"&&!$ismine(67)){$jumian=$originaljumian.clone();$jumian[47]="*";$jumian[67]="B";if(!vschess.checkthreat($jumian,"w")){return false;}}
break;}
case 51:{if($originaljumian[59]=="*"&&!$ismine(67)){$jumian=$originaljumian.clone();$jumian[51]="*";$jumian[67]="B";if(!vschess.checkthreat($jumian,"w")){return false;}}
if($originaljumian[61]=="*"&&!$ismine(71)){$jumian=$originaljumian.clone();$jumian[51]="*";$jumian[71]="B";if(!vschess.checkthreat($jumian,"w")){return false;}}
break;}
case 63:{if($originaljumian[55]=="*"&&!$ismine(47)){$jumian=$originaljumian.clone();$jumian[63]="*";$jumian[47]="B";if(!vschess.checkthreat($jumian,"w")){return false;}}
if($originaljumian[73]=="*"&&!$ismine(83)){$jumian=$originaljumian.clone();$jumian[63]="*";$jumian[83]="B";if(!vschess.checkthreat($jumian,"w")){return false;}}
break;}
case 67:{if($originaljumian[57]=="*"&&!$ismine(47)){$jumian=$originaljumian.clone();$jumian[67]="*";$jumian[47]="B";if(!vschess.checkthreat($jumian,"w")){return false;}}
if($originaljumian[59]=="*"&&!$ismine(51)){$jumian=$originaljumian.clone();$jumian[67]="*";$jumian[51]="B";if(!vschess.checkthreat($jumian,"w")){return false;}}
if($originaljumian[75]=="*"&&!$ismine(83)){$jumian=$originaljumian.clone();$jumian[67]="*";$jumian[83]="B";if(!vschess.checkthreat($jumian,"w")){return false;}}
if($originaljumian[77]=="*"&&!$ismine(87)){$jumian=$originaljumian.clone();$jumian[67]="*";$jumian[87]="B";if(!vschess.checkthreat($jumian,"w")){return false;}}
break;}
case 71:{if($originaljumian[61]=="*"&&!$ismine(51)){$jumian=$originaljumian.clone();$jumian[71]="*";$jumian[51]="B";if(!vschess.checkthreat($jumian,"w")){return false;}}
if($originaljumian[79]=="*"&&!$ismine(87)){$jumian=$originaljumian.clone();$jumian[71]="*";$jumian[87]="B";if(!vschess.checkthreat($jumian,"w")){return false;}}
break;}
case 83:{if($originaljumian[73]=="*"&&!$ismine(63)){$jumian=$originaljumian.clone();$jumian[83]="*";$jumian[63]="B";if(!vschess.checkthreat($jumian,"w")){return false;}}
if($originaljumian[75]=="*"&&!$ismine(67)){$jumian=$originaljumian.clone();$jumian[83]="*";$jumian[67]="B";if(!vschess.checkthreat($jumian,"w")){return false;}}
break;}
case 87:{if($originaljumian[77]=="*"&&!$ismine(67)){$jumian=$originaljumian.clone();$jumian[87]="*";$jumian[67]="B";if(!vschess.checkthreat($jumian,"w")){return false;}}
if($originaljumian[79]=="*"&&!$ismine(71)){$jumian=$originaljumian.clone();$jumian[87]="*";$jumian[71]="B";if(!vschess.checkthreat($jumian,"w")){return false;}}
break;}}
break;}
case"A":{switch($i){case 66:{if(!$ismine(76)){$jumian=$originaljumian.clone();$jumian[66]="*";$jumian[76]="A";if(!vschess.checkthreat($jumian,"w")){return false;}}
break;}
case 68:{if(!$ismine(76)){$jumian=$originaljumian.clone();$jumian[68]="*";$jumian[76]="A";if(!vschess.checkthreat($jumian,"w")){return false;}}
break;}
case 76:{if(!$ismine(66)){$jumian=$originaljumian.clone();$jumian[76]="*";$jumian[66]="A";if(!vschess.checkthreat($jumian,"w")){return false;}}
if(!$ismine(68)){$jumian=$originaljumian.clone();$jumian[76]="*";$jumian[68]="A";if(!vschess.checkthreat($jumian,"w")){return false;}}
if(!$ismine(84)){$jumian=$originaljumian.clone();$jumian[76]="*";$jumian[84]="A";if(!vschess.checkthreat($jumian,"w")){return false;}}
if(!$ismine(86)){$jumian=$originaljumian.clone();$jumian[76]="*";$jumian[86]="A";if(!vschess.checkthreat($jumian,"w")){return false;}}
break;}
case 84:{if(!$ismine(76)){$jumian=$originaljumian.clone();$jumian[84]="*";$jumian[76]="A";if(!vschess.checkthreat($jumian,"w")){return false;}}
break;}
case 86:{if(!$ismine(76)){$jumian=$originaljumian.clone();$jumian[86]="*";$jumian[76]="A";if(!vschess.checkthreat($jumian,"w")){return false;}}
break;}}
break;}
case"K":{if($i%9>3){if(!$ismine($i-1)){$jumian=$originaljumian.clone();$jumian[$i]="*";$jumian[$i-1]="K";if(!vschess.checkthreat($jumian,"w")){return false;}}}
if($i%9<5){if(!$ismine($i+1)){$jumian=$originaljumian.clone();$jumian[$i]="*";$jumian[$i+1]="K";if(!vschess.checkthreat($jumian,"w")){return false;}}}
if($i>74){if(!$ismine($i-9)){$jumian=$originaljumian.clone();$jumian[$i]="*";$jumian[$i-9]="K";if(!vschess.checkthreat($jumian,"w")){return false;}}}
if($i<78){if(!$ismine($i+9)){$jumian=$originaljumian.clone();$jumian[$i]="*";$jumian[$i+9]="K";if(!vschess.checkthreat($jumian,"w")){return false;}}}
break;}
case"C":{$cflag=0;for($j=$i-1;$j>=$left;--$j){if($cflag==0){if($originaljumian[$j]!="*"){$cflag=1;continue;}
else{$jumian=$originaljumian.clone();$jumian[$i]="*";$jumian[$j]="C";if(!vschess.checkthreat($jumian,"w")){return false;}}}
else{if($originaljumian[$j]=="*"){continue;}
if(!$ismine($j)){$jumian=$originaljumian.clone();$jumian[$i]="*";$jumian[$j]="C";if(!vschess.checkthreat($jumian,"w")){return false;}}
break;}}
$cflag=0;for($j=$i+1;$j<=$right;++$j){if($cflag==0){if($originaljumian[$j]!="*"){$cflag=1;continue;}
else{$jumian=$originaljumian.clone();$jumian[$i]="*";$jumian[$j]="C";if(!vschess.checkthreat($jumian,"w")){return false;}}}
else{if($originaljumian[$j]=="*"){continue;}
if(!$ismine($j)){$jumian=$originaljumian.clone();$jumian[$i]="*";$jumian[$j]="C";if(!vschess.checkthreat($jumian,"w")){return false;}}
break;}}
$cflag=0;for($j=$i-9;$j>=0;$j-=9){if($cflag==0){if($originaljumian[$j]!="*"){$cflag=1;continue;}
else{$jumian=$originaljumian.clone();$jumian[$i]="*";$jumian[$j]="C";if(!vschess.checkthreat($jumian,"w")){return false;}}}
else{if($originaljumian[$j]=="*"){continue;}
if(!$ismine($j)){$jumian=$originaljumian.clone();$jumian[$i]="*";$jumian[$j]="C";if(!vschess.checkthreat($jumian,"w")){return false;}}
break;}}
$cflag=0;for($j=$i+9;$j<90;$j+=9){if($cflag==0){if($originaljumian[$j]!="*"){$cflag=1;continue;}
else{$jumian=$originaljumian.clone();$jumian[$i]="*";$jumian[$j]="C";if(!vschess.checkthreat($jumian,"w")){return false;}}}
else{if($originaljumian[$j]=="*"){continue;}
if(!$ismine($j)){$jumian=$originaljumian.clone();$jumian[$i]="*";$jumian[$j]="C";if(!vschess.checkthreat($jumian,"w")){return false;}}
break;}}
break;}
case"P":{if($i>44){if(!$ismine($i-9)){$jumian=$originaljumian.clone();$jumian[$i]="*";$jumian[$i-9]="P";if(!vschess.checkthreat($jumian,"w")){return false;}}}
else{if($i%9>0){if(!$ismine($i-1)){$jumian=$originaljumian.clone();$jumian[$i]="*";$jumian[$i-1]="P";if(!vschess.checkthreat($jumian,"w")){return false;}}}
if($i%9<8){if(!$ismine($i+1)){$jumian=$originaljumian.clone();$jumian[$i]="*";$jumian[$i+1]="P";if(!vschess.checkthreat($jumian,"w")){return false;}}}
if($i>8){if(!$ismine($i-9)){$jumian=$originaljumian.clone();$jumian[$i]="*";$jumian[$i-9]="P";if(!vschess.checkthreat($jumian,"w")){return false;}}}}}}}}
return true;};vschess.convertstep=function($step,$uid,$sid){var $format=vschess.format[$uid];if($format=="iccs"){var $fen=vschess.api.id($uid).eachfen($sid);if(vschess.turn[$uid]<2){var $iccs=vschess.iccssteps($fen+","+$step);}
else{var $iccs=vschess.iccssteps($fen+","+$step,true);}
return $iccs[1];}
else if($format=="wxf"){var $fen=vschess.api.id($uid).eachfen($sid);if(vschess.turn[$uid]<2){var $wxf=vschess.wxfsteps($fen+","+$step);}
else{var $wxf=vschess.wxfsteps($fen+","+$step,true);}
return $wxf[1];}
else{var $fen=vschess.api.id($uid).eachfen($sid);if(vschess.turn[$uid]<2){var $chinese=vschess.chinesesteps($fen+","+$step);}
else{var $chinese=vschess.chinesesteps($fen+","+$step,true);}
return $chinese[1];}};vschess.init=function(){var $i=0;if($("#vschess_message").length==0){vschess.pics={board:vschess.picpath+"board.png",rr:vschess.picpath+vschess.chessmanstyle+"/rr.png",rn:vschess.picpath+vschess.chessmanstyle+"/rn.png",rb:vschess.picpath+vschess.chessmanstyle+"/rb.png",ra:vschess.picpath+vschess.chessmanstyle+"/ra.png",rk:vschess.picpath+vschess.chessmanstyle+"/rk.png",rc:vschess.picpath+vschess.chessmanstyle+"/rc.png",rp:vschess.picpath+vschess.chessmanstyle+"/rp.png",br:vschess.picpath+vschess.chessmanstyle+"/br.png",bn:vschess.picpath+vschess.chessmanstyle+"/bn.png",bb:vschess.picpath+vschess.chessmanstyle+"/bb.png",ba:vschess.picpath+vschess.chessmanstyle+"/ba.png",bk:vschess.picpath+vschess.chessmanstyle+"/bk.png",bc:vschess.picpath+vschess.chessmanstyle+"/bc.png",bp:vschess.picpath+vschess.chessmanstyle+"/bp.png",no:vschess.picpath+vschess.chessmanstyle+"/no.png",nos:vschess.picpath+vschess.chessmanstyle+"/nos.png",nor:vschess.picpath+vschess.chessmanstyle+"/nor.png"};vschess.style=(function(){var $array=[];$array.push(".vschess_loaded{");$array.push("background-image:url("+vschess.pics.board+");");$array.push("background-repeat:no-repeat;");$array.push("background-position:0px 0px;");$array.push("display:block;");$array.push("width:549px;");$array.push("height:433px;");$array.push("position:relative;");$array.push("padding:8px 0px 0px 9px;");$array.push("}");$array.push(".vschess_loaded *,");$array.push("#vschess_message *,");$array.push("#vschess_file *,");$array.push("#vschess_message,");$array.push("#vschess_file{");$array.push("margin:0px;");$array.push("padding:0px;");$array.push("font-size:10pt;");$array.push("}");$array.push(".vschess_loaded ul,");$array.push(".vschess_loaded li{");$array.push("list-style:none !important;");$array.push("}");$array.push(".vschess_loaded div.vschess_info{");$array.push("display:block;");$array.push("width:185px;");$array.push("margin-top:-8px;");$array.push("float:right;");$array.push("}");$array.push(".vschess_loaded div.vschess_config{");$array.push("display:none;");$array.push("position:absolute;");$array.push("top:206px;");$array.push("left:379px;");$array.push("z-index:1000;");$array.push("overflow:hidden;");$array.push("padding:10px;");$array.push("background-color:#FFF;");$array.push("line-height:20px;");$array.push("width:159px;");$array.push("height:190px;");$array.push("overflow-y:scroll;");$array.push("}");$array.push(".vschess_loaded ul.steps{");$array.push("display:block;");$array.push("float:right;");$array.push("padding:2px 0px 2px 8px;");$array.push("width:173px;");$array.push("height:200px;");$array.push("overflow-x:hidden;");$array.push("overflow-y:scroll;");$array.push("border-top:solid 1px #ACD4C0;");$array.push("}");$array.push(".vschess_loaded ul.steps li.start{");$array.push("display:block;");$array.push("float:left;");$array.push("width:150px;");$array.push("height:20px;");$array.push("text-align:center;");$array.push("cursor:pointer;");$array.push("font-size:10px;");$array.push("}");$array.push(".vschess_loaded ul.steps li.stepnum{");$array.push("display:block;");$array.push("float:left;");$array.push("width:30px;");$array.push("height:20px;");$array.push("line-height:20px !important;");$array.push("text-align:left;");$array.push("margin-left:3px");$array.push("font-size:10px;");$array.push("}");$array.push(".vschess_loaded ul.steps li.step{");$array.push("display:block;");$array.push("float:left;");$array.push("width:60px;");$array.push("height:20px;");$array.push("line-height:20px !important;");$array.push("text-align:center;");$array.push("cursor:pointer;");$array.push("font-size:10px;");$array.push("}");$array.push(".vschess_loaded div.vschess_comment{");$array.push("display:block;");$array.push("position:relative;");$array.push("float:right;");$array.push("width:179px;");$array.push("height:212px;");$array.push("border:none;");$array.push("}");$array.push(".vschess_loaded textarea.vschess_comment{");$array.push("font-size:10px;");$array.push("display:block;");$array.push("padding:5px;");$array.push("width:169px;");$array.push("height:200px;");$array.push("overflow-x:hidden;");$array.push("overflow-y:scroll;");$array.push("text-align:left;");$array.push("resize:none;");$array.push("border:none;");$array.push("border-top:solid 1px #ACD4C0;");$array.push("border-bottom:solid 1px #ACD4C0;");$array.push("}");$array.push(".vschess_loaded img.vschess_box{");$array.push("display:block;");$array.push("float:left;");$array.push("position:relative;");$array.push("height:40px;");$array.push("width:40px;");$array.push("border:none;");$array.push("outline:none;");$array.push("margin:0px;");$array.push("padding:0px;");$array.push("z-index:1000;");$array.push("}");$array.push(".vschess_loaded img.vschess_boxfloat{");$array.push("display:none;");$array.push("position:absolute;");$array.push("background-image:url("+vschess.pics.nos+");");$array.push("height:40px;");$array.push("width:40px;");$array.push("border:none;");$array.push("outline:none;");$array.push("margin:0px;");$array.push("padding:0px;");$array.push("z-index:2000;");$array.push("-webkit-transition:0.2s;");$array.push("}");$array.push(".vschess_loaded div.vschess_bar{");$array.push("display:block;");$array.push("float:left;");$array.push("margin-top:1px;");$array.push("margin-left:-10px;");$array.push("width:600px;");$array.push("}");$array.push(".vschess_loaded div.vschess_bar input{");$array.push("display:block;");$array.push("float:left;");$array.push("height:22px;");$array.push("width:38px;");$array.push("font-size:9pt;");$array.push("cursor:pointer;");$array.push("padding:0px;");$array.push("}");$array.push(".vschess_loaded div.vschess_makebar{");$array.push("display:none;");$array.push("float:left;");$array.push("margin-top:1px;");$array.push("margin-left:-9px;");$array.push("width:560px;");$array.push("}");$array.push(".vschess_loaded div.vschess_makebar input{");$array.push("display:block;");$array.push("float:left;");$array.push("height:22px;");$array.push("width:45px;");$array.push("font-size:9pt;");$array.push("cursor:pointer;");$array.push("padding:0px;");$array.push("}");$array.push(".vschess_loaded div.vschess_bar input.vsbar_volume{width:36px;}");$array.push(".vschess_loaded div.vschess_bar input.vsbar_config{width:36px;}");$array.push(".vschess_loaded div.vschess_bar input.vsbar_format{width:36px;}");$array.push(".vschess_loaded div.vschess_bar input.vsbar_ctrl{color:#008000;}");$array.push(".vschess_loaded div.vschess_bar input.vsbar_play{color:#008000;}");$array.push(".vschess_loaded div.vschess_bar input.vsbar_view{color:#008000;width:76px;}");$array.push(".vschess_loaded div.vschess_bar input.vsbar_time{color:#000099;}");$array.push(".vschess_loaded div.vschess_bar input.vsbar_func{color:#000099;}");$array.push(".vschess_loaded div.vschess_bar input.vsbar_help{color:#000099;}");$array.push(".vschess_loaded div.vschess_bar input.vsbar_pause{color:#FF0000;}");$array.push(".vschess_loaded div.vschess_bar ul{");$array.push("display:none;");$array.push("position:absolute;");$array.push("z-index:3000;");$array.push("background-color:#FFF;");$array.push("border:1px solid #999;");$array.push("padding:3px;");$array.push("overflow:hidden;");$array.push("background-color:#FFC;");$array.push("}");$array.push(".vschess_loaded div.vschess_bar ul.vsbar_timelist{left:266px;}");$array.push(".vschess_loaded div.vschess_bar ul.vsbar_funclist{left:304px;}");$array.push(".vschess_loaded div.vschess_bar ul.vsbar_funclist li{");$array.push("background-image:url("+vschess.picpath+"menu.png);");$array.push("background-repeat:no-repeat;");$array.push("text-indent:16px;");$array.push("}");$array.push(".vschess_loaded div.vschess_bar ul.vsbar_volmlist{");$array.push("background:#ffc url("+vschess.picpath+"arrowbg.png) no-repeat 9px 10px;");$array.push("overflow:visible;");$array.push("left:380px;");$array.push("top:261px;");$array.push("width:26px;");$array.push("height:150px;");$array.push("}");$array.push(".vschess_loaded div.vschess_bar ul.vsbar_volmlist li.vsbar_volmitem{");$array.push("background:url("+vschess.picpath+"arrow.png) no-repeat 0px -10px;");$array.push("position:absolute;");$array.push("left:7px;");$array.push("top:7px;");$array.push("width:19px;");$array.push("height:10px;");$array.push("}");$array.push(".vschess_loaded div.vschess_bar ul.vsbar_volmlist li.vsbar_volmitem:hover,");$array.push(".vschess_loaded div.vschess_bar ul.vsbar_volmlist li.vsbar_volmitem.hover{");$array.push("background:url("+vschess.picpath+"arrow.png) no-repeat 0px 0px;");$array.push("}");$array.push(".vschess_loaded div.vschess_bar ul.vsbar_volmlist li.vsbar_volmitem span{");$array.push("background-color:#fff;");$array.push("position:absolute;");$array.push("left:22px;");$array.push("top:-5px;");$array.push("padding:0 2px;");$array.push("border:1px solid #666;");$array.push("border-radius:3px;");$array.push("font-size:10px;");$array.push("display:none;");$array.push("}");$array.push(".vschess_loaded div.vschess_bar ul.vsbar_savelist li{");$array.push("background-image:url("+vschess.picpath+"save.png);");$array.push("background-repeat:no-repeat;");$array.push("text-indent:16px;");$array.push("}");$array.push(".vschess_loaded div.vschess_bar ul.vsbar_pstnlist li{");$array.push("background-image:url("+vschess.picpath+"turn.png);");$array.push("background-repeat:no-repeat;");$array.push("text-indent:16px;");$array.push("}");$array.push(".vschess_loaded div.vschess_bar ul.vsbar_timelist li{");$array.push("background-image:url("+vschess.picpath+"menu.png);");$array.push("background-repeat:no-repeat;");$array.push("background-position:0px -163px;");$array.push("text-indent:16px;");$array.push("}");$array.push(".vschess_loaded div.vschess_bar ul li{");$array.push("display:block;");$array.push("position:relative;");$array.push("height:18px;");$array.push("line-height:18px;");$array.push("padding-right:3px;");$array.push("padding-left:3px;");$array.push("font-size:9pt;");$array.push("color:#000;");$array.push("}");$array.push(".vschess_loaded div.vschess_bar ul li a{");$array.push("font-size:9pt;");$array.push("color:#000;");$array.push("}");$array.push(".vschess_loaded div.vschess_bar ul li:hover,");$array.push(".vschess_loaded div.vschess_bar ul li:hover a,");$array.push(".vschess_loaded div.vschess_bar ul li.hover,");$array.push(".vschess_loaded div.vschess_bar ul li.hover a{");$array.push("background-color:#CCC;");$array.push("cursor:pointer;");$array.push("color:#000;");$array.push("}");$array.push(".vschess_loaded div.vschess_bar ul li.vsbar_blogeach{");$array.push("background-image:url("+vschess.picpath+"share.png);");$array.push("background-repeat:no-repeat;");$array.push("text-indent:16px;");$array.push("}");$array.push(".vschess_loaded div.vschess_bar span.vsbar_listarrow{");$array.push("display:inline-block;");$array.push("font-family:\"宋体\";");$array.push("line-height:10px;");$array.push("text-indent:-8px;");$array.push("overflow:hidden;");$array.push("margin-left:3px;");$array.push("}");$array.push(".vschess_loaded ul.vschess_node{");$array.push("display:none;");$array.push("position:absolute;");$array.push("height:100px;");$array.push("width:146px;");$array.push("border:solid 1px #ACD4C0;");$array.push("margin:20px 0 0 0;");$array.push("padding:0px;");$array.push("z-index:2000;");$array.push("left:558px;");$array.push("overflow-x:hidden;");$array.push("overflow-y:scroll;");$array.push("background-color:#FFF;");$array.push("padding:2px;");$array.push("}");$array.push(".vschess_loaded ul.vschess_node li{");$array.push("height:20px;");$array.push("width:120px;");$array.push("line-height:20px !important;");$array.push("font-size:10px;");$array.push("text-align:left;");$array.push("padding-left:5px;");$array.push("padding-right:5px;");$array.push("}");$array.push(".vschess_loaded ul.vschess_node li span{");$array.push("float:right;");$array.push("margin-left:5px;");$array.push("cursor:pointer;");$array.push("}");$array.push(".vschess_loaded ul.vschess_node li span.step{");$array.push("float:left;");$array.push("margin-left:0px;");$array.push("cursor:pointer;");$array.push("}");$array.push(".vschess_loaded ul.vschess_node li.current{");$array.push("background-color:#0EE;");$array.push("}");$array.push(".vschess_loaded div.vschess_node_title{");$array.push("display:none;");$array.push("position:absolute;");$array.push("height:20px;");$array.push("width:150px;");$array.push("border:solid 1px #ACD4C0;");$array.push("margin:-1px 0 0 0;");$array.push("padding:0px;");$array.push("z-index:2000;");$array.push("text-indent:43px;");$array.push("line-height:20px !important;");$array.push("left:558px;");$array.push("font-weight:bolder;");$array.push("background-color:#FFF;");$array.push("font-size:10px;");$array.push("}");$array.push(".vschess_loaded div.vschess_node_close{");$array.push("display:none;");$array.push("position:absolute;");$array.push("height:20px;");$array.push("width:20px;");$array.push("margin:0px;");$array.push("padding:0px;");$array.push("z-index:2000;");$array.push("text-align:center;");$array.push("line-height:20px !important;");$array.push("cursor:pointer;");$array.push("left:689px;");$array.push("color:#F00;");$array.push("font-weight:bolder;");$array.push("background-color:#FFF;");$array.push("}");$array.push("#vschess_message{");$array.push("display:none;");$array.push("position:fixed;");$array.push("top:50%;");$array.push("left:50%;");$array.push("padding:10px;");$array.push("white-space:nowrap;");$array.push("background-color:#FFF;");$array.push("border:solid 3px #999;");$array.push("border-radius:10px;");$array.push("z-index:10000;");$array.push("}");$array.push("#vschess_message a{text-decoration:none;}");$array.push("#vschess_file{");$array.push("display:none;");$array.push("position:fixed;");$array.push("top:50%;");$array.push("left:50%;");$array.push("padding:10px;");$array.push("background-color:#FFF;");$array.push("border:solid 3px #999;");$array.push("border-radius:10px;");$array.push("z-index:8000;");$array.push("}");$array.push("#vschess_file textarea{");$array.push("font-family:\"宋体\";");$array.push("resize:none");$array.push("}");$array.push(".vschess_loaded ul.steps li.start,");$array.push(".vschess_loaded ul.steps li.stepnum,");$array.push(".vschess_loaded ul.steps li.step,");$array.push(".vschess_loaded ul.vschess_node li,");$array.push(".vschess_loaded textarea.vschess_comment,");$array.push(".vschess_loaded div.vschess_node_title{");$array.push("font-size:12px;");$array.push("}");$array.push(".vschess_loaded div.vschess_make{");$array.push("display:none;");$array.push("padding:8px;");$array.push("width:162px;");$array.push("height:400px;");$array.push("background-color:#FFF;");$array.push("z-index:1500;");$array.push("position:absolute;");$array.push("top:0px;");$array.push("left:378px;");$array.push("border:solid 1px #ACD4C0;");$array.push("font-size:12px");$array.push("}");$array.push(".vschess_loaded div.vschess_make img{float:left;}");$array.push(".vschess_loaded div.vschess_make span{cursor:pointer;}");$array.push(".vschess_loaded div.vschess_make div{");$array.push("float:left;");$array.push("width:165px;");$array.push("margin-top:8px;");$array.push("}");$array.push(".vschess_loaded div.vschess_quickmakefen{");$array.push("display:none;");$array.push("position:absolute;");$array.push("padding:3px 8px 3px 8px;");$array.push("line-height:24px;");$array.push("background-color:#e0ffff;");$array.push("z-index:2000;");$array.push("}");$array.push(".vschess_loaded div.vschess_quickmakefen span.vschess_red{");$array.push("font-size:16px;");$array.push("color:#f00;");$array.push("cursor:pointer;");$array.push("}");$array.push(".vschess_loaded div.vschess_quickmakefen span.vschess_black{");$array.push("font-size:16px;");$array.push("color:#000;");$array.push("cursor:pointer;");$array.push("}");$array.push(".vschess_loaded div.vschess_comment_bigh{");$array.push("display:none;");$array.push("position:absolute;");$array.push("top:80px;");$array.push("width:10px;");$array.push("height:50px;");$array.push("margin-left:152px;");$array.push("line-height:50px;");$array.push("border:solid 1px #99F;");$array.push("border-right:none;");$array.push("background-color:#D3FFFF;");$array.push("font-size:10px;");$array.push("color:#33F;");$array.push("cursor:pointer;");$array.push("}");$array.push(".vschess_loaded div.vschess_comment_big{");$array.push("display:none;");$array.push("position:absolute;");$array.push("top:54px;");$array.push("width:10px;");$array.push("height:50px;");$array.push("margin-left:152px;");$array.push("line-height:50px;");$array.push("border:solid 1px #99F;");$array.push("border-right:none;");$array.push("background-color:#D3FFFF;");$array.push("font-size:10px;");$array.push("color:#33F;");$array.push("cursor:pointer;");$array.push("}");$array.push(".vschess_loaded div.vschess_comment_small{");$array.push("display:none;");$array.push("position:absolute;");$array.push("top:105px;");$array.push("width:10px;");$array.push("height:50px;");$array.push("margin-left:152px;");$array.push("line-height:50px;");$array.push("border:solid 1px #99F;");$array.push("border-right:none;");$array.push("background-color:#D3FFFF;");$array.push("font-size:10px;");$array.push("color:#33F;");$array.push("cursor:pointer;");$array.push("}");$array.push(".vschess_loaded div.vschess_comment_tip{");$array.push("display:block;");$array.push("top:5px;");$array.push("left:5px;");$array.push("position:absolute;");$array.push("color:#999;");$array.push("}");if(FireFox){$array.push(".vschess_loaded textarea.vschess_comment{");$array.push("width:174px;");$array.push("padding:0px;");$array.push("padding-left:5px;");$array.push("height:210px;");$array.push("}");}
if(IE7){$array.push(".vschess_loaded div.vschess_config{");$array.push("top: 207px;");$array.push("height: 190px;");$array.push("}");}
if(IE6){$array.push(".vschess_loaded div.vschess_bar{margin-left:-5px;}");$array.push(".vschess_loaded div.vschess_bar ul.vsbar_timelist{width:56px;}");$array.push(".vschess_loaded div.vschess_bar ul.vsbar_funclist{width:78px;}");$array.push(".vschess_loaded div.vschess_bar ul.vsbar_pstnlist{width:76px;}");$array.push(".vschess_loaded div.vschess_bar ul.vsbar_savelist{width:150px;}");$array.push(".vschess_loaded div.vschess_bar ul.vsbar_bloglist{width:76px;}");$array.push(".vschess_loaded div.vschess_config{");$array.push("top: 207px;");$array.push("height: 190px;");$array.push("}");$array.push(".vschess_loaded div.vschess_bar ul li{");$array.push("display:block;");$array.push("position:relative;");$array.push("list-style:none;");$array.push("height:18px;");$array.push("padding-right:3px;");$array.push("padding-left:3px;");$array.push("font-size:9pt;");$array.push("}");$array.push("#vschess_message,#vschess_file{position:absolute;}");$array.push(".vschess_loaded div.vschess_makebar{");$array.push("position:absolute;");$array.push("left:9px;");$array.push("top:416px;");$array.push("}");}
return $array.join("");})();$("head").append("<style>"+vschess.style+"</style>");var $html='<div id="vschess_message"></div>';$html+='<div id="vschess_file">';$html+='<span id="vschess_file_info">请单击“保存”来保存此棋谱。</span><br />';$html+='<form action="'+vschess.server+'action=save" method="post" id="vschess_post">';$html+='<textarea name="content" rows="10" cols="50" style="margin-top:5px;margin-left:0px;" readonly="readonly"></textarea><br />';$html+='<input type="button" value="确定" style="float:right;width:50px;margin-top:5px;margin-left:5px;" class="vschess_file_close" />';$html+='<input type="button" value="复制" style="float:right;width:50px;margin-top:5px;margin-left:5px;" id="vschesscopybutton" />';if(vschess.server){$html+='<input type="submit" value="保存" style="float:right;width:50px;margin-top:5px;margin-left:5px;" class="vschess_file_close" />';}
$html+="</form></div>";$("body").append($html);if(vschess.soundpath){var soundArray=[];$.each(vschess.soundlist,function(){var name=this.toString();if(IE){soundArray.push('<object id="vschess_sound_',name,'" classid="clsid:6BF52A52-394A-11d3-B153-00C04F79FAA6" style="display:none;"><param name="url" value="',vschess.soundpath,name,'.mp3" /><param name="autostart" value="false" /></object>');}
else{soundArray.push('<audio id="vschess_sound_',name,'" src="',vschess.soundpath,name,'.mp3" preload="load"></audio>');}});$("body").append(soundArray.join(""));}
$("#vschess_file").css({"width":$("#vschess_file").width(),"height":$("#vschess_file").height(),"margin-top":-$("#vschess_file").outerHeight()/2,"margin-left":-$("#vschess_file").outerWidth()/2});if(IE){$("#vschesscopybutton").click(function(){window.clipboardData.setData("Text",$("#vschess_file textarea").text());if(vschess.copycontent==0){vschess.showmsg("棋谱复制成功，请保存后用象棋软件打开。");}
else{vschess.showmsg("文字棋盘复制成功，推荐您将棋盘粘贴到到Word文档中，并将字体设为宋体。");}});}
else{vschess.savepgncopy.setHandCursor(false);vschess.savepgncopy.addEventListener("complete",function(client){if(vschess.copycontent==0){vschess.showmsg("棋谱复制成功，请保存后用象棋软件打开。");}
else{vschess.showmsg("文字棋盘复制成功，推荐您将棋盘粘贴到到Word文档中，并将字体设为宋体。");}});}
if(IE6){$("#vschess_file,#vschess_message").css({"margin-top":0,"margin-left":0,"top":0,"left":0});$(window).scroll(function(){$("#vschess_file,#vschess_message").css({"margin-top":0,"margin-left":0,"top":document.documentElement.scrollTop,"left":document.documentElement.scrollLeft});});$("input.vschess_file_close").live("click",function(){$("#vschess_message,#vschess_file").hide();vschess.savepgncopy.hide();});}
else{$(document).on("click","input.vschess_file_close",function(){$("#vschess_message,#vschess_file").fadeOut(500);vschess.savepgncopy.hide();});}
if(!IE){$(window).resize(function(){vschess.savepgncopy.reposition();});}
if(IE6){vschess.pics.rr=vschess.picpath+"ie6/rr.png";vschess.pics.rrs=vschess.picpath+"ie6/rrs.png";vschess.pics.rn=vschess.picpath+"ie6/rn.png";vschess.pics.rns=vschess.picpath+"ie6/rns.png";vschess.pics.rb=vschess.picpath+"ie6/rb.png";vschess.pics.rbs=vschess.picpath+"ie6/rbs.png";vschess.pics.ra=vschess.picpath+"ie6/ra.png";vschess.pics.ras=vschess.picpath+"ie6/ras.png";vschess.pics.rk=vschess.picpath+"ie6/rk.png";vschess.pics.rks=vschess.picpath+"ie6/rks.png";vschess.pics.rc=vschess.picpath+"ie6/rc.png";vschess.pics.rcs=vschess.picpath+"ie6/rcs.png";vschess.pics.rp=vschess.picpath+"ie6/rp.png";vschess.pics.rps=vschess.picpath+"ie6/rps.png";vschess.pics.br=vschess.picpath+"ie6/br.png";vschess.pics.brs=vschess.picpath+"ie6/brs.png";vschess.pics.bn=vschess.picpath+"ie6/bn.png";vschess.pics.bns=vschess.picpath+"ie6/bns.png";vschess.pics.bb=vschess.picpath+"ie6/bb.png";vschess.pics.bbs=vschess.picpath+"ie6/bbs.png";vschess.pics.ba=vschess.picpath+"ie6/ba.png";vschess.pics.bas=vschess.picpath+"ie6/bas.png";vschess.pics.bk=vschess.picpath+"ie6/bk.png";vschess.pics.bks=vschess.picpath+"ie6/bks.png";vschess.pics.bc=vschess.picpath+"ie6/bc.png";vschess.pics.bcs=vschess.picpath+"ie6/bcs.png";vschess.pics.bp=vschess.picpath+"ie6/bp.png";vschess.pics.bps=vschess.picpath+"ie6/bps.png";vschess.pics.no=vschess.picpath+"ie6/no.png";vschess.pics.nos=vschess.picpath+"ie6/nos.png";}
var $imgName="",$img=[],$i=0;for($imgName in vschess.pics){$img[$i]=new Image();$img[$i].src=vschess.pics[$imgName];}}};vschess.load=function($selector){vschess.init();var $i=0,$j=0;if(typeof arguments[1]=="undefined"){var $arguments={};}
else{var $arguments=arguments[1];}
$($selector).each(function(){if($(this).hasClass("vschess_loaded")){return true;}
var $zouqi,$zouqi_each=[],$row,$col,$id,$autoMoveState=false;var $ctrlbar=[],$jumian,$fen,$beginplayer,$beginround,$currentplayer,$currentround,$jumian_each=[];var $chessid=vschess.chessid++,$pfdom,$fasttime,$fastinterval;var $chinesestep,$chinesestepm,$chinesepgn,$chinesepgnm;var $wxfstep,$wxfstepm,$wxfpgn,$wxfpgnm;var $iccsstep,$iccsstepm,$iccspgn,$iccspgnm;var $saveqq,$saveqqm,$makefenerror,$makefen_quickthis;$(this).addClass("vschess_loaded vschess_loaded_"+$chessid);var $this=$(".vschess_loaded_"+$chessid);(function(){vschess.comments[$chessid]=[];vschess.resetdom[$chessid]=function(){$this=$(".vschess_loaded_"+$chessid);};vschess.oldcontent[$chessid]=$this.html();vschess.usermove[$chessid]=0;vschess.time_each[$chessid]=0;vschess.time[$chessid]=5;vschess.step[$chessid]=0;vschess.play[$chessid]=0;vschess.turn[$chessid]=0;vschess.move[$chessid]=0;vschess.autoMove[$chessid]=1;vschess.checkmove[$chessid]=1;vschess.format[$chessid]="chinese";vschess.animate[$chessid]=1;vschess.tips[$chessid]=1;vschess.soundState[$chessid]=1;vschess.chineseSoundStatus[$chessid]=1;vschess.livepause[$chessid]=false;vschess.volume[$chessid]=100;$this.html("");})();var $normalstart=true,$viewbook=true;(function(){var $appendhtml=[];$appendhtml.push('<div class="vschess_info">');$appendhtml.push('<ul class="steps"></ul>');$appendhtml.push('<div class="vschess_comment">');$appendhtml.push('<div class="vschess_comment_tip">这里可以填写注释信息</div>');$appendhtml.push('<textarea class="vschess_comment"></textarea>');$appendhtml.push('<div class="vschess_comment_bigh">&gt;</div>');$appendhtml.push('<div class="vschess_comment_big">&gt;</div>');$appendhtml.push('<div class="vschess_comment_small">&lt;</div>');$appendhtml.push('</div>');$appendhtml.push('<div class="vschess_make"></div>');$appendhtml.push('</div>');$appendhtml.push('<div class="vschess_config"></div>');$appendhtml.push('<div class="vschess_quickmakefen">');$appendhtml.push('<span class="vschess_red" name="K">帅</span> ');$appendhtml.push('<span class="vschess_red" name="R">车</span> ');$appendhtml.push('<span class="vschess_red" name="N">马</span> ');$appendhtml.push('<span class="vschess_red" name="C">炮</span> ');$appendhtml.push('<span class="vschess_red" name="B">相</span> ');$appendhtml.push('<span class="vschess_red" name="A">仕</span> ');$appendhtml.push('<span class="vschess_red" name="P">兵</span> ');$appendhtml.push('<span class="vschess_red" name="*" title="关闭"');$appendhtml.push(' style="padding-left:10px;">X</span><br />');$appendhtml.push('<span class="vschess_black" name="k">将</span> ');$appendhtml.push('<span class="vschess_black" name="r">车</span> ');$appendhtml.push('<span class="vschess_black" name="n">马</span> ');$appendhtml.push('<span class="vschess_black" name="c">炮</span> ');$appendhtml.push('<span class="vschess_black" name="b">象</span> ');$appendhtml.push('<span class="vschess_black" name="a">士</span> ');$appendhtml.push('<span class="vschess_black" name="p">卒</span> ');$appendhtml.push('</div>');$appendhtml.push('<div class="vschess_node_title">着法列表</div>');$appendhtml.push('<ul class="vschess_node"></ul>');$appendhtml.push('<div class="vschess_node_close">X</div>');$this.append($appendhtml.join(""));var $this_vschess_config=$this.find("div.vschess_config");$this_vschess_config.append('<input type="checkbox" class="vschess_config_animate" checked="checked" /> 自动播放动画效果<br />');$this_vschess_config.append('<input type="checkbox" class="vschess_config_automove" checked="checked" /> 唯一着法自动走子<br />');$this_vschess_config.append('<input type="checkbox" class="vschess_config_check" checked="checked" /> 走子规则检查<br />');if(!IE6){$this_vschess_config.append('<input type="checkbox" class="vschess_config_tips" checked="checked" /> 走子目标提示<br />');}
if(vschess.soundpath){$this_vschess_config.append('<input type="checkbox" class="vschess_config_sound" checked="checked" /> 走子音效<br />');$this_vschess_config.append('<input type="checkbox" class="vschess_config_chineseSoundStatus" checked="checked" /> 着法朗读<br />');}
var $this_vschess_make=$this.find("div.vschess_make");$this_vschess_make.append('<div style="margin-top:0px;margin-bottom:5px;padding-bottom:5px;border-bottom:dashed 1px #ACD4C0;">　　单击棋子库的棋子，然后摆放至棋盘上，右击棋盘上的棋子可以将其移去。<br />　　在棋盘内无棋子处右键单击可以快速摆放棋子。<br />　　您可以在棋盘左下角的文本框中输入FEN码或象棋世家局面码来输入局面。<br /></div>');$this_vschess_make.append('<img src="'+vschess.pics.rk+'" name="rk" />');$this_vschess_make.append('<img src="'+vschess.pics.rr+'" name="rr" />');$this_vschess_make.append('<img src="'+vschess.pics.rn+'" name="rn" />');$this_vschess_make.append('<img src="'+vschess.pics.rc+'" name="rc" />');$this_vschess_make.append('<img src="'+vschess.pics.rb+'" name="rb" />');$this_vschess_make.append('<img src="'+vschess.pics.ra+'" name="ra" />');$this_vschess_make.append('<img src="'+vschess.pics.rp+'" name="rp" />');$this_vschess_make.append('<img src="'+vschess.pics.no+'" name="no" />');$this_vschess_make.append('<img src="'+vschess.pics.bk+'" name="bk" />');$this_vschess_make.append('<img src="'+vschess.pics.br+'" name="br" />');$this_vschess_make.append('<img src="'+vschess.pics.bn+'" name="bn" />');$this_vschess_make.append('<img src="'+vschess.pics.bc+'" name="bc" />');$this_vschess_make.append('<img src="'+vschess.pics.bb+'" name="bb" />');$this_vschess_make.append('<img src="'+vschess.pics.ba+'" name="ba" />');$this_vschess_make.append('<img src="'+vschess.pics.bp+'" name="bp" />');$this_vschess_make.append('<img src="'+vschess.pics.no+'" name="no" />');$this_vschess_make.append('<div style="margin-top:5px;padding-top:5px;border-top:dashed 1px #ACD4C0;"><lable style="color:#F00;">红方先走</lable> <input type="radio" name="player" value="w" checked="checked" /> <lable style="color:#000;">黑方先走</lable> <input type="radio" name="player" value="b" /></div>');$this_vschess_make.append('<div>回合数：<input type="text" class="vschess_setstep" style="width:30px;border:none;" /> <span class="vschess_up">▲</span><span class="vschess_down">▼</span></div>');})();$this.append("<img src=\""+vschess.pics.no+"\" class=\"vschess_boxfloat\" alt=\"动画\" />");for($i=0;$i<90;++$i){if(IE6){switch($i){case 0:$this.append("<img src=\""+vschess.picpath+"ie6/nolt.png\" class=\"vschess_box\" alt=\"没有\" />");break;case 8:$this.append("<img src=\""+vschess.picpath+"ie6/nort.png\" class=\"vschess_box\" alt=\"没有\" />");break;case 81:$this.append("<img src=\""+vschess.picpath+"ie6/nolb.png\" class=\"vschess_box\" alt=\"没有\" />");break;case 89:$this.append("<img src=\""+vschess.picpath+"ie6/norb.png\" class=\"vschess_box\" alt=\"没有\" />");break;case 9:case 18:case 27:case 36:case 45:case 54:case 63:case 72:$this.append("<img src=\""+vschess.picpath+"ie6/nol.png\" class=\"vschess_box\" alt=\"没有\" />");break;case 17:case 26:case 35:case 44:case 53:case 62:case 71:case 80:$this.append("<img src=\""+vschess.picpath+"ie6/nor.png\" class=\"vschess_box\" alt=\"没有\" />");break;case 37:case 38:case 39:case 40:case 41:case 42:case 43:case 82:case 83:case 84:case 85:case 86:case 87:case 88:$this.append("<img src=\""+vschess.picpath+"ie6/nob.png\" class=\"vschess_box\" alt=\"没有\" />");break;case 46:case 47:case 48:case 49:case 50:case 51:case 52:case 1:case 2:case 3:case 4:case 5:case 6:case 7:$this.append("<img src=\""+vschess.picpath+"ie6/not.png\" class=\"vschess_box\" alt=\"没有\" />");break;default:$this.append("<img src=\""+vschess.picpath+"ie6/no.png\"  class=\"vschess_box\" alt=\"没有\" />");break;}}
else{$this.append('<img src="'+vschess.pics.no+'" class="vschess_box" />');}}
var $baiqi=function($baiqi_fen,$currentstep){$currentstep=parseInt($currentstep);$this.find("ul.steps li").css("background-color","transparent");var $stepnow=$this.find("ul.steps li[name='"+$currentstep+"']");$stepnow.css("background-color","#0EE");$this.find("textarea.vschess_comment").val(vschess.comments[$chessid][$currentstep]);if(vschess.comments[$chessid][$currentstep]==""){$this.find("div.vschess_comment_tip").show();}
else{$this.find("div.vschess_comment_tip").hide();}
if($stepnow.position().top>182){$this.find("ul.steps").scrollTop($this.find("ul.steps").scrollTop()+$stepnow.position().top-182);}
if($stepnow.position().top<3){$this.find("ul.steps").scrollTop($this.find("ul.steps").scrollTop()+$stepnow.position().top-3);}
$chessbox=$this.children("img.vschess_box");$chessbox.each(function($k){var $k_ie6=$k,_this=$(this);switch(vschess.turn[$chessid]){case 1:$k=89-$k;break;case 2:$k=8+$k-$k%9*2;break;case 3:$k=81-$k+$k%9*2;break;}
switch($baiqi_fen[$k]){case"r":_this.attr({src:vschess.pics.br});break;case"n":_this.attr({src:vschess.pics.bn});break;case"h":_this.attr({src:vschess.pics.bn});break;case"b":_this.attr({src:vschess.pics.bb});break;case"e":_this.attr({src:vschess.pics.bb});break;case"a":_this.attr({src:vschess.pics.ba});break;case"k":_this.attr({src:vschess.pics.bk});break;case"c":_this.attr({src:vschess.pics.bc});break;case"p":_this.attr({src:vschess.pics.bp});break;case"R":_this.attr({src:vschess.pics.rr});break;case"N":_this.attr({src:vschess.pics.rn});break;case"H":_this.attr({src:vschess.pics.rn});break;case"B":_this.attr({src:vschess.pics.rb});break;case"E":_this.attr({src:vschess.pics.rb});break;case"A":_this.attr({src:vschess.pics.ra});break;case"K":_this.attr({src:vschess.pics.rk});break;case"C":_this.attr({src:vschess.pics.rc});break;case"P":_this.attr({src:vschess.pics.rp});break;default:_this.attr({src:vschess.pics.no});break;}
if($baiqi_fen[$k]=="*"){_this.css("cursor","default");}
else{_this.css("cursor","pointer");}
if(IE6&&$baiqi_fen[$k]=="*"){switch($k_ie6){case 0:_this.attr("src",vschess.picpath+"ie6/nolt.png");break;case 8:_this.attr("src",vschess.picpath+"ie6/nort.png");break;case 81:_this.attr("src",vschess.picpath+"ie6/nolb.png");break;case 89:_this.attr("src",vschess.picpath+"ie6/norb.png");break;case 9:case 18:case 27:case 36:case 45:case 54:case 63:case 72:_this.attr("src",vschess.picpath+"ie6/nol.png");break;case 17:case 26:case 35:case 44:case 53:case 62:case 71:case 80:_this.attr("src",vschess.picpath+"ie6/nor.png");break;case 37:case 38:case 39:case 40:case 41:case 42:case 43:case 82:case 83:case 84:case 85:case 86:case 87:case 88:_this.attr("src",vschess.picpath+"ie6/nob.png");break;case 46:case 47:case 48:case 49:case 50:case 51:case 52:case 1:case 2:case 3:case 4:case 5:case 6:case 7:_this.attr("src",vschess.picpath+"ie6/not.png");break;default:_this.attr("src",vschess.picpath+"ie6/no.png");break;}}});if($currentstep>0){var $from,$to,$jumian_temp=[];for($i=0;$i<90;++$i){if($jumian_each[$currentstep-1][$i]!="*"&&$jumian_each[$currentstep][$i]=="*"){$from=$i;break;}}
for($i=0;$i<90;++$i){if($jumian_each[$currentstep-1][$i]!=$jumian_each[$currentstep][$i]&&$i!=$from){$to=$i;break;}}
switch(vschess.turn[$chessid]){case 1:$from=89-$from;$to=89-$to;break;case 2:$from=8+$from-$from%9*2;$to=8+$to-$to%9*2;break;case 3:$from=81-$from+$from%9*2;$to=81-$to+$to%9*2;break;}
var $frombox=$this.find("img.vschess_box:eq("+$from+")");var $tobox=$this.find("img.vschess_box:eq("+$to+")");$frombox.attr("src",vschess.pics.no).css("background-image","url("+vschess.pics.nos+")");$tobox.css("background-image","url("+vschess.pics.nos+")");if(IE6){$tobox.attr("src",$tobox.attr("src").replace(".png","s.png"));switch($from){case 0:$frombox.attr("src",vschess.picpath+"ie6/nolts.png");break;case 8:$frombox.attr("src",vschess.picpath+"ie6/norts.png");break;case 81:$frombox.attr("src",vschess.picpath+"ie6/nolbs.png");break;case 89:$frombox.attr("src",vschess.picpath+"ie6/norbs.png");break;case 9:case 18:case 27:case 36:case 45:case 54:case 63:case 72:$frombox.attr("src",vschess.picpath+"ie6/nols.png");break;case 17:case 26:case 35:case 44:case 53:case 62:case 71:case 80:$frombox.attr("src",vschess.picpath+"ie6/nors.png");break;case 37:case 38:case 39:case 40:case 41:case 42:case 43:case 82:case 83:case 84:case 85:case 86:case 87:case 88:$frombox.attr("src",vschess.picpath+"ie6/nobs.png");break;case 46:case 47:case 48:case 49:case 50:case 51:case 52:case 1:case 2:case 3:case 4:case 5:case 6:case 7:$frombox.attr("src",vschess.picpath+"ie6/nots.png");break;default:$frombox.attr("src",vschess.picpath+"ie6/nos.png");break;}}}
vschess.currentfen[$chessid]="";for($j=0;$j<90;++$j){vschess.currentfen[$chessid]+=$baiqi_fen[$j];if($j%9==8&&$j!=89){vschess.currentfen[$chessid]+="/";}}
vschess.currentfen[$chessid]=vschess.currentfen[$chessid].replace(/\*\*\*\*\*\*\*\*\*/g,"9").replace(/\*\*\*\*\*\*\*\*/g,"8").replace(/\*\*\*\*\*\*\*/g,"7").replace(/\*\*\*\*\*\*/g,"6").replace(/\*\*\*\*\*/g,"5").replace(/\*\*\*\*/g,"4").replace(/\*\*\*/g,"3").replace(/\*\*/g,"2").replace(/\*/g,"1");if($currentstep%2==1){$beginplayer=="b"?$currentplayer="w":$currentplayer="b";}
else{$beginplayer=="b"?$currentplayer="b":$currentplayer="w";}
if($beginplayer=="b"){$currentround=$beginround+($currentstep%2?($currentstep+1)/2:($currentstep)/2);}
else{$currentround=$beginround+($currentstep%2?($currentstep-1)/2:($currentstep)/2);}
vschess.currentfen[$chessid]+=" "+$currentplayer+" - - 0 "+$currentround;if($currentplayer=="b"){if(vschess.checklose($baiqi_fen,"b")){$stepnow.css("background-color","#AAA");}
else if(vschess.checkthreat($baiqi_fen,"b")){$stepnow.css("background-color","#FCC");}}
else{if(vschess.checklose($baiqi_fen,"w")){$stepnow.css("background-color","#AAA");}
else if(vschess.checkthreat($baiqi_fen,"w")){$stepnow.css("background-color","#FCC");}}};vschess.putchessman[$chessid]=function($putstep){$baiqi($jumian_each[$putstep],$putstep);};(function(){$ctrlbar.push('<div class="vschess_bar">');$ctrlbar.push('<input type="button" class="vsbar_first" value="开局" title="返回初始局面" disabled="disabled" />');$ctrlbar.push('<input type="button" class="vsbar_prev10" value="快退" title="后退10步" disabled="disabled" />');$ctrlbar.push('<input type="button" class="vsbar_prev" value="后退" title="单击后退1步，按住快速后退" disabled="disabled" />');$ctrlbar.push('<input type="button" class="vsbar_ctrl" value="播放" title="自动播放棋谱" />');$ctrlbar.push('<input type="button" class="vsbar_view vsbar_pause" title="暂停收看直播" value="暂停收看" style="display:none;" />');$ctrlbar.push('<input type="button" class="vsbar_play vsbar_pause" title="暂停播放棋谱" value="暂停" style="display:none;" />');$ctrlbar.push('<input type="button" class="vsbar_stop vsbar_pause" title="结束直播" value="结束" style="display:none;" />');$ctrlbar.push('<input type="button" class="vsbar_next" value="前进" title="单击前进1步，按住快速前进" />');$ctrlbar.push('<input type="button" class="vsbar_next10" value="快进" title="前进10步" />');$ctrlbar.push('<input type="button" class="vsbar_last" value="终局" title="前往最终局面" />');$ctrlbar.push('<input type="button" class="vsbar_time" value="0.5秒" title="选择播放速度" />');$ctrlbar.push('<input type="button" class="vsbar_func" value="功能" title="复制局面、保存棋谱、微博分享等功能" />');$ctrlbar.push('<input type="button" class="vsbar_help" value="帮助" title="查看帮助" />');$ctrlbar.push('<input type="button" class="vsbar_volume" value="音量" title="走子音效音量控制" style="color:#C0C;" />');$ctrlbar.push('<input type="button" class="vsbar_config" value="选项" title="可控制声音、走子检查等" style="color:#C0C;" />');$ctrlbar.push('<input type="button" class="vsbar_format vsbar_chinese" value="中文" title="中文格式棋谱" />');$ctrlbar.push('<input type="button" class="vsbar_format vsbar_wxf" value="WXF" title="WXF纵线格式棋谱" />');$ctrlbar.push('<input type="button" class="vsbar_format vsbar_iccs" value="ICCS" title="ICCS坐标格式棋谱" />');$ctrlbar.push('<ul class="vsbar_timelist">');$ctrlbar.push('<li name="50" title="播放速度为每步5秒">5秒</li>');$ctrlbar.push('<li name="20" title="播放速度为每步2秒">2秒</li>');$ctrlbar.push('<li name="10" title="播放速度为每步1秒">1秒</li>');$ctrlbar.push('<li name="5" title="播放速度为每步0.5秒">0.5秒</li>');$ctrlbar.push('<li name="2" title="播放速度为每步0.2秒">0.2秒</li>');$ctrlbar.push('<li name="1" title="播放速度为每步0.1秒">0.1秒</li>');$ctrlbar.push('</ul><ul class="vsbar_funclist">');$ctrlbar.push('<li class="vsbar_copy" style="background-position:0px -1px;" id="vschess_copy_',$chessid,'" title="复制当前局面的FEN码">复制局面</li>');$ctrlbar.push('<li class="vsbar_edit" style="background-position:0px -19px;" title="编辑起始局面">编辑局面</li>');$ctrlbar.push('<li class="vsbar_view" style="background-position:0px -37px;" title="查看棋谱代码">查看棋谱<span class="vsbar_listarrow">◆</span></li>');if(vschess.server){$ctrlbar.push('<li class="vsbar_save" style="background-position:0px -55px;" title="保存棋谱文件">保存棋谱<span class="vsbar_listarrow">◆</span></li>');}
$ctrlbar.push('<li class="vsbar_pstn" style="background-position:0px -73px;" title="改变棋盘方向">棋盘翻转<span class="vsbar_listarrow">◆</span></li>');$ctrlbar.push('<li class="vsbar_blog" style="background-position:0px -91px;" title="分享到社交网站">微博分享<span class="vsbar_listarrow">◆</span></li>');if(vschess.server){$ctrlbar.push('<li class="vsbar_pic" style="background-position:0px -109px;" title="生成当前局面的截图">生成截图</li>');}
$ctrlbar.push('<li class="vsbar_mobile" style="background-position:0px -127px;" title="使用手机扫描二维码查看棋谱">手机观看</li>');$ctrlbar.push('<li class="vsbar_text" style="background-position:0px -145px;" title="查看文字棋盘，可用于不能使用图片的场合">文字棋盘</li>');$ctrlbar.push('</ul><ul class="vsbar_savelist">');$ctrlbar.push('<li class="vsbar_pgn"  style="background-position:0px  -1px;" title="标准象棋PGN格式">标准象棋PGN格式</li>');$ctrlbar.push('<li class="vsbar_pfc"  style="background-position:0px -19px;" title="鹏飞象棋PFC格式">鹏飞象棋PFC格式</li>');$ctrlbar.push('<li class="vsbar_dpxq" style="background-position:0px -55px;" title="东萍象棋DhtmlXQ格式">东萍象棋DhtmlXQ格式</li>');$ctrlbar.push('<li class="vsbar_qq"   style="background-position:0px -37px;" title="QQ象棋CHE格式">QQ象棋CHE格式</li>');$ctrlbar.push('</ul><ul class="vsbar_pstnlist">');$ctrlbar.push('<li class="vsbar_turn" style="background-position:0px  -1px;" title="将棋盘旋转180度">对角旋转</li>');$ctrlbar.push('<li class="vsbar_updn" style="background-position:0px -37px;" title="将棋盘上下翻转">上下翻转</li>');$ctrlbar.push('<li class="vsbar_ltrt" style="background-position:0px -19px;" title="将棋盘左右翻转">左右翻转</li>');$ctrlbar.push('</ul><ul class="vsbar_bloglist">');$ctrlbar.push('<li class="vsbar_blogeach" style="background-position:0px  -19px;" title="分享到新浪微博" name="tsina">新浪微博</li>');$ctrlbar.push('<li class="vsbar_blogeach" style="background-position:0px  -73px;" title="分享到腾讯微博" name="tqq">腾讯微博</li>');$ctrlbar.push('<li class="vsbar_blogeach" style="background-position:0px  -55px;" title="分享到网易微博" name="t163">网易微博</li>');$ctrlbar.push('<li class="vsbar_blogeach" style="background-position:0px  -37px;" title="分享到搜狐微博" name="tsohu">搜狐微博</li>');$ctrlbar.push('<li class="vsbar_blogeach" style="background-position:0px  -91px;" title="分享到人人网" name="renren">人人网</li>');$ctrlbar.push('<li class="vsbar_blogeach" style="background-position:0px   -1px;" title="分享到QQ空间" name="qqzone">QQ空间</li>');$ctrlbar.push('<li class="vsbar_blogeach" style="background-position:0px -145px;" title="分享到QQ书签" name="qqmark">QQ书签</li>');$ctrlbar.push('<li class="vsbar_blogeach" style="background-position:0px -127px;" title="分享到朋友网" name="pengyou">朋友网</li>');$ctrlbar.push('<li class="vsbar_blogeach" style="background-position:0px -109px;" title="分享到开心网" name="kaixin">开心网</li>');$ctrlbar.push('<li class="vsbar_blogeach" style="background-position:0px -163px;" title="分享到豆瓣" name="douban">豆瓣</li>');$ctrlbar.push('</ul><ul class="vsbar_volmlist">');$ctrlbar.push('<li class="vsbar_volmitem"><span>100</span></li>');$ctrlbar.push('</ul></div>');$ctrlbar.push('<div class="vschess_makebar">');$ctrlbar.push('<input type="text" class="vschess_editfen" style="width:377px;height:20px;line-height:20px;border:solid 1px #ACD4C0;text-indent:3px;cursor:auto;" />');$ctrlbar.push('<input type="button" class="vschess_editbegin"  value="开局" title="将局面恢复到开局状态" />');$ctrlbar.push('<input type="button" class="vschess_editclean"  value="清空" title="清空棋盘，只剩将帅" />');$ctrlbar.push('<input type="button" class="vschess_editfinish" value="完成" title="完成编辑局面" />');$ctrlbar.push('<input type="button" class="vschess_editcancel" value="取消" title="取消编辑局面" />');$ctrlbar.push('</div>');$this.append($ctrlbar.join(""));})();if(vschess.oldcontent[$chessid].indexOf("n version")>-1){$pfdom=vschess.pfchess[$chessid]=$($.trim(vschess.oldcontent[$chessid].replace("<!--","").replace("-->","").replace(/<\?xml(.*)\?>/,"").replace(/<n/ig,"<div").replace(/\/>/ig,"></div>").replace(/<\/n>/ig,"</div>")));}
else if(vschess.oldcontent[$chessid].indexOf("[DhtmlXQ]")>-1){var $dpgroup=function($array,$num){var $each=[];for(var $i=0;$i<$array.length;++$i){if(!($i%$num)){$each[Math.floor($i/$num)]=[];}
$each[Math.floor($i/$num)][$i%$num]=parseInt($array[$i]);}
return $each;};var $dpstep=function($array){var $temp=[];switch($array[0]){case 0:$temp.push("a");break;case 1:$temp.push("b");break;case 2:$temp.push("c");break;case 3:$temp.push("d");break;case 4:$temp.push("e");break;case 5:$temp.push("f");break;case 6:$temp.push("g");break;case 7:$temp.push("h");break;case 8:$temp.push("i");break;}
$temp.push(9-$array[1]);switch($array[2]){case 0:$temp.push("a");break;case 1:$temp.push("b");break;case 2:$temp.push("c");break;case 3:$temp.push("d");break;case 4:$temp.push("e");break;case 5:$temp.push("f");break;case 6:$temp.push("g");break;case 7:$temp.push("h");break;case 8:$temp.push("i");break;}
$temp.push(9-$array[3]);return $temp.join("");};var $dprepeat=function($num){var $temp=[];for(var $i=0;$i<$num;++$i){$temp.push("</div>");}
return $temp.join("");};var $_RegExp_dpfen=/\[DhtmlXQ_binit\]([0-9]*)\[\/DhtmlXQ_binit\]/;var $_RegExp_dpmovelist=/\[DhtmlXQ_movelist\]([0-9]*)\[\/DhtmlXQ_movelist\]/;var $_RegExp_dpotherlist=/\[DhtmlXQ_move_([0-9]+)_([0-9]+)_([0-9]+)\]([0-9]*)\[\/DhtmlXQ_move_(?:[0-9]+)_(?:[0-9]+)_(?:[0-9]+)\]/g;var $_RegExp_dpcomment_main=/\[DhtmlXQ_comment([0-9]+)\](.*)\[\/DhtmlXQ_comment(?:[0-9]+)\]/g;var $_RegExp_dpcomment_other=/\[DhtmlXQ_comment([0-9]+)_([0-9]+)\](.*)\[\/DhtmlXQ_comment(?:[0-9]+)_(?:[0-9]+)\]/g;var $temp_dp=vschess.oldcontent[$chessid].replace("<!--","").replace("-->","").replace(/\[\/DhtmlXQ_comment([0-9]+)\]\[DhtmlXQ_comment([0-9]+)\]/g,"[/DhtmlXQ_comment$1]\n[DhtmlXQ_comment$2]").replace(/\[\/DhtmlXQ_comment([0-9]+)\]\[DhtmlXQ_comment([0-9]+)_([0-9]+)\]/g,"[/DhtmlXQ_comment$1]\n[DhtmlXQ_comment$2_$3]").replace(/\[\/DhtmlXQ_comment([0-9]+)_([0-9]+)\]\[DhtmlXQ_comment([0-9]+)\]/g,"[/DhtmlXQ_comment$1_$2]\n[DhtmlXQ_comment$3]").replace(/\[\/DhtmlXQ_comment([0-9]+)_([0-9]+)\]\[DhtmlXQ_comment([0-9]+)_([0-9]+)\]/g,"[/DhtmlXQ_comment$1_$2]\n[DhtmlXQ_comment$3_$4]");var $dpfen=$_RegExp_dpfen.exec(vschess.oldcontent[$chessid].replace("<!--","").replace("-->",""))[1].split(""),$temp_dp_each;var $dpmovelist=$_RegExp_dpmovelist.exec(vschess.oldcontent[$chessid].replace("<!--","").replace("-->",""))[1].split("");var $dp2fen=[],$dp2fen_man="*",$dp2fen_final="";for($i=0;$i<90;++$i){$dp2fen.push("*");}
var $dpfen_each=$dpgroup($dpfen,2),$dplen,$dpcomment_each={};$dplen=$dpfen_each.length;for($i=0;$i<$dplen;++$i){switch($i){case 4:$dp2fen_man="K";break;case 20:$dp2fen_man="k";break;case 0:case 8:$dp2fen_man="R";break;case 1:case 7:$dp2fen_man="N";break;case 2:case 6:$dp2fen_man="B";break;case 3:case 5:$dp2fen_man="A";break;case 9:case 10:$dp2fen_man="C";break;case 16:case 24:$dp2fen_man="r";break;case 17:case 23:$dp2fen_man="n";break;case 18:case 22:$dp2fen_man="b";break;case 19:case 21:$dp2fen_man="a";break;case 25:case 26:$dp2fen_man="c";break;case 11:case 12:case 13:case 14:case 15:$dp2fen_man="P";break;case 27:case 28:case 29:case 30:case 31:$dp2fen_man="p";break;default:$dp2fen_man="*";break;}
$dp2fen[$dpfen_each[$i][0]+$dpfen_each[$i][1]*9]=$dp2fen_man;}
for($i=0;$i<90;++$i){$dp2fen_final+=$dp2fen[$i];if($i%9==8&&$i!=89){$dp2fen_final+="/";}}
$dp2fen_final=$dp2fen_final.replace(/\*\*\*\*\*\*\*\*\*/g,"9").replace(/\*\*\*\*\*\*\*\*/g,"8").replace(/\*\*\*\*\*\*\*/g,"7").replace(/\*\*\*\*\*\*/g,"6").replace(/\*\*\*\*\*/g,"5").replace(/\*\*\*\*/g,"4").replace(/\*\*\*/g,"3").replace(/\*\*/g,"2").replace(/\*/g,"1");$dpmovelist_each=$dpgroup($dpmovelist,4);switch($dp2fen[$dpmovelist_each[0][0]+$dpmovelist_each[0][1]*9]){case"r":case"n":case"b":case"a":case"k":case"c":case"p":$dp2fen_final+=" b - - 0 1";break;default:$dp2fen_final+=" w - - 0 1";break;}
while($temp_dp_each=$_RegExp_dpcomment_main.exec($temp_dp)){$dpcomment_each["dp_0_"+$temp_dp_each[1]]=$temp_dp_each[2].replace(/\|\|/g,"\n");}
while($temp_dp_each=$_RegExp_dpcomment_other.exec($temp_dp)){$dpcomment_each["dp_"+$temp_dp_each[1]+"_"+$temp_dp_each[2]]=$temp_dp_each[3].replace(/\|\|/g,"\n");}
var $dpmainstr=[];$dpmainstr.push('<div version="2" win="*" create-time="*" m="');$dpmainstr.push($dp2fen_final);$dpmainstr.push('"');if($dpcomment_each["dp_0_0"]){$dpmainstr.push(' c="',$dpcomment_each["dp_0_0"],'"');}
$dpmainstr.push('>');$dplen=$dpmovelist_each.length;for($i=1;$i<=$dplen;++$i){$dpmainstr.push('<div m="',$dpstep($dpmovelist_each[$i-1]),'"');$dpmainstr.push(' step="',$i,'"');$dpmainstr.push(' id="dp_0_',$i,'"');if($dpcomment_each["dp_0_"+$i]){$dpmainstr.push(' c="',$dpcomment_each["dp_0_"+$i],'"');}
$dpmainstr.push('>');}
$pfdom=vschess.pfchess[$chessid]=$($dpmainstr.join("")+$dprepeat($dplen+1));var $dpadd,$dpcurrentstep,$dpotherlist,$_RegExp_dpcomment;while($temp_dp_each=$_RegExp_dpotherlist.exec($temp_dp)){$dpotherlist=$dpgroup($temp_dp_each[4].split(""),4);$pfdom=vschess.pfchess[$chessid].find("#dp_"+$temp_dp_each[1]+"_"+$temp_dp_each[2]);$dpcurrentstep=parseInt($pfdom.attr("step"));$dplen=$dpotherlist.length;$dpadd=[];for($j=0;$j<$dplen;++$j){$dpadd.push('<div m="',$dpstep($dpotherlist[$j]),'"');$dpadd.push(' step="',$dpcurrentstep,'"');$dpadd.push(' id="dp_',$temp_dp_each[3],'_',$dpcurrentstep,'"');if($dpcomment_each["dp_"+$temp_dp_each[3]+"_"+$dpcurrentstep]){$dpadd.push(' c="',$dpcomment_each["dp_"+$temp_dp_each[3]+"_"+$dpcurrentstep],'"');}
$dpadd.push('>');++$dpcurrentstep;}
$pfdom.after($dpadd.join("")+$dprepeat($dplen.length));}
$pfdom=vschess.pfchess[$chessid];}
else{try
{var $_fen=vschess.converter(vschess.oldcontent[$chessid].replace("<!--","").replace("-->","")).split(":");$pfdom=vschess.pfchess[$chessid]=$('<div version="2" win="*" create-time="*" m="'+$_fen[0]+'"></div>');if($_fen[1]){var $_zouqi=$_fen[1].toLowerCase();var $_zouqi_each=[];$_zouqi=$_zouqi.split("");for($i=0;$i<$_zouqi.length;++$i){if($i%4==0){$_zouqi_each[Math.floor($i/4)]=$_zouqi[$i];}
else{$_zouqi_each[Math.floor($i/4)]+=$_zouqi[$i];}}
var $_cmttemp=$_fen[3],$_eachcomment=[];if($_cmttemp){$_cmttemp=$_cmttemp.split(",");var $_eachtemp,$_eachtemp1;for($i=0;$i<=$_zouqi_each.length;++$i){$_eachcomment[$i]="";}
for($i=0;$i<$_cmttemp.length;++$i){$_eachtemp=$_cmttemp[$i].split("@");$_eachcomment[parseInt($_eachtemp[0])]=decodeURIComponent($_eachtemp[1]);}}
if($_eachcomment[0]){vschess.pfchess[$chessid].attr("c",$_eachcomment[0]);}
for($i=0;$i<$_zouqi_each.length;++$i){if($_eachcomment[$i+1]){$pfdom.append('<div m="'+$_zouqi_each[$i]+'" c="'+$_eachcomment[$i+1]+'"></div>');}
else{$pfdom.append('<div m="'+$_zouqi_each[$i]+'"></div>');}
$pfdom=$pfdom.children("div");}
$pfdom=vschess.pfchess[$chessid];}}
catch(e)
{$pfdom=vschess.pfchess[$chessid]=$('<div version="2" win="*" create-time="*" m="rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1"></div>');}}
vschess.pfreload[$chessid]=function(){vschess.pf2str[$chessid]=function(){var $pfthis;$zouqi_each.length=0;vschess.comments[$chessid].length=0;if($pfdom.children("div[default]").length==0){$pfthis=$pfdom.children("div:eq(0)").attr("default",true);}
else{$pfthis=$pfdom.children("div[default]");}
var $pfresult=$pfdom.attr("win");if($pfresult=="1-0"){vschess.result[$chessid]=3;}
else if($pfresult=="0-1"){vschess.result[$chessid]=0;}
else if($pfresult=="1/2-1/2"){vschess.result[$chessid]=1;}
else{vschess.result[$chessid]=2;}
if($pfdom.attr("c")){vschess.comments[$chessid][0]=$pfdom.attr("c");}
else{vschess.comments[$chessid][0]="";}
vschess.beginfen[$chessid]=vschess.pfchess[$chessid].attr("m");vschess.currentfen[$chessid]=vschess.pfchess[$chessid].attr("m");$fen=vschess.pfchess[$chessid].attr("m");for($i=1;$pfthis.length>0;++$i){$fen+=","+$pfthis.attr("m");$zouqi_each[$i-1]=$pfthis.attr("m");vschess.comments[$chessid][$i]="";if($pfthis.attr("c")){vschess.comments[$chessid][$i]=$pfthis.attr("c");}
if($pfthis.children("div[default]").length==0){$pfthis=$pfthis.children("div:eq(0)").attr("default",true);}
else{$pfthis=$pfthis.children("div[default]");}}};vschess.pf2str[$chessid]();$jumian=vschess.beginfen[$chessid].split(" ");$beginplayer=$jumian[1];$beginround=parseInt($jumian[5]);$currentplayer=$jumian[1];$currentround=parseInt($jumian[5]);$jumian_each.length=0;$beginround=$beginround<1?1:$beginround;$jumian=$jumian[0].replace(/1/g,"*").replace(/2/g,"**").replace(/3/g,"***").replace(/4/g,"****").replace(/5/g,"*****").replace(/6/g,"******").replace(/7/g,"*******").replace(/8/g,"********").replace(/9/g,"*********").replace(/\//g,"").split("");for($i=0;$i<=$zouqi_each.length;++$i){if($i>0){$zouqi_each[$i-1]=$zouqi_each[$i-1].split("");var $jumian_each_from=(function(){switch($zouqi_each[$i-1][0]){case"a":return(9-parseInt($zouqi_each[$i-1][1]))*9+0;case"b":return(9-parseInt($zouqi_each[$i-1][1]))*9+1;case"c":return(9-parseInt($zouqi_each[$i-1][1]))*9+2;case"d":return(9-parseInt($zouqi_each[$i-1][1]))*9+3;case"e":return(9-parseInt($zouqi_each[$i-1][1]))*9+4;case"f":return(9-parseInt($zouqi_each[$i-1][1]))*9+5;case"g":return(9-parseInt($zouqi_each[$i-1][1]))*9+6;case"h":return(9-parseInt($zouqi_each[$i-1][1]))*9+7;case"i":return(9-parseInt($zouqi_each[$i-1][1]))*9+8;}})();var $jumian_each_to=(function(){switch($zouqi_each[$i-1][2]){case"a":return(9-parseInt($zouqi_each[$i-1][3]))*9+0;case"b":return(9-parseInt($zouqi_each[$i-1][3]))*9+1;case"c":return(9-parseInt($zouqi_each[$i-1][3]))*9+2;case"d":return(9-parseInt($zouqi_each[$i-1][3]))*9+3;case"e":return(9-parseInt($zouqi_each[$i-1][3]))*9+4;case"f":return(9-parseInt($zouqi_each[$i-1][3]))*9+5;case"g":return(9-parseInt($zouqi_each[$i-1][3]))*9+6;case"h":return(9-parseInt($zouqi_each[$i-1][3]))*9+7;case"i":return(9-parseInt($zouqi_each[$i-1][3]))*9+8;}})();}
if($i==0){$jumian_each[0]=$jumian;}
else{$jumian_each[$i]=[];for($j=0;$j<90;++$j){if($j==$jumian_each_from){$jumian_each[$i][$j]="*";}
else if($j==$jumian_each_to){$jumian_each[$i][$j]=$jumian_each[$i-1][$jumian_each_from];}
else{$jumian_each[$i][$j]=$jumian_each[$i-1][$j];}}}}
vschess.situation[$chessid]=$jumian_each;$chinesestep=(function(){var $chinese=vschess.chinesesteps($fen);vschess.chinesestep[$chessid]=$chinese;$str="<li class=\"start\" name=\"0\">==== 棋局开始"+(vschess.comments[$chessid][0]?"*":"")+" ====</li>";if($beginplayer=="b"){for($i=1;$i<$chinese.length;++$i){if($i==1){$str+="<li class=\"stepnum\">"+$beginround+".</li>";$str+="<li class=\"step\" style=\"cursor: default;\"></li>";$str+="<li class=\"step\" name=\"1\">"+$chinese[$i]+(vschess.comments[$chessid][$i]?"*":"")+"</li>";}
else{if(!($i%2)){$str+="<li class=\"stepnum\">"+($i/2+$beginround)+".</li>";}
$str+="<li class=\"step\" name=\""+$i+"\">"+$chinese[$i]+(vschess.comments[$chessid][$i]?"*":"")+"</li>";}}}
else{for($i=1;$i<$chinese.length;++$i){if($i%2){$str+="<li class=\"stepnum\">"+(($i-1)/2+$beginround)+".</li>";}
$str+="<li class=\"step\" name=\""+$i+"\">"+$chinese[$i]+(vschess.comments[$chessid][$i]?"*":"")+"</li>";}}
return $str;})();$chinesepgn=(function(){var $chinese=vschess.chinesestep[$chessid];$str="[Game \"Chinese Chess\"]\n[FEN \""+vschess.beginfen[$chessid]+"\"]\n"+(vschess.comments[$chessid][0]?"{"+vschess.comments[$chessid][0]+"}\n":"");if($beginplayer=="b"){for($i=1;$i<$chinese.length;++$i){if($i==1){$str+=$beginround+".          "+$chinese[$i]+(vschess.comments[$chessid][$i]?"\n{"+vschess.comments[$chessid][$i]+"}":"")+"\n";}
else{if(!($i%2)){$str+=($i/2+$beginround)+". ";}
$str+=$chinese[$i]+(vschess.comments[$chessid][$i]?"\n{"+vschess.comments[$chessid][$i]+"}":"");if(vschess.comments[$chessid][$i]&&!($i%2)&&$i!=$chinese.length-1){$str+="\n"+(($i)/2+$beginround)+".         ";}
if(!($i%2)){$str+=" ";}
else{$str+="\n";}}}}
else{for($i=1;$i<$chinese.length;++$i){if($i%2){$str+=(($i-1)/2+$beginround)+". ";}
$str+=$chinese[$i]+(vschess.comments[$chessid][$i]?"\n{"+vschess.comments[$chessid][$i]+"}":"");if(vschess.comments[$chessid][$i]&&$i%2&&$i!=$chinese.length-1){$str+="\n"+(($i-1)/2+$beginround)+".         ";}
if($i%2){$str+=" ";}
else{$str+="\n";}}}
return $str;})();$chinesestepm=(function(){var $chinese=vschess.chinesesteps($fen,true);vschess.chinesestepm[$chessid]=$chinese;$str="<li class=\"start\" name=\"0\">==== 棋局开始"+(vschess.comments[$chessid][0]?"*":"")+" ====</li>";if($beginplayer=="b"){for($i=1;$i<$chinese.length;++$i){if($i==1){$str+="<li class=\"stepnum\">"+$beginround+".</li>";$str+="<li class=\"step\" style=\"cursor: default;\"></li>";$str+="<li class=\"step\" name=\"1\">"+$chinese[$i]+(vschess.comments[$chessid][$i]?"*":"")+"</li>";}
else{if(!($i%2)){$str+="<li class=\"stepnum\">"+($i/2+$beginround)+".</li>";}
$str+="<li class=\"step\" name=\""+$i+"\">"+$chinese[$i]+(vschess.comments[$chessid][$i]?"*":"")+"</li>";}}}
else{for($i=1;$i<$chinese.length;++$i){if($i%2){$str+="<li class=\"stepnum\">"+(($i-1)/2+$beginround)+".</li>";}
$str+="<li class=\"step\" name=\""+$i+"\">"+$chinese[$i]+(vschess.comments[$chessid][$i]?"*":"")+"</li>";}}
return $str;})();$chinesepgnm=(function(){var $chinese=vschess.chinesestepm[$chessid];$str="[Game \"Chinese Chess\"]\n[FEN \""+vschess.turnfen(vschess.beginfen[$chessid])+"\"]\n"+(vschess.comments[$chessid][0]?"{"+vschess.comments[$chessid][0]+"}\n":"");if($beginplayer=="b"){for($i=1;$i<$chinese.length;++$i){if($i==1){$str+=$beginround+".          "+$chinese[$i]+(vschess.comments[$chessid][$i]?"\n{"+vschess.comments[$chessid][$i]+"}":"")+"\n";}
else{if(!($i%2)){$str+=($i/2+$beginround)+". ";}
$str+=$chinese[$i]+(vschess.comments[$chessid][$i]?"\n{"+vschess.comments[$chessid][$i]+"}":"");if(vschess.comments[$chessid][$i]&&!($i%2)&&$i!=$chinese.length-1){$str+="\n"+(($i)/2+$beginround)+".         ";}
if(!($i%2)){$str+=" ";}
else{$str+="\n";}}}}
else{for($i=1;$i<$chinese.length;++$i){if($i%2){$str+=(($i-1)/2+$beginround)+". ";}
$str+=$chinese[$i]+(vschess.comments[$chessid][$i]?"\n{"+vschess.comments[$chessid][$i]+"}":"");if(vschess.comments[$chessid][$i]&&$i%2&&$i!=$chinese.length-1){$str+="\n"+(($i-1)/2+$beginround)+".         ";}
if($i%2){$str+=" ";}
else{$str+="\n";}}}
return $str;})();$wxfstep=(function(){var $wxf=vschess.wxfsteps($fen);vschess.wxfstep[$chessid]=$wxf;$str="<li class=\"start\" name=\"0\">==== 棋局开始"+(vschess.comments[$chessid][0]?"*":"")+" ====</li>";if($beginplayer=="b"){for($i=1;$i<$wxf.length;++$i){if($i==1){$str+="<li class=\"stepnum\">"+$beginround+".</li>";$str+="<li class=\"step\" style=\"cursor: default;\"></li>";$str+="<li class=\"step\" name=\"1\">"+$wxf[$i]+(vschess.comments[$chessid][$i]?"*":"")+"</li>";}
else{if(!($i%2)){$str+="<li class=\"stepnum\">"+($i/2+$beginround)+".</li>";}
$str+="<li class=\"step\" name=\""+$i+"\">"+$wxf[$i]+(vschess.comments[$chessid][$i]?"*":"")+"</li>";}}}
else{for($i=1;$i<$wxf.length;++$i){if($i%2){$str+="<li class=\"stepnum\">"+(($i-1)/2+$beginround)+".</li>";}
$str+="<li class=\"step\" name=\""+$i+"\">"+$wxf[$i]+(vschess.comments[$chessid][$i]?"*":"")+"</li>";}}
return $str;})();$wxfpgn=(function(){var $wxf=vschess.wxfsteps($fen);$str="[Game \"Chinese Chess\"]\n[FEN \""+vschess.beginfen[$chessid]+"\"]\n[Format \"WXF\"]\n"+(vschess.comments[$chessid][0]?"{"+vschess.comments[$chessid][0]+"}\n":"");if($beginplayer=="b"){for($i=1;$i<$wxf.length;++$i){if($i==1){$str+=$beginround+".      "+$wxf[$i]+(vschess.comments[$chessid][$i]?"\n{"+vschess.comments[$chessid][$i]+"}":"")+"\n";}
else{if(!($i%2)){$str+=($i/2+$beginround)+". ";}
$str+=$wxf[$i]+(vschess.comments[$chessid][$i]?"\n{"+vschess.comments[$chessid][$i]+"}":"");if(vschess.comments[$chessid][$i]&&!($i%2)&&$i!=$wxf.length-1){$str+="\n"+(($i)/2+$beginround)+".     ";}
if(!($i%2)){$str+=" ";}
else{$str+="\n";}}}}
else{for($i=1;$i<$wxf.length;++$i){if($i%2){$str+=(($i-1)/2+$beginround)+". ";}
$str+=$wxf[$i]+(vschess.comments[$chessid][$i]?"\n{"+vschess.comments[$chessid][$i]+"}":"");if(vschess.comments[$chessid][$i]&&$i%2&&$i!=$wxf.length-1){$str+="\n"+(($i-1)/2+$beginround)+".     ";}
if($i%2){$str+=" ";}
else{$str+="\n";}}}
return $str;})();$wxfstepm=(function(){var $wxf=vschess.wxfsteps($fen,true);vschess.wxfstepm[$chessid]=$wxf;$str="<li class=\"start\" name=\"0\">==== 棋局开始"+(vschess.comments[$chessid][0]?"*":"")+" ====</li>";if($beginplayer=="b"){for($i=1;$i<$wxf.length;++$i){if($i==1){$str+="<li class=\"stepnum\">"+$beginround+".</li>";$str+="<li class=\"step\" style=\"cursor: default;\"></li>";$str+="<li class=\"step\" name=\"1\">"+$wxf[$i]+(vschess.comments[$chessid][$i]?"*":"")+"</li>";}
else{if(!($i%2)){$str+="<li class=\"stepnum\">"+($i/2+$beginround)+".</li>";}
$str+="<li class=\"step\" name=\""+$i+"\">"+$wxf[$i]+(vschess.comments[$chessid][$i]?"*":"")+"</li>";}}}
else{for($i=1;$i<$wxf.length;++$i){if($i%2){$str+="<li class=\"stepnum\">"+(($i-1)/2+$beginround)+".</li>";}
$str+="<li class=\"step\" name=\""+$i+"\">"+$wxf[$i]+(vschess.comments[$chessid][$i]?"*":"")+"</li>";}}
return $str;})();$wxfpgnm=(function(){var $wxf=vschess.wxfsteps($fen,true);$str="[Game \"Chinese Chess\"]\n[FEN \""+vschess.turnfen(vschess.beginfen[$chessid])+"\"]\n[Format \"WXF\"]\n"+(vschess.comments[$chessid][0]?"{"+vschess.comments[$chessid][0]+"}\n":"");if($beginplayer=="b"){for($i=1;$i<$wxf.length;++$i){if($i==1){$str+=$beginround+".      "+$wxf[$i]+(vschess.comments[$chessid][$i]?"\n{"+vschess.comments[$chessid][$i]+"}":"")+"\n";}
else{if(!($i%2)){$str+=($i/2+$beginround)+". ";}
$str+=$wxf[$i]+(vschess.comments[$chessid][$i]?"\n{"+vschess.comments[$chessid][$i]+"}":"");if(vschess.comments[$chessid][$i]&&!($i%2)&&$i!=$wxf.length-1){$str+="\n"+(($i)/2+$beginround)+".     ";}
if(!($i%2)){$str+=" ";}
else{$str+="\n";}}}}
else{for($i=1;$i<$wxf.length;++$i){if($i%2){$str+=(($i-1)/2+$beginround)+". ";}
$str+=$wxf[$i]+(vschess.comments[$chessid][$i]?"\n{"+vschess.comments[$chessid][$i]+"}":"");if(vschess.comments[$chessid][$i]&&$i%2&&$i!=$wxf.length-1){$str+="\n"+(($i-1)/2+$beginround)+".     ";}
if($i%2){$str+=" ";}
else{$str+="\n";}}}
return $str;})();$iccsstep=(function(){var $iccs=vschess.iccssteps($fen);vschess.iccsstep[$chessid]=$iccs;$str="<li class=\"start\" name=\"0\">==== 棋局开始"+(vschess.comments[$chessid][0]?"*":"")+" ====</li>";if($beginplayer=="b"){for($i=1;$i<$iccs.length;++$i){if($i==1){$str+="<li class=\"stepnum\">"+$beginround+".</li>";$str+="<li class=\"step\" style=\"cursor: default;\"></li>";$str+="<li class=\"step\" name=\"1\">"+$iccs[$i]+(vschess.comments[$chessid][$i]?"*":"")+"</li>";}
else{if(!($i%2)){$str+="<li class=\"stepnum\">"+($i/2+$beginround)+".</li>";}
$str+="<li class=\"step\" name=\""+$i+"\">"+$iccs[$i]+(vschess.comments[$chessid][$i]?"*":"")+"</li>";}}}
else{for($i=1;$i<$iccs.length;++$i){if($i%2){$str+="<li class=\"stepnum\">"+(($i-1)/2+$beginround)+".</li>";}
$str+="<li class=\"step\" name=\""+$i+"\">"+$iccs[$i]+(vschess.comments[$chessid][$i]?"*":"")+"</li>";}}
return $str;})();$iccspgn=(function(){var $iccs=vschess.iccssteps($fen);$str="[Game \"Chinese Chess\"]\n[FEN \""+vschess.beginfen[$chessid]+"\"]\n[Format \"ICCS\"]\n"+(vschess.comments[$chessid][0]?"{"+vschess.comments[$chessid][0]+"}\n":"");if($beginplayer=="b"){for($i=1;$i<$iccs.length;++$i){if($i==1){$str+=$beginround+".       "+$iccs[$i]+(vschess.comments[$chessid][$i]?"\n{"+vschess.comments[$chessid][$i]+"}":"")+"\n";}
else{if(!($i%2)){$str+=($i/2+$beginround)+". ";}
$str+=$iccs[$i]+(vschess.comments[$chessid][$i]?"\n{"+vschess.comments[$chessid][$i]+"}":"");if(vschess.comments[$chessid][$i]&&!($i%2)&&$i!=$iccs.length-1){$str+="\n"+(($i)/2+$beginround)+".      ";}
if(!($i%2)){$str+=" ";}
else{$str+="\n";}}}}
else{for($i=1;$i<$iccs.length;++$i){if($i%2){$str+=(($i-1)/2+$beginround)+". ";}
$str+=$iccs[$i]+(vschess.comments[$chessid][$i]?"\n{"+vschess.comments[$chessid][$i]+"}":"");if(vschess.comments[$chessid][$i]&&$i%2&&$i!=$iccs.length-1){$str+="\n"+(($i-1)/2+$beginround)+".      ";}
if($i%2){$str+=" ";}
else{$str+="\n";}}}
return $str;})();$iccsstepm=(function(){var $iccs=vschess.iccssteps($fen,true);vschess.iccsstepm[$chessid]=$iccs;$str="<li class=\"start\" name=\"0\">==== 棋局开始"+(vschess.comments[$chessid][0]?"*":"")+" ====</li>";if($beginplayer=="b"){for($i=1;$i<$iccs.length;++$i){if($i==1){$str+="<li class=\"stepnum\">"+$beginround+".</li>";$str+="<li class=\"step\" style=\"cursor: default;\"></li>";$str+="<li class=\"step\" name=\"1\">"+$iccs[$i]+(vschess.comments[$chessid][$i]?"*":"")+"</li>";}
else{if(!($i%2)){$str+="<li class=\"stepnum\">"+($i/2+$beginround)+".</li>";}
$str+="<li class=\"step\" name=\""+$i+"\">"+$iccs[$i]+(vschess.comments[$chessid][$i]?"*":"")+"</li>";}}}
else{for($i=1;$i<$iccs.length;++$i){if($i%2){$str+="<li class=\"stepnum\">"+(($i-1)/2+$beginround)+".</li>";}
$str+="<li class=\"step\" name=\""+$i+"\">"+$iccs[$i]+(vschess.comments[$chessid][$i]?"*":"")+"</li>";}}
return $str;})();$iccspgnm=(function(){var $iccs=vschess.iccssteps($fen,true);$str="[Game \"Chinese Chess\"]\n[FEN \""+vschess.turnfen(vschess.beginfen[$chessid])+"\"]\n[Format \"ICCS\"]\n"+(vschess.comments[$chessid][0]?"{"+vschess.comments[$chessid][0]+"}\n":"");if($beginplayer=="b"){for($i=1;$i<$iccs.length;++$i){if($i==1){$str+=$beginround+".       "+$iccs[$i]+(vschess.comments[$chessid][$i]?"\n{"+vschess.comments[$chessid][$i]+"}":"")+"\n";}
else{if(!($i%2)){$str+=($i/2+$beginround)+". ";}
$str+=$iccs[$i]+(vschess.comments[$chessid][$i]?"\n{"+vschess.comments[$chessid][$i]+"}":"");if(vschess.comments[$chessid][$i]&&!($i%2)&&$i!=$iccs.length-1){$str+="\n"+(($i)/2+$beginround)+".      ";}
if(!($i%2)){$str+=" ";}
else{$str+="\n";}}}}
else{for($i=1;$i<$iccs.length;++$i){if($i%2){$str+=(($i-1)/2+$beginround)+". ";}
$str+=$iccs[$i]+(vschess.comments[$chessid][$i]?"\n{"+vschess.comments[$chessid][$i]+"}":"");if(vschess.comments[$chessid][$i]&&$i%2&&$i!=$iccs.length-1){$str+="\n"+(($i-1)/2+$beginround)+".      ";}
if($i%2){$str+=" ";}
else{$str+="\n";}}}
return $str;})();var $bfen=vschess.beginfen[$chessid].split(" ");if($bfen[0]!="rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR"||$bfen[1]=="b"){$normalstart=false;}
else{$normalstart=true;}
if($normalstart===true){var $srccol,$dstcol,$srccolm,$dstcolm,$src;$saveqq=$saveqqm="1 "+$zouqi_each.length+" ";for($i=0;$i<$zouqi_each.length;++$i){switch($zouqi_each[$i][0]){case"a":$srccol=8;$srccolm=0;break;case"b":$srccol=7;$srccolm=1;break;case"c":$srccol=6;$srccolm=2;break;case"d":$srccol=5;$srccolm=3;break;case"e":$srccol=4;$srccolm=4;break;case"f":$srccol=3;$srccolm=5;break;case"g":$srccol=2;$srccolm=6;break;case"h":$srccol=1;$srccolm=7;break;case"i":$srccol=0;$srccolm=8;break;}
switch($zouqi_each[$i][2]){case"a":$dstcol=8;$dstcolm=0;break;case"b":$dstcol=7;$dstcolm=1;break;case"c":$dstcol=6;$dstcolm=2;break;case"d":$dstcol=5;$dstcolm=3;break;case"e":$dstcol=4;$dstcolm=4;break;case"f":$dstcol=3;$dstcolm=5;break;case"g":$dstcol=2;$dstcolm=6;break;case"h":$dstcol=1;$dstcolm=7;break;case"i":$dstcol=0;$dstcolm=8;break;}
$src=(9-parseInt($zouqi_each[$i][1]))*9+(8-$srccol);switch($jumian_each[$i][$src]){case"R":$saveqq+="23";$saveqqm+="23";break;case"N":$saveqq+="21";$saveqqm+="21";break;case"B":$saveqq+="19";$saveqqm+="19";break;case"A":$saveqq+="17";$saveqqm+="17";break;case"K":$saveqq+="16";$saveqqm+="16";break;case"C":$saveqq+="25";$saveqqm+="25";break;case"P":$saveqq+="27";$saveqqm+="27";break;case"r":$saveqq+="7";$saveqqm+="7";break;case"n":$saveqq+="5";$saveqqm+="5";break;case"b":$saveqq+="3";$saveqqm+="3";break;case"a":$saveqq+="1";$saveqqm+="1";break;case"k":$saveqq+="0";$saveqqm+="0";break;case"c":$saveqq+="9";$saveqqm+="9";break;case"p":$saveqq+="11";$saveqqm+="11";break;}
$saveqq+=" 32 "+(($i+1)%2)+" "+$zouqi_each[$i][1]+" "+$srccolm+" "+$zouqi_each[$i][3]+" "+$dstcolm+" 0 "+($i+1)+" 0 ";$saveqqm+=" 32 "+(($i+1)%2)+" "+$zouqi_each[$i][1]+" "+$srccol+" "+$zouqi_each[$i][3]+" "+$dstcol+" 0 "+($i+1)+" 0 ";}}
vschess.setsteps[$chessid]=function(){vschess.chinesehtml[$chessid]=$chinesestep;vschess.chinesehtmlm[$chessid]=$chinesestepm;vschess.chinesepgn[$chessid]=$chinesepgn;vschess.chinesepgnm[$chessid]=$chinesepgnm;vschess.wxfhtml[$chessid]=$wxfstep;vschess.wxfhtmlm[$chessid]=$wxfstepm;vschess.wxfpgn[$chessid]=$wxfpgn;vschess.wxfpgnm[$chessid]=$wxfpgnm;vschess.iccshtml[$chessid]=$iccsstep;vschess.iccsmhtml[$chessid]=$iccsstepm;vschess.iccspgn[$chessid]=$iccspgn;vschess.iccspgnm[$chessid]=$iccspgnm;vschess.saveqq[$chessid]=$saveqq;vschess.saveqqm[$chessid]=$saveqqm;};vschess.setsteps[$chessid]();$this.find("ul.steps").html($chinesestep);if(IE6){$this.find("ul.steps li[name]").hover(function(){$(this).addClass("hover");},function(){$(this).removeClass("hover");});}};vschess.pfreload[$chessid]();if($arguments.live=="view"){$this.find("input.vsbar_ctrl,input.vsbar_time").hide();$this.find("input.vsbar_view").show();}
if($arguments.live=="play"){$this.find("input.vsbar_ctrl,input.vsbar_time").hide();$this.find("input.vsbar_play,input.vsbar_stop").show();}
vschess.senddom[$chessid]=function(){if(!vschess.livepause[$chessid]||arguments[0]===true){var $pfstr='<n version="2"';$pfstr+=' win="'+vschess.pfchess[$chessid].attr("win")+'"';$pfstr+=' create-time="'+vschess.pfchess[$chessid].attr("create-time")+'"';$pfstr+=' m="'+vschess.pfchess[$chessid].attr("m")+'"';$pfstr+=' step="'+vschess.api.id($chessid).step()+'"';if(arguments[0]===true){$pfstr+=' stop="1"';}
if(vschess.pfchess[$chessid].attr("c")){$pfstr+=' c="'+vschess.pfchess[$chessid].attr("c")+'"';}
$pfstr+='>'+vschess.pfchess[$chessid].html().replace(/<div/ig,"<n").replace(/<\/div>/ig,"</n>").replace(/>([\s]*)</g,"><")+"</n>";$.post(vschess.server+"action=live&id="+$arguments.id
+"&mode=setdom",{dom:$pfstr});}};vschess.automove[$chessid]=setInterval(function(){if(!$autoMoveState&&vschess.play[$chessid]==1&&vschess.time_each[$chessid]%vschess.time[$chessid]==0){$this.find("img.vschess_box").css("background-image","");vschess.api.id($chessid).hidenodelist();++vschess.step[$chessid];if(vschess.step[$chessid]>=0){$this.find("input.vsbar_first,input.vsbar_prev10,input.vsbar_prev").attr("disabled",false);}
if(vschess.step[$chessid]<$zouqi_each.length){$this.find("input.vsbar_next,input.vsbar_next10,input.vsbar_last").attr("disabled",false);}
if(vschess.step[$chessid]==$zouqi_each.length){vschess.play[$chessid]=2;$this.find("input.vsbar_ctrl").val("播放").removeClass("vsbar_pause");$this.find("input.vsbar_next,input.vsbar_next10,input.vsbar_last").attr("disabled","disabled");}
if(vschess.step[$chessid]>$jumian_each.length-1){vschess.step[$chessid]=$jumian_each.length-1;}
var $from,$to;for($i=0;$i<90;++$i){if($jumian_each[vschess.step[$chessid]-1][$i]!="*"&&$jumian_each[vschess.step[$chessid]][$i]=="*"){$from=$i;break;}}
for($i=0;$i<90;++$i){if($jumian_each[vschess.step[$chessid]-1][$i]!=$jumian_each[vschess.step[$chessid]][$i]&&$i!=$from){$to=$i;break;}}
if(vschess.time[$chessid]!=1&&vschess.animate[$chessid]==1){switch(vschess.turn[$chessid]){case 1:$from=89-$from;$to=89-$to;break;case 2:$from=8+$from-$from%9*2;$to=8+$to-$to%9*2;break;case 3:$from=81-$from+$from%9*2;$to=81-$to+$to%9*2;break;}
var $floatbox=$this.find("img.vschess_boxfloat");var $frombox=$this.find("img.vschess_box:eq("+$from+")");var $tobox=$this.find("img.vschess_box:eq("+$to+")");$floatbox.attr("src",(function(){if(IE6){return $frombox.attr("src").replace(".png","s.png");}
else{return $frombox.attr("src");}})()).css({top:$frombox.offset().top-$this.offset().top,left:$frombox.offset().left-$this.offset().left}).show();$frombox.attr({src:vschess.pics.no}).css("background-image","url("+vschess.pics.nos+")");if(IE6){switch($from){case 0:$frombox.attr("src",vschess.picpath+"ie6/nolts.png");break;case 8:$frombox.attr("src",vschess.picpath+"ie6/norts.png");break;case 81:$frombox.attr("src",vschess.picpath+"ie6/nolbs.png");break;case 89:$frombox.attr("src",vschess.picpath+"ie6/norbs.png");break;case 9:case 18:case 27:case 36:case 45:case 54:case 63:case 72:$frombox.attr("src",vschess.picpath+"ie6/nols.png");break;case 17:case 26:case 35:case 44:case 53:case 62:case 71:case 80:$frombox.attr("src",vschess.picpath+"ie6/nors.png");break;case 37:case 38:case 39:case 40:case 41:case 42:case 43:case 82:case 83:case 84:case 85:case 86:case 87:case 88:$frombox.attr("src",vschess.picpath+"ie6/nobs.png");break;case 46:case 47:case 48:case 49:case 50:case 51:case 52:case 1:case 2:case 3:case 4:case 5:case 6:case 7:$frombox.attr("src",vschess.picpath+"ie6/nots.png");break;default:$frombox.attr("src",vschess.picpath+"ie6/nos.png");break;}}
var animateFinish=function(){$baiqi($jumian_each[vschess.step[$chessid]],vschess.step[$chessid]);$floatbox.hide();if(vschess.soundpath&&vschess.soundState[$chessid]==1&&vschess.step[$chessid]>0){switch(vschess.turn[$chessid]){case 1:$to=89-$to;break;case 2:$to=8+$to-$to%9*2;break;case 3:$to=81-$to+$to%9*2;break;}
if(vschess.chineseSoundStatus[$chessid]==1&&(vschess.time[$chessid]>=20||$arguments.live=="view")){vschess.sound.step(vschess.chinesestep[$chessid][vschess.step[$chessid]],$chessid);}
else{if(vschess.checklose($jumian_each[vschess.step[$chessid]],$currentplayer)){vschess.sound.lose($chessid);}
else if(vschess.checkthreat($jumian_each[vschess.step[$chessid]],$currentplayer)){vschess.sound.check($chessid);}
else if(($jumian_each[vschess.step[$chessid]][$to]=="C"||$jumian_each[vschess.step[$chessid]][$to]=="c")&&$jumian_each[vschess.step[$chessid]-1][$to]!="*"){vschess.sound.bomb($chessid);}
else if($jumian_each[vschess.step[$chessid]-1][$to]!="*"){vschess.sound.eat($chessid);}
else{vschess.sound.move($chessid);}}}
if(!IE){vschess.api.id($chessid);if(vschess.turn[$chessid]>1){vschess.clip[$chessid].setText(vschess.turnfen(vschess.api.currentfen()));}
else{vschess.clip[$chessid].setText(vschess.api.currentfen());}}
if(typeof $function=="function"){$function();}};if(WebKit){var deltaX=$tobox.offset().left-$frombox.offset().left;var deltaY=$tobox.offset().top-$frombox.offset().top;var handler=function(){$floatbox[0].removeEventListener("webkitTransitionEnd",handler);animateFinish();$floatbox.css("-webkit-transform","translate(0px, 0px)");};$floatbox[0].addEventListener("webkitTransitionEnd",handler);$floatbox.css("-webkit-transform","translate("+deltaX+"px, "+deltaY+"px)");}
else{$floatbox.animate({top:$tobox.offset().top-$this.offset().top,left:$tobox.offset().left-$this.offset().left},vschess.time[$chessid]==2?100:200,animateFinish);}}
else{$baiqi($jumian_each[vschess.step[$chessid]],vschess.step[$chessid]);if(vschess.soundpath&&vschess.soundState[$chessid]==1){if(vschess.chineseSoundStatus[$chessid]==1&&(vschess.time[$chessid]>=20||$arguments.live=="view")){vschess.sound.step(vschess.chinesestep[$chessid][vschess.step[$chessid]],$chessid);}
else{if(vschess.checklose($jumian_each[vschess.step[$chessid]],$currentplayer)){vschess.sound.lose($chessid);}
else if(vschess.checkthreat($jumian_each[vschess.step[$chessid]],$currentplayer)){vschess.sound.check($chessid);}
else if(($jumian_each[vschess.step[$chessid]][$to]=="C"||$jumian_each[vschess.step[$chessid]][$to]=="c")&&$jumian_each[vschess.step[$chessid]-1][$to]!="*"){vschess.sound.bomb($chessid);}
else if($jumian_each[vschess.step[$chessid]-1][$to]!="*"){vschess.sound.eat($chessid);}
else{vschess.sound.move($chessid);}}}
if(!IE){vschess.api.id($chessid);if(vschess.turn[$chessid]>1){vschess.clip[$chessid].setText(vschess.turnfen(vschess.api.currentfen()));}
else{vschess.clip[$chessid].setText(vschess.api.currentfen());}}}}
++vschess.time_each[$chessid];if(vschess.time_each[$chessid]>99){vschess.time_each[$chessid]=0;}},100);var $makefen=function($position){if(vschess.checkmove[$chessid]==1){var $R=0,$N=0,$B=0,$A=0,$K=0,$C=0,$P=0,$r=0,$n=0,$b=0,$a=0,$k=0,$c=0,$p=0,$Pcol=0,$pcol=0;for($i=0;$i<90;++$i){switch($position[$i]){case"R":++$R;break;case"r":++$r;break;case"N":++$N;break;case"n":++$n;break;case"C":++$C;break;case"c":++$c;break;case"K":{++$K;if($i!=66&&$i!=67&&$i!=68&&$i!=75&&$i!=76&&$i!=77&&$i!=84&&$i!=85&&$i!=86){$makefenerror="红帅的位置不对";return false;}
for($j=$i-9;$j>0;$j-=9){if($position[$j]=="*"){continue;}
if($position[$j]=="k"){$makefenerror="将帅面对面了";return false;}
if($position[$j]!="k"){break;}}
break;}
case"k":{++$k;if($i!=3&&$i!=4&&$i!=5&&$i!=12&&$i!=13&&$i!=14&&$i!=21&&$i!=22&&$i!=23){$makefenerror="黑将位置不对";return false;}
for($j=$i+9;$j<90;$j+=9){if($position[$j]=="*"){continue;}
if($position[$j]=="K"){$makefenerror="将帅面对面了";return false;}
if($position[$j]!="K"){break;}}
break;}
case"A":{++$A;if($i!=66&&$i!=68&&$i!=76&&$i!=84&&$i!=86){$makefenerror="红仕的位置不对";return false;}
break;}
case"a":{++$a;if($i!=3&&$i!=5&&$i!=13&&$i!=21&&$i!=23){$makefenerror="黑士的位置不对";return false;}
break;}
case"B":{++$B;if($i!=47&&$i!=51&&$i!=63&&$i!=67&&$i!=71&&$i!=83&&$i!=87){$makefenerror="红相的位置不对";return false;}
break;}
case"b":{++$b;if($i!=2&&$i!=6&&$i!=18&&$i!=22&&$i!=26&&$i!=38&&$i!=42){$makefenerror="黑象的位置不对";return false;}
break;}
case"P":{++$P;$Pcol=$i%9;if($i>=45&&$Pcol!=0&&$Pcol!=2&&$Pcol!=4&&$Pcol!=6&&$Pcol!=8){$makefenerror="红兵的位置不对";return false;}
if($i>=63){$makefenerror="红兵的位置不对";return false;}
break;}
case"p":{++$p;$pcol=$i%9;if($i<45&&$pcol!=0&&$pcol!=2&&$pcol!=4&&$pcol!=6&&$pcol!=8){$makefenerror="黑卒的位置不对";return false;}
if($i<27){$makefenerror="黑卒的位置不对";return false;}
break;}}}
if($position[45]=="P"&&$position[54]=="P"){$makefenerror="九路出现错误的重叠兵";return false;}
if($position[47]=="P"&&$position[56]=="P"){$makefenerror="七路出现错误的重叠兵";return false;}
if($position[49]=="P"&&$position[58]=="P"){$makefenerror="五路出现错误的重叠兵";return false;}
if($position[51]=="P"&&$position[60]=="P"){$makefenerror="三路出现错误的重叠兵";return false;}
if($position[53]=="P"&&$position[62]=="P"){$makefenerror="一路出现错误的重叠兵";return false;}
if($position[27]=="p"&&$position[36]=="p"){$makefenerror="１路出现错误的重叠卒";return false;}
if($position[29]=="p"&&$position[38]=="p"){$makefenerror="３路出现错误的重叠卒";return false;}
if($position[31]=="p"&&$position[40]=="p"){$makefenerror="５路出现错误的重叠卒";return false;}
if($position[33]=="p"&&$position[42]=="p"){$makefenerror="７路出现错误的重叠卒";return false;}
if($position[35]=="p"&&$position[44]=="p"){$makefenerror="９路出现错误的重叠卒";return false;}
if($R>2){$makefenerror="现在有"+$R+"个红车";return false;}
if($r>2){$makefenerror="现在有"+$r+"个黑车";return false;}
if($N>2){$makefenerror="现在有"+$N+"个红马";return false;}
if($n>2){$makefenerror="现在有"+$n+"个黑马";return false;}
if($B>2){$makefenerror="现在有"+$B+"个红相";return false;}
if($b>2){$makefenerror="现在有"+$b+"个黑象";return false;}
if($A>2){$makefenerror="现在有"+$A+"个红仕";return false;}
if($a>2){$makefenerror="现在有"+$a+"个黑士";return false;}
if($C>2){$makefenerror="现在有"+$C+"个红炮";return false;}
if($c>2){$makefenerror="现在有"+$c+"个黑炮";return false;}
if($P>5){$makefenerror="现在有"+$P+"个红兵";return false;}
if($p>5){$makefenerror="现在有"+$p+"个黑卒";return false;}
if($K>1){$makefenerror="现在有"+$K+"个红帅，红方到底听谁的呀";return false;}
if($k>1){$makefenerror="现在有"+$k+"个黑将，黑方到底听谁的呀";return false;}
if($K<1){$makefenerror="红方无帅是不行的，群龙无首，何谈胜利";return false;}
if($k<1){$makefenerror="黑方无将是不行的，群龙无首，何谈胜利";return false;}}
var $userfen="";for($i=0;$i<90;++$i){$userfen+=$position[$i];if($i%9==8&&$i!=89){$userfen+="/";}}
$userfen=$userfen.replace(/\*\*\*\*\*\*\*\*\*/g,"9").replace(/\*\*\*\*\*\*\*\*/g,"8").replace(/\*\*\*\*\*\*\*/g,"7").replace(/\*\*\*\*\*\*/g,"6").replace(/\*\*\*\*\*/g,"5").replace(/\*\*\*\*/g,"4").replace(/\*\*\*/g,"3").replace(/\*\*/g,"2").replace(/\*/g,"1");return $userfen;};var $changeeditfen=function(){var $checkposition=[];for($i=0;$i<90;++$i){var $thismanname=$this.find("img.vschess_box:eq("+$i+")").attr("src");$checkposition[$i]="*";if($thismanname==vschess.pics.rr||$thismanname==vschess.pics.rrs){$checkposition[$i]="R";}
if($thismanname==vschess.pics.rn||$thismanname==vschess.pics.rns){$checkposition[$i]="N";}
if($thismanname==vschess.pics.rb||$thismanname==vschess.pics.rbs){$checkposition[$i]="B";}
if($thismanname==vschess.pics.ra||$thismanname==vschess.pics.ras){$checkposition[$i]="A";}
if($thismanname==vschess.pics.rk||$thismanname==vschess.pics.rks){$checkposition[$i]="K";}
if($thismanname==vschess.pics.rc||$thismanname==vschess.pics.rcs){$checkposition[$i]="C";}
if($thismanname==vschess.pics.rp||$thismanname==vschess.pics.rps){$checkposition[$i]="P";}
if($thismanname==vschess.pics.br||$thismanname==vschess.pics.brs){$checkposition[$i]="r";}
if($thismanname==vschess.pics.bn||$thismanname==vschess.pics.bns){$checkposition[$i]="n";}
if($thismanname==vschess.pics.bb||$thismanname==vschess.pics.bbs){$checkposition[$i]="b";}
if($thismanname==vschess.pics.ba||$thismanname==vschess.pics.bas){$checkposition[$i]="a";}
if($thismanname==vschess.pics.bk||$thismanname==vschess.pics.bks){$checkposition[$i]="k";}
if($thismanname==vschess.pics.bc||$thismanname==vschess.pics.bcs){$checkposition[$i]="c";}
if($thismanname==vschess.pics.bp||$thismanname==vschess.pics.bps){$checkposition[$i]="p";}}
var $checktemp=vschess.checkmove[$chessid];vschess.checkmove[$chessid]=0;var $newfen=$makefen($checkposition);$newfen+=" "+$this.find("div.vschess_make :radio:checked").val();$newfen+=" - - 0 "+$this.find("input.vschess_setstep").val();$this.find("div.vschess_makebar input.vschess_editfen").val($newfen);vschess.checkmove[$chessid]=$checktemp;};var $usefen=function($thisfen){var $expresult;if($expresult=/([1-9rnhbeakcpRNHBEAKCP]{1,9}\/){9}[1-9rnhbeakcpRNHBEAKCP]{1,9} [w|b|r] - - [0-9]+ [0-9]+/.exec($thisfen)){$thisfen=$expresult[0];}
else if($expresult=/([1-9rnhbeakcpRNHBEAKCP]{1,9}\/){9}[1-9rnhbeakcpRNHBEAKCP]{1,9} [w|b|r]/.exec($thisfen)){$thisfen=$expresult[0]+" - - 0 1";}
else if($expresult=/([0-9]+) ([0-9]+) ([0-9]+) ([0-9]+) ([0-9]+) ([0-9]+) ([0-9]+) ([0-9]+) ([0-9]+) ([0-9]+) ([0-9]+) ([0-9]+) ([0-9]+) ([0-9]+) ([0-9]+) ([0-9]+) ([0-9]+) ([0-9]+) ([0-9]+) ([0-9]+) ([0-9]+) ([0-9]+) ([0-9]+) ([0-9]+) ([0-9]+) ([0-9]+) ([0-9]+) ([0-9]+) ([0-9]+) ([0-9]+) ([0-9]+) ([0-9]+)(?:[\s]+)\+([BbRr])/.exec($thisfen)){$thisfen=vschess.convertshijia($thisfen).split(":");$thisfen=$thisfen[0];}
else{$thisfen="rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1";}
$thisfen=$thisfen.split(" ");var $thisfensplit=$thisfen[0].replace(/1/g,"*").replace(/2/g,"**").replace(/3/g,"***").replace(/4/g,"****").replace(/5/g,"*****").replace(/6/g,"******").replace(/7/g,"*******").replace(/8/g,"********").replace(/9/g,"*********").replace(/\//g,"").split("");$this.find("img.vschess_box").each(function($index){switch($thisfensplit[$index]){case"R":$(this).attr("src",vschess.pics.rr);break;case"N":$(this).attr("src",vschess.pics.rn);break;case"B":$(this).attr("src",vschess.pics.rb);break;case"A":$(this).attr("src",vschess.pics.ra);break;case"K":$(this).attr("src",vschess.pics.rk);break;case"C":$(this).attr("src",vschess.pics.rc);break;case"P":$(this).attr("src",vschess.pics.rp);break;case"r":$(this).attr("src",vschess.pics.br);break;case"n":$(this).attr("src",vschess.pics.bn);break;case"b":$(this).attr("src",vschess.pics.bb);break;case"a":$(this).attr("src",vschess.pics.ba);break;case"k":$(this).attr("src",vschess.pics.bk);break;case"c":$(this).attr("src",vschess.pics.bc);break;case"p":$(this).attr("src",vschess.pics.bp);break;default:$(this).attr("src",vschess.pics.no);break;}});if($thisfen[1]=="b"){$this.find("div.vschess_make :radio[value='w']").attr("checked",false);$this.find("div.vschess_make :radio[value='b']").attr("checked","checked");}
else{$this.find("div.vschess_make :radio[value='b']").attr("checked",false);$this.find("div.vschess_make :radio[value='w']").attr("checked","checked");}
$this.find("div.vschess_make input.vschess_setstep").val($thisfen[5]);$changeeditfen();};var $getman=function($man){return $jumian_each[vschess.step[$chessid]][$man];};var $checkred=function($dom){if(typeof $dom=="string"){if(/\/r([r|n|b|a|k|c|p|s]{1,2})/g.exec($dom)){return true;}
else{return false;}}
else{if(/\/r([r|n|b|a|k|c|p|s]{1,2})/g.exec($($dom).attr("src"))){return true;}
else{return false;}}};var $checkblack=function($dom){if(typeof $dom=="string"){if(/\/b([r|n|b|a|k|c|p|s]{1,2})/g.exec($dom)){return true;}
else{return false;}}
else{if(/\/b([r|n|b|a|k|c|p|s]{1,2})/g.exec($($dom).attr("src"))){return true;}
else{return false;}}};var $checklegal=function($from,$to,$cplayer){if(arguments[3]!=true){switch(vschess.turn[$chessid]){case 1:$from=89-$from;$to=89-$to;break;case 2:$from=8+$from-$from%9*2;$to=8+$to-$to%9*2;break;case 3:$from=81-$from+$from%9*2;$to=81-$to+$to%9*2;break;}}
if($getman($to)=="K"||$getman($to)=="k"){return false;}
var $checkposition=[];$checkposition=$jumian_each[vschess.step[$chessid]].clone();$checkposition[$to]=$checkposition[$from];$checkposition[$from]="*";if(vschess.checkthreat($checkposition,$cplayer)){return false;}
switch($getman($from)){case"R":case"r":{if($getman($from)=="R"){switch($getman($to)){case"R":case"N":case"B":case"A":case"K":case"C":case"P":return false;}}
else{switch($getman($to)){case"r":case"n":case"b":case"a":case"k":case"c":case"p":return false;}}
if(Math.floor($from/9)==Math.floor($to/9)){if($from>$to){for($i=$from-1;$i>$to;--$i){if($getman($i)!="*"){return false;}}}
else{for($i=$from+1;$i<$to;++$i){if($getman($i)!="*"){return false;}}}}
else if(Math.abs($from-$to)%9==0){if($from>$to){for($i=$from-9;$i>$to;$i-=9){if($getman($i)!="*"){return false;}}}
else{for($i=$from+9;$i<$to;$i+=9){if($getman($i)!="*"){return false;}}}}
else{return false;}
break;}
case"N":case"n":{if($getman($from)=="N"){switch($getman($to)){case"R":case"N":case"B":case"A":case"K":case"C":case"P":return false;}}
else{switch($getman($to)){case"r":case"n":case"b":case"a":case"k":case"c":case"p":return false;}}
switch($from-$to){case 7:if($from%9>6||Math.floor($from/9)<1||$getman($from+1)!="*"){return false;}break;case 11:if($from%9<2||Math.floor($from/9)<1||$getman($from-1)!="*"){return false;}break;case 17:if($from%9>7||Math.floor($from/9)<2||$getman($from-9)!="*"){return false;}break;case 19:if($from%9<1||Math.floor($from/9)<2||$getman($from-9)!="*"){return false;}break;case-7:if($from%9<2||Math.floor($from/9)>8||$getman($from-1)!="*"){return false;}break;case-11:if($from%9>6||Math.floor($from/9)>8||$getman($from+1)!="*"){return false;}break;case-17:if($from%9<1||Math.floor($from/9)>7||$getman($from+9)!="*"){return false;}break;case-19:if($from%9>7||Math.floor($from/9)>7||$getman($from+9)!="*"){return false;}break;default:return false;break;}
break;}
case"C":case"c":{if($getman($from)=="C"){switch($getman($to)){case"R":case"N":case"B":case"A":case"K":case"C":case"P":return false;}}
else{switch($getman($to)){case"r":case"n":case"b":case"a":case"k":case"c":case"p":return false;}}
if(Math.floor($from/9)==Math.floor($to/9)&&$getman($to)=="*"){if($from>$to){for($i=$from-1;$i>$to;--$i){if($getman($i)!="*"){return false;}}}
else{for($i=$from+1;$i<$to;++$i){if($getman($i)!="*"){return false;}}}}
else if(Math.abs($from-$to)%9==0&&$getman($to)=="*"){if($from>$to){for($i=$from-9;$i>$to;$i-=9){if($getman($i)!="*"){return false;}}}
else{for($i=$from+9;$i<$to;$i+=9){if($getman($i)!="*"){return false;}}}}
else if(Math.floor($from/9)==Math.floor($to/9)&&$getman($to)!="*"){if($from>$to){var $cflag=0;for($i=$from-1;$i>$to;--$i){if($getman($i)!="*"){++$cflag;}}
if($cflag!=1){return false;}}
else{var $cflag=0;for($i=$from+1;$i<$to;++$i){if($getman($i)!="*"){++$cflag;}}
if($cflag!=1){return false;}}}
else if(Math.abs($from-$to)%9==0&&$getman($to)!="*"){if($from>$to){var $cflag=0;for($i=$from-9;$i>$to;$i-=9){if($getman($i)!="*"){++$cflag;}}
if($cflag!=1){return false;}}
else{var $cflag=0;for($i=$from+9;$i<$to;$i+=9){if($getman($i)!="*"){++$cflag;}}
if($cflag!=1){return false;}}}
else{return false;}
break;}
case"B":{switch($getman($to)){case"R":case"N":case"B":case"A":case"K":case"C":case"P":return false;}
switch($from){case 47:{if($to==63&&$getman(55)=="*"){return true;}
if($to==67&&$getman(57)=="*"){return true;}
return false;}
case 51:{if($to==71&&$getman(61)=="*"){return true;}
if($to==67&&$getman(59)=="*"){return true;}
return false;}
case 63:{if($to==47&&$getman(55)=="*"){return true;}
if($to==83&&$getman(73)=="*"){return true;}
return false;}
case 67:{if($to==47&&$getman(57)=="*"){return true;}
if($to==51&&$getman(59)=="*"){return true;}
if($to==83&&$getman(75)=="*"){return true;}
if($to==87&&$getman(77)=="*"){return true;}
return false;}
case 71:{if($to==51&&$getman(61)=="*"){return true;}
if($to==87&&$getman(79)=="*"){return true;}
return false;}
case 83:{if($to==63&&$getman(73)=="*"){return true;}
if($to==67&&$getman(75)=="*"){return true;}
return false;}
case 87:{if($to==67&&$getman(77)=="*"){return true;}
if($to==71&&$getman(79)=="*"){return true;}
return false;}}
break;}
case"b":{switch($getman($to)){case"r":case"n":case"b":case"a":case"k":case"c":case"p":return false;}
switch($from){case 2:{if($to==18&&$getman(10)=="*"){return true;}
if($to==22&&$getman(12)=="*"){return true;}
return false;}
case 6:{if($to==22&&$getman(14)=="*"){return true;}
if($to==26&&$getman(16)=="*"){return true;}
return false;}
case 18:{if($to==2&&$getman(10)=="*"){return true;}
if($to==38&&$getman(28)=="*"){return true;}
return false;}
case 22:{if($to==2&&$getman(12)=="*"){return true;}
if($to==6&&$getman(14)=="*"){return true;}
if($to==38&&$getman(30)=="*"){return true;}
if($to==42&&$getman(32)=="*"){return true;}
return false;}
case 26:{if($to==6&&$getman(16)=="*"){return true;}
if($to==42&&$getman(34)=="*"){return true;}
return false;}
case 38:{if($to==18&&$getman(28)=="*"){return true;}
if($to==22&&$getman(30)=="*"){return true;}
return false;}
case 42:{if($to==22&&$getman(32)=="*"){return true;}
if($to==26&&$getman(34)=="*"){return true;}
return false;}}
break;}
case"A":{switch($getman($to)){case"R":case"N":case"B":case"A":case"K":case"C":case"P":return false;}
if($from==66&&$to==76){return true;}
if($from==68&&$to==76){return true;}
if($from==84&&$to==76){return true;}
if($from==86&&$to==76){return true;}
if($from==76&&$to==66){return true;}
if($from==76&&$to==68){return true;}
if($from==76&&$to==84){return true;}
if($from==76&&$to==86){return true;}
return false;}
case"a":{switch($getman($to)){case"r":case"n":case"b":case"a":case"k":case"c":case"p":return false;}
if($from==3&&$to==13){return true;}
if($from==5&&$to==13){return true;}
if($from==21&&$to==13){return true;}
if($from==23&&$to==13){return true;}
if($from==13&&$to==3){return true;}
if($from==13&&$to==5){return true;}
if($from==13&&$to==21){return true;}
if($from==13&&$to==23){return true;}
return false;}
case"K":{switch($getman($to)){case"R":case"N":case"B":case"A":case"K":case"C":case"P":return false;}
if($to!=66&&$to!=67&&$to!=68&&$to!=75&&$to!=76&&$to!=77&&$to!=84&&$to!=85&&$to!=86){return false;}
if(Math.abs($from-$to)!=1&&Math.abs($from-$to)!=9){return false;}
break;}
case"k":{switch($getman($to)){case"r":case"n":case"b":case"a":case"k":case"c":case"p":return false;}
if($to!=3&&$to!=4&&$to!=5&&$to!=12&&$to!=13&&$to!=14&&$to!=21&&$to!=22&&$to!=23){return false;}
if(Math.abs($from-$to)!=1&&Math.abs($from-$to)!=9){return false;}
break;}
case"P":{switch($getman($to)){case"R":case"N":case"B":case"A":case"K":case"C":case"P":return false;}
if($from>44){if(($from-$to)!=9){return false;}}
else{switch($from-$to){case 9:break;case 1:case-1:{if(Math.floor($from/9)!=Math.floor($to/9)){return false;}
break;}
default:return false;break;}}
break;}
case"p":{switch($getman($to)){case"r":case"n":case"b":case"a":case"k":case"c":case"p":return false;}
if($from<45){if(($from-$to)!=-9){return false;}}
else{switch($from-$to){case-9:break;case 1:case-1:{if(Math.floor($from/9)!=Math.floor($to/9)){return false;}
break;}
default:return false;break;}}
break;}
default:return false;break;}
return true;};var $movechessman=function($movestrin){var $currentstepid=vschess.api.id($chessid).step(),$i;var $movethisdom=vschess.pfchess[$chessid];for($i=0;$i<$currentstepid;++$i){if($movethisdom.children("div[default]").length==0){$movethisdom=$movethisdom.children("div:eq(0)").attr("default",true);}
else{$movethisdom=$movethisdom.children("div[default]");}}
var $hasthisstep=false;if($movethisdom.children("div[m='"+$movestrin+"']").length>0){$hasthisstep=true;$movethisdom.children("div").removeAttr("default");$movethisdom.children("div[m='"+$movestrin+"']").attr("default",true);vschess.pfreload[$chessid]();if(arguments[1]===false){vschess.api.id($chessid).step($currentstepid);}
else{vschess.api.id($chessid).step($currentstepid+1);}
vschess.api.format(vschess.api.format());}
if(!$hasthisstep){$movethisdom.children("div").removeAttr("default");$movethisdom.append("<div m=\""+$movestrin+"\" default=\"true\"></div>");vschess.pfreload[$chessid]();vschess.api.id($chessid).step($currentstepid+1);vschess.api.format(vschess.api.format());}
var $to=(function(){var $coln,$col=$movestrin.toLowerCase().split("");switch($col[2]){case"a":$coln=0;break;case"b":$coln=1;break;case"c":$coln=2;break;case"d":$coln=3;break;case"e":$coln=4;break;case"f":$coln=5;break;case"g":$coln=6;break;case"h":$coln=7;break;case"i":$coln=8;break;}
return(9-parseInt($col[3]))*9+$coln;})();if(vschess.soundpath&&vschess.soundState[$chessid]==1){++$currentstepid;if(vschess.chineseSoundStatus[$chessid]==1){vschess.sound.step(vschess.chinesestep[$chessid][vschess.step[$chessid]],$chessid);}
else{if(vschess.checklose($jumian_each[$currentstepid],$currentplayer)){vschess.sound.lose($chessid);}
else if(vschess.checkthreat($jumian_each[$currentstepid],$currentplayer)){vschess.sound.check($chessid);}
else if(($jumian_each[$currentstepid][$to]=="C"||$jumian_each[$currentstepid][$to]=="c")&&$jumian_each[$currentstepid-1][$to]!="*"){vschess.sound.bomb($chessid);}
else if($jumian_each[$currentstepid-1][$to]!="*"){vschess.sound.eat($chessid);}
else{vschess.sound.move($chessid);}}}
if(vschess.autoMove[$chessid]==1){var $validSteps=[],$j,$k;for($j=0;$j<90;++$j){if($jumian_each[$currentstepid][$j]!="*"){if($currentplayer=="b"){if($jumian_each[$currentstepid][$j].toLowerCase()==$jumian_each[$currentstepid][$j]){for($k=0;$k<90;++$k){if($checklegal($j,$k,"b",true)){$validSteps.push([$j,$k]);}}}}
else{if($jumian_each[$currentstepid][$j].toUpperCase()==$jumian_each[$currentstepid][$j]){for($k=0;$k<90;++$k){if($checklegal($j,$k,"w",true)){$validSteps.push([$j,$k]);}}}}}}
if($validSteps.length==1){$autoMoveState=true;var $moveStep;switch($validSteps[0][0]%9){case 0:$moveStep="a";break;case 1:$moveStep="b";break;case 2:$moveStep="c";break;case 3:$moveStep="d";break;case 4:$moveStep="e";break;case 5:$moveStep="f";break;case 6:$moveStep="g";break;case 7:$moveStep="h";break;case 8:$moveStep="i";break;}
$moveStep+=9-Math.floor($validSteps[0][0]/9);switch($validSteps[0][1]%9){case 0:$moveStep+="a";break;case 1:$moveStep+="b";break;case 2:$moveStep+="c";break;case 3:$moveStep+="d";break;case 4:$moveStep+="e";break;case 5:$moveStep+="f";break;case 6:$moveStep+="g";break;case 7:$moveStep+="h";break;case 8:$moveStep+="i";break;}
$moveStep+=9-Math.floor($validSteps[0][1]/9);setTimeout(function(){if(vschess.animate[$chessid]){var $from=$validSteps[0][0];var $to=$validSteps[0][1];switch(vschess.turn[$chessid]){case 1:$from=89-$from;$to=89-$to;break;case 2:$from=8+$from-$from%9*2;$to=8+$to-$to%9*2;break;case 3:$from=81-$from+$from%9*2;$to=81-$to+$to%9*2;break;}
var $floatbox=$this.find("img.vschess_boxfloat");var $frombox=$this.find("img.vschess_box:eq("+$from+")");var $tobox=$this.find("img.vschess_box:eq("+$to+")");$floatbox.attr("src",(function(){if(IE6){return $frombox.attr("src").replace(".png","s.png");}
else{return $frombox.attr("src");}})()).css({top:$frombox.offset().top-$this.offset().top,left:$frombox.offset().left-$this.offset().left}).show();$frombox.attr({src:vschess.pics.no}).css("background-image","url("+vschess.pics.nos+")");if(IE6){switch($from){case 0:$frombox.attr("src",vschess.picpath+"ie6/nolts.png");break;case 8:$frombox.attr("src",vschess.picpath+"ie6/norts.png");break;case 81:$frombox.attr("src",vschess.picpath+"ie6/nolbs.png");break;case 89:$frombox.attr("src",vschess.picpath+"ie6/norbs.png");break;case 9:case 18:case 27:case 36:case 45:case 54:case 63:case 72:$frombox.attr("src",vschess.picpath+"ie6/nols.png");break;case 17:case 26:case 35:case 44:case 53:case 62:case 71:case 80:$frombox.attr("src",vschess.picpath+"ie6/nors.png");break;case 37:case 38:case 39:case 40:case 41:case 42:case 43:case 82:case 83:case 84:case 85:case 86:case 87:case 88:$frombox.attr("src",vschess.picpath+"ie6/nobs.png");break;case 46:case 47:case 48:case 49:case 50:case 51:case 52:case 1:case 2:case 3:case 4:case 5:case 6:case 7:$frombox.attr("src",vschess.picpath+"ie6/nots.png");break;default:$frombox.attr("src",vschess.picpath+"ie6/nos.png");break;}}
if(WebKit){var deltaX=$tobox.offset().left-$frombox.offset().left;var deltaY=$tobox.offset().top-$frombox.offset().top;var handler=function(){$floatbox[0].removeEventListener("webkitTransitionEnd",handler)
$movechessman($moveStep);$floatbox.hide();$autoMoveState=false;$floatbox.css("-webkit-transform","translate(0px, 0px)");};$floatbox[0].addEventListener("webkitTransitionEnd",handler);$floatbox.css("-webkit-transform","translate("+deltaX+"px, "+deltaY+"px)");}
else{$floatbox.animate({top:$tobox.offset().top-$this.offset().top,left:$tobox.offset().left-$this.offset().left},200,function(){$movechessman($moveStep);$floatbox.hide();$autoMoveState=false;});}}
else{$movechessman($moveStep);$autoMoveState=false;}},500);}}};var $movetips=function($from){if(vschess.tips[$chessid]==0||$from==-1){$this.find("img.vschess_box:not(:eq("+$from+"))").css("background-image","");}
else{var $player=arguments[1];$this.find("img.vschess_box").each(function($to){if($from==$to){return true;}
if($checklegal($from,$to,$player)){$(this).css("background-image","url("+vschess.pics.nor+")");}
else{$(this).css("background-image","");}});}};var $bindclick=function(){$this.find("img.vschess_box").click(function(){if($(this).attr("move")=="move"){if($(this).attr("src")!=vschess.pics.no&&vschess.soundState[$chessid]==1){vschess.sound.click($chessid);}
$this.find("img.vschess_box").css("background-image","");$(this).removeAttr("move");vschess.move[$chessid]=0;vschess.moveindex[$chessid]=-1;if(IE6){$(this).attr("src",$(this).attr("src").replace("s.png",".png"));}}
else{if((vschess.move[$chessid]!=0||$checkblack(this)==($currentplayer=="b")||$(this).attr("src")==vschess.pics.no)||vschess.checkmove[$chessid]==0){if($(this).attr("src")!=vschess.pics.no&&(($checkred(vschess.move[$chessid])==$checkred($(this).attr("src"))&&($currentplayer!="b"))||($checkblack(vschess.move[$chessid])==$checkblack($(this).attr("src"))&&($currentplayer=="b")))){if(vschess.soundState[$chessid]==1){vschess.sound.click($chessid);}
$this.find("img.vschess_box[move='move']").each(function(){$(this).css("background-image","").removeAttr("move");if(IE6){$(this).attr("src",$(this).attr("src").replace("s.png",".png"));}});vschess.move[$chessid]=$(this).attr("src");vschess.moveindex[$chessid]=$(this).index("img.vschess_box")%90;$(this).css("background-image","url("+vschess.pics.nos+")");$(this).attr("move","move");if(IE6){$(this).attr("src",$(this).attr("src").replace(".png","s.png"));}
$movetips(vschess.moveindex[$chessid],$currentplayer);}
else if(vschess.move[$chessid]!=0){if($checklegal(vschess.moveindex[$chessid],$(this).index(".vschess_loaded img.vschess_box")%90,$currentplayer)||vschess.checkmove[$chessid]==0){var $from=$this.find("img.vschess_box[move='move']").index(".vschess_loaded img.vschess_box")%90;$this.find("img.vschess_box[move='move']").css("background-image","url("+vschess.pics.nos+")");if(IE6){$this.attr("src",$this.find("img.vschess_box[move='move']").attr("src").replace(".png","s.png"));}
var $to=$(this).index(".vschess_loaded img.vschess_box")%90;$(this).attr("src",vschess.move[$chessid]);$this.find("img.vschess_box").removeAttr("move");vschess.move[$chessid]=0;++vschess.usermove[$chessid];vschess.moveindex[$chessid]=-1;if($currentplayer=="b"){$currentplayer="w";}
else{$currentplayer="b";}
switch(vschess.turn[$chessid]){case 1:$from=89-$from;$to=89-$to;break;case 2:$from=8+$from-$from%9*2;$to=8+$to-$to%9*2;break;case 3:$from=81-$from+$from%9*2;$to=81-$to+$to%9*2;break;}
switch($from%9){case 0:$movestr="a";break;case 1:$movestr="b";break;case 2:$movestr="c";break;case 3:$movestr="d";break;case 4:$movestr="e";break;case 5:$movestr="f";break;case 6:$movestr="g";break;case 7:$movestr="h";break;case 8:$movestr="i";break;}
$movestr+=9-Math.floor($from/9);switch($to%9){case 0:$movestr+="a";break;case 1:$movestr+="b";break;case 2:$movestr+="c";break;case 3:$movestr+="d";break;case 4:$movestr+="e";break;case 5:$movestr+="f";break;case 6:$movestr+="g";break;case 7:$movestr+="h";break;case 8:$movestr+="i";break;}
$movestr+=9-Math.floor($to/9);vschess.api.id($chessid);$movechessman($movestr);}
else{if(vschess.soundpath&&vschess.soundState[$chessid]==1){vschess.sound.illegal($chessid);}}}
else{if($(this).attr("src")!=vschess.pics.no){if(vschess.soundState[$chessid]==1){vschess.sound.click($chessid);}
vschess.move[$chessid]=$(this).attr("src");vschess.moveindex[$chessid]=$(this).index("img.vschess_box")%90;$(this).css("background-image","url("+vschess.pics.nos+")");$(this).attr("move","move");if(IE6){$(this).attr("src",$(this).attr("src").replace(".png","s.png"));}}
$movetips(vschess.moveindex[$chessid],$currentplayer);}}}});};var $unbindclick=function(){$this.find("img.vschess_box").unbind("click contextmenu");};var $changecomment=function(){var $newcomment=$this.find("textarea.vschess_comment").val();var $currentstepid=vschess.api.id($chessid).step();var $movethisdom=vschess.pfchess[$chessid];for($i=0;$i<$currentstepid;++$i){if($movethisdom.children("div[default]").length==0){$movethisdom=$movethisdom.children("div:eq(0)").attr("default",true);}
else{$movethisdom=$movethisdom.children("div[default]");}}
if($newcomment){$movethisdom.attr("c",$newcomment);}
else{$movethisdom.removeAttr("c");}
vschess.pfreload[$chessid]();vschess.api.id($chessid);vschess.api.step(vschess.api.step());vschess.api.format(vschess.api.format());};var $editposition=function(){$this.find("div.vschess_bar").hide();vschess.api.hidenodelist();$unbindclick();$(this).parent().hide();$this.find("img.vschess_box,div.vschess_make img").css({"background-image":"","cursor":"default"});var $currentfen=vschess.api.id($chessid).currentfen();var $splitfen=$currentfen.split(" ");$this.find("div.vschess_makebar input.vschess_editfen").val($currentfen);if($splitfen[1]=="b"){$this.find("div.vschess_make :radio:eq(0)").attr("checked",false);$this.find("div.vschess_make :radio:eq(1)").attr("checked","checked");}
else{$this.find("div.vschess_make :radio:eq(1)").attr("checked",false);$this.find("div.vschess_make :radio:eq(0)").attr("checked","checked");}
$this.find("div.vschess_make input.vschess_setstep").val($splitfen[5]);$this.find("div.vschess_make,div.vschess_makebar").show();$this.find("img.vschess_box").click(function(){$this.find("img.vschess_box,div.vschess_make img").css("background-image","");if($(this).attr("move")=="move"){$(this).css("background-image","");$(this).removeAttr("move");vschess.move[$chessid]=0;vschess.moveindex[$chessid]=-1;}
else{if(vschess.move[$chessid]!=0){$this.find("img.vschess_box[move='move']").attr("src",vschess.pics.no).css("background-image","url("+vschess.pics.no+")");$(this).attr("src",vschess.move[$chessid]);$this.find("img.vschess_box").removeAttr("move");vschess.move[$chessid]=0;vschess.moveindex[$chessid]=-1;$changeeditfen();}
else{if($(this).attr("src")!=vschess.pics.no){vschess.move[$chessid]=$(this).attr("src");vschess.moveindex[$chessid]=$(this).index("img.vschess_box")%90;$(this).css("background-image","url("+vschess.pics.nos+")");$(this).attr("move","move");}}}});$this.find("img.vschess_box").contextmenu(function(){if($(this).attr("src")==vschess.pics.no){$this.find("div.vschess_quickmakefen").css({top:$(this).position().top,left:$(this).position().left+40});if($makefen_quickthis==this){$this.find("div.vschess_quickmakefen").toggle();}
else{$this.find("div.vschess_quickmakefen").show();}
$makefen_quickthis=this;}
else{$(this).attr("src",vschess.pics.no).css("background-image","");}
$changeeditfen();return false;});};if($arguments.live!="view"){$bindclick();}
(function(){var VolumeSet={startY:0,startM:0,mouseMoveFunction:function(e){var arrow=$this.find("li.vsbar_volmitem");var newM=VolumeSet.startM+e.clientY-VolumeSet.startY;if(newM<0){newM=0;}
if(newM>134){newM=134;}
arrow.css("margin-top",newM);vschess.volume[$chessid]=Math.round(100-newM*100/134);arrow.children("span").text(vschess.volume[$chessid]);return false;}};$(document).mouseup(function(){$fasttime=0;clearInterval($fastinterval);$this.find("li.vsbar_volmitem span").fadeOut(500);$(document).unbind("mousemove",VolumeSet.mouseMoveFunction);});$this.find("input.vsbar_volume").click(function(){$this.find("div.vschess_bar ul").not("ul.vsbar_volmlist").hide();$this.find("ul.vsbar_volmlist").toggle();if(!IE){vschess.clip[$chessid].hide();}});$this.find("li.vsbar_volmitem").mousedown(function(e){var _this=$(this);_this.children("span").show();VolumeSet.startY=e.clientY;VolumeSet.startM=parseInt(_this.css("margin-top"));$(document).bind("mousemove",VolumeSet.mouseMoveFunction);});$this.find("div.vschess_node_close").click(function(){vschess.api.id($chessid).hidenodelist();});$this.find("div.vschess_bar ul li").hover(function(){$this.find("div.vschess_bar ul li").removeClass("hover");$(this).addClass("hover");},function(){$(this).removeClass("hover");});$this.find("textarea.vschess_comment").blur(function(){$changecomment();});$this.find("textarea.vschess_comment").keydown(function(){if(window.event.keyCode==13&&event.ctrlKey){$changecomment();}});$this.find("textarea.vschess_comment").click(function(){$this.find("div.vschess_comment_tip").hide();});$this.find("input.vsbar_first").click(function(){if($autoMoveState){return false();}
$fasttime=0;clearInterval($fastinterval);if($arguments.live!="view"||vschess.livepause[$chessid]){$this.find(":animated").stop().hide();vschess.api.id($chessid).play(0).step(0);}});$this.find("input.vsbar_prev10").click(function(){if($autoMoveState){return false();}
$fasttime=0;clearInterval($fastinterval);if($arguments.live!="view"||vschess.livepause[$chessid]){$this.find(":animated").stop().hide();vschess.api.id($chessid).play(0).step(vschess.api.id($chessid).step()-10);}});$this.find("input.vsbar_prev").mouseup(function(){if($autoMoveState){return false();}
$fasttime=0;clearInterval($fastinterval);if($arguments.live!="view"||vschess.livepause[$chessid]){$this.find(":animated").stop().hide();vschess.api.id($chessid)
vschess.api.play(0).step(vschess.api.step()-1);}}).mousedown(function(){if($autoMoveState){return false();}
vschess.api.id($chessid);$fasttime=0;clearInterval($fastinterval);$fastinterval=setInterval(function(){if($fasttime<10){++$fasttime;}
else{vschess.api.step(vschess.api.step()-1);if(vschess.api.step()==0){$fasttime=0;clearInterval($fastinterval);}}},50);}).mouseout(function(){if($autoMoveState){return false();}
$fasttime=0;clearInterval($fastinterval);});$this.find("input.vsbar_ctrl").click(function(){if($autoMoveState){return false();}
$fasttime=0;clearInterval($fastinterval);if(vschess.play[$chessid]==1||$jumian_each.length==1){vschess.api.id($chessid).play(0);}
else{vschess.api.id($chessid).play(1);}});$this.find("input.vsbar_view,input.vsbar_play").click(function(){if($autoMoveState){return false();}
$fasttime=0;clearInterval($fastinterval);if(vschess.livepause[$chessid]===true){vschess.api.id($chessid).livepause(false);}
else{vschess.api.id($chessid).livepause(true);}});$this.find("input.vsbar_stop").click(function(){if($autoMoveState){return false();}
$fasttime=0;clearInterval($fastinterval);if(confirm("您确定要结束直播吗？结束后所有观众将不能继续收到直播信息！")){$this.removeAttr("live liveid");$arguments.live=="";vschess.livepause[$chessid]=true;$this.find("input.vsbar_play,input.vsbar_stop").hide();$this.find("input.vsbar_ctrl,input.vsbar_time").show();vschess.senddom[$chessid](true);}});$this.find("input.vsbar_next").mouseup(function(){if($autoMoveState){return false();}
$fasttime=0;clearInterval($fastinterval);if($arguments.live!="view"||vschess.livepause[$chessid]){var $buttonenabled=$(this).attr("disabled")!="disabled";$this.find(":animated").stop().hide();vschess.api.id($chessid)
vschess.api.play(0).step(vschess.api.step()+1);var $currentplayer=vschess.api.currentfen().split(" ")[1];if(vschess.soundpath&&vschess.soundState[$chessid]==1&&$buttonenabled){var $from,$to;for($i=0;$i<90;++$i){if($jumian_each[vschess.step[$chessid]-1][$i]!="*"&&$jumian_each[vschess.step[$chessid]][$i]=="*"){$from=$i;break;}}
for($i=0;$i<90;++$i){if($jumian_each[vschess.step[$chessid]-1][$i]!=$jumian_each[vschess.step[$chessid]][$i]&&$i!=$from){$to=$i;break;}}
if(vschess.chineseSoundStatus[$chessid]==1){vschess.sound.step(vschess.chinesestep[$chessid][vschess.step[$chessid]],$chessid);}
else{if(vschess.checklose($jumian_each[vschess.step[$chessid]],$currentplayer)){vschess.sound.lose($chessid);}
else if(vschess.checkthreat($jumian_each[vschess.step[$chessid]],$currentplayer)){vschess.sound.check($chessid);}
else if(($jumian_each[vschess.step[$chessid]][$to]=="C"||$jumian_each[vschess.step[$chessid]][$to]=="c")&&$jumian_each[vschess.step[$chessid]-1][$to]!="*"){vschess.sound.bomb($chessid);}
else if($jumian_each[vschess.step[$chessid]-1][$to]!="*"){vschess.sound.eat($chessid);}
else{vschess.sound.move($chessid);}}}}}).mousedown(function(){if($autoMoveState){return false();}
vschess.api.id($chessid);$fasttime=0;clearInterval($fastinterval);$fastinterval=setInterval(function(){if($fasttime<10){++$fasttime;}
else{vschess.api.step(vschess.api.step()+1);if(vschess.api.step()==vschess.api.allstep()-1){$fasttime=0;clearInterval($fastinterval);}}},50);}).mouseout(function(){if($autoMoveState){return false();}
$fasttime=0;clearInterval($fastinterval);});$this.find("input.vsbar_next10").click(function(){if($autoMoveState){return false();}
$fasttime=0;clearInterval($fastinterval);if($arguments.live!="view"||vschess.livepause[$chessid]){$this.find(":animated").stop().hide();vschess.api.id($chessid).play(0).step(vschess.api.id($chessid).step()+10);}});$this.find("input.vsbar_last").click(function(){if($autoMoveState){return false();}
$fasttime=0;clearInterval($fastinterval);if($arguments.live!="view"||vschess.livepause[$chessid]){$this.find(":animated").stop().hide();vschess.api.id($chessid).play(0).step($jumian_each.length-1);}});$this.find("input.vsbar_time").click(function(){$this.find("div.vschess_bar ul").not("ul.vsbar_timelist").hide();$this.find("ul.vsbar_timelist").css("top",419-$this.find("ul.vsbar_timelist").outerHeight()).toggle();if(!IE){vschess.clip[$chessid].hide();}});$this.find("input.vsbar_func").click(function(){$this.find("div.vschess_bar ul").not("ul.vsbar_funclist").hide();$this.find("ul.vsbar_funclist li,ul.vsbar_savelist li,ul.vsbar_pstnlist li,ul.vsbar_bloglist li").removeClass("hover");$this.find("ul.vsbar_funclist").css("top",419-$this.find("ul.vsbar_funclist").outerHeight()).toggle();if(!IE){if($this.find("ul.vsbar_funclist:visible").length){vschess.clip[$chessid].show();}
else{$this.find("ul.vsbar_savelist,ul.vsbar_pstnlist,ul.vsbar_bloglist").hide();vschess.clip[$chessid].hide();}
if(!$("#vschess_copybutton_"+($chessid+1)).length){vschess.clip[$chessid].glue("vschess_copy_"+$chessid);}}
else if($this.find("ul.vsbar_funclist:visible").length==0){$this.find("ul.vsbar_savelist,ul.vsbar_pstnlist,ul.vsbar_bloglist").hide();}});$this.find("input.vsbar_help").click(function(){vschess.showmsg(vschess.help);});$this.find("ul.vsbar_funclist li").not("li.vsbar_save,li.vsbar_view").mouseover(function(){$this.find("ul.vsbar_savelist,ul.vsbar_bloglist").hide();});$this.find("li.vsbar_save").mouseover(function(){$viewbook=false;var $funclist=$this.find("ul.vsbar_funclist");var $savetop=$funclist.position().top;if(!$normalstart){$this.find("li.vsbar_qq").hide();}
else{$this.find("li.vsbar_qq").show();$savetop-=$(this).height();}
$this.find("ul.vsbar_savelist").css({top:$savetop+$(this).height(),left:$funclist.position().left+$funclist.outerWidth()-1}).show();});$this.find("ul.vsbar_savelist li").mouseover(function(){if($viewbook){$this.find("li.vsbar_view").addClass("hover");}
else{$this.find("li.vsbar_save").addClass("hover");}});$this.find("ul.vsbar_funclist li").not("li.vsbar_save,li.vsbar_view").mouseover(function(){$this.find("ul.vsbar_savelist,ul.vsbar_bloglist").hide();});$this.find("li.vsbar_view").mouseover(function(){$viewbook=true;var $funclist=$this.find("ul.vsbar_funclist");var $savetop=$funclist.position().top;if(!$normalstart){$this.find("li.vsbar_qq").hide();}
else{$this.find("li.vsbar_qq").show();$savetop-=$(this).height();}
$this.find("ul.vsbar_savelist").css({top:$savetop,left:$funclist.position().left+$funclist.outerWidth()-1}).show();});$this.find("ul.vsbar_funclist li").not("li.vsbar_pstn").mouseover(function(){$this.find("ul.vsbar_pstnlist,ul.vsbar_bloglist").hide();});$this.find("li.vsbar_pstn").mouseover(function(){var $funclist=$this.find("ul.vsbar_funclist");var $pstntop=$funclist.position().top+$(this).height()*2;if(!vschess.server){$pstntop-=$(this).height();}
$this.find("ul.vsbar_pstnlist").css({top:$pstntop,left:$funclist.position().left+$funclist.outerWidth()-1}).show();});$this.find("li.vsbar_blog").mouseover(function(){var $funclist=$this.find("ul.vsbar_funclist");var $pstntop=$funclist.position().top-$(this).height()*4;if(!vschess.server){$pstntop-=$(this).height();}
$this.find("ul.vsbar_bloglist").css({top:$pstntop,left:$funclist.position().left+$funclist.outerWidth()-1}).show();});$this.find("ul.vsbar_bloglist li").mouseover(function(){$this.find("li.vsbar_blog").addClass("hover");});$this.find("li.vsbar_edit").click(function(){$this.find("div.vschess_bar ul").hide();$editposition();});$this.find("li.vsbar_turn").click(function(){$this.find("div.vschess_bar ul").hide();var $playstate=vschess.api.id($chessid).play();switch(vschess.turn[$chessid]){case 0:vschess.api.id($chessid).turn(1);break;case 2:vschess.api.id($chessid).turn(3);break;case 3:vschess.api.id($chessid).turn(2);break;default:vschess.api.id($chessid).turn(0);break;}
vschess.api.id($chessid).play($playstate);});$this.find("li.vsbar_updn").click(function(){$this.find("div.vschess_bar ul").hide();var $playstate=vschess.api.id($chessid).play();switch(vschess.turn[$chessid]){case 0:vschess.api.id($chessid).turn(3);break;case 1:vschess.api.id($chessid).turn(2);break;case 2:vschess.api.id($chessid).turn(1);break;default:vschess.api.id($chessid).turn(0);break;}
vschess.api.id($chessid).play($playstate);});$this.find("li.vsbar_ltrt").click(function(){$this.find("div.vschess_bar ul").hide();var $playstate=vschess.api.id($chessid).play();switch(vschess.turn[$chessid]){case 0:vschess.api.id($chessid).turn(2);break;case 1:vschess.api.id($chessid).turn(3);break;case 3:vschess.api.id($chessid).turn(1);break;default:vschess.api.id($chessid).turn(0);break;}
vschess.api.id($chessid).play($playstate);});$this.find("ul.vsbar_pstnlist li").mouseover(function(){$this.find("li.vsbar_pstn").addClass("hover");});$this.find("li.vsbar_pgn").click(function(){$this.find("ul.vsbar_funclist,ul.vsbar_savelist").hide();vschess.copycontent=0;if(vschess.turn[$chessid]>1){switch(vschess.format[$chessid]){case"wxf":var $savepgn=$wxfpgnm;break;case"iccs":var $savepgn=$iccspgnm;break;default:var $savepgn=$chinesepgnm;break;}}
else{switch(vschess.format[$chessid]){case"wxf":var $savepgn=$wxfpgn;break;case"iccs":var $savepgn=$iccspgn;break;default:var $savepgn=$chinesepgn;break;}}
$("#vschess_file textarea").val($savepgn);if(!vschess.server||$viewbook===true){$("#vschess_file_info").text("请单击“保存”来保存此棋谱。");$("#vschess_file").fadeIn(500,function(){if(!IE){vschess.savepgncopy.show();vschess.clip[$chessid].hide();vschess.savepgncopy.setText($savepgn);if(!$("#vschess_copybutton_0").length){vschess.savepgncopy.glue("vschesscopybutton");$("#vschess_copybutton_0").parent().css({"position":"fixed","margin-top":"5px","margin-left":"5px"});}
vschess.savepgncopy.reposition();}});}
else{$("#vschess_post").submit();}});$this.find("li.vsbar_pfc").click(function(){vschess.copycontent=0;$this.find("div.vschess_bar ul").hide();var $pfstr='<?xml version="1.0" encoding="utf-8"?><n version="2"';$pfstr+=' win="'+vschess.pfchess[$chessid].attr("win")+'"';$pfstr+=' create-time="'+vschess.pfchess[$chessid].attr("create-time")+'"';if(vschess.turn[$chessid]>1){$pfstr+=' m="'+vschess.turnfen(vschess.pfchess[$chessid].attr("m"))+'"';}
else{$pfstr+=' m="'+vschess.pfchess[$chessid].attr("m")+'"';}
if(vschess.pfchess[$chessid].attr("c")){$pfstr+=' c="'+vschess.pfchess[$chessid].attr("c")+'"';}
if(vschess.turn[$chessid]>1){var $turnpf=$("<div>"+vschess.pfchess[$chessid].html()+"</div>");$turnpf.find("div").each(function(){$(this).attr("m",(function($step){var $result;switch($step[0]){case"a":$result="i";break;case"b":$result="h";break;case"c":$result="g";break;case"d":$result="f";break;case"e":$result="e";break;case"f":$result="d";break;case"g":$result="c";break;case"h":$result="b";break;case"i":$result="a";break;}
$result+=$step[1];switch($step[2]){case"a":$result+="i";break;case"b":$result+="h";break;case"c":$result+="g";break;case"d":$result+="f";break;case"e":$result+="e";break;case"f":$result+="d";break;case"g":$result+="c";break;case"h":$result+="b";break;case"i":$result+="a";break;}
return $result+$step[3];})($(this).attr("m").split("")));});$pfstr+='>'+$turnpf.html().replace(/<div/ig,"<n").replace(/<\/div>/ig,"</n>").replace(/>([\s]*)</g,"><")+"</n>";}
else{$pfstr+='>'+vschess.pfchess[$chessid].html().replace(/<div/ig,"<n").replace(/<\/div>/ig,"</n>").replace(/>([\s]*)</g,"><")+"</n>";}
$pfstr=$pfstr.replace(/ step=\"(?:[0-9]+)\"/g,"").replace(/ id=\"dp_(?:[0-9]+)_(?:[0-9]+)\"/g,"");$("#vschess_file textarea").val($pfstr);if(!vschess.server||$viewbook===true){$("#vschess_file_info").text("请单击“保存”来保存此棋谱。");$("#vschess_file").fadeIn(500,function(){if(!IE){vschess.savepgncopy.show();vschess.clip[$chessid].hide();vschess.savepgncopy.setText($pfstr);if(!$("#vschess_copybutton_0").length){vschess.savepgncopy.glue("vschesscopybutton");$("#vschess_copybutton_0").parent().css({"position":"fixed","margin-top":"5px","margin-left":"5px"});}
vschess.savepgncopy.reposition();}});}
else{$("#vschess_post").submit();}});$this.find("li.vsbar_dpxq").click(function(){$this.find("div.vschess_bar ul").hide();vschess.copycontent=0;var $pfstr='<div>';if(vschess.turn[$chessid]>1){var $pf2dpfen=vschess.turnfen(vschess.pfchess[$chessid].attr("m"));var $turnpf=$("<div>"+vschess.pfchess[$chessid].html()+"</div>");$turnpf.find("div").each(function(){$(this).attr("m",(function($step){var $result;switch($step[0]){case"a":$result="i";break;case"b":$result="h";break;case"c":$result="g";break;case"d":$result="f";break;case"e":$result="e";break;case"f":$result="d";break;case"g":$result="c";break;case"h":$result="b";break;case"i":$result="a";break;}
$result+=$step[1];switch($step[2]){case"a":$result+="i";break;case"b":$result+="h";break;case"c":$result+="g";break;case"d":$result+="f";break;case"e":$result+="e";break;case"f":$result+="d";break;case"g":$result+="c";break;case"h":$result+="b";break;case"i":$result+="a";break;}
return $result+$step[3];})($(this).attr("m").split("")));});$pfstr+=$turnpf.html();}
else{var $pf2dpfen=vschess.pfchess[$chessid].attr("m");$pfstr+=vschess.pfchess[$chessid].html();}
var $dpchess=$($pfstr+"</div>");var $pf2dp=function($str){$str=$str.split("");var $result="";switch($str[0]){case"a":$result+=0;break;case"b":$result+=1;break;case"c":$result+=2;break;case"d":$result+=3;break;case"e":$result+=4;break;case"f":$result+=5;break;case"g":$result+=6;break;case"h":$result+=7;break;case"i":$result+=8;break;}
$result+=9-parseInt($str[1]);switch($str[2]){case"a":$result+=0;break;case"b":$result+=1;break;case"c":$result+=2;break;case"d":$result+=3;break;case"e":$result+=4;break;case"f":$result+=5;break;case"g":$result+=6;break;case"h":$result+=7;break;case"i":$result+=8;break;}
$result+=9-parseInt($str[3]);return $result;};var $dpstr="[DhtmlXQ]\n";$pf2dpfen=$pf2dpfen.split(" ")[0].replace(/\//g,"").replace(/9/g,"*********").replace(/8/g,"********").replace(/7/g,"*******").replace(/6/g,"******").replace(/5/g,"*****").replace(/4/g,"****").replace(/3/g,"***").replace(/2/g,"**").replace(/1/g,"*").split("");var $dpfen=[99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99],$dptemp;for($i=0;$i<90;++$i){$dptemp=$i%9*10+Math.floor($i/9);if($dptemp<10){$dptemp="0"+$dptemp;}
switch($pf2dpfen[$i]){case"K":$dpfen[4]=$dptemp;break;case"k":$dpfen[20]=$dptemp;break;case"R":if($dpfen[0]==99){$dpfen[0]=$dptemp;}else{$dpfen[8]=$dptemp;}break;case"N":if($dpfen[1]==99){$dpfen[1]=$dptemp;}else{$dpfen[7]=$dptemp;}break;case"B":if($dpfen[2]==99){$dpfen[2]=$dptemp;}else{$dpfen[6]=$dptemp;}break;case"A":if($dpfen[3]==99){$dpfen[3]=$dptemp;}else{$dpfen[5]=$dptemp;}break;case"C":if($dpfen[9]==99){$dpfen[9]=$dptemp;}else{$dpfen[10]=$dptemp;}break;case"r":if($dpfen[16]==99){$dpfen[16]=$dptemp;}else{$dpfen[24]=$dptemp;}break;case"n":if($dpfen[17]==99){$dpfen[17]=$dptemp;}else{$dpfen[23]=$dptemp;}break;case"b":if($dpfen[18]==99){$dpfen[18]=$dptemp;}else{$dpfen[22]=$dptemp;}break;case"a":if($dpfen[19]==99){$dpfen[19]=$dptemp;}else{$dpfen[21]=$dptemp;}break;case"c":if($dpfen[25]==99){$dpfen[25]=$dptemp;}else{$dpfen[26]=$dptemp;}break;case"P":{if($dpfen[11]==99){$dpfen[11]=$dptemp;}
else if($dpfen[12]==99){$dpfen[12]=$dptemp;}
else if($dpfen[13]==99){$dpfen[13]=$dptemp;}
else if($dpfen[14]==99){$dpfen[14]=$dptemp;}
else{$dpfen[15]=$dptemp;}
break;}
case"p":{if($dpfen[27]==99){$dpfen[27]=$dptemp;}
else if($dpfen[28]==99){$dpfen[28]=$dptemp;}
else if($dpfen[29]==99){$dpfen[29]=$dptemp;}
else if($dpfen[30]==99){$dpfen[30]=$dptemp;}
else{$dpfen[31]=$dptemp;}
break;}}}
$dpstr+="[DhtmlXQ_binit]"+$dpfen.join("")+"[/DhtmlXQ_binit]\n";var $dpcomment="",$dpthiscomment,$dpendstr;if($dpthiscomment=vschess.pfchess[$chessid].attr("c")){$dpcomment+="[DhtmlXQ_comment0]"+$dpthiscomment.replace(/\n/g,"||")+"[/DhtmlXQ_comment0]\n";}
$i=0,$j=1;$dpchess.find("div").each(function($dpindex){var $dpchangenode=$(this).prevAll().last();var $dpchangebegin=$(this).prev().length!=0;if($dpchangebegin){$j=parseInt($dpchangenode.attr("step"));}
if($i==0){if($dpindex==0){$dpstr+="[DhtmlXQ_movelist]";}
$dpstr+=$pf2dp($(this).attr("m"));if($dpthiscomment=$(this).attr("c")){$dpcomment+="[DhtmlXQ_comment"+$j+"]"+$dpthiscomment.replace(/\n/g,"||")+"[/DhtmlXQ_comment"+$j+"]\n";}}
else{if($dpchangebegin){var $dplist=$dpchangenode.attr("list");$dpstr+="[DhtmlXQ_move_"+$dplist+"_"+$j+"_"+$i+"]";$dpendstr="[/DhtmlXQ_move_"+$dplist+"_"+$j+"_"+$i+"]\n";}
$dpstr+=$pf2dp($(this).attr("m"));if($dpthiscomment=$(this).attr("c")){$dpcomment+="[DhtmlXQ_comment"+$i+"_"+$j+"]"+$dpthiscomment.replace(/\n/g,"||")+"[/DhtmlXQ_comment"+$i+"_"+$j+"]\n";}}
$(this).attr({step:$j,list:$i});if($(this).children().length==0){if($i==0){$dpstr+="[/DhtmlXQ_movelist]\n";}
else{$dpstr+=$dpendstr;}
++$i;}
++$j;});$dpstr+=$dpcomment+"[/DhtmlXQ]";$("#vschess_file textarea").val($dpstr);if(!vschess.server||$viewbook===true){$("#vschess_file_info").text("请单击“保存”来保存此棋谱。");$("#vschess_file").fadeIn(500,function(){if(!IE){vschess.savepgncopy.show();vschess.clip[$chessid].hide();vschess.savepgncopy.setText($dpstr);if(!$("#vschess_copybutton_0").length){vschess.savepgncopy.glue("vschesscopybutton");$("#vschess_copybutton_0").parent().css({"position":"fixed","margin-top":"5px","margin-left":"5px"});}
vschess.savepgncopy.reposition();}});}
else{$("#vschess_post").submit();}});$this.find("li.vsbar_qq").click(function(){$this.find("div.vschess_bar ul").hide();vschess.api.id($chessid);vschess.copycontent=0;$("#vschess_file_info").text("请单击“保存”来保存此棋谱。");var $qqsave;if(vschess.turn[$chessid]>1){$qqsave=vschess.saveqq[$chessid];}
else{$qqsave=vschess.saveqqm[$chessid];}
$("#vschess_file textarea").val($qqsave);if(!vschess.server||$viewbook===true){$("#vschess_file").fadeIn(500,function(){if(!IE){vschess.savepgncopy.show();vschess.clip[$chessid].hide();vschess.savepgncopy.setText($qqsave);if(!$("#vschess_copybutton_0").length){vschess.savepgncopy.glue("vschesscopybutton");$("#vschess_copybutton_0").parent().css({"position":"fixed","margin-top":"5px","margin-left":"5px"});}
vschess.savepgncopy.reposition();}});}
else{$("#vschess_post").submit();}});$this.find("li.vsbar_text").click(function(){vschess.copycontent=1;$("#vschess_file_info").text("请单击“复制”按钮，将文字棋盘粘贴到Word等软件中。");$this.find("div.vschess_bar ul").hide();$("#vschess_file textarea").val(vschess.textboard(vschess.api.id($chessid).currentfen()));$("#vschess_file").fadeIn(500,function(){if(!IE){vschess.savepgncopy.show();vschess.clip[$chessid].hide();vschess.savepgncopy.setText(vschess.textboard(vschess.api.id($chessid).currentfen()));if(!$("#vschess_copybutton_0").length){vschess.savepgncopy.glue("vschesscopybutton");$("#vschess_copybutton_0").parent().css({"position":"fixed","margin-top":"5px","margin-left":"5px"});}
vschess.savepgncopy.reposition();}});});$this.find("ul.vsbar_timelist li").click(function(){$(this).parent().hide();vschess.api.id($chessid).time(parseInt($(this).attr("name")));});$this.find("input.vsbar_chinese").click(function(){var $playstate=vschess.api.id($chessid).play();vschess.api.id($chessid).format("chinese").play($playstate);});$this.find("input.vsbar_wxf").click(function(){var $playstate=vschess.api.id($chessid).play();vschess.api.id($chessid).format("wxf").play($playstate);});$this.find("input.vsbar_iccs").click(function(){var $playstate=vschess.api.id($chessid).play();vschess.api.id($chessid).format("iccs").play($playstate);});$this.find("li.vsbar_pic").click(function(){$(this).parent().hide();vschess.showmsg('截图已经生成，请保存至您的电脑\u4e2d。<br /><img style="width:379px;height:417px;margin-top:5px;" src="'+vschess.server+'action=pic&fen='+vschess.api.id($chessid).currentfen()+'" />');});$this.find("input.vsbar_config").click(function(){$this.find("div.vschess_config").toggle();if($(this).val()=="选项"){$(this).val("注释");}
else{$(this).val("选项");}});$this.find("input.vschess_editbegin").click(function(){if(confirm("确定摆成起始局面？")){$usefen("rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1");$changeeditfen();}});$this.find("input.vschess_editclean").click(function(){if(confirm("确定清空棋盘？")){$usefen("5k3/9/9/9/9/9/9/9/9/3K5 w - - 0 1");$changeeditfen();}});$this.find("input.vschess_editfinish").click(function(){if(confirm("确定完成摆棋？当前棋谱将会丢失！")){var $checkposition=[];for($i=0;$i<90;++$i){var $thismanname=$this.find("img.vschess_box:eq("+$i+")").attr("src");$checkposition[$i]="*";if($thismanname==vschess.pics.rr||$thismanname==vschess.pics.rrs){$checkposition[$i]="R";}
if($thismanname==vschess.pics.rn||$thismanname==vschess.pics.rns){$checkposition[$i]="N";}
if($thismanname==vschess.pics.rb||$thismanname==vschess.pics.rbs){$checkposition[$i]="B";}
if($thismanname==vschess.pics.ra||$thismanname==vschess.pics.ras){$checkposition[$i]="A";}
if($thismanname==vschess.pics.rk||$thismanname==vschess.pics.rks){$checkposition[$i]="K";}
if($thismanname==vschess.pics.rc||$thismanname==vschess.pics.rcs){$checkposition[$i]="C";}
if($thismanname==vschess.pics.rp||$thismanname==vschess.pics.rps){$checkposition[$i]="P";}
if($thismanname==vschess.pics.br||$thismanname==vschess.pics.brs){$checkposition[$i]="r";}
if($thismanname==vschess.pics.bn||$thismanname==vschess.pics.bns){$checkposition[$i]="n";}
if($thismanname==vschess.pics.bb||$thismanname==vschess.pics.bbs){$checkposition[$i]="b";}
if($thismanname==vschess.pics.ba||$thismanname==vschess.pics.bas){$checkposition[$i]="a";}
if($thismanname==vschess.pics.bk||$thismanname==vschess.pics.bks){$checkposition[$i]="k";}
if($thismanname==vschess.pics.bc||$thismanname==vschess.pics.bcs){$checkposition[$i]="c";}
if($thismanname==vschess.pics.bp||$thismanname==vschess.pics.bps){$checkposition[$i]="p";}}
var $checkpositionm=$checkposition.clone().reverse(),$setfen;if($setfen=$makefen($checkposition)){$this.find("div.vschess_bar").show();$this.find("div.vschess_make,div.vschess_makebar").hide();$setfen+=" "+$this.find("div.vschess_make :radio:checked").val();$setfen+=" - - 0 "+$this.find("input.vschess_setstep").val();$pfdom=vschess.pfchess[$chessid]=$('<div version="2" win="*" create-time="*" m="'+$setfen+'"></div>');vschess.pfreload[$chessid]();vschess.api.id($chessid);vschess.api.format(vschess.api.format());vschess.api.step(0);vschess.api.turn(0);$unbindclick();$bindclick();}
else if($setfen=$makefen($checkpositionm)){$this.find("div.vschess_bar").show();$this.find("div.vschess_make,div.vschess_makebar").hide();$setfen+=" "+$this.find("div.vschess_make :radio:checked").val();$setfen+=" - - 0 "+$this.find("input.vschess_setstep").val();$pfdom=vschess.pfchess[$chessid]=$('<div version="2" win="*" create-time="*" m="'+$setfen+'"></div>');vschess.pfreload[$chessid]();vschess.api.id($chessid);vschess.api.format(vschess.api.format());vschess.api.turn(1);$unbindclick();$bindclick();}
else{$makefen($checkposition)&&$makefen($checkpositionm);alert("局面有错误，"+$makefenerror+"，请您检查。");}}});$this.find("input.vschess_editcancel").click(function(){$this.find("div.vschess_bar").show();vschess.api.step(vschess.api.step());$this.find("div.vschess_make,div.vschess_makebar").hide();$unbindclick();$bindclick();});$this.find("div.vschess_make img").not("[name='no']").click(function(){$this.find("div.vschess_make img").css("background-image","");vschess.move[$chessid]=$(this).attr("src");$(this).css("background-image","url("+vschess.pics.nos+")");});$this.find("div.vschess_make span.vschess_up").click(function(){var $num=parseInt($this.find("input.vschess_setstep").val());if(isNaN($num)){$num=0;}
$this.find("input.vschess_setstep").val($num+1);$changeeditfen();});$this.find("div.vschess_make span.vschess_down").click(function(){var $num=parseInt($this.find("input.vschess_setstep").val());if(isNaN($num)){$num=2;}
$num=$num<2?2:$num;$this.find("input.vschess_setstep").val($num-1);$changeeditfen();});$this.find("div.vschess_make [type='radio']").change(function(){$changeeditfen();});$this.find("div.vschess_makebar input.vschess_editfen").change(function(){$usefen($(this).val());});$this.find("div.vschess_make input.vschess_setstep").change(function(){var $num=parseInt($(this).val());if(isNaN($num)||$num<1){$(this).val("1");}
else{$(this).val($num);}
$changeeditfen();});$this.find("div.vschess_quickmakefen span").click(function(){var $quickmakefen_thissrc;switch($(this).attr("name")){case"R":$quickmakefen_thissrc=vschess.pics.rr;break;case"N":$quickmakefen_thissrc=vschess.pics.rn;break;case"B":$quickmakefen_thissrc=vschess.pics.rb;break;case"A":$quickmakefen_thissrc=vschess.pics.ra;break;case"K":$quickmakefen_thissrc=vschess.pics.rk;break;case"C":$quickmakefen_thissrc=vschess.pics.rc;break;case"P":$quickmakefen_thissrc=vschess.pics.rp;break;case"r":$quickmakefen_thissrc=vschess.pics.br;break;case"n":$quickmakefen_thissrc=vschess.pics.bn;break;case"b":$quickmakefen_thissrc=vschess.pics.bb;break;case"a":$quickmakefen_thissrc=vschess.pics.ba;break;case"k":$quickmakefen_thissrc=vschess.pics.bk;break;case"c":$quickmakefen_thissrc=vschess.pics.bc;break;case"p":$quickmakefen_thissrc=vschess.pics.bp;break;default:$quickmakefen_thissrc=vschess.pics.no;break;}
$($makefen_quickthis).attr("src",$quickmakefen_thissrc);$changeeditfen();$this.find("div.vschess_quickmakefen").hide();});$this.find("input.vschess_config_animate").change(function(){if(this.checked){vschess.api.id($chessid).animate(1);}
else{vschess.api.id($chessid).animate(0);}});$this.find("input.vschess_config_automove").change(function(){if(this.checked){vschess.api.id($chessid).autoMove(1);}
else{vschess.api.id($chessid).autoMove(0);}});$this.find("input.vschess_config_chineseSoundStatus").change(function(){if(this.checked){vschess.api.id($chessid).chineseSoundStatus(1);}
else{vschess.api.id($chessid).chineseSoundStatus(0);}});$this.find("input.vschess_config_tips").click(function(){if(this.checked){vschess.api.id($chessid).tips(1);}
else{vschess.api.id($chessid).tips(0);}});$this.find("input.vschess_config_sound").click(function(){if(this.checked){vschess.api.id($chessid).sound(1);}
else{vschess.api.id($chessid).sound(0);}});$this.find("input.vschess_config_check").click(function(){if(this.checked){vschess.api.id($chessid).checkmove(1);}
else{vschess.api.id($chessid).checkmove(0);}});$this.find("li.vsbar_mobile").click(function(){$(this).parent().hide();var $html='<iframe id="vschess_mobilepost" frameborder="0" style="display:block;width:111px;height:111px;margin:0 auto 0 auto;" />';vschess.iframe=1;vschess.showmsg('请扫描下面的二维码<br />'+$html);vschess.iframe=0;var $htmlin='<img src="http://www.xiaxiangqi.com/images/loading.gif" style="display:block;width:32px;height:32px;position:absolute;top:50%;left:50%;margin-top:-16px;margin-left:-16px;" />';$htmlin+='<form id="vschess_chess" style="margin:0px;" action="http://www.xiaxiangqi.com/mobileqr.html" method="post"><input id="vschess_data" type="hidden" name="data" value="" /></form>';setTimeout(function(){$("#vschess_mobilepost").contents().find("body").append($htmlin);var $pfstr='<?xml version="1.0" encoding="utf-8"?><n version="2"';$pfstr+=' win="'+vschess.pfchess[$chessid].attr("win")+'"';$pfstr+=' create-time="'+vschess.pfchess[$chessid].attr("create-time")+'"';if(vschess.turn[$chessid]>1){$pfstr+=' m="'+vschess.turnfen(vschess.pfchess[$chessid].attr("m"))+'"';}
else{$pfstr+=' m="'+vschess.pfchess[$chessid].attr("m")+'"';}
if(vschess.pfchess[$chessid].attr("c")){$pfstr+=' c="'+vschess.pfchess[$chessid].attr("c")+'"';}
if(vschess.turn[$chessid]>1){var $turnpf=$("<div>"+vschess.pfchess[$chessid].html()+"</div>");$turnpf.find("div").each(function(){$(this).attr("m",(function($step){var $result;switch($step[0]){case"a":$result="i";break;case"b":$result="h";break;case"c":$result="g";break;case"d":$result="f";break;case"e":$result="e";break;case"f":$result="d";break;case"g":$result="c";break;case"h":$result="b";break;case"i":$result="a";break;}
$result+=$step[1];switch($step[2]){case"a":$result+="i";break;case"b":$result+="h";break;case"c":$result+="g";break;case"d":$result+="f";break;case"e":$result+="e";break;case"f":$result+="d";break;case"g":$result+="c";break;case"h":$result+="b";break;case"i":$result+="a";break;}
return $result+$step[3];})($(this).attr("m").split("")));});$pfstr+='>'+$turnpf.html().replace(/<div/ig,"<n").replace(/<\/div>/ig,"</n>").replace(/>([\s]*)</g,"><")+"</n>";}
else{$pfstr+='>'+vschess.pfchess[$chessid].html().replace(/<div/ig,"<n").replace(/<\/div>/ig,"</n>").replace(/>([\s]*)</g,"><")+"</n>";}
$("#vschess_mobilepost").contents().find("#vschess_data").val($pfstr);$("#vschess_mobilepost").contents().find("#vschess_chess").submit();},100);});$this.find("li.vsbar_blogeach").click(function(){if(vschess.turl==""){$this.find("div.vschess_bar ul").hide();var $html='<iframe id="vschess_blogpost" frameborder="0" style="width:0px;height:0px;margin:0;" />';$("#vschess_blogpost").remove();$("body").append($html);var $pfstr='<?xml version="1.0" encoding="utf-8"?><n version="2"';$pfstr+=' win="'+vschess.pfchess[$chessid].attr("win")+'"';$pfstr+=' create-time="'+vschess.pfchess[$chessid].attr("create-time")+'"';if(vschess.turn[$chessid]>1){$pfstr+=' m="'+vschess.turnfen(vschess.pfchess[$chessid].attr("m"))+'"';}
else{$pfstr+=' m="'+vschess.pfchess[$chessid].attr("m")+'"';}
if(vschess.pfchess[$chessid].attr("c")){$pfstr+=' c="'+vschess.pfchess[$chessid].attr("c")+'"';}
if(vschess.turn[$chessid]>1){var $turnpf=$("<div>"+vschess.pfchess[$chessid].html()+"</div>");$turnpf.find("div").each(function(){$(this).attr("m",(function($step){var $result;switch($step[0]){case"a":$result="i";break;case"b":$result="h";break;case"c":$result="g";break;case"d":$result="f";break;case"e":$result="e";break;case"f":$result="d";break;case"g":$result="c";break;case"h":$result="b";break;case"i":$result="a";break;}
$result+=$step[1];switch($step[2]){case"a":$result+="i";break;case"b":$result+="h";break;case"c":$result+="g";break;case"d":$result+="f";break;case"e":$result+="e";break;case"f":$result+="d";break;case"g":$result+="c";break;case"h":$result+="b";break;case"i":$result+="a";break;}
return $result+$step[3];})($(this).attr("m").split("")));});$pfstr+='>'+$turnpf.html().replace(/<div/ig,"<n").replace(/<\/div>/ig,"</n>").replace(/>([\s]*)</g,"><")+"</n>";}
else{$pfstr+='>'+vschess.pfchess[$chessid].html().replace(/<div/ig,"<n").replace(/<\/div>/ig,"</n>").replace(/>([\s]*)</g,"><")+"</n>";}
var $chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890",$hash="";for($i=0;$i<10;++$i){$hash+=$chars.charAt(Math.floor(Math.random()*62));}
var $htmlin='<form id="vschess_b_chess" style="margin:0px;" action="http://www.xiaxiangqi.com/microblog.html" method="post"><input id="vschess_b_data" type="hidden" name="data" value="" /><input type="hidden" name="hash" value="'+$hash+'" /></form>';window.open("http://www.xiaxiangqi.com/microblogwindow/"+$hash+"_"+$(this).attr("name")+".html","vschessshare","height=600,width=700");setTimeout(function(){$("#vschess_blogpost").contents().find("body").append($htmlin);$("#vschess_blogpost").contents().find("#vschess_b_data").val($pfstr);$("#vschess_blogpost").contents().find("#vschess_b_chess").submit();},100);}
else{if(vschess.turl=="this"){var turl=encodeURIComponent(document.location.href);}
else{var turl=encodeURIComponent(vschess.turl);}
var ttips=encodeURIComponent(document.title);if(vschess.server==""){var tpic=encodeURIComponent("http://www.xiaxiangqi.com/chesspic/"+vschess.pfchess[$chessid].attr("m")+".png");}
else{var tpic=encodeURIComponent(vschess.server+"action=pic&fen="+vschess.pfchess[$chessid].attr("m"));}
switch($(this).attr("name")){case'renren':var shareUrl="http://widget.renren.com/dialog/share?resourceUrl="+turl+"&srcUrl="+turl+"&title="+ttips+"&description=&pic="+tpic+"";break;case'qqzone':var shareUrl="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url="+turl+"&title="+ttips+"&desc=&summary=&site=&pics="+tpic+"";break;case'pengyou':var shareUrl="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?to=pengyou&url="+turl+"";break;case'kaixin':var shareUrl="http://www.kaixin001.com/rest/records.php?url="+turl+"&content="+ttips+"&style=11";break;case'tqq':var shareUrl="http://share.v.t.qq.com/index.php?c=share&a=index&url="+turl+"&title="+ttips+"&pic="+tpic+"";break;case't163':var shareUrl="http://t.163.com/article/user/checkLogin.do?info="+ttips+"+"+turl+"";break;case'tsohu':var shareUrl="http://t.sohu.com/third/post.jsp?url="+turl+"&title="+ttips+"";break;case'qqmark':var shareUrl="http://shuqian.qq.com/post?from=3&uri="+turl+"&title="+ttips+"";break;case'douban':var shareUrl="http://shuo.douban.com/!service/share?href="+turl+"&name="+ttips+"";break;default:var shareUrl="http://v.t.sina.com.cn/share/share.php?url="+turl+"&title="+ttips+"&pic="+tpic+"";break;}
window.open(shareUrl,"vschessshare","height=600,width=700");}});if(!IE6){$this.find("div.vschess_comment").hover(function(){var $thiswidth=$this.find("textarea.vschess_comment").width();if($thiswidth<200){$this.find("div.vschess_comment_bigh").show();}
else{$this.find("div.vschess_comment_big").show();$this.find("div.vschess_comment_small").show();}},function(){$this.find("div.vschess_comment_bigh").hide();$this.find("div.vschess_comment_big").hide();$this.find("div.vschess_comment_small").hide();});}
$this.find("div.vschess_comment_bigh,div.vschess_comment_big").click(function(){var change=300;var textarea=$this.find("textarea.vschess_comment");textarea.animate({"width":textarea.width()+change,"margin-right":parseInt(textarea.css("margin-right"))-change},300);$this.find("div.vschess_comment_bigh").hide();$this.find("div.vschess_comment_big").show();$this.find("div.vschess_comment_small").show();$this.find("div.vschess_comment_bigh").animate({"margin-left":parseInt($this.find("div.vschess_comment_bigh").css("margin-left"))+change},300);$this.find("div.vschess_comment_big").animate({"margin-left":parseInt($this.find("div.vschess_comment_big").css("margin-left"))+change},300);$this.find("div.vschess_comment_small").animate({"margin-left":parseInt($this.find("div.vschess_comment_small").css("margin-left"))+change},300);});$this.find("div.vschess_comment_small").click(function(){var change=300;var textarea=$this.find("textarea.vschess_comment");if(textarea.width()>169){textarea.animate({"width":textarea.width()-change,"margin-right":parseInt(textarea.css("margin-right"))+change},300);$this.find("div.vschess_comment_bigh").animate({"margin-left":parseInt($this.find("div.vschess_comment_bigh").css("margin-left"))-change},300);$this.find("div.vschess_comment_big").animate({"margin-left":parseInt($this.find("div.vschess_comment_big").css("margin-left"))-change},300);$this.find("div.vschess_comment_small").animate({"margin-left":parseInt($this.find("div.vschess_comment_small").css("margin-left"))-change},300);}
else{$this.find("div.vschess_comment_bigh").show();$this.find("div.vschess_comment_big").hide();$this.find("div.vschess_comment_small").hide();}});if(IE){$this.find("li.vsbar_copy").click(function(){$this.find("ul.vsbar_funclist").hide();if(vschess.turn[$chessid]>1){window.clipboardData.setData("Text",vschess.turnfen(vschess.api.id($chessid).currentfen()));}
else{window.clipboardData.setData("Text",vschess.api.id($chessid).currentfen());}
vschess.showmsg("局面复制成功，您可以直接在象棋软件中粘贴使用！");});}
else{vschess.clip[$chessid]=new ZeroClipboard.Client();vschess.clip[$chessid].setHandCursor(true);vschess.clip[$chessid].addEventListener('complete',function(client,text){$this.find("ul.vsbar_funclist").hide();vschess.clip[$chessid].hide();vschess.showmsg("局面复制成功，您可以直接在象棋软件中粘贴使用！");});if(vschess.turn[$chessid]>1){vschess.clip[$chessid].setText(vschess.turnfen(vschess.api.id($chessid).currentfen()));}
else{vschess.clip[$chessid].setText(vschess.api.id($chessid).currentfen());}
$("#vschess_copy_"+$chessid).mouseover(function(){vschess.clip[$chessid].reposition();});$this.find("div.vschess_bar li").click(function(){vschess.clip[$chessid].hide();});}})();vschess.api.id($chessid).format("chinese");if($arguments.editmode){$editposition();}
if(vschess.server){if($arguments.live=="play"){$this.attr("live",$arguments.live).attr("liveid",$arguments.id);$.get(vschess.server+"action=live&id="+$arguments.id+"&mode=getdom",{random:Math.random()},function($str){if($str==""){$str="<n version=\"2\" create-time=\"*\" win=\"*\" m=\"rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1\"></n>";}
$pfdom=vschess.pfchess[$chessid]=$($str.replace(/<\?xml(.*)\?>/,"").replace(/<n/ig,"<div").replace(/<\/n>/ig,"</div>"));var $livestep=parseInt($pfdom.attr("step"));if(parseInt($pfdom.attr("stop"))){vschess.livepause[$chessid]=true;$this.removeAttr("live liveid");$arguments.live=="";vschess.livepause[$chessid]=true;$this.find("input.vsbar_play,input.vsbar_stop").hide();if($arguments.live=="play"){$this.find("input.vsbar_ctrl,input.vsbar_time").show();}}
$pfdom.removeAttr("step stop");vschess.pfreload[$chessid]();vschess.api.id($chessid);vschess.api.format(vschess.api.format());vschess.api.step($livestep);});}
if($arguments.live=="view"){$this.attr("live",$arguments.live).attr("liveid",$arguments.id);var $prevstep=0;$.get(vschess.server+"action=live&id="+$arguments.id+"&mode=getdom",{random:Math.random()},function($str){if($str==""){$str="<n version=\"2\" create-time=\"*\" win=\"*\" m=\"rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1\"></n>";}
$pfdom=vschess.pfchess[$chessid]=$($str.replace(/<\?xml(.*)\?>/,"").replace(/<n/ig,"<div").replace(/<\/n>/ig,"</div>"));var $livestep=parseInt($pfdom.attr("step"));if(parseInt($pfdom.attr("stop"))){vschess.livepause[$chessid]=true;$this.removeAttr("live liveid");$arguments.live=="";vschess.livepause[$chessid]=true;$this.find("input.vsbar_play,input.vsbar_stop").hide();if($arguments.live=="play"){$this.find("input.vsbar_ctrl,input.vsbar_time").show();}}
$pfdom.removeAttr("step stop");vschess.pfreload[$chessid]();vschess.api.id($chessid);vschess.api.format(vschess.api.format());vschess.api.step($livestep);$prevstep=$livestep;});$this.find("textarea.vschess_comment").attr("readonly","readonly");vschess.getnewdom[$chessid]=function(){$.get(vschess.server+"action=live&id="+$arguments.id+"&mode=getdom",{random:Math.random()},function($str){if($str==""){$str="<n version=\"2\" create-time=\"*\" win=\"*\" m=\"rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1\"></n>";}
$pfdom=vschess.pfchess[$chessid]=$($str.replace(/<\?xml(.*)\?>/,"").replace(/<n/ig,"<div").replace(/<\/n>/ig,"</div>"));var $livestep=parseInt($pfdom.attr("step"));var $livestop=parseInt($pfdom.attr("stop"));$pfdom.removeAttr("step stop");if($livestop==1){if(typeof $arguments.refreshtime=="number"&&$arguments.refreshtime>0){clearInterval($_live);}
$this.removeAttr("live liveid");$arguments.live="";vschess.livepause[$chessid]=true;$bindclick();$this.find("input.vsbar_view").hide();$this.find("input.vsbar_ctrl,input.vsbar_time").show();$this.find("textarea.vschess_comment").removeAttr("readonly");}
vschess.pfreload[$chessid]();vschess.api.id($chessid);if(!vschess.livepause[$chessid]){if($livestep>0&&$livestep==$jumian_each.length-1&&$livestep==$prevstep+1){vschess.api.step($livestep-1);vschess.api.format(vschess.api.format());vschess.api.play(1);}
else{vschess.api.step($livestep);vschess.api.format(vschess.api.format());}
$prevstep=$livestep;}
else{vschess.api.format(vschess.api.format());}});};vschess.getnewdom[$chessid]();if(typeof $arguments.refreshtime=="number"&&$arguments.refreshtime>0){var $_live=setInterval(function(){vschess.getnewdom[$chessid]();},$arguments.refreshtime);}}}});if(typeof $arguments.finish=="function"){$arguments.finish();}
return true;};vschess.unload=function($selector){var $uid=/vschess_loaded_([0-9]+)/.exec($($selector).attr("class"));if($uid){$uid=$uid[1];clearInterval(vschess.automove[$uid]);$($selector).find("*").unbind();$($selector).removeClass("vschess_loaded vschess_loaded_"+$uid).html(vschess.oldcontent[$uid]);if(typeof arguments[1]=="function"){arguments[1]();}
return true;}
else{if(typeof arguments[1]=="function"){arguments[1]();}
return false;}};vschess.showmsg=function($str){$("#vschess_message").removeAttr("style");if(vschess.iframe==0){$str+="<br />";}
$("#vschess_message").html($str+"<input type=\"button\" value=\"确定\" class=\"vschess_file_close\" style=\"float:right;width:50px;margin-top:5px;\" />");$("#vschess_message").css({"width":$("#vschess_message").width(),"height":$("#vschess_message").height(),"margin-top":-$("#vschess_message").outerHeight()/2,"margin-left":-$("#vschess_message").outerWidth()/2});if(IE6){$("#vschess_message").css({"margin-top":0,"margin-left":0,"top":0,"left":0}).show();if(typeof arguments[1]=="function"){arguments[1]();}}
else{$("#vschess_message").fadeIn(500,function(){if(typeof arguments[1]=="function"){arguments[1]();}});}
return true;};vschess.textboard=function($str){var $name=function($chessname){switch($chessname){case"R":return"(\u8f66)";case"N":return"(\u9a6c)";case"B":return"(\u76f8)";case"A":return"(\u4ed5)";case"K":return"(\u5e05)";case"C":return"(\u70ae)";case"P":return"(\u5175)";case"r":return"[\u8f66]";case"n":return"[\u9a6c]";case"b":return"[\u8c61]";case"a":return"[\u58eb]";case"k":return"[\u5c06]";case"c":return"[\u70ae]";case"p":return"[\u5352]";default:return"----";}};$str=$str.split(" ");var $cp=$str[1],$text="";var $jm=$str[0].replace(/1/g,"*").replace(/2/g,"**").replace(/3/g,"***").replace(/4/g,"****").replace(/5/g,"*****").replace(/6/g,"******").replace(/7/g,"*******").replace(/8/g,"********").replace(/9/g,"*********").replace(/\//g,"").split("");if($cp=="b"){$text+="\n             黑方 走棋方\n\n";}
else{$text+="\n                黑方\n\n";}
$text+=($jm[0]=="*")?" ┌-":$name($jm[0]);$text+=($jm[1]=="*")?"-┬-":$name($jm[1]);$text+=($jm[2]=="*")?"-┬-":$name($jm[2]);$text+=($jm[3]=="*")?"-┬-":$name($jm[3]);$text+=($jm[4]=="*")?"-┬-":$name($jm[4]);$text+=($jm[5]=="*")?"-┬-":$name($jm[5]);$text+=($jm[6]=="*")?"-┬-":$name($jm[6]);$text+=($jm[7]=="*")?"-┬-":$name($jm[7]);$text+=($jm[8]=="*")?"-┐ ":$name($jm[8]);$text+="\n │  │  │  │＼│／│  │  │  │ \n";$text+=($jm[9]=="*")?" ├-":$name($jm[9]);$text+=($jm[10]=="*")?"-┼-":$name($jm[10]);$text+=($jm[11]=="*")?"-┼-":$name($jm[11]);$text+=($jm[12]=="*")?"-┼-":$name($jm[12]);$text+=($jm[13]=="*")?"-※-":$name($jm[13]);$text+=($jm[14]=="*")?"-┼-":$name($jm[14]);$text+=($jm[15]=="*")?"-┼-":$name($jm[15]);$text+=($jm[16]=="*")?"-┼-":$name($jm[16]);$text+=($jm[17]=="*")?"-┤ ":$name($jm[17]);$text+="\n │  │  │  │／│＼│  │  │  │ \n";$text+=($jm[18]=="*")?" ├-":$name($jm[18]);$text+=($jm[19]=="*")?"-┼-":$name($jm[19]);$text+=($jm[20]=="*")?"-┼-":$name($jm[20]);$text+=($jm[21]=="*")?"-┼-":$name($jm[21]);$text+=($jm[22]=="*")?"-┼-":$name($jm[22]);$text+=($jm[23]=="*")?"-┼-":$name($jm[23]);$text+=($jm[24]=="*")?"-┼-":$name($jm[24]);$text+=($jm[25]=="*")?"-┼-":$name($jm[25]);$text+=($jm[26]=="*")?"-┤ ":$name($jm[26]);$text+="\n │  │  │  │  │  │  │  │  │ \n";$text+=($jm[27]=="*")?" ├-":$name($jm[27]);$text+=($jm[28]=="*")?"-┼-":$name($jm[28]);$text+=($jm[29]=="*")?"-┼-":$name($jm[29]);$text+=($jm[30]=="*")?"-┼-":$name($jm[30]);$text+=($jm[31]=="*")?"-┼-":$name($jm[31]);$text+=($jm[32]=="*")?"-┼-":$name($jm[32]);$text+=($jm[33]=="*")?"-┼-":$name($jm[33]);$text+=($jm[34]=="*")?"-┼-":$name($jm[34]);$text+=($jm[35]=="*")?"-┤ ":$name($jm[35]);$text+="\n │  │  │  │  │  │  │  │  │ \n";$text+=($jm[36]=="*")?" ├-":$name($jm[36]);$text+=($jm[37]=="*")?"-┴-":$name($jm[37]);$text+=($jm[38]=="*")?"-┴-":$name($jm[38]);$text+=($jm[39]=="*")?"-┴-":$name($jm[39]);$text+=($jm[40]=="*")?"-┴-":$name($jm[40]);$text+=($jm[41]=="*")?"-┴-":$name($jm[41]);$text+=($jm[42]=="*")?"-┴-":$name($jm[42]);$text+=($jm[43]=="*")?"-┴-":$name($jm[43]);$text+=($jm[44]=="*")?"-┤ ":$name($jm[44]);$text+="\n │    楚  河          汉  界    │ \n";$text+=($jm[45]=="*")?" ├-":$name($jm[45]);$text+=($jm[46]=="*")?"-┬-":$name($jm[46]);$text+=($jm[47]=="*")?"-┬-":$name($jm[47]);$text+=($jm[48]=="*")?"-┬-":$name($jm[48]);$text+=($jm[49]=="*")?"-┬-":$name($jm[49]);$text+=($jm[50]=="*")?"-┬-":$name($jm[50]);$text+=($jm[51]=="*")?"-┬-":$name($jm[51]);$text+=($jm[52]=="*")?"-┬-":$name($jm[52]);$text+=($jm[53]=="*")?"-┤ ":$name($jm[53]);$text+="\n │  │  │  │  │  │  │  │  │ \n";$text+=($jm[54]=="*")?" ├-":$name($jm[54]);$text+=($jm[55]=="*")?"-┼-":$name($jm[55]);$text+=($jm[56]=="*")?"-┼-":$name($jm[56]);$text+=($jm[57]=="*")?"-┼-":$name($jm[57]);$text+=($jm[58]=="*")?"-┼-":$name($jm[58]);$text+=($jm[59]=="*")?"-┼-":$name($jm[59]);$text+=($jm[60]=="*")?"-┼-":$name($jm[60]);$text+=($jm[61]=="*")?"-┼-":$name($jm[61]);$text+=($jm[62]=="*")?"-┤ ":$name($jm[62]);$text+="\n │  │  │  │  │  │  │  │  │ \n";$text+=($jm[63]=="*")?" ├-":$name($jm[63]);$text+=($jm[64]=="*")?"-┼-":$name($jm[64]);$text+=($jm[65]=="*")?"-┼-":$name($jm[65]);$text+=($jm[66]=="*")?"-┼-":$name($jm[66]);$text+=($jm[67]=="*")?"-┼-":$name($jm[67]);$text+=($jm[68]=="*")?"-┼-":$name($jm[68]);$text+=($jm[69]=="*")?"-┼-":$name($jm[69]);$text+=($jm[70]=="*")?"-┼-":$name($jm[70]);$text+=($jm[71]=="*")?"-┤ ":$name($jm[71]);$text+="\n │  │  │  │＼│／│  │  │  │ \n";$text+=($jm[72]=="*")?" ├-":$name($jm[72]);$text+=($jm[73]=="*")?"-┼-":$name($jm[73]);$text+=($jm[74]=="*")?"-┼-":$name($jm[74]);$text+=($jm[75]=="*")?"-┼-":$name($jm[75]);$text+=($jm[76]=="*")?"-※-":$name($jm[76]);$text+=($jm[77]=="*")?"-┼-":$name($jm[77]);$text+=($jm[78]=="*")?"-┼-":$name($jm[78]);$text+=($jm[79]=="*")?"-┼-":$name($jm[79]);$text+=($jm[80]=="*")?"-┤ ":$name($jm[80]);$text+="\n │  │  │  │／│＼│  │  │  │ \n";$text+=($jm[81]=="*")?" └-":$name($jm[81]);$text+=($jm[82]=="*")?"-┴-":$name($jm[82]);$text+=($jm[83]=="*")?"-┴-":$name($jm[83]);$text+=($jm[84]=="*")?"-┴-":$name($jm[84]);$text+=($jm[85]=="*")?"-┴-":$name($jm[85]);$text+=($jm[86]=="*")?"-┴-":$name($jm[86]);$text+=($jm[87]=="*")?"-┴-":$name($jm[87]);$text+=($jm[88]=="*")?"-┴-":$name($jm[88]);$text+=($jm[89]=="*")?"-┘ ":$name($jm[89]);if($cp=="b"){$text+="\n\n                红方";}
else{$text+="\n\n             红方 走棋方";}
return $text;};vschess.sound={step:function(step,$chessid){var eachLetter=step.split(""),timeSplit=230;switch(eachLetter[0]){case"车":vschess.sound.r($chessid);break;case"马":vschess.sound.n($chessid);break;case"相":case"象":vschess.sound.b($chessid);break;case"仕":case"士":vschess.sound.a($chessid);break;case"帅":vschess.sound.rk($chessid);break;case"将":vschess.sound.bk($chessid);break;case"炮":vschess.sound.c($chessid);break;case"兵":vschess.sound.rp($chessid);break;case"卒":vschess.sound.bp($chessid);break;case"一":vschess.sound.n1($chessid);break;case"二":vschess.sound.n2($chessid);break;case"三":vschess.sound.n3($chessid);break;case"四":vschess.sound.n4($chessid);break;case"五":vschess.sound.n5($chessid);break;case"前":vschess.sound.qian($chessid);break;case"中":vschess.sound.zhong($chessid);break;case"后":vschess.sound.hou($chessid);break;}
setTimeout(function(){switch(eachLetter[1]){case"车":vschess.sound.r($chessid);break;case"马":vschess.sound.n($chessid);break;case"炮":vschess.sound.c($chessid);break;case"兵":vschess.sound.rp($chessid);break;case"卒":vschess.sound.bp($chessid);break;case"一":case"１":vschess.sound.n1($chessid);break;case"二":case"２":vschess.sound.n2($chessid);break;case"三":case"３":vschess.sound.n3($chessid);break;case"四":case"４":vschess.sound.n4($chessid);break;case"五":case"５":vschess.sound.n5($chessid);break;case"六":case"６":vschess.sound.n6($chessid);break;case"七":case"７":vschess.sound.n7($chessid);break;case"八":case"８":vschess.sound.n8($chessid);break;case"九":case"９":vschess.sound.n9($chessid);break;}
setTimeout(function(){switch(eachLetter[2]){case"进":vschess.sound.jin($chessid);break;case"退":vschess.sound.tui($chessid);break;case"平":vschess.sound.ping($chessid);break;}
setTimeout(function(){switch(eachLetter[3]){case"一":case"１":vschess.sound.n1($chessid);break;case"二":case"２":vschess.sound.n2($chessid);break;case"三":case"３":vschess.sound.n3($chessid);break;case"四":case"４":vschess.sound.n4($chessid);break;case"五":case"５":vschess.sound.n5($chessid);break;case"六":case"６":vschess.sound.n6($chessid);break;case"七":case"７":vschess.sound.n7($chessid);break;case"八":case"８":vschess.sound.n8($chessid);break;case"九":case"９":vschess.sound.n9($chessid);break;}},timeSplit);},timeSplit);},timeSplit);}};$.each(vschess.soundlist,function(){var name=this.toString();vschess.sound[name]=function(ChessID){if(vschess.soundpath){try{var $this=document.getElementById("vschess_sound_"+name);if(IE){$this.settings.volume=vschess.volume[ChessID];$this.controls.stop();$this.controls.play();}
else{$this.volume=vschess.volume[ChessID]/100;$this.pause();$this.currentTime=0;$this.play();}}
catch(e){}}};});vschess.api={boardid:0,thisdom:$(".vschess_loaded_0")};vschess.api.id=function(){$value=parseInt(arguments[0]);if($value||$value===0){vschess.api.boardid=$value;if(vschess.api.boardid<0){vschess.api.boardid=0;}
if(vschess.api.boardid>vschess.chessid){vschess.api.boardid=vschess.chessid;}
vschess.api.thisdom=$(".vschess_loaded_"+vschess.api.boardid);vschess.resetdom[vschess.api.boardid]();return vschess.api;}
else{return vschess.api.boardid;}};vschess.api.beginfen=function(){return vschess.beginfen[vschess.api.boardid];};vschess.api.beginFen=vschess.api.beginfen;vschess.api.beginplayer=function(){var $temp=vschess.api.beginfen().split(" ");if($temp[1]=="b"){return"b";}
else{return"w";}};vschess.api.beginPlayer=vschess.api.beginplayer;vschess.api.beginround=function(){var $temp=vschess.beginfen[vschess.api.boardid].split(" ");return parseInt($temp[5]);};vschess.api.beginRound=vschess.api.beginround;vschess.api.result=function(){switch(vschess.result[vschess.api.boardid]){case 0:return 0;case 1:return 1;case 3:return 3;default:return 2;}};vschess.api.currentfen=function(){if(vschess.usermove[vschess.api.boardid]>0){var $getman=function($man){switch(vschess.api.thisdom.find("img.vschess_box:eq("+$man+")").attr("src")){case vschess.pics.rr:case vschess.pics.rrs:return"R";case vschess.pics.rn:case vschess.pics.rns:return"N";case vschess.pics.rb:case vschess.pics.rbs:return"B";case vschess.pics.ra:case vschess.pics.ras:return"A";case vschess.pics.rk:case vschess.pics.rks:return"K";case vschess.pics.rc:case vschess.pics.rcs:return"C";case vschess.pics.rp:case vschess.pics.rps:return"P";case vschess.pics.br:case vschess.pics.brs:return"r";case vschess.pics.bn:case vschess.pics.bns:return"n";case vschess.pics.bb:case vschess.pics.bbs:return"b";case vschess.pics.ba:case vschess.pics.bas:return"a";case vschess.pics.bk:case vschess.pics.bks:return"k";case vschess.pics.bc:case vschess.pics.bcs:return"c";case vschess.pics.bp:case vschess.pics.bps:return"p";case vschess.pics.no:case vschess.pics.nos:return"*";default:return"-";}};var $userfen="",$currentplayer="w",$i;var $usermove=vschess.usermove[vschess.api.boardid];var $bgplayer=vschess.api.beginplayer();var $bground=vschess.api.beginround();var $crround=vschess.api.step();for($i=0;$i<90;++$i){$userfen+=$getman($i);if($i%9==8&&$i!=89){$userfen+="/";}}
$userfen=$userfen.replace(/\*\*\*\*\*\*\*\*\*/g,"9").replace(/\*\*\*\*\*\*\*\*/g,"8").replace(/\*\*\*\*\*\*\*/g,"7").replace(/\*\*\*\*\*\*/g,"6").replace(/\*\*\*\*\*/g,"5").replace(/\*\*\*\*/g,"4").replace(/\*\*\*/g,"3").replace(/\*\*/g,"2").replace(/\*/g,"1");if($usermove%2==1){$bgplayer=="b"?$currentplayer="w":$currentplayer="b";}
else{$bgplayer=="b"?$currentplayer="b":$currentplayer="w";}
if($bgplayer=="b"){$currentround=$bground+($usermove%2?($usermove+1)/2:($usermove)/2)+($crround%2?($crround+1)/2:($crround)/2);}
else{$currentround=$bground+($usermove%2?($usermove-1)/2:($usermove)/2)+($crround%2?($crround-1)/2:($crround)/2);}
$userfen+=" "+$currentplayer+" - - 0 "+$currentround;return $userfen;}
else{return vschess.currentfen[vschess.api.boardid];}};vschess.api.currentFen=vschess.api.currentfen;vschess.api.eachfen=function(){$value=arguments[0];if($value||$value===0){var $crround=parseInt($value);if($crround<=0){$crround=0;}
if($crround>=vschess.situation[vschess.api.boardid].length-1){$crround=vschess.situation[vschess.api.boardid].length-1;}
var $userfen="",$fenarray,$currentplayer="w",$i;var $bgplayer=vschess.api.beginplayer();var $bground=vschess.api.beginround();$fenarray=vschess.situation[vschess.api.boardid][$crround].clone();for($i=0;$i<90;++$i){$userfen+=$fenarray[$i];if($i%9==8&&$i!=89){$userfen+="/";}}
$userfen=$userfen.replace(/\*\*\*\*\*\*\*\*\*/g,"9").replace(/\*\*\*\*\*\*\*\*/g,"8").replace(/\*\*\*\*\*\*\*/g,"7").replace(/\*\*\*\*\*\*/g,"6").replace(/\*\*\*\*\*/g,"5").replace(/\*\*\*\*/g,"4").replace(/\*\*\*/g,"3").replace(/\*\*/g,"2").replace(/\*/g,"1");if($crround%2==1){$bgplayer=="b"?$currentplayer="w":$currentplayer="b";}
else{$bgplayer=="b"?$currentplayer="b":$currentplayer="w";}
if($bgplayer=="b"){$currentround=$bground+($crround%2?($crround+1)/2:($crround)/2);}
else{$currentround=$bground+($crround%2?($crround-1)/2:($crround)/2);}
$userfen+=" "+$currentplayer+" - - 0 "+$currentround;return $userfen;}
else{return vschess.currentfen[vschess.api.boardid];}};vschess.api.eachFen=vschess.api.eachfen;vschess.api.maxid=function(){return vschess.chessid;};vschess.api.maxId=vschess.api.maxid;vschess.api.maxID=vschess.api.maxid;vschess.api.animate=function(){$value=arguments[0];if($value||$value===0){if($value==1){vschess.animate[vschess.api.boardid]=1;vschess.api.thisdom.find("input.vschess_config_animate").attr("checked","checked");}
else{vschess.animate[vschess.api.boardid]=0;vschess.api.thisdom.find("input.vschess_config_animate").attr("checked",false);}
if(typeof arguments[1]=="function"){arguments[1]();}
return vschess.api;}
else{return vschess.animate[vschess.api.boardid];}};vschess.api.automove=function(){$value=arguments[0];if($value||$value===0){if($value==1){vschess.autoMove[vschess.api.boardid]=1;vschess.api.thisdom.find("input.vschess_config_automove").attr("checked","checked");}
else{vschess.autoMove[vschess.api.boardid]=0;vschess.api.thisdom.find("input.vschess_config_automove").attr("checked",false);}
if(typeof arguments[1]=="function"){arguments[1]();}
return vschess.api;}
else{return vschess.autoMove[vschess.api.boardid];}};vschess.api.autoMove=vschess.api.automove;vschess.api.chinesesoundstatus=function(){$value=arguments[0];if($value||$value===0){if($value==1){vschess.chineseSoundStatus[vschess.api.boardid]=1;vschess.api.thisdom.find("input.vschess_config_chineseSoundStatus").attr("checked","checked");}
else{vschess.chineseSoundStatus[vschess.api.boardid]=0;vschess.api.thisdom.find("input.vschess_config_chineseSoundStatus").attr("checked",false);}
if(typeof arguments[1]=="function"){arguments[1]();}
return vschess.api;}
else{return vschess.chineseSoundStatus[vschess.api.boardid];}};vschess.api.chineseSoundStatus=vschess.api.chinesesoundstatus;vschess.api.tips=function(){$value=arguments[0];if($value||$value===0){if($value==1){vschess.tips[vschess.api.boardid]=1;vschess.api.thisdom.find("input.vschess_config_tips").attr("checked","checked");}
else{vschess.tips[vschess.api.boardid]=0;vschess.api.thisdom.find("input.vschess_config_tips").attr("checked",false);vschess.api.thisdom.find("img.vschess_box").css("background-image","");}
if(typeof arguments[1]=="function"){arguments[1]();}
return vschess.api;}
else{return vschess.tips[vschess.api.boardid];}};vschess.api.sound=function(){$value=arguments[0];if($value||$value===0){if($value==1){vschess.soundState[vschess.api.boardid]=1;vschess.api.thisdom.find("input.vschess_config_sound").attr("checked","checked");}
else{vschess.soundState[vschess.api.boardid]=0;vschess.api.thisdom.find("input.vschess_config_sound").attr("checked",false);}
if(typeof arguments[1]=="function"){arguments[1]();}
return vschess.api;}
else{return vschess.soundState[vschess.api.boardid];}};vschess.api.checkmove=function(){$value=arguments[0];if($value||$value===0){if($value==1){vschess.checkmove[vschess.api.boardid]=1;vschess.api.thisdom.find("input.vschess_config_check").attr("checked","checked");}
else{vschess.checkmove[vschess.api.boardid]=0;vschess.api.thisdom.find("input.vschess_config_check").attr("checked",false);}
return vschess.api;if(typeof arguments[1]=="function"){arguments[1]();}}
else{return vschess.checkmove[vschess.api.boardid];}};vschess.api.checkMove=vschess.api.checkmove;vschess.api.format=function(){if($value=arguments[0]){vschess.api.thisdom.find("ul.vschess_node,div.vschess_node_title,div.vschess_node_close").hide();switch($value){case"wxf":{vschess.format[vschess.api.boardid]="wxf";if(vschess.turn[vschess.api.boardid]>1){vschess.api.thisdom.find("ul.steps").html(vschess.wxfhtmlm[vschess.api.boardid]);}
else{vschess.api.thisdom.find("ul.steps").html(vschess.wxfhtml[vschess.api.boardid]);}
break;}
case"iccs":{vschess.format[vschess.api.boardid]="iccs";if(vschess.turn[vschess.api.boardid]>1){vschess.api.thisdom.find("ul.steps").html(vschess.iccsmhtml[vschess.api.boardid]);}
else{vschess.api.thisdom.find("ul.steps").html(vschess.iccshtml[vschess.api.boardid]);}
break;}
default:{vschess.format[vschess.api.boardid]="chinese";if(vschess.turn[vschess.api.boardid]>1){vschess.api.thisdom.find("ul.steps").html(vschess.chinesehtmlm[vschess.api.boardid]);}
else{vschess.api.thisdom.find("ul.steps").html(vschess.chinesehtml[vschess.api.boardid]);}
break;}}
var $i=0,$pfnodes=[],$pfnthis=vschess.pfchess[vschess.api.boardid];while(true)
{$pfnodes[$i]=$pfnthis.children("div").length;if($pfnodes[$i]>1){vschess.api.thisdom.find("ul.steps li[name='"+($i+1)+"']").attr("oneofnodes","true").css({"color":"#00F"});}
if($pfnthis.children("div[default]").length==0){$pfnthis=$pfnthis.children("div:eq(0)").attr("default",true);}
else{$pfnthis=$pfnthis.children("div[default]");}
if($pfnthis.length==0){break;}
++$i;}
vschess.api.step(vschess.api.step(),false);vschess.api.thisdom.find("ul.steps li[name]").click(function(){var $clickdom=$(this);var $stepid=parseInt($clickdom.attr("name"));var $uid=/vschess_loaded_([0-9]+)/.exec($clickdom.parent().parent().parent().attr("class"));vschess.api.id($uid[1]).step($stepid);vschess.api.step()>0?vschess.api.shownodelist($stepid):vschess.api.hidenodelist();});if(vschess.api.thisdom.attr("live")=="view"&&vschess.api.play()==1){vschess.api.hidenodelist();}
else{vschess.api.step()>0?vschess.api.shownodelist(vschess.api.step()):vschess.api.hidenodelist();}
if(IE6){vschess.api.thisdom.find("ul.steps li[name]").hover(function(){$(this).addClass("hover");},function(){$(this).removeClass("hover");});}
if(typeof arguments[1]=="function"){arguments[1]();}
return vschess.api;}
else{return vschess.format[vschess.api.boardid];}};vschess.api.time=function(){if($value=arguments[0]){vschess.time_each[vschess.api.boardid]=0;switch(parseInt($value)){case 1:{vschess.time[vschess.api.boardid]=1;vschess.api.thisdom.find("input.vsbar_time").val("0.1秒");vschess.api.thisdom.find("img.vschess_boxfloat").css("-webkit-transition","0s");break;}
case 2:{vschess.time[vschess.api.boardid]=2;vschess.api.thisdom.find("input.vsbar_time").val("0.2秒");vschess.api.thisdom.find("img.vschess_boxfloat").css("-webkit-transition","0.1s");break;}
case 10:{vschess.time[vschess.api.boardid]=10;vschess.api.thisdom.find("input.vsbar_time").val("1秒");vschess.api.thisdom.find("img.vschess_boxfloat").css("-webkit-transition","0.2s");break;}
case 20:{vschess.time[vschess.api.boardid]=20;vschess.api.thisdom.find("input.vsbar_time").val("2秒");vschess.api.thisdom.find("img.vschess_boxfloat").css("-webkit-transition","0.2s");break;}
case 50:{vschess.time[vschess.api.boardid]=50;vschess.api.thisdom.find("input.vsbar_time").val("5秒");vschess.api.thisdom.find("img.vschess_boxfloat").css("-webkit-transition","0.2s");break;}
default:{vschess.time[vschess.api.boardid]=5;vschess.api.thisdom.find("input.vsbar_time").val("0.5秒");vschess.api.thisdom.find("img.vschess_boxfloat").css("-webkit-transition","0.2s");break;}}
if(typeof arguments[1]=="function"){arguments[1]();}
return vschess.api;}
else{return vschess.time[vschess.api.boardid];}};vschess.api.step=function(){$value=parseInt(arguments[0]);if($value||$value===0){vschess.api.thisdom.find("img.vschess_box").removeAttr("move").css("background-image","");vschess.move[vschess.api.boardid]=0;vschess.moveindex[vschess.api.boardid]=-1;vschess.usermove[vschess.api.boardid]=0;vschess.play[vschess.api.boardid]=0;vschess.step[vschess.api.boardid]=$value;vschess.api.thisdom.find("input.vsbar_first,input.vsbar_prev10,input.vsbar_prev").attr("disabled",false);vschess.api.thisdom.find("input.vsbar_next,input.vsbar_next10,input.vsbar_last").attr("disabled",false);if(vschess.api.thisdom.attr("live")=="view"&&!vschess.api.livepause()){vschess.api.thisdom.find("input.vsbar_first,input.vsbar_prev10,input.vsbar_prev").attr("disabled","disabled");vschess.api.thisdom.find("input.vsbar_next,input.vsbar_next10,input.vsbar_last").attr("disabled","disabled");}
else{if(vschess.step[vschess.api.boardid]<=0){vschess.step[vschess.api.boardid]=0;vschess.api.thisdom.find("input.vsbar_first,input.vsbar_prev10,input.vsbar_prev").attr("disabled","disabled");}
if(vschess.step[vschess.api.boardid]>=vschess.situation[vschess.api.boardid].length-1){vschess.play[vschess.api.boardid]=2;vschess.step[vschess.api.boardid]=vschess.situation[vschess.api.boardid].length-1;vschess.api.thisdom.find("input.vsbar_next,input.vsbar_next10,input.vsbar_last").attr("disabled","disabled");}}
vschess.putchessman[vschess.api.boardid](vschess.step[vschess.api.boardid]);vschess.api.thisdom.find("input.vsbar_ctrl").val("播放").removeClass("vsbar_pause");vschess.api.step()>0?vschess.api.shownodelist(vschess.api.step()):vschess.api.hidenodelist();if(!IE){if(vschess.turn[vschess.api.boardid]>1){vschess.clip[vschess.api.boardid].setText(vschess.turnfen(vschess.api.currentfen()));}
else{vschess.clip[vschess.api.boardid].setText(vschess.api.currentfen());}}
if(vschess.api.thisdom.attr("live")=="play"&&arguments[1]!==false){vschess.senddom[vschess.api.boardid]();}
if(typeof arguments[1]=="function"){arguments[1]();}
return vschess.api;}
else{return vschess.step[vschess.api.boardid];}};vschess.api.allstep=function(){return vschess.situation[vschess.api.boardid].length;};vschess.api.allStep=vschess.api.allstep;vschess.api.play=function(){$value=arguments[0];if($value||$value===0){if($value==1){if(vschess.api.step()==(vschess.api.allstep()-1)){vschess.api.step(0);}
vschess.play[vschess.api.boardid]=1;vschess.api.thisdom.find("input.vsbar_ctrl").val("暂停").attr("title","暂停播放棋谱").addClass("vsbar_pause");}
else if($value==2){vschess.play[vschess.api.boardid]=2;vschess.api.step(vschess.api.allstep()-1);vschess.api.thisdom.find("input.vsbar_ctrl").val("播放").attr("title","自动播放棋谱").removeClass("vsbar_pause");}
else{vschess.play[vschess.api.boardid]=0;if(vschess.api.step()==vschess.api.allstep()-1){vschess.play[vschess.api.boardid]=2;}
vschess.api.thisdom.find("input.vsbar_ctrl").val("播放").attr("title","自动播放棋谱").removeClass("vsbar_pause");}
if(typeof arguments[1]=="function"){arguments[1]();}
return vschess.api;}
else{return vschess.play[vschess.api.boardid];}};vschess.api.livepause=function(){$value=arguments[0];if($value||$value===false){if($value===true){vschess.livepause[vschess.api.boardid]=true;if(vschess.api.thisdom.attr("live")=="view"){vschess.api.thisdom.find("input.vsbar_view").val("继续收看").attr("title","继续收看直播").removeClass("vsbar_pause");}
else if(vschess.api.thisdom.attr("live")=="play"){vschess.api.thisdom.find("input.vsbar_play").val("继续").attr("title","继续直播棋谱").removeClass("vsbar_pause");}}
else{vschess.livepause[vschess.api.boardid]=false;if(vschess.api.thisdom.attr("live")=="view"){vschess.api.thisdom.find("input.vsbar_view").val("暂停收看").attr("title","暂停收看直播").addClass("vsbar_pause");vschess.api.step(vschess.api.step());}
else if(vschess.api.thisdom.attr("live")=="play"){vschess.api.thisdom.find("input.vsbar_play").val("暂停").attr("title","暂停直播棋谱").addClass("vsbar_pause");}
vschess.getnewdom[vschess.api.boardid]();}
vschess.api.step(vschess.api.step());if(typeof arguments[1]=="function"){arguments[1]();}
return vschess.api;}
else{return vschess.livepause[vschess.api.boardid];}};vschess.api.livePause=vschess.api.livepause;vschess.api.turn=function(){$value=arguments[0];if($value||$value===0){switch(parseInt($value)){case 1:vschess.turn[vschess.api.boardid]=1;break;case 2:vschess.turn[vschess.api.boardid]=2;break;case 3:vschess.turn[vschess.api.boardid]=3;break;default:vschess.turn[vschess.api.boardid]=0;break;}
switch(vschess.format[vschess.api.boardid]){case"wxf":vschess.api.format("wxf");break;case"iccs":vschess.api.format("iccs");break;default:vschess.api.format("chinese");break;}
if(typeof arguments[1]=="function"){arguments[1]();}
return vschess.api;}
else{return vschess.turn[vschess.api.boardid];}};vschess.api.eachstep=function($stepformat){if(arguments[1]){switch($stepformat){case"wxf":return vschess.wxfstepm[vschess.api.boardid].clone();case"iccs":return vschess.iccsstepm[vschess.api.boardid].clone();default:return vschess.chinesestepm[vschess.api.boardid].clone();}}
else{switch($stepformat){case"wxf":return vschess.wxfstep[vschess.api.boardid].clone();case"iccs":return vschess.iccsstep[vschess.api.boardid].clone();default:return vschess.chinesestep[vschess.api.boardid].clone();}}};vschess.api.eachStep=vschess.api.eachstep;vschess.api.pgn=function($stepformat){if(arguments[1]){switch($stepformat){case"wxf":return vschess.wxfpgnm[vschess.api.boardid];case"iccs":return vschess.iccspgnm[vschess.api.boardid];default:return vschess.chinesepgnm[vschess.api.boardid];}}
else{switch($stepformat){case"wxf":return vschess.wxfpgn[vschess.api.boardid];case"iccs":return vschess.iccspgn[vschess.api.boardid];default:return vschess.chinesepgn[vschess.api.boardid];}}};vschess.api.shownodelist=function($stepid){$stepid=$stepid-1;vschess.api.thisdom.find("ul.vschess_node").html("");var $pflthis=vschess.pfchess[vschess.api.boardid];for($i=0;$i<$stepid;++$i){if($pflthis.children("div[default]").length==0){$pflthis=$pflthis.children("div:eq(0)").attr("default",true);}
else{$pflthis=$pflthis.children("div[default]");}}
var $default_length=$pflthis.children("div[default]").length;$pflthis.children("div").each(function($index){if($(this).attr("default")||($default_length==0&&$index==0)){if($(this).attr("c")){vschess.api.thisdom.find("ul.vschess_node").append('<li name="'+$stepid+'" rel="'+$index+'" class="current">'
+'<span class="vschess_delete">删</span><span class="vschess_down">降</span><span class="vschess_up">升</span>'
+'<span class="step">'+vschess.convertstep($(this).attr('m'),vschess.api.boardid,$stepid)+'*</span></li>');}
else{vschess.api.thisdom.find("ul.vschess_node").append('<li name="'+$stepid+'" rel="'+$index+'" class="current">'
+'<span class="vschess_delete">删</span><span class="vschess_down">降</span><span class="vschess_up">升</span>'
+'<span class="step">'+vschess.convertstep($(this).attr('m'),vschess.api.boardid,$stepid)+'</span></li>');}}
else{if($(this).attr("c")){vschess.api.thisdom.find("ul.vschess_node").append('<li name="'+$stepid+'" rel="'+$index+'">'
+'<span class="vschess_delete">删</span><span class="vschess_down">降</span><span class="vschess_up">升</span>'
+'<span class="step">'+vschess.convertstep($(this).attr('m'),vschess.api.boardid,$stepid)+'*</span></li>');}
else{vschess.api.thisdom.find("ul.vschess_node").append('<li name="'+$stepid+'" rel="'+$index+'">'
+'<span class="vschess_delete">删</span><span class="vschess_down">降</span><span class="vschess_up">升</span>'
+'<span class="step">'+vschess.convertstep($(this).attr('m'),vschess.api.boardid,$stepid)+'</span></li>');}}});var $steptop=vschess.api.thisdom.find("ul.steps li[name='"+($stepid+1)+"']").position().top;vschess.api.thisdom.find("ul.vschess_node,div.vschess_node_title,div.vschess_node_close").css({"top":$steptop}).show();vschess.api.thisdom.find("ul.vschess_node li span.step").click(function(){var $uid=/vschess_loaded_([0-9]+)/.exec($(this).parent().parent().parent().attr("class"));vschess.api.id($uid[1]);vschess.api.thisdom.find("ul.vschess_node li").removeClass("current");$(this).parent().addClass("current");var $changestep=parseInt($(this).parent().attr("name"));var $changemove=parseInt($(this).parent().attr("rel"));var $setddom=vschess.pfchess[vschess.api.boardid];for($i=0;$i<$changestep;++$i){if($setddom.children("div[default]").length==0){$setddom=$setddom.children("div:eq(0)").attr("default",true);}
else{$setddom=$setddom.children("div[default]");}}
$setddom.children("div").removeAttr("default");$setddom.children("div:eq("+$changemove+")").attr("default",true);vschess.pfreload[vschess.api.boardid]();vschess.api.format(vschess.api.format());});vschess.api.thisdom.find("ul.vschess_node li span.vschess_up").click(function(){var $uid=/vschess_loaded_([0-9]+)/.exec($(this).parent().parent().parent().attr("class"));vschess.api.id($uid[1]);var $changestep=parseInt($(this).parent().attr("name"));var $changemove=parseInt($(this).parent().attr("rel"));var $setddom=vschess.pfchess[vschess.api.boardid];for($i=0;$i<$changestep;++$i){if($setddom.children("div[default]").length==0){$setddom=$setddom.children("div:eq(0)").attr("default",true);}
else{$setddom=$setddom.children("div[default]");}}
var $prev=$setddom.children("div:eq("+$changemove+")").prev();var $move=$setddom.children("div:eq("+$changemove+")");if($prev.length>0){$prev.before($move);}
var $prevthis=$(this).parent().prev();var $movethis=$(this).parent();if($prevthis.length>0){$prevthis.before($movethis);}
vschess.pfreload[vschess.api.boardid]();vschess.api.format(vschess.api.format());});vschess.api.thisdom.find("ul.vschess_node li span.vschess_down").click(function(){var $uid=/vschess_loaded_([0-9]+)/.exec($(this).parent().parent().parent().attr("class"));vschess.api.id($uid[1]);var $changestep=parseInt($(this).parent().attr("name"));var $changemove=parseInt($(this).parent().attr("rel"));var $setddom=vschess.pfchess[vschess.api.boardid];for($i=0;$i<$changestep;++$i){if($setddom.children("div[default]").length==0){$setddom=$setddom.children("div:eq(0)").attr("default",true);}
else{$setddom=$setddom.children("div[default]");}}
var $next=$setddom.children("div:eq("+$changemove+")").next();var $move=$setddom.children("div:eq("+$changemove+")");if($next.length>0){$next.after($move);}
var $nextthis=$(this).parent().next();var $movethis=$(this).parent();if($nextthis.length>0){$nextthis.after($movethis);}
vschess.pfreload[vschess.api.boardid]();vschess.api.format(vschess.api.format());});vschess.api.thisdom.find("ul.vschess_node li span.vschess_delete").click(function(){if(confirm("确定要删除该着法吗？该着法及之后的所有着法都将被删除！")){var $uid=/vschess_loaded_([0-9]+)/.exec($(this).parent().parent().parent().attr("class"));vschess.api.id($uid[1]);var $changestep=parseInt($(this).parent().attr("name"));var $changemove=parseInt($(this).parent().attr("rel"));var $setddom=vschess.pfchess[vschess.api.boardid];for($i=0;$i<$changestep;++$i){if($setddom.children("div[default]").length==0){$setddom=$setddom.children("div:eq(0)").attr("default",true);}
else{$setddom=$setddom.children("div[default]");}}
$setddom.children("div:eq("+$changemove+")").remove();vschess.pfreload[vschess.api.boardid]();vschess.api.format(vschess.api.format());}});vschess.api.thisdom.find("ul.vschess_node,div.vschess_node_title,div.vschess_node_close").show();if(typeof arguments[1]=="function"){arguments[1]();}
return vschess.api;};vschess.api.showNodeList=vschess.api.shownodelist;vschess.api.hidenodelist=function(){vschess.api.thisdom.find("ul.vschess_node,div.vschess_node_title,div.vschess_node_close").hide();if(typeof arguments[0]=="function"){arguments[0]();}
return vschess.api;};vschess.api.hideNodeList=vschess.api.hidenodelist;vschess.api.refreshchess=function(){vschess.getnewdom[vschess.api.boardid]();return vschess.api;};vschess.api.refreshChess=vschess.api.refreshchess;vschess.api.toString=function(){return"微思象棋播放器"+vschess.version;};if(typeof window.vschess=="undefined"){window.vschess=vschess;$.fn.vschess=function(){if(typeof arguments[0]!="undefined"){var $args=arguments[0];}
return this.each(function(){if(typeof $args=="undefined"){vschess.load(this);}
else{vschess.load(this,$args);}});};}
})(jQuery,window);