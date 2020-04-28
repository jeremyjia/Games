#!/bin/sh

str_quot="\""
rm index.html
stty -echo
echo \<!DOCTYPE html\>	>>index.html  
echo \<html\> >>index.html 
echo \<body\> >>index.html
 
echo \<script src=$str_quot"https://www.w3schools.com/lib/w3.js"$str_quot\>\</script\>				>>index.html
echo \<script src=$str_quot"https://littleflute.github.io/JavaScript/blclass.js"$str_quot\>\</script\>		>>index.html
echo \<script src=$str_quot"https://littleflute.github.io/JavaScript/blApp1.js"$str_quot\>\</script\>		>>index.html

echo \<div id=$str_quot"id_div_mp4i_bat_info"$str_quot \>								>>index.html
echo "<a target=$str_quot"_blank"$str_quot href=$str_quot"https://github.com/littleflute/ted1/edit/master/docs/61/mp4i.bat"$str_quot>v1.3. 112 * </a>"	>>index.html
echo \<a href=$str_quot".."$str_quot\>[..]\</a\> \<button id=$str_quot"id_btn_4_blApp"$str_quot style=$str_quot"float:right;"$str_quot\>+blApp\</button\>	>>index.html

echo \</div\>						 >>index.html
echo \<div id=$str_quot"DivCurTime"$str_quot\>\</div\> 			>>index.html
echo \<br\> >>index.html 

function listPicture()
{
  local strType=$1
  index=0;
   for a in `ls *.$strType`;
    do   
		index=$((index+1));
		echo $a, >>index.html
	done
}

function createButtons()
{
  local strType=$1    # mp4,mp3...
  index=0;
	for fname in `ls *.$strType`;   # 遍历所有的mp4,mp3...文件
	do   
		if [ $index = 10 ]; then
		echo \<br\> >>index.html
		fi
		if [ $index = 20 ]; then
		echo \<br\> >>index.html
		fi
		if [ $index = 30 ]; then
		echo \<br\> >>index.html
		fi
		if [ $index = 40 ]; then
		echo \<br\> >>index.html
		fi 
		index=$((index+1));
		echo \<button onclick=$str_quot"play('$fname')"$str_quot\>$index:$fname\</button\> >>index.html
	done
}

echo \<div id=$str_quot"DivButtons"$str_quot\> 				>>index.html
stty echo
`createButtons mp4`
stty -echo 


echo \<div id=$str_quot"DivButtons"$str_quot\> 				>>index.html
stty echo
`createButtons mkv`
stty -echo  


echo \<div id=$str_quot"DivButtons"$str_quot\> 				>>index.html
stty echo
`createButtons webm`
stty -echo  


stty echo
`createButtons mp3`
stty -echo  

stty echo
`createButtons wav`
stty -echo  

echo  \</div\> 			>>index.html

echo \<br\> 	>>index.html
echo \<div id=$str_quot"id_div_4_gif"$str_quot style=$str_quot"border:1px solid green;"$str_quot \>				>>index.html
stty echo
`listPicture gif`
stty -echo   
echo \</div\> 								>>index.html	
 

echo \<br\> 	>>index.html
echo \<div id=$str_quot"id_div_4_jpg"$str_quot style=$str_quot"border:1px solid blue;"$str_quot \>				>>index.html
stty echo
`listPicture jpg`
stty -echo   
echo \</div\> 								>>index.html	
 

echo \<br\> 	>>index.html
echo \<div id=$str_quot"id_div_4_png"$str_quot style=$str_quot"border:1px solid blue;"$str_quot \>				>>index.html
stty echo
`listPicture png`
stty -echo  
echo \</div\> 							>>index.html	 

echo \<br\> 	>>index.html
echo \<div id=$str_quot"id_div_4_lrcJS"$str_quot style=$str_quot"border:1px solid red;display: none;"$str_quot \>		>>index.html
stty echo
   for jsfile in `ls *lrc.js`;
    do   
		echo $jsfile, >>index.html
	done
stty -echo  
echo \</div\> 							>>index.html	
echo \<script\>  >>index.html


echo "var s = '::<div id=$str_quot"id_4_plxTool"$str_quot> </div>';"				>>index.html
echo "var str4V = '<video id=$str_quot"myVideo"$str_quot width=$str_quot"720"$str_quot height=$str_quot"480"$str_quot controls> ';"				>>index.html
echo "str4V += '<source src=$str_quot"v1.mp4"$str_quot type=$str_quot"video/mp4"$str_quot>Your browser does not support HTML5 video.';" 	>>index.html
echo "str4V += '</video>';"										>>index.html
echo "var md4v = blo0.blMD( $str_quot"id_mdiv_4_myVideo"$str_quot , s , 300,100,720,480,blColor[1]);" 	>>index.html
            
echo "md4v.v = blo0.blDiv(md4v, md4v.id+$str_quot"v"$str_quot , str4V , blGrey[1]);" 	>>index.html

echo "var vid = document.getElementById($str_quot"myVideo"$str_quot);" >>index.html

echo "function play(i) {">>index.html

echo     "vid.src=i;" >>index.html
echo     "vid.load();">>index.html
echo     "vid.play();" >>index.html
echo "}">>index.html
  
echo "function getCurTime() {"  >>index.html
echo    "document.getElementById($str_quot"DivCurTime"$str_quot).innerHTML= vid.currentTime;" >>index.html
echo "}"   >>index.html

echo "function setCurTime(t) {">>index.html 
echo    "vid.currentTime=t;"  >>index.html
echo    "getCurTime();">>index.html
echo "}"  >>index.html

echo "function moveMS(ms) {">>index.html 
echo   "vid.currentTime+=ms;">>index.html
echo   "getCurTime();"  >>index.html
echo "}"   >>index.html

echo "var btnPlx = blo0.blBtn(bl\$($str_quot"id_4_plxTool"$str_quot),$str_quot"id_btn_Plx"$str_quot,$str_quot"+plx"$str_quot,blGrey[0]);" >>index.html 
echo "btnPlx.onclick = function() {">>index.html 
 
echo   "if(btnPlx.Load){"													>>index.html
echo  	"if(btnPlx.n){}"													>>index.html
echo  	"else{btnPlx.n=true;_on_off_div(this,bl\$($str_quot"id_mdiv_plx"$str_quot));}"		>>index.html

echo    "_on_off_div(this,bl\$($str_quot"id_mdiv_plx"$str_quot));"  							>>index.html
echo   "}"																>>index.html
echo   "else  { blo0.blScript ($str_quot"id_script_plx"$str_quot,$str_quot"plx.js"$str_quot); btnPlx.Load=true;	}">>index.html
echo "}"   >>index.html
 
echo \</script\> >>index.html
echo \</body\> >>index.html
stty echo