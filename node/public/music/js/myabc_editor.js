var nodelinearr;
// 拖动鼠标触发的事件
var initY = 0;
var initNote = "";
var lastInterval = 0;
var lastNote = "";
var initStartPos = 0;

var isNew = true;//打开谱例属性是否是新增状态

var updateStaffPropStatus = false;//修改谱表属性

var notestr = "CDEFGABcdefgab";
// 剪贴板内容
var cut_content = "";

//系统剪贴板内容
var clipdataContent = "";

//谱表规则
//1.每行结尾标记当前是第几个声部的第几行%V1line0,%V1line1
//2.每个声部最后一行标记声部结束%V1end
//3.用$符号标记换行
// 默认的单谱表


var headStr = "%%staffsep 60\n%%sysstaffsep 60\n%%keydefined C=higher\n"+
				"%%contbarnb 1\n"+
				"%%leftmargin 20\n"+
				"%%rightmargin 10\n"+
				"%%titlefont Microsoft-YaHei 28\n"+
				"%%stretchlast 0.9\n"+
				"%%linebreak $\n"+
				"%%pos vocal down \n"+
				"%%createby createuserinfo \n"+
				"%%equalbars 0 \n"+
				"%%keywarn 0 \n"+
				"%%cancelkey 0 \n"+
				"I:abc-charset utf-8\n"+
				"X: 1\n"+
				"T: 标题\n"+
				"C: 作曲\n"+
				"Q: 1/4=88\n"+
				"M: 4/4\n"+
				"L: 1/8\n"+
				"K: C\n";
var defstr = headStr + 
				"%%vsetting_start\n"+
				"%%score 1\n"+
				"V:1 treble\n"+
				"%%MIDI program 0\n"+
				"%%vsetting_end\n"+
				"V:1\n"+
				"z,8|z,8|z,8|z,8|$z,8|z,8|z,8|z,8|%V1line0end";
// 默认的双谱表
var defstr2 = "%%staffsep 60\n%%sysstaffsep 60\n%%contbarnb 1\n%%leftmargin 20\n%%rightmargin 10\n%%titlefont Microsoft-YaHei 28\n%%stretchlast 0.7\n%%pos vocal down \nI:abc-charset utf-8\nX: 1\nT: 标题\nC: 作曲\nQ: 1/4=88\nM: 2/4\nL: 1/8\nK: C\n%%MIDI program 0\nV:1 treble\nz\nV:2 bass\nz";
var staffTypes = {
		"treble" : headStr + "%%score 1\nV:1 treble\n%%MIDI program 0\nz,8|z,8|z,8|z,8|$z,8|z,8|z,8|z,8|",
		"bass" : headStr + "%%score 1\nV:1 bass\n%%MIDI program 0\nz,8|z,8|z,8|z,8|$z,8|z,8|z,8|z,8|",
		"piano" : headStr + "%%vsetting_start\n"+
				"%%score {1 | 2}\n"+
				'V:1 treble nm="Piano" snm="Pno."\n'+
				"%%MIDI program 0\n"+
				"V:2 bass\n"+
				"%%MIDI program 0\n"+
				"%%vsetting_end\n"+
				"V:1\n"+
				"z,8|z,8|z,8|z,8|$z,8|z,8|z,8|z,8|\n"+
				"V:2\n"+
				"z,8|z,8|z,8|z,8|$z,8|z,8|z,8|z,8|",
		"satb" : headStr +"%%vsetting_start\n"+
				"%%score [1 2 3 4]\n"+
				'V:1 treble nm="Soprano" snm="S."\n'+
				'%%MIDI program 0\n'+
				'V:2 treble nm="Alto" snm="A."\n'+
				'%%MIDI program 0\n'+
				'V:3 treble-8 nm="Tenor" snm="T."\n'+
				'%%MIDI program 0\n'+
				'V:4 bass nm="Bass" snm="B."\n'+
				'%%MIDI program 0\n'+
				'%%vsetting_end\n'+
				'V:1\n'+
				'z,8|z,8|z,8|z,8|z,8|z,8|z,8|z,8|$ z,8 | z,8 | z,8 | z,8 | z,8 | z,8 | z,8 | z,8 |\n'+
				'V:2 \n'+
				'z,8 | z,8 | z,8 | z,8 | z,8 | z,8 | z,8 | z,8 |$ z,8 | z,8 | z,8 | z,8 | z,8 | z,8 | z,8 | z,8 |\n'+
				'V:3 \n'+
				'z,8 | z,8 | z,8 | z,8 | z,8 | z,8 | z,8 | z,8 |$ z,8 | z,8 | z,8 | z,8 | z,8 | z,8 | z,8 | z,8 |\n'+
				'V:4 \n'+
				'z,8 | z,8 | z,8 | z,8 | z,8 | z,8 | z,8 | z,8 |$ z,8 | z,8 | z,8 | z,8 | z,8 | z,8 | z,8 | z,8 |\n',
		"satb_piano":headStr +"%%vsetting_start\n"+
				"%%score [1 2 3 4]{5 | 6}\n"+
				'V:1 treble nm="Soprano" snm="S."\n'+
				'%%MIDI program 0\n'+
				'V:2 treble nm="Alto" snm="A."\n'+
				'%%MIDI program 0\n'+
				'V:3 treble-8 nm="Tenor" snm="T."\n'+
				'%%MIDI program 0\n'+
				'V:4 bass nm="Bass" snm="B."\n'+
				'%%MIDI program 0\n'+
				'V:5 treble nm="Piano" snm="Pno."\n'+
				'%%MIDI program 0\n'+
				'V:6 bass \n'+
				'%%MIDI program 0\n'+
				'%%vsetting_end\n'+
				'V:1\n'+
				'z,8|z,8|z,8|z,8|z,8|z,8|z,8|z,8|$ z,8 | z,8 | z,8 | z,8 | z,8 | z,8 | z,8 | z,8 |\n'+
				'V:2 \n'+
				'z,8 | z,8 | z,8 | z,8 | z,8 | z,8 | z,8 | z,8 |$ z,8 | z,8 | z,8 | z,8 | z,8 | z,8 | z,8 | z,8 |\n'+
				'V:3 \n'+
				'z,8 | z,8 | z,8 | z,8 | z,8 | z,8 | z,8 | z,8 |$ z,8 | z,8 | z,8 | z,8 | z,8 | z,8 | z,8 | z,8 |\n'+
				'V:4 \n'+
				'z,8 | z,8 | z,8 | z,8 | z,8 | z,8 | z,8 | z,8 |$ z,8 | z,8 | z,8 | z,8 | z,8 | z,8 | z,8 | z,8 |\n'+
				'V:5 \n'+
				'z,8 | z,8 | z,8 | z,8 | z,8 | z,8 | z,8 | z,8 |$ z,8 | z,8 | z,8 | z,8 | z,8 | z,8 | z,8 | z,8 |\n'+
				'V:6 \n'+
				'z,8 | z,8 | z,8 | z,8 | z,8 | z,8 | z,8 | z,8 |$ z,8 | z,8 | z,8 | z,8 | z,8 | z,8 | z,8 | z,8 |\n',
		"fourstaff":headStr +
				'%%vsetting_start\n'+
				'%%score {(1 | 2) (3 | 4)} \n'+
				'V:1 treble\n'+
				'%%MIDI program 0\n'+
				'V:2 treble\n'+
				'%%MIDI program 0\n'+
				'V:3 bass\n'+
				'%%MIDI program 0\n'+
				'V:4 bass\n'+
				'%%MIDI program 0\n'+
				'%%vsetting_end\n'+
				'%%voicecombine -1\n'+
				'V:1\n'+
				'%%pos stem up\n'+
				'z,8 | z,8 | z,8 | z,8 | z,8 | z,8 | z,8 | z,8 |$z,8 | z,8 | z,8 | z,8 | z,8 | z,8 | z,8 | z,8 |$\n'+
				'V:2\n'+
				'%%pos stem down\n'+
				'z,8 | z,8 | z,8 | z,8 | z,8 | z,8 | z,8 | z,8 |$z,8 | z,8 | z,8 | z,8 | z,8 | z,8 | z,8 | z,8 |$\n'+
				'V:3\n'+
				'%%pos stem up\n'+
				'z,8 | z,8 | z,8 | z,8 | z,8 | z,8 | z,8 | z,8 |$z,8 | z,8 | z,8 | z,8 | z,8 | z,8 | z,8 | z,8 |$\n'+
				'V:4\n'+
				'%%pos stem down\n'+
				'z,8 | z,8 | z,8 | z,8 | z,8 | z,8 | z,8 | z,8 |$z,8 | z,8 | z,8 | z,8 | z,8 | z,8 | z,8 | z,8 |$'
}
// 当前组默认为C4
var current_group = "C4";
var insert = true;
var paper_abc;
// 是否增加生成音频的预备拍
var addMobilPreNode = 1;

// 曲式分析数组
var mfSetting = new Array();

var changeNodeKSelectedSeq = -1;
var behindStr = "";
// 当前点中的简谱
var currJpVal= "";
// 钢琴键盘输入时，当前输入的声部
var currInputVoice = 1;

