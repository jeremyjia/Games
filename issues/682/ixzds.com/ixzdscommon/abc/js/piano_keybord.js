/**
 * 钢琴虚拟键盘
 * 
 * 前提：
 * 1、引用 piano.js文件
 * 2、引用 <link href="/ixzdscommon/abc/css/piano_keyboard.css?v=1323" rel="stylesheet" type="text/css" />  
 * @param win
 * @param doc
 * @param undefined
 * @returns
 */
;
(function(win, doc, undefined) {
	"use strict"; 
	var PianoKeyboard = function(options) {
		 this.options = options = $.extend({
			 isOpen : false, //是否打开
			 selGroup: 'C4', // 选中的组
			 keyNum: 88 , // 88 键
			 whiteKeyArr: [], // 白键
			 blankKeyArr: [], // 黑键
			 mousedown: null, // 键盘按下
			 mouseup: null,// 键盘松开
			 isClick2play: null,// 单击按键是否播放声音
			 isVoice: false, // 声音开关 是否打开，即 单击按键是否播放声音
			 oneNotePlayIframe: null
		 }, options);
		 
		 for(var key in this.options){
			 // 属性不能和方法名称一致
			 if( "mousedown,mouseup".indexOf(key) == -1){
				 this[key] = this.options[key];
			 }
		 }
		 
		 this.speed = 88;
		 this.length = '1/4';
		 this.speedList = getAbcSpeedArr();
		 this.lengthList = [
			 {
				 name: '全音符为1拍',
				 value: '1/1'
			 },
			 {
				 name: '二分音符为1拍',
				 value: '1/2'
			 },
			 {
				 name: '四分音符为1拍',
				 value: '1/4'
			 },
			 {
				 name: '八分音符为1拍',
				 value: '1/8'
			 },
			 {
				 name: '十六分音符为1拍',
				 value: '1/16'
			 },
			 {
				 name: '三十二分音符为1拍',
				 value: '1/32'
			 }
		 ];
		 
		 // 加载 js 和 css
		 this.loadJsCss();
		 
		 this.initKey();
	}

	// 给构造函数 对象原型里添加属性（方法）
	PianoKeyboard.prototype = {
			
		// 加载 js 和 css
		loadJsCss : function() {
			var options = this.options;
			// 播放abc单个音
			if( options.isClick2play && $("#pianoKeyPlayOneNote").length == 0 && typeof play_one != 'function'){
				 // 写个定时，预防页面尚未加载完成
				setTimeout(function(){
					 $("body").append('<iframe id="pianoKeyPlayOneNote" src="/ixzdscommon/abc/html/play_one_note.html" style="display: none;"></iframe>');
				}, 1000);
			}
			 
			setTimeout(function(){
				var isExists = false;
				$("link").each(function(){
					if(this.href.indexOf("piano_keyboard.css") != -1){
						return false;
					}
				})
				 
				if( !isExists){
					$("head").append('<link href="/ixzdscommon/abc/css/piano_keyboard.css?v=1325" rel="stylesheet" type="text/css" />');
				}
			}, 1000);
		},
			
		// 初始化键盘
		initKey : function() {
			if(this.keyNum == 88){
				this.init88key();
			}
		},
		
		// 88键， 1、算单个白键的宽度；2、算组的宽度；3、根据组中的数量，算组中按键的宽度
		init88key : function() {
			var whiteNum = 52;
			var whiteWid = 100 / whiteNum; // 一个白键的宽度
			var blackWid = whiteWid * 0.8; // 一个黑键的宽度，白键宽度的N%
			$('#pianoKeysWhite .key').css('width', whiteWid + 'px');
			$('#pianoKeysBlack .key').css('width', blackWid + 'px');
			$('#pianoKeysBlack').find('.key:eq(0)').css('left', whiteWid / 2 + 3 + 'px').show(); // 渲染第一个黑键
			var bi = 2; // 需要渲染的当前黑键的索引值
			var offset = whiteWid * 2; // 累加的白键偏移量，默认跳过前两个白键跳过
			for(var i = 1; i <= 50; i++){	 // 遍历剩下的50个白键
				var n = i % 7; // 获取当前组的白键是第几个白键，用于判断这个白键右上方是否有黑键
				if(n == 1 || n == 2 || n == 4 || n == 5 || n == 6){ // 第1、2、4、5、6个白键上面有黑键
					$('#pianoKeysBlack').find('.key:eq(' + (bi - 1) + ')').css('left', offset + (whiteWid / 2 + 3) + 'px').show(); // 渲染黑键位置
					bi++; // 渲染黑键的索引值往后走
				}
				offset += whiteWid; // 每遍历一个白键，偏移量加上一个键的宽度
			}
			
			// 白键 begin
			var whiteKeyArr = [];
			var end = 9;
			var keyBoardStand = JSON.parse(JSON.stringify(sd.KeyBoardStand));
			for (var i = 0; i < end; i++) {
				var group = keyBoardStand[i];
				group.show = [];
				group.style = [];
				group.action = [];
				group.vPart = []; // 声部
				if( i == 0){
					// 只保留C0的最后两个
					group.val = group.val.slice(5);
					group.index = group.index.slice(5);
					group.name = group.name.slice(5);
				}else if( i == end - 1){
					// 只保留C5的第一个
					group.val = group.val.slice(0, 1);
					group.index = group.index.slice(0, 1);
					group.name = group.name.slice(0, 1);
				}
				
				/**
				 * 给白键上面的音名加上上下标
				 */
				if(group.name && group.name.length > 0){
					var nameList;
					for(var n = 0, nLen = group.name.length; n < nLen; n++){
						nameList = group.name[n].split('');
						if(nameList.length > 1){
							if(nameList[0] == 'C'){
								group.name[n] = nameList[0] + '<sub>' + nameList[1] + '</sub>';
							}else if(nameList[0] == 'c'){
								group.name[n] = nameList[0] + '<sup>' + nameList[1] + '</sup>';
							}
						}
					}
				}

				var keyLen = group.val.length;
				group.keyWidth = 100 / keyLen;
				group.width = whiteWid * group.val.length;
				group.groupStyle = {
					width: group.width + "%"
				}
				
				for (var j = 0; j < keyLen; j++) {
					group.show.push(true); 
					group.style.push({
						width: group.keyWidth + "%"
					}); 
					group.action.push(''); 
					group.vPart.push('');
				}
				whiteKeyArr.push(group);
			}
			this.whiteKeyArr = whiteKeyArr;

			// 黑键 begin
			var blackKeyArr = [];
			for (var i = end; i < 17; i++) {
				var group = sd.KeyBoardStand[i];
				var keyLen = group.val.length;
				group.show = [];
				if( i == end){
					// 只保留最后1个
					group.val = group.val.slice(4);
					group.index = group.index.slice(4);
					group.nameU = group.nameU.slice(4);
				} 
				keyLen = group.val.length;
				for (var j = 0; j < keyLen; j++) {
					group.show.push(true); 
				}
				blackKeyArr.push(group);
			}
			
			// 设置黑键的样式 
			var left = whiteWid - (blackWid/2);
			for (var i = 0; i < blackKeyArr.length; i++) {
				var group = blackKeyArr[i]; 
				group.action = [];
				group.style = [];
				group.vPart = [];
				var len = group.val.length;
				for (var j = 0; j < len; j++) {
					group.action.push('');
					group.vPart.push('');
					group.style.push({
						width: blackWid + "%",
						left: left + "%"
					}); 
					
					// 每组当中第二个黑键之后多加一个白键的宽度
					if( j == 1){
						left += whiteWid;
					}
					left += whiteWid;
				}
				// 每组之后多加一个白键的宽度
				left += whiteWid;
			}
			this.blackKeyArr = blackKeyArr;
			// 黑键 end
		} ,
		
		// 显示或者隐藏
		showOrHide : function(isOpen) {
			this.isOpen = isOpen || !this.isOpen;
		},
		
		// 键盘按下、放开
		keyUpDown : function(noteNumber, actType, isVoice, vPart) {
			var flag = false;
			for (var i = 0; i < this.whiteKeyArr.length; i++) {
				var item = this.whiteKeyArr[i];
				var idx = item.index.indexOf(noteNumber);
				if(idx > -1){
					Vue.set(item.action, idx, actType);
					Vue.set(item.vPart, idx, vPart || '');
					flag = true;
					break;
				}
			}
			for (var i = 0; i < this.blackKeyArr.length; i++) {
				var item = this.blackKeyArr[i];
				var idx = item.index.indexOf(noteNumber);
				if(idx > -1){ 
					Vue.set(item.action, idx, actType);
					Vue.set(item.vPart, idx, vPart || '');
					break;
				}
			}
			
			if( isVoice !== false && actType == "down"){
				this.playOneNote( noteNumber);
			}
		},

		// 键盘按下事件
		mousedown : function(item, idx) {
			Vue.set(item.action, idx, "down");
			if( typeof this.options.mousedown == "function"){
				this.options.mousedown(item.index[idx], item.group);
			}
			if( typeof this.options.noteClick == "function"){
				this.options.noteClick(item.index[idx], item.group);
			}
		},
		
		// 键盘按下事件
		mouseup : function(item, idx) {
			Vue.set(item.action, idx, "up");
			if( typeof this.options.mouseup == "function"){
				this.options.mouseup(item.index[idx], item.group);
			}
		},
		
		// 单击
		click : function(item, idx) {
			Vue.set(item.action, idx, "down");
			setTimeout(function(){
				Vue.set(item.action, idx, "up");
			}, 100);
			
			this.playOneNote( item.index[idx]);
		},
		
		// 鼠标移开，配套click使用，否则按下后鼠标直接移开会导致按下效果一直都在
		mouseleave : function(item, idx) {
			Vue.set(item.action, idx, "up");
		},
		
		// 单击
		playOneNote : function(noteNumber) { 
			if( this.isVoice){
				if( typeof play_one == 'function'){
					play_one_note(noteNumber, this.length, "1/4", this.speed + "");
					return;
				}
				if( this.options.oneNotePlayContentWindow){
					this.options.oneNotePlayContentWindow.play_one_note(noteNumber, this.length, "1/4", this.speed + "");
				}else{
					pianoKeyPlayOneNote.contentWindow.play_one_note(noteNumber, this.length, "1/4", this.speed + "");
				}
			}
		},
		
		// 关闭声音
		toggleVoice : function( isVoice) { 
			if( isVoice != undefined){
				this.isVoice = isVoice;
				return;
			}
			this.isVoice = !this.isVoice;
		},
		
		// 清空键盘选中
		clearKeySelect : function() { 
			this.clearKey( this.whiteKeyArr);
			this.clearKey( this.blackKeyArr);
		},
		
		// 清空键盘选中
		clearKey : function(arr) {
			for (var i = 0; i < arr.length; i++) {
				var item = arr[i];
				for (var idx = 0; idx < item.action.length; idx++) {
					Vue.set(item.action, idx, 'up');
				}
			}
		} 
	}
	win.PianoKeyboard = PianoKeyboard;
	// 把这个对象附给window底下的 名字叫VoicePart的对象；要不你调用的时候 new PianoKeyboard()
	// 怕在window的环境下找不到；
}(window, document))
