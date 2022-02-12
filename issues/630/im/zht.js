document.writeln("<iframe name='upfrm' style='display:none' src='about:blank' width='0' height='0'></iframe><iframe name='jq' style='display:none' src='about:blank' width='0' height='0'></iframe>")
if(top!==self){top.location.href=location.href;}
if(navigator.userAgent.indexOf('UCBrowser') > -1) {
if( document.getElementById("web_agent")!=undefined) 
{top.location.href=document.getElementById("web_agent").content;}
}

var xmlHttp = false;
var tablesorter = false;
try {
    xmlHttp = new XMLHttpRequest();
} catch(trymicrosoft) {
    try {
        xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch(othermicrosoft) {
        try {
            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch(failed) {
            xmlHttp = false;
			alert("启用Ajax功能失败，请更换浏览器试试？");
        }
    }
}
function zhenbi(url,msg){
	if (msg>0 && document.getElementById("id").value==""){
		if(document.getElementById("upfor")!=undefined){
			alert("您好，请先上传您的图片^.^ 急切网！");return false;
		}else{
			alert("您好，请先输入您的文字^.^ 急切网！");return false;
		}
	}
	document.getElementById('up').disabled=true;
	MyWebSend = "id="+encodeURIComponent(document.all.id.value)+"&zhenbi=20191123";
	for(var i=1;i<50;i++){
		if(document.getElementById("id"+i)!=undefined){
			MyWebSend+= "&id"+i+"="+encodeURIComponent(document.getElementById("id"+i).value);
		}
	}
	
	xmlHttp.open("POST",url,true);
	xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlHttp.onreadystatechange=function(){zhenbi_com(msg)};
	xmlHttp.send(MyWebSend);
	document.getElementById("out").innerHTML="很努力地加载中..."
}
function template(obj){
	var out = "";
	for (x in obj)
	{
		if(obj[x].type[0]=="zhenbi-1img"){
			var fit = "";
			for(var y = 0,len = obj[x].info.length; y < len; y++){
				fit += "<li><a><img src=\"" + obj[x].info[y] + "\"></a></li>";
			}
			out +="<div class=\"" + obj[x].type[1] + "\">" + fit + "</div>";
		}
		else if(obj[x].type[0]=="zhenbi-2img"){
			var fit = "";
			for(var y = 0,len = obj[x].info.length; y < len; y=y+2){
				fit += "<li><a href=\"" + obj[x].info[y] + "\"><img src=\"" + obj[x].info[y+1] + "\"></a></li>";
			}
			out +="<div class=\"" + obj[x].type[1] + "\">" + fit + "</div>";
		}	
		else if(obj[x].type[0]=="zhenbi-1nav"){
			var fit = "";
			for(var y = 0,len = obj[x].info.length; y < len; y++){
				fit +="<a>" + obj[x].info[y] + "</a>";
			}
			out +="<div class=\"" + obj[x].type[1] + "\"><span class=\"" + obj[x].type[2] + "\">" + fit + "</span></div>";
		}else if(obj[x].type[0]=="zhenbi-2nav"){
			var fit = "";
			for(var y = 0,len = obj[x].info.length; y < len; y=y+2){
				fit +="<a href=\"" + obj[x].info[y] + "\">" + obj[x].info[y+1] + "</a>";
			}
			out +="<div class=\"" + obj[x].type[1] + "\"><span class=\"" + obj[x].type[2] + "\">" + fit + "</span></div>";
		}
		else if(obj[x].type[0]=="zhenbi-1chr"){
			var fit = "";
			for(var y = 0,len = obj[x].info.length; y < len; y=y+2){
				fit +="<div class=\"" + obj[x].info[y] + "\">" + obj[x].info[y+1] + "</div>";
			}
			out +="<div class=\"" + obj[x].type[1] + "\">" + fit + "</div>";
		}
		else if(obj[x].type[0]=="zhenbi-1table"){
			if(obj[x].type[2]=="data"){
					tablesorter=true;
				}
			var th = "";
			for(var y = 0; y < 1; y++){
				var td = "";
				for(var z = 0; z < obj[x].type[3]; z++){
					td +="<th>" + obj[x].info[y+z] + "</th>";
				}
				th +="<thead><tr>" + td + "</tr></thead>";
			}
			var tr = "";
			for(var y = obj[x].type[3],len = obj[x].info.length; y < len; y=y+obj[x].type[3]){
				var td = "";
				for(var z = 0; z < obj[x].type[3]; z++){
					td +="<td>" + y + z + obj[x].info[y+z] + "</td>";
				}
				tr +="<tr>" + td + "</tr>";
			}
			tr ="<tbody>" + tr + "</tbody>";
			out +="<table class=\"" + obj[x].type[1] + "\" id=\"" + obj[x].type[2] + "\">" + th + tr + "</table>";
		}
	}
	return out;
}
function zhenbi_com(msg) {
    if (xmlHttp.readyState == 4) {
        document.getElementById("out").innerHTML = "&nbsp;";
        var wait =3;
        var wait_info = document.getElementById("up").value;
        var wait_show = setInterval(function() {
            if (wait > 0) {
                document.getElementById("up").value = wait_info + wait; --wait;
            } else {
                document.getElementById('up').disabled = false;
                document.all.up.value = wait_info;
                clearInterval(wait_show);
            }
        },1000);
        if (xmlHttp.status == 200) {
			if(xmlHttp.responseText.indexOf('"zhenbi"') > -1) {
			
			var obj = eval("(" + xmlHttp.responseText + ")");
			if(msg<4){
				document.getElementById("out").outerHTML = 
				"<div id='out'></div>" + template(obj.zhenbi);
			}else if(msg>6){
				document.getElementById("out").outerHTML = 
				template(obj.zhenbi)+"<div id='out'></div>";
			}else{
				document.getElementById("out").innerHTML = template(obj.zhenbi);
			}
			if(tablesorter){
				$(document).ready(function(){$("#data").tablesorter()});
				tablesorter = false;
			}
			
			} else {
				document.getElementById("show").innerHTML = xmlHttp.responseText;
			}
			
        } else {
            document.getElementById("out").innerHTML = "抱歉，服务器繁忙，请刷新后再尝试吧！<br>";
            setTimeout(function() {window.location.href = window.location.href + "?" + parseInt(new Date().getTime() / 1000);},1000)
        }
    }
}




var ys={dir:'',bindClass:'color',binding:true,preloading:true,install:function(){ys.addEvent(window,'load',ys.init)},init:function(){if(ys.binding){ys.bind()}if(ys.preloading){ys.preload()}},getDir:function(){if(!ys.dir){var detected=ys.detectDir();ys.dir=detected!==false?detected:'im/css'}return ys.dir},detectDir:function(){var base=location.href;var e=document.getElementsByTagName('base');for(var i=0;i<e.length;i+=1){if(e[i].href){base=e[i].href}}var e=document.getElementsByTagName('script');for(var i=0;i<e.length;i+=1){if(e[i].src&&/(^|\/)z+ht\.js([?#].*)?$/i.test(e[i].src)){var src=new ys.URI(e[i].src);var srcAbs=src.toAbsolute(base);srcAbs.path=srcAbs.path.replace(/[^\/]+$/,'');srcAbs.query=null;srcAbs.fragment=null;return srcAbs.toString()}}return false},bind:function(){var matchClass=new RegExp('(^|\\s)('+ys.bindClass+')\\s*(\\{[^}]*\\})?','i');var e=document.getElementsByTagName('input');for(var i=0;i<e.length;i+=1){var m;if(!e[i].color&&e[i].className&&(m=e[i].className.match(matchClass))){var prop={};if(m[3]){try{eval('prop='+m[3])}catch(eInvalidProp){}}e[i].color=new ys.color(e[i],prop)}}},preload:function(){for(var fn in ys.imgRequire){if(ys.imgRequire.hasOwnProperty(fn)){ys.loadImage(fn)}}},images:{pad:[181,101],sld:[16,101],cross:[15,15],arrow:[7,11]},imgRequire:{},imgLoaded:{},requireImage:function(filename){ys.imgRequire[filename]=true},loadImage:function(filename){if(!ys.imgLoaded[filename]){ys.imgLoaded[filename]=new Image();ys.imgLoaded[filename].src=ys.getDir()+filename}},fetchElement:function(mixed){return typeof mixed==='string'?document.getElementById(mixed):mixed},addEvent:function(el,evnt,func){if(el.addEventListener){el.addEventListener(evnt,func,false)}else if(el.attachEvent){el.attachEvent('on'+evnt,func)}},fireEvent:function(el,evnt){if(!el){return}if(document.createEvent){var ev=document.createEvent('HTMLEvents');ev.initEvent(evnt,true,true);el.dispatchEvent(ev)}else if(document.createEventObject){var ev=document.createEventObject();el.fireEvent('on'+evnt,ev)}else if(el['on'+evnt]){el['on'+evnt]()}},getElementPos:function(e){var e1=e,e2=e;var x=0,y=0;if(e1.offsetParent){do{x+=e1.offsetLeft;y+=e1.offsetTop}while(e1=e1.offsetParent)}while((e2=e2.parentNode)&&e2.nodeName.toUpperCase()!=='BODY'){x-=e2.scrollLeft;y-=e2.scrollTop}return[x,y]},getElementSize:function(e){return[e.offsetWidth,e.offsetHeight]},getRelMousePos:function(e){var x=0,y=0;if(!e){e=window.event}if(typeof e.offsetX==='number'){x=e.offsetX;y=e.offsetY}else if(typeof e.layerX==='number'){x=e.layerX;y=e.layerY}return{x:x,y:y}},getViewPos:function(){if(typeof window.pageYOffset==='number'){return[window.pageXOffset,window.pageYOffset]}else if(document.body&&(document.body.scrollLeft||document.body.scrollTop)){return[document.body.scrollLeft,document.body.scrollTop]}else if(document.documentElement&&(document.documentElement.scrollLeft||document.documentElement.scrollTop)){return[document.documentElement.scrollLeft,document.documentElement.scrollTop]}else{return[0,0]}},getViewSize:function(){if(typeof window.innerWidth==='number'){return[window.innerWidth,window.innerHeight]}else if(document.body&&(document.body.clientWidth||document.body.clientHeight)){return[document.body.clientWidth,document.body.clientHeight]}else if(document.documentElement&&(document.documentElement.clientWidth||document.documentElement.clientHeight)){return[document.documentElement.clientWidth,document.documentElement.clientHeight]}else{return[0,0]}},URI:function(uri){this.scheme=null;this.authority=null;this.path='';this.query=null;this.fragment=null;this.parse=function(uri){var m=uri.match(/^(([A-Za-z][0-9A-Za-z+.-]*)(:))?((\/\/)([^\/?#]*))?([^?#]*)((\?)([^#]*))?((#)(.*))?/);this.scheme=m[3]?m[2]:null;this.authority=m[5]?m[6]:null;this.path=m[7];this.query=m[9]?m[10]:null;this.fragment=m[12]?m[13]:null;return this};this.toString=function(){var result='';if(this.scheme!==null){result=result+this.scheme+':'}if(this.authority!==null){result=result+'//'+this.authority}if(this.path!==null){result=result+this.path}if(this.query!==null){result=result+'?'+this.query}if(this.fragment!==null){result=result+'#'+this.fragment}return result};this.toAbsolute=function(base){var base=new ys.URI(base);var r=this;var t=new ys.URI;if(base.scheme===null){return false}if(r.scheme!==null&&r.scheme.toLowerCase()===base.scheme.toLowerCase()){r.scheme=null}if(r.scheme!==null){t.scheme=r.scheme;t.authority=r.authority;t.path=removeDotSegments(r.path);t.query=r.query}else{if(r.authority!==null){t.authority=r.authority;t.path=removeDotSegments(r.path);t.query=r.query}else{if(r.path===''){t.path=base.path;if(r.query!==null){t.query=r.query}else{t.query=base.query}}else{if(r.path.substr(0,1)==='/'){t.path=removeDotSegments(r.path)}else{if(base.authority!==null&&base.path===''){t.path='/'+r.path}else{t.path=base.path.replace(/[^\/]+$/,'')+r.path}t.path=removeDotSegments(t.path)}t.query=r.query}t.authority=base.authority}t.scheme=base.scheme}t.fragment=r.fragment;return t};function removeDotSegments(path){var out='';while(path){if(path.substr(0,3)==='../'||path.substr(0,2)==='./'){path=path.replace(/^\.+/,'').substr(1)}else if(path.substr(0,3)==='/./'||path==='/.'){path='/'+path.substr(3)}else if(path.substr(0,4)==='/../'||path==='/..'){path='/'+path.substr(4);out=out.replace(/\/?[^\/]*$/,'')}else if(path==='.'||path==='..'){path=''}else{var rm=path.match(/^\/?[^\/]*/)[0];path=path.substr(rm.length);out=out+rm}}return out}if(uri){this.parse(uri)}},color:function(target,prop){this.required=true;this.adjust=true;this.hash=true;this.caps=true;this.slider=true;this.valueElement=target;this.styleElement=target;this.onImmediateChange=null;this.hsv=[0,0,1];this.rgb=[1,1,1];this.pickerOnfocus=true;this.pickerPosition='bottom';this.pickerSmartPosition=true;this.pickerButtonHeight=1;this.pickerClosable=false;this.pickerCloseText='Close';this.pickerButtonColor='ButtonText';this.pickerFace=1;this.pickerFaceColor='ThreeDFace';this.pickerBorder=1;this.pickerBorderColor='ThreeDHighlight ThreeDShadow ThreeDShadow ThreeDHighlight';this.pickerInset=1;this.pickerInsetColor='ThreeDShadow ThreeDHighlight ThreeDHighlight ThreeDShadow';this.pickerZIndex=10000;for(var p in prop){if(prop.hasOwnProperty(p)){this[p]=prop[p]}}this.hidePicker=function(){if(isPickerOwner()){removePicker()}};this.showPicker=function(){if(!isPickerOwner()){var tp=ys.getElementPos(target);var ts=ys.getElementSize(target);var vp=ys.getViewPos();var vs=ys.getViewSize();var ps=getPickerDims(this);var a,b,c;switch(this.pickerPosition.toLowerCase()){case'left':a=1;b=0;c=-1;break;case'right':a=1;b=0;c=1;break;case'top':a=0;b=1;c=-1;break;default:a=0;b=1;c=1;break}var l=(ts[b]+ps[b])/2;if(!this.pickerSmartPosition){var pp=[tp[a],tp[b]+ts[b]-l+l*c]}else{var pp=[-vp[a]+tp[a]+ps[a]>vs[a]?(-vp[a]+tp[a]+ts[a]/2>vs[a]/2&&tp[a]+ts[a]-ps[a]>=0?tp[a]+ts[a]-ps[a]:tp[a]):tp[a],-vp[b]+tp[b]+ts[b]+ps[b]-l+l*c>vs[b]?(-vp[b]+tp[b]+ts[b]/2>vs[b]/2&&tp[b]+ts[b]-l-l*c>=0?tp[b]+ts[b]-l-l*c:tp[b]+ts[b]-l+l*c):(tp[b]+ts[b]-l+l*c>=0?tp[b]+ts[b]-l+l*c:tp[b]+ts[b]-l-l*c)]}drawPicker(pp[a],pp[b])}};this.importColor=function(){if(!valueElement){this.exportColor()}else{if(!this.adjust){if(!this.fromString(valueElement.value,leaveValue)){styleElement.style.backgroundImage=styleElement.jscStyle.backgroundImage;styleElement.style.backgroundColor=styleElement.jscStyle.backgroundColor;styleElement.style.color=styleElement.jscStyle.color;this.exportColor(leaveValue|leaveStyle)}}else if(!this.required&&/^\s*$/.test(valueElement.value)){valueElement.value='';styleElement.style.backgroundImage=styleElement.jscStyle.backgroundImage;styleElement.style.backgroundColor=styleElement.jscStyle.backgroundColor;styleElement.style.color=styleElement.jscStyle.color;this.exportColor(leaveValue|leaveStyle)}else if(this.fromString(valueElement.value)){}else{this.exportColor()}}};this.exportColor=function(flags){if(!(flags&leaveValue)&&valueElement){var value=this.toString();if(this.caps){value=value.toUpperCase()}if(this.hash){value='#'+value}valueElement.value=value}if(!(flags&leaveStyle)&&styleElement){styleElement.style.backgroundImage="none";styleElement.style.backgroundColor='#'+this.toString();styleElement.style.color=0.213*this.rgb[0]+0.715*this.rgb[1]+0.072*this.rgb[2]<0.5?'#FFF':'#000'}if(!(flags&leavePad)&&isPickerOwner()){redrawPad()}if(!(flags&leaveSld)&&isPickerOwner()){redrawSld()}};this.fromHSV=function(h,s,v,flags){h<0&&(h=0)||h>6&&(h=6);s<0&&(s=0)||s>1&&(s=1);v<0&&(v=0)||v>1&&(v=1);this.rgb=HSV_RGB(h===null?this.hsv[0]:(this.hsv[0]=h),s===null?this.hsv[1]:(this.hsv[1]=s),v===null?this.hsv[2]:(this.hsv[2]=v));this.exportColor(flags)};this.fromRGB=function(r,g,b,flags){r<0&&(r=0)||r>1&&(r=1);g<0&&(g=0)||g>1&&(g=1);b<0&&(b=0)||b>1&&(b=1);var hsv=RGB_HSV(r===null?this.rgb[0]:(this.rgb[0]=r),g===null?this.rgb[1]:(this.rgb[1]=g),b===null?this.rgb[2]:(this.rgb[2]=b));if(hsv[0]!==null){this.hsv[0]=hsv[0]}if(hsv[2]!==0){this.hsv[1]=hsv[1]}this.hsv[2]=hsv[2];this.exportColor(flags)};this.fromString=function(hex,flags){var m=hex.match(/^\W*([0-9A-F]{3}([0-9A-F]{3})?)\W*$/i);if(!m){return false}else{if(m[1].length===6){this.fromRGB(parseInt(m[1].substr(0,2),16)/255,parseInt(m[1].substr(2,2),16)/255,parseInt(m[1].substr(4,2),16)/255,flags)}else{this.fromRGB(parseInt(m[1].charAt(0)+m[1].charAt(0),16)/255,parseInt(m[1].charAt(1)+m[1].charAt(1),16)/255,parseInt(m[1].charAt(2)+m[1].charAt(2),16)/255,flags)}return true}};this.toString=function(){return((0x100|Math.round(255*this.rgb[0])).toString(16).substr(1)+(0x100|Math.round(255*this.rgb[1])).toString(16).substr(1)+(0x100|Math.round(255*this.rgb[2])).toString(16).substr(1))};function RGB_HSV(r,g,b){var n=Math.min(Math.min(r,g),b);var v=Math.max(Math.max(r,g),b);var m=v-n;if(m===0){return[null,0,v]}var h=r===n?3+(b-g)/m:(g===n?5+(r-b)/m:1+(g-r)/m);return[h===6?0:h,m/v,v]}function HSV_RGB(h,s,v){if(h===null){return[v,v,v]}var i=Math.floor(h);var f=i%2?h-i:1-(h-i);var m=v*(1-s);var n=v*(1-s*f);switch(i){case 6:case 0:return[v,n,m];case 1:return[n,v,m];case 2:return[m,v,n];case 3:return[m,n,v];case 4:return[n,m,v];case 5:return[v,m,n]}}function removePicker(){delete ys.picker.owner;document.getElementsByTagName('body')[0].removeChild(ys.picker.boxB)}function drawPicker(x,y){if(!ys.picker){ys.picker={box:document.createElement('div'),boxB:document.createElement('div'),pad:document.createElement('div'),padB:document.createElement('div'),padM:document.createElement('div'),sld:document.createElement('div'),sldB:document.createElement('div'),sldM:document.createElement('div'),btn:document.createElement('div'),btnS:document.createElement('span'),btnT:document.createTextNode(THIS.pickerCloseText)};for(var i=0,segSize=4;i<ys.images.sld[1];i+=segSize){var seg=document.createElement('div');seg.style.height=segSize+'px';seg.style.fontSize='1px';seg.style.lineHeight='0';ys.picker.sld.appendChild(seg)}ys.picker.sldB.appendChild(ys.picker.sld);ys.picker.box.appendChild(ys.picker.sldB);ys.picker.box.appendChild(ys.picker.sldM);ys.picker.padB.appendChild(ys.picker.pad);ys.picker.box.appendChild(ys.picker.padB);ys.picker.box.appendChild(ys.picker.padM);ys.picker.btnS.appendChild(ys.picker.btnT);ys.picker.btn.appendChild(ys.picker.btnS);ys.picker.box.appendChild(ys.picker.btn);ys.picker.boxB.appendChild(ys.picker.box)}var p=ys.picker;p.box.onmouseup=p.box.onmouseout=function(){target.focus()};p.box.onmousedown=function(){abortBlur=true};p.box.onmousemove=function(e){if(holdPad||holdSld){holdPad&&setPad(e);holdSld&&setSld(e);if(document.selection){document.selection.empty()}else if(window.getSelection){window.getSelection().removeAllRanges()}dispatchImmediateChange()}};p.padM.onmouseup=p.padM.onmouseout=function(){if(holdPad){holdPad=false;ys.fireEvent(valueElement,'change')}};p.padM.onmousedown=function(e){if(THIS.hsv[2]===0){THIS.fromHSV(null,null,1.0)};holdPad=true;setPad(e);dispatchImmediateChange()};p.sldM.onmouseup=p.sldM.onmouseout=function(){if(holdSld){holdSld=false;ys.fireEvent(valueElement,'change')}};p.sldM.onmousedown=function(e){holdSld=true;setSld(e);dispatchImmediateChange()};var dims=getPickerDims(THIS);p.box.style.width=dims[0]+'px';p.box.style.height=dims[1]+'px';p.boxB.style.position='absolute';p.boxB.style.clear='both';p.boxB.style.left=x+'px';p.boxB.style.top=y+'px';p.boxB.style.zIndex=THIS.pickerZIndex;p.boxB.style.border=THIS.pickerBorder+'px solid';p.boxB.style.borderColor=THIS.pickerBorderColor;p.boxB.style.background=THIS.pickerFaceColor;p.pad.style.width=ys.images.pad[0]+'px';p.pad.style.height=ys.images.pad[1]+'px';p.padB.style.position='absolute';p.padB.style.left=THIS.pickerFace+'px';p.padB.style.top=THIS.pickerFace+'px';p.padB.style.border=THIS.pickerInset+'px solid';p.padB.style.borderColor=THIS.pickerInsetColor;p.padM.style.position='absolute';p.padM.style.left='0';p.padM.style.top='0';p.padM.style.width=THIS.pickerFace+2*THIS.pickerInset+ys.images.pad[0]+ys.images.arrow[0]+'px';p.padM.style.height=p.box.style.height;p.padM.style.cursor='crosshair';p.sld.style.overflow='hidden';p.sld.style.width=ys.images.sld[0]+'px';p.sld.style.height=ys.images.sld[1]+'px';p.sldB.style.display=THIS.slider?'block':'none';p.sldB.style.position='absolute';p.sldB.style.right=THIS.pickerFace+'px';p.sldB.style.top=THIS.pickerFace+'px';p.sldB.style.border=THIS.pickerInset+'px solid';p.sldB.style.borderColor=THIS.pickerInsetColor;p.sldM.style.display=THIS.slider?'block':'none';p.sldM.style.position='absolute';p.sldM.style.right='0';p.sldM.style.top='0';p.sldM.style.width=ys.images.sld[0]+ys.images.arrow[0]+THIS.pickerFace+2*THIS.pickerInset+'px';p.sldM.style.height=p.box.style.height;try{p.sldM.style.cursor='pointer'}catch(eOldIE){p.sldM.style.cursor='hand'}function setBtnBorder(){var insetColors=THIS.pickerInsetColor.split(/\s+/);var pickerOutsetColor=insetColors.length<2?insetColors[0]:insetColors[1]+' '+insetColors[0]+' '+insetColors[0]+' '+insetColors[1];p.btn.style.borderColor=pickerOutsetColor}p.btn.style.display=THIS.pickerClosable?'block':'none';p.btn.style.position='absolute';p.btn.style.left=THIS.pickerFace+'px';p.btn.style.bottom=THIS.pickerFace+'px';p.btn.style.padding='0 15px';p.btn.style.height='18px';p.btn.style.border=THIS.pickerInset+'px solid';setBtnBorder();p.btn.style.color=THIS.pickerButtonColor;p.btn.style.font='12px sans-serif';p.btn.style.textAlign='center';try{p.btn.style.cursor='pointer'}catch(eOldIE){p.btn.style.cursor='hand'}p.btn.onmousedown=function(){THIS.hidePicker()};p.btnS.style.lineHeight=p.btn.style.height;p.padM.style.backgroundImage="url('"+ys.getDir()+"css/p3.gif')";p.padM.style.backgroundRepeat="no-repeat";p.sldM.style.backgroundImage="url('"+ys.getDir()+"css/p2.gif')";p.sldM.style.backgroundRepeat="no-repeat";p.pad.style.backgroundImage="url('"+ys.getDir()+'css/p1.png'+"')";p.pad.style.backgroundRepeat="no-repeat";p.pad.style.backgroundPosition="0 0";redrawPad();redrawSld();ys.picker.owner=THIS;document.getElementsByTagName('body')[0].appendChild(p.boxB)}function getPickerDims(o){var dims=[2*o.pickerInset+2*o.pickerFace+ys.images.pad[0]+(o.slider?2*o.pickerInset+2*ys.images.arrow[0]+ys.images.sld[0]:0),o.pickerClosable?4*o.pickerInset+3*o.pickerFace+ys.images.pad[1]+o.pickerButtonHeight:2*o.pickerInset+2*o.pickerFace+ys.images.pad[1]];return dims}function redrawPad(){var x=Math.round((THIS.hsv[0]/6)*(ys.images.pad[0]-1));var y=Math.round((1-THIS.hsv[1])*(ys.images.pad[1]-1));ys.picker.padM.style.backgroundPosition=(THIS.pickerFace+THIS.pickerInset+x-Math.floor(ys.images.cross[0]/2))+'px '+(THIS.pickerFace+THIS.pickerInset+y-Math.floor(ys.images.cross[1]/2))+'px';var seg=ys.picker.sld.childNodes;var rgb=HSV_RGB(THIS.hsv[0],THIS.hsv[1],1);for(var i=0;i<seg.length;i+=1){seg[i].style.backgroundColor='rgb('+(rgb[0]*(1-i/seg.length)*100)+'%,'+(rgb[1]*(1-i/seg.length)*100)+'%,'+(rgb[2]*(1-i/seg.length)*100)+'%)'}}function redrawSld(){var y=Math.round((1-THIS.hsv[2])*(ys.images.sld[1]-1));ys.picker.sldM.style.backgroundPosition='0 '+(THIS.pickerFace+THIS.pickerInset+y-Math.floor(ys.images.arrow[1]/2))+'px'}function isPickerOwner(){return ys.picker&&ys.picker.owner===THIS}function blurTarget(){if(valueElement===target){THIS.importColor()}if(THIS.pickerOnfocus){THIS.hidePicker()}}function blurValue(){if(valueElement!==target){THIS.importColor()}}function setPad(e){var mpos=ys.getRelMousePos(e);var x=mpos.x-THIS.pickerFace-THIS.pickerInset;var y=mpos.y-THIS.pickerFace-THIS.pickerInset;THIS.fromHSV(x*(6/(ys.images.pad[0]-1)),1-y/(ys.images.pad[1]-1),null,leaveSld);}function setSld(e){var mpos=ys.getRelMousePos(e);var y=mpos.y-THIS.pickerFace-THIS.pickerInset;THIS.fromHSV(null,null,1-y/(ys.images.sld[1]-1),leavePad);}function dispatchImmediateChange(){if(THIS.onImmediateChange){if(typeof THIS.onImmediateChange==='string'){eval(THIS.onImmediateChange)}else{THIS.onImmediateChange(THIS)}}}var THIS=this;var abortBlur=false;var valueElement=ys.fetchElement(this.valueElement),styleElement=ys.fetchElement(this.styleElement);var holdPad=false,holdSld=false;var leaveValue=1<<0,leaveStyle=1<<1,leavePad=1<<2,leaveSld=1<<3;ys.addEvent(target,'focus',function(){if(THIS.pickerOnfocus){THIS.showPicker()}});ys.addEvent(target,'blur',function(){if(!abortBlur){window.setTimeout(function(){abortBlur||blurTarget();abortBlur=false},0)}else{abortBlur=false}});if(valueElement){var updateField=function(){THIS.fromString(valueElement.value,leaveValue);dispatchImmediateChange()};ys.addEvent(valueElement,'keyup',updateField);ys.addEvent(valueElement,'input',updateField);ys.addEvent(valueElement,'blur',blurValue);valueElement.setAttribute('autocomplete','off')}if(styleElement){styleElement.jscStyle={backgroundImage:styleElement.style.backgroundImage,backgroundColor:styleElement.style.backgroundColor,color:styleElement.style.color}}ys.requireImage('css/p1.png');ys.requireImage('css/p2.gif');ys.requireImage('css/p3.gif');this.importColor()}};ys.install();


function go(m,n,o){eval("document.all."+m+".value=n");if(o){document.getElementById("show").innerHTML="<img src="+o+">";scroll(0,0);}}
function l0(c1){if(typeof(c1)=="undefined"){var c1='';}eval("var jiqie=document.all.upfile"+c1+".value.split('.')[document.all.upfile"+c1+".value.split('.').length-1].toLowerCase();");if(jiqie!='jpg'&&jiqie!='jpeg'&&jiqie!='png'&&jiqie!='gif'){alert('请确认您上传的是否是图片哦! \n 只能使用gif、jpg、png格式的图片呀!^_^');return false}document.all.upinfo.innerHTML="<img src=/im/loading.gif>上传中…";eval("document.upfor"+c1+".submit();document.all.upfor"+c1+".style.display='none'");}
function l1(c1,c2){if(typeof(c2)=="undefined"){var c2='';var msg="<a style='cursor:pointer'onclick='l2();'>[重新上传]</a>"}else{msg="<a href='javascript:location.reload();'>[重新上传]</a>"}eval("document.all.id"+c2+".value=c1");document.getElementById("upinfo").innerHTML="<font color='red'>恭喜,成功上传图片!</font><br>说明:10秒后可[重新上传]";setTimeout(function(){document.getElementById("upinfo").innerHTML="<font color='red'>恭喜,成功上传图片!</font><br>"+msg+"<a style='cursor:pointer' onclick='window.external.AddFavorite(location.href,document.title);'>[收藏该页]</a>"},10000)}
function l2(msg){if(msg)alert(msg);document.all.upinfo.innerHTML="";document.all.upfor.style.display=''}
function l3(msg){document.all.id.value=msg;document.all.upinfo.innerHTML="<font color='blue'>正在使用刚才的图片！</font><br><a style='cursor:pointer'onclick='l2();'>[重新上传]</a><a style='cursor:pointer' onclick='window.external.AddFavorite(location.href,document.title);'>[加入收藏]</a>";document.all.upfor.style.display='none';}
function l4(msg){if(window.localStorage){var storage = window.localStorage;for(var i=0;i<storage.length;i++){if(storage.key(i)==msg && parseInt(new Date().getTime()/1800000)==parseInt(localStorage.jiqie_time/1800000)){return storage.getItem(storage.key(i))}}}else{var arrStr=document.cookie.split("; ");for(var i=0;i<arrStr.length;i++){var temp=arrStr[i].split("=");if(temp[0]==msg)return unescape(temp[1])}}}
function pic(c1,c2){if(!arguments[1])c2="gif";document.getElementById("j").innerHTML="<img src='/im/fon/"+c1+"."+c2+"' />"}
function img(c1){document.getElementById("j").innerHTML="<img src='img/"+c1+"' />"}