// 选中的菜单项（用于添加到常用工具栏）
var selectedMenu = null;
var commCtx;
$(document).ready(function(){
	abc2svg.modules.pageheight.fn = "page-pdf.js";//导出pdf时分页的js用这个
	switchJiTaChord("C");
	user.editorPage = true;
	user.editorAnnot = true;
	user.moveText = true;
	user.hidescore = true;
	durSetting = $(".operator_sc.selected").attr("dur");
	durSettingNotDot = $(".operator_sc.selected").attr("dur");
	commCtx = document.getElementById("commonCtxMenu");
	//加载常用菜单
    loadCommonMenu();
	// 连接midi设备
	if (navigator.requestMIDIAccess){
	    navigator.requestMIDIAccess().then( onMIDIInit, onMIDIReject );
	} else{
	    // window.top.alert("您的浏览器不支持midi设备。");
	    console.log("您的浏览器不支持midi设备。");
	}
	// 导入xml相关***********start
	if (typeof FileReader !== 'undefined') {
      $('#xmlfile').change (function () {
          drop_files = null;
          leesFile();
      });
	}
	// 导入xml相关***********end

	$('.tone-ruler').width($('.pianoKeyboard .keyRow.white .key').outerWidth() * 7);
	//谱例类型
	$("#staffType").change(function(){
		var val = $(this).val();
		var title = getUrlParameter("TITLE");
		if(title){
			$("#source").val(staffTypes[val].replace("标题",title));
		}else{
			$("#source").val(staffTypes[val]);
		}
		if(val=="treble" || val=="bass"){
			$("#STAFFNUM").val(1);
			$("#STAFFNUM").removeAttr("readonly");
			$("#staffPropBtn").removeAttr("disabled");
		}else{
			if(val=="piano"){
				$("#STAFFNUM").val(2);
			}else if(val=="satb"){
				$("#STAFFNUM").val(4);
			}else if(val=="satb_piano"){
				$("#STAFFNUM").val(6);
			}else if(val=="fourstaff"){
				$("#STAFFNUM").val(2);
			}
			$("#staffPropBtn").attr("disabled","disabled");
			$("#STAFFNUM").attr("readonly","readonly");
			
		}
		src_change();
		doLog();
		
	});
	// 显示小节线序号
	$(".shownodeseq").click(function(){
		showNodeSeq("source");
	});
	$(".shownodeseq5").click(function(){
		showNodeSeq5("source");
	});
	//是否有弱起小节
	$("#isR").click(function(){
		if($(this).is(":checked")){
			$("#weakBarTop").removeAttr("disabled");
			$("#weakBarBot").removeAttr("disabled");
			handleWeakBar();
		}else{
			$("#weakBarTop").attr("disabled","disabled");
			$("#weakBarBot").attr("disabled","disabled");
			genInitStaff();
		}
	});
	//节奏谱
	$(".isRhythm").click(function(){
		switchRhythm();
	});
	// 显示每行首个小节线序号
	$(".showfirstnodeseq").click(function(){
		showLineFirstNodeSeq("source");
	});
	// 音程尺拖动事件
	$('.tone-ruler, .dshx-ruler, .xshx-ruler').mousedown(function (e) {
		var that = $(this);
      var isMove = true;
      var div_x = e.pageX - that.offset().left;
      var left;
      $(document).mousemove(function (e) {
          if (isMove) {
              var obj = that;
              var indexOf = $('.left-show-img').attr('src').indexOf('left'); 
              left = e.pageX - div_x;
              if(indexOf > -1){
            	  left = left - 330;
              }
              obj.css({"left": left});
          }
      }).mouseup(function () {
      	isMove = false;
      });
	}).on('touchstart', function(e){
		var that = $(this);
	      var isMove = true;
	      var div_x = e.touches[0].pageX - that.offset().left;
	      var left;
	      $(document).on('touchmove', function (e) {
	          if (isMove) {
	              var obj = that;
	              var indexOf = $('.left-show-img').attr('src').indexOf('left'); 
	              left = e.touches[0].pageX - div_x;
	              if(indexOf > -1){
	            	  left = left - 330;
	              }
	              obj.css({"left": left});
	          }
	      }).mouseup(function () {
	      	isMove = false;
	      });
	}).on('touchend', function(e){
		isMove = false;
	})
	
	var keydownCount = 0;  // 当前按下键盘的次数
	var activeRuler; // 当前选中的尺子样式
	// 监听键盘按下事件
	$(document).keydown(function(event){
		if(!activeRuler){
			return;
		}
		var _this = $('.' + activeRuler);
		var left = parseInt(_this.css('left').split('px')[0]); // 当前需要移动元素的left属性值
		var addNum = 1; // 每次按键移动多少距离
		if(keydownCount > 10){
			addNum = 20;
		}
		if(event.keyCode == 37){ // 按下键盘的左方向键
			_this.css({ "left": left - addNum  + 'px'});
			keydownCount++;
		}else if(event.keyCode == 39){ // 按下键盘的右方向键
			_this.css({ "left": left + addNum + 'px'});
			keydownCount++;
		}
	}).keyup(function(event){
		keydownCount = 0;
	});
	
	$(".modal-content").each(function(){
		$(this).myDrag({
			parent : 'body', // 定义拖动不能超出的外框,拖动范围
			randomPosition : false, // 初始化随机位置
			handler : ".modal-header"
		});
	})
	    
	getFileServer();//xdr1

	// 新建乐谱操作类型：create(新建乐谱：重置groupid的值)、reset（重置乐谱：不重置groupid的值）
	$("#createbuttontype").val(getUrlParameter("cbtype"));
	if($("#createbuttontype").val()==""){
		$("#createbuttontype").val("reset");
		$(".newstaff span").text("重置乐谱");
	}else{
		if($("#createbuttontype").val()=="reset"){
			$(".newstaff span").text("重置乐谱");
		}else if($("#createbuttontype").val()=="create"){
			$(".newstaff span").text("新建乐谱");
		}
	}
	$("#groupid").val(getUrlParameter("groupid"));
	$("#personid").val(getUrlParameter("personid"));
	$("#personname").val(getUrlParameter("person_name"));
	var is_music_library = getUrlParameter("is_music_library");//是保存到谱例库还是保存到我的谱例的标记
	if(is_music_library=="1"){
		$("#save_to_server_span").text("存到谱例库");
	}else{
		$("#save_to_server_span").text("存到我的谱例");
	}
	
	if($("#groupid").val()==""){
		$(".save_to_server").css("display","none");
		$(".save_to_history").css("display","none");
		$(".gen_image").css("display","none");
		//$("#editnodelinediv").css("display","none");
		$("#editIECdiv").css("display","none");
	}
	if($("#personid").val()==""){
		$("#my_staff").css("display","none");
	}else{
		$("#saveSpan9").text("存到暂存库");
	}
	$("#appid").val(getUrlParameter("appid"));
	$("#dir_str").val(getUrlParameter("dir_str"));
	$("#mustype").val(musicType);
	if($("#groupid").val()==""){
		// 如果没有传入groupid，则直接弹出谱例属性框
		//showPlsx()
	}
	loadFileByGroupid();
	if(!broserOk){
		// window.top.alert("您的浏览器不支持本网站,请使用Chrome或Firefox浏览器");
		document.write("您的浏览器不支持本网站,请下载<a href='https://www.google.cn/chrome/'>谷歌（Chrome）浏览器</a>或<a href='http://www.firefox.com.cn/download/'>火狐（Firefox）浏览器</a>")
		return;
	}
	pagewidth = ($(window).width()-$(".left-box").width()-50)/37.8;
	$(window).resize();
	var level = 0;
	$("#pianoKeysWhite .key").each(function(idx,val){
		// console.log("level:"+parseInt(level++/7));
		var group = $(this).parent().attr("group");
		var index = $(this).index();
		var note = getNoteByKey(group,index);
		var name = getNoteNameByKey(group,index);
		var content = $(this).html();
		var nameArr = name.split("");
		name = "<span>"+nameArr[0] +"</span>" + (nameArr.length > 1 ? "<i class='" + ("ABCDEFG".indexOf(nameArr[0]) != -1 ? "down": "") + "'>" + nameArr[1] + "</i>" : "");
		if(content==""){
			$(this).append("<div class='keyIcon'>"+name+"</div>");
		} else if(content.indexOf("div")<0){
			$(this).append("<div class='keyIcon3'>"+name+"</div>");
		} else if(content.indexOf("div")>0){
			$(this).append("<div class='keyIcon4'>"+name+"</div>");
		}
	});
	
	/**
	 * 黑键、白键默认在中间 白键偏上：white-top 白键偏下： white-bottom (白键在<div
	 * class='key-note-white'> 这里加) 黑键偏上： black-top 黑键偏下： black-bottom (黑键在<div
	 * class='key-note-black-top'>和<div class='key-note-black-bottom'>都要加)
	 */
	level = 0;
	$("#pianoKeysBlack .key").each(function(idx, val){
		var index = $(this).index();
		var group = $(this).parent().attr("group");
		var v = index % 7;
		if((v+1)>2){
			v = v+1;
		}
		
	}); 
	// 在键盘上写简谱
	writeNumStaff(0);
	// 编号
	$("#X").on('input',function(){
		var val = $(this).val();
		set("X:",val);
	});
	// 标题
	$("#T").on('input',function(){
		var val = $(this).val();
		set("T:",val);
		src_change()
	});
	//副标题
	$("#T_S").on('input',function(){
		var t_pattern = /T:.*\n/;
		var t_matchs = $("#source").val().match(t_pattern);
		if(t_matchs==null){
			window.top.alert("请先设置主标题");
			return false;
		}
		var val = $(this).val();
		setSecTitle(val);
	});
	// 作者
	$("#C").on('input',function(){
		var val = $(this).val();
		set("C:",val);
		src_change()
	});
	// 节拍
	$("#M").on('change',function(){
		var val = $(this).val();
		set("M:",val);
		src_change()
	});
	// 单位
	$("#L").on('change',function(){
		var val = $(this).val();
		set("L:",val);
		src_change()
	});
	// 速度***************
	$("#Q").on('change',function(){
		var qdesc = $("#Q_DESC").val();
		if(qdesc!=""){
			qdesc = '"'+qdesc+'"';
		}
		var q = $(this).val();
		var qv = $("#Q_V").val();
		set("Q:",qdesc+q + "=" + qv);
		src_change()
	});
	$("#Q_V").on('input',function(){
		var qdesc = $("#Q_DESC").val();
		if(qdesc!=""){
			qdesc = '"'+qdesc+'"';
		}
		var qv = $(this).val();
		$("#Q").change();
		var q = $("#Q").val();
		if(q==""){
			q = $("#selectSpeedImg").attr("speed");
		}
		//修改速度下拉框
//		<option value="40">庄板(极慢板)</option>
//		<option value="46">广板</option>
//		<option value="52">慢板</option>
//		<option value="56">柔板</option>
//		<option value="66">行板</option>
//		<option value="69">小行板</option>
//		<option value="88" selected="selected">中板</option>
//		<option value="108">小快板</option>
//		<option value="132">快板</option>
//		<option value="158">活板</option>
//		<option value="184">急板</option>
//		<option value="208">最急板</option>
		if(qv<46){
			$("#plsxspeedtype").val("40")
		}else if(qv<52){
			$("#plsxspeedtype").val("46")
		}else if(qv<56){
			$("#plsxspeedtype").val("52")
		}else if(qv<66){
			$("#plsxspeedtype").val("56")
		}else if(qv<69){
			$("#plsxspeedtype").val("66")
		}else if(qv<88){
			$("#plsxspeedtype").val("69")
		}else if(qv<108){
			$("#plsxspeedtype").val("88")
		}else if(qv<132){
			$("#plsxspeedtype").val("108")
		}else if(qv<158){
			$("#plsxspeedtype").val("132")
		}else if(qv<184){
			$("#plsxspeedtype").val("158")
		}else if(qv<208){
			$("#plsxspeedtype").val("184")
		}else if(qv>=208){
			$("#plsxspeedtype").val("208")
		}
		set("Q:",qdesc+q + "=" + qv);
		$("#NOTE_Q_V").val(qv);
		var content = $("#source").val();
		$("#source").val(content.replace("%%hiddenspeed\n",""));
		src_change();
	});
	$("#Q_DESC").on("input",function(){
		var qdesc = $("#Q_DESC").val();
		if(qdesc!=""){
			qdesc = '"'+qdesc+'"';
		}
		var qv = $("#Q_V").val();
//		$("#Q").change();
		var q = $("#Q").val();
		if(q==""){
			q = $("#selectSpeedImg").attr("speed");
		}
		set("Q:",qdesc+q + "=" + qv);
		$("#NOTE_Q_V").val(qv);
		src_change();
	});
	// 速度***************
	// 速度单位
	$("#K").on('change',function(){
		var new_key = $(this).val();
		set("K:",new_key);
		// 
		
		src_change();
		
		var left = /[GAB]/;
		var right = /[CDEF]/;
		if(left.test(new_key.replace("b","").replace("#",""))){
			$("input[name='doPos'][value='lower']").prop("checked","checked");
		}else{
			$("input[name='doPos'][value='higher']").prop("checked","checked");
		}
		
		switchJiTaChord($("#K").val())
		swithchJianPu($("#K").val())
		changeYG($("#K").val());
		
	});
	$("#jphxButton").on("click",function(){
		if($("#jphxButton").hasClass("menu-pressed")){
			$("#jphxButton").removeClass("menu-pressed");
			chordInput = false;
		}else{
			$("#jphxButton").addClass("menu-pressed");
			chordInput = true;
		}
	})
	//升、降等音高点击事件
	$(".pitchbtn").click(function(){
		var selectedNotes = $(".selected_text[type*='hd'],.selected_text[type='note']");
		if(selectedNotes.length>0){
			var istart = $(selectedNotes).attr("istart");
			var val = $(this).attr("value");
			var s = syms[istart];
			if(s){
				var content = $("#source").val();
				var cenStr = content.substring(s.istart,s.iend);
				if(s.notes && s.notes.length>1){
					//选中的是和弦
					var chordTexts = $("text[type*='hd'][istart='"+istart+"'],text[type='note'][istart='"+istart+"']").sort(function(a,b){
						return $(b).attr("y") - $(a).attr("y");
					});
					var selIndex = -1;
					for(var i=0;i<chordTexts.length;i++){
						if($(chordTexts[i]).hasClass("selected_text")){
							selIndex = i;
							break;
						}
					}
					var noteArr = str2notes(cenStr);
					var newNoteStr = "[";
					for(var i=0;i<noteArr.length;i++){
						if(i==selIndex){
							var tmp = noteArr[i].note;
							newNoteStr += val + tmp.replace(/[\^\_\=]/g,"");
						}else{
							newNoteStr += noteArr[i].note
						}
					}
					newNoteStr += "]";
					content = content.substring(0,s.istart) + newNoteStr + content.substring(s.iend);
					
					
				}else if(s.notes && s.notes.length==1){
					//选中的是单音符
					cenStr = cenStr.replace(/[\^\_\=]/g,"");
					content = content.substring(0,s.istart) + val + cenStr + content.substring(s.iend);
				}
				
				$("#source").val(content);
				src_change();
				doLog();
			}
		}else{
			window.top.swAutoAlert('未选中音符');
		}
	});
	$("#K_div .keyChoice").click(function(){
		console.log($(this).text());
		changeYG($(this).text(),"doPos2");
	});
	// 钢琴键盘
	var downTime;
	$("#scoreEditorPianoKeyboard .key").mousedown(function(){
		var nearK = getNearK("source");
		downTime = new Date();
		$(".other-ul li").removeClass("selected")
		$(this).addClass("selected");
		var $that = $(this);
		$('.group-active').removeClass('group-active');
		$that.parent().addClass('group-active');
		/*setTimeout(function(){
			$that.removeClass("selected");
		},200);*/
		var val = "";
		var group = $(this).parent().attr("group");
		current_group = group;
		// 取得当前按下的键的索引号（相对于当前区域的索引号，如按下do，索引号为0）
		var index = $(this).index();
		// 取得当前按下的键的区域的索引号（如当前按下C3区的do，则反回C3区所有的索引号3）
		var parentIndex = $(this).parent().index();
		// 取得当前按下的是白键还是黑键
		var parentGroup = $(this).parent().attr("group");
		// 当前按下的键在所有键盘中的索引号
		var index_all = 0;
		var content = $("#source").val();
		var riseArr = ["G","D","A","E","B","F#","C#"];
		var downArr = ["F","Bb","Eb","Ab","Db","Gb","Cb"];
		var kPattern = /K:\s{0,}.[^\s]*/;
		var kResult = content.match(kPattern);
		var K = "";
		var clickNote = "";
		if(kResult!=null){
			K = kResult[0].replace("K:","");
			K = $.trim(K);
		}
		if(parentGroup.substr(0,1)=="C"){
			// 按下白键
			var e = event || window.event || arguments.callee.caller.arguments[0];
			if($(this).find(".key-note-white-bottom").length>0){
				var splitLine = $(this).find(".key-note-white-bottom").offset().top;
				if(e.clientY<splitLine){
					// 点击白键上半部分
					riseOrDown = "rise";
				} else {
					// 点击白键下半部分
					riseOrDown = "down";
				}
			}
			
			// 如果黑键只显示一个简谱音符，则根据当前谱子的调号判断取升还是降，如果升的调，则取升，如果是降的调，则取降
			if($(this).find(".key-note-white-mid").length==1){
				if(riseArr.indexOf(K)>-1){
					riseOrDown = "rise";
				}else if(downArr.indexOf(K)>-1){
					riseOrDown = "down";
				}
			}
			var c0 = sd.SoundIndex.C0;
			index_all = parentIndex * 12 + c0[index];
			$("#notegroup").val(parentGroup);
		}else if(parentGroup.substr(0,1)=="B"){
			// 按下黑键
			var e = event || window.event || arguments.callee.caller.arguments[0];
			// 黑键上下音符的分割线（点上半部分显示升的音符，点下半部分显示降的音符）
			var splitLine = $(this).offset().top+$(this).height()/2;
			if(e.clientY<splitLine){
				// 点击黑键上半部分
				riseOrDown = "rise";
			} else {
				// 点击黑键下半部分
				riseOrDown = "down";
			}
			// 如果黑键只显示一个简谱音符，则根据当前谱子的调号判断取升还是降，如果升的调，则取升，如果是降的调，则取降
			if($(this).find(".key-note-black-mid").length==1){
				if(riseArr.indexOf(K)>-1){
					riseOrDown = "rise";
				}else if(downArr.indexOf(K)>-1){
					riseOrDown = "down";
				}
			}
			var b0 = sd.SoundIndex.B0;
			index_all = parentIndex * 12 + b0[index];
			$("#notegroup").val("C"+parentGroup.substr(1,1));
			
			$("div[group='C" + parentGroup.substr(1,1) + "']").addClass('group-active');
		}
		// 播放
		play_one_note(index_all,$("#L").val(),$("#Q").val(),$("#Q_V").val(),10);
		
		// 取键盘对应的音符
		var lowerOrHigher = getLowerOrHigher();
		var selectText = getSelectText("source");
		var currK = "";
		if(selectText!=""){
			var selectedIndex = getStartPos(document.getElementById("source"));
		} else {
			
		}
		var currKey = getKByPos("source");
		val = getNoteByKey2(group,index,riseOrDown,"source",lowerOrHigher,currKey);
		val = getNoteByKeySign(currKey,val);
		currJpVal = "";
		var suffix = getSuffix();
		if(insert){
			
//			if(selectText!=""){
//				if(selectText.indexOf(":")>-1){
//					if(selectText.indexOf("V:")>-1){
//						insertWithVoice(val+suffix)
//						// 自动增加小节线
//						//autoNodeLine();
//						abc_change();
//					}
//					return;
//				}
//				replaceSelected(selectText,val+suffix)
//			}else{
//				if($("#editor").hasClass("menu-pressed")){
//					insertText(val+suffix);
//					// 自动增加小节线
//					autoNodeLine();
//				}else{
//					insertWithVoice(val+suffix)
//				}
//				
//			}
			updateNextNote(val,index_all)
//			abc_change();
		}
		$(".head-item[data-type='yinfu']").click();
		$("#source").blur();
	}).mouseup(function(){
		var L = $("#L").val(),Q = $("#Q").val(),Q_V = $("#Q_V").val();
		var upTime = new Date();
		var d = toFloat(L)/toFloat(Q)/toFloat(Q_V)*60;
		var inteTime = upTime.getTime()-downTime.getTime();
		if(inteTime < 300){
			var $that = $(this);
			setTimeout(function(){
				$(".key.selected").removeClass("selected");
				play.abcplay.stop();
			},300)
		}else{
			play.abcplay.stop();
			$(".key.selected").removeClass("selected");
		}
	});
	
	// 键盘左移
	$("#scrollLeft").click(function(){
		var left = $("#noteInput").css("left").replace("px","");
		var newleft = (parseInt(left)+430);
		if(newleft >0){
			newleft = 0;
		}
		$("#noteInput").css("left",newleft+"px");
	});
	// 键盘右移
	$("#scrollRight").click(function(){
		var left = $("#noteInput").css("left").replace("px","");
		var newleft = (parseInt(left)-430);
		// 判断左边列表是否收起 indexOf > -1 为展开 反之为收起
		var indexOf = $('.left-show-img').attr('src').indexOf('left'); 
		if(-newleft > 3905 - $("#noteInput").width()){
			newleft = -(3905 - $("#noteInput").width());
		}
		$("#noteInput").css("left",newleft+"px");
	});
	$(document).on("mouseup",function(){
		if(dragDecoFlag){
      		dragDecoFlag = false;
      	}
		if(dragMyText){
			dragMyText = false;
      	}
	})
	// 监听键盘点击事件
	$(document).on("keydown",function(event){
		console.log('keydown');
		var e = event || window.event || arguments.callee.caller.arguments[0];
		var obj = $(event.srcElement || e.target);
		user.isCtrl = false;
		user.isShift = false;
		// ctrl
		if (event.which === 17){
          user.isCtrl = true;
		}
		// shift
		if (event.which === 16){
			user.isCtrl = true;
			user.isShift = true;
		}
		if(event.which == 27){
			
			//按下esc键，还原编辑状态
			restoreEditor();
			$(".editor-div").remove();
			/*
			graph_update = true;
			draw_editor = false;
			$("#use_black").remove();
			if($("#graphEditorMenu")){
				$("#graphEditorMenu").removeClass("menu-pressed");
				$("#graphEditorMenu").attr("title","当前模式：修改");
			}
			$("rect").css("fill-opacity","0");
			$("#use_black").remove();
			$("use[type='demo_hl']").remove();
			$(".editor_rect").removeClass("editor_rect");
			*/
		}
		
		//歌词编辑框
		if(obj[0].tagName.toUpperCase()=="DIV" && ($(obj).hasClass("editor-div") || $(obj).hasClass("editor-repeatbar"))){
			if(event.which === 9){
				//tab键
//				createLyricEditor(true);
				console.log("按下tab")
				$(".editor-div").blur();
				user.showLyricEditor = true;
				return false;
			}
			return;
		}
		//ctrl + L输入歌词
		if(event.which === 76 && event.ctrlKey){
			createLyricEditor(false)
			return false;
		}
		// ctrl+z
      if (event.which === 90 && event.ctrlKey) {
    	  console.log("按下ctrl+z")
    	  console.log("目标元素：",event.target)
    	  if($(event.target).attr("class")=="editor-div"){
    		  return;
    	  }
      	  setTimeout(function(){
      		goback();
      		event.preventDefault();
      	},100)
      	return false;
          /*
			 * log.pop(); $("#source").val(log[log.length - 1]); src_change();
			 * return;
			 */
      }
      // ctrl+y
      if (event.which === 89 && event.ctrlKey){
        	$(".forward").click();
        	return false;
      }     
      
      //ctrl + f//blclass debug
      if (event.which === 70 && event.ctrlKey){
		oExt.blMD();					 
		return false;
	} 

      //ctrl + d//显示隐藏钢琴键盘
      if (event.which === 68 && event.ctrlKey){ 
    	  content_vue.keyboardShow = !content_vue.keyboardShow;
  		  setAttrPanelHei();
  		  return false;
      } 
	  if (event.which === 70 && event.ctrlKey){
		abc();
		alert('heljahdlkfjhalkjdhflakjdhflkajdhflkjah');
		return false;
	} 
      //ctrl + e//显示隐藏语法框
      if (event.which === 69 && event.ctrlKey){
    	  $("#editor").click();
  		  return false;
      } 
      //ctrl + q//显示隐藏语法框
      if (event.which === 81 && event.ctrlKey){
    	  $("#selectedStatus").click();
  		  return false;
      } 
      //ctrl + 左
      if(event.which === 37 && event.ctrlKey){
    	  $("img[dur].selected").removeClass("selected").prev().click();
    	  return false;
      }
      //ctrl + 右
      if(event.which == 39 && event.ctrlKey){
    	  $("img[dur].selected").removeClass("selected").next().click();
    	  return false;
      } 
      
//      如果当前焦点是文本框或文本域则正常走
      if(obj[0].tagName.toUpperCase()=="TEXTAREA" ||obj[0].tagName.toUpperCase()=="INPUT"){
			
			return;
	  }
      //ctrl+c
      if(event.ctrlKey && event.which == 67){
    	 //复制小节 
    	  var selectedBars = $("svg[type='rectbar']");
    	  if($(selectedBars).length>0){
    		  copyNodes();
    		  return false;
    	  }
    	  var selectedNodes = $("svg[type='rectnode']");
    	  if($(selectedNodes).length>0){
    		  copyNodes();
    		  return false;
    	  }
    	  //复制音符
    	  var selectNotes = $(".selected_text[type*='HD'],.selected_text[type^='r'],.selected_text[type='note']")
    		if(selectNotes.length>0){
    			copyNote();
    			return false;
    		}
    	  
    	  
      }
      if(event.ctrlKey && event.which == 86){
    	  var selectedBars = $("svg[type='rectbar']");
    	  if($(selectedBars).length>0){
    		  //粘贴小节
    		  pasteNode();
    		  return false;
    	  }
    	  var selectedNodes = $("svg[type='rectnode']");
    	  if($(selectedNodes).length>0){
    		  //粘贴小节
    		  pasteNode();
    		  return false;
    	  }
    	  var selectNotes = $(".selected_text[type*='HD'],.selected_text[type^='r'],.selected_text[type='note']")
    		if(selectNotes.length>0){
    			pasteNote();
    			return false;
    		}
      }
      //BackSpace
      if(event.which == 8){
    	  if($(".selected_text").length>0 && cen!=null){
				//在有选中音符的情况下，按下BackSpace，去掉前面一个空格
    		  	var istart = $(".selected_text").attr("istart");
    		  	var s = syms[istart];
    		  	if(s && s.prev && s.prev.type==8){
    		  		var content = $("#source").val();
    		  		var midStr = content.substring(s.prev.iend,s.istart).replace(/\s/g,"");
    		  		var newContent = content.substring(0,s.prev.iend) + midStr + content.substring(s.istart);
    		  		$("#source").val(newContent);
    		  		doLog();
					src_change();
					return false;
    		  	}
				
			}
      }
      
      
      //左箭头  选中前一个音符
      if(event.which === 37){
    	  var selectTextObj = $(".selected_text,.select_text_g");
    	  if(selectTextObj.length>0){
    		  var istart = parseInt($(".selected_text,.select_text_g").attr("istart"));
    		  var currS = syms[istart];
    		  for(var i=istart-1;i>0;i--){
    			  var s = syms[i];
    			  
    			  if(s && s.v==currS.v){
    				  if(s.type==8 || s.type==10){
    					  $(selectTextObj).removeClass("selected_text").removeClass("select_text_g").removeAttr("style");
    					  $("text[istart='" + s.istart + "']").addClass("selected_text");
    					  break;
    				  }
    			  }
    		  }
    		  return false;
    	  }
    	  
      }
      //右箭头 选中后一个音符
      if(event.which === 39){
    	  var selectTextObj = $(".selected_text,.select_text_g");
    	  if(selectTextObj.length>0){
    		  var istart = parseInt($(selectTextObj).attr("istart"));
    		  var currS = syms[istart];
    		  for(var i=istart+1;i<syms.length;i++){
    			  var s = syms[i];
    			  
    			  if(s && s.v==currS.v){
    				  if(s.type==8 || s.type==10){
    					  $(selectTextObj).removeClass("selected_text").removeClass("select_text_g").removeAttr("style");
    					  $("text[istart='" + s.istart + "']").addClass("selected_text");
    					  break;
    				  }
    			  }
    		  }
    		  return false;
    	  }
    	  
      }
      
      // 按下回车
		if(e.keyCode==13 ){
			if(obj[0].tagName.toUpperCase()=="TEXTAREA" ||obj[0].tagName.toUpperCase()=="INPUT"){
				var st = getSelectText("source");
				if(st!=""){
					replaceSelected(st,"\n"+st);
					abc_change();
					$("#source").blur();
					return false;
				}else{
					return true;
				}
			} 
		}
		// 按下空格键
		if(e.keyCode==32 ){
			
			var activeEle = document.activeElement;
			if($(activeEle).hasClass("editor-div")){
				return false;
			}
			if(activeEle.id=="source" ){
				return;
			}
			if(obj[0].tagName.toUpperCase()=="INPUT" || obj[0].tagName.toUpperCase()=="TEXTAREA"){
				return;
			} 
			if($(".selected_text").length>0 && cen!=null){
				//在有选中音符的情况下，按下空格键，增加一个空格
				var content = $("#source").val();
				var newContent = content.substring(0,cen.istart)+ " "+content.substring(cen.istart);
				$("#source").val(newContent);
				src_change();
				doLog();
				return false;
			}
			
			var st = getSelectText("source");
			if(st!=""){
				// insertText(" "+st);
				replaceSelected(st," "+st);
				abc_change();
				$("#source").blur();
				return false;
			}else{
				// 从光标位置处加一个空格
				var index = getStartPos(getById("source"));
				$("#source").val($("#source").val().substr(0,index)+" "+$("#source").val().substr(index));
				var obj = document.getElementById("source");
				obj.selectionStart = obj.selectionEnd = index+1;
				abc_change();
				return false;
			}
		}
		// ctrl + 向上箭头
		if (event.which === 38 && event.ctrlKey){
			console.log("按下ctrl+向上箭头")
			var handleGraphEditor = upDownKeyWord(12);
			if(handleGraphEditor){
				return false;
			}
			return false;
		}
		
		if(event.which === 40 && event.ctrlKey){
			console.log("按下ctrl+向下箭头")
			var handleGraphEditor = upDownKeyWord(-12);
			if(handleGraphEditor){
				return false;
			}
			return false;
		}
		// 向上箭头
		if(e.keyCode==38){
			var activeEle = document.activeElement;
			if(activeEle.id=="source"){
				return;
			}
			var handleGraphEditor = upDownKeyWord(1);
			if(handleGraphEditor){
				return false;
			}
			var st = getSelectText("source");
			if(st==""){
				return;
			}
			var interval = 1;
			if(user.isCtrl){
				interval = 12
			}
			
			var newStr = updownnote(st,interval);
			replaceSelected(st,newStr);
			src_change();
			return false;
			
		}
		// 向下箭头
		if(e.keyCode==40){
			
			var activeEle = document.activeElement;
			if(activeEle.id=="source"){
				return;
			}
			var handleGraphEditor = upDownKeyWord(-1);
			if(handleGraphEditor){
				return false;
			}
			var st = getSelectText("source");
			if(st==""){
				return;
			}
			var interval = -1;
			if(user.isCtrl){
				interval = -12
			}
			
			var newStr = updownnote(st,interval);
			replaceSelected(st,newStr);
			src_change()
			return false;
		}
		
		// del键
		if(e.keyCode==46){
			//图形化编辑的删除功能
			if(graph_update){
				delSelNote();
				return false;
			}
			
			if($(".right-bottom").css("display")=="none"){
				$("#del").click();
				return false;
			}
			
		}
		var keyValue = e.key;
		
		
		
		
		
		//cdefgab按键处理,这里不再响应字母事件
		if(e.keyCode>=65 && e.keyCode<=71){
			if(!$(".lyric").hasClass("menu-pressed")){//排除歌词处理编辑状态
				handleKeyPress(e,"editor");
				return false;
			}
		}
		//处理数字键
		if((e.keyCode>=96 && e.keyCode<=103) || (e.keyCode>=48 && e.keyCode<=55)){
			if(!$(".lyric").hasClass("menu-pressed")){//排除歌词处理编辑状态
				handleNumPress(e,"editor");
				return false;
			}
		}
		
		
		var pianoKeys = sd.KeyBoard;
		var vals;
		for(var i=0;i<pianoKeys.length;i++){
			if(pianoKeys[i].group == current_group){
				vals = pianoKeys[i].val;
				for(var j=0;j<vals.length;j++){
					if(vals[j].toUpperCase().indexOf(keyValue.toUpperCase())>-1){
						clickPianoKey(current_group,j);
					}
				}
			}
		}
		
		/*
		 * if(keyValue.toLowerCase()=="z"){ setTimeout(function(){
		 * $("#znotes").click(); $("#source").blur(); },100) return; }
		 */
		
		
	}).keyup(function (e) {
		var e = event || window.event || arguments.callee.caller.arguments[0];
		// ctrl
		if (e.which === 17){
			user.isCtrl = false;
			
		}
		// shift
		if (e.which === 16){
			user.isCtrl = false;
			user.isShift = false;
			console.log("弹起shift")
		}
		// isCtrl = false;
  });
	
	
	// 键盘组别切换
	$("#notegroup").change(function(){
		$(".group-active").removeClass("group-active");
		var group = $(this).val()
		current_group = group;
		$("div[group='"+group+"']").addClass("group-active")
	});
	
  
	// 新建谱例
	if($("#source").val()==""){
		if($("#groupid").val()==""){
			newnote();
		}else{
			setTimeout(function(){
				if($("#source").val()==""){
					newnote();
				}
			},1000)
		}
	}
	
	$('#N_div').on('hide.bs.modal', function () {
		  stopPreview()
	});
	
	$('#RHYTHM_div').on('hide.bs.modal', function () {
		$("#rhythmFrame")[0].contentWindow.mystop(); 
	})
	
	$("#changenodespeed").click(function(){
		$("#QC_div .modal-content").css("left",($(window).width()-$("#QC_div .modal-content").width())/2);
		$("#speedtype").val("node");
		$('#QC_div').modal();
	});
	
	$("#changenodekey").click(function(){
		changeNodeKSelectedSeq = getStartPos(document.getElementById("source"));
		var content = $("#source").val();
		
		behindStr = content.substring(changeNodeKSelectedSeq);
		$("#K_div .modal-content").css("left",($(window).width()-$("#K_div .modal-content").width())/2);
		$("#K_div").modal();
	})
	
	$("#changenodebeat").click(function(){
		$("#M_div .modal-content").css("left",($(window).width()-$("#M_div .modal-content").width())/2);
		$("#M_div .modal-content").css("width","350px");
		$("#M_div").modal();
	})
	// 弹出do位置设置页
	$("#do_chn").click(function(){
		$("#DO_CHN_div .modal-content").css("left",($(window).width()-$("#DO_CHN_div .modal-content").width())/2);
		initVoicePart(content_vue,$("#source").val());
		$("#DO_CHN_div .modal-content").css("width","550px");
		$("#DO_CHN_div").modal();
	})
	
	$("#xnrs").click(function(){
		var val = getLtyInfo("source");
		$("#lty_txt").val(val);
		$("#LTY_div .modal-content").css("left",($(window).width()-$("#LTY_div .modal-content").width())/2);
		$("#LTY_div").modal();
	})
	// 禁用输入设备
	$("#inputDevEnabled").click(function(){
		if($("#inputDevEnabled").prop("checked")){
			$("#inputDev").removeAttr("disabled");
		} else {
			$("#inputDev").attr("disabled","disabled");
		}
	});
	// 禁用输出设备
	$("#outputDevEnabled").click(function(){
		if($("#outputDevEnabled").prop("checked")){
			$("#outputDev").removeAttr("disabled");
			user.isBanOutput = false;
			global_volume = 3;
		} else {
			$("#outputDev").attr("disabled","disabled");
			user.isBanOutput = true;
			global_volume = 0;
		}
		set_vol(global_volume);
	});
	
	$(".reststatus").click(function(){
		//休止符状态
		if($(this).hasClass("selected")){
			$(this).removeClass("selected");
			rest_status = "";
			currShape = lastShape;
		}else{
			$(this).addClass("selected");
			var index = $(".operator_sc.selected").attr("value").split("/")[1];
			rest_status = "selected";
			lastShape = currShape + "";
			currShape = "#r" + index;
			$("#chordType").find(".chord").removeClass("selected");
			chordNote = "";//把和弦的输入清空
			chordNoteLyric = "";
		}
	});
	
	//符点选中状态
	$(".dotstatus").click(function(){
		//休止符状态
		if($(this).hasClass("selected")){
			$(".dotstatus").removeClass("selected");
			dot_selected_value = "";
			durSetting = $(".operator_sc.selected.jp_note").attr("dur");
		}else{
			$(".dotstatus").removeClass("selected");
			$(this).addClass("selected");
			dot_selected_value = $(this).attr("value");
			durSetting = $(".operator_sc.selected.jp_note").attr("dur");
			if(dot_selected_value=="3/"){
				durSetting = parseInt(durSetting) * 1.5;
			}else if(dot_selected_value=="7//"){
				durSetting = parseInt(durSetting) * 1.75;
			}
		}
	});
	
	$("#pressVoice").click(function(){
		if($(this).prop("checked")){
			noteOnVol = true;
		} else {
			noteOnVol = false;	
		}
	});
	
	
	
	// 同步默认时长单位
	selectShiChang($("#L").val());
	
	$("#source").focus();
	$("#source").blur();
	
	if(location.href.indexOf("ixzds.com")>-1){
// changeMode('mobile',false);
		//changeMode('compute',false);
	}else if(location.href.indexOf("xmajd.cn")>-1){
		changeMode('compute',false);
	}
	user.findPosition = findPosition;
	user.lightoperator = lightoperator;
	user.changePianoBoard = changePianoBoard;
	
	user.abcLoadCball = abcLoadCball;
	
	$("#length_swtich,#rest_swtich").click(function(){
		changeRestType();
	});
	
	$("#nometer").click(function(){
		var content = $("#source").val();
		if($("#nometer")[0].checked){
			if(content.indexOf("!invisible!M:")<0){
				
				//在第一个音符前加一个散拍的标记
				for(var i=0;i<syms.length;i++){
					if(syms[i] && syms[i]!=null){
						if(syms[i].type==8 || syms[i].type==10){
							content = content.substring(0,syms[i].istart) + '"サ"' + content.substr(syms[i].istart);
							break;
						}
					}
				}
				content = content.replace("M:","!invisible!M:");
				$("#source").val(content);
			}
		}else{
			if(content.indexOf("!invisible!M:")>-1){
				$("#source").val(content.replace("!invisible!M:","M:").replace('"サ"',''));
			}
		}
		abc_change();
	});
	//四部和声
	$("#fourstaff").click(function(){
		if($("#fourstaff")[0].checked){
			var fourSource = "%%linebreak $\n"+
							"%%staffsep 60\n"+
							"%%sysstaffsep 60\n"+
							"%%keydefined C=higher\n"+
							"%%leftmargin 20\n"+
							"%%rightmargin 10\n"+
							"%%titlefont Microsoft-YaHei 28\n"+
							"%%stretchlast 0.9\n"+
							"%%linebreak $\n"+
							"I:abc-charset utf-8\n"+
							"X: 1\n"+
							"T: \n"+
							"C: \n"+
							"Q: 1/4=88\n"+
							"M: 4/4\n"+
							"L: 1/8\n"+
							"K: C\n"+
							"%%vsetting_start\n"+
							"%%score {(1 | 2) (3 | 4)} \n"+
							"V:1 treble\n"+
							"%%MIDI program 0\n"+
							"V:2 treble\n"+
							"%%MIDI program 0\n"+
							"V:3 bass\n"+
							"%%MIDI program 0\n"+
							"V:4 bass\n"+
							"%%MIDI program 0\n"+
							"%%vsetting_end\n"+
							"%%voicecombine -1\n"+
							"V:1\n"+
							"%%pos stem up\n"+
							"z,8 | z,8 | z,8 | z,8 |$ z,8 | z,8 | z,8 | z,8 |$%V1line0end\n"+
							"V:2\n"+
							"%%pos stem down\n"+
							" z,8 | z,8 | z,8 | z,8 | z,8 | z,8 | z,8 | z,8 |%V2line0end\n"+
							"V:3\n"+
							"%%pos stem up\n"+
							" z,8 | z,8 | z,8 | z,8 | z,8 | z,8 | z,8 | z,8 |%V3line0end\n"+
							"V:4\n"+
							"%%pos stem down\n"+
							" z,8 | z,8 | z,8 | z,8 | z,8 | z,8 | z,8 | z,8 |%V4line0end\n";
			$("#source").val(fourSource);
			src_change(handleBarNum);
			doLog();
		}else{
			genInitStaff();
		}
	})
//	setTimeout(changeRestType,1000);
	
	autoSaveAlert();
	dragFunc("plsx-box");
	
	
	//禁用系统右键菜单
    document.oncontextmenu = function (eve) {
        return false;
    };
    document.onclick = function(){
    	return
    	commCtx.style.display = "none";
    	selectedMenu = null;
    }
    $(".right-top").mousedown(function(evt){
    	if(evt.button!=2){
    		showProperties("staff")
    	}
    });
	// 绑定所有菜单项的功能事件
	bindAllEvent();
	//初始化装饰音拖动事件
	initDecoDrag();
	//初始化和弦输入
//	graphEditor.pianoImpro = new PianoImprovisation({},{},{isPlayNote: true, isInitKeydown: false});
	user.editorStaff=true;
	
	$("#target").on("mouseleave",mouseouthandler);
	if($("#svg_pic").length>0){//这里处理有时候进入页面没有调用resize事件，导致没有渲染，重新渲染一次
		
	}
	
	$(".showcm").click(function(){
		var content = $("#source").val();
		if($(this).hasClass("menu-pressed")){
			$(this).removeClass("menu-pressed");
			if(content.indexOf("%%showcm")>-1){
				content = content.replace(/%%showcm.*\n/g,"")
			}
		}else{
			$(this).addClass("menu-pressed");
			content = "%%showcm\n" + content;
		}
		$("#source").val(content);
		src_change();
	});
	$(".showsd").click(function(){
		var content = $("#source").val();
		if($(this).hasClass("menu-pressed")){
			$(this).removeClass("menu-pressed");
			if(content.indexOf("%%showsd")>-1){
				content = content.replace(/%%showsd.*\n/g,"")
			}
		}else{
			$(this).addClass("menu-pressed");
			content = "%%showsd\n" + content;
		}
		$("#source").val(content);
		src_change();
	});
	$(".equalbars").click(function(){
		var content = $("#source").val();
		if($(this).hasClass("menu-pressed")){
			$(this).removeClass("menu-pressed");
			if(content.indexOf("%%equalbars")>-1){
				content = content.replace(/%%equalbars.*/g,"%%equalbars 0")
			}
		}else{
			$(this).addClass("menu-pressed");
			if(content.indexOf("%%equalbars")>-1){
				content = content.replace(/%%equalbars.*/g,"%%equalbars 1")
			}else{
				content = "%%equalbars 1\n" + content;
			}
		}
		$("#source").val(content);
		src_change();
	})
	//复制歌词
	$(".cplyric").click(function(){
//		%%lyricstandv 1
		var content = $("#source").val();
		if($(this).hasClass("menu-pressed")){
			$(this).removeClass("menu-pressed");
			if(content.indexOf("%%lyricstandv")>-1){
				content = content.replace(/%%lyricstandv.*/g,"%%lyricstandv 0")
			}
		}else{
			$(this).addClass("menu-pressed");
			if(content.indexOf("%%lyricstandv")>-1){
				content = content.replace(/%%lyricstandv.*/g,"%%lyricstandv 1")
			}else{
				content = "%%lyricstandv 1\n" + content;
			}
		}
		$("#source").val(content);
		src_change();
	})
	//src_change();
	
	var isAndroid = getUrlParameter("IS_ANDROID");
	if($("#svg_pic").length>0 && isAndroid=="1"){
		setTimeout(src_change,800)
	}
	if(isAndroid=="1"){
		$(".open-file").hide();
		$("#saveas").hide();
		$("#cmsaveas").hide();
		$("#exportpic").hide();
		$("#exportpdf").hide();
		$("#exportmid").hide();
		$(".exportmid").hide();
		$("#exportmp3").hide();
		$(".exportmp3").hide();
		$("#importxml").hide();
		$("#exportxml").hide();
		$("#exportvoicepart").hide();
	}
	
	
	$("li[data-code='help']").click(function(){
		
		if(content_vue.isExe || isAndroid=="1"){
			//console.log(top.host+"imusic/imusic/pages/course/know_teac_preview.html?IS_KNOW_PREVIEW=1&QUERY_BY_COURSE=1&USER_TYPE=teac&COURSE_ID=CO391c1eab9f0f4c209700f74f9163bf&KNOWLEDGE_ID=COd96dd3217acb4f41a9cbf31940a458&TITLE=创编制谱系统操作手册")
			var helpUrl = top.host+"imusic/pages/course/know_teac_preview.html?IS_KNOW_PREVIEW=1&QUERY_BY_COURSE=1&USER_TYPE=teac&COURSE_ID=CO391c1eab9f0f4c209700f74f9163bf&KNOWLEDGE_ID=COd96dd3217acb4f41a9cbf31940a458&TITLE=创编制谱系统操作手册";
			$("#helpframe").attr("src",helpUrl);
			
			$("#Help_div .modal-content").width($(window).width()-200).height($(window).height()-100);
			$("#Help_div .modal-content").css("left",($(window).width()-$("#Help_div .modal-content").width())/2);
			$("#helpframe").css("width",$("#Help_div .modal-content").width()-20).css("height",$("#Help_div .modal-content").height()-50);
			$("#Help_div").modal();
		}else{
			window.open("https://imusic.ixzds.com/imusic/imusic/pages/course/know_teac_preview.html?IS_KNOW_PREVIEW=1&QUERY_BY_COURSE=1&USER_TYPE=teac&COURSE_ID=CO391c1eab9f0f4c209700f74f9163bf&KNOWLEDGE_ID=COd96dd3217acb4f41a9cbf31940a458&TITLE=创编制谱系统操作手册")
//			$("#helpframe").attr("src","https://yysykt.ixzds.com/imusic/imusic/pages/course/know_teac_preview.html?IS_KNOW_PREVIEW=1&QUERY_BY_COURSE=1&USER_TYPE=teac&COURSE_ID=CO391c1eab9f0f4c209700f74f9163bf&KNOWLEDGE_ID=COd96dd3217acb4f41a9cbf31940a458&TITLE=创编制谱系统操作手册");
//			$("#Help_div").modal();
		}
	});
	//快捷键
	$("li[data-code='shortcutKey']").click(function(){
		console.log("快捷键说明")
		$("#SHORTCUT_div .modal-content").css("left",($(window).width()-$("#SHORTCUT_div .modal-content").width())/2);
		$('#SHORTCUT_div').modal();
	});
	//论坛
	$("li[data-code='bbs']").click(function(){
		console.log("快捷键说明")
		window.open("http://bbs.ixzds.com")
	});
	
	$("#arp_link").click(function(){
		setArpLink('source');
	});
	$("#aboveVoiceSlur").click(function(){
		setVoiceSlur('source','\'')
	});
	$("#belowVoiceSlur").click(function(){
		setVoiceSlur('source',',')
	});
	
	
	initDrag(true);
	initDrag(false);
	
	$("#target").mousedown(function(e){
		console.log("mousedown")
		contentMouseDown( e);
	})
	//switchPrachEditor();
	resizeStaff();
	//变化太小，就不需要resize了
	initWinResize(function(xMove, yMove) {
		if ((xMove > 15 || yMove > 120)) {
			resizeStaff();
		}
	});
	initOssUploadSuccessCallback();
});
var ossUploadType = "";//当前文件上传类型
function initOssUploadSuccessCallback(){
	//oss文件上传回调
	uploader.options = {
		sucessCb: function(up, file, info){
			//console.log(up, file, info)
			if(ossUploadType=="noteImg"){
				//上传音符图片成功后，需要把地址加到音符里，并重新渲染
				console.log(file.path);
				var path = "!img_"+file.path+"!"
				console.log(path)
				uploadNotePicCallback(path);
			}
		},
		failCb: function(up, err){
			console.log(up, err)
		}
	}
}
function resizeStaff(){
	if($(".lyric").length > 0 && $(".lyric").hasClass("menu-pressed")){
		$('.lyric').removeClass("menu-pressed");
		genLyric();
	}
	
	console.log("window-resize")
	musicAreaSize();
	setAttrPanelHei();
	$(".loading,.loading-box").remove();
	
	setEditorHeight();
}
function saveHandle(){
	// 取小节线数据
	getNoteData();
	if(bar_seq!=null && bar_seq.length>0){
		var first_bar_beat_val = bar_seq[0].beat;
		// 判断是否是弱起小节
		if((Math.round(first_bar_beat_val*10000)/10000)==first_bar_beat){
			$("#weakbar").val(0);
		}else{
			$("#weakbar").val(1);
		}
	}
	// 通用的小节数据
	if(bar_seq.length>0){
		$("#nodelinedata").val(formatJson(JSON.stringify(bar_seq)));
	}else{
		//散拍子的时候，没有bar_seq数据
		$("#nodelinedata").val(formatJson(JSON.stringify(bar_seq_nometer)));
	}
	
	
	// 具体的小节线数据
	src_change();
	var content = $("#source").val();
	// 检查有没有I:abc-charset utf-8
	var i_str = get("I:");
	if(content.indexOf("abc-charset")<0){
		$("#source").val("I:abc-charset utf-8\n"+$("#source").val());
	}
	if(content.indexOf("%%leftmargin")<0){
		$("#source").val("%%leftmargin 2\n"+$("#source").val());
	}
	if(content.indexOf("%%rightmargin")<0){
		$("#source").val("%%rightmargin 10\n"+$("#source").val());
	}
	$("#paper").css("display","");
	var err = $("#er").css("display");
	if(err!="none"){
		window.top.alert("语法有错，不能保存");
		if(!$("#editor").hasClass("menu-pressed")){
			content_vue.editorClick();
		}
		return;
	}
	if(!/M:.*/.exec(content)){
		window.top.alert("未设置拍号，不能保存")			
		return;
	}
	if(content.indexOf("%%updateby")<0){
		//如果没有更新者信息，则添加更新者信息
		content = "%%updateby " + window.location.host + " " + $("#personname").val() + " " + new Date().Format('yyyy-MM-dd') + "\n" + content;
	}else{
		content = content.replace(/%%updateby.*/,"%%updateby " + window.location.host + " " + $("#personname").val() + " " + new Date().Format('yyyy-MM-dd'));
	}
	$("#source").val(content);
	$("#exporttype").val("all");
	$("#title").val($("#T").val());
	// 生成midi的abc
	// var preNodeAndRhythm = addPreNodeAndRhythm("source",1,"pre");
	if(addMobilPreNode==1){
		var preNodeAndRhythm = genMetroStaff("source");
		// 生成midi的abc内容
		$("#source-gen-midi").val(preNodeAndRhythm);
	} else {
		$("#source-gen-midi").val($("#source").val());
	}
	  if($("#pictype").val()=="mobile") {
		// 手机端，需要生成五线谱、简谱、简线混排3种图片
		var musicTypeOrgi = musicType + 0;
		
		// 选生成五线谱的谱子数据
		if(musicType!=0){
			musicType = 0;
			src_change();
		}
		var options = new Object();
		// options.watermark = "images/1111.png";
		setTimeout(function(){
			var canvas = mergeSvg2Png();
			setTimeout(function(){
				// 获取小节线数据
				var barLineCoor = getBarLineCoor(scale,true);
				barLineCoorData(barLineCoor,musicType);
				$("#wxp_barlinecoor").val(formatJson(JSON.stringify(barLineCoor)));
				
				svgAsPngUri(canvas, options, function(uri){
					$("#picdata").val(uri);// 五线谱base64数据
					// 生成简线混排
					musicType = 1;
					// 重新宣染
					src_change();
					setTimeout(function(){
						var barLineCoor = getBarLineCoor(scale,true);
						barLineCoorData(barLineCoor,musicType);
						$("#jxhp_barlinecoor").val(formatJson(JSON.stringify(barLineCoor)));
						var mixstaffcanvas = mergeSvg2Png();
						setTimeout(function(){
							// 获取小节线数据
							svgAsPngUri(mixstaffcanvas, options, function(uri2){
								$("#jxhp_picdata").val(uri2);// 简线混排base64数据
								// 生成简谱数据
								musicType = 2;
								src_change();
								setTimeout(function(){
									// 获取小节线数据
									var barLineCoor = getBarLineCoor(scale,true);
									barLineCoorData(barLineCoor,musicType);
									$("#jp_barlinecoor").val(formatJson(JSON.stringify(barLineCoor)));
									var numstaffcanvas = mergeSvg2Png();
									setTimeout(function(){
										svgAsPngUri(numstaffcanvas, options, function(uri3){
											$("#jp_picdata").val(uri3);// 简线混排base64数据
											
											// 提交数据
											checkOverwrite();
											musicType = musicTypeOrgi;
											// 重新宣染
											src_change();
										});
									},500);
								},500);
							});
						},500);
					},500)
				});
			},500);
		},500);
		
	}else {
			// 电脑端，不需要生成谱子图片
			// 判断是否要覆盖原来的mp3文件
			checkOverwrite();
	}
	
	
	
		
	/*
	 * setTimeout(function(){ var canvas =
	 * $($("#paper").html().replace('#ff0000','#000000'))[0];
	 * //saveSvgAsPng(canvas, 'test.png'); svgAsPngUri(canvas, null,
	 * function(uri){ $("#imgpreview").attr("src",uri); //图片base64数据
	 * $("#picdata").val(uri);
	 * 
	 * //判断是否要覆盖原来的mp3文件 checkOverwrite();
	 * 
	 * }); },1);
	 */
	
	
	$("#paper").css("display","none");
}

function showEditor(){
	var text = $("#showEditBtn").val();
	if(text=="显示编辑器"){
		$(".right-top").css("height","50%")
		$(".right-bottom").css("height","50%")
		$("#showEditBtn").val("隐藏编辑器")
	}else{
		$(".right-top").css("height","100%")
		$(".right-bottom").css("height","0")
		$("#showEditBtn").val("显示编辑器")
	}
}
function myplay(){
	/*if(getNoteData().length==0){
		window.top.alert("没有播放内容");
		return;
	}*/
	if($("#source").val()==""){
		window.top.alert("没有播放内容");
		return;
	}
	if($("#playspan").attr("enabled")=="false"){
		return;
	}
	var str = $("#playspan").text();
	if(str=="播放"){
		$("#playspan").text("暂停");
//		var selectNote = $("rect[type='note'][style='fill-opacity: 0.4;']");
		var selectNote = $("text[type='hd'].selected_text,text[type='Hd'].selected_text,text[type='HD'].selected_text,text[type='note'].selected_text")
		if(selectNote.length>0){
			// 从选中的开始播放
			laststop = $(selectNote).attr("istart");
			play_tune(3);
		}else{
			// 从头开始播放
			play_tune(-1);
		}
		$("#playimg").attr("src","images/preview_pause.png");
		changeChoice()
		// 这里做延迟主要是因为播放节奏加载延迟
		// 节拍器不用这种播放方式了
// setTimeout(function(){
// playMeter();
// },300)
	}else if(str=="暂停"){
		if(!play.playing){
			return;
		}
		// 这里让按钮不能再次点击，等调完enabledPlayButton回调函数才可以再次点击
		$("#playspan").attr("enabled",false);
		$("#playspan").text("正在暂停");
		$("#playimg").attr("src","images/preview_play.png");
		play_tune(0);
		changeChoice()
	}else if(str=="继续"){
		$("#playspan").text("暂停");
		$("#playimg").attr("src","images/preview_pause.png");
		play_tune(3);
		changeChoice();
		var speed = getSpeed();
		// 节拍器不用这种播放方式了
// setTimeout(function(){
// playMeter();
// },300)
	}
	
}
// 停止播放
function mystop(){
	$(".abcr").css("fill-opacity", "0");
	if(!play.playing){
		if($("#playspan").text()=="继续"){
			$("#playspan").text("播放");
		}
		return;
	}
	try{
		play_tune(0);
	}catch(e){
		return;
	}
	// 这里让按钮不能再次点击，等调完enabledPlayButton回调函数才可以再次点击
	$("#playspan").attr("enabled",false);
	if($("#playspan").text()=="暂停"){
		$("#playspan").text("正在停止");
	}
	
	$("#playimg").attr("src","images/preview_play.png");
	
}
function playcallback(){
	if(typeof(s)=="undefined"){
		return;
	}
	s.start();
}
// 恢复按钮点击
function endplaycallbck(){
	stopMeterInterval()
	if($("#playspan").text()=="暂停"){
		// 如果播放结束，则恢复为播放按钮
		$("#playspan").text("播放");
		$("#playimg").attr("src","images/preview_play.png");
	}
	setTimeout(function(){
		if($("#playspan").text()=="正在暂停"){
			$("#playspan").text("继续");
		}
		if($("#playspan").text()=="正在停止"){
			$("#playspan").text("播放");
		}
		$("#playspan").attr("enabled",true);
	},1);
}
function changeChoice(){
	var choice = content_vue.pytbOption; 
	if(choice=="0"){
		// 谱音同步
		set_vol(global_volume);
		animation = true;
	}else if(choice=="1"){
		// 只播图像
		set_vol(0);
		animation = true;
	}else if(choice=="2"){
		// 只播声音
		set_vol(global_volume);
		animation = false;
		$("rect").attr("style","fill-opacity: 0.0;")
	}
	setTimeout(function(){
		$("#pytb_text").html($(".pytb .menu-choose span").html());
	},100);
}

function source_click(){
	$(".other-ul li").removeClass("selected")
	$(".shengjiang-ul li").removeClass("selected")
	
}

