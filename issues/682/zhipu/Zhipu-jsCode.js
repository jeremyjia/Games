var upType=3;
$(document).ready(function(){
    var viewType_=localStorage.getItem('viewType');
    if(viewType_){upType=viewType_;}
    var customCode_=localStorage.getItem('customCode');
    if(customCode_){$("textarea[name=customCode]").text(customCode_);}
    var pageConfig_=localStorage.getItem('pageConfig');
    if(pageConfig_){$("textarea[name=pageConfig]").text(pageConfig_);}
    setView(upType);
    if(upType==2){upType=3;}
    var autoJpFormat_=localStorage.getItem('autoJpFormat');
    if(!autoJpFormat_){autoJpFormat_="y";}
    if(autoJpFormat_=="y"){$('#jpFormat').prop("checked",true);}
});

window.onresize=function(){autoSize();autoWinSize();}
document.onkeydown=function(){return setShortcuts(event);}
document.onmousedown=hideMenu;function setShortcuts(ev){if(ev.keyCode==9&&!$(".win").is(':visible')){if(winType!=2){upType=winType;setView(2);}else{setView(upType);}
autoSize();return false;}
if(ev.keyCode==27){hideMenu();winClose();return false;}
if(ev.altKey&&ev.keyCode==70){$("#menuFile").click();return false;}
if(ev.altKey&&ev.keyCode==85){$("#menuUser").click();return false;}
if(ev.altKey&&ev.keyCode==72){$("#menuHelp").click();return false;}
if(ev.ctrlKey&&ev.shiftKey&&ev.keyCode==83){$("#menuSaveAs").click();return false;}
if(ev.ctrlKey&&ev.keyCode==83){$("#menuSave").click();return false;}
if(ev.ctrlKey&&ev.keyCode==78){$("#menuNewFile").click();return false;}
if(ev.ctrlKey&&ev.keyCode==79){$("#menuOpenFile").click();return false;}
if(ev.ctrlKey&&ev.keyCode==81){$("#menuPlayer").click();return false;}
if(ev.ctrlKey&&ev.keyCode==72){$("#menuTutorial").click();return false;}
if(ev.ctrlKey&&ev.keyCode==192){$("#menuSymbol").click();return false;}
if(ev.ctrlKey&&ev.keyCode==69){$("#menuAddLastSymbol").click();return false;}
if(ev.keyCode==37||ev.keyCode==38||ev.keyCode==39||ev.keyCode==40||ev.keyCode==46){return customShortcuts(ev.keyCode);}
}

//xddbg
function redraw(pNum,redrawSource){
    /*
    var jpcode=window.frames["editFrame"].document.getElementById("editor_text").value;
    var customCode=$("textarea[name=customCode]").text();
    var pageConfig=$("textarea[name=pageConfig]").text();
    jpcode=jpcode.replace(/\n/g,"&hh&");
    customCode=customCode.replace(/\n/g,"&hh&");
    */ 
    $.get('response.html',//'http://zhipu.lezhi99.com/Zhipu-draw',// '/Zhipu-draw',
       null,//{code:jpcode,customCode:customCode,pageConfig:pageConfig,pageNum:pNum},
       function(re){
           var arr=re.split('[fenye]');
           alert(arr);
           var arrLen=arr.length;
           var pageNum=-1;
           for(var i=0;i<arrLen;i++){
               var pageObj=$("#page_"+i);
               if(arr[i]!=''){
                   if(pageObj.length==0){
                       $(".preview .svgList").append('<div class="page" id="page_'+i+'">'+arr[i]+'</div>');
                    }
                    else{
                        if(arr[i]!='noRedraw'){
                           pageObj.html(arr[i]);
                        }
                    }

                    pageNum++;
                }
            }
            $(".page").each(function(index,element){
                if(index>pageNum){
                    $(element).remove();
                }
            });
            if(pageNum==-1){
                $(".preview .svgList").append('<div class="page" id="page_0"></div>');
            }
            var svgWidth=$("#page_0 svg").attr('width');
            var svgHeight=$("#page_0 svg").attr('height');
            $(".svgList").css({'width':svgWidth,'height':svgHeight});
            $(".page").css({'width':svgWidth,'height':svgHeight});
            $('use[notepos]').click(function(e){
                window.frames["editFrame"].setPos($(this).attr('notepos'));        
            });
            if(redrawSource=='editor'){
                window.frames["editFrame"].getGbInfo();
            }
            setLockCustom();
        }
    );
}
var winType;
function autoSize(){
    if(winType==1){
        $(".preview").hide();
        $(".editor").show();
        $(".editor .line").hide();
        $(".editor").height($(window).height()-65);
        $(".editor .body").height($(".editor").height());
    }
    else if(winType==2){
        $(".editor").hide();
        $(".preview").show();
        $(".preview").height($(window).height()-65);
    }else{
        $(".preview").show();
        $(".editor .line").show();
        $(".editor").show();
        var bodyHeight=$(window).height()-65;
        $(".preview").height((bodyHeight/3)*2);
        $(".editor").height(bodyHeight/3);
        $(".editor .body").height($(".editor").height()-5);
    }
    $(".mask").width($(window).width());$(".mask").height($(window).height());
    $("#filename").css('left',($(window).width()-$("#filename").width())/2+80);
}

