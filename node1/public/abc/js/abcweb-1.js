// abc2svg - ABC to SVG translator
// @source: https://chiselapp.com/user/moinejf/repository/abc2svg
// Copyright (C) 2014-2022 Jean-Francois Moine - LGPL3+
//abcweb-1.js file to include in html pages
window.onerror=function(msg,url,line){if(typeof msg=='string')
alert("window error: "+msg+"\nURL: "+url+"\nLine: "+line)
else if(typeof msg=='object')
alert("window error: "+msg.type+' '+msg.target.src)
else
alert("window error: "+msg)
return false}
var user,abcplay
if(typeof abc2svg=="undefined")
var abc2svg={}
function dom_loaded(){var abc,src,a_inc={},new_page='',errtxt='',html,app="abcweb",glopar='',playing,playconf={onend:function(){playing=false}},page,tune_lst=[],jsdir=document.currentScript?document.currentScript.src.match(/.*\//):(function(){var s_a=document.getElementsByTagName('script')
for(var k=0;k<s_a.length;k++){if(s_a[k].src.indexOf(app)>=0)
return s_a[k].src.match(/.*\//)||''}
return""})()
user={read_file:function(fn){return a_inc[fn]},errmsg:function(msg,l,c){errtxt+=clean_txt(msg)+'\n'},img_out:function(str){new_page+=str}}
function clean_txt(txt){return txt.replace(/<|>|&.*?;|&/g,function(c){switch(c){case'<':return"&lt;"
case'>':return"&gt;"
case'&':return"&amp;"}
return c})}
abc2svg.playseq=function(evt){if(playing){abcplay.stop()
return}
var i,j,svg=evt.target,e=svg
while(svg.tagName!='svg'){svg=svg.parentNode
if(!svg)
return}
i=svg.getAttribute('class')
if(!i)
return
i=i.match(/tune(\d+)/)
if(!i)
return
i=i[1]
if(!abcplay){if(typeof AbcPlay=="undefined"){abc2svg.playseq=function(){}
return}
if(abc.cfmt().soundfont)
playconf.sfu=abc.cfmt().soundfont
abcplay=AbcPlay(playconf)}
if(!tune_lst[i]){tune_lst[i]=abc.tunes[i]
abcplay.add(tune_lst[i][0],tune_lst[i][1],tune_lst[i][3])}
s=tune_lst[i][0]
i=e.getAttribute('class')
if(i)
i=i.match(/abcr _(\d+)_/)
if(i){i=i[1]
while(s&&s.istart!=i)
s=s.ts_next
if(!s){alert("play bug: no such symbol in the tune")
return}}
playing=true
abcplay.play(s,null)}
function toabc(s){return s.replace(/&gt;/g,'>').replace(/&lt;/g,'<').replace(/&amp;/g,'&').replace(/[ \t]+(%%|.:)/g,'$1')}
abc2svg.loadjs=function(fn,relay,onerror){var s=document.createElement('script')
if(/:\/\//.test(fn))
s.src=fn
else
s.src=jsdir+fn
s.onload=relay
s.onerror=function(){if(onerror)
onerror(fn)
else
alert('error loading '+fn)}
document.head.appendChild(s)}
function render(){var re,src,res,ss=0,re_stop=/\n<|\n%.begin[^\s]+/g
function get_p(p){var i,j,k,r,o='',c=p.match(/class="[^"]+"/),sh=document.styleSheets
if(!c)
return
c='.'+c[0].slice(7,-1)
for(i=0;i<sh.length;i++){r=sh[i].cssRules
for(j=0;j<r.length;j++){if(r[j].selectorText==c)
break}
if(j<r.length)
break}
if(i==sh.length)
return
r=r[j]
for(i=0;i<r.styleMap.size;i++){k=r.style[i]
o+='%%'+k.slice(2)
+' '+r.style.getPropertyValue(k)
+'\n'}
if(o)
abc.tosvg(app,o)
return o}
function extract(){var i,j,k,t
res=re.exec(page)
if(!res){if(abc2svg.page&&html){new_page+='\
<pre class="nop" style="background:#ff8080">\
Printing may be bad because the file contains pure HTML and %%pageheight\
</pre>\n'
errtxt=""}
document.body.innerHTML=new_page
+page.slice(ss)
t=document.getElementsByTagName('svg')
for(i=0;i<t.length;i++){if(t[i].getAttribute('class').indexOf('tune')>=0)
t[i].addEventListener('click',abc2svg.playseq)}
return}
i=re.lastIndex-res[0].length
if(i>ss){new_page+=page.slice(ss,i)
html=1}
t=res[2]
if(t[0]=='<'){t=t.slice(1,4)
switch(t){case"scr":k=page.indexOf('>',i)
get_p(page.slice(i,k))
i=page.indexOf('\n',k)+1
j=page.indexOf('</script>',i)
ss=j+9
break
default:i=page.indexOf('>',i)+1
new_page+=page.slice(j,i)
j=res[2].indexOf(' ')
t=res[2].slice(1,j)
j=page.indexOf('</'+t+'>',i)
ss=j+t.length+4
break}}else{re_stop.lastIndex=i
while(1){res=re_stop.exec(page)
if(!res||res[0]=="\n<")
break
k=page.indexOf(res[0].replace("begin","end"),re_stop.lastIndex)
if(k<0)
break
re_stop.lastIndex=k}
if(!res||k<0)
j=page.length
else
j=re_stop.lastIndex-1
ss=j}
if(j<0){alert("Error: no end of ABC sequence")
console.log('error i/j '+i+' '+j)
return}
re.lastIndex=ss
abc.tosvg(app,page,i,j)
abc2svg.abc_end()
if(errtxt){new_page+='<pre class="nop" style="background:#ff8080">'
+errtxt+"</pre>\n"
errtxt=""}
extract()}
if(/<script[^t>]*type="text\/vnd.abc"/.test(page))
re='<script[^t>]*type="text\/vnd.abc"'
else if(/<[^>]* class="[^"]*abc[^"]*/.test(page))
re='<[^>]* class="[^"]*abc[^"]*'
else
re='%abc-\\d|X:\\s*\\d'
re=new RegExp('(^|\n)('+re+')','g')
abc=new abc2svg.Abc(user)
if(typeof follow=="function")
follow(abc,user,playconf)
abc.tosvg(app,glopar)
extract()}
function include(){var i,j,fn,r,k=0
while(1){i=page.indexOf('%%abc-include ',k)
if(i<0){render()
return}
i+=14
j=page.indexOf('\n',i)
fn=page.slice(i,j).trim()
if(!a_inc[fn])
break
k=j}
r=new XMLHttpRequest()
r.open('GET',fn,true)
r.onload=function(){if(r.status===200){a_inc[fn]=r.responseText
if(abc2svg.modules.load(a_inc[fn],include))
include()}else{a_inc[fn]='%\n'
alert('Error getting '+fn+'\n'+r.statusText)
include()}}
r.onerror=function(){a_inc[fn]='%\n'
alert('Error getting '+fn+'\n'+r.statusText)
include()}
r.send()}
if(!abc2svg.Abc){abc2svg.loadjs(document.body.innerHTML.indexOf("<mei ")>=0?"mei2svg-1.js":"abc2svg-1.js",dom_loaded)
return}
{var i,j,k=location.search.substr(1).split("&")
for(i=0;i<k.length;i++)
glopar+="%%"+decodeURIComponent(k[i].replace('=',' '))+'\n'}
abc2svg.abc_end=function(){}
page=document.body.innerHTML
if(abc2svg.modules.load(page,include))
include()}
window.addEventListener("load",dom_loaded,{once:true})