$(window).resize(function() {
	// initBodyHeight();
	// $("#er")
/*	$("#source").css("width",($(window).width()-$(".body-left").width()-5));
	
	pagewidth = ($(window).width()-$(".body-left").width()-50)/37.8;
	abc_change();*/
	

	
});

/**
 * 初始化 window 的 resize 事件
 * 
 * 没有一触发resize就调用相关的回调函数，性能不好
 * 
 * @param cball
 * @returns
 */
function initWinResize(cball) {
	var lastWidth = $(window).width();
	var lastHeight = $(window).height();
	var count = 3;
	var intervalId = 0;
	$(window).resize(function() {
		count = 3;
		if (intervalId) {
			return;
		}
		intervalId = setInterval(function() {
			count--;
			if (count == 0) {
				var width = $(window).width();
				var height = $(window).height();

				var xMove = Math.abs(lastWidth - width);
				var yMove = Math.abs(lastHeight - height);
				console.log("xMove, yMove", xMove, yMove);

				lastWidth = width;
				lastHeight = height;

				clearInterval(intervalId);
				intervalId = 0;

				if (typeof cball == 'function') {
					cball(xMove, yMove);
				}
			}
		}, 250);
	})
}


function hiddenMenu(){
	$("#ctxMenu").hide();
}

// 撤消
function goback(){
	if((log.length - 1)>=1){
		dellog[dellog.length] = log[log.length - 1];
		log.pop();
      $("#source").val(log[log.length - 1]).blur();
      // 这里不能用abc_change();
      src_change();
	}
}
function delSelect(){
	var st = getSelectText("source");
	replaceSelected(st,"");
	abc_change();
	$("#source").blur();
}
// 合并
function merge(){
	var st = getSelectText("source");
	replaceSelected(st,st.replaceAll(" ","").replaceAll("\n",""));
}
// 换行
function enter(flag){
	var startPos = getStartPos(document.getElementById("source"));
	var st = getSelectText("source");
	var content = $("#source").val();
	if(flag=="before"){
		content = content.substr(0,startPos)+"\n"+content.substr(startPos);
	}else if(flag=="after"){
		content = content.substr(0,startPos+st.length)+"\n"+content.substr(startPos+st.length);
		
	}
	$("#source").val(content)
	setTimeout(function(){
		abc_change();
	},100);
}
// 插入描述
function insertDesc(flag){
	hiddenMenu();
	setTimeout(function(){
		var selEle = $("rect[type='note'][style='fill-opacity: 0.4;']");
		if(selEle.length == 0){
			window.top.alert("未选中音符")
			return;
		}
		var istart = $(selEle).attr("istart");
		if(istart!=""){
			istart = parseInt(istart);
		}
		
		editorAnnot(istart);
		
	},1);
}

/**
 * 插入文字
 */
function insertWord( word){
	var st = getSelectText("source");
	var str = "\"" + word + "\"" + st;
	replaceSelected(st, str);
}
// 编辑歌词
function editLyric(sourceid){
	var content = $("#"+sourceid).val();
	// $("#"+sourceid).val(content.replaceAll(/w:\s+/,"w:"));
	$("#LYRIC_div .modal-content").width($(window).width()-200).height($(window).height()-100);
	$("#LYRIC_div .modal-content").css("left",($(window).width()-$("#LYRIC_div .modal-content").width())/2);
	$("#lyricpicdiv").height($("#LYRIC_div .modal-content").height()-150);
	$("#lyric_edit_div").height($("#LYRIC_div .modal-content").height()-150);
	formatLyric(sourceid);
	// 生成歌词编辑区div
	getLyricDiv(sourceid);
	
	
	// 歌词输入框输入事件
	$("#lyric_edit_div input").on("input",function(){
		lyricInputChangeHandler(this,sourceid)
	});
	$("#lyricpicdiv").html("");
	$("#lyricpicdiv").append($($("#target").html()));
	$("#LYRIC_div").modal();
}
// 标准化歌词（把没有歌词的行加上歌词）
function formatLyric(sourceid){
	var content = $("#"+sourceid).val();
	var lines = content.split("\n");
	var newstaff = "";
	if(lines!=null){
		// 遍历所有音符行
		for(var i=0;i<lines.length;i++){
			var line = lines[i];
			newstaff += line + "\n";
			if(line.indexOf("w:")<0 && line.replace(/\[.[^\]]*\]/,"").replace(/\{.[^\}]*\}/,"").indexOf("|")>-1){
				var next_line = "";
				if((i+1)<lines.length){
					next_line = lines[i+1];
				}
				// 下一行不是歌词，则增加一个空的歌词行
				if(next_line.indexOf("w:")<0){
					newstaff += "w:\n";
				}
			}
			
		}
	}
	newstaff = replaceBlankLine(newstaff);
	$("#"+sourceid).val(newstaff)
}
// 生成歌词的div
function getLyricDiv(sourceid){
	$("#lyric_edit_div").html("")
	var noteLyrics = note_lyrics(sourceid);
	var inputDemo = '<input type="text" style="width:40px;margin:1px;" node_index="nodeIndex" note_in_node_index="noteInNodeIndex" line="var_line" index="var_index" note="var_note" value="var_value" inner_line="0">';
	var lyricLineDiv = "";
	var inputBuffer = "";
	var input_count = 0;
	for(var i=0;i<noteLyrics.length;i++){
		var lineObj = noteLyrics[i];
		// 样例行，只有输入框，没有歌词填充
		var lineDemo = "";
		inputBuffer +="<div line=\""+(i)+"\">";
		var notes = lineObj.notes;
		var lastNodeIndex = 0;
		// 根据一行的音符数量生成歌词输入框
		for(var j=0;j<notes.length;j++){
			if(lastNodeIndex != notes[j].nodeIndex){
				lineDemo += "|";
			}
			lineDemo += inputDemo.replace("var_index",notes[j].index).replace("nodeIndex",notes[j].nodeIndex).replace("noteInNodeIndex",notes[j].noteInNodeIndex).replace("var_note",notes[j].note).replace("var_value","value_" + notes[j].index).replace("var_line",i);
			
			lastNodeIndex = notes[j].nodeIndex;
		}
		lineDemo += "<br>";
		// 增加空的歌词行
		var lyrics = lineObj.lyrics;
		for(var j=0;j<lyrics.length;j++){
			var words = lyrics[j];
			var tmpDiv = lineDemo;
			tmpDiv = tmpDiv.replaceAll("inner_line=\"0\"","inner_line=\""+j+"\"");
			inputBuffer += tmpDiv;
		}
		if(lyrics==null || lyrics.length==0){
			inputBuffer += lineDemo;
		}
		inputBuffer = inputBuffer.replace(/value\_[0-9]{1,2}/g,"");
		inputBuffer += "</div>";
		inputBuffer += '<input type="button" value="+" onclick="add_lyric_line(\''+sourceid+'\','+i+')"><hr>';
	}
	$("#lyric_edit_div").append($(inputBuffer));
	// 填充歌词到输入框中，取出每一行音符对应的歌词(一行音符可能对应多行歌词)
	// 歌词是否有小节线
	for(var i=0;i<noteLyrics.length;i++){
		var lineObj = noteLyrics[i];
		var lyrics = lineObj.lyrics;
		
		for(var j=0;j<lyrics.length;j++){
			var hasNodeLine = false;
			var words = lyrics[j];
			for(var k=0;k<words.length;k++){
				if(words[k].nodeIndex!=0){
					hasNodeLine = true;
					break;
				}
			}
			for(var k=0;k<words.length;k++){
				var word = words[k];
				if(hasNodeLine){
					// 歌词有小节线
					$("input[line="+i+"][inner_line="+j+"][node_index="+word.nodeIndex+"][note_in_node_index="+word.noteInNodeIndex+"]").val(word.word.replace("*",""));
				}else{
					// 歌词没有小节线
					$("input[line="+i+"][inner_line="+j+"][index="+k+"]").val(word.word.replace("*",""))
				}
			}
		}
		
	}
}

function lyricInputChangeHandler(obj,sourceid){
	
	var line_num = $(obj).attr("line");
	var line_word = "w:";
	var last_inner_line = "0";
	var lastNodeIndex = 0;
	var hasNodeLine = false;
	$.each($("#lyric_edit_div input[line='"+line_num+"']"),function(i,item){
		var inner_line = $(item).attr("inner_line");
		var nodeIndex = $(item).attr("node_index");
		if(lastNodeIndex!=nodeIndex){
			line_word += "|";
			hasNodeLine = true;
		}
		if(inner_line!=last_inner_line){
			
			line_word +="\nw:";
		}
		if($.trim($(item).val())==""){
			line_word += "*";
		}else{
			line_word += $(item).val();
		}
		line_word += " ";
		last_inner_line = inner_line;
		lastNodeIndex = nodeIndex;
		
	});
	
	
	if(line_word!=""){
		if(hasNodeLine){
			line_word += "|";
		}
		// 替换歌词
		replaceLineLyric(sourceid,parseInt(line_num)+1,line_word);
	}
}

// 按照歌词行号替换原有歌词
function replaceLineLyric(sourceid,line_num,line_word){
	var content = $("#"+sourceid).val();
	var lines = content.split("\n");
	var lyric_line_num = 0;
	var newstaff = "";
	// 上一行是否是歌词
	var last_line_is_lyric = false;
	var edit_line = false;
	var lyric_line_nums = new Array();
	for(var i=0;i<lines.length;i++){
		var line = lines[i];
		last_line_is_lyric = false;
		if(line.indexOf("w:")>-1){
			var last_line_word = lines[i-1];
			if(last_line_word.indexOf("w:")>-1){
				// 上一行也是歌词
				last_line_is_lyric = true;
			}
			if(!last_line_is_lyric){
				lyric_line_num++;
			}
			if(lyric_line_num==line_num){
				edit_line = true;
				line = line_word;
				// 查询往下10行看是否是连续的歌词
				for(var k=1;k<10;k++){
					var tmp = i + k;					
					if(tmp<lines.length){
						var tmp_line_word = lines[tmp];
						if(tmp_line_word.indexOf("w:")>-1){
							lyric_line_nums.push(tmp);
						}else{
							break;
						}
					}
				}
			}
		}
		if(lyric_line_nums.indexOf(i)==-1){
			newstaff += line + "\n";
		}
	}
	newstaff = replaceBlankLine(newstaff);
	if(newstaff!=""){
		$("#"+sourceid).val(newstaff);
	}
	src_change();
	setTimeout(function(){
		$("#lyricpicdiv").html("");
		$("#lyricpicdiv").append($($("#target").html()));
	},500)
	
}

// 分割
function split(){
	var st = getSelectText("source");
	var str = "";
	for(var i=0;i<st.length;i++){
		str = str + " "+st.substr(i,1);
	}
	if(str!=""){
		str = str.substr(1);
	}
	replaceSelected(st,str);
}
// 改变小节拍号
function changeNodeM(){
	setNodeMValue();
	var val = $("#node_M").val();
	var selectText = getSelectText("source");
	if(selectText!=""){
		if(selectText=="|"){
			replaceSelected(selectText,selectText+val);
		} else {
			replaceSelected(selectText,val+selectText);
		}
	} else {
		insertText(val);
	}
	abc_change();
	$("#source").focus();
}
// 改变小节调号
function changeNodeK(){
	
	var val = $(".keyChoice.selected").attr("value");
	if(!val){
		return;
	}
	if(behindStr!=""){
		var content = $("#source").val();
		var newContent = content.replace(behindStr,"")+val+behindStr;
		$("#source").val(newContent);
	}else{
		insertText(val);
	}
	behindStr = "";
	src_change();
	$("#source").focus();
}
// 判断当前应该输出的时长
function getSuffix(){
	var val = $("img.operator_sc.selected").attr("value");
	
	var L = $("#L").val();
	// 倍数
	var b = toFloat(val)/toFloat(L);
	var s = "";
	if(b>=1){
		if(b==1){
			b="";
		}
		return b;
	}else if(b<1){
		for(var i=1;i<20;i=i*2){
			s = s + "/";
			var a = parseFloat(1/(i*2));
			if(a==b){
				return s;
			}
		}
	}
	return "";
}

// 更改小节内、谱子速度
function changeNodeSpeed(){
	var speedtype = $("#speedtype").val();
	var selectText = getSelectText("source");
	if($("#NOTE_Q_V").val()==""){
		return;
	}
	if(speedtype=="node"){
		// [Q: 1/2=120]
		var str = "[Q: "+$("#NOTE_Q").val()+"="+$("#NOTE_Q_V").val()+"]"
		if(selectText!=""){
			if(selectText=="|"){
				replaceSelected(selectText,selectText + str)
				
			}else{
				replaceSelected(selectText,str + selectText)
				
			}
		}else{
			insertText(str);
		}	
	}else{
		var str = $("#NOTE_Q").val()+"="+$("#NOTE_Q_V").val();
		set("Q:",str);
	}
	
	abc_change();
}

// 替换选中的内容
function replaceSelected(selectText,newText){
	var startPos = getStartPos(document.getElementById("source"));
	var endPos = startPos + selectText.length;
	var content = $("#source").val();
	var newContent = content.substr(0,startPos)+newText+content.substr(endPos,content.length);
	$("#source").val(newContent);
	abc_change();
	setSelectRange(document.getElementById("source"),startPos,startPos+newText.length);
	$("#source").focus();
}


// 新建谱子
function newnote(){
	var paramTitle = getUrlParameter("TITLE");
	defstr = defstr.replace("%%createby createuserinfo","%%createby "  + window.location.host + " " + $("#personname").val() + " " + new Date().Format('yyyy-MM-dd'))
	if(paramTitle){
		defstr = defstr.replace("标题",paramTitle)
	}
	$("#source").val(defstr);
	abc_change();
	
	if($("#graphEditorMenuUpdate").hasClass("menu-pressed")){
		//如果处于编辑状态，则取消编辑状态
		graph_update = false;
		draw_editor = true;
		
		
		if($("#graphEditorMenuUpdate")){
			$("#graphEditorMenuUpdate").removeClass("menu-pressed");
//			$("#graphEditorMenu").attr("title","当前模式：修改");
		}
		if($("#graphEditorMenuInsert")){
			$("#graphEditorMenuInsert").addClass("menu-pressed");
//			$("#graphEditorMenu").attr("title","当前模式：修改");
		}
		
		
		$("#selectedStatus").removeClass("menu-pressed");
	}
	
}
//设置副标题
function setSecTitle(val){
	var content = $("#source").val();
	var reg = /T:.*/g;
	var matchs = content.match(reg);
	if(matchs!=null){
		if(matchs.length==1){
			console.log("只有一个标题")
			//只有主标题，则新增一个
			content = content.replace(matchs[0],matchs[0]+"\nT:"+val);
		}else{
			console.log("有副标题。。。")
			content = content.replace(matchs[0],"T:"+$("#T").val());
			content = content.replace(matchs[1],"T:"+val);
		}
	}
	$("#source").val(content);
	src_change();
}
// 设置属性值
function set(flag,value){
	var pattern = "/"+flag+".*\\n/";
	var str = $("#source").val();
	var matchs = str.match(eval(pattern));
	if(matchs!=null){
		// 已经存在时，替换
		var newValue = "";
		if((value+"").indexOf("\n")>-1){
			var lines = value.split("\n");
			for(var i=0;i<lines.length;i++){
				if(lines[i]!="" && lines[i]!="\n"){
					newValue += flag+" "+lines[i]+"\n";
				}
			}
		}
		if(newValue==""){
			//标记只有一行的情况 
			newValue = value + "\n";
			$("#source").val(str.replace(eval(pattern),flag + " " + newValue));
		}else{
			//标记多于一行的情况
			var oldValue = "";
			var pattern = "/"+flag+".*\\n/g";
			var matchs2 = str.match(eval(pattern));
			for(var i=0;i<matchs2.length;i++){
				if(matchs2[i]!="" && matchs2[i]!="\n"){
					
					oldValue += matchs2[i];
				}
			}
			$("#source").val(str.replace(oldValue,newValue));
		}
		
		return;
	}
	// 不存在时，放在头部第二行就可以，但要注意位置:
	// 1.K:必需要放在C：的后面，不然会报语法错误
	// 2.V:要放在K:后面
	// 3.C:要放在T:的后面
	var x_pattern = /X:.*\n/;
	var x_matchs = str.match(x_pattern);
	// 匹配C:
	var c_pattern = /C:.*\n/;
	var c_matchs = str.match(c_pattern);
	// 匹配K:
	var k_pattern = /K:.*\n/;
	var k_matchs = str.match(k_pattern);
	// 匹配T:
	var t_pattern = /T:.*\n/;
	var t_matchs = str.match(t_pattern);
	if(x_matchs!=null){
		// K:必需要放在C：的后面
		if(flag=="K:"){
			if(c_matchs!=null){
				var c_str = "";
				for(var i=0;i<c_matchs.length;i++){
					c_str += c_matchs[i] + "\n";
					
				}
				
				$("#source").val(str.replace(c_matchs[0],c_matchs[0] + flag + " " + value + "\n"));
				return;
			}
		} 
		// V:要放在K:后面
		if(flag == "V:"){
			if(k_matchs!=null){
				$("#source").val(str.replace(k_matchs[0],k_matchs[0] + flag + " " + value + "\n"));
				return;
			}
		} 
		// 3.C:要放在T:的后面
		if(flag == "C:"){
			if(t_matchs!=null){
				$("#source").val(str.replace(t_matchs[0],t_matchs[0] + flag + " " + value + "\n"));
				return;
			}
		} 
		$("#source").val(str.replace(x_matchs[0],x_matchs[0] + flag + " " + value + "\n"));
	}else{
		if(flag == "X:"){
			$("#source").val(flag + " " + value + "\n"+$("#source").val());
		}else{
			window.top.alert("请先设置编号值");
			return false;
		}
	}
}
// 取编号
function getX(){
	var val = get("X:");
	$("#X").val(val);
}
// 取标题
function getT(){
	var val = get("T:");
	$("#T").val(val);
	
	return val;
}
// 取副标题
function getSecT(){
	var content = $("#source").val();
	var reg = /T:.*/g;
	var reg2 = /T:(.*)/;
	var matchs = content.match(reg);
	if(matchs!=null && matchs.length>1){
		var val = matchs[1].match(reg2);
		if(val!=null){
			return val[1];
		}
	}
	return "";
}
// 取标题
function getC(){
	var val = get("C:");
	$("#C").val(val);
}
// 取节拍
function getM(){
	var val = get("M:");
	$("#M").val(val);
	if(val.indexOf("/")>-1){
		$("#M_mol").val(val.split("/")[0]);
		$("#M_den").val(val.split("/")[1]);
	}
	
}
// 取速度单位
function getL(){
	var val = get("L:");
	$("#L").val(val);
}
// 取速度单位
function getQ(){
	var val = get("Q:");
	var str = val.split("=");
	var qdesc = "";
	if(str[0].indexOf("\"")>-1){
		var matchs = str[0].match(/\"(.*)\"/);
		if(matchs!=null){
			qdesc = matchs[1];
		}
	}
	$("#Q_DESC").val(qdesc);
	$("#Q").val(str[0].replace(/\"(.*)\"/,""));
	$("#Q_V").val(str[1]);
	$("#NOTE_Q_V").val(str[1]);
	
	$("#Q_DIV>a").each(function(){
		if($(this).attr("val")==str[0]){
			$(this).click();
		}
	});
}
// 取Key
function getK(){
	var val = get("K:");
	$("#K").val(val);
	if($("#K").val()==null){
		val = $.trim(val).split(" ")[0];
		// var option = "<option value='"+val+"' selected>"+val+"</option>";
		// $("#K").append($(option));
		$.each($("#K option"),function(i,item){
			if($(item).text().toLowerCase() == val.toLowerCase()){
				$("#K").val($(item).attr("value"));
			}
		})
		return $("#K").val();
	}
	// $("#K").change();
}
function abc_change(){
	src_change();
	getX();
	getT();
	getSecT();
	getM();
	getC();
	getL();
	getQ();
	doLog();
	$("#playspan").text("播放");
	$("#playimg").attr("src","images/preview_play.png");
	return;
}
function getSourceScale(sourceid){
	var content = $("#"+sourceid).val();
	var pattern = /scale.*/;
	var scales = content.match(pattern);
	var scaleStr = "";
	if(scales!=null){
		scaleStr = $.trim(scales[0].replace("scale",""));
		scale = parseFloat(scaleStr);
		content = content.replace(scales[0],"");
		$("#scale_control").val(scale);
		$("#"+sourceid).val(content);
	}
	
}
function saveabc(){
	$("#abcform").submit();
}


function loadxzdsfile(){ 
	loadtune();
	setTimeout(function(){
		abc_change();
	},500)
	setTimeout(function(){
		var staff = getStaffInfo("source");
		backfilStaffProp(staff)
	},1000)
}
//上传midi
function postmidifile(){ 
	var formData = new FormData();

    formData.append("midifile",$('#xd_upload_midi_file')[0].files[0]);
    var pathName=window.document.location.pathname;
    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1); 
    $.ajax({
        url: '/midi2abc',//projectName + '/midi2abc',
        dataType:'json',
        type:'POST',
        async: false,
        data: formData,
        processData : false, // 使数据不做处理
        contentType : false, // 不要设置Content-Type请求头
        success: function(data){ 
            if (data.result == '1') {
            	console.log(data.abc)
            	$("#source").val(data.abc);
            	src_change();
                console.log('midi转abc成功！'); 
            }else{
            	$("#source").val("data.abc");
            	window.top.alert("midi转abc失败");
				alert("error.");
            }

        },
        error:function(response){
            console.log(response);
			alert("error:" + JSON.stringify(response));
        }
    });
}
var meterInterval;
var meterIndex = 0;
function playMeter(){
	var metrocheck = content_vue.metrocheck;
	try{
		var m = $("#M").val().split("/")[0];
		var speed = getSpeed();
		var low = document.getElementById('low');
		var mid = document.getElementById('mid');
		var high = document.getElementById('high');
		if(metrocheck){
			if(meterIndex%m==0){
				low.play()
			}else{
				high.play();
			}
		}
		meterIndex++;
		meterInterval = setInterval(function(){
			if(metrocheck){
				if(meterIndex%m==0){
					// console.log("play low")
					low.play();
				}else{
					if(m==6 || m==9 || m==12){
						if(meterIndex%3==0){
							// console.log("play mid")
							mid.play();
						}else{
							// console.log("play high")
							high.play();
						}
					}else{
						// console.log("play high")
						high.play();
					}
					
				}
			}
			meterIndex++;
		},60*1000/speed)
	}catch(e){
		console.log(e)
	}
}
function getSpeed(){
	var speed = 120;
	try{
		
		var meter = $("#M").val().split("/")[1];
		var Q_meter = $("#Q").val().split("/")[1];
		var Q_V = $("#Q_V").val();
		if(meter==Q_meter){
			speed = Q_V;
		}else{
			speed = Q_V * (toFloat(meter)/toFloat(Q_meter));
		}
		// console.log("speed:"+speed)
		return speed;
	}catch(e){
		console.log(e)
		return speed;
	}
}

function stopMeterInterval(){
	meterIndex = 0;
	clearInterval(meterInterval)
}
// 获取第一小节的长度（主要是弱起小节跟节拍器要一致）
// 第一小节获取方法：第一个｜线和之之前的字符串（去掉引号的内容，去掉[]的内容）
function firstNodeLen(){
	var content = $("#source").val();
	if(content.indexOf("|")<0){
		return -1;
	}
	
	var y_pattern = /\"(.*)\"/g;
	var k_pattern = /\[(.*)\:(.*)\]/g;
	var pattern = /\n(.*)/g;
	var result = content.match(pattern);
	if(result!=null){
		for(var i=0;i<result.length;i++){
			var str = result[i];
			if(str.replace(/\[.[^\]]*\]/,"").replace(/\{.[^\}]*\}/,"").indexOf("|")>0){
				var line = str.replace(y_pattern,"").replace(k_pattern,"");
				if(line.indexOf("|")>-1){
					var node = line.split("|")[0];
					return calNodeLen(node);
					break;
				}
			}
		}
	}
}