function setView(type){$(".viewBut li").removeClass('current');$(".viewBut"+type).addClass('current');winType=type;autoSize();$("#menuSetView1").html('编码');$("#menuSetView3").html('拆分');$("#menuSetView2").html('<i>Tab</i>预览');$("#menuSetView"+type).append(' ●');hideMenu();localStorage.setItem('viewType',type);}
function showMenu(obj){hideMenu();$(obj).addClass('current');$(obj).parent().find("ul").fadeIn(200);}
function hideMenu(){$(".menu li ul").fadeOut(200);$(".fileBrowsMenu").fadeOut(200);$(".menu li span").removeClass('current');}
function noHideMenu(){oEvent=window.event;if(document.all){oEvent.cancelBubble=true;}else{oEvent.stopPropagation();}}
function newJP(){
    if($("#biaoti").val()==''){
        alert("【错误提示】简谱的主标题必须要填写。");return false;
    }
    var tempStr="#============================以下为描述头定义==========================\n";
    tempStr+="V: 1.0\n";
    tempStr+='B: '+$("#biaoti").val()+"\n";
    if($("#fubiaoti").val()!=''){
        tempStr+='B: '+$("#fubiaoti").val()+"\n";
    }
    if($("#zuoci").val()!=''){
        tempStr+='Z: '+$("#zuoci").val()+" 词\n";
    }
    if($("#zuoqu").val()!=''){
        tempStr+='Z: '+$("#zuoqu").val()+" 曲\n";
    }
    if($("#qitazuozhe").val()!=''){
        tempStr+='Z: '+$("#qitazuozhe").val()+"\n";
    }
    tempStr+='D: '+$("#diaoshi2").val()+$("#diaoshi1").val()+"\n";
    tempStr+='P: '+$("#paihao1").val()+"/"+$("#paihao2").val()+"\n";
    if($("#jiepai").val()!=''){
        tempStr+='J: '+$("#jiepai").val()+"\n";
    }
    tempStr+="#============================以下开始简谱主体==========================\n";
    tempStr+="Q: 1 2 3 4 | \n";
    tempStr+="C: 这是歌词 \n";$("textarea[name=customCode]").text('');initPageConfig();
    localStorage.setItem('customCode','');
    editorSetVal(tempStr);
    redraw(-1,'newFile');winClose();setFileName('未保存');
    opernFileId=0;
}

