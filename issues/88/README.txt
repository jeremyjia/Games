#######################################################################
# 
# 微思象棋播放器自述文件
#
#######################################################################

使用方法

1. 下载微思象棋播放器最新版本
	下载地址：http://www.xiaxiangqi.com/download.html

2. 解压压缩文件，将其中的vschess.utf8.js或vschess.gb2312.js以及vschess文件夹上传到网站相应目录
	注：如果您网站中没有使用jQuery框架，也请一并上传jquery文件夹中的jquery-1.7.2.js

3. 在相应html文件的</head>之前添加
	<script type="text/javascript" src="jquery路径/jquery.js"></script>
	<script type="text/javascript" src="vschess路径/vschess.utf8.js"></script>

注：如果jQuery之前已经在项目页面中使用，请勿重复添加引用代码

4.对于需要加载播放器的 DOM 元素，只需运行一句“vschess.load(jQuery选择器);”即可，例如：
	网页源代码内容：<div id="chess">这里是棋谱内容</div>
	JavaScript脚本内容：$(function(){ vschess.load("#chess"); });

5.若需要插入鹏飞象棋棋谱，为避免棋谱被浏览器错误解析，请将为棋谱内容加上注释符号，例如：
	<div id="chess"><!--这里是棋谱内容--></div>

更多帮助信息，请查看在线技术手册：http://www.xiaxiangqi.com/manual.html
或者参考演示页面demo.html