// 计算第个音符的长度：返回值为两维数组[[音符,长度],[音符,长度]],如果是和弦，则是[['音符,音符',长度],[]]
function getNotesLength(nodestr){
	// console.log(notestr)
	// var pattern =
	// /([cdefgabzCDEFGABZ](\,*)(\'*)(\/*)([1-9]*))|(\[([cdefgabzCDEFGABZ](\,*)(\'*)(\/*)([1-9]*))\])/g;
	var pattern = /\([2-9].[^\s]*\s|(\[[\^\_\=A-Za-z\/1-9,']*\])|(\^){0,1}(\_){0,1}(\=){0,1}[^\[\s\]]{1}[\,\'\/|1-9]*/g;
	var L = get("L:").split("/")[1];
	var M = get("M:").split("/")[1];
	// 计算一拍需要几个单位音符
	var bs = L/M;
	var num_pattern = /([1-9]*)/g
	var result = nodestr.match(pattern);
	var len = 0;
	var data = new Array();
	// 连音符正则表达式
	var reg = /\([1-9]/;
	var note_reg = /[a-gA-GzZ]/;
	if(result!=null){
		for(var i=0;i<result.length;i++){
			// 判断是否有音符，
			if(!note_reg.test(result[i])){
				continue;
			}
			var noteinfo = new Array();
			var index = 0;
			var note = result[i];
			if(reg.test(note)){
				// 有连音号的处理
				// noteinfo.push(note.replaceAll("/","").replace("[","").replace("]",""));
			}else{
				noteinfo.push(note.replaceAll("/","").replaceAll(/[1-9]*/g,"").replace("[","").replace("]",""));
				
			}
			
			
			
			if(note.indexOf("[")>-1){
				var tmp = getNotesLength(note.replace("[","").replace("]",""));
				// console.log("----------")
				// console.log(tmp[0][1])
				noteinfo.push(tmp[0][1]);
			}else if(reg.test(note)){
				if(note.indexOf("(3")==0){
					ly3handle(3,data,note,pattern,num_pattern);
				}
				if(note.indexOf("(5")==0){
					ly5handle(5,noteinfo,note,pattern,num_pattern);
				}
				if(note.indexOf("(6")==0){
					ly5handle(6,noteinfo,note,pattern,num_pattern);
				}
				if(note.indexOf("(7")==0){
					ly5handle(7,noteinfo,note,pattern,num_pattern);
				}
			}else{
				var num_result = note.match(num_pattern);
				if(note.indexOf("/")>-1){
					var temp = 1;
					var flag = false;
					for(var j=0;j<note.length;j++){
						if(note[j]=="/"){
							index++;
							temp = temp/2;
							flag = true;
						}
					}
					if(flag){
						noteinfo.push(temp/bs);
					}
				}else if(num_result!=null){
					for(var j=0;j<num_result.length;j++){
						if(num_result[j]!=""){
							index++;
							noteinfo.push(parseInt(num_result[j])/bs);
						}
					}
				}
				
				if(index==0){
					noteinfo.push(1/bs);
				}
				
			}
			if(noteinfo.length>0){
				data.push(noteinfo);
			}
		}
	}
	return data;
}
// 3连音处理
function ly3handle(n,data,note,pattern,num_pattern){
	var index = 0;
	var tmp = note.replace("("+n,"");
	var result1 = tmp.match(pattern);
	var note_reg = /[a-gA-GzZ]/;
	if(result1!=null){
		for(var k=0;k<result1.length;k++){
			if(!note_reg.test(result1[k])){
				continue;
			}
			var noteinfo = new Array();
			var t = result1[k];
			noteinfo.push(t.replaceAll("/","").replaceAll(/[1-9]*/g,"").replace("[","").replace("]",""));
			var num_result = t.match(num_pattern);
			
			if(num_result!=null){
				for(var j=0;j<num_result.length;j++){
					if(num_result[j]!=""){
						index++;
						noteinfo.push((parseInt(num_result[j])/n).toFixed(2));
					}
				}
				if(t.indexOf("/")>-1){
					var temp = 1;
					var flag = false;
					for(var j=0;j<t.length;j++){
						if(t[j]=="/"){
							index++;
							temp = temp/2;
							flag = true;
						}
					}
					if(flag){
						noteinfo.push((temp/n).toFixed(2));
					}
				}
				if(index==0){
					noteinfo.push((1/n).toFixed(2));
				}
			}
			if(noteinfo.length>0){
				data.push(noteinfo);
			}
		}
	}
}
// 5-6-7连音处理
function ly5handle(n,data,note,pattern,num_pattern){
	var index = 0;
	var tmp = note.replace("("+n,"");
	var result1 = tmp.match(pattern);
	var note_reg = /[a-gA-GzZ]/;
	if(result1!=null){
		for(var k=0;k<result1.length;k++){
			if(!note_reg.test(result1[k])){
				continue;
			}
			var noteinfo = new Array();
			var t = result1[k];
			noteinfo.push(t.replaceAll("/","").replaceAll(/[1-9]*/g,"").replace("[","").replace("]",""));
			var num_result = t.match(num_pattern);
			
			if(num_result!=null){
				for(var j=0;j<num_result.length;j++){
					if(num_result[j]!=""){
						index++;
						noteinfo.push((parseInt(num_result[j])*2/n).toFixed(2));
					}
				}
				if(t.indexOf("/")>-1){
					var temp = 1;
					var flag = false;
					for(var j=0;j<t.length;j++){
						if(t[j]=="/"){
							index++;
							temp = temp/2;
							flag = true;
						}
					}
					if(flag){
						noteinfo.push((temp*2/n).toFixed(2));
					}
				}
				if(index==0){
					noteinfo.push((2/n).toFixed(2));
				}
			}
			if(noteinfo.length>0){
				data.push(noteinfo);
			}
		}
	}
}
// 判断是否要覆盖（mp3文件的ATTACHDESC字段有值时，提示是否要覆盖）
function checkOverwrite(){
	var mp3desc = $("#mp3desc").val();
	if(mp3desc!=""){
		swConfirm(mp3desc+"，是否覆盖原来的音频文件？", null, function(isYes){
			if( isYes){
				$("#overwritemp3").val(1);
			}else{
				$("#overwritemp3").val(0);
			}
			save_to_server();
		})
// if(confirm(mp3desc+"，是否覆盖原来的音频文件？")){
// $("#overwritemp3").val(1);
// }else{
// $("#overwritemp3").val(0);
// }
	}else{
		save_to_server();
	}
	
	// save_to_server();
}

function save_to_server(){
	if($("#pictype").val()==""){
		// 如果没有设置手机还是电脑端，则根据宽度来判断，pagewidth <=500时是手机
		var content = $("#source").val();
		
		var pattern = /pagewidth\s*([0-9]*)/;
		var matchs = content.match(pattern);
		if(matchs!=null){
			var width = matchs[1];
			if(parseFloat(width)<=500){
				$("#pictype").val("mobile")
			}
		}
	}
//	if(content.indexOf("%%createby")<0){
//		content = "%%createby " + window.location.host + " " + $("#personname").val() + " " + new Date().Format('yyyy-MM-dd') + "\n" + content;
//		$("#source").val(content);
//	}
	autoSaveAlert();
	maskFullTxt("正在保存中...")
	var url = "https://abc.ixzds.com/abc/abcservlet?time="+Date.parse(new Date());
	// 提交midi数据
	var form = new FormData(document.getElementById("abcform"));
	// 这里不再上传midi文件了，由服务器端直接生成midi
	// var blob = dataURItoBlob($("#midi-download a").attr("href"));
  // form.append("midiFile", blob);
	$.ajax({
      type: "POST",
      url: url,
      data: form,
      timeout : 60000,
      cache: false,
      processData: false,
      contentType: false,
      success: function(data){
    	  $(".loading,.loading-box").remove();
	    	if(data.indexOf("成功")>-1){
		    	// 重新加载文件相关信息
		    	loadFileByGroupid();
		    	window.top.alert("保存成功");
		    	// (生成其它速度文件)
		    	// saveOtherSpeedFile();
		    	// genFileBySpeed();
	    	}else{
	    		window.top.alert(data);
	    	}
	    	
      },
      complete:function(XMLHttpRequest,status){
    	  $(".loading,.loading-box").remove();
    	  if(status=='timeout'){
    		  window.top.alert("请求超时")
    	  }
      }
  });
}
// 删除文件服务器相关文件
function delfile(attachid){
	var url = file_server_url + "/del/"+attachid;
	$.ajax({
      type: "POST",
      async:false,
      url: url,
      data: "",
      dataType: "json",
      success: function(data){
	    	if(data!=null && data!=""){
				if(data.code==0){
					console.log("删除"+attachid+"失败");
				}		    	
  		}	
		},
      error: function (message) {
          window.top.alert("保存失败"+message)
      }
  });
}
// 加载原来的文件
function loadFileByGroupid(){
	var groupid = $("#groupid").val();
	if(groupid==""){
		return false;
	}
	var url = file_server_url + "/view/"+groupid;
	var existAbc = false;
	maskFullTxt("正在加载中...")
	$.ajax({
      type: "POST",
      url: url,
      data: "",
      dataType: "json",
      success: function(data){
	    	if(data!=null && data!=""){
		    	var files = data[groupid];
		    	if(!files){
		    		return;
		    	}
		    	for(var i=0;i<files.length;i++){
		    		if(files[i].FILETYPE=="jpg" && (files[i].FILECATEGORY=="" || files[i].FILECATEGORY=="stand_png")){
		    			$("#png_attachid").val(files[i].ATTACH_ID);
		    		}else{
		    			$("#"+files[i].FILETYPE+"_attachid").val(files[i].ATTACH_ID);
		    		}
		    		if((files[i].FILETYPE=="jpg" || files[i].FILETYPE=='png') && (files[i].FILECATEGORY=="" || files[i].FILECATEGORY=="stand_png")){
		    			$("#pic_url").val(files[i].ATTACHURL);
		    			var tmpimg=new Image();  
		    			tmpimg.src = files[i].ATTACHURL;
		    			
		    			tmpimg.onload=function(){
		    				if(tmpimg.naturalWidth>600){
		    					changeMode('compute');
		    				}
		    			};  
		    			
		    		}
		    		if(files[i].FILETYPE=="mp3" && (files[i].FILECATEGORY=="" || files[i].FILECATEGORY=="stand_mp3")){
		    			if(files[i].ATTACHDESC!=""){
		    				$("#mp3desc").val(files[i].ATTACHDESC);
		    			}
		    		}
		    		if(files[i].SPEED!=""){
		    			addSpeedFile(files[i].SPEED)
		    		}
		    		if(files[i].FILETYPE == "abc"&& (files[i].FILECATEGORY=="" || files[i].FILECATEGORY=="stand_abc")){
		    			existAbc = true;
		    			var readabcurl = "readabcbyurl";
		    			$("#iecdata").val(files[i].DESC2);
		    			if($.trim($("#iecdata").val())!=""){
		    				// 没有智能纠错数据
		    				$("#iecdot").removeClass("gray").addClass("blue").removeAttr("title");
		    			}
		    			$("#nodelinedata").val(files[i].DESC1);
		    			$("#stafftypeid").val(files[i].STAFF_TYPE_ID);
		    			if($.trim($("#nodelinedata").val())!=""){
		    				// 没有小结线数据
		    				$("#nodelinedot").removeClass("gray").addClass("blue").removeAttr("title");
		    			}
		    			
		    			$.ajax({
		 					type: "POST",
			 				url:readabcurl,
			 				data:{url:files[i].ATTACHURL},
			 				async:true,
			 				success:function(data){
			 					if(data!=""){
					    			
					    			if(location.href.indexOf("ixzds.com")>-1){
//					    				if(data.indexOf("pagewidth")<0){
//					    					data = "%%pagewidth " + mobilPageWidth + "\n" + data;
//					    				}
//					    				changeMode('mobile',false);
				    					// changeMode('compute',false);
				    				}else if(location.href.indexOf("xmajd.cn")>-1){
				    					if(data.indexOf("pagewidth")<0){
					    					data = "%%pagewidth " + computerPageWidth + "\n" + data;
					    				}
				    					changeMode('compute',false);
				    				}
					    			if(data.indexOf("%%leftmargin")<0){
					    				data = "%%leftmargin 2\n"+data;
					    			}
					    			if(data.indexOf("%%rightmargin")<0){
					    				data = "%%rightmargin 10\n"+data;
					    			}
					    			var pwReg = /%%pagewidth\s*([0-9]*\n)/;
					    			var pwMatch = data.match(pwReg);
					    			if(pwMatch!=null){
					    				var width = pwMatch[1];
					    				if(parseInt(width)>mobilPageWidth){
					    					changeMode('compute',false);
					    				}
					    			}
					    			//如果没有换行符，则加上换行
					    			if(data.indexOf("%%linebreak")<0){
					    				data = addLineBreak(data);
					    			}
					    			
					    			$("#source").val(data);
					    			$("#source").change();
					    			abc_change();
					    			setTimeout(function(){
					    				//changeYG($("#K").val(),"doPos");
					    				if($("#graphEditorMenuInsert").hasClass("menu-pressed")){
					    					//如果处于编辑状态，则取消编辑状态
					    					graph_update = true;
					    					draw_editor = false;
					    					
					    					$("#use_black").remove();
					    					
					    					if($("#graphEditorMenuInsert")){
					    						$("#graphEditorMenuInsert").removeClass("menu-pressed");
//					    						$("#graphEditorMenu").attr("title","当前模式：修改");
					    					}
					    					if($("#graphEditorMenuUpdate")){
					    						$("#graphEditorMenuUpdate").addClass("menu-pressed");
//					    						$("#graphEditorMenu").attr("title","当前模式：修改");
					    					}
					    					
					    					
					    					$("#selectedStatus").removeClass("menu-pressed");
					    				}
					    			},100)
					    			setTimeout(function(){
					    				try{
					    					var staff = getStaffInfo("source");
											backfilStaffProp(staff)
					    				}catch(e){
					    					console.log(e);
					    				}
										
									},1000)
			 					}
					 		}
					 	});
		    		}
		    	}
		    	if(!existAbc){
		    		//showPlsx()
		    	}
  		}
	    	$(".loading,.loading-box").remove();
		},
      error: function (message) {
          window.top.alert("加载文件失败")
      }
  });
}
// 当选中某个音符时，相应的操作符加亮
function lightoperator(){
	$(".other-ul li").removeClass("selected")
	$(".yingao").removeClass("selected");
	//
	var st = getSelectText("source");
	// var startPos = getStartPos(getById(source));
	// console.log("开始位置："+startPos)
	var content = $("#source").val();
	var pattern = "/((![0-9]*!)|(![a-zA-Z\\.]*!)|(!\\>!)|\\.|(\\(\\d)|v|u|\\>|P)*"+st.replaceAll("/","\\/").replaceAll("\\^","\\^").replaceAll("=","\\=").replaceAll("_","\\_")+"/g";
	
	// 选中开始位置
	var sp =	getStartPos( getById("source") );
	// 把选中的音符后面的字符串全部截掉，这样只需要取到匹配的最后一个就可以了
	var str = "";
	if(st!="" && sp && sp>0){
		str = content.substr(0,sp+st.length);
		var result = str.match(eval(pattern));
		// u v . P
		if(result != null){
			var note = result[result.length-1];
			var pattern2 = /(![0-9]*!)|(![a-zA-Z]*!)|(!\>!)|(\.)|(\(\d)|(v)|(u)|(\>)|(P)|(\^)|(\_)|(\=)/g
			var result2 = note.match(pattern2);
			if(result2!=null){
				for(var i=0;i<result2.length;i++){
					$(".other-ul .operator").each(function(){
						var position = $(this).attr("position");
						if(position=="before"){
							if($(this).attr("value")==result2[i]){
								$(this).parent().addClass("selected")
							}
						}
					})
					$(".yingao").each(function(){
						if($(this).attr("value")==result2[i]){
							$(this).addClass("selected")
						}
					})
					
				}
				setSelectRange(getById("source"),str.length-note.length,str.length);
			}
		}
	}
	
	
}

function source_mouseup(){
	setTimeout(function(){
		var st = getSelectText("source");
		if(st==""){
			$(".abcr").css("fill-opacity","0")
		}	
	},1)
	
}
function getFileServer(){
	var url =  "fileserver.json";
	$.ajax({
      type: "POST",
      url: url,
      data: "",
      async:false,
      dataType: "json",
      success: function(data){
      	// console.log(data.fileserver)
			file_server_url = data.fileserver;
      }
	})
}
// 把音符前面的修饰符去掉
function replaceSuffix(selectText){
	var st = selectText.replaceAll(/((![0-9]*!)|(![a-zA-Z]*!)|(!\>!)|(!\<\(!)|(!\<\)!)|(!\>\(!)|(!\>\)!)|\.|(\(\d)|v|u|\>|P)/g,"");
	return st;
}

// 自动添加小节线
function autoNodeLine(){
	try {
		
		var startPos = getStartPos(document.getElementById("source"));
		var content = $("#source").val();
		var preContent = content.substr(0,startPos);
		var lineNum = findLineNumByIndex(content,startPos);
		var lines = preContent.split("\n");
		var lastLine = lines[lines.length-1];
		
		var br = "";
		if(lineNum < content.split("\n").length-1){
			br = "\n";
		}
		// if(startPos==content.length){
			// 节拍2/4
			var M = $.trim(getLastM("source").split(":")[1]);
			// 单位1/8
			var L = $("#L").val();
			// 算出每小节有几个单位
			var unitNodeLen = toFloat(M)/toFloat(L);
			// 找到最后一个小节线|,如果没有小节线，就全部
			var nodes = lastLine.split("|");
			var lastNode = nodes[nodes.length-1];
			// lastNode = replaceSuffix(lastNode);
			var nodeLen = calNodeLen(lastNode);
			// console.log("nodeLen:"+nodeLen);
			var x = get("M:").split("/")[1];
			var y = get("L:").split("/")[1];
			var z = parseInt(y)/parseInt(x);
			// 大于4拍的，有各种规则，并不是第一拍就断开
			if(parseInt($("#M").val().split("/")[0])<=4){
				if(nodeLen%z==0){
					$("#source").val(preContent  + " " + br + content.substr(startPos+1));
				}
			}else{
				if(parseInt(n)==6 || parseInt(n)==9){
					//6拍子或9拍子
					console.log("nodeLen------",nodeLen);
					if(nodeLen/3){
						
					}
				}
			}
			
			if(nodeLen>=unitNodeLen){
				$("#source").val(preContent + "| " + br  +content.substr(startPos+1));
			}
		// }
	} catch (e) {
		console.log(e)
	}
}

function autoNodeLine2(lineIndex){
	try {
		var startPos = 0;
		var content = $("#source").val();
		
		var lines = content.split("\n");
		
		for(var i=0;i<lines.length;i++){
			var line = lines[i];
			if(i != (lines.length-1)){
				startPos += line.length + 1;
			}else{
				
				startPos += line.length;
			}
			if(i==lineIndex){
				break;
			}
		}
		
		var preContent = content.substr(0,startPos);
		var index = lines.length-1;
		if(lineIndex){
			index = lineIndex;
		}
		var lastLine = lines[index];
		
		// if(startPos==content.length){
			// 节拍2/4
			var M = $.trim(getLastM("source").split(":")[1]);
			// 单位1/8
			var L = $("#L").val();
			// 算出每小节有几个单位
			var unitNodeLen = toFloat(M)/toFloat(L);
			// 找到最后一个小节线|,如果没有小节线，就全部
			var nodes = lastLine.split("|");
			var lastNode = nodes[nodes.length-1];
			// lastNode = replaceSuffix(lastNode);
			var nodeLen = calNodeLen(lastNode);
			// console.log("nodeLen:"+nodeLen);
			var n = $("#M").val().split("/")[0];
			var x = $("#M").val().split("/")[1];
			var y = $("#L").val().split("/")[1];
			var z = parseInt(y)/parseInt(x);
			// 大于4拍的，有各种规则，并不是第一拍就断开
			if(parseInt(n)<=4){
				if(nodeLen%z==0){
					if(lineIndex != (lines.length-1)){
						//不是最后一行时，增加一个回车符
						$("#source").val(preContent.substring(0,preContent.length - 1) + " \n" + content.substr(startPos));
					}else{
						$("#source").val(preContent + " " + content.substr(startPos+1));
					}
				}
			}else{
				
				if(parseInt(n)==6 || parseInt(n)==9){
					//6拍子或9拍子
					console.log("nodeLen------",nodeLen);
					if(nodeLen/3){
						
					}
				}
			}
			
			if(nodeLen>=unitNodeLen){
				if(lineIndex != (lines.length-1)){
					$("#source").val(preContent.substring(0,preContent.length-1) + "| \n"+content.substr(startPos));
				}else{
					$("#source").val(preContent+"| "+content.substr(startPos+1));
				}
			}
		// }
	} catch (e) {
		console.log(e)
	}
}


// 重新获取小节线数据
/*
 * function resetNodeLineData(){ var v_num = getVNum("source"); var datas;
 * if(v_num==1){ datas = getNodeDatas_v1("paper","source"); }else if(v_num==2){
 * datas = getNodeDatas_v2("source"); }
 * 
 * $("#nodelinedata_tmp").val(formatJson(JSON.stringify(datas)));
 * resetNodeLineDataIndex(); }
 */ 
// 重新获取小节线数据
function resetNodeLineData(){
	// 取到所有的音符数据
	var allNoteData = getNoteData();
	
	var time = 0;
	// 小节线的x坐标（一行一个数组 ）
	var xCoors = staffData.xs;
	// 每一行y最小值
	var yMins = staffData.ymin;
	// 每一行y最大值
	var yMaxs = staffData.ymax;
	// 每一个小节开始的时间
	var times = staffData.times;
	
	// 小节播放顺序（行号、行内小节号，当前播放重复次数：第一次播放为1，第二次播放为2）time index -> [line_num,
	// bar_index, repcnt]
	var timeIndex = staffData.tixlb;
	// 每小节的拍数
	var beats = staffData.tixbts;
	// 第一个小节如果是弱起小节，这里的数据有误
	var L = $("#L").val().split("/")[1];
	var M = $("#M").val().split("/")[1];
	var bs = parseInt(M)/parseInt(L);
	beats[0] = firstNodeLen()*bs;
	
	// 行偏移量
	var lineOffsets = staffData.line_offsets;
	
	var array = new Array();
	var lastTime = -1;
	var gNodeIndex = 0;
	
	var tmpArr = new Array();
	// 所有的时间序列
	for(var i=1;i<times.length;i++){
		var time = times[i];
		var obj = new Object;
		var noteArr = new Array();
		
		for(var j=0;j<allNoteData.length;j++){
			
			var noteData = allNoteData[j];
			// 音符开始时间
			var noteStartTime = noteData[1];
			if(noteStartTime<time && noteStartTime>=lastTime){
				var note = new Object();
				note.note_start_time = noteStartTime;
				// 音符索引
				var noteIndex = noteData[3];
				note.note_index = noteIndex;
				// 音符时长
				var noteTime = noteData[4];
				note.note_time = noteTime;
				// 声部
				var vIndex = noteData[6];
				note.v_index = vIndex;
				noteArr.push(note);
				// allNoteData.splice(j,1);
			}
		}
		// obj.notes = noteArr;
		
		
		
		var currTimeIndex = timeIndex[i];
		var lineNum = currTimeIndex[0];
		var barIndex = currTimeIndex[1];
		var x = parseFloat((hOff+xCoors[lineNum][barIndex-1]*scale).toFixed(2));
		var y = parseFloat(((lineOffsets[lineNum]+yMins[lineNum])*scale).toFixed(2));
		var w = parseFloat(((xCoors[lineNum][barIndex]-xCoors[lineNum][barIndex-1])*scale).toFixed(2));
		var h = parseFloat(((yMaxs[lineNum]-yMins[lineNum])*scale).toFixed(2));
		// 开始坐标
		var barline_start = new Array();
		barline_start.push(x);
		barline_start.push(y);
		barline_start.push(x);
		barline_start.push(y+h);
		obj.barline_start = barline_start;
		
		// 结束坐标
		var barline_end = new Array();
		barline_end.push(x+w);
		barline_end.push(y);
		barline_end.push(x+w);
		barline_end.push(y+h);
		obj.barline_end = barline_end;
		// 小节序号
		var nodeIndex = findNodeIndex(array,barline_start);
		if(nodeIndex==(-1)){
			obj.node_index = gNodeIndex++;
		}else{
			
			obj.node_index = nodeIndex;
		}
		// 小节节拍数量
		obj.beat = beats[i-1];
		array.push(obj);
		lastTime = time;
	}
	$("#nodelinedata_tmp").val(formatJson(JSON.stringify(array)));
	return formatJson(JSON.stringify(array));
} 

function findNodeIndex(array,barline_start){
	for(var i=0;i<array.length;i++){
		if(array[i].barline_start.toString()==barline_start.toString()){
			return array[i].node_index;
		}
	}
	return -1;
}

// 小节线数据重新索引
function resetNodeLineDataIndex(){
	var content = $("#nodelinedata_tmp").val();
	var lines = JSON.parse(content);
	for(var i=0;i<lines.length;i++){
		lines[i].node_index = i;
	}
	$("#nodelinedata_tmp").val(formatJson(JSON.stringify(lines)));
}
// 获取谱音同步数组
function getPoints(){
	var content = $("#nodelinedata_tmp").val();
	var data = $.parseJSON(content);
	var bars = new Array();
  var last_y = 0;
	for(var i=0;i<data.length;i++){
		var bar = new Object();
		var barline_start = data[i].barline_start;
		var barline_end = data[i].barline_end;
		bar.barline_start = data[i].barline_start;
		bar.barline_end = data[i].barline_end;
		bars.push(bar);
	}
	return bars;
	
}
// 开始预览
/*
 * function startPreview(){ var txt = $("#previewBtn").text(); if(txt=="预览"){
 * var c = document.getElementById("can"); var cxt = c.getContext("2d");
 * cxt.clearRect(0,0, 10000, 10000); //设置数组 s.setArr(getPoints()); var speed =
 * 120; var val = get("Q:"); if(val==null || val==""){ speed==120; }else{ var
 * str = val.split("="); if($("#M").val()!=null && $("#M").val()!=""){ var
 * speedUnit = str[0].split("/")[1]; var speedVal = str[1]; var m =
 * $("#M").val().split("/")[1]; if(m!=null && m!=""){ speed =
 * parseInt(speedVal)*m/speedUnit; } }else{ speed = parseInt(str[1]) } }
 * 
 * s.setSpeedVal(speed); s.stopCallback=function(){ $("#previewBtn").text("预览"); }
 * s.setSpeed(1,$("#M").val().split("/")[0]); $("#previewBtn").text("停止") }else{
 * stopPreview(); } }
 */
// 开始预览
function startPreview(){
	var time = 0;
	// 小节线的x坐标（一行一个数组 ）
	var xCoors = staffData.xs;
	// 每一行y最小值
	var yMins = staffData.ymin;
	// 每一行y最大值
	var yMaxs = staffData.ymax;
	// 每一个小节开始的时间
	var times = staffData.times;
	
	// 小节播放顺序（行号、行内小节号，当前播放重复次数：第一次播放为1，第二次播放为2）time index -> [line_num,
	// bar_index, repcnt]
	var timeIndex = staffData.tixlb;
	// 每小节的拍数
	var beats = staffData.tixbts;
	// 行偏移量
	var lineOffsets = staffData.line_offsets;
	// 当前时间对应的小节索引号
	var currPrevIndex = 0;
	// 上一个小节索引号
	var lastPrevIndex = -1;
	// 当前小节的行列数据
	var currTimeIndex;
	var tInterval = setInterval(function(){
		time+=0.1;
		if(time>times[times.length-1]){
			clearInterval(tInterval);
			$("#candiv").width(0).height(0);
			return;
		}
		for(var i=0;i<times.length;i++){
			if(times[i]>time){
				currPrevIndex = i;
				break;
			}
		}
		if(currPrevIndex!=lastPrevIndex){
			currTimeIndex = timeIndex[currPrevIndex];
			var lineNum = currTimeIndex[0];
			var barIndex = currTimeIndex[1];
			var x = hOff+xCoors[lineNum][barIndex-1]*scale;
			var y = (lineOffsets[lineNum]+yMins[lineNum])*scale;
			var w = (xCoors[lineNum][barIndex]-xCoors[lineNum][barIndex-1])*scale;
			var h = (yMaxs[lineNum]-yMins[lineNum])*scale;
			/*
			 * cxt.clearRect(0,0, 10000, 10000); cxt.fillStyle = "#f0f";
			 * cxt.globalAlpha = 0.3; cxt.fillRect(x, y, w, h);
			 */
		    $("#candiv").width(w).height(h);
		    $("#candiv").css("position","absolute").css("left",x+"px").css("top",y+"px");
		    
		}
		/*
		 * var index = 1; for(var i=0;i<xCoors.length;i++){ for(var j=0;j<xCoors[i].length-1;j++){
		 * //console.log(xCoors[i][j]) var x = hOff+xCoors[i][j]*scale; var y =
		 * (lineOffsets[i]+yMins[i])*scale; var w =
		 * (xCoors[i][j+1]-xCoors[i][j])*scale; var h =
		 * (yMaxs[i]-yMins[i])*scale; $("#candiv").width(w).height(h);
		 * $("#candiv").css("position","absolute").css("left",x+"px").css("top",y+"px");
		 * 
		 * debugger; } }
		 */ 
	},100);
	
}

// 停止预览
function stopPreview(){
	if($("#nodelinedata_tmp").val()==""){
		return;
	}
	if($("#previewBtn").text()=="停止"){
		mystop()
		s.stop()
		$("#previewBtn").text("预览")
	}
	
}
// 鼠标点击小节线编辑区，高亮对应的小节
function lightNode(){
	try {
		var content = $("#nodelinedata_tmp").val();
		var data = $.parseJSON(content);
		if(content==""){
			return;
		}
		var startPos = getStartPos(document.getElementById("nodelinedata_tmp"));
		var start = 0;
		var end = 0;
		for(var i=startPos-1;i>=0;i--){
			var tmp = content.substr(i,1);
			if(tmp=="{"){
				start = i;
				break;
			}
		}
		for(var i=startPos;i<content.length;i++){
			var tmp = content.substr(i,1);
			if(tmp=="}"){
				end = i+1;
				break;
			}
		}
		var str = content.substring(start,end);
	
		var obj = JSON.parse(str);
		var barline_start = obj.barline_start;
		var barline_end = obj.barline_end;
		renderStaff(barline_start,barline_end)
	} catch (e) {
		console.log(e);
	}
}

function renderStaff(point1,point2){
	// 谱子画布
	var x = point1[0];
	var y = point1[1];
	var w = point2[0]-point1[0];
	var h = point1[3]-point1[1];
  
  $("#candiv").width(w).height(h);
  $("#candiv").css("position","absolute").css("left",x+"px").css("top",y+"px");
  document.getElementById("candiv").scrollIntoView(false);
  // $("#candiv").animate({scrollTop:y,scrollLeft:x}, 100);
}
function showIECFrame(){
	$("#IEC_div .modal-content").css("left",($(window).width()-$("#IEC_div .modal-content").width())/2)
	setTimeout(function(){
		$("#iecFrame")[0].contentWindow.setSourceData(); 
	},1000);
}
function getIECData(){
	$("#iecFrame").contents().find("#start").click();
	$("#IEC_div .btn").attr("disabled","disabled");
}
function finishIEC(){
	$("#IEC_div .btn").removeAttr("disabled");
}
function setIECData(){
	$("#iecdata").val($("#iecFrame").contents().find("#iecdata").val());
	// console.log($("#iecdata").val());
	if($.trim($("#iecdata").val())!=""){
		// 没有智能纠错数据
		$("#iecdot").removeClass("gray").addClass("blue").removeAttr("title");
	}
	var url = "/abc/updateAbcInfo?time="+new Date().getTime();
	$.ajax({
      type: "POST",
      url: url,
      data: {"abc_attachid":$("#abc_attachid").val(),"iecdata":$("#iecdata").val()},
      async:false,
      dataType: "json",
      success: function(data){
      	console.log(data)
      }
	})
}
function setNodelineData(){
	$("#nodelinedata").val($("#nodelinedata_tmp").val());
	if($.trim($("#nodelinedata").val())!=""){
		// 没有智能纠错数据
		$("#nodelinedot").removeClass("gray").addClass("blue").removeAttr("title");
	}
	var url = "/abc/updateAbcInfo?time="+new Date().getTime();
	$.ajax({
      type: "POST",
      url: url,
      data: {"abc_attachid":$("#abc_attachid").val(),"nodelinedata":$("#nodelinedata").val()},
      async:false,
      dataType: "json",
      success: function(data){
    	  window.top.alert(data.msg)
      		console.log(data)
      }
	})
}
function renderPaper(){
	$("#N_div .modal-content").width($(window).width()-200);
	$("#N_div .modal-content").css("left",($(window).width()-$("#N_div .modal-content").width())/2);
	var canvas = mergeSvg2Png();
	console.log(canvas.outerHTML)
	svgAsPngUri(canvas, null, function(uri){
		// console.log(uri);
		$("#imgpreview").attr("src",uri);
		$("#picdata").val(uri);
	});
}
function testRender(){
	// 小节线的x坐标（一行一个数组 ）
	var xCoors = staffData.xs;
	// 每一行y最小值
	var yMins = staffData.ymin;
	// 每一行y最大值
	var yMaxs = staffData.ymax;
	// 每一个小节开始的时间
	var times = staffData.times;
	
	// 小节播放顺序（行号、行内小节号，当前播放重复次数：第一次播放为1，第二次播放为2）time index -> [line_num,
	// bar_index, repcnt]
	var timeIndex = staffData.tixlb;
	// 行偏移量
	var lineOffsets = staffData.line_offsets;
	
	
	var index = 1;
	for(var i=0;i<xCoors.length;i++){
		for(var j=0;j<xCoors[i].length-1;j++){
			// console.log(xCoors[i][j])
			var x = hOff+xCoors[i][j]*scale;
			var y = (lineOffsets[i]+yMins[i])*scale;
			var w = (xCoors[i][j+1]-xCoors[i][j])*scale;
			var h = (yMaxs[i]-yMins[i])*scale;
			/*
			 * cxt.clearRect(0,0, 10000, 10000); cxt.fillStyle = "#f0f";
			 * cxt.globalAlpha = 0.3; cxt.fillRect(x, y, w, h);
			 */
		    $("#candiv").width(w).height(h);
		    $("#candiv").css("position","absolute").css("left",x+"px").css("top",y+"px");
		    
		}
	} 
}

// 转调，shift=CD（从C转为D）
function changeZKey(){
	var key = $(".zkey .selected").attr("value");
	var new_key = $(".zkey .selected").text();
	// var kPattern = /K:.*/;
	var k = get("K:");
	var old_k = "C";
	var old_kvalue = "C";
	if(k!=""){
		old_k = k;
	}
	var other_str = "";
	if(k.indexOf(" ")>-1){
		var ksplits = k.split(" ");
		old_k = ksplits[0];
		for(var i=1;i<ksplits.length;i++){
			if(ksplits[i].indexOf("shift")>-1){
				continue;
			}
			other_str = " "+ksplits[i];
		}
	}

	old_kvalue = getStaffOriKey().code;
	// 如果是一样的调，就不加转调标识
	if(old_kvalue!=key){
		shift_key = ""+old_k+" shift="+old_kvalue+key + other_str;
		
	}else{
		shift_key = ""+old_k + other_str;
	}
	if(new_key=="--"){
		shift_key = ""+old_k;
	}
	var content = $("#source").val();
	var lowerOrHigher = getLowerOrHigher();
	var trans_num = getFreCharge("C",new_key,lowerOrHigher);
	writeNumStaff(trans_num)
	set("K:",shift_key);
	src_change();
}
// 生成带预备拍的谱子,在第一个小节前加一个预备拍（这个方法是使用在网页端生成midi文件是对应的abc）
/*
 * function genMetroStaff(sourceid){ var content = $("#"+sourceid).val();
 * content = replaceBlankLine(content); //判断是否是从头开始反复 var start_repeat = false;
 * if(content.indexOf(":|")>-1 && content.indexOf("|:")<0){ start_repeat =
 * true; } var pattern_prog = /\%\%MIDI program.*\n/g; content =
 * $("#"+sourceid).val().replace(/T:.*\n/,"").replace(/C:.*\n/,"").replaceAll(/[\u4e00-\u9fa5]/g,"").replaceAll(/\".*\"/,"");
 * var prog = content.match(pattern_prog);
 * 
 * var prog_str = "%%MIDI program 0"; var v1_pattern = /V:\s{0,}1.*\n/g; var v1 =
 * content.match(v1_pattern); var v1_str = "V:1\n"; if(v1!=null){ v1_str =
 * v1[0]; } if(prog!=null){ prog_str = prog[0]; } var prog_115 = false;
 * if(prog_str.indexOf("%%MIDI program 115")>-1){ prog_115 = true; } //去掉音色设置
 * content = content.replace(/\%\%MIDI program.*\n/,""); //去掉V:1 content =
 * content.replace(/V\:\s{0,}1.*\n/,""); //去掉连音 content =
 * content.replaceAll("-",""); //去掉倚音{/} content =
 * content.replaceAll(/\{.[^\}]*\}/g,""); //增加一个小节做为预备拍---------start var L =
 * get("L:"); var M = get("M:"); var b = 1; var num = 0; if(M==null || M==""){
 * num = 3; }else{ b = parseInt(L.split("/")[1])/parseInt(M.split("/")[1]); num =
 * parseInt(M.split("/")[0]); } //预备拍 var ybp = "z"+(b*num) var lines =
 * content.split("\n"); var newContent = ""; var staff_line_num = 0; var
 * first_line = 0; var metro_lines = ""; //节拍器谱 for(var i=0;i<lines.length;i++){
 * if($.trim(lines[i])==""){ continue; }
 * if(lines[i].replace(/\{.[^\}]*\}/,"").indexOf("|")>-1){ staff_line_num++;
 * if(first_line==0){ first_line = i; for(var k=0;k<num;k++){ metro_lines +=
 * "A"+b+" "; } if(start_repeat){ metro_lines = metro_lines + "|:" }else{
 * metro_lines = metro_lines + "|" } } metro_lines = metro_lines + lines[i]
 * .replaceAll(/[a-gA-G]/,"z") .replaceAll(/\[.*\]/,"z") .replaceAll(",","")
 * .replaceAll("'","") .replaceAll("^","") .replaceAll("_","")
 * .replaceAll("=","")+"\n"; } // if(staff_line_num==1){ //第一行谱子 //加上V:1标识
 * if(prog_115){ //本来已经是木鱼声，则直接加一个小节就好 var firstnode = ""; for(var k=0;k<num;k++){
 * firstnode += "A"+b+" "; } ybp = firstnode; } newContent = newContent+v1_str;
 * if(start_repeat){ newContent += ybp+"|:"+lines[i]+"\n"; }else{ newContent +=
 * ybp+"|"+lines[i]+"\n"; } }else{ newContent += lines[i]+"\n"; } }
 * if(prog_115){ newContent = newContent +"%%MIDI program 115"; var reg =
 * /\n(\n)*( )*(\n)*\n/g; newContent = newContent.replace(reg,"\n");
 * console.log(newContent); return newContent; } //增加一个小节做为预备拍---------end //
 * 
 * //增加第一小节节拍器 //V:2 //A A A A | //%%MIDI program 115 var jpq = "V:2\n"; jpq =
 * jpq+metro_lines; jpq += "%%MIDI program 115\n"; lines =
 * newContent.split("\n"); var result = ""; for(var i=0;i<lines.length;i++){
 * if(lines[i].replaceAll(" ","").indexOf("V:1")>-1){ result += jpq +
 * lines[i]+"\n" }else{ if(lines[i]!="" && lines[i]!="\n"){ result += lines[i] +
 * "\n"; } if(i==(lines.length-1)){ //result += lines[i]; }else{ } } } result +=
 * prog_str; var reg = /\n(\n)*( )*(\n)*\n/g; result = result.replace(reg,"\n");
 * console.log(result) $("#source-gen-midi").val(result); return result; }
 */ 
// 生成带预备拍的谱子,在第一个小节前加一个预备拍（这个方法是使用abc2midi生成midi文件是对应的abc）
function genMetroStaff(sourceid){
	var content = $("#"+sourceid).val();
	content = replaceBlankLine(content);
	// 判断是否是从头开始反复
	var start_repeat = false;
	if(content.indexOf(":|")>-1 && content.indexOf("|:")<0){
		start_repeat = true;
	}
	var pattern_prog = /\%\%MIDI program.*\n/g;
	content = $("#"+sourceid).val().replace(/T:.*\n/,"").replace(/C:.*\n/,"").replaceAll(/[^\x00-\xff]/g,"").replaceAll(/\".*\"/,"");
	var prog = content.match(pattern_prog);
	
	var prog_str = "%%MIDI program 0";
	var v1_pattern = /V:\s{0,}1.*\n/g;
	var v1 = content.match(v1_pattern);
	var v1_str = "V:1\n";
	if(v1!=null){
		v1_str = v1[0];
	}
	if(prog!=null){
		prog_str = prog[0];
	}
	var vL = new Array();
	// 有多个L的声明
	if(content.split("L:").length>2){
		var vLPattern = /V:.[^V:]*\nL:.*/g; 
		var vLResult = content.match(vLPattern);
		if(vLResult!=null){
			for(var i=0;i<vLResult.length;i++){
				var str = vLResult[i].split("\n");
				var obj = new Object();
				obj.v = str[0].replaceAll(" ","").match(/V:[0-9]{1,2}/)[0];
				obj.L = str[str.length-1].match(/[1-9]\/[1-9]{1,2}/)[0];
				vL.push(obj);
			}
		}
	}
	console.log(vL)
	// 判断原来是不是已经是木鱼声
	var prog_115 = false;
	if(prog_str.indexOf("%%MIDI program 115")>-1){
		prog_115 = true;
	}
	// 去掉音色设置
	// content = content.replace(/\%\%MIDI program.*\n/,"");
	// 去掉V:1
	// content = content.replace(/V\:\s{0,}1.*\n/,"");
	// 去掉连音
	// content = content.replaceAll("-","");
	// 去掉倚音{/}
	// content = content.replaceAll(/\{.[^\}]*\}/g,"");
	// 增加一个小节做为预备拍---------start
	var L = get("L:");
	var M = get("M:");
	var b = 1;
	var num = 0;
	if(M==null || M==""){
		num = 3;
	} else {
		b = parseInt(L.split("/")[1])/parseInt(M.split("/")[1]);
		num = parseInt(M.split("/")[0]);
	}
	// 预备拍
	var ybp = "z"+(b*num);
	var lines = content.split("\n");
	var newContent = "";
	var staff_line_num = 0;
	var first_line = 0;
	// 新生成的节奏声部
	var metro_lines = "";
	var v = 0;
	var vLen = content.split("V:").length;
	var lastV = "";
	var lastL = "";
	var v9L = L;
	var addMetroFlag = false;
	// 是否使用单独的声部的L配置
	var userSelfL = false;
	// 节拍器谱
	for(var i=0;i<lines.length;i++){
		if($.trim(lines[i])==""){
			continue;
		}
		
		userSelfL = false;
		if(lines[i].indexOf("V:")>-1){
			if(metro_lines!=""){
				v++;
				staff_line_num = 0;
				// first_line = 0;
				
			}
			
			// 不同的声部使用了不同的单位L，对要取相应的声部的L的配置
			lastV = lines[i].replaceAll(" ","").match(/V:[1-9]/)[0];
			
			if(vL!=null && vL.length>0){
				for(var j=0;j<vL.length;j++){
					// V：9的单位 设置
					if(vL[j].v.replaceAll(" ","")=="V:1"){
						v9L = vL[j].L;
					}
					if(vL[j].v==lastV){
						userSelfL = true;
						if(M==null || M==""){
						} else {
							lastL = vL[j].L;
							b = parseInt(lastL.split("/")[1])/parseInt(M.split("/")[1]);
							num = parseInt(M.split("/")[0]);
						}
						break;
					}
				}
				if(!userSelfL){
					if(M==null || M==""){
					} else {
						b = parseInt(L.split("/")[1])/parseInt(M.split("/")[1]);
						num = parseInt(M.split("/")[0]);
					}
				}
			}
			ybp = "z"+(b*num);
		}
		// 谱子行
		if(lines[i].replace(/\[.[^\]]*\]/,"").replace(/\{.[^\}]*\}/,"").indexOf("|")>-1 && lines[i].indexOf("w:")<0){
			staff_line_num++;
			
			// 有多个声部时，只参考第一个声部生成节奏声部
			if(vLen>1){
				if(v==0){
					addMetroFlag = true;
				}else{
					addMetroFlag = false;
				}
			}else{
				addMetroFlag = true;
			}
			
			// 第一行加上预备拍
			if(first_line==0){
				first_line = i;
				for(var k=0;k<num;k++){
					if(b=="1"){
						
						metro_lines += "A"+" ";
					}else{
						metro_lines += "A"+b+" ";
						
					}
				}
				if(start_repeat){
					metro_lines = metro_lines + "|:"
				}else{
					metro_lines = metro_lines + "|"
				}
			}
			
			// 这里主要防止多个声部重复添加节奏谱，有多个声部的谱子，只要添加一次节奏谱就可以了
			if(addMetroFlag){
				
				metro_lines = metro_lines + lines[i]
												.replaceAll(/[a-gA-G]/,"z")
												.replaceAll(/\[.[^\:][^\]]*\]/,"z")
												.replaceAll(",","")
												.replaceAll("'","")
												.replaceAll("\\^","")
												.replaceAll("\\_","")
												.replaceAll("-","")
												.replaceAll("\\(","")
												.replaceAll("\\)","")
												.replaceAll(/\!.[^\!]*\!/g,"")
												.replaceAll(/\{.[^\}]*\}/g,"")
												.replaceAll(/\[V:.[^\]]*\]/g,"")
												.replaceAll("\\>","")
												.replaceAll("\\<","")
												.replaceAll("=","")+"\n";
			}
		}
		//
		if(staff_line_num==1 && lines[i].indexOf("w:")<0){
			// 第一行谱子
			if(prog_115){
				// 本来已经是木鱼声，则直接加一个小节就好
				var firstnode = "";
				for(var k=0;k<num;k++){
					firstnode += "A"+b+" ";
				}
				ybp = firstnode;
			}
			if(v1==null){
				newContent =  newContent+v1_str;
			}
			// newContent = newContent+v1_str;
			// 取出行内有[V:1]这样的声明的，放到最前面
			var lineV = "";
			if(lines[i].indexOf("V:")>-1){
				var vPattern = /\[V:.[^\]]*\]/;
				var vResult = lines[i].match(vPattern);
				if(vResult!=null){
					lineV = vResult[0];
				}
			}
			
			if(start_repeat){
				newContent += lineV + ybp + "|:"+lines[i].replace(lineV,"")+"\n";
			}else{
				newContent += lineV + ybp+"|"+lines[i].replace(lineV,"")+"\n";
			}
		}else{
			var line = lines[i];
			if(line.indexOf("w:")>-1){
				continue;
			}
			// 增加第9个声部
			if(line.indexOf("%%staves")>-1){
				/*
				 * if(line.indexOf("]")>-1){ line = line.replace("]"," | 9]");
				 * }else{ line = line + " 9"; }
				 */
				line = line + " 9";
			}
			if(line.indexOf("%%score")>-1){
				/*
				 * if(line.indexOf("]")>-1){ line = line.replace("]"," | 9]");
				 * }else{ line = line + " 9"; }
				 */
				line = line + " 9";
			}
			newContent += line+"\n";
		}
	}
	// 如果本来就是木鱼，替换空行后返回
	if(prog_115){
		// newContent = newContent +"%%MIDI program 115";
		var reg = /\n(\n)*( )*(\n)*\n/g; 
		newContent = newContent.replace(reg,"\n"); 
		console.log(newContent);
		return newContent;
	}
	// 增加一个小节做为预备拍---------end
	// 
	
	// 增加第一小节节拍器
	// V:2
	// A A A A |
	// %%MIDI program 115
	var jpq = "V:9\n";
	jpq += "L:"+v9L+"\n";
	jpq += "%%MIDI program 115\n";
	jpq = jpq+metro_lines;
	result = newContent+jpq;
	/*
	 * lines = newContent.split("\n"); var result = ""; for(var i=0;i<lines.length;i++){
	 * if(lines[i].replaceAll(" ","").indexOf("V:1")>-1){ result += jpq +
	 * lines[i]+"\n" }else{ if(lines[i]!="" && lines[i]!="\n"){ result +=
	 * lines[i] + "\n"; } if(i==(lines.length-1)){ //result += lines[i]; }else{ } } }
	 * result += prog_str;
	 */
	var reg = /\n(\n)*( )*(\n)*\n/g; 
	result = result.replace(reg,"\n").replaceAll("nm=","").replaceAll("\\$",""); 
	// console.log(result)
	$("#source-gen-midi").val(result);
	return result;
}
function playSelected(){
	var newstaff = genSelect("source");
}
// 根据选中的谱子生成新的谱子
function genSelect(sourceid){
	var st = getSelectText(sourceid);
	var startPos = getStartPos(document.getElementById(sourceid));
	var content = $("#"+sourceid).val();
	// 判断前一个是否是（号
	var t1 = content.substr(startPos-1,1);
	// 判断后一个是否是）号
	var t2 = content.substr(startPos+st.length,1);
	var lines = content.split("\n");
	var newstaff = "";
	var header = "";
	for(var i=0;i<lines.length;i++){
		var line = lines[i];
		if(line.indexOf("|")<0){
			header += line + "\n";
		}
	}
	// 前面一个字符如果是(号，则加上
	if(t1=="("){
		st = t1 + st;
	}
	// 后面一个字符如果是)号,则加上
	if(t2 == ")"){
		st = st + t2;
	}
	newstaff = header + st;
	// console.log(newstaff);
	return newstaff;
}

function openRhythm(){
	$("#RHYTHM_div .modal-content").width($(window).width()-200).height($(window).height()-100);
	$("#RHYTHM_div .modal-content").css("left",($(window).width()-$("#RHYTHM_div .modal-content").width())/2);
	$("#rhythmFrame").height($("#RHYTHM_div .modal-content").height()-140);
	var result = convert2Rhythm('source');
	result = result.replace("%%showcm","")
	$("#rhythmFrame")[0].contentWindow.setSourceData(result); 
}

function changeScale(val){
	var old_val = $("#scale_control").val();
	var new_val = parseFloat(old_val)+val;
	$("#scale_control").val(new_val);
	$("#scale_control").change();
}

function changeMode(val,remove){
	return;//这里不做电脑/手机模式切换了 add by hxs;
	$("#pictype").val(val);
	var content = $("#source").val();
	var currClass = $('.' + val).attr("class");
	
	// 如果已经是选中状态，则取消选中状态
	if(currClass.indexOf("active")>-1 && remove){
		$('.compute-mobile-change > div').removeClass('active');
		content = content.replace(/%%pagewidth.*\n/,"");
		$("#source").val(content);
		src_change();
		return;
	}else if(currClass.indexOf("active")>-1 && !remove){
		return;
	}
	$('.compute-mobile-change > div').removeClass('active');
	$('.' + val).addClass('active');
	var pagewidth=0;
	if(val=="compute"){
		pagewidth = computerPageWidth;
		scale = 1.6;
	}else if(val=="mobile"){
		pagewidth = mobilPageWidth;
		scale = 1.4;
	}
	
	
	if(content.indexOf("leftmargin")<0){
		content = "%%leftmargin 2\n" + content;
	}
	if(content.indexOf("rightmargin")<0){
		content = "%%rightmargin 10\n" + content;
	}
	if(content.indexOf("MIDI program")<0){
		content = "%%MIDI program 0\n" + content;
	}
	if(content.indexOf("pagewidth")>-1){
		content = content.replace(/%%pagewidth.*\n/,"%%pagewidth "+pagewidth+"\n");
	}else{
		content = "%%pagewidth " + pagewidth + "\n" + content;
	}
	$("#source").val(content);
	src_change();
}

/**
 * 在键盘上打上简谱 transport 转调偏移量
 */
function writeNumStaff(transport){
	$(".key-note-white").remove();
	$("#pianoKeysWhite .key").each(function(idx,val){
		var group = $(this).parent().attr("group");
		var index = $(this).index();
		var note = getNoteByKey(group,index);
		var i = findIndexByNote(note);
		var numStaff = findNumStaffByIndex(i-transport);
		// 音符个数
		var noteCount = numStaff.split(":").length;
		var pattern = /(\,)|(\')/g;
		var result = numStaff.match(pattern);
		// 中音区
		var type = "m";
		if(numStaff.indexOf(",")>-1){
			// 低音
			type = "b";
		}else if(numStaff.indexOf("'")>-1){
			// 高音
			type = "t";
		}
		// 简谱记号
		var num = numStaff.replaceAll(/(\^)|(\_)|(\,)|(\')/g,"");
		var n = 0;
		if(result!=null){
			n = result.length;
		}
		var str;
		if(noteCount==1){
			// 只有一个的时候在中间
			str = "<div class='key-note-white'>";
			str += "<div class='key-note-white-mid key-note-val' val=\""+numStaff+"\">" + num;
			if(type=="b"){
				// 低音区
				str +=  "<i class='dot-b-" + n + "' />";
			}else{
				str +=  "<i class='dot-t-" + n + "' />";
			}
			str += "</div>";
		}else if(noteCount>1){
			if(type=="b"){
				// 低音区
				// 整体白键偏上
				if(n <= 2){
					str = "<div class='key-note-white'>";
				}else{ // 点点超过2个的再做偏移
					str = "<div class='key-note-white white-top'>";
				}
				var r = "";
				var d = "";
				if(numStaff.split(":")[0].indexOf("^^")>-1){
					r = "note-rise2";
				}else if(numStaff.split(":")[0].indexOf("^")>-1){
					r = "note-rise";
				}
				if(numStaff.split(":")[1].indexOf("__")>-1){
					d = "note-down2";
				}else if(numStaff.split(":")[1].indexOf("_")>-1){
					d = "note-down";
				}
				// 打点个数
				var num1Length = 0;
				if(numStaff.split(":")[0].match(pattern)!=null){
					num1Length = numStaff.split(":")[0].match(pattern).length;
				}
				var num2Length = 0;
				if(numStaff.split(":")[1].match(pattern)!=null){
					num2Length = numStaff.split(":")[1].match(pattern).length;
				}
				str += "<div class='key-note-white-top key-note-val' val=\""+numStaff.split(":")[0]+"\">" + num.split(":")[0] + "<i class='"+r+"' /><i class='dot-b-" + num1Length + "'/></div>";
				str += "<div class='key-note-white-bottom key-note-val' val=\""+numStaff.split(":")[1]+"\">" + num.split(":")[1] + "<i class='"+d+"' /><i class='dot-b-" + num2Length + "' /></div>";		
			}else{
				if(n <= 2){
					str = "<div class='key-note-white'>";
				}else{ // 点点超过2个的再做偏移
					str = "<div class='key-note-white white-bottom'>";
				}
				var r = "";
				var d = "";
				if(numStaff.split(":")[0].indexOf("^^")>-1){
					r = "note-rise2";
				}else if(numStaff.split(":")[0].indexOf("^")>-1){
					r = "note-rise";
				}
				if(numStaff.split(":")[1].indexOf("__")>-1){
					d = "note-down2";
				}else if(numStaff.split(":")[1].indexOf("_")>-1){
					d = "note-down";
				}
				// 打点个数
				var num1Length = 0;
				if(numStaff.split(":")[0].match(pattern)!=null){
					num1Length = numStaff.split(":")[0].match(pattern).length;
				}
				var num2Length = 0;
				if(numStaff.split(":")[1].match(pattern)!=null){
					num2Length = numStaff.split(":")[1].match(pattern).length;
				}
				str += "<div class='key-note-white-top key-note-val' val=\""+numStaff.split(":")[0]+"\">" + num.split(":")[0] + "<i class='"+r+"' /><i class='dot-t-" + num1Length + "' /></div>";
				str += "<div class='key-note-white-bottom key-note-val' val=\""+numStaff.split(":")[1]+"\">" + num.split(":")[1] + "<i class='"+d+"' /><i class='dot-t-" + num2Length + "' /></div>";		
			}
		}
		
		str += "</div>";
		$(this).append(str);
	});
	$(".key-note-black").remove();
	$("#pianoKeysBlack .key").each(function(idx, val){
		var group = $(this).parent().attr("group");
		var index = $(this).index();
		var note = getNoteByKey(group,index);
		/*
		 * if(group=="B4" || group=="B5"){ debugger; }
		 */
		var i = findIndexByNote(note);
		var numStaff = findNumStaffByIndex(i-transport);
		// 音符个数
		var noteCount = numStaff.split(":").length;
		var pattern = /(\,)|(\')/g;
		var result = numStaff.match(pattern);
		// 中音区
		var type = "m";
		if(numStaff.indexOf(",")>-1){
			// 低音
			type = "b";
		}else if(numStaff.indexOf("'")>-1){
			// 高音
			type = "t";
		}
		// 简谱记号
		var num = numStaff.replaceAll(/(\^)|(\_)|(\,)|(\')/g,"");
		var n = 0;
		if(result!=null){
			n = result.length;
		}
		var str;
		if(noteCount==1){
			str = "<div class='key-note-black'>";
			str += "<div class='key-note-black-mid key-note-val' val=\""+numStaff+"\">" + num ;
			if(type=="b"){
				// 低音区
				str +=  "<i class='dot-b-" + n + "' />";
			}else{
				str +=  "<i class='dot-t-" + n + "' />";
			}
			str += "</div>";
		}else if(noteCount>1){
			if(type=="b"){
				// 低音区
				// 整体黑键偏上
				if(n <= 2){
					str = "<div class='key-note-black'>";
				}else{ // 点点超过2个的再做偏移
					str = "<div class='key-note-black black-top'>";
				}
				
				var r = "";
				var d = "";
				if(numStaff.split(":")[0].indexOf("^^")>-1){
					r = "note-rise2";
				}else if(numStaff.split(":")[0].indexOf("^")>-1){
					r = "note-rise";
				}
				if(numStaff.split(":")[1].indexOf("__")>-1){
					d = "note-down2";
				}else if(numStaff.split(":")[1].indexOf("_")>-1){
					d = "note-down";
				}
				// 打点个数
				var num1Length = 0;
				if(numStaff.split(":")[0].match(pattern)!=null){
					num1Length = numStaff.split(":")[0].match(pattern).length;
				}
				var num2Length = 0;
				if(numStaff.split(":")[1].match(pattern)!=null){
					num2Length = numStaff.split(":")[1].match(pattern).length;
				}
				str += "<div class='key-note-black-sub key-note-black-top key-note-val' val=\""+numStaff.split(":")[0]+"\">" + num.split(":")[0] + "<i class='"+r+"' /><i class='dot-b-" + num1Length + "' /></div>";
				str += "<div class='key-note-black-sub key-note-black-bottom key-note-val' val=\""+numStaff.split(":")[1]+"\">" + num.split(":")[1] + "<i class='"+d+"' /><i class='dot-b-" + num2Length + "' /></div>";		
			}else{
				// 整体黑键偏下
				if(n <= 2){
					str = "<div class='key-note-black'>";
				}else{ // 点点超过2个的再做偏移
					str = "<div class='key-note-black black-bottom'>";
				}
				var r = "";
				var d = "";
				if(numStaff.split(":")[0].indexOf("^^")>-1){
					r = "note-rise2";
				}else if(numStaff.split(":")[0].indexOf("^")>-1){
					r = "note-rise";
				}
				if(numStaff.split(":")[1].indexOf("__")>-1){
					d = "note-down2";
				}else if(numStaff.split(":")[1].indexOf("_")>-1){
					d = "note-down";
				}
				// 打点个数
				var num1Length = 0;
				if(numStaff.split(":")[0].match(pattern)!=null){
					num1Length = numStaff.split(":")[0].match(pattern).length;
				}
				var num2Length = 0;
				if(numStaff.split(":")[1].match(pattern)!=null){
					num2Length = numStaff.split(":")[1].match(pattern).length;
				}
				str += "<div class='key-note-black-sub key-note-black-top key-note-val' val=\""+numStaff.split(":")[0]+"\">" + num.split(":")[0] + "<i class='"+r+"' /><i class='dot-t-" + num1Length + "' /></div>";
				str += "<div class='key-note-black-sub key-note-black-bottom key-note-val' val=\""+numStaff.split(":")[1]+"\">" + num.split(":")[1] + "<i class='"+d+"' /><i class='dot-t-" + num2Length + "' /></div>";
			}
		}
		
		str += "</div>"
		$(this).append(str);
	}); 
	$(".key-note-val").mousedown(function(){
		currJpVal = $(this).attr("val");
	});
}
// 选中/取消选中保存的文件
function selectspeedoption(obj){
	$(obj.previousSibling).prop("checked",!$(obj.previousSibling).prop("checked"));
}
function openSpeedFile(){
	$("#SAVE_div .modal-content").css("left",($(window).width()-$("#SAVE_div .modal-content").width())/2);
	
	var Q = get("Q:");
	$("input[name='filespeed']").val($.trim(Q.split("=")[1]));
	$("input[saved='1']").attr("saved","0");
}
// 添加不同速度的选项
function speedPress(speed){
	var e = event || window.event || arguments.callee.caller.arguments[0];
	if(e.keyCode==13 ){
		addSpeedFile(speed);
	}
}

function addSpeedFile(speed){
	if($("input[name='demospeedinput'][value='"+speed+"']").length>0){
		// window.top.alert("已经存在同样的速度["+speed+"]配置")
		return;
	}
	var demo = $("#demospeed").html();
	demo = demo.replace("speedval",speed);
	$("#addspeeds").html($("#addspeeds").html()+demo);
	$("#spinput").val("");
}

// 简谱输入(输入的数字直接会转为对应的音名，如果要输入时值，则用*2)
function numstaffpress(){
	var notes = ["C","D","E","F","G","A","B"];
	var tmps = [{"1":"一"},{"2":"二"},{"3":"三"},{"4":"四"},{"5":"五"},{"6":"六"},{"7":"七"},{"8":"八"},{"9":"九"}];
	var pattern = /(\#)?(\_)?[1-7](\,)?(\')?(\/)?(\+)?(\-)?/;
	var tmp_pattern = /\*[1-9]/g;
	var num_pattern = /[1-7]/g;
	var tmp_pattern2 = /[一二三四五六七八九]/g;
	var convert_pattern = /(C')|(D')|(E')|(F')|(G')|(A')|(B')/g;
	var e = event || window.event || arguments.callee.caller.arguments[0];
	var val = $("#numstaffinput").val();
	if(e.keyCode==13 ){
		val = val.replaceAll("0","z").replaceAll("#","^");
		val = val.replace(tmp_pattern,function(m,p1,p2,p3){
			var index = m.replace("\*","");
			return tmps[parseInt(index)-1][index]
			
		});
		val = val.replace(num_pattern,function(m,p1,p2,p3){return notes[parseInt(m)-1]});
		val = val.replace(tmp_pattern2,function(m,p1,p2,p3){
			// console.log(m)
			for(var i=0;i<tmps.length;i++){
				if(tmps[i][i+1]==m){
					return i+1;
				}
			}
		});
		if(val==""){
			val = "\n";
		}
		if(val && val!="undefined" && val != undefined){
			$("#source").val($("#source").val()+val);
		}
		var content = $("#source").val();
		// 这里要把C'替换为c
		content = content.replace(convert_pattern,function(m,p1,p2,p3){
			return m.replace("'","").toLowerCase();
		});
		$("#source").val(content);
		// 自动增加小节线
		// autoNodeLine();
		abc_change();
		$("#numstaffinput").val("");
	}
}
// 改变速度类型为整个谱
function changestaffspeed(){
	$("#QC_div .modal-content").css("left",($(window).width()-$("#QC_div .modal-content").width())/2).css("top",100);
	$("#speedtype").val("staff");
	setSpeedSelected()
}
// 打开移调窗口
function openZDiv(){
	$("#Z_div .modal-content").css("left",($(window).width()-$("#Z_div .modal-content").width())/2).css("top",100);
}
// 删除速度
function removeme(obj){
	$(obj).parent().remove();
}


// 生成不同速度的图片和音频
function genFileBySpeed(speed){
	maskFullTxt("正在生成速度为"+speed+"的文件")
	var content = $("#source").val();
	var q_pattern = /Q:.*\n/;
	var qresult = content.match(q_pattern);
	if(qresult!=null){
		var oldstr = qresult[0];
		var qstr = oldstr.substr(0,oldstr.indexOf("=")+1)+speed+"\n";
		content = content.replace(oldstr,qstr);
	}
	$("#source-speed").val(content);
	$("#paper-speed").css("display","");
	
	
	
	
	/*
	 * new ABCJS.Editor("source-speed", { canvas_id: "paper-speed", abcjsParams:
	 * {staffwidth:staffwidth,scale:staffscale,paddingright:5,paddingleft:5} });
	 * 
	 * //生成midi，这里要去掉标题和作曲/中文 //ABCJS.renderMidi("midi-download",
	 * $("#source").val().replace(/T:.*\n/,"").replace(/C:.*\n/,"").replaceAll(/[\u4e00-\u9fa5]/g,""), {
	 * generateDownload: true, generateInline: false });
	 * if($("#source-speed").val().indexOf("V:2")>-1){
	 * ABCJS.renderMidi("midi-download-speed",
	 * $("#source-speed").val().replace(/T:.*\n/,"").replace(/C:.*\n/,"").replaceAll(/[\u4e00-\u9fa5]/g,""), {
	 * generateDownload: true, generateInline: false }); }else{
	 * ABCJS.renderMidi("midi-download-speed", genMetroStaff("source-speed"), {
	 * generateDownload: true, generateInline: false }); }
	 * setTimeout(function(){
	 * 
	 * var canvas = $($("#paper-speed").html().replace('#ff0000','#000000'))[0];
	 * //saveSvgAsPng(canvas, 'test.png'); svgAsPngUri(canvas, null,
	 * function(uri){ $("#picdata-speed").val(uri);
	 * 
	 * //判断是否要覆盖原来的mp3文件 //checkOverwrite(); saveSpeedFile(speed);
	 * $("#paper-speed").css("display","none"); }); },100);
	 * console.log("outer.................")
	 */
}


function saveSpeedFile(speed){
	var url = "/abc/uploadSpeedFile?time="+Date.parse(new Date());
	$("#speed").val(speed);
	// 提交midi数据
	var form = new FormData(document.getElementById("abcform"));
	var blob = dataURItoBlob($("#midi-download-speed a").attr("href"));
	form.append("midiFile", blob);
	$.ajax({
    type: "POST",
    url: url,
    data: form,
    cache: false,
    async: false,
    processData: false,
    contentType: false,
    success: function(data){
  	  if(data.indexOf("成功")>-1){
  		  $("input[name='demospeedinput'][value='"+speed+"']").attr("saved","1");
  	      $(".loading,.loading-box").remove();
  	      saveOtherSpeedFile();
  	  }else{
  		  window.top.alert("保存速度为<"+speed+">时失败。");
  	  }
    	
		},
    error: function (message) {
    	$(".loading,.loading-box").remove();
        window.top.alert("保存失败");
    }
});
}

// 保存其它速度文件
function saveOtherSpeedFile(){
	// 获取用户添加的其它速度文件
	var speeds = new Array();
	var speedinputs = $("input[name='demospeedinput'][value!='speedval'][saved='0']");
	// console.log($(speedinputs[0]).val());
	 if(speedinputs.length>0){
		genFileBySpeed($(speedinputs[0]).val());
	}
}
// 切换简谱和五线谱时值、休止符表示法
function changeRestType(){
	$.each($(".jp_note"),function(i,item){
		var src = $(item).attr("src");
		if(src.indexOf("_j")>-1){
			$(item).attr("src",src.replace("_j.png",".png"));
		}else{
			$(item).attr("src",src.replace(".png","_j.png"));
			
		}
	})
	bindMenuEvent();
}
// 改变谱表
function changeStaffNum(){
//	var staffType = $("#STAFFTYPE").val();
//	if(staffType=="1"){
//		$("#source").val(defstr);
//		abc_change();
//		
//	}else if(staffType=="2"){
//		$("#source").val(defstr2);
//		abc_change();
//	}
	var num = $("#STAFFNUM").val();
	
}
function openPreviewPic(){
	$("#PREVIEWPIC_div .modal-content").width($(window).width()-200).height($(window).height()-120);
	$("#PREVIEWPIC_div .modal-content").css("left",($(window).width()-$("#PREVIEWPIC_div .modal-content").width())/2);
	$("#picpreview_paper_div").height($("#PREVIEWPIC_div .modal-content").height()-120);
	$("#picpreview_pic_div").height($("#PREVIEWPIC_div .modal-content").height()-120);
	$("#abc").val($("#source").val())
	//
	$("#picpreview_paper_div").html("");
	$("#picpreview_paper_div").append($($("#target").html()));
}


function setSpeedValue(obj,valueid){
	if($(obj).val()==""){
		return;
	}
	$("#"+valueid).val($(obj).val());
	if(valueid=="Q_V"){
		$("#Q").change();
	}
}
// 显示隐藏简谱符号
function switchSimpleStaff(){
	$(".key-note-val").toggle();
}


// 设置宽度
var lastScale = scale;
function setPageWidth(sourceid){
	return;
	var content = $("#"+sourceid).val();
	var pageWidthPattern = /pagewidth\s+(\d+[.\d+]{0,})?/;
	var pageWidths = content.match(pageWidthPattern);
	var pageWidthStr = "";
	var pageWidth = computerPageWidth;
	if(pageWidths!=null){
		pageWidthStr = pageWidths[0];
		pageWidth = $.trim(pageWidthStr.replace("pagewidth",""));
	}
	if(pageWidthStr!=""){
		if(lastScale < scale){
			content = content.replace(pageWidthStr,pageWidthStr.replace(pageWidth,parseInt(pageWidth)*scale))
		}else if(lastScale > scale){
			content = content.replace(pageWidthStr,pageWidthStr.replace(pageWidth,parseInt(pageWidth)/scale))
		}
		$("#"+sourceid).val(content);
	}
	lastScale = scale;
}
// 查询我的谱例
function showMyStaff(){
	
	$("#MY_STAFF_div .modal-content").css("left",($(window).width()-$("#MY_STAFF_div .modal-content").width())/2);
	$('#MY_STAFF_div').modal('toggle');
	var personId = $("#personid").val();
	if(personId==""){
		return false;
	}
	//$("#staffListIframe")[0].contentWindow.listMyAbc(personId,file_server_url);
	//$("#staffListIframe")[0].contentWindow.listMyAbcTypes(personId,file_server_url);
	
	$("#staffListIframe")[0].contentWindow.listMyAbcTypes(personId,file_server_url);
//	$("#staffListIframe")[0].contentWindow.listMyAbc(personId,"https://localhost/file");
}

// 加载选中的谱例
function reloadStaff(groupid){
	$("#groupid").val(groupid);
	loadFileByGroupid();
	$('#MY_STAFF_div').modal('hide');
}

// 改变音高
function changeYG(key,radioName){
	if(!radioName || radioName==null){
		radioName = "doPos";
	}
	// var key = $("#K").val();
	if(key==null || key==""){
		return;
	}
	var content = $("#source").val();
	var val = $("input[name='"+radioName+"']:checked").val();
	// %%keydefined C=higher,Bb=lower
	var pattern = /%%keydefined\s(.*)\n/;
	var matchs = content.match(pattern);
	if(matchs==null){
		content = "%%keydefined "+key+"="+val+"\n"+content;
	}else{
		content = content.replace(matchs[0],"");
		var keydefined = "";
		var str = matchs[1];
		var arr = str.split(",");
		var exist = false;
		for(var i=0;i<arr.length;i++){
			var k = arr[i].split("=")[0];
			if(k==key){
				keydefined +="," + k + "=" + val;
				exist = true;
			}else{
				keydefined +="," + arr[i];
			}
		}
		if(!exist){
			content = "%%keydefined "+key+"="+val+","+keydefined.substr(1)+"\n"+content;
		} else {
			content = "%%keydefined "+keydefined.substr(1)+"\n"+content;
		}
	}
	$("#source").val(content);
	
	var trans_num = getFreCharge("C",key,val);
	writeNumStaff(trans_num);
	src_change();
}

function changePianoBoard(sourceid,key){
	var pattern = /%%keydefined\s(.*)\n/;
	var content = $("#"+sourceid).val();
	var matchs = content.match(pattern);
	
	if(matchs==null){
		return;
	}else{
		content = content.replace(matchs[0],"");
		var keydefined = "";
		var str = matchs[1];
		var arr = str.split(",");
		var highOrLower = "";
		for(var i=0;i<arr.length;i++){
			var k = arr[i].split("=")[0];
			if(k==key){
				highOrLower = arr[i].split("=")[1];
				var trans_num = getFreCharge("C",key,highOrLower);
				writeNumStaff(trans_num);
			}
		}
	}
	
	
}

function setDoPosition(){
	var content = $("#source").val();
	if(content==""){
		return;
	}
	var pattern = /%%keydefined\s(.*)\n/;
	var matchs = content.match(pattern);
	if(matchs==null || matchs.length==0){
		var lowerOrHigher = getLowerOrHigher();
		$("input[name='doPos'][value='"+lowerOrHigher+"']").prop("checked","checked");
		changeYG(getKByPos("source"));
	}
	
}
// 根据光标位置取到相应的k的值
function getKByPos(source){
	var content = $("#"+source).val();
	var selectText = getSelectText("source");
	var lastSelectNoteSeq = 0;
	var clsPattern = /\_([0-9]*)\_/;
	if(selectText!="") {
		$.each($(".abcr"),function(i,item){
			var style = $(item).css("fill-opacity");
			if(style!=0){
				var cls = $(item).attr("class");
				var matchs = cls.match(clsPattern);
				if(matchs!=null){
					var p = matchs[1];
					if(lastSelectNoteSeq < parseInt(p)){
						lastSelectNoteSeq = parseInt(p);
					}
				}
			}
		});
	} else {
		lastSelectNoteSeq = content.length;
	}
	var subStr = content.substr(0,lastSelectNoteSeq);
	var kPattern = /K:\s*([a-zA-Z#]{1,3})/g;
	var kPattern2 = /K:\s*([a-zA-Z#]{1,3})/;
	var kMatchs = subStr.match(kPattern);
	var lastK = "";
	var lastKValue = "";
	if(kMatchs!=null){
		lastK = kMatchs[kMatchs.length-1];
		lastKValue = lastK.match(kPattern2)[1];
	}
	return lastKValue;
	
}
function getLowerOrHigher(){
	var content = $("#source").val();
	var pattern = /%%keydefined\s(.*)\n/;
	var lowerOrHigher = content.match(pattern);
	var key = $("#K").val();
	if(lowerOrHigher==null){
		// 这边处理原来没有标识的情况
		
		if(key=="Bb"){
			lowerOrHigher = "lower";
		}else{
			lowerOrHigher = "higher";
		}
	}else{
		var reg = new RegExp(key+'=(lower|higher)');
		if(lowerOrHigher[1].match(reg)){
			lowerOrHigher = lowerOrHigher[1].match(reg)[1];
		}else{
			if(key=="Bb"){
				lowerOrHigher = "lower";
			}else{
				lowerOrHigher = "higher";
			}
		}
	}
	return lowerOrHigher;
}
// 洛天依谱（导出唱名）
function getLtyInfo(sourceid){
	getNoteData();
	if(lty_seq!=null){
		var content = $("#"+sourceid).val();
		var key = $("#K").val();
//		var rel = ["","dao", "rui", "mi", "fa", "sou", "la", "xi"];
		var rel = ["","doe", "ray", "me", "far", "sew", "la", "sea"];
//		var rel = ["","en", "en", "en", "en", "en", "en", "en"];
		var results = new Array();
		for(var i=0;i<lty_seq.length;i++){
			var s = lty_seq[i];
			var obj = new Object();
			obj.staff = content.substring(s.istart,s.iend);
			obj.num = getSimpleNameByKAndStaff(s.my_key,obj.staff.replaceAll(/[\/0-9\(\)\-]/,""),content);
			obj.lty = rel[parseInt(obj.num.replaceAll(/[\,\=\^\_\']/,""))];
			obj.v = s.v;
			var res = getLtyByV(results,s.v);
			res.lty += obj.lty+ " ";
		}
		var result = "";
		for(var i=0;i<results.length;i++){
			if(results.length>1){
				result += "V:"+(i+1)+" "+results[i].lty+"\n";
			}else{
				result +=results[i].lty;
			}
		}
	}
	return result;
}
// 自动保存
var autoSaveRemindInterval = null;
var abcContentHistory = new Array();
var lastContent = "";
function autoSaveAlert(){
	
	if(autoSaveRemindInterval!=null){
		clearInterval(autoSaveRemindInterval);
	}
	abcContentHistory = getContentHistory();
	if(!abcContentHistory || abcContentHistory==null){
		abcContentHistory = new Array();
	}
	autoSaveRemindInterval = setInterval(function(){
		var content = $("#source").val();
		if(lastContent!=content){
			var time = new Date().Format("yyyy-MM-dd HH:mm:ss");
			var hisObj = new Object();
			hisObj.content = content;
			hisObj.time = time;
			if(abcContentHistory.length>10){
				var m = abcContentHistory.length - 10;
				abcContentHistory.splice(0,m);
			}
			abcContentHistory.push(hisObj);
			var jsonData = JSON.stringify(abcContentHistory);
			storage(true,"abc_content_his",jsonData);
			lastContent = content;
		}
		
//		$("#savetip").css("display","");
//		setTimeout(function(){$("#savetip").css("display","none");},3000)
	},30*1000);
}

function getLtyByV(results,v){
	for(var j=0;j<results.length;j++){
		if(results[j].v==v){
			return results[j];
		}
	}
	var obj = new Object();
	obj.v = v;
	obj.lty = "";
	results.push(obj);
	return obj;
}
function setMValue(){
	$("#M").val($("#M_mol").val()+"/"+$("#M_den").val());
	$("#M").change();
}
function changeMValue(){
	var meter = $("#M_mol").val()+"/"+$("#M_den").val();
	resetMeter(meter);
}
function setNodeMValue(){
	$("#node_M").val("[M:"+$("#node_M_mol").val()+"/"+$("#node_M_den").val()+"]");
}
// 打开分声部导出页
function openVoicepartExport(){
	$("#VOICEPART_div .modal-content").css("left",($(window).width()-$("#VOICEPART_div .modal-content").width())/2);
	initVoicePart(content_vue,$("#source").val());
	
}
// 打开音量设置页
function openVolSetting(){
	$("#VOL_SETTING_div .modal-content").css("left",($(window).width()-$("#VOL_SETTING_div .modal-content").width())/2);
	initVoicePart(content_vue,$("#source").val());
	
	getVoiceVol("source");
	setTimeout(function(){
		$.each($("input[name='voicevol']"),function(k,item){
			for(var i=0;i<vols.length;i++){
				var voicevol = vols[i];
				if($(item).attr("index") == voicevol.v){
					$(item).val(parseFloat(voicevol.vol) * 10);
				}
			}
		})
	},100)
}

function initVoicePart(that, abcContent) {
	
	that.voicePart = new VoicePart(abcContent ? abcContent : that.abcContent, function(partList) {
		// console.log(partList);
	}, function(abc) {
		$("#source").val(abc);
		src_change();
		var content = replaceBlankNote(abc);
		$("#source").val(content);
		src_change();
	});
}
//一键分声部导出所有声部的图片、mp3、midi文件
function exportAllVoice(){
	maskFullTxt("正在导出...")
	$("#source").val(reBr("source"));
	initVoicePart(content_vue,$("#source").val());
	var staffLen = content_vue.voicePart.partList.length;
	var staffIndex = 0;
	var p = content_vue.voicePart.partList[staffIndex];
	exoprtStaffIndex = 0;
	$("#exportAllVoiceForm").html("");
	//总的声部数
	addInput2Form("exportAllVoiceForm","staffCount",content_vue.voicePart.partList.length);
	addInput2Form("exportAllVoiceForm","exportTitle",getT());
	
	exportAllVoice_(content_vue.voicePart.partList,p);
}
//上一个方法的子方法
var exoprtStaffIndex = 0;
function exportAllVoice_(partList,partAbc){
		$("#source").val(partAbc.abc);
		musicType = 0;
		addInput2Form("exportAllVoiceForm","partName"+exoprtStaffIndex,partAbc.name);
		addInput2Form("exportAllVoiceForm","partAbc"+exoprtStaffIndex,partAbc.abc);
		src_change(function(){
			//把五线谱数据放到表单里
			var canvas = mergeSvg2Png();
			svgAsPngUri(canvas, null, function(uri){
				addInput2Form("exportAllVoiceForm","wxpPic"+exoprtStaffIndex,uri);
				console.log("五线谱完成")
				
				
				musicType=1;
				src_change(function(){
					//把简线混排数据放到表单里
					var canvas = mergeSvg2Png();
					svgAsPngUri(canvas, null, function(uri){
						addInput2Form("exportAllVoiceForm","jxhpPic"+exoprtStaffIndex,uri);
						console.log("简线谱完成")
						
						musicType=2;
						src_change(function(){
							//把简谱数据放到表单里
							var canvas = mergeSvg2Png();
							svgAsPngUri(canvas, null, function(uri){
								addInput2Form("exportAllVoiceForm","jpPic"+exoprtStaffIndex,uri);
								
								console.log("简谱完成")
								exoprtStaffIndex++;
								if(exoprtStaffIndex<partList.length){
									exportAllVoice_(partList,partList[exoprtStaffIndex])
								}else{
									//提交表单
									submitExportAllVoiceForm()
								}
							});
						});
					});
				})
			});
		});
}
function addInput2Form(formName,inputName,val){
	var input = document.createElement("textarea");
	$(input).attr("name",inputName);
	$(input).val(val)
	$("#"+formName).append(input);
}
function submitExportAllVoiceForm(){
	var url = "/abc/exportAllVoicePart?time="+Date.parse(new Date());
	$.ajax({
	 type: "POST",
	 url: url,
	 data: $("#exportAllVoiceForm").serialize(),
	 success: function(data){
		 console.log(data)
		 $(".loading,.loading-box").remove();
		 location.href = data;
	 }
	});
}
// 分声部导出
function exportVoice(){
	var selectedIndex = new Array();
	for(var i=0;i<content_vue.voicePart.partList.length;i++){
		var part = content_vue.voicePart.partList[i];
		if(part.selected){
			selectedIndex.push(i);
		}
	}
	if(selectedIndex.length==0){
		return;
	}
	var partAbc = getVoicePart("source",selectedIndex);
	if(selectedIndex.length==1 && selectedIndex[0] == content_vue.voicePart.partList.length-1){
		partAbc = $("#source").val();
	}
	
	if($("input[name='mp3']").prop("checked")){
		$("#partAbc").val(partAbc);
		$("#expMp3").val("1");
	}else{
		$("#expMp3").val("");
	}
	
	if($("input[name='midi']").prop("checked")){
		$("#partAbc").val(partAbc);
		$("#expMidi").val("1");
	}else{
		$("#expMidi").val("");
	}
	if(!$("input[name='mp3']").prop("checked")
			&& !$("input[name='midi']").prop("checked")){
		$("#partAbc").val("");
	}
	
	var canvas = mergeSvg2Png();
	var musicTypeOrgi = musicType + 0;
	if(musicType!=0){
		musicType = 0;
		src_change();
	}
	svgAsPngUri(canvas, null, function(uri){
		if($("input[name='standstaff']").prop("checked")){
			$("#staffPic").val(uri);
		}else{
			$("#staffPic").val("");
		}
        musicType = 2;
		// 重新宣染
		src_change();
		
		setTimeout(function(){
			
			var numstaffcanvas = mergeSvg2Png();
			svgAsPngUri(numstaffcanvas, null, function(uri2){
				if($("input[name='simpletaff']").prop("checked")){
					$("#numStaffPic").val(uri2);
				}else{
					$("#numStaffPic").val("");
				}
				musicType = 1;
				// 重新宣染
				src_change();
				setTimeout(function(){
					var mixstaffcanvas = mergeSvg2Png();
					svgAsPngUri(mixstaffcanvas, null, function(uri3){
						if($("input[name='mixtaff']").prop("checked")){
							$("#mixStaffPic").val(uri3);
						}else{
							$("#mixStaffPic").val("");
						}
						submitExportVoice();
						$("#source").val(content_vue.voicePart.abcContent);
						musicType = musicTypeOrgi;
						// 重新宣染
						src_change();
					});
					
					
				},100);
				
			});
		},100);
		
	});
	
}

function submitExportVoice(){
//	$("#voicePartForm").attr("action","exportVoicePart");
	$("#exportTitle").val($("#T").val());
//	$("#voicePartForm").submit();
	
	$("#exportTitle").val($("#T").val());
	var url = "/abc/exportVoicePart?time="+Date.parse(new Date());
	$.ajax({
	 type: "POST",
	 url: url,
	 data: $("#voicePartForm").serialize(),
	 success: function(data){
		 location.href = data;
	 }
	});
}
// 设置标题大小
function setTitleFontSize(){
	var fontSize = $("#titleFontSize").val();
	setTitleSize("source",fontSize)
}
// 设置标题颜色
function setTitleFontColor(){
	var color = $("#titleColor").val();
	setTitleColor("source",color)
}
// 设置标题加粗
function addTitleBold(){
	var bold = $("#titleBold").is(':checked');
	setTitleBold("source",bold);
}
// 设置歌词大小
function setLyricFontSize(){
	var fontSize = $("#lyricFontSize").val();
	setLyricSize("source",fontSize)
}
// 设置歌词颜色
function setLyricFontColor(){
	var color = $("#lyricColor").val();
	setLyricColor("source",color)
}

// 导出pdf
// %%header " 第$P页"
// %%pageheight 29.7cm
function exportAbc2Pdf(sourceid){
	maskFullTxt("正在准备导出...")
	abc2svg.modules.pageheight.fn = "page-pdf.js";//导出pdf时分页的js用这个
	var content = $("#"+sourceid).val();
	beforeExportPdfContent = content + "";
	var addPageHeight = false;
	var addPageWidth = false;
	var pageWidthPattern = /%%pagewidth\s*([0-9]*)\n/;
	var A4PageWidth = "%%pagewidth 1500\n";
	var pageWidthMatchs = content.match(pageWidthPattern);
	var pageWidthStr = "";
	var pageWidth = 0;
	var pageHeight = 1500*29.7/21;
	if(pageWidthMatchs!=null){
		pageWidthStr = pageWidthMatchs[0];
		pageWidth = pageWidthMatchs[1];
		pageHeight = pageWidth*29.7/21;
	}
	var tmp_scale = scale+0;
	//scale = 2.0;
	if(pageWidthStr==""){
		content = A4PageWidth + content;
		addPageWidth = true;
	} 
	var topmargin = $("#pdftopmargin").val();
	if(topmargin!=""){
		if(content.indexOf("topmargin")>-1){
			content = content.replace(/%%topmargin.*/g,"%%topmargin " + topmargin + "cm");
		}else{
			content = "%%topmargin " + topmargin + "cm\n" + content;
		}
	}
	var botmargin = $("#pdfbotmargin").val();
	if(botmargin!=""){
		if(content.indexOf("botmargin")>-1){
			content = content.replace(/%%botmargin.*/g,"%%botmargin " + topmargin + "cm");
		}else{
			content = "%%botmargin " + topmargin + "cm\n" + content;
		}
	}
	var leftmargin = $("#pdfleftmargin").val();
	var rightmargin = $("#pdfrightmargin").val();
	if(content.indexOf("%%leftmargin")>-1){
		content = content.replace(/%%leftmargin.*/g,"%%leftmargin " + leftmargin + "cm");
	}else{
		content = "%%leftmargin " + leftmargin + "cm\n" + content;
	}
	if(content.indexOf("%%rightmargin")>-1){
		content = content.replace(/%%rightmargin.*/g,"%%rightmargin " + rightmargin + "cm");
	}else{
		content = "%%rightmargin " + rightmargin + "cm\n" + content;
	}
	
	// %%titlefont serif 26
	if(content.indexOf("titlefont")<0){
		content = "%%titlefont serif 26\n"+content;
	}
	content = content.replace(/%%pageheight.*\n/g,"");
	content = content.replace(/%%footer.*\n/g,"");
	content = content.replace(/%%header.*\n/g,"");
	if(content.indexOf("pageheight") < 0){
		addPageHeight = true;
		var pdfsetting = "%%pageheight " + pageHeight + "\n";
		var deffooter = '%%footer \"第$P页\"\n';//默认页脚
		var defheader = '';
		var pdffooter = $("#pdffooter").val();
		var pdfheader = $("#pdfheader").val();
		if(pdffooter != ""){
			deffooter = '%%footer ' + pdffooter + '\n';
		}
		pdfsetting += deffooter;
		if(pdfheader != ""){
			defheader = '%%header '+pdfheader + '\n';
		}
		if(defheader!=""){
			pdfsetting += defheader;
		}
		//pdfsetting += "%%printmargin 1.6cm\n";
		content = pdfsetting + content;
//		console.log(content)
		
		$("#"+sourceid).val(content);
		src_change();
		
		
			var options = new Object();
			//水印地址
			//options.watermark = "images/2222.jpg";
			
			var imgDatas = new Array();
			setTimeout(function(){
				var firstStyle = null;
				$.each($("#target>div>svg"),function(i,item){
					console.log($(item).html())
					if(firstStyle==null || firstStyle.length==0){
						firstStyle = $(item).find("style");
					}else{
						var h1 = '<defs><path id="hl" class="stroke" stroke-width="1" d="m-6 0h12"></path></defs>';
						var rdots = '<g id="rdots" class="fill"><circle cx="0" cy="-9" r="1.2"></circle><circle cx="0" cy="-15" r="1.2"></circle></g>';
						$(item).prepend($(h1));
						$(item).prepend($(rdots));
						$(item).prepend($(firstStyle).clone());
					}
					//setTimeout(function(){
//						scale清析度
						svgAsPngUri(item, {scale:3}, function(uri){
							var imgObj = new Object();
							imgObj.imgdata = uri;
							imgObj.index = i;
				            //var imgdata = uri;
				            imgDatas.push(imgObj);
						});
					//},800)
					
					
				});
				var execFlag = true;
				var tmpInterval = setInterval(function(){
					if(imgDatas.length==$("#target>div>svg").length && execFlag){
						execFlag = false;
						setTimeout(function(){
							var images = new Array();
							for(var i=0;i<imgDatas.length;i++){
								var imgdata = imgDatas[i].imgdata;
								// 导出pdf start
								var myImage = document.createElement("img");
					            myImage.id = "my_img" + i;
							    myImage.src = imgdata;
							    myImage.index = imgDatas[i].index;
							    document.body.appendChild(myImage);
							    
							    images.push(document.getElementById("my_img"+i))
							    
					            // 导出pdf end
							}
							images.sort(function(a,b){
								return a.index - b.index;
							})
							exportPdf(images,function(){
								// 删除临时图片
								for(var i=0;i<images.length;i++){
									$(images[i]).remove();
								}
								$("#source").val(content_vue.voicePart.abcContent);
//								scale = tmp_scale;
//								abc_change();
								$(".loading,.loading-box").remove();
								abc2svg.modules.pageheight.fn = "page-1.js";
							})
							clearInterval(tmpInterval)
						},2000);
						
					}
				},1000);
			},2000);
	}
}

function openPdfOption(){
	hiddenMenuItem()
	// 如果只有一个声部，直接导出，
	$("#PDF_div .modal-content").css("left","20px");
	initVoicePart(content_vue,$("#source").val());
	setTimeout(function(){
		var topmargin = parseFloat($("#pdftopmargin").val());
		var botmargin = parseFloat($("#pdfbotmargin").val());
		var leftmargin = parseFloat($("#pdfleftmargin").val());
		var rightmargin = parseFloat($("#pdfrightmargin").val());
		$("#pdfPreview")[0].contentWindow.setSourceData($("#source").val(),parseFloat($("#pdfScale").val()),topmargin,botmargin,leftmargin,rightmargin,musicType); 
	},1000);
}

function openImgOption(){
	
	hiddenMenuItem()
	// 如果只有一个声部，直接导出，
	$("#IMG_div .modal-content").css("left","20px");
	//initVoicePart(content_vue,$("#source").val());
	setTimeout(function(){
		var topmargin = parseFloat($("#imgtopmargin").val());
		var botmargin = parseFloat($("#imgbotmargin").val());
		var leftmargin = parseFloat($("#imgleftmargin").val());
		var rightmargin = parseFloat($("#imgrightmargin").val());
		$("#imgPreviewIframe")[0].contentWindow.setSourceData($("#source").val(),parseFloat($("#imgScale").val()),topmargin,botmargin,leftmargin,rightmargin,musicType); 
	},1000);
}
// 改变谱子类型
function changeStaffType(obj,type){
	$(".spl-input").hide();
	if($(".lyric").length > 0 && $(".lyric").hasClass("menu-pressed")){
		$('.lyric').removeClass("menu-pressed");
		genLyric();
	}
	
	$("#mustype").val(type);
	toggleStaff(obj,type);
	if(type==2){
		$(".spl-input").show();
		if($("#graphEditorMenu").hasClass("menu-pressed")){
			$("#graphEditorMenu").click();
		}
	}
	if(type==2 || type == 1){
		$.each($(".jp_note"),function(i,item){
			var src = $(item).attr("src");
			if(src.indexOf("_j.png")<0){
				$(item).attr("src",src.replace(".png","_j.png"));
			}
		});
	} else {
		$.each($(".jp_note"),function(i,item){
			var src = $(item).attr("src");
			if(src.indexOf("_j.png")>-1){
				$(item).attr("src",src.replace("_j.png",".png"));
			}
		});
	}
	
	setEditorHeight();
}
function setEditorHeight(){
	var hei = $('.tools-box:visible').length;
	$('.body-box').css({
		height: ($(window).height() - hei*64 - 38) + 'px'
	})
}
//更改pdf导出的清析度
function changePdfRate(val){
	abc.cfmt().pdfrate = parseFloat(val);
	$("#pdfPreview")[0].contentWindow.setPdfRate(val); 
}
function changePdfScale(val){
	scale = parseFloat(val);
	src_change()
	$("#pdfPreview")[0].contentWindow.setStaffScale(val); 
}
function addPdfHeadFoot(h,f){
	$("#pdfPreview")[0].contentWindow.addHeadFoot(h,f); 
}
//pdf行间距
function changePdfStaffSep(val){
	changeStaffSep(val);
	$("#pdfPreview")[0].contentWindow.changeStaffSep(val); 
}
function setMargin(){
	var topmargin = $("#pdftopmargin").val();
	var botmargin = $("#pdfbotmargin").val();
	var leftmargin = $("#pdfleftmargin").val();
	var rightmargin = $("#pdfrightmargin").val();
	$("#pdfPreview")[0].contentWindow.setMargin(topmargin,botmargin,leftmargin,rightmargin);
}
function changeImgRate(val){
	abc.cfmt().pdfrate = parseFloat(val);
	$("#imgPreviewIframe")[0].contentWindow.setRate(val); 
}
function changeImgScale(val){
	scale = parseFloat(val);
	src_change()
	$("#imgPreviewIframe")[0].contentWindow.setStaffScale(val); 
}
function setImgMargin(){
	var topmargin = $("#imgtopmargin").val();
	var botmargin = $("#imgbotmargin").val();
	var leftmargin = $("#imgleftmargin").val();
	var rightmargin = $("#imgrightmargin").val();
	$("#imgPreviewIframe")[0].contentWindow.setMargin(topmargin,botmargin,leftmargin,rightmargin);
}
function addUrl(){
	$("text[url]").attr("onclick='alert(111)'")
	$("text[url]").click(function(){
		console.log("url:",$(this).attr("url"))
		window.open($(this).attr("url"))
	});
}
//谱子整体升8度
function staffUp8(sourceid){
	var content = $("#"+sourceid).val();
	if(content.indexOf("octave=")>-1){
		content = content.replace(/octave=(-*\d)/,function(a,b){
			return "octave="+(parseInt(b)+1);
		});
	}else{
		content = content.replace(/(K\s*:.*)/,"$1 octave=1");
	}
	$("#"+sourceid).val(content);
	src_change();
}
//谱子整体降8度
function staffDown8(sourceid){
	var content = $("#"+sourceid).val();
	if(content.indexOf("octave=")>-1){
		content = content.replace(/octave=(-*\d)/,function(a,b){
			return "octave="+(parseInt(b)-1);
		});
	}else{
		content = content.replace(/(K\s*:.*)/,"$1 octave=-1");
	}
	$("#"+sourceid).val(content);
	src_change();
}
//添加到常用
function add2CommonMenu(){
	if(selectedMenu!=null){
		$(".common>div").append($(selectedMenu[0].outerHTML));
		var menustr = storage(true,"common_menu");
		if(menustr==null){
			menustr = "$|$" + selectedMenu[0].outerHTML;
		}else{
			if(menustr.indexOf(selectedMenu[0].outerHTML)<0){
				menustr += "$|$" + selectedMenu[0].outerHTML;
			}
		}
		bindMenuEvent();
		storage(true,"common_menu",menustr);
	}
}
//从常用中删除
function delCommonMenu(){
	if(selectedMenu!=null){
		if(selectedMenu.parents("li")[0].className == "common"){
			selectedMenu.remove();
			var menustr = storage(true,"common_menu");
			if(menustr != ""){
				menustr = menustr.replace("$|$" + selectedMenu[0].outerHTML,"");
			}
			if(menustr==""){
				storage(true,"common_menu",0);
			}else{
				storage(true,"common_menu",menustr);
			}
			
		}
		
	}
}
//加载常用菜单
function loadCommonMenu(){
	var menustr = storage(true,"common_menu");
	if(menustr!=null && menustr!=""){
		var menus = menustr.split("$|$");
		for(var i=0;i<menus.length;i++){
			$(".common>div").append($(menus[i]));
		}
		bindMenuEvent();
	}
}

function bindMenuEvent(){
	$(".cmenu").bind("contextmenu",function(eve){
    	//右键
        commCtx.style.left = eve.clientX+'px';
        commCtx.style.top = eve.clientY+'px';
        commCtx.style.display = 'block';
        selectedMenu = $(this);
        if(selectedMenu.parents("li")[0].className != "common"){
        	$("#delcommonitem").css("display","none");
        	$("#add2commonitem").css("display","");
        }else if(selectedMenu.parents("li")[0].className == "common"){
        	$("#delcommonitem").css("display","");
        	$("#add2commonitem").css("display","none");
        }
	});
}

function changeStaffSep(value){
	var content = $("#source").val();
	if(content.indexOf("staffsep")>-1){
		var reg = /%%staffsep.*/;
		content = content.replace(reg,"%%staffsep "+value);
	}else{
		content = "%%staffsep "+value+"\n"+content;
	}
	$("#source").val(content);
	src_change();
}
//
function setEqualBars(val){
	var equalbarStr = "%%equalbars "+val;
	var content = $("#source").val();
	if(content.indexOf("%%equalbars")<0){
		content = equalbarStr+"\n"+content;
	}else{
		content = content.replace(/%%equalbars.*/,equalbarStr);
	}
	$("#source").val(content);
	src_change();
}
/**
 * 设置分声部的do的位置%%voicedosetting 1:C=higher,2:C=lower
 * @param key
 * @returns
 */
function changeVoiceDo(type){
	var content = $("#source").val();
	var key = $("#voice_key").val();
	var v = parseInt($("#voice_v").val())+1;
	var str = v+":"+key+"="+type;
	var reg = /%%voicedosetting\s.*/;
	var reg2 = new RegExp(v+":"+key+"=(higher|lower)")
	
	if(content.indexOf("%%voicedosetting")>-1){
		if(reg2.test(content)){
			content = content.replace(reg2,str);
		}else{
			content = content.replace(reg,function(s1,s2){
				return s1+","+str;
			});
		}
	} else {
		content = "%%voicedosetting "+ str+"\n"+content;
	}
	$("#source").val(content);
	src_change();
}

function findLastV(){
	var startPos = getStartPos(document.getElementById("source"));
	var content = $("#source").val();
	var lines = content.split("\n");
	var reg = /V\:\s*(\d)+/;
	var lastV = 1;
	var lineNum = findLineNumByIndex(content,startPos);
	lines.forEach(function(item,index){
		if(index <= lineNum){
			var res = reg.exec(item);
			if(res != null){
				lastV = parseInt(res[1]);
			}
		}
	});
	return lastV;
}
// 设置选中的速度
function setSpeedSelected(){
	var content = $("#source").val();
	var reg = /Q:.*\=(\d*)/;
	var s = reg.exec(content);
	if(s){
		$("#speedtypeselect").val(s[1])
		$("#plsxspeedtype").val(s[1])
	}
}

function setNodeColor(){
	$(".nodecolorli").css("background-color",$("#nodecolorselecter").val())
}

//设置音符背景色
function setNoteColor(){
	$(".notecolorli").css("background-color",$("#notecolorselecter").val())
}

// 发现很多地方事件绑定的对象使用的选择器不统一，这里将部分ID选择器改为类选择器
function bindAllEvent(){
	

	// 唱名导出
	$(".cmsaveas").off('click').on('click',function(){
		var val = getLtyInfo("source");
		var pval = "唱名";
		var uriContent = "data:text/plain;charset=utf-8," + encodeURIComponent(val);
		var link = document.createElement("a");
		link.innerHTML = "Hidden Link";
		link.href = uriContent;
		var regT = new RegExp("T:.*(?=\\n)");
		var m = regT.exec($("#source").val());
		if (m) { // 如果没有设置拍号，那么不显示倒计拍
			pval += "_" + m[0].replace('T:', '').trim();
		}
		pval += ".txt";
		link.download = pval;
		link.target = "_blank";
		link.onclick = destroyClickedElement;
		link.style.display = "none";
		document.body.appendChild(link);
		link.click();
	});

// 点击音符
	$(".notes").off('click').on('click',function(){
		// console.log("11111111111111111111111111111111111")
		var notestr = "CDEFGAB";
		
		var val = $(this).attr("value");
		current_group = $("#notegroup").val();
		if(notestr.indexOf(val)>-1){
			var keyValue = val;
			var pianoKeys = sd.KeyBoard;
			var vals;
			var groups = sd.KeyBoard.group;
			for(var i=0;i<pianoKeys.length;i++){
				var group = pianoKeys[i].group;
				if(current_group == group){
					vals = pianoKeys[i].val;
					for(var j=0;j<vals.length;j++){
						if(vals[j].toUpperCase().indexOf(keyValue.toUpperCase())>-1){
							clickPianoKey(current_group,j);
						}
					}
				}
			}
		}else{
			var selectText = getSelectText("source");
			if(selectText!=""){
				replaceSelected(selectText,val);
			} else {
				insertText(val);
			}
			autoNodeLine();
			abc_change();
			$("#source").focus();
		}
		
	});
	// 点击其它操作符
	$(".operator").off('click').on('click',function(eve){
		var val = $(this).attr("value");
		var selectText = getSelectText("source");
		var position = $(this).attr("position");
		var type = $(this).attr("type");
		
		if(selectText!=""){
			//设置小节背景色
			if($(this).attr("id")=="nodecolorli"){
				if(selectText.indexOf("|")<0){
					return;
				}
				var color = $("#nodecolorli").css("background-color");
				if(color=="rgba(0, 0, 0, 0)"){
					$("#nodecolorselecter").click();
					return;
				}
				val = '"'+val.replaceAll(/\"/g,"")+$("#nodecolorli").css("background-color")+'"';
			}
			
			//设置音符音景色
			if($(this).attr("id")=="notecolorli"){
				setNoteBgColor("source");
				return;
			}
			
			if(position=="before"){
				if(selectText.indexOf(val)>-1 && val!="!bc!"){
					replaceSelected(selectText,selectText.replace(val,""));
					$(this).parent().removeClass("selected")
				}else{
					replaceSelected(selectText,val+selectText);
					$(this).parent().addClass("selected")
				}
			}else if(position=="after"){
				replaceSelected(selectText,selectText+val);
			}else if(position=="hexian"){
				if(selectText.indexOf("[")==0){
					replaceSelected(selectText,selectText.replaceAll("\\[","").replaceAll("]",""));
				}else{
					replaceSelected(selectText,"["+selectText.replace(/\s/g,"")+"]");
				}
			}else if(position=="surround"){
				var slist = all_s(true);
				var startPos = getStartPos(document.getElementById("source"));
				var clsPattern = /\_([0-9]*)\_/;
				var startSeq = 99999999999;
				var endSeq = -1;
				$.each($(".abcr"),function(i,item){
					var style = $(item).css("fill-opacity");
					if(style!=0){
						var cls = $(item).attr("class");
						var matchs = cls.match(clsPattern);
						if(matchs!=null){
							var p = matchs[1];
							if(parseInt(p)<startSeq){
								startSeq = parseInt(p);
							}
							if(parseInt(p)>endSeq){
								endSeq = parseInt(p);
							}
						}
					}
				});
				
				var startNote = null;
				var endNote = null;
				for(var i=0;i<slist.length;i++){
					var s = slist[i];
					if(s.istart==startSeq){
						startNote = s;
					}
					if(s.istart==endSeq){
						endSeq = s.iend;
						endNote = s;
						break;
					}
				}
				
				var content = $("#source").val();
				var newContent = "";
				if(val=="!<(!"){
					var startExist = false;
					var endExist = false;
					if(startNote.a_dd && startNote.a_dd.length>0){
						for(var i=0;i<startNote.a_dd.length;i++){
							if(startNote.a_dd[i].name=="<("){
								startExist = true;
							}
						}
					}
					if(endNote.a_dd && endNote.a_dd.length>0){
						for(var i=0;i<endNote.a_dd.length;i++){
							if(endNote.a_dd[i].name=="<("){
								endExist = true;
							}
						}
					}
					if(!startExist){
						newContent = content.substring(0,startSeq) + "!<(!" + content.substring(startSeq,endSeq) + "!<)!" + content.substring(endSeq);
					}else{
						newContent =  content.substring(0,content.substring(0,startSeq).lastIndexOf("!<(!")) + content.substring(startSeq,endSeq) + content.substring(endSeq).replace("!<)!","");
					}
				}else if(val=="!>(!"){
					var startExist = false;
					var endExist = false;
					if(startNote.a_dd && startNote.a_dd.length>0){
						for(var i=0;i<startNote.a_dd.length;i++){
							if(startNote.a_dd[i].name==">("){
								startExist = true;
							}
						}
					}
					if(endNote.a_dd && endNote.a_dd.length>0){
						for(var i=0;i<endNote.a_dd.length;i++){
							if(endNote.a_dd[i].name==">("){
								endExist = true;
							}
						}
					}
					if(!startExist){
						newContent = content.substring(0,startSeq)+"!>(!"+content.substring(startSeq,endSeq)+"!>)!" + content.substring(endSeq);
					}else{
						newContent = content.substring(0,content.substring(0,startSeq).lastIndexOf("!>(!")) + content.substring(startSeq,endSeq) + content.substring(endSeq).replace("!>)!","");
					}
				}else if(val=="!8va(!" || val=="!8vb(!" || val=="!8va_b(!" || val=="!8vb_t(!"
					|| val=="!15va(!" || val=="!15vb(!"
					){
					var name = val.replaceAll("!","");
					var endName = name.replace("(",")")
					var startExist = false;
					var endExist = false;
					if(startNote.a_dd && startNote.a_dd.length>0){
						for(var i=0;i<startNote.a_dd.length;i++){
							if(startNote.a_dd[i].name==name){
								startExist = true;
							}
						}
					}
					if(endNote.a_dd && endNote.a_dd.length>0){
						for(var i=0;i<endNote.a_dd.length;i++){
							if(endNote.a_dd[i].name==endName){
								endExist = true;
							}
						}
					}
					if(!startExist){
						newContent = content.substring(0,startSeq)+"!"+name+"!"+content.substring(startSeq,endSeq)+"!"+endName+"!" + content.substring(endSeq);
					}else{
						newContent = content.substring(0,content.substring(0,startSeq).lastIndexOf("!"+name+"!")) + content.substring(startSeq,endSeq) + content.substring(endSeq).replace("!"+endName+"!","");
					}
				}
				$("#source").val(newContent);
				abc_change();
				return;
				
			}else if("nodeline"==type){
				// 小节线
				if(selectText=="|" 
						|| selectText=="|:" 
						|| selectText==":|"
						|| selectText==":||:"
						|| selectText=="|]"
						|| selectText=="||"
						|| selectText=="|1"
						|| selectText=="|2"){
					replaceSelected(selectText,val);
				}else{
					replaceSelected(selectText,selectText+val);
				}
				setSelectRange(getById("source"),$("#source").val().length,$("#source").val().length)
				abc_change();
				return;
			}else if("gliss"==type){
				var startPos = getStartPos(document.getElementById("source"));
				var slist = all_s(true);
				var start_s = null;
				var end_s = null;
				for(var i=0;i<slist.length;i++){
					var s = slist[i];
					if(s.type==8){
						if(start_s == null && s.istart>=startPos){
							start_s = s;
							var next_s = s.next;
							while(next_s){
								if(next_s.type==8){
									end_s = next_s;
									break;
								}
								next_s = next_s.next;
							}
							break;
						}
					}
				}
				if(start_s == null ){
					window.top.alert("滑音必需选择1个音符")
					return;
				}
				var content = $("#source").val();
				if(start_s.notes[0].a_dcn && start_s.notes[0].a_dcn.length>0){
					// 已经存在滑音标识，则去掉
					for(var i=0;i<start_s.notes[0].a_dcn.length;i++){
						var name = start_s.notes[0].a_dcn[i];
						if(name=="~("){
							debugger;
							var preStr = content.substring(0,start_s.istart);
							var endStr = content.substring(start_s.istart);
							var si = preStr.lastIndexOf("!~(!");
							var preStr = preStr.substring(0,si)+preStr.substring(si+"!~(!".length);
							endStr = endStr.replace("!~)!","");
							val = preStr + endStr;
							$("#source").val(val);
						}
					}
				}else{
					// 不存在滑音标识，则增加
					// 1.在后面的音符（end_s）前加个!~)!
					var preStr = content.substring(0,end_s.istart) + "!~)!";
					var endStr = content.substring(end_s.istart);
					// 2.在前面的音符（start_s)前面加个!~(!
					var s_pre = preStr.substring(0,start_s.istart) + "!~(!";
					var s_end = preStr.substring(start_s.istart);
					val = s_pre+s_end+endStr;
					$("#source").val(val);
				}
					
				
			}
		}else{
			if(type=="gliss"){
				return;
			}
			if(type=="nodebg"){
				//小节背景色设置
				$("#nodecolorselecter").click();
				return;
			}
			if(type=="notebg"){
				//音符背景色设置
				$("#notecolorselecter").click();
				return;
			}
			insertText(val);
		}
		abc_change();
		$("#source").focus();
	}).bind("contextmenu",function(eve){
    	//右键
        commCtx.style.left = eve.clientX+'px';
        commCtx.style.top = eve.clientY+'px';
        commCtx.style.display = 'block';
        selectedMenu = $(this);
        if(selectedMenu.parents("li")[0].className != "common"){
        	$("#delcommonitem").css("display","none");
        	$("#add2commonitem").css("display","");
        }else if(selectedMenu.parents("li")[0].className == "common"){
        	$("#delcommonitem").css("display","");
        	$("#add2commonitem").css("display","none");
        }
	});
	
	
	
	// 音高
//	$(".yingao").off('click').on('click',function(){
//		$(this).parent().children().removeClass("selected");
//		
//		var val = $(this).attr("value");
//		var selectText = getSelectText("source");
//		// 这里主要考虑先把前面的修饰符去掉
//		var st = replaceSuffix(selectText);
//		if(selectText!=""){
//			
//			if(st.substr(0,1)==val){
//				// 如果已经存在，则去掉
//				replaceSelected(selectText,selectText.replace(st,st.substr(1)));
//			}else{
//				// 如果不存在,则增加
//				$(this).addClass("selected");
//				replaceSelected(selectText,selectText.substr(0,selectText.length-st.length)+val + replaceYinGao(st));
//			}
//		}else{
//			insertText(val);
//		}
//		abc_change();
//		$("#source").focus();
//	});
	// 倚音
	$(".yy_operator").off('click').on('click',function(){
		var val = $(this).attr("value");
		var st = getSelectText("source");
		if(st==""){
			return;
		}
		var position = $(this).attr("position");
		if("before"==position){
			val = val.replace("}","")+st+"}"+st;		
		}else if("after"==position){
			// (A,{A,)}
			val = "("+st+"{"+st+")}";
		}
		replaceSelected(st,val);
		abc_change();
		$("#source").focus();
	});
	// 点击增加或减少时长
	$(".operator_len").off('click').on('click',function(){
		var val = $(this).attr("value");
		var position = $(this).attr("position");
		var selectText = getSelectText("source");
		var st = replaceSuffix(selectText);
		var pattern = /(![0-9]*!)|(![a-zA-Z]*!)|(!\>!)|(\.)|(\(\d)|(v)|(u)|(\>)|(P)/g
		var notes = getNotes(st);
		
		
		var result = "";
		if(notes!=null && notes.length>0){
			if(position=="mid"){
				if(selectText.indexOf(val)>-1){
					result = selectText.replace(val,"");
				} else {
					if(notes.length>=2){
						result = notes[0]+val+notes[1];
					}			
				}
			} else {
				for(var i=0;i<notes.length;i++){
					result = result + editNoteLen(notes[i],val);
				}
			}
		}
		
		if(selectText!=""){
			replaceSelected(selectText,result);
		} else {
			var lastChar = $("#source").val().substr(getStartPos(getById("source"))-1,1)
			var chars = "123456789/";
			if(chars.indexOf(lastChar)>-1){
				val = editNoteLen(lastChar,val);
				$("#source").val($("#source").val().substr(0,getStartPos(getById("source"))-1)+val+$("#source").val().substr(getStartPos(getById("source"))));
			}else{
				insertText(val);
			}
		}
		abc_change();
		$("#source").focus();
	});
	// 改变音符长度
	$(".operator_sc").off('click').on('click',function(){
		$(this).parent().children().removeClass("selected");
		restoreRest();
		restoreChord();
		currShape = '#demo_black';
		if(parseInt($(this).attr("dur"))>=768){
			currShape = '#demo_light';
		}
		$(this).addClass("selected");
		if($(this).hasClass("jp_note")){
			durSetting = $(this).attr("dur");
			durSettingNotDot = parseInt($(this).attr("dur"));//这个用于存储没有增加符点的时值，在计算点击生成符点后的休止符时会用到
			dot_selected_value = "";
			$(".dotstatus").removeClass("selected");
		}
		// 如果有选中编辑区的内容
		var selectText = getSelectText("source");
		if($(".selected_text").length>0){
			var istart = $(".selected_text").attr("istart");
			var s = syms[istart];
			if(s && s.type==8){
				var content = $("#source").val();
				var noteStr = content.substring(s.istart,s.iend);
				noteStr = noteStr.replace(/[\d\/]/g,"");
				updateNextNote(noteStr,s.istart,false,true)
			}
		}
		var pattern = /(![0-9]*!)|(![a-zA-Z]*!)|(!\>!)|(\.)|(\(\d)|(v)|(u)|(\>)|(P)/g
		var st = selectText;
		var isChord = false;
		if(st.indexOf("[")>-1 && st.indexOf(":")<0){
			isChord = true;
		}
		if(selectText!=""){
			var r_notes = selectText.replaceAll(pattern,"");
			// 根据当前选中的长度和L的值换算
			// var notes = getNotes(selectText);
			var notes = getNotes(r_notes);
			var suffix = getSuffix();
			var result = "";
			var index = 0;
			if(notes!=null){
				
				 for(var i=0;i<notes.length;i++){
					var temp = notes[i] ;
					result = result + st.substring(index,st.indexOf(temp));
					index = st.indexOf(temp)+temp.length;
					st = st.replace(temp,genspace(temp.length));
					temp = temp.replaceAll("/","").replaceAll(/[0-9]/ig,"") + "1";
					result = result + temp.replaceAll(/\/+/ig,suffix).replaceAll(/[0-9]/ig,suffix)
				} 
			}
			
			// replaceSelected(selectText,selectText.replaceAll(/\/+/ig,suffix).replaceAll(/[0-9]/ig,suffix));
			
			// replaceSelected(selectText,selectText.replaceAll("/","").replaceAll(/[0-9]/ig,"")+suffix);
			if(isChord){
				result = "[" + result.replace("[","").replace("]","") + "]";
			}
			replaceSelected(selectText,result);
			abc_change();
			$("#source").focus();
		}
		
	});
	//自然大调、和声大调、自然小调、和声小调
	$("#chordKeyType").on("change",function(){
		
	});
	//三和弦 七和弦
	$("#chordCategory").on("change",function(){
		$("#chordLevel option").show();
		var val = $(this).val();
		switchMarkType("")
		if(val=="3"){
			$(".chord[value='zhuangwei3'],.chord_shuzi[value='zhuangwei3'],.chord_zimu[value='zhuangwei3']").css("display","none");
			switchMarkType($("#markType").val())
		} else if (val=="7"){
			$(".chord[value='zhuangwei3'],.chord_shuzi[value='zhuangwei3'],.chord_zimu[value='zhuangwei3']").css("display","");
			$("#chordLevel").find("option[level='5']").prop("selected",true);
			switchMarkType($("#markType").val())
		}else if(val=="f3"){
			//副属三和弦
			$("#chordLevel option[level='1']").hide();
			$("#chordLevel option[level='4']").hide();
			$("#chordLevel option[level='7']").hide();
			$("#chordLevel").find("option[level='2']").prop("selected",true);
			
			//原位、转位等，只留下原位
			$("#chordType_f3").show();
			
			switchMarkType("f3");
			switchHx($("#K").val())
		}
		
		$("#chordType").find(".chord.selected").click();
		$(".chord,.chord_shuzi,.chord_zimu,.gongneng,.chord_f3").removeClass("selected");
		switchHx($("#K").val())
		
	});
	//
	//和弦级别
	$("#chordLevel").on("change",function(){
//		$("#chordType").find(".chord.selected").click();
		$(".chord.selected,.chord_shuzi.selected,.chord_zimu.selected,.gongneng.selected,.chord_f3.selected").click();
		$(".chord,.chord_shuzi,.chord_zimu,.gongneng,.chord_f3").removeClass("selected");
		switchHx($("#K").val())
	});
	//和弦标记
	$("#markType").on("change",function(){
		var markType = $(this).val();
		$(".chord,.chord_shuzi,.chord_zimu,.gongneng,.chord_f3").removeClass("selected");
		switchMarkType(markType)
	})
	$(".level").off('click').on('click',function(){
		$(this).parent().find(".level").removeClass("selected");
		$(this).addClass("selected");
		$("#chordType").find(".chord.selected").click();
		$(".chord,.chord_shuzi,.chord_zimu,.gongneng,.chord_f3").removeClass("selected");
	});
	//获取转位和弦的值
	function _getChordVal(){
		var category = $("#chordCategory").val();
		var level = parseInt($("#chordLevel").find("option:selected").attr("level")) - 1;//级别 从I,II,III-VII
		var type = $("#chordLevel").find("option:selected").attr("type");
		var chordKeyType = $("#chordKeyType").val();//自然大调、和声大调、自然小调、和声小调
		var subtype = "";
		
		
		//var chord = $("#chordType").find(".chord.selected").attr("value");//类型：原位，第一转位、第二转位
		var chord = $(".chord.selected,.chord_zimu.selected,.chord_shuzi.selected,.chord_f3.selected").attr("value");//类型：原位，第一转位、第二转位
		if(!chord){
			return;
		}
		//类型要加上chordKeyType，自然大调、和声大调、自然小调、和声小调
		if(chordKeyType!=""){
			chord = chord +"-"+ chordKeyType;
		}
		
		// var chord = $(this).attr("value");//类型：原位，第一转位、第二转位
		if(category == "3"){
			subtype = $(".chord.selected,.chord_zimu.selected,.chord_shuzi.selected").attr("type3");
		} else if (category == "7"){
			subtype = $(".chord.selected,.chord_zimu.selected,.chord_shuzi.selected").attr("type7");
		}
		type = type + subtype;
		var key = $("#K").val();
		//var val = getChordValue(category,chord,level,key);//这是老方法
		
		var val = gen37ChordString(category,chord,level,key);//这是新方法
		//console.log("原来的方法取到的值：",val,"  新的自动计算的值：",newVal, val==newVal)
		if(val != ""){
			val = "[" + val + "]";
		}
		var markType = $("#markType").val();
		if(category=="f3"){
			if(markType==""){
				//副属三和弦罗马数字
				type = "Ⅴ/"+type;
			}else if(markType=="shuzi"){
				type= shuzi_chord["f3"]["yuanwei"][level];
			}else if(markType=="zimu"){
				type= f3_zimu_chord[key][level];
			}
		}else{
			if(markType=="shuzi"){
				//获取数字和弦对应歌词
				var shuziChordVal = shuzi_chord[category][chord][level];
				type = shuziChordVal;
			}else if(markType=="zimu"){
				//获取字母和弦对应歌词
				if(category == "7" && level==6 && subtype==""){
					//7和弦原位，subtype=7
					subtype = 7
				}
				var zimuChordVal  = "fmt:"+zimu_chord[key][level] +"/"+ subtype;
				type = zimuChordVal;
			}
		}
		
		chordNoteLyric = type;
		return val;
	}
	$("#chordKeyType").on("change",function(){
		chordNote = _getChordVal();
	});
	
	$(".chord,.chord_shuzi,.chord_zimu,.chord_gongneng,.chord_f3").off('click').on('click',function(){
		if($(this).hasClass("selected")){
			//已经选中，则取消选
			$(this).removeClass("selected");
			restoreChordStatus();
			return;
		}
		if(parseInt($(".operator_sc.selected").attr("dur"))>=768){
			currShape = '#demo_light_chord';
		}else{
			currShape = '#demo_black_chord';
		}
		restoreRest();
		//restoreChord();
		
		$(this).parent().find(".chord,.chord_shuzi,.chord_zimu,.chord_gongneng").removeClass("selected");
		$(this).addClass("selected")
		
		
		chordNote = _getChordVal();
		return;
//		以下是歌词信息，暂时先不要
		
		var st = getSelectText("source");
		if(st!=""){
			if(isLuoMa(st)){
				//选中的是歌词
				replaceSelected(st,type);
			} else {
				
				replaceSelected(st,val);
				//以下替换歌词
				var startPos = getStartPos(document.getElementById("source"));
				var content = $("#source").val();
				var lineNum = findLineNumByIndex(content,startPos);
				var lineStr = content.split("\n")[lineNum];
				var lyricStr = content.split("\n")[lineNum + 1];
				var lineStartIndex = getTotalLengthByLine(content,lineNum-1);
				var preStr = content.substring(lineStartIndex,startPos);
				var reg = /\[.[^\[]*\]/g;
				var noteNum = preStr.match(reg).length;
				var lyrics = lyricStr.replace(/w:\s*/,"").replace(/\s+/g," ").split(" ");
				var newLyricStr = "";
				lyrics.forEach(function(item,index,arr){
					if(index == noteNum){
						newLyricStr = newLyricStr + " " + type;
					}else{
						newLyricStr = newLyricStr + " " + item;
					}
				})
				newLyricStr = "w:" + newLyricStr.substr(1);
				var lines = content.split("\n");
				var newContent = "";
				lines.forEach(function(item,index){
					if(index == (lineNum + 1)){
						newContent += newLyricStr + "\n";
					}else{
						newContent += item + "\n";
					}
				});
				newContent = replaceBlankLine(newContent);
				$("#source").val(newContent)
				src_change();
			}
		} else {
			insertChord(val,type,true);
		}
		
		
	})
	// 升
	$(".up").off('click').on('click',function(){
		
		
		var st = getSelectText("source");
		if(st==""){
			var handleGraphEditor = upDownKeyWord(1);
			return;
		}else{
			
			var interval = 1;
			
			var newStr = updownnote(st,interval);
			replaceSelected(st,newStr);
			src_change();
		}
		
	});
	// 降
	$(".down").off('click').on('click',function(){
		var st = getSelectText("source");
		if(st==""){
			var handleGraphEditor = upDownKeyWord(-1);
			return;
		}else{
			
			var interval = -1;
			
			var newStr = updownnote(st,interval);
			replaceSelected(st,newStr);
			src_change();
		}
	});
	// 升半个
	$(".uphalf").off('click').on('click',function(){
		var selectText = getSelectText("source");
		
		var newNote = updownnote(selectText,1);
		replaceSelected(selectText,newNote);
	});
	// 降半
	$(".downhalf").off('click').on('click',function(){
		var selectText = getSelectText("source");
		var newNote = updownnote(selectText,-1);
		replaceSelected(selectText,newNote);
	});
	// 升8个
	$(".up8").off('click').on('click',function(){
		var selectText = getSelectText("source");
		var newNote = updownnote(selectText,12);
		replaceSelected(selectText,newNote);
	});
	// 降8
	$(".down8").off('click').on('click',function(){
		var selectText = getSelectText("source");
		var newNote = updownnote(selectText,-12);
		replaceSelected(selectText,newNote);
	});
	
	$(".keyChoice").off('click').on('click',function(){
		$(".keyChoice").removeClass("selected");
		$(this).addClass("selected");
	});
	// 休止符（这里要根据单位（L）来调休止符的显示）节拍是1/2时，全音休止符是z2,节拍是1/4时，全音休止符是z4
	$(".z_notes").off('click').on('click',function(){
		var unit = $("#L").val().split("/")[1];
		var type = $(this).attr("type");
		
		var val = "z";
		var n = parseInt(unit) * toFloat(type);
		if(n >= 1){
			val = val + n
		}else{
			for(var i=2;;i=i*2){
				val = val + "/";
				if(1/i==n){
					break;
				}
			}
		}
		
		var selectText = getSelectText("source");
		val = val.replace("1","")
		if(selectText!=""){
			replaceSelected(selectText,val)
		}else{
			insertText(val);
			autoNodeLine();
		}
		abc_change();
		$("#source").focus();
		
	});
	
	$(".puhao").off('click').on('click',function(){
		var val = $(this).attr("value");
		set("V:",val);
		src_change()
	});
	$(".node_puhao").off('click').on('click',function(){
		var val = $(this).attr("value");
		val = "[V: "+val+"]";
		var pattern = /\[V.*(alto)\]|\[V.*(bass)\]|\[V.*(treble)\]|\[V.*(tenor)\]/g;
		var selectText = getSelectText("source");
		var result = selectText.match(pattern);
		
		if(selectText!=""){
			if(result!=null){
				val = selectText.replace(pattern,val);
				replaceSelected(selectText,val);
			}else if(selectText=="|"){
				replaceSelected(selectText,selectText+val);
			}else{
				replaceSelected(selectText,val+selectText);
			}
			
		}else{
			insertText(val);
		}
		
		src_change()
	});

// 后退
	$(".back").off('click').on('click',function(){
		goback();
	});
	// 前进
	$(".forward").off('click').on('click',function(){
		if((dellog.length - 1)>=0){
	        $("#source").val(dellog[dellog.length - 1]).blur();
	        // 这里不能用abc_change();
	        src_change();
			log[log.length] = dellog[dellog.length - 1];
			dellog.pop();
		}
	});
	// 剪切
	$(".cut").off('click').on('click',function(){
		cut_content = getSelectText("source");
		replaceSelected(cut_content,"");
		abc_change();
		$("#source").blur();
	});
	
	// 复制
	$(".copy").off('click').on('click',function(){
		cut_content = getSelectText("source");
	});
	// 删除
	$(".del").off('click').on('click',function(){
		delSelNote();
	});
	// 粘贴
	$(".past").off('click').on('click',function(){
		if(cut_content==""){
			return;
		}
		var st = getSelectText("source");
		if(st!=""){
			replaceSelected(st,cut_content);
		}else{
			insertText(cut_content);
		}
		
		abc_change();
		$("#source").blur();
	});
	// 换行
	$(".enterLine").off('click').on('click',function(){
		var st = getSelectText("source");
		if(st!=""){
			enter("before");
		}else{
			var content = $("#source").val();
			// console.log(content.lastIndexOf("\n"))
			// console.log(content.length);
			if(content.lastIndexOf("\n")==(content.length-1)){
				// 如果最后一个已经是换行，则不换行了
				return;
			}
			$("#source").val(content+"\n");
			
		}
		abc_change();
		move2End();
		$("#source").blur();
	});
	//指定编辑某个声部
	$(".editorv").off('click').on('click',function(){
		
		if($(this).hasClass("selected")){
			$(".editorv").removeClass("selected");
			editorV = -1;
		}else{
			$(".editorv").removeClass("selected");
			$(this).addClass("selected");
			editorV = $(this).attr("value");
		}
	});
	$(".exportmid").off('click').on('click',function(){ 
		// note_lyrics("source")
		 
		$("#abcform").attr("action","abcservlet");
		$("#exporttype").val("midi");
		$("#title").val($("#T").val());
		$("#transpose").val(getTransposeByShift());
		saveabc();
//		maskFullTxt("正在生成mp3...")
	});
	$(".exportmp3").off('click').on('click',function(){
		
		// note_lyrics("source")
		
		$("#abcform").attr("action","abcservlet");
		$("#exporttype").val("mp3");
		$("#transpose").val(getTransposeByShift());
		$("#title").val($("#T").val());
		//saveabc();
		maskFullTxt("正在生成mp3...")
		
		
		var url = "/abc/abcservlet?time="+Date.parse(new Date());
		$.ajax({
		 type: "POST",
		 url: url,
		 data: $("#abcform").serialize(),
		 success: function(data){
			 $(".loading,.loading-box").remove();
			 var mp3_down=document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
             mp3_down.href= data;
             mp3_down.target="aaa";
             mp3_down.download=$("#title").val()+".mp3";
//             mp3_down.click();
         	 var event=document.createEvent('MouseEvents');
             event.initMouseEvent('click',true,false,window,0,0,0,0,0,false,false,false,false,0,null);
             mp3_down.dispatchEvent(event);
             
		 }
		});
	});
	
	
	
	$(".importmid").off('click').on('click',function(){ 
		$('#xd_upload_midi_file').click();
	})
	// 导出图片
	$(".exportpic").off('click').on('click',function(){
		openImgOption();
		$('#IMG_div').modal('toggle');
		return;
	});
	$(".exportxml").off('click').on('click',function(){
		// $("#exporttype").val("midi");
		// saveabc();
		$("#abcform").attr("action","abc2Xml");
		$("#title").val($("#T").val());
		$("#abcform").submit();
		//maskFullTxt("正在生成文件...")
	});
	
	$(".mystaff").off("click").on("click",function(){
		hiddenMenuItem();
		showMyStaff();
	});
	
	$(".save_to_server").off('click').on('click',function(){
		if($("#pictype").val()=="mobile"){
			// 手机端提示是否增加预备拍
			swConfirm("是否增加预备拍？", null, function(isYes){
				if( isYes){
					addMobilPreNode = 1;
				}else{
					addMobilPreNode = 0;
				}
				saveHandle();
			},"是","否");
		}else{
			saveHandle();
		}
	});
	//保存到历史记录表，后面会根据groupid来取出该谱子的历史记录
	$(".save_to_history").off('click').on('click',function(){
		$("#SERVER_HIS_div .modal-content").css("left",($(window).width()-$("#SERVER_HIS_div .modal-content").width())/2);
		$('#SERVER_HIS_div').modal('toggle');
	});
	$(".newstaff").off('click').on('click',function(){
		var val = $("#source").val();
		if(defstr!=val){
			swConfirm("谱例已经有修改，是否放弃？", null, function(isYes){
				if( isYes){
					newnote();
					resetForm();
					isNew = true;
					//showPlsx()
					
					writeNumStaff(0);
					if($("#groupid").val()!="" && $("#createbuttontype").val()=="create"){
						// 重置groupid
						$("#groupid").val(uuid().replaceAll("-",""))
					}
				}
			})
			return;
		}
		isNew = true;
		newnote();
		//showPlsx()
	});
	// 图片放大缩小
	$("#scale_control").on('change',function(){
		// console.log($(this).val())
		console.log($(this).val())
		scale = parseFloat($(this).val());
		setPageWidth("source");
		abc_change();
  })
	
  // 编辑小节线数据
  $("#editnodelinediv").off('click').on('click',function(){
  	var val = $("#nodelinedata").val();
/*
 * if(val==""){ window.top.alert("没有小节线数据"); return; }
 */    	
		var json,data = new Array();
		if(val!=""){
			json = formatJson(val);
	    	$("#nodelinedata_tmp").val(json);
	    	data = $.parseJSON(val);
		}
		
  	// 谱子画布
		// var c = document.getElementById("can");
		// var cxt = c.getContext("2d");
		// 倒计时画布
	    var c2=document.getElementById("pre");
	    var cxt2 = c2.getContext("2d");
		nodelinearr = new Array();
	    var last_y = 0;
		for(var i=0;i<data.length;i++){
			var point = data[i].point;
			if(point){
				/*
				 * //换行时增加第一小节线 不加了，读谱时增加了-hxs if( last_y!=point[1]){
				 * 
				 * var lineFirstNode = new Array(); lineFirstNode.push(5);
				 * lineFirstNode.push(point[1]); lineFirstNode.push(5);
				 * lineFirstNode.push(point[3]);
				 * nodelinearr.push(lineFirstNode); }
				 */
				nodelinearr.push(point);
				last_y = point[1];
			}
		}
		if($("#imgpreview").attr("src")==""){
			$("#imgpreview").attr("src",$("#pic_url").val())
		}
		// 小节线数据
	    // 初始化
	    // s = new staff(this, cxt,cxt2,nodelinearr,c);
		// setTimeout(function(){
		// s.imageLoad($("#imgpreview"));
		// },1000)
  });

$(".chord_ins").off('click').on('click',function(){
		var chord = $(this).attr("chord");//类型：原位，第一转位、第二转位
		var level = parseInt($(this).attr("level"))-1;//级别 从I,II,III-VII
		var key = $("#K").val();
		var category = $(this).attr("category");
		var val = getChordValue(category,chord,level,key);
		if(val != ""){
			val = "[" + val + "]";
		}
		var type = $(this).attr("type");
		var st = getSelectText("source");
		if(st!=""){
			if(isLuoMa(st)){
				//选中的是歌词
				replaceSelected(st,type);
			} else {
				
				replaceSelected(st,val);
				//以下替换歌词
				var startPos = getStartPos(document.getElementById("source"));
				var content = $("#source").val();
				var lineNum = findLineNumByIndex(content,startPos);
				var lineStr = content.split("\n")[lineNum];
				var lyricStr = content.split("\n")[lineNum + 1];
				var lineStartIndex = getTotalLengthByLine(content,lineNum-1);
				var preStr = content.substring(lineStartIndex,startPos);
				var reg = /\[.[^\[]*\]/g;
				var noteNum = preStr.match(reg).length;
				var lyrics = lyricStr.replace(/w:\s*/,"").replace(/\s+/g," ").split(" ");
				var newLyricStr = "";
				lyrics.forEach(function(item,index,arr){
					if(index == noteNum){
						newLyricStr = newLyricStr + " " + type;
					}else{
						newLyricStr = newLyricStr + " " + item;
					}
				})
				newLyricStr = "w:" + newLyricStr.substr(1);
				var lines = content.split("\n");
				var newContent = "";
				lines.forEach(function(item,index){
					if(index == (lineNum + 1)){
						newContent += newLyricStr + "\n";
					}else{
						newContent += item + "\n";
					}
				});
				newContent = replaceBlankLine(newContent);
				$("#source").val(newContent)
				src_change();
			}
		} else {
			insertChord(val,type,true);
		}
		
	})
	
	// 另存为
	$('.saveas').off('click').on('click',function(){
		saveas();
	})
	
	// save2db
	$('.save2db').off('click').on('click',function(){		
		var url = "http://localhost:3001/abc2db?time="+(new Date()).getTime();
		$.ajax({
		 type: "POST",
		 url: url,
		 data: {"content":$("#source").val()},
		 success: function(resData){
			  alert(JSON.stringify(resData));
		 },
		 error: function(response){
			alert(JSON.stringify(response));
		 }
		});

		hiddenMenuItem();
	})

	// 导出分声部
	$('.exportvoicepart').off('click').on('click',function(event){
		hiddenMenuItem();
		$('#VOICEPART_div').modal('toggle');
		openVoicepartExport();
		event.stopPropagation();
	})
	// 一键分声部导出所有声部
	$('.exportallvoicepart').off('click').on('click',function(event){
		hiddenMenuItem();
		exportAllVoice();
	})
	$(".localabchistory").off('click').on('click',function(e){
		showLocalAbcHistory();
		hiddenMenuItem();
	});
	$(".serverabchistory").off('click').on('click',function(e){
		showServerAbcHistory();
		hiddenMenuItem();
	});
	
	// 导入XML
	$(".importxml").off('click').on('click',function(){
		$('#xmlfile').click();
	})
	
	// 打开文件
	$('.openfile').off('click').on('click',function(){
		$('#abcfile').click();
	})
	
	// 导出PDF
	$('.exportpdf').off('click').on('click', function(){
		$('#PDF_div').modal('toggle');
		openPdfOption();
		event.stopPropagation();
	})
	// 钢琴键盘
	$('.keyboard').off('click').on('click', function(){
		content_vue.keyboardClick();
		content_vue.menuActive = '';
	})
	// 和弦输入面板
	$('.chordpanel').off('click').on('click', function(){
		content_vue.chordPanelClick();
		content_vue.menuActive = '';
	})
	// 符号面板
	$('.symbolPanel').off('click').on('click', function(){
		$('.left-show-img').click();
	})
	//代码编辑器
	$('.abcEditor').off('click').on('click', function(){
		content_vue.editorClick();
		content_vue.menuActive = '';
	})
	//移调
	$('.shift-key').off('click').on('click', function(){
		$('#Z_div').modal('toggle');
		openZDiv();
		event.stopPropagation();
	})
	//调速
	$('.change-speed').off('click').on('click', function(){
		$('#QC_div').modal('toggle');
		changestaffspeed();
		event.stopPropagation();
	})
	//歌词
	$('.lyric').off('click').on('click', function(){
		var selectedNote = $(".selected_text[type*='HD'],.selected_text[type^='r'],.selected_text[type='note']");
		if(selectedNote.length>0){
			createLyricEditor();
		}else{
			if($("#graphEditorMenu").hasClass("menu-pressed")){
				$("#graphEditorMenu").click()
			}
			window.top.swAutoAlert("请选择一个音符");
		}
//		if($('.lyric').hasClass("menu-pressed")){
//			$('.lyric').removeClass("menu-pressed");
//			genLyric();
//		}else{
//			$('.lyric').addClass("menu-pressed");
//			showLyricInput();
//			if($("#graphEditorMenu").hasClass("menu-pressed")){
//				//$("#graphEditorMenu").click();
//				graph_update = true;
//				draw_editor = false;
//				$("#use_black").remove();
//				if($("#graphEditorMenu")){
//					$("#graphEditorMenu").removeClass("menu-pressed");
//					$("#graphEditorMenu").attr("title","当前模式：修改");
//				}
//			}
//		}
////		$('#LYRIC_div').modal('toggle');
////		editLyric('source');
//		event.stopPropagation();
	})
	//升8
	$('.up8').off('click').on('click', function(){
		var selectedBars = $("svg[type='rectnode'],svg[type='rectbar']");
		//选中的是小节()
		if(selectedBars.length>0){
			var handleGraphEditor = upDownKeyWord(12);
			if(handleGraphEditor){
				return false;
			}
			return;
		}
		//选中的是单个音符
		if($(".selected_text").length>0 || $(".select_text_g").length>0){
			var handleGraphEditor = upDownKeyWord(12);
			if(handleGraphEditor){
				return false;
			}
			return;
		}
		staffUp8('source');
	})
	//降8
	$('.down8').off('click').on('click', function(){
		var selectedBars = $("svg[type='rectnode'],svg[type='rectbar']");
		//选中的是小节()
		if(selectedBars.length>0){
			var handleGraphEditor = upDownKeyWord(-12);
			if(handleGraphEditor){
				return false;
			}
			return;
		}
		//选中的是单个音符
		if($(".selected_text").length>0 || $(".select_text_g").length>0){
			var handleGraphEditor = upDownKeyWord(-12);
			if(handleGraphEditor){
				return false;
			}
			return;
		}
		staffDown8('source')
	})
	//谱音同步
	$('.pytb').off('click').on('click', function(){
		content_vue.menuClick('pytb');
	})
	//节奏谱
	$('.openRhythm').off('click').on('click', function(){
		$('#RHYTHM_div').modal('toggle');
		openRhythm();
		event.stopPropagation();
	})
	//音量设置
	$('.voisetting').off('click').on('click', function(){
		$('#VOL_SETTING_div').modal('toggle');
		openVolSetting();
		event.stopPropagation();
	})
	//MIDI设置
	$('.midiset').off('click').on('click', function(){
		$('#MIDI_SETTING_div').modal('toggle');
		openMidiSetting();
		event.stopPropagation();
	})
	
	// 符号面板
	$('.panel-close').off('click').on('click', function(){
		$('.left-show-img').click();
	})
	// 显示歌词
	$('.toggleLyric').off('click').on('click', function(){
		toggleLyric('source');
	})
	//强弱记号
	$('.showStrongWeak').off('click').on('click', function(){
		showStrongWeak('source')
	})
	//柯尔文记号
	$('.toggleKew').off('click').on('click', function(){
		toggleKew('source');
	})
	//节拍器开关
	$('.metronomesetting').off('click').on('click', function(){
		playMetro = !playMetro;
		src_change();
	})
	
	//	/跨声部连音线在上方
	$('.overPartUp').off('click').on('click', function(){
		setVoiceSlur('source','\'');
	})
	//	/跨声部连音线在下方
	$('.overPartDown').off('click').on('click', function(){
		setVoiceSlur('source',',');
	})
	// 琶音
	$('.gilde').off('click').on('click', function(){
		setArpLink('source')
	})
	
	//谱例属性
	$(".plsx").off('click').on('click',function(){
		showPlsx();
	});
	
	//属性面板列表收起、展开
	$('.attr,.attr-close').off('click').on('click',function(){
		content_vue.attrPanelShow = !content_vue.attrPanelShow;
	})
}

/**
 * 曲谱区域的大小
 */
function musicAreaSize(){
	$("#source").css("width",($('.right-top-content').width() - 40));
	pagewidth = ($('.right-top-content').width() - 30) / 37.8;
	abc_change();
}
//隐藏菜单
function hiddenMenuItem(){
	content_vue.menuActive = '';
}
$(function(){
	$(window).click(function(e){
		if(!$(e.target).find('.menu-box').length> 0){
			content_vue.menuActive = '';
		}
	})
	
	// 键盘最小化
	$('.keyboard-bar .minimize').off('click').on('click', function(){
		$('.keyboard-box').animate({ 'height' : '0px'}, 100);
		$('#scoreEditorPianoKeyboardContainer').animate({ 'bottom' : - 200 + 'px'}, 100);
		$('.body-box .body-right').css({ 'padding-bottom': 0});
		$(this).addClass('hide');
		$('.restore').removeClass('hide');
		setAttrPanelHei();
	})
	// 键盘最大化
	$('.keyboard-bar .restore').off('click').on('click', function(){
		$('.keyboard-box').animate({ 'height' : '200px'}, 100);
		$('#scoreEditorPianoKeyboardContainer').animate({ 'bottom' :  '0px'}, 100);	
		$('.body-box .body-right').css({ 'padding-bottom': '200px'});
		$(this).addClass('hide');
		$('.minimize').removeClass('hide');
		setAttrPanelHei();
	})
	// 键盘关闭
	$('.piano-close').off('click').on('click', function(){
		content_vue.keyboardShow = !content_vue.keyboardShow;
		setAttrPanelHei();
	})
	
//	$('.menu-li').find('span').off('click').on('click',function(e){
//		content_vue.menuActive = '';
//		return false;
//	})
})

function showPlsx(){
	$('.plsx-box').toggleClass('hide');
	//$('#plsx').toggleClass('menu-pressed');
	setSpeedSelected();
}
//显示谱子在服务器的历史记录
function showServerAbcHistory(){
	var url = "/abc/abcHistory?time="+new Date().getTime();
	$.ajax({
      type: "POST",
      url: url,
      data: {"cmd":"list","groupid":$("#groupid").val()},
      async:false,
      dataType: "json",
      success: function(data){
    	  $("#abchistorytab tbody").html("");
      	if(data!=null && data!=""){
      		
      		var rows = data.Rows;
      		for(var i=0;i<rows.length;i++){
      			var row = rows[i];
      			console.log(row)
      			var tr = "<tr historyid='"+row.STAFF_HISTORY_ID+"'>";
      			  tr += "<td onclick='getServerHisItemContent(\""+row.STAFF_HISTORY_ID+"\")'>"+row.BACKUP+"</td>";
				  tr += "<td onclick='getServerHisItemContent(\""+row.STAFF_HISTORY_ID+"\")'>"+row.CREATETIME+"<textarea historyid='"+row.STAFF_HISTORY_ID+"' style='display:none;'>"+row.CONTENT+"</textarea></td>";
				  tr += "<td><input type='button' value='删除' onclick='delServerHisItem(\""+row.STAFF_HISTORY_ID+"\")'></td>";
				  tr += "</tr>";
				  $("#abchistorytab tbody").append($(tr));
      		}
      	}
      	$('#CONTENT_HIS_div').modal('toggle');
      }
	})
}
function getServerHisItemContent(historyId){
	var content = $("textarea[historyid='"+historyId+"']").text();
	$("#source").val(content);
	src_change();
}

function saveServerHistory(){
	var url = "/abc/abcHistory?time="+new Date().getTime();
	$.ajax({
      type: "POST",
      url: url,
      data: {"content":$("#source").val(),"groupid":$("#groupid").val(),"personid":$("#personid").val(),"cmd":"save","backup":$("#hisbackup").val()},
      async:false,
      dataType: "json",
      success: function(data){
      	console.log(data.msg)
      	window.top.alert(data.msg);
      }
	})
}
//切换和弦
function switchHx(key){
	
	restoreChordStatus();
	var level = $("#chordLevel").val();
	var chordCategory = $("#chordCategory").val();
	var jibie = parseInt($("#chordLevel :selected").attr("level"))-1;
	
	
	if(chordCategory=="f3"){
		//副属三和弦
		$.each($(".hxspan_f3"),function(i,item){
			var chordType = "";
			if(chordCategory=="3"){
				chordType = $(item).parent().attr("type3");
			}else if(chordCategory=="7"){
				chordType = $(item).parent().attr("type7");
			}
			if(chordType!=""){
				chordType = "-"+chordType;
			}
			$(item).html(level);
			$(item).attr("class","hxspan_f3 hx"+chordCategory+chordType);
		});
		//副属三和弦数字和弦
		var shuZiYuanWei = shuzi_chord["f3"]["yuanwei"][jibie];
		$(".hxspan_f3_shuzi").html(shuZiYuanWei);
		//副属三和弦字母和弦
		var zimu = f3_zimu_chord[key][jibie];
		$(".hxspan_f3_zimu").html(zimu);
		switchMarkType($("#markType").val())
		return;
	}
	
	//罗马标记
	$.each($(".hxspan"),function(i,item){
		var chordType = "";
		if(chordCategory=="3"){
			chordType = $(item).parent().attr("type3");
		}else if(chordCategory=="7"){
			chordType = $(item).parent().attr("type7");
		}
		if(chordType!=""){
			chordType = "-"+chordType;
		}
		$(item).html(level);
		$(item).attr("class","hxspan hx"+chordCategory+chordType);
	});
	
	
	//数字和弦
	if(shuzi_chord){
		var shuZiYuanWei = shuzi_chord[chordCategory]["yuanwei"][jibie].replace("(",'<span class="hx-sub">').replace(")","</span>");
		$(".hxspan_shuzi_yuanwei").html(shuZiYuanWei)
		var shuZiZhuanWei1 = shuzi_chord[chordCategory]["zhuangwei1"][jibie].replace("(",'<span class="hx-sub">').replace(")","</span>");
		$(".hxspan_shuzi_zhuangwei1").html(shuZiZhuanWei1)
		var shuZiZhuanWei2 = shuzi_chord[chordCategory]["zhuangwei2"][jibie].replace("(",'<span class="hx-sub">').replace(")","</span>");
		$(".hxspan_shuzi_zhuangwei2").html(shuZiZhuanWei2)
		if(chordCategory=="3"){
			$(".chord_shuzi[value='zhuangwei3']").css("display","none")
		}else if(chordCategory=="7"){
			var shuZiZhuanWei3 = shuzi_chord[chordCategory]["zhuangwei3"][jibie].replace("(",'<span class="hx-sub">').replace(")","</span>");
			$(".chord_shuzi[value='zhuangwei3']").css("display","")
			$(".hxspan_shuzi_zhuangwei3").html(shuZiZhuanWei3)
		}
	}
	//字母和弦
	if(!key){
		key = $("#K").val();
	}
	if(zimu_chord[key]){
		var zimuChardVal = zimu_chord[key][jibie];
		$.each($(".hxspan_zimu"),function(i,item){
			var chordType = "";
			if(chordCategory=="3"){
				chordType = $(item).parent().attr("type3");
			}else if(chordCategory=="7"){
				chordType = $(item).parent().attr("type7");
			}
			if(chordType!=""){
				chordType = "-"+chordType;
			}
			zimuChardVal = zimuChardVal.replace("(",'<span class="hx-sub">').replace(")","</span>");
			$(item).html(zimuChardVal);
			$(item).attr("class","hxspan_zimu hx"+chordCategory+chordType);
		});
	}
	
	
}
//删除历史记录
function delServerHisItem(historyId){
	var url = "/abc/abcHistory?time="+new Date().getTime();
	$.ajax({
      type: "POST",
      url: url,
      data: {"historyid":historyId,"cmd":"del"},
      async:false,
      dataType: "json",
      success: function(data){
    	  $("tr[historyid='"+historyId+"'").remove();
      	window.top.alert(data.msg);
      }
	})
}

//删除选中的小节
function delSelectedNode(){
	var selectedNode = new Array();
	$.each($("svg[type='rectnode'],svg[type='rectbar']"),function(i,item){
		var nodeIndex = parseInt($(item).attr("barindex"));
		if(nodeIndex==undefined || isNaN(nodeIndex)){
			nodeIndex = parseInt($(item).attr("barIndex"));
		}
		selectedNode.push(nodeIndex);
	});
	if(selectedNode.length>0){
		delNodes(selectedNode);
	}
}
//插入小节
function insertNodes(){
	var barIndex = $("svg[type='rectnode'],svg[type='rectbar']").attr("barindex");
	if(barIndex==undefined){
		barIndex = $("svg[type='rectnode'],svg[type='rectbar']").attr("barIndex");
	}
	insertNodeByIndex(barIndex);
}
/**
 * 改变连音线弧度
 * @param slurPath 连音线对象
 * @param sh 弧度
 * @returns
 */
var lastSelectedSlurIstart = -1;
function changeSlurHeight(shValue){
	var slur = $(".selected_path");
	var istart = $(slur).attr("istart");
	lastSelectedSlurIstart = istart;
	var s = syms[istart];
	if(s){
		var content = $("#source").val();
		var newContent = "";
		shStr = '"sh:'+(parseFloat(shValue)).toFixed(1)+'"';
		var gch = s.a_gch;
		if(gch!=null){
			for(var i=0;i<gch.length;i++){
				var g = gch[i];
				if(g.text.indexOf("sh:")==0){
					newContent = content.substring(0,g.istart);
				}
			}
		}
		if(newContent==""){
			newContent = content.substring(0,istart)+shStr+content.substring(istart);
		}else{
			newContent = newContent+shStr+content.substring(istart);
		}
		$("#source").val(newContent);
		src_change(reSelectSlur);
		doLog();
	}
}
//src_change后，重新选中连音线
function reSelectSlur(){
	if(lastSelectedSlurIstart!=-1){
		console.log("lastSelectedSlurIstart:",lastSelectedSlurIstart)
		$("path[type='slur'][istart='"+lastSelectedSlurIstart+"']").addClass("selected_path");
	}
}
var lastSelectedNoteIstart = -1;
function reSelectNote(){
	if(lastSelectedNoteIstart!=-1){
		$("text[type='hd'][istart='"+lastSelectedNoteIstart+"']").addClass("selected_text");
		$("text[type='Hd'][istart='"+lastSelectedNoteIstart+"']").addClass("selected_text");
		$("text[type='HD'][istart='"+lastSelectedNoteIstart+"']").addClass("selected_text");
	}
}
//设置连音线弧度值
function setSlurInfo(){
	var slur = $(".selected_path");
	var istart = $(slur).attr("istart");
	var s = syms[istart];
	if(s){
		var val = "";
		var gch = s.a_gch;
		if(gch!=null){
			for(var i=0;i<gch.length;i++){
				var g = gch[i];
				if(g.text.indexOf("sh:")==0){
					val = g.text.replace("sh:","");
					$(".slurheightVal").val(val);
					break;
				}
			}
		}
	}
}
//设置符杆方向 
function setNoteStemDirect(dir){
	var selectedNote = $(".selected_text");
	var istart = $(selectedNote).attr("istart");
	if(istart && istart!=-1){
		var content = $("#source").val();
		var s = syms[istart];
		var pIend = s.istart;
		var midStr = "";
		if(s.prev){
			sp = s.prev;
			pIend = sp.iend;
			midStr = content.substring(pIend,s.istart);
			midStr = midStr.replace(/\[I:pos stem.[^\[]*\]/g,"");
		}
		var newContent = content.substring(0,pIend)+midStr+"[I:pos stem " + dir + "]"+content.substring(istart);
		$("#source").val(newContent);
		src_change();
		doLog();
	}
}

//定位到语法框
function localtosource(){
	if(!$("#editor").hasClass("menu-pressed")){
		content_vue.editorClick();
	}
	var selectedNote = $(".selected_text,.select_text_g");
	var istart = $(selectedNote).attr("istart");
	setsel(0, Number(istart));
	var ta = document.getElementById("source");
	var line = findLineNumByIndex($("#source").val(), Number(istart));
	ta.scrollTop = (line * ta.scrollHeight) / $("#source").val().split("\n").length - 10;
}
//音符向左移动
function mNoteLeft(){
	mNote("left");
}
//音符向右移动
function mNoteRight(){
	mNote("right");
}
function mNote(leftOrRight){
	var selectedNote = $(".selected_text");
	var istart = $(selectedNote).attr("istart");
	if(istart && istart!=-1){
		
		var s = syms[istart];
		if(s){
			lastSelectedNoteIstart = parseInt(istart);
			var content = $("#source").val();
			var newContent = "";
			var xinVal = getXIndent(s);
			if(leftOrRight=="left"){
				xinVal--;
			}else{
				xinVal++;
			}
			var xinStr = "";
			if(Math.abs(parseInt(xinVal))<10){
				if(xinVal<0){
					
					xinStr = '"x-in:-0' + Math.abs(parseInt(xinVal)) + '"';
				}else{
					
					xinStr = '"x-in:0' + xinVal + '"';
				}
			}else{
				xinStr = '"x-in:' + xinVal + '"';
			}
			var gch = s.a_gch;
			var hasXin = false;
			if(gch!=null){
				for(var i=0;i<gch.length;i++){
					var g = gch[i];
					if(g.text.indexOf("x-in:")==0){
						newContent = content.substring(0,g.istart);
						hasXin = true;
						break;
					}
				}
			}
			if(!hasXin){
				lastSelectedNoteIstart = lastSelectedNoteIstart + xinStr.length;
			}
			if(newContent==""){
				newContent = content.substring(0,istart)+xinStr+content.substring(istart);
			}else{
				newContent = newContent+xinStr+content.substring(istart);
			}
			$("#source").val(newContent);
			src_change(reSelectNote);
			doLog();
		}
	}
}

//切换节拍器
function switchMetro(){
	if(!$("#metronomesetting").hasClass("menu-pressed")){
		$("#metronomesetting").addClass("menu-pressed");
		playMetro = true;
	}else{
		$("#metronomesetting").removeClass("menu-pressed");
		playMetro = false;
	}
	src_change();
}



/**
 * 初始化拖拽内容
 * 
 * @returns
 */
var $body = $("body");
function initDrag(isPc) {
	var startMethod = isPc ? "mousedown" : "touchstart";
	var moveMethod = isPc ? "mousemove" : "touchmove";
	var endMethod = isPc ? "mouseup" : "touchend";
	$body.off(moveMethod).on(moveMethod, function(e) {
		if (!!document.move) {
			var posix = !document.move_target ? {
				'x' : 0,
				'y' : 0
			} : document.move_target.posix;
			var callback = document.call_down || function() {
				// console.log("call-down")
			};
			callback.call(this, e, posix);
		}
	}).off(endMethod).on(endMethod, function(e) {
		if (!!document.move) {
			var callback = document.call_up || function() {
			};
			callback.call(this, e);
			$.extend(this, {
				'move' : false,
				'move_target' : null,
				'call_down' : false,
				'call_up' : false
			});
		}
	});
}

/**
 * 整个区域鼠标按下事件
 * 
 * @param that
 * @param model
 * @param e
 * @returns
 */
function contentMouseDown( e) {
	var e = getEvt(e);
	var posix = {
		'x' : e.pageX,
		'y' : e.pageY
	};
	var $nobrk = $(".right-top-content");
	var paddingLeft = $nobrk.css("padding-left");
	var scrollLeft = $nobrk.scrollLeft() || 0;
	$.extend(document, {
		'move' : true,
		'move_target' : this,
		'call_down' : function(e) {
			e = getEvt(e);
			var left = scrollLeft + (posix.x - e.pageX);
			$nobrk.scrollLeft( left); 
		},
		'call_up' : function(e) {
			document.move = false;
		} 
	});
}

// 获取拖动事件，触屏和鼠标是不一样的
function getEvt(e) {
	if (e.changedTouches && e.changedTouches.length > 0) {
		return (e.changedTouches)[0];
	}
	return e;
}
//修改速度描述
function changeSpeedDescInput(){
	var istart = $("#speedDescInput").attr("istart");
	var s = syms[istart];
	var text = $("#speedDescInput").val();
	var content = $("#source").val();
	var str = content.substring(s.istart,s.iend);
	var reg = /\".*\"/;
	var newStr = "";
	var matchs = str.match(reg);
	if(matchs!=null){
		newStr = str.replace(reg,'"'+text+'"');
	}else{
		newStr = str.replace("Q:",'Q: "'+text+'"');
	}
	
	content = content.substring(0,s.istart) + newStr + content.substring(s.iend);
	$("#source").val(content);
	doLog();
	src_change();
}
//切换和弦标记方法
function switchMarkType(type){
	restoreChordStatus();
	$(".marktype").css("display","none");
	if($("#chordCategory").val()=="f3"){
		$("#chordType_f3").css("display","");
		
		if(type==""){
			type = "luoma";
		}
		if(type=="luoma" || type=="shuzi" || type=="zimu"){
			$(".chord_f3").css("display","none")
			$(".chord_f3."+type).css("display","")
		}
		return;
	}else{
		if(type!=""){
			$("#chordType_"+type).css("display","");
		}else{
			$("#chordType").css("display","");
		}
	}
}
//重置和弦输入的各种状态
function restoreChordStatus(){
	chordNoteLyric = "";
	chordNote = "";
	if(parseInt($(".operator_sc.selected").attr("dur"))>=768){
		currShape = '#demo_light';
	}else{
		currShape = '#demo_black';
	}
}
//取消编辑状态
function restoreEditor(){
	//按下esc键，还原编辑状态
	graph_update = true;
	draw_editor = false;
	$("#use_black").remove();
	if($("#graphEditorMenuInsert")){
		$("#graphEditorMenuInsert").removeClass("menu-pressed");
//		$("#graphEditorMenu").attr("title","当前模式：修改");
	}
	if($("#graphEditorMenuUpdate")){
		$("#graphEditorMenuUpdate").addClass("menu-pressed");
//		$("#graphEditorMenu").attr("title","当前模式：修改");
	}
	$("rect[type!='bg_rect']").css("fill-opacity","0");
	$("rect[type='splplaceholder']").css("fill-opacity","");
	$("#use_black").remove();
	$("use[type='demo_hl']").remove();
	$(".editor_rect").removeClass("editor_rect");
}


//开始同步数据库，生成图片*********start
var ori_pagewidth="";
function startsyn(){
	maskFullTxt("正在生成图片...")
	abc2svg.modules.pageheight.fn = "page-pdf.js";//导出pdf时分页的js用这个
	ori_pagewidth = "";
	musicType = 0;
	var groupid = getUrlParameter("groupid");
	$("#exp_groupid").val("");
	$("#exp_attachid").val("");
	$("#staffPic").val("");
	$("#mixStaffPic").val("");
	$("#numStaffPic").val("");
	$("#pdfpics").html("");
	var url = file_server_url + "/scanAbcWithoutPic?time="+(new Date()).getTime();
	$.ajax({
		type: "POST",
		url:url,
		data:{"GROUPID":groupid},
		async:true,
		dataType: "json",
		success:function(po){
			if(po.ATTACH_ID==""){
				setTimeout(function(){
					startsyn();
				},10 * 1000)
				return;
			}
			var readabcurl = "readabcbyurl?time="+(new Date()).getTime();
			console.log(po);
			$("#exp_groupid").val(po.GROUPID);
			$("#exp_attachid").val(po.ATTACH_ID);
			$.ajax({
				type: "POST",
 				url:readabcurl,
 				data:{"url":po.ATTACHURL},
 				async:true,
 				success:function(data){
 					if(data!=""){
 						if(data.indexOf("pagewidth")>-1){
 							var pagewidthReg = /%%pagewidth(.*)/;
 							var matchs = data.match(pagewidthReg);
 							if(matchs!=null){
 								ori_pagewidth = matchs[1].replace(/\s/g,"");
 							}
 							data = data.replace(/%%pagewidth.*\n/,"%%pagewidth 501\n");
 						}else{
 							data = "%%pagewidth 501\n" + data;
 						}
 						
		    			$("#source").val(data);
		    			abc_change();
		    			setTimeout(function(){
		    				// 生成图片
		    				genMobilePic();
//		    				try{
//		    					genMobilePic();
//		    				}catch(e){
//		    					try{
//		    						genPicWithPage();
//		    					}catch(e){
//		    						savePicData();
//		    					}
//		    				}
		    			},1000)
 					}
		 		}
		 	});
		}
	})
}

function genMobilePic(){
	// 手机端，需要生成五线谱、简谱、简线混排3种图片
	var musicTypeOrgi = musicType + 0;
	
	// 选生成五线谱的谱子数据
	if(musicType!=0){
		musicType = 0;
		src_change();
	}
	var options = new Object();
	// options.watermark = "images/1111.png";
	setTimeout(function(){
		// 五线谱数据图片数据
		var canvas = mergeSvg2Png();
		setTimeout(function(){
				svgAsPngUri(canvas, options, function(uri){
					$("#staffPic").val(uri);// 五线谱base64数据
					// 生成简线混排
					musicType = 1;
					// 重新宣染
					src_change();
					setTimeout(function(){
						// 简线混排图片数据
						var mixstaffcanvas = mergeSvg2Png();
						setTimeout(function(){
							svgAsPngUri(mixstaffcanvas, options, function(uri2){
								$("#mixStaffPic").val(uri2);// 简线混排base64数据
								// 生成简谱数据
								musicType = 2;
								src_change();
								setTimeout(function(){
									var numstaffcanvas = mergeSvg2Png();
									setTimeout(function(){
										svgAsPngUri(numstaffcanvas, options, function(uri3){
											$("#numStaffPic").val(uri3);// 简谱base64数据
											musicType = musicTypeOrgi;
											// 重新宣染
											src_change();
											
											//生成分页的图片
											genPicWithPage();
										});
									},500);
								},500);
							});
						},500);
					},500)
				});
			
		},500);
	},500);
}
//生成分页的图片
function genPicWithPage(){
	
	
	var srcChangeFlag = false;
	musicType = 0;
	var content = $("#source").val();
	
	
	//把谱子宽度改回原来的
	if(ori_pagewidth!=""){
		content = content.replace(/%%pagewidth.*\n/,"%%pagewidth "+ori_pagewidth+"\n");
	}else{
		content = content.replace(/%%pagewidth.*\n/,"");
	}
	
	
	
	
	var addPageHeight = false;
	var addPageWidth = false;
	var pageWidthPattern = /%%pagewidth\s*([0-9]*)\n/;
	var A4PageWidth = "%%pagewidth 21cm\n";
	var pageWidthMatchs = content.match(pageWidthPattern);
	var pageWidthStr = "";
	var pageWidth = 0;
	var pageHeight = "29.7cm";
	if(pageWidthMatchs!=null){
		pageWidthStr = pageWidthMatchs[0];
		pageWidth = pageWidthMatchs[1];
		pageHeight = pageWidth*29.7/21;
	}
	var tmp_scale = scale+0;
	//scale = 2.0;
	if(pageWidthStr==""){
		content = A4PageWidth + content;
		addPageWidth = true;
	} 
	var topmargin = $("#pdftopmargin").val();
	if(topmargin!=""){
		if(content.indexOf("topmargin")>-1){
			content = content.replace(/%%topmargin.*/g,"%%topmargin " + topmargin + "cm");
		}else{
			content = "%%topmargin " + topmargin + "cm\n" + content;
		}
	}
	var botmargin = $("#pdfbotmargin").val();
	if(botmargin!=""){
		if(content.indexOf("botmargin")>-1){
			content = content.replace(/%%botmargin.*/g,"%%botmargin " + topmargin + "cm");
		}else{
			content = "%%botmargin " + topmargin + "cm\n" + content;
		}
	}
	var leftmargin = $("#pdfleftmargin").val();
	var rightmargin = $("#pdfrightmargin").val();
	if(leftmargin!=""){
		content = content.replace(/%%leftmargin.*/g,"%%leftmargin " + leftmargin + "cm");
	}else{
		content = content.replace(/%%leftmargin.*/g,"%%leftmargin 90");
	}
	if(rightmargin!=""){
		content = content.replace(/%%rightmargin.*/g,"%%rightmargin " + rightmargin + "cm");
	}else{
		content = content.replace(/%%rightmargin.*/g,"%%rightmargin 90");
	}
	
	// %%titlefont serif 26
	if(content.indexOf("titlefont")<0){
		content = "%%titlefont serif 26\n"+content;
	}
	if(content.indexOf("pageheight") < 0){
		addPageHeight = true;
		var pdfsetting = "%%pageheight " + pageHeight + "\n";
		var deffooter = '%%footer \"第$P页\"\n';//默认页脚
		var defheader = '';
		var pdffooter = $("#pdffooter").val();
		var pdfheader = $("#pdfheader").val();
		if(pdffooter != ""){
			deffooter = '%%footer ' + pdffooter + '\n';
		}
		pdfsetting += deffooter;
		if(pdfheader != ""){
			defheader = '%%header '+pdfheader + '\n';
		}
		if(defheader!=""){
			pdfsetting += defheader;
		}
		//pdfsetting += "%%printmargin 1.6cm\n";
		content = pdfsetting + content;
//		console.log(content)
		$("#source").val(content);
		srcChangeFlag = true;
		abc_change();
	}
	if(!srcChangeFlag){
		src_change();
	}
	
	var options = new Object();
	//水印地址
	//options.watermark = "images/2222.jpg";
	//生成五线谱的图片
	setTimeout(function(){
		var firstStyle = null;
		$.each($("#target>div>svg"),function(i,item){
			if(firstStyle==null || firstStyle.length==0){
				firstStyle = $(item).find("style");
			}else{
				var h1 = '<defs><path id="hl" class="stroke" stroke-width="1" d="m-6 0h12"></path></defs>';
				$(item).prepend($(h1));
				$(item).prepend($(firstStyle).clone());
			}
			setTimeout(function(){
				svgAsPngUri(item, options, function(uri){
		            var input = document.createElement("input");
		            input.setAttribute("type","hidden");
		            input.setAttribute("name","staff0");
		            input.setAttribute("value", uri);
		            input.setAttribute("index",i);
		            $("#pdfpics").append($(input));
				});
				
			},800)
		});
	},800);
	
	// 这里需要等待上面的图片信息全部保存完了之后再执行
	var interval1 = setInterval(function(){
		if($("#target>div>svg").length == $("input[name='staff0']").length){
			clearInterval(interval1);
			// 生成简线混排谱的图片
			musicType = 1;
			src_change();
			setTimeout(function(){
				var firstStyle = null;
				$.each($("#target>div>svg"),function(i,item){
					if(firstStyle==null || firstStyle.length==0){
						firstStyle = $(item).find("style");
					}else{
						var h1 = '<defs><path id="hl" class="stroke" stroke-width="1" d="m-6 0h12"></path></defs>';
						$(item).prepend($(h1));
						$(item).prepend($(firstStyle).clone());
					}
					setTimeout(function(){
						svgAsPngUri(item, options, function(uri){
				            var input = document.createElement("input");
				            input.setAttribute("type","hidden");
				            input.setAttribute("name","staff1");
				            input.setAttribute("value", uri);
				            input.setAttribute("index",i);
				            $("#pdfpics").append($(input));
						});
					},800)
				});
			},800);
			// 这里需要等待上面的图片信息全部保存完了之后再执行,另起一个线程，一直跑，直到staff1输入框的数量和svg的数量相等，说明上面的代码都执行完了
			var interval2 = setInterval(function(){
				if($("#target>div>svg").length == $("input[name='staff1']").length){
					clearInterval(interval2);
					// 生成简谱的图片
					musicType = 2;
					src_change();
					setTimeout(function(){
						var firstStyle = null;
						$.each($("#target>div>svg"),function(i,item){
							if(firstStyle==null || firstStyle.length==0){
								firstStyle = $(item).find("style");
							}else{
								var h1 = '<defs><path id="hl" class="stroke" stroke-width="1" d="m-6 0h12"></path></defs>';
								$(item).prepend($(h1));
								$(item).prepend($(firstStyle).clone());
							}
							setTimeout(function(){
								svgAsPngUri(item, options, function(uri){
						            var input = document.createElement("input");
						            input.setAttribute("type","hidden");
						            input.setAttribute("name","staff2");
						            input.setAttribute("value", uri);
						            input.setAttribute("index",i);
						            $("#pdfpics").append($(input));
								});
							},800)
						});
					},800);
					
					var interval3 = setInterval(function(){
						if($("#target>div>svg").length == $("input[name='staff2']").length){
							clearInterval(interval3);
							//把所有生成好的图片提交到服务器
				            savePicData();
				            return;
						}
					},200);
				}
			},100);
		}
	},100);
}
//把所有生成好的图片提交到服务器
function savePicData(){
	var url = file_server_url + "/genAbcPic?time="+(new Date()).getTime();
	$.ajax({
		 type: "POST",
		 url: url,
		 data: $("#savePicData").serialize(),
		 success: function(data){
			 console.log(data);
			 if(data.indexOf("成功")>-1){
				 $(".loading,.loading-box").remove();
				 var groupid = getUrlParameter("groupid");
				 if(groupid == ""){
					 //如果没有指定groupid，则继续扫描下一个并生成图片
					 startsyn();
				 }
			 }
		 }
		});
}
//生成图片完成***************end
var dragRightTopContentFlag = false;
var dragRightTopContentStartTop = 0;
var initDragRightTop = 0;
function rightTopContentMouseDown(event){
	dragRightTopContentFlag = true;
	dragRightTopContentStartTop = event.clientY;
	initDragRightTop =  $(".right-top-content")[0].scrollTop;
	//lastDragRightTopContentStartTop = event.clientY;
	//console.log("rightTopContentMouseDown-----------------")
}

function rightTopContentmoving(event){
	if(dragRightTopContentFlag){
		var offY = event.clientY-dragRightTopContentStartTop;
//		console.log("rightTopContentmoving-----------------",initDragRightTop + offY)
		$(".right-top-content")[0].scrollTop = initDragRightTop - offY;
//		console.log("---",event.clientY - lastDragRightTopContentStartTop)
//		$(".right-top-content")[0].scrollTop += (event.clientY - lastDragRightTopContentStartTop)
//		lastDragRightTopContentStartTop = event.clientY;
		//console.log()
	}
}
function rightTopContentMouseUp(event){
	dragRightTopContentFlag = false;
	//console.log("rightTopContentMouseUp-----------------")
}
function rightTopContentMouseLeave(event){
	dragRightTopContentFlag = false;
	//console.log("rightTopContentMouseLeave-----------------")
}

function exportAbc2Img(){
	var canvas = mergeSvg2Png();
	//scale分辨率
	svgAsPngUri(canvas, {scale:3}, function(uri){
        var imgdata=uri;
        // 将图片保存到本地
        var savaFile=function(data,filename)
        {
            var save_link=document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
            // save_link.href=imgdata;
            save_link.href= URL.createObjectURL(dataURIToBlob(imgdata));
            save_link.download=filename+".png";
        	var event=document.createEvent('MouseEvents');
            event.initMouseEvent('click',true,false,window,0,0,0,0,0,false,false,false,false,0,null);
            save_link.dispatchEvent(event);
            
        };
        var content = $("#source").val();
        var regT = new RegExp("T:.*(?=\\n)");
    	var m = regT.exec(content);
    	var pval = "";
    	if (m) { 
    		pval = m[0].replace('T:', '').trim();
    	}
        var filename = pval+'.png';
        savaFile(imgdata,filename);
		// 重新宣染
		abc_change();
	});
}
//切换播放单音唱名
function switchPlayNoteChangMing(){
	if($("#playNoteChangMing").hasClass("selected")){
		$("#playNoteChangMing").removeClass("selected")
		user.playNoteChangMing = false;
	}else{
		$("#playNoteChangMing").addClass("selected")
		user.playNoteChangMing = true;
	}
	
}
//如果有移调，导出midi或mp3时，需要把移调的标记转为transpose
function getTransposeByShift(){
	var content = $("#source").val();
	var shiftReg = /K:.*shift=([_^]*[cdefgab]{1,2})([_^cdefgab]{1,2})/;
	var node = shiftReg.exec(content);
	if(node){
		var oriKeyCode = node[1];
		var oriKey = "";
		var newKeyCode = node[2];
		var newKey = "";
		for(var key in keyTransfer){
			var data = keyTransfer[key];
			if(data.code==oriKeyCode){
				oriKey = data.value;
			}
			if(data.code==newKeyCode){
				newKey = data.value;
			}
			
		}
		return getFreCharge(oriKey,newKey);
	
	}
	return 0;
}

function C4BlExt(){
	this.blMD = function(){
		if(!blo0.dbg){
			blo0.dbg = blo0.blMD("id_4_UI_blDbg","v0.31",855,100,555,100,"green");
			_v = blo0.blDiv(blo0.dbg,blo0.dbg.id+"_v","_v","gray");
		   _SandBox(_v); 
		} 
		_on_off(blo0.dbg);
	} 
	const _on_off = function(d){
		if(d.style.display=="block"){
			d.style.display="none"; 
		}
		else
		{
			d.style.display="block";
		}
	}
	const _SandBox = function(sbDiv){
		var d1 = blo0.blDiv(sbDiv,sbDiv.id+"d1","d1",blColor[1]);
		var ta = blo0.blTextarea(d1,"id_4_ta_blrRunJS","alert(1);",blGrey[3]);
		ta.style.width="95%"; 
		ta.style.height="111"+"px"; 
		d1.ta = ta;

		var tb = blo0.blDiv(d1,d1.id+"tb_4_i21","",blGrey[5]);
	    var btnRun= blo0.blBtn(tb,tb.id+"btnRun","run",blColor[4]);
	    btnRun.onclick= function(){	  eval(ta.value);		}
		_blLoadGithubIssueComments(tb,"https://api.github.com/repos/jeremyjia/Games/issues/21",ta);

		return d1;
	}
	const _blMarkBtnInList= function(_btn,_ls,_highlightColor,_darkColor){  
		for(j in _ls){
			if(_btn.id==_ls[j].id){
				_btn.style.backgroundColor = _highlightColor;
			}
			else{
				if(_ls[j].style!=undefined){
					_ls[j].style.backgroundColor = _darkColor;
				}
			}
		}		
	}
	const _blLoadGithubIssueComments = function(tb,icURL,ta){
		
		function _loadIssueComments(o) { 
			var ls = [];
			for(i in o)
			{
				var n=ls.length + 1;
				var bodyTxt = o[i].body;
				var btn= blo0.blBtn(tb,tb.id+"btn"+n,n,blGrey[4]);
				btn.onclick = function(_thisBtn,_n,_curTxt){
					return function(){
						ta.value = _curTxt;
						_blMarkBtnInList(_thisBtn,ls,"yellow","grey");
					}
				}(btn,n,bodyTxt);
				ls.push(btn);
			}
		}
		w3.getHttpObject(icURL + "/comments", _loadIssueComments);	
	}
}
const oExt = new C4BlExt();