function toClose(){
    hideMenu();
    setTimeout(function(){
        if(confirm('您确定关闭本软件吗？\n提示：当前未保存的内容可能会丢失。')){
            window.opener=null;
            window.open('','_self');
            window.close();
        }
    },200);
}
function toPng(){
    return false;
    hideMenu();
    winTip("导出PNG图片","PNG图片生成中，请稍等...");
    if(window.canvg){
        setTimeout(function(){createPng();},300);
    }else{
        $.getScript('/Public/js/canvg/rgbcolor.js',function(){
            $.getScript('/Public/js/canvg/canvg.js',
            function(){
                setTimeout(function(){
                    createPng();
                },300);
            });
        });
    }
}
var pngHtml;
function createPng(){
    pngHtml='';
    $(".page").each(function(index,element){
        var svgHtml=$(element).html();
        var can=document.createElement("canvas");
        canvg(can,svgHtml,{
            renderCallback:function(){
                var datauri=can.toDataURL('image/png');
                pngHtml+='<img style="border:1px #ccc solid; width:800px; height:1132px; " src="'+datauri+'">';
            }
        });
    });
    pngHtml='<div style="text-align:center;"><div style="padding:10px 0 20px 0;">以下为PNG格式的图片，您可以在图片上按鼠标右键，然后选择“图片另存为...”将图片保存到您的电脑中。</div>'+pngHtml+'</div>';
    var pForm=$("#postForm")[0];
    pForm.action='/zhipu-toPng';
    pForm.method='POST';
    pForm.target="_blank";
    $("#postContent").val(pngHtml);
    pForm.submit();winClose();
}
function toSvg(){showWin('导出SVG格式图片','zhipu-toSvg-num-'+$(".page").length);}
function downSvg(num){var svgHtml=$(".page").eq(num).html();var pForm=$("#postForm")[0];pForm.action='/zhipu-toSvg';pForm.method='POST';pForm.target="postwin";$("#postContent").val(svgHtml);pForm.submit();}
function updateUserInfo(){$.post('/Zhipu-userInfo',null,function(re){winClose();$(".userInfo").html(re);});}
function toSave(){if(opernFileId>0){saveFile(opernFileId);}else{showWin('保存','Zhipu-fileBrowsing?type=save');}}
function tip(strs){$("#tip").html(strs);$("#tip").css('left',($(window).width()-$("#tip").width())/2);$("#tip").css('top',($(window).height()-$("#tip").height())/2);$("#tip").fadeIn(500,function(){setTimeout(function(){$("#tip").fadeOut(500);},500);});}
function editorSetVal(code_){window.frames["editFrame"].document.getElementById("editor_text").value=code_;window.frames["editFrame"].formatJP();window.frames["editFrame"].autoSize();$(".preview").scrollTop(0);window.frames["editFrame"].updateJPcode();}
function refreshFolderList(){$(".newFolderDiv").hide();$(".reFolderDiv").hide();$(".name:input").val('');$.get('/Zhipu-folderList',null,function(re){$(".fileCateList .list").html(re);selectFolder(currentFolderId);$(".fileCateList .list ul li span").bind('contextmenu',function(event){if(document.all){window.event.returnValue=false;}else{event.preventDefault();}
$(".folderMenu").css({'top':event.clientY-($('.win').css('top').replace(/px/g,"")*1),'left':event.clientX-($('.win').css('left').replace(/px/g,"")*1)});$(".folderMenu").fadeIn(200);$(".fileMenu").fadeOut(200);}).bind('mousedown',function(event){if(event.button==2){noHideMenu();}selectFolder($(this).parent().attr('data-id'));});});}
var currentFolderId=0;function selectFolder(ids){$(".fileCateList .current").removeClass('current');$("#folder_"+ids+' .name').addClass('current');currentFolderId=ids;refreshFileList();}
function folderReName(){hideMenu();$(".reFolderDiv .id").val(currentFolderId);$(".reFolderDiv .name").val($("#folder_"+currentFolderId+" .name").text());$(".reFolderDiv").show();$(".reFolderDiv .name").focus().select();}
function folderDel(){hideMenu();setTimeout(function(){if(confirm("您确认要删除此文件夹吗？\n此操作将同时删除此文件夹里的内容，并且不可恢复。")==true){$("#postwin").attr('src','/zhipu-folderDel?id='+currentFolderId);}},100);}
function folderOrder(type){$("#postwin").attr('src','/zhipu-folderOrder?type='+type+'&id='+currentFolderId);}
function refreshFileList(){$(".folderDiv").hide();$.get('/Zhipu-fileList?fid='+currentFolderId,null,function(re){$(".fileList .list").html(re);$(".fileList .list ul li .select").bind('contextmenu',function(event){if(document.all){window.event.returnValue=false;}else{event.preventDefault();}
$(".fileMenu").css({'top':event.clientY-($('.win').css('top').replace(/px/g,"")*1),'left':event.clientX-($('.win').css('left').replace(/px/g,"")*1)});$(".fileMenu").fadeIn(200);$(".folderMenu").fadeOut(200);}).bind('mousedown',function(event){if(event.button!=2){hideMenu();}
noHideMenu();selectFile($(this).parent().attr('data-id'));}).dblclick(function(){if($("#saveName").length>0){saveFile();}else{openFile();}});});}
var currentFileId=0;function selectFile(ids){$(".fileList .current").removeClass('current');$("#file_"+ids+' .name').addClass('current');currentFileId=ids;$(".fileInfo .filename").html($("#file_"+ids+' .name').text());$("#saveName").val($("#file_"+ids+' .name').text());}
function cancelSelectFile(){currentFileId=0;$(".fileList .current").removeClass('current');$(".fileInfo .filename").html('');}
function fileDel(){hideMenu();setTimeout(function(){if(confirm("您确认要删除此文件吗？文件删除后不可恢复。")==true){$("#postwin").attr('src','/zhipu-fileDel?id='+currentFileId);}},100);}
function fileReName(){hideMenu();var name_=$("#file_"+currentFileId+" .name").text();$(".reFileDiv").show();$(".reFileDiv .id").val(currentFileId);$(".reFileDiv .name").val(name_);$(".reFileDiv .name").focus().select();}
function fileMove(){hideMenu();$(".fileMoveDiv").show();$(".fileMoveDiv .id").val(currentFileId);$(".fileMoveDiv .fid").html("");$(".fileCateList .list ul li").each(function(index,element){$(".fileMoveDiv .fid").append("<option value='"+$(element).attr('data-id')+"'>"+$(element).find(".name").text()+"</option>");});}
var opernFileId=0;function openFile(){if(currentFileId==0){alert('您没有选择任何文件');return false;}
winClose();editorSetVal('');winTip("载入文件","文件正在载入中，请稍等...");$.getJSON("/zhipu-getFile?id="+currentFileId,function(data){opernFileId=currentFileId;setFileName(data.name);$("textarea[name=customCode]").text(data.custom_code);localStorage.setItem('customCode',data.custom_code);$("textarea[name=pageConfig]").text(data.page_config);localStorage.setItem('pageConfig',data.page_config);$('#lockCustom').prop("checked",true);editorSetVal(data.code);winClose();});}
function saveFile(ids){if($("#saveName").length>0){$("#saveName")[0].disabled=true;}
var jpcode_=window.frames["editFrame"].document.getElementById("editor_text").value;jpcode_=jpcode_.replace(/\n/g,"&hh&");var savename_=$("#saveName").val();if(savename_==''){alert('文件名不能为空');return false;}
customCode=$("textarea[name=customCode]").text();pageConfig=$("textarea[name=pageConfig]").text();$.post('/Zhipu-saveFile',{code:jpcode_,savename:savename_,fid:currentFolderId,id:ids,customCode:customCode,pageConfig:pageConfig},function(re){arr=re.split('|');if(arr[0]=="cover"){if(confirm("当前文件夹已存在相同文件名的文件，需要覆盖此文件吗？")==true){saveFile(arr[1]);return false;}else{$("#saveName")[0].disabled=false;}}else if(arr[0]=='error'){alert(arr[1]);}else{saveSuccess(arr[0],arr[1]);}});}
function saveSuccess(id,name){opernFileId=id;setFileName(name);if($("#playBut").length==0){winClose();}
hideMenu();tip("文件保存成功！");}
function setFileName(names){$("#filename").html(names+'.jps');$("#filename").css('left',($(window).width()-$("#filename").width())/2);}
var exampleFileId=0;function openExampleFile(){if(exampleFileId==0){alert('您没有选择任何文件');return false;}
winClose();editorSetVal('');winTip("载入文件","文件正在载入中，请稍等...");$.getJSON("/zhipu-getExampleFile?id="+exampleFileId,function(data){opernFileId=0;$("textarea[name=customCode]").text(data.custom_code);localStorage.setItem('customCode',data.custom_code);$("textarea[name=pageConfig]").text(data.page_config);localStorage.setItem('pageConfig',data.page_config);$('#lockCustom').prop("checked",true);setFileName(data.name);editorSetVal(data.code);winClose();});}
var win_drag_state=0;
function show_drag(){
    var showTable=$(".win");
    var handle=$(".win .titleBar");
    handle.find("span").css("cursor","move");
    handle.bind("mousedown",function(event){
        win_drag_state=1;
        var showTop=parseInt(showTable.css('top'));
        var showLeft=parseInt(showTable.css('left'));
        var mouse_x=event.pageX;
        var mouse_y=event.pageY;
        $(document).bind("mousemove",function(ev){
            if(win_drag_state==1){
                var _x=ev.pageX-mouse_x;
                var _y=ev.pageY-mouse_y;
                var nowLeft=(showLeft+_x)+"px";
                var nowTop=(showTop+_y)+"px";
                showTable.css({top:nowTop,left:nowLeft});
            }
        });
    });
    $(document).bind("mouseup",function(){win_drag_state=0;});
}
function showWin(title,url,width,height){
    if($("#playBut").length>0){
        stopPlay();
    }
    hideMenu();
    $(".win .titleBar span").html(title);
    $(".win .body").html("<div class=\"winLoad\">xd加载中，请稍等...");
    autoWinSize();
    $(".mask").fadeIn(300);
    $(".win").fadeIn(300);
    $.get(url,null,function(data){
        if(width){
            data='<div style="width:'+width+'px; height:'+height+'px; overflow:auto; margin-right:1px;">'+data+'</div>'    
        }
        $(".win .body").html(data);autoWinSize();
    });
}
function autoWinSize(){var left=($(window).width()-$(".win").width())/2;var Top=($(window).height()-$(".win").height())/2;$(".win").css({'left':left,'top':Top});}
function winClose(){if($("#playBut").length>0){stopPlay();}
$(".win").fadeOut(300);$(".mask").fadeOut(300);}
function winTip(title,str){$(".win .body").html("<div class=\"winLoad\">"+str+"");$(".win .titleBar span").html(title);autoWinSize();$(".mask").fadeIn(300);$(".win").fadeIn(300);}
$(document).ready(function(){show_drag();});var isfullscreen=0;function toFullscreen(){hideMenu();setTimeout(function(){alert("提示：请按键盘上的“F11”键，即可进入或退出全屏模式。");},300);return false;if(isfullscreen==0){fullscreen();isfullscreen=1;$("#menuFullscreen").html("<i>F11</i>退出全屏");}else{qiutFullscreen();isfullscreen=0;$("#menuFullscreen").html("<i>F11</i>全屏");}}
function fullscreen(){var docElm=document.documentElement;if(docElm.requestFullscreen){docElm.requestFullscreen();}else if(docElm.mozRequestFullScreen){docElm.mozRequestFullScreen();}else if(docElm.webkitRequestFullScreen){docElm.webkitRequestFullScreen();}else if(elem.msRequestFullscreen){elem.msRequestFullscreen();}else{alert("很抱歉，您的浏览器不支持自动全屏，请按快捷键“F11”进入全屏")}}
function qiutFullscreen(){if(document.exitFullscreen){document.exitFullscreen();}else if(document.mozCancelFullScreen){document.mozCancelFullScreen();}else if(document.webkitCancelFullScreen){document.webkitCancelFullScreen();}else if(document.msExitFullscreen){document.msExitFullscreen();}}
var cfDefault=new Array();cfDefault['page']='A4';cfDefault['margin_top']='80';cfDefault['margin_bottom']='80';cfDefault['margin_left']='80';cfDefault['margin_right']='80';cfDefault['biaoti_font']='Microsoft YaHei';cfDefault['shuzi_font']='b';cfDefault['geci_font']='Microsoft YaHei';cfDefault['height_quci']='13';cfDefault['height_cici']='10';cfDefault['height_ciqu']='40';cfDefault['height_shengbu']='0';cfDefault['biaoti_size']='36';cfDefault['fubiaoti_size']='20';cfDefault['geci_size']='18';cfDefault['body_margin_top']='40';cfDefault['lianyinxian_type']='0';var TCF=new Object();function savePageConfig(){var tempJson=JSON.stringify(TCF);$("textarea[name=pageConfig]").text(tempJson);localStorage.setItem('pageConfig',tempJson);redraw(-1,'savePageConfig');winClose();}
function initPageConfig(){TCF.page=cfDefault['page'];TCF.margin_top=cfDefault['margin_top'];TCF.margin_bottom=cfDefault['margin_bottom'];TCF.margin_left=cfDefault['margin_left'];TCF.margin_right=cfDefault['margin_right'];TCF.biaoti_font=cfDefault['biaoti_font'];TCF.shuzi_font=cfDefault['shuzi_font'];TCF.geci_font=cfDefault['geci_font'];TCF.height_quci=cfDefault['height_quci'];TCF.height_cici=cfDefault['height_cici'];TCF.height_ciqu=cfDefault['height_ciqu'];TCF.height_shengbu=cfDefault['height_shengbu'];TCF.biaoti_size=cfDefault['biaoti_size'];TCF.fubiaoti_size=cfDefault['fubiaoti_size'];TCF.geci_size=cfDefault['geci_size'];TCF.body_margin_top=cfDefault['body_margin_top'];TCF.lianyinxian_type=cfDefault['lianyinxian_type'];savePageConfig();}
function pageConfigInit(){var jsonStr=$("textarea[name=pageConfig]").text();if(jsonStr!=''){var tempTCF=JSON.parse(jsonStr);if(tempTCF){TCF=tempTCF;}}
if(!TCF.page){TCF.page=cfDefault['page'];}
if(!TCF.margin_top){TCF.margin_top=cfDefault['margin_top'];}
if(!TCF.margin_bottom){TCF.margin_bottom=cfDefault['margin_bottom'];}
if(!TCF.margin_left){TCF.margin_left=cfDefault['margin_left'];}
if(!TCF.margin_right){TCF.margin_right=cfDefault['margin_right'];}
if(!TCF.biaoti_font){TCF.biaoti_font=cfDefault['biaoti_font'];}
if(!TCF.shuzi_font){TCF.shuzi_font=cfDefault['shuzi_font'];}
if(!TCF.geci_font){TCF.geci_font=cfDefault['geci_font'];}
if(!TCF.height_quci){TCF.height_quci=cfDefault['height_quci'];}
if(!TCF.height_cici){TCF.height_cici=cfDefault['height_cici'];}
if(!TCF.height_ciqu){TCF.height_ciqu=cfDefault['height_ciqu'];}
if(!TCF.height_shengbu){TCF.height_shengbu=cfDefault['height_shengbu'];}
if(!TCF.biaoti_size){TCF.biaoti_size=cfDefault['biaoti_size'];}
if(!TCF.fubiaoti_size){TCF.fubiaoti_size=cfDefault['fubiaoti_size'];}
if(!TCF.geci_size){TCF.geci_size=cfDefault['geci_size'];}
if(!TCF.body_margin_top){TCF.body_margin_top=cfDefault['body_margin_top'];}
if(!TCF.lianyinxian_type){TCF.lianyinxian_type=cfDefault['lianyinxian_type'];}
$("#cf_page").val(TCF.page);$("#cf_margin_top").val(TCF.margin_top);$("#cf_margin_bottom").val(TCF.margin_bottom);$("#cf_margin_left").val(TCF.margin_left);$("#cf_margin_right").val(TCF.margin_right);$("#cf_biaoti_font").val(TCF.biaoti_font);$("#cf_shuzi_font").val(TCF.shuzi_font);$("#cf_geci_font").val(TCF.geci_font);$("#cf_height_quci").val(TCF.height_quci);$("#cf_height_cici").val(TCF.height_cici);$("#cf_height_ciqu").val(TCF.height_ciqu);$("#cf_height_shengbu").val(TCF.height_shengbu);$("#cf_biaoti_size").val(TCF.biaoti_size);$("#cf_fubiaoti_size").val(TCF.fubiaoti_size);$("#cf_geci_size").val(TCF.geci_size);$("#cf_body_margin_top").val(TCF.body_margin_top);$("#cf_lianyinxian_type").val(TCF.lianyinxian_type);if(TCF.heights){for(var p in TCF.heights){var pNum=TCF.heights[p][0];$("#cf_height_page").append('<option value="'+pNum+'">第'+pNum+'页</option>');}}}
function setHeightPage(){var pNum=$("#cf_height_page").val();if(pNum>-1){var temp=TCF.heights['a'+pNum];$("#cf_height_quci").val(temp[1]);$("#cf_height_cici").val(temp[2]);$("#cf_height_ciqu").val(temp[3]);$("#cf_height_shengbu").val(temp[4]);}else{$("#cf_height_quci").val(TCF.height_quci);$("#cf_height_cici").val(TCF.height_cici);$("#cf_height_ciqu").val(TCF.height_ciqu);$("#cf_height_shengbu").val(TCF.height_shengbu);}}
var tempHeights=new Array();function setTempHeight(){var cfPageNum=$("#cf_height_page").val();var t1=$("#cf_height_quci").val();var t2=$("#cf_height_cici").val();var t3=$("#cf_height_ciqu").val();var t4=$("#cf_height_shengbu").val();if(cfPageNum>-1){if(!TCF.heights){TCF.heights=Object();}
TCF.heights['a'+cfPageNum]=[cfPageNum,t1,t2,t3,t4];}else{TCF.height_quci=t1;TCF.height_cici=t2;TCF.height_ciqu=t3;TCF.height_shengbu=t4;}}
var cf_height_pages=new Object;function add_cf_height_page(){var pageNum=prompt('请输入页码：');if(pageNum===null){return false;}
var r=/^[0-9]*[1-9][0-9]*$/;　　
if(r.test(pageNum)==false){alert("页码必须是一个整数。");add_cf_height_page();return false;}
pageNum=pageNum*1;if($('#cf_height_page option[value='+pageNum+']').length>0){alert("对不起，已经存在此页面的针对页。")}else{$("#cf_height_page").append("<option value='"+pageNum+"'>第"+pageNum+"页</option>");}
$('#cf_height_page option').sort(function(a,b){var aText=$(a).attr('value')*1;var bText=$(b).attr('value')*1;if(aText>bText)return 1;if(aText<bText)return-1;return 0;}).appendTo('#cf_height_page');$("#cf_height_page").find("option[value="+pageNum+"]").attr("selected",true);setTempHeight();}
function del_cf_height_page(){var pNum=$("#cf_height_page").val();if(pNum>-1){$("#cf_height_page").find("option[value="+pNum+"]").remove();delete TCF.heights['a'+pNum];setHeightPage();}else{alert("不能移除“所有页”的配置。")}}
function notNum(str){return isNaN(parseInt(str,10));}
function setJpFormat(){if($("#jpFormat").prop("checked")){localStorage.setItem('autoJpFormat',"y");}else{localStorage.setItem('autoJpFormat',"n");}}
var clickCustom=0;var clickSelect=0;var cSelectState=0
$(document).ready(function(){$(document).bind("mousemove",moveElement);$(document).bind("mouseup",function(){custom_drag_state=0;if(clickCustom==0&&clickSelect==0){$("#custom defs g rect[mask]").attr({'stroke-width':"0"});$("#customAttribute").hide();cSelectState=0;}
if(clickSelect==1){clickSelect=0;}});$("#customAttribute").bind("mousedown",function(){clickCustom=1;$("#customAttribute").bind("mouseup",function(){setTimeout(function(){clickCustom=0;},100);});});$(".preview").scroll(function(){updateCustomAttributePos();});});function customShortcuts(keyCode){if(cSelectState==0){return true;}
if(keyCode==46){removeCustom();}
if(keyCode==37){lightMove('x',-1);}
if(keyCode==38){lightMove('y',-1);}
if(keyCode==39){lightMove('x',1);}
if(keyCode==40){lightMove('y',1);}
return false;}
var selectedElement=0;var currentX=0;var currentY=0;var scaleX=1;var scaleY=1;var custom_drag_state=0;function addText(text,family,size,color,weight){var text=$("#custom_text").val();var family=$("#custom_family").val();var size=$("#custom_size").val();var color=$("#custom_color").val();var weight=$("#custom_weight").val();if(text==''){alert("请输入文本");return false;}
custom_code='<g id="customID" data-type="text"><rect mask="true" height="10" width="10" x="-5" y="-5" stroke-width="0" fill="#ffff00"/><text x="0" y="0" fill="'+color+'" font-family="'+family+'" font-size="'+size+'" style="font-weight:'+weight+';">'+text+'</text></g>';addToSvg('text',custom_code);winClose();}
var lastAddSymbol=0;function addSymbol(num){hideMenu();if(num==0){alert('您本次运行后还未插入过自定义符号。');return false;}
lastAddSymbol=num;var getUrl='/Public/symbol/'+num+'.txt';$.get(getUrl,function(re){addToSvg('path',re);winClose();});}
function addToSvg(type,svgCode){$("#addCustomTip").css('left',($(window).width()-$("#addCustomTip").width())/2);$("#addCustomTip").fadeIn(200);$("svg").click(function(e){svgCode='<defs>'+svgCode+'</defs><use onmousedown="selectElement(this)"  style="cursor:move;" id="use_customID" x="{x}" y="{y}" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#customID"></use>';getScale(svgCode);var clickX=(e.pageX-$(this).offset().left)/scaleX-5;var clickY=(e.pageY-$(this).offset().top)/scaleY-5;var customID=randomString(10);svgCode=svgCode.replace('{x}',clickX);svgCode=svgCode.replace('{y}',clickY);svgCode=svgCode.replace(/customID/g,customID);$(this).find('#custom')[0].appendChild(parseSVG(svgCode));if(type=='text'){var textWidth=$("#"+customID).find("text")[0].getComputedTextLength();var textHeight=$("#"+customID).find("text").attr('font-size')*1;$("#"+customID).find("rect").attr({width:textWidth+10,height:textHeight+10});$("#"+customID).find("text").attr('dy',textHeight*0.88);}
var maskObj=$("#"+customID).find("rect[mask]");if(lockCustomState==1){$("#use_"+customID).css('cursor','default');maskObj.attr({x:-5555,y:-5555});}
maskObj.attr({'data-width':maskObj.attr('width'),'data-height':maskObj.attr('height'),'opacity':0.8});$("#addCustomTip").fadeOut(200);$('#lockCustom').prop("checked",false);setLockCustom();updateCustomCode();$("svg").unbind("click");});}
function parseSVG(s){var div=document.createElementNS('http://www.w3.org/1999/xhtml','div');div.innerHTML='<svg xmlns="http://www.w3.org/2000/svg">'+s+'</svg>';var frag=document.createDocumentFragment();while(div.firstChild.firstChild){frag.appendChild(div.firstChild.firstChild);}
return frag;}
function selectElement(obj){selectedElement=obj;if(lockCustomState==0){custom_drag_state=1;currentX=window.event.clientX;currentY=window.event.clientY;var transform=$(selectedElement).attr('transform');if(transform){getScale(transform);}
var customID=$(selectedElement).attr('xlink:href');$("#custom defs g rect[mask]").attr({'stroke-width':"0"});$(customID+" rect[mask]").attr({'stroke-width':"1",stroke:"#ff0000",'stroke-dasharray':"5,5"});showCustomAttributeDiv();}
clickCustom=1;$(selectedElement).bind("mouseup",function(){setTimeout(function(){clickCustom=0;},100);});}
function moveElement(){if(custom_drag_state==1){var s0bj=$(selectedElement);var dx=(window.event.clientX-currentX)/scaleX;var dy=(window.event.clientY-currentY)/scaleY;var newX=s0bj.attr('x')*1+dx;var newY=s0bj.attr('y')*1+dy;s0bj.attr('x',newX);s0bj.attr('y',newY);currentX=window.event.clientX;currentY=window.event.clientY;updateCustomAttributePos();updateCustomCode();}}
function getScale(transform){var scaleStart=transform.indexOf('scale');if(transform.indexOf('scale')>-1){var scale=transform.substring(scaleStart+6,transform.length);scale=scale.substring(0,scale.indexOf(')'));if(scale.indexOf(',')>-1){var temArr=scale.split(',');scaleX=temArr[0];scaleY=temArr[1];}else{scaleX=scale;scaleY=scale;}}else{scaleX=1;scaleY=1;}}
function randomString(len){　　len=len||32;　　var $chars='ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';　　var maxPos=$chars.length;　　var pwd='';　　for(i=0;i<len;i++){　　　　pwd+=$chars.charAt(Math.floor(Math.random()*maxPos));　　}
　　return'custom_'+pwd;}
var lockCustomState=1;function setLockCustom(){if($("#lockCustom").prop("checked")){$("#custom use").css('cursor','default');$("#custom defs g rect[mask]").attr({x:-5555,y:-5555});$("#custom defs g rect[mask]").attr({'stroke-width':"0"});lockCustomState=1;}else{$("#custom use").css('cursor','move');$("#custom defs g rect[mask]").attr({x:-5,y:-5});lockCustomState=0;}}
function updateCustomCode(){var customCode='';$('.page').each(function(i){var pageHtml_=$(this).html();var temArr=pageHtml_.split('<g id="custom">');var temp=temArr[1].replace("</g></svg>","");customCode=customCode+temp+'[fenye]';});$("textarea[name=customCode]").text(customCode);localStorage.setItem('customCode',customCode);}
function getSelectedObj(){return $($(selectedElement).attr('xlink:href'));}
function showCustomAttributeDiv(){cSelectState=1;var customObj=getSelectedObj();var type=customObj.attr('data-type');$(".attributes").hide();$(".attributes_"+type).show();if(type=='text'){$("#custom_text_size").val(customObj.find("text").attr('font-size'));$("#custom_text_family").val(customObj.find("text").attr('font-family'));$("#custom_text_color").val(customObj.find("text").attr('fill'));$("#custom_text_weight").val(customObj.find("text").css('font-weight'));$("#custom_text_text").val(customObj.find("text").text());}
if(type=='symbol'){$("#custom_symbol_fill").val(customObj.find("[fill]:eq(1)").attr('fill'));var scaleX=1;var scaleY=1;var transform=customObj.find("[transform]").attr('transform');if(transform){var scaleStart=transform.indexOf('scale');if(transform.indexOf('scale')>-1){var scale=transform.substring(scaleStart+6,transform.length);scale=scale.substring(0,scale.indexOf(')'));if(scale.indexOf(',')>-1){var temArr=scale.split(',');scaleX=temArr[0];scaleY=temArr[1];}else{scaleX=scale;scaleY=scale;}}}
$("#custom_symbol_width").val(scaleX);$("#custom_symbol_height").val(scaleY);}
updateCustomAttributePos();$("#customAttribute").show();}
function updateCustomAttributePos(){if(cSelectState==1){var customObj=getSelectedObj();var svgObj_=customObj.parents("svg");var top_=svgObj_.offset().top+$(selectedElement).attr('y')*1-7;var left_=svgObj_.offset().left+$(selectedElement).attr('x')*1-($("#customAttribute").width()+20);$("#customAttribute").css({top:top_,left:left_});}}
function updateTextSize(){var customObj=getSelectedObj();var textWidth=customObj.find("text")[0].getComputedTextLength();var textHeight=customObj.find("text").attr('font-size')*1;customObj.find("rect").attr({width:textWidth+10,height:textHeight+10});customObj.find("text").attr('dy',textHeight*0.88);}
function lightMove(type,num){var customObj=$(selectedElement);customObj.attr(type,customObj.attr(type)*1+num);updateCustomAttributePos();updateCustomCode();}
function removeCustom(){if(cSelectState==0){return false;}
var customObj=getSelectedObj();$(selectedElement).remove();customObj.parent().remove();$("#customAttribute").hide();updateCustomCode();cSelectState=0;}
$(document).ready(function(){$("#customAttribute select").bind("click",function(){clickSelect=1;});$("#customAttribute select").bind("change",function(){var customObj=getSelectedObj();var val=this.value;var selectId=$(this).attr('id');switch(selectId){case'custom_text_size':customObj.find("text").attr('font-size',val);break;case'custom_text_family':customObj.find("text").attr('font-family',val);break;case'custom_text_color':customObj.find("text").attr('fill',val);break;case'custom_text_weight':customObj.find("text").css('font-weight',val);break;case'custom_symbol_fill':customObj.children('[mask!=true]').attr('fill',val);break;}
if(selectId.indexOf('_text_')>-1){updateTextSize();}
setTimeout(function(){clickSelect=0;},200);updateCustomCode();});$("#custom_text_text").bind("input",function(){var customObj=getSelectedObj();var val=this.value;customObj.find("text").text(val);updateTextSize();updateCustomCode();});$("#custom_symbol_width,#custom_symbol_height").bind("input",function(){var customObj=getSelectedObj();var widthR=$("#custom_symbol_width").val();var heightR=$("#custom_symbol_height").val();customObj.children('[mask!=true]').attr('transform','scale('+widthR+','+heightR+')');var maskObj=customObj.children('[mask=true]');var newWidth=maskObj.attr('data-width')*widthR-((widthR-1)*10);var newHeight=maskObj.attr('data-height')*heightR-((heightR-1)*10);maskObj.attr({width:newWidth,height:newHeight});updateCustomCode();});});function nobr(e){var et=e||window.event;var keycode=et.charCode||et.keyCode;if(keycode==13){if(window.event){window.event.returnValue=false;}else{e.preventDefault();}}}function thisMovie(movieName){return document[movieName];var isIE=navigator.appName.indexOf("Microsoft")!=-1;return(isIE)?window[movieName]:document[movieName];}
var countTime=0,currentPlay=0,playInterval;var plays=new Array();var xunhuan=new Array();var playState=0;function toPlay(){if(playState!=1){var jpcode=window.frames["editFrame"].document.getElementById("editor_text").value;if(jpcode.indexOf('Q2')>-1||jpcode.indexOf('{bz')>-1||jpcode.indexOf('{dsb')>-1){alert("不很抱歉，程序目前不支持包含多声部的简谱试听。");return false;}
playAll();playState=1;$("#playBut").val('暂停');$("#speed")[0].disabled=true;$("#adjust")[0].disabled=true;$("#hulvFanfu")[0].disabled=true;}else{pausePlay();playState=2;$("#playBut").val('播放');}}
function stopPlay(){countTime=0;currentPlay=0;plays=[];againState=[];fanfuNum=1;datiaoyueNum=1;clearInterval(playInterval);playState=0;$("#playBut").val('播放');$("#speed")[0].disabled=false;$("#adjust")[0].disabled=false;$("#hulvFanfu")[0].disabled=false;$("#playerLine").hide();}
function pausePlay(){clearInterval(playInterval);}
var topPY,leftPY,Pindex;var fanfuNum=1,datiaoyueNum=1,zIndex,lastHS=0,tyNum=0,lastTy=0;var tiaofangziWeiJieShu=['',''];function playAll(){if(plays.length==0){zIndex=0;firstKuohu=true;topPY=55-$(".preview").scrollTop()+10;leftPY=$("#page_0").offset().left;$("svg use[time]").each(function(index,element){var time=Math.round($(element).attr('time')*$("#speed").val()*$("#adjust").val());nextObj=$("svg use[time]:eq("+(index+1)+")");gotos=new Array;if(nextObj.attr('code')){if(nextObj.attr('code').indexOf('&ykh')!=-1&&firstKuohu==true){zIndex=index+2;firstKuohu=false;}
if(nextObj.attr('code').indexOf("|y")!=-1||nextObj.attr('code').indexOf("|l")!=-1){gotos.push(['fanfu',zIndex,'']);}
if(nextObj.attr('code').indexOf("|z")!=-1||nextObj.attr('code').indexOf("|l")!=-1){zIndex=index+2;}
if(nextObj.attr('code').indexOf("&hs")!=-1){lastHS=index+2;}
if(nextObj.attr('code').indexOf("&ds")!=-1){gotos.push(['dafanfu',lastHS,'']);}
if(nextObj.attr('code').indexOf("]")!=-1){if(nextObj.attr('code').indexOf("]/")!=-1){tiaofangziWeiJieShu=[lastFangZiStart,lastFangZiCode];}else{plays[lastFangZiStart][4].push(['tiaofangzi',index+1,lastFangZiCode]);}}
if(nextObj.attr('code').indexOf("[")!=-1){lastFangZiStart=index+1;lastFangZiCode=$("svg use[time]:eq("+(index+1)+")").attr('code');if(tiaofangziWeiJieShu[0]!==''){plays[tiaofangziWeiJieShu[0]][4].push(['tiaofangzi',index+1,tiaofangziWeiJieShu[1]]);tiaofangziWeiJieShu=['',''];}}
next2Obj=$("svg use[time]:eq("+(index+2)+")");if(next2Obj.length==0){if(tiaofangziWeiJieShu[0]!==''){plays[tiaofangziWeiJieShu[0]][4].push(['tiaofangzi',index+1,tiaofangziWeiJieShu[1]]);tiaofangziWeiJieShu=['',''];}}
if(nextObj.attr('code').indexOf("&ty")!=-1){tyNum++;if(tyNum==2){plays[lastTy][4].push(['datiaoyue',index+1,'']);tyNum=0;}else{lastTy=index;}}
if(nextObj.attr('code').indexOf("&dc")!=-1){gotos.push(['dc',0,'']);}
if(nextObj.attr('code').indexOf("&fine")!=-1){gotos.push(['fine','','']);}}
plays[index]=[time,$(element).attr('audio'),$(element).offset().top-topPY,$(element).offset().left-leftPY,gotos];$(element).attr('data-pIndex',index);$(element).click(function(e){if(playState!=0){currentPlay=$(this).attr('data-pIndex')*1;$("#playerLine").css({'margin-top':plays[index][2]-4,'margin-left':plays[index][3]-4,'display':'block'});}});});}
playInterval=setTimeout(playIntervalFun,10);}
var againState=new Array();function playIntervalFun(){if(plays.hasOwnProperty(currentPlay)){var note=plays[currentPlay];if(note[1]!=''){if($("#playAutoRoll").attr("checked")){if(($(".preview").scrollTop()+$(".preview").height()-55)<note[2]+20||$(".preview").scrollTop()>note[2]-20){$(".preview").animate({'scrollTop':note[2]-50},1000);}}
thisMovie("Fplay").playAge(note[1]);$("#playerLine").css({'margin-top':note[2]-4,'margin-left':note[3]-4,'display':'block'});}
if(note[4].length>0&&!$("#hulvFanfu").attr("checked")){for(var i=0;i<note[4].length;i++){if(note[4][i][0]!==''){type=note[4][i][0];toIndex=note[4][i][1];qita=note[4][i][2];if(type=='fanfu'){if(!againState[currentPlay]){againState[currentPlay]=true;currentPlay=toIndex-1;fanfuNum++;break;}else if(againState[currentPlay]==true){fanfuNum=1;}}
if(type=='tiaofangzi'){if(toIndex!==''){if(qita.indexOf(fanfuNum)==-1){jumpObj=plays[toIndex-1];if(jumpObj[4].length>0){for(var x=0;x<note[4].length;x++){if(jumpObj[4][x][1]!==''){if(jumpObj[4][x][2].indexOf(fanfuNum)==-1&&jumpObj[4][x][2].indexOf(":|")!=-1){currentPlay=jumpObj[4][x][1];}else{currentPlay=toIndex;}}else{currentPlay=toIndex;}}}else{currentPlay=toIndex;}
break;}}}
if(type=='dafanfu'){if(!againState[currentPlay]){againState=[];againState[currentPlay]=true;currentPlay=toIndex-1;fanfuNum=1;datiaoyueNum++;break;}}
if(type=='datiaoyue'){if(datiaoyueNum>1){currentPlay=toIndex-1;break;}}
if(type=='dc'){if(!againState[currentPlay]){againState=[];againState[currentPlay]=true;currentPlay=toIndex-1;fanfuNum=1;datiaoyueNum++;break;}}
if(type=='fine'){if(datiaoyueNum>1){setTimeout(function(){stopPlay();},1000);return false;}}}}}
currentPlay++;currentObj=$("svg use[time]:eq("+(currentPlay-1)+")");if(currentObj.length>0){currentCode=currentObj.attr('code');if(currentCode.indexOf('[')!=-1){if(currentCode.indexOf('1')!=-1){fanfuNum=1;}
if(currentCode.indexOf('2')!=-1){fanfuNum=2;}
if(currentCode.indexOf('3')!=-1){fanfuNum=3;}
if(currentCode.indexOf('4')!=-1){fanfuNum=4;}}}
if(plays.hasOwnProperty(currentPlay)){playInterval=setTimeout(playIntervalFun,note[0]);}else{setTimeout(function(){stopPlay();},1000);}}}