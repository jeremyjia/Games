/**
 * 钢琴即兴伴奏
 * 
 * 注意事项： 1、本插件需要jquery、abcUtil.js、graph-editor.js支持
 * 
 * @param win
 * @param doc
 * @param undefined
 * @returns
 */
(function(win, doc, undefined) {
	"use strict";
	var PianoImprovisation = function(that, initCball, options) {
		var _that = this;
		this.sourceObj = that; 
		this.initCball = initCball; // 初始化完成回调
		this.isOpen = false; // 是否打开即兴伴奏
		this.oriAbcContent = ''; // 开启即兴伴奏前的abc
		this.oriInitAbc = ''; // 开启即兴伴奏后的abc
		this.oriMusicType = 0; // 开启即兴伴奏前的musicType
		this.lastAbc = ''; // 上次的abc
		this.length = '1/4';
		this.dur = '384';
		this.hx = '3', // 和弦
		this.yw = '1', // 原位
		this.zw = '-1' // 转位
		this.oneBeatLen = 0; // 一拍子的时值数字（比如：2/4拍子的谱子，L：1/8的话，oneBeatLen = 2, 也就是说，例如C2就是一拍，C就是半拍)
		this.oneBeatDur = 0; // 一拍子的dur值
		this.beat = 0; // 谱子一小节有几拍
		this.graphUpdate = false;
		this.lengthShow = true;
		this.hxShow = true;
		this.ztShow = true;
		this.isEditLyric = true; // 是否要编辑歌词
		if(typeof(editSplnum.setselCball) == 'function'){
			this.selectNoteSeq = -1; // 当前选中音的seq
			var ssc = editSplnum.setselCball;
			editSplnum.setselCball = function(s, idx){
				if(typeof(ssc) == 'function'){
					ssc(s, idx);
				}
				$('.selected_text').removeClass('selected_text');
				$('._' + idx + '_').addClass('selected_text');
				_that.selectNoteSeq = idx;
				_that.selectText();
			}
		}
		this.options = $.extend({
			sourceId: 'source',
			contentId: 'dright',
			moveBox: '.pi-menu.move',
			scrollBox: 'body',
			isPlayNote: false,
			isInitNoteDrag: false,
			isNotInitAbc: false,
			graphUpdate: true,
			isInitKeydown: true
		}, options);
		this.init();
	}
	
	PianoImprovisation.prototype = {
		// 初始化方法
		init: function(){
			var that = this;
			$('.pi-menu').attr('draggable', 'false');
			$(window).resize(function(){
				if(that.isOpen){
					var $source = $('#' + that.options.sourceId);
					var $content = $('#' + that.options.contentId);
					var abcContent = $source.val();
					abcContent = setAbcKeyValue(abcContent, '%%pagewidth', $content.width() - 355);
					$source.val(abcContent);
					src_change();
					that.initOpBox();
					return false;
				}
			}).click(function(){
				if(that.isOpen){					
					move2End();
				}
			})
			if(this.options.isInitKeydown){
				$(document).keydown(function(e) {
					var obj = $(e.srcElement || e.target);
//		      如果当前焦点是文本框或文本域则正常走
					if(obj[0].tagName.toUpperCase()=="TEXTAREA" ||obj[0].tagName.toUpperCase()=="INPUT"){
						return;
					}				
					var index = e.keyCode;
					switch(index){
						case 8:
						case 46:
							that.delSelect();
							break;
					}
					if(e.keyCode>=65 && e.keyCode<=71){
						durSetting = that.dur;
						handleKeyPress(e, 'editor');
					}
				})
			}
			
			if(!this.options.graphUpdate){				
				graph_update = false;
			}
			draw_editor = false;
			graphEditor.isPlayNote = this.options.isPlayNote;
			if(this.options.isInitNoteDrag){				
				this.initNoteDrag();
			}
			this.chordInfo = this.getChordInfo();
			this.chordSet = this.getChordSet();
			this.oriIsSelect2play = editSplnum.isSelect2play;
			if(this.options.isOpen){
				this.open(this.options.isNotInitAbc);
			}
		},
		initOpBox: function(){
			var wHeight = $(window).height();
			if(wHeight <= 0){
				return;
			}
			var useHeight = wHeight - $('.sing-tool-box').height();
			if(useHeight < 870 && useHeight >= 740){
				$('.piano-improvisation-box').css('top',  this.options.tooltop ||  (870 - useHeight) / 2 + 'px');
			}else if(useHeight < 740){
				$('.piano-improvisation-box').css({
					'max-height': (this.options.tooltop  ? 'auto' : useHeight - 30) + 'px',
					top: '15px',
					overflow: 'auto'
				})
			}else{
				$('.piano-improvisation-box').css({
					'max-height': 'auto',
					top: this.options.tooltop || '120px',
					overflow: 'hidden'
				})
			}
		},
		// 获取和弦设置对应的和弦
		getChordSet: function(){
			return {
				'3': {
					'1': { '0': '[C,E,G,]', '1': '[E,G,C]', '2': '[G,CE]'},
					'2': { '0': '[D,F,A,]', '1': '[F,A,D]', '2': '[A,DF]'},
					'3': { '0': '[E,G,B,]', '1': '[G,B,E]', '2': '[B,EG]'},
					'4': { '0': '[F,A,C]', '1': '[A,CF]', '2': '[CFA]'},
					'5': { '0': '[G,B,D]', '1': '[B,DG]', '2': '[DGB]'},
					'6': { '0': '[A,CE]', '1': '[CEA]', '2': '[EAc]'},
					'7': { '0': '[B,DF]', '1': '[DFB]', '2': '[FBd]'},
				},
				'7': {
					'1': { '0': '[C,,E,,G,,B,,]', '1': '[E,,G,,B,,C,]', '2': '[G,,B,,C,E,]', '3': '[B,,C,E,G,]'},
					'2': { '0': '[D,,F,,A,,C,]', '1': '[F,,A,,C,D,]', '2': '[A,,C,D,F,]', '3': '[C,D,F,A,]'},
					'3': { '0': '[E,,G,,B,,D,]', '1': '[G,,B,,D,E,]', '2': '[B,,D,E,G,]', '3': '[D,E,G,B,]'},
					'4': { '0': '[F,,A,,C,E,]', '1': '[A,,C,E,F,]', '2': '[C,E,F,A,]', '3': '[E,F,A,C]'},
					'5': { '0': '[G,,B,,D,F,]', '1': '[B,,D,F,G,]', '2': '[D,F,G,B,]', '3': '[F,G,B,D]'},
					'6': { '0': '[A,,C,E,G,]', '1': '[C,E,G,A,]', '2': '[E,G,A,C]', '3': '[G,A,CE]'},
					'7': { '0': '[B,,D,F,A,]', '1': '[D,F,A,B,]', '2': '[F,A,B,D]', '3': '[A,B,DF]'},
				}
			};
		},
		getChordSetSort: function(){
			return {
				'3': {
					'1': { '0': 'C,|E,|G,', '1': 'E,|G,|C', '2': 'G,|C|E'},
					'2': { '0': 'D,|F,|A,', '1': 'F,|A,|D', '2': 'A,|D|F'},
					'3': { '0': 'E,|G,|B,', '1': 'G,|B,|E', '2': 'B,|E|G'},
					'4': { '0': 'F,|A,|C', '1': 'A,|C|F', '2': 'C|F|A'},
					'5': { '0': 'G,|B,|D', '1': 'B,|D|G', '2': 'D|G|B'},
					'6': { '0': 'A,|C|E', '1': 'C|E|A', '2': 'E|A|c'},
					'7': { '0': 'B,|D|F', '1': 'D|F|B', '2': 'F|B|d'},
				},
				'7': {
					'1': { '0': 'C,,|E,,|G,,|B,,', '1': 'E,,|G,,|B,,|C,', '2': 'G,,|B,,|C,|E,', '3': 'B,,|C,|E,|G,'},
					'2': { '0': 'D,,|F,,|A,,|C,', '1': 'F,,|A,,|C,|D,', '2': 'A,,|C,|D,|F,', '3': 'C,|D,|F,|A,'},
					'3': { '0': 'E,,|G,,|B,,|D,', '1': 'G,,|B,,|D,|E,', '2': 'B,,|D,|E,|G,', '3': 'D,|E,|G,|B,'},
					'4': { '0': 'F,,|A,,|C,|E,', '1': 'A,,|C,|E,|F,', '2': 'C,|E,|F,|A,', '3': 'E,|F,|A,|C'},
					'5': { '0': 'G,,|B,,|D,|F,', '1': 'B,,|D,|F,|G,', '2': 'D,|F,|G,|B,', '3': 'F,|G,|B,|D'},
					'6': { '0': 'A,,|C,|E,|G,', '1': 'C,|E,|G,|A,', '2': 'E,|G,|A,|C', '3': 'G,|A,|C|E'},
					'7': { '0': 'B,,|D,|F,|A,', '1': 'D,|F,|A,|B,', '2': 'F,|A,|B,|D', '3': 'A,|B,|D|F'},
				}
			};
		},
		// 获取和弦对应的标记
		getChordInfo: function(){
			return {
				'[C,E,G,]': 'Ⅰ',
				'[E,G,C]': 'Ⅰ6',
				'[G,CE]': 'Ⅰ46',
				'[D,F,A,]': 'Ⅱ',
				'[F,A,D]': 'Ⅱ6',
				'[A,DF]': 'Ⅱ46',
				'[E,G,B,]': 'Ⅲ',
				'[G,B,E]': 'Ⅲ6',
				'[B,EG]': 'Ⅲ46',
				'[F,A,C]': 'Ⅳ',
				'[A,CF]': 'Ⅳ6',
				'[CFA]': 'Ⅳ46',
				'[G,B,D]': 'Ⅴ',
				'[B,DG]': 'Ⅴ6',
				'[DGB]': 'Ⅴ46',
				'[A,CE]': 'Ⅵ',
				'[CEA]': 'Ⅵ6',
				'[EAc]': 'Ⅵ46',
				'[B,DF]': 'Ⅶ',
				'[DFB]': 'Ⅶ6',
				'[FBd]': 'Ⅶ46',
				'[C,,E,,G,,B,,]': 'Ⅰ7',
				'[E,,G,,B,,C,]': 'Ⅰ56',
				'[G,,B,,C,E,]': 'Ⅰ34',
				'[B,,C,E,G,]': 'Ⅰ2',
				'[D,,F,,A,,C,]': 'Ⅱ7',
				'[F,,A,,C,D,]': 'Ⅱ56',
				'[A,,C,D,F,]': 'Ⅱ34',
				'[C,D,F,A,]': 'Ⅱ2',
				'[E,,G,,B,,D,]': 'Ⅲ7',
				'[G,,B,,D,E,]': 'Ⅲ56',
				'[B,,D,E,G,]': 'Ⅲ34',
				'[D,E,G,B,]': 'Ⅲ2',
				'[F,,A,,C,E,]': 'Ⅳ7',
				'[A,,C,E,F,]': 'Ⅳ56',
				'[C,E,F,A,]': 'Ⅳ34',
				'[E,F,A,C]': 'Ⅳ2',
				'[G,,B,,D,F,]': 'Ⅴ7',
				'[B,,D,F,G,]': 'Ⅴ56',
				'[D,F,G,B,]': 'Ⅴ34',
				'[F,G,B,D]': 'Ⅴ2',
				'[A,,C,E,G,]': 'Ⅵ7',
				'[C,E,G,A,]': 'Ⅵ56',
				'[E,G,A,C]': 'Ⅵ34',
				'[G,A,CE]': 'Ⅵ2',
				'[B,,D,F,A,]': 'Ⅶ7',
				'[D,F,A,B,]': 'Ⅶ56',
				'[F,A,B,D]': 'Ⅶ34',
				'[A,B,DF]': 'Ⅶ2'
			}
		},
		// 初始化音符拖动事件
		initNoteDrag: function(){
			var that = this;
			var noteDragTimeout = null;
			var eventBox = this.options.moveBox;
			$(eventBox).off('touchstart').on('touchstart', clickdown);
			$(eventBox).off('mousedown').mousedown(clickdown);
					
			function clickdown(e){
				var pageX = e.touches ? e.touches[0].pageX : e.pageX;
				var pageY = e.touches ? e.touches[0].clientY : e.clientY;
				var move = e.touches ? 'touchmove' : 'mousemove';
				var end = e.touches ? 'touchend' : 'mouseup';
				if(e.touches){
					$(that.options.scrollBox).css('overflow', 'hidden');
				}
				var $that = $(this);
				noteDragTimeout = setTimeout(function(){
					var isDragNote = true; // 是否拖动音符
					var imgStr = '<img draggable="false" ondragstart="return false;" src="_src" class="drag-note-img" style="top:_top;left:_left;"/>';
					var imgSrc = $that.attr('src');
					var value = $that.attr('value'); // 值
					var dur = $that.attr('dur'); // 时值
					var type = $that.attr('data-type');
					if(typeof(dur) != 'undefined' && dur > 0){					
						currShape = dur >= 768 ? '#demo_black_circle' : '#demo_black';
						durSetting = dur;
					}
					
					if(typeof(draw_editor) != undefined){
						draw_editor = true;
						graph_update = false;
					}
					imgStr = imgStr.replace('_top', pageY + 'px').replace('_left', pageX + 'px').replace('_src', imgSrc);
					$('.drag-note-img').remove();
					$('body').append(imgStr);
					// 禁止事件冒泡
					if (e && e.stopPropagation) {
						e.stopPropagation();
					} else {
						window.event.cancelBubble = true;
					}
					
					$(document).off(move).on(move, function(e){
						pageX = e.touches ? e.touches[0].pageX : e.pageX;
						pageY = e.touches ? e.touches[0].clientY : e.clientY;
						if(isDragNote){
							if(e.touches){
								var touchY = e.touches[0].pageY;
								var svgList = $('svg'); // svg节点列表
								for(var i = 0; i < svgList.length; i++){ // 遍历节点，找到当前触摸停留的svg，并替换原先的节点（target)
									var item = svgList.eq(i);
									if(pageX > item.offset().left && touchY > item.offset().top && pageX < item.offset().left + item.width() && touchY < item.offset().top + item.height()){
										e.target = item[0];
										break;
									}
								}	
								// 最后计算一下offset值，再传入mousemovehandler
								var svg = e.target;
								e.offsetX = e.touches[0].pageX -  $(svg).offset().left;
								e.offsetY = touchY -  $(svg).offset().top;
								mousemovehandler(e);
							}
							$('.drag-note-img').css({
								top: pageY,
								left: pageX
							});
						}
						// 禁止事件冒泡
						if (e && e.stopPropagation) {
							e.stopPropagation();
						} else {
							window.event.cancelBubble = true;
						}
					}).off(end).on(end, function(e){
						if(e.touches){
							$(that.options.scrollBox).css('overflow', 'auto');
						}
						if(!isDragNote){
							return;
						}
						isDragNote = false;
						$('.drag-note-img').remove();
						if(cen && cen.istart > 0){
							that.selectNoteSeq = cen.istart
						}
						switch(type){
							case 'length':
								rest_status = '';
								fixedLen = false;
								chordNote = '';
								svgclickhandler(e);
								break;
							case 'hx':
								if(value){
									rest_status = '';
									durSetting = that.dur;
									fixedLen = false;
									chordNote = value;
									svgclickhandler(e);
								}
								break;
							case 'zt':
								that.ztRender(value);
								break;
						}
						if(typeof(draw_editor) != undefined){
							draw_editor = false;
							if(that.graphUpdate){								
								graph_update = true;
							}
						}
						// 禁止事件冒泡
						if (e && e.stopPropagation) {
							e.stopPropagation();
						} else {
							window.event.cancelBubble = true;
						}
					})
				}, 200);
				
			}
			
			$(eventBox).off('mouseup').mouseup(function(){
				if(noteDragTimeout != null){
					clearTimeout(noteDragTimeout);
				}
				if(typeof(draw_editor) != undefined){
					draw_editor = false;
				}
			}).off('touchend').on('touchend', function(){
				if(noteDragTimeout != null){
					clearTimeout(noteDragTimeout);
				}
			});
		},
		// 时值符号转换
		lenStrTransfer: function(lenStr){
			if(lenStr == 0.5){
				return '/';
			}else if(lenStr == 0.25){
				return '//';
			}else if(lenStr == 1){
				return '';
			}else{
				return lenStr;
			}
		},
		/**
		 * 指定位置替换字符串（当end为空时，不包含start。即：从start的位置插入字符串）
		 * @param content 源字符串
		 * @param repStr 替换的内容
		 * @param start 替换开始位置（包含）
		 * @param end 替换结束位置（不包含）可为空
		 * @returns
		 */
		strReplacePos: function(content, repStr, start, end){
			if(typeof(content) == 'undefined' || !content){
				return false;
			}
			if(start >= 0 && end >= 0 && end < start){
				var temp = start;
				start = end;
				end = temp;
			}
			if(start >= 0 && start <= content.length && end >= 0){	
				return content.substring(0, start) + repStr + content.substring(end, content.length);
			}else if(start >= 0 && start <= content.length){
				return content.substring(0, start) + repStr + content.substring(start, content.length);
			}else{
				return content;
			}
		},
		/**
		 * 查找指定位置下字符的索引值
		 * @param content 源字符串
		 * @param str 查找的内容
		 * @param start 查找开始位置（包含）
		 * @param end 查找结束位置（不包含，可为空）
		 */
		findStrPos: function(content, str, start, end){
			if(typeof(content) == 'undefined' || !content){
				return -1;
			}
			if(start >= 0 && end >= 0 && end < start){
				var temp = start;
				start = end;
				end = temp;
			}
			var idx = -1;
			if(start >= 0 && end >= 0){
				idx = content.substring(start, end).indexOf(str);
				if(idx > -1){
					idx += start - 0;
				}
			}else if(start >= 0){
				idx = content.substring(start).indexOf(str);
				if(idx > -1){
					idx += start - 0;
				}
			}else{
				idx = content.indexOf(str);
			}
			return idx;
		},
		// 获取字符串里某个字符的数量
		getStrNum: function(content, str){
			if(typeof(content) == 'undefined' || !content || !str){
				return 0;
			}
			return content.split(str).length - 1;
		},
		// 初始化ABC，新增两个空的声部
		initAbc: function(abcContent, notInitAbc, cb){
			var that = this;
			abcUtil.getData(abcContent, function(beat,speed,L,M){
				that.oneBeatLen = M / L;
				that.beat = beat - 0;
				that.oneBeatDur = M / 0.25 * 384;
				if(notInitAbc){
					typeof(cb) == 'function' && cb(abcContent);
					return;
				}
				var lines = abcContent.split("\n");
				// 当前处理的声部
				var curr_v= "-1";
				var firstV = "-1";//第一个声部的v的值，正常是1
				var loopNum = 0; // 声部循环次数
				var v_pattern = /V:\s*([1-9])/;
				var noteStr = '';
				var delArr = [];
				for(var i = 0, len = lines.length; i < len; i++){
					var line = lines[i];
					if(line.indexOf("V:") > -1){
						var matchs = line.match(v_pattern);
						if(matchs != null && matchs.length > 0){
							curr_v = matchs[1];
						}
						// 碰到多次定义的%%score时， 在后面加上{55 56}来显示伴奏声部
						if(lines[i - 1].indexOf('%%score') > -1){
							lines[i - 1] = lines[i - 1] + ' {55 56}';
						}
						if(firstV == curr_v){
							var addStr = that.getAddStr(noteStr, loopNum);
							
							if(lines[i - 1].indexOf('%%score') > -1){
								lines[i - 1] = addStr + lines[i - 1];
							}else{								
								lines[i] = addStr + line;
							}
							loopNum++;
						}
						noteStr = '';
						if(firstV == "-1"){
							firstV = curr_v;
						}
					}else if(line.indexOf('w:') == -1 && line.replaceAll(/\".*\"/g,"").replace(/\[.[^\]]*\]/,"").replace(/\{.[^\}]*\}/,"").indexOf("|")>-1){
						var lineStr = line.replace(/::/g,":|:").replace(/\|\]/g,"|").replace(/\|:/,"|");
						var lineNodes = lineStr.split("|"); // 将每行中的音符内容，再分为小节单位
						for(var k = 0;k < lineNodes.length; k++){
							var nodeStr = lineNodes[k];
							
							if(nodeStr.replace(/\s+/g,"")!=""){
								var tmpStr = nodeStr.replaceAll(/\[.\:.[^\]]*\]/g,"").replaceAll(/\".[^\"]*\"/g,"");
								var nodeLen = calNodeLen(tmpStr); // 计算小节时值
								if(nodeLen > 0){									
									noteStr += 'z' + nodeLen + '|';
								}
							}
						}
					}
					if(i == len - 1){
						var addStr = that.getAddStr(noteStr, loopNum);
						if(line != '' && line != '\n'){
							lines[i] = line + '\n' + addStr;
						}else{							
							lines[i] = addStr + line;
						}
					}else if(line < len - 1){
						// 统计要删除的lines的索引
						delArr.unshift(i);
					}
				}
				// 删除abc结尾多余的换行
				for(var i = 0, len = delArr.length; i < len; i++){
					lines.splice(delArr[i], 1);
				}
				abcContent = lines.join('\n');
				typeof(cb) == 'function' && cb(abcContent);
			})
		},
		// 获取添加声部的内容
		getAddStr: function(noteStr, loopNum){
			var addStr = loopNum == 0 ? 'V:55 treble\n' : 'V:55\n';
			addStr += noteStr;
			addStr += '\nw:\n';
			
			addStr += loopNum == 0 ? 'V:56 bass\n' : 'V:56\n';
			addStr += noteStr;
			addStr += '\nw:\n';
			
			return addStr;
		},
		// 打开进行伴奏
		open: function(notInitAbc){
			if(this.isOpen){
				this.close();
				return;
			}
			editSplnum.isSelect2play = false;
			draw_editor = false;
			var that = this;
			var $source = $('#' + this.options.sourceId);
			var $content = $('#' + this.options.contentId);
			this.oriAbcContent = $source.val();
			this.oriMusicType = musicType;
			this.oriScore = getAbcKeyValue(this.oriAbcContent, "%%score");
			this.initOpBox();
			this.initAbc($source.val(), notInitAbc, function(abcContent){
				if(!notInitAbc){					
					if(that.oriScore){					
						abcContent = setAbcKeyValue(abcContent, '%%score', that.oriScore + ' {55 56}');
					}else{
						abcContent = setAbcKeyValue(abcContent, '%%score', '1 {55 56}');
					}
				}
				abcContent = setAbcKeyValue(abcContent, '%%pagewidth', $content.width() - 355);
				$source.val(abcContent);
				$('#target').css({
					'float': 'right',
					'padding-bottom': '50px'
				});
				musicType = 0;
				src_change();
				that.isOpen = true;
				that.oriInitAbc = abcContent;
			});
		},
		// 关闭即兴伴奏
		close: function(saveAbc){
			if(!this.isOpen){
				return;
			}
			editSplnum.isSelect2play = this.oriIsSelect2play;
			if(!saveAbc){			
				$('#' + this.options.sourceId).val(this.oriAbcContent);
			}else{
				glo_a_e = null;
				this.sourceObj.abcContentNew = $('#' + this.options.sourceId).val();
			}
			$('#target').css({
				'float': 'none',
				'padding-bottom': '0'
			});
			$('svg').css('display', 'inline-block');
			musicType = this.oriMusicType;
			src_change();
			this.isOpen = false;
			graph_update = false;
			draw_editor = false;
		},
		// 选中一个和弦选项
		chordChoose: function(code, value){
			if(this[code] == value){
				if(code == 'zw'){
					this.zw = -1;
				}
				return;
			}
			if(code == 'hx' && this['zw'] == '3'){
				this['zw'] = '0';
			}
			
			this[code] = value;
			
			var selectText = getSelectText(this.options.sourceId);

			if(selectText != '' && this.zw != '-1'){
				fixedLen = false;
				durSetting = this.dur;
				var note = this.chordSet[this.hx][this.yw][this.zw];
				cen = syms[this.selectNoteSeq];
				var noteInfo = genNoteAndDur(note, cen);
				var noteAndDur = noteInfo.noteStr;
				noteInfo.note = note;
				
				if(this.isEditLyric){		
					editSplnum.noteUpdate.active = true;
					editSplnum.noteUpdate.istart = noteInfo.noteStr[0] == ' ' ? (cen.istart + 1) : cen.istart;
					editSplnum.noteUpdate.lyric = null;
					editSplnum.noteUpdate.line = 0;
				}
				replaceNote(this.options.sourceId, cen.istart, cen.iend, noteInfo);
				// this.noteUpdate(noteInfo.noteStr[0] == ' ' ? (cen.istart + 1) : cen.istart);
			}
		},
		ztClick: function(value){
			var selectText = getSelectText(this.options.sourceId);
			if(selectText && selectText != ''){
				cen = syms[this.selectNoteSeq];
				this.ztRender(value);
			}
		},
		ztRender: function(value){
			var that = this;
			if(!cen){
				return;
			}
			if(that.zw == '-1'){
				that.zw = '0';
			}
			chordNote = ''; 
			var chord = that.chordSet[that.hx][that.yw][that.zw]; // 和弦
			var chordSort = that.getChordSetSort()[that.hx][that.yw][that.zw].split('|'); // 和弦数组
			switch(value){
				case '1':
					var lenStr = that.lenStrTransfer(that.oneBeatLen);
					for(var i = 0; i < that.beat; i++){
						var end = i == that.beat - 1 ? '' : ' ';
						chordNote += chord + lenStr + end;
					}
					break;
				case '2':
					if(that.beat % 3 == 0){
						var lenStr = that.lenStrTransfer(that.oneBeatLen);
						for(var i = 0; i < that.beat; i = i + 3){
							var end = i == that.beat - 3 ? '' : ' ';
							chordNote += chordSort[0]  + lenStr
										+ chord + lenStr
										+ chord + lenStr + end;
						}
					}else if(that.beat % 2 == 0){
						var lenStr = that.lenStrTransfer(that.oneBeatLen / 2);
						for(var i = 0; i < that.beat; i = i + 2){
							var end = i == that.beat - 2 ? '' : ' ';
							chordNote += chordSort[0] + lenStr
										+ chord + lenStr + ' '
										+ chordSort[0] + lenStr
										+ chord + lenStr + end;
						}
					}
					break;
				case '3':
					var chord = that.hx == '3' ? '[' + chordSort[1] + chordSort[2] + ']' : '[' + chordSort[1] + chordSort[2] + chordSort[3] + ']';
					if(that.beat % 3 == 0){
						var lenStr = that.lenStrTransfer(that.oneBeatLen);
						for(var i = 0; i < that.beat; i = i + 3){
							var end = i == that.beat - 3 ? '' : ' ';
							chordNote += chordSort[0]  + lenStr
										+ chord + lenStr
										+ chord + lenStr + end;
						}
					}else if(that.beat % 2 == 0){
						var lenStr = that.lenStrTransfer(that.oneBeatLen / 2);
						for(var i = 0; i < that.beat; i = i + 2){
							var end = i == that.beat - 2 ? '' : ' ';
							chordNote += chordSort[0] + lenStr
										+ chord + lenStr + ' '
										+ chordSort[0] + lenStr
										+ chord + lenStr + end;
						}
					}
					break;
				case '4':
					if(that.hx == '7'){
						break;
					}
					if(that.beat % 3 == 0){
						var lenStr = that.lenStrTransfer(that.oneBeatLen / 2);
						for(var i = 0; i < that.beat; i = i + 3){
							var end = i == that.beat - 3 ? '' : ' ';
							chordNote += chordSort[0] + lenStr
										+ chordSort[1] + lenStr
										+ chordSort[2] + lenStr
										+ chordSort[1] + lenStr
										+ chordSort[2] + lenStr
										+ chordSort[1] + lenStr + end;
						}
					}else if(that.beat % 2 == 0){
						var lenStr = that.lenStrTransfer(that.oneBeatLen / 2);
						for(var i = 0; i < that.beat; i = i + 2){
							var end = i == that.beat - 2 ? '' : ' ';
							chordNote += chordSort[0] + lenStr
										+ chordSort[1] + lenStr
										+ chordSort[2] + lenStr
										+ chordSort[1] + lenStr + end;
						}
					}
					break;
			}
			if(chordNote == ''){
				return;
			}
			rest_status = '';
			fixedLen = true;
			
			var wCount = 20; // 最多循环20次，防止死循环
			while(wCount > 0 && cen.prev && (cen.prev.type == 8 || cen.prev.type == 10)){
				cen = cen.prev;
				wCount--;
			}
			var seq = cen.istart;
			durSetting = that.oneBeatDur * that.beat;
			
			editSplnum.noteUpdate.isNext = true;
			draw_editor = true;
			svgclickhandler();
			draw_editor = false;
//			wCount = 20;
//			cen = syms[seq];
//			while(wCount > 0 && cen &&  cen.next && (cen.next.type == 8 || cen.next.type == 10)){
//				cen = cen.next;
//				that.noteUpdate(cen.istart);
//				wCount--;
//			}
		},
		// 选中一个音符时，选中对应和弦选项
		selectText: function(){
			var selectText = getSelectText(this.options.sourceId);
			if(selectText && selectText != ''){
				selectText = selectText.trim().replace(/[0-9]/g, '').replace(/\//g, '').replace(/\-/g, ''); // 去除空格和时值
				
				var noteArr = str2notes(selectText);		
				var newNoteStr = "";	
				for(var i = 0, len = noteArr.length; i < len;i++){
					newNoteStr += noteArr[i].note;
				}
				newNoteStr = selectText.substring(0, selectText.indexOf("[") + 1) + newNoteStr + selectText.substring(selectText.indexOf("]"));
				var chordSet = this.chordSet;
				for(var i in chordSet){
					for(var j in chordSet[i]){
						for(var k in chordSet[i][j]){
							if(newNoteStr == chordSet[i][j][k]){
								this.hx = i;
								this.yw = j;
								this.zw = k;
								return;
							}
						}
					}
				}
				this.zw = '-1';
			}
		},
		// 音符更新对应标记
		noteUpdate: function(seq, lyricStr, line){
			var $source = $('#' + this.options.sourceId);
			if(!this.isEditLyric){
				return $source.val();
			}
			var lastIStart, lastIEnd;
			if(cen){
				lastIStart = cen.istart;
				lastIEnd = cen.iend;
			}
			line = line ? line : 0;
			var cenN = syms[seq];
			if(!cenN){
				return;
			}
			var v = cenN.v;
			var maxV = 0;
			var abcContent = $source.val();
			var lyric = '';
			if(lyricStr || lyricStr == ''){				
				lyric = lyricStr;
			}else{
				var note = abcContent.substring(cenN.istart, cenN.iend); // 当前音符abc
				note = note.trim().replace(/[0-9]/g, '').replace(/\//g, ''); // 去除空格和时值
				
				var noteArr = str2notes(note);		
				var newNoteStr = "";	
				for(var i = 0, len = noteArr.length; i < len;i++){
					newNoteStr += noteArr[i].note;
				}
				
//				newNoteStr = note.substring(0, note.indexOf("[")) + newNoteStr + note.substring(note.indexOf("]")-1);
//				lyric = this.chordInfo[newNoteStr] || (cenN.type == 10 ? '' : '*');
				lyric = getChordLyric(this.getK($source.val()), newNoteStr) || (cenN.type == 10 ? '' : '*');
			}
			if(cenN.a_ly && cenN.a_ly[line] && lyric != ''){ // 当前有歌词
				var istart = cenN.a_ly[line].istart;
				var iend = cenN.a_ly[line].iend + 1;
				var oriLyric = abcContent.substring(istart, iend);
				if(oriLyric[0] == '|' ||oriLyric[0] == ' '){
					oriLyric = oriLyric.replace('|', '');
					istart++;
				}
				if(oriLyric[oriLyric.length -1] == '|' || oriLyric[oriLyric.length -1] == ' '){
					oriLyric = oriLyric.replace('|', '');
					iend--;
				}
				var lastAbc = this.lastAbc;
				var oriNote = lastAbc.substring(lastIStart, lastIEnd);
				var zIdx = oriNote.indexOf('z');
				// 若被替换的是休止符，则不能直接替换当前对应的歌词，要加上当前对应的音符才对。因为休止符是没有歌词的
				if(lastIStart >= 0 && lastIEnd >= 0 && zIdx > -1 && (zIdx >= oriNote.length || oriNote[zIdx] != ',')){
					abcContent = this.strReplacePos(abcContent, lyric + ' ' + oriLyric, istart,iend);
				}else{
					abcContent = this.strReplacePos(abcContent, lyric, istart,iend);
				}
			}else{ // 当前没有歌词时
				var lines = abcContent.split('\n');
				var lineIndexArr = this.getLineIndexArr();
				var currLine = this.getLineIndex(lineIndexArr, seq);
				var hasW = false;
				var vEnd = -1, 
					vStart = 0;
				for(var i = currLine + 1, iLen = lines.length; i < iLen; i++){
					if(lines[i].indexOf('w:') > -1){
						hasW = true;
					}
					if(lines[i].indexOf('V:') > -1 || (hasW && lines[i].indexOf('w:') == -1 && lines[i].replaceAll(/\".*\"/g,"").replace(/\[.[^\]]*\]/,"").replace(/\{.[^\}]*\}/,"").indexOf("|")>-1)){
						vEnd = lineIndexArr[i].start;
						break;
					}
				}
				
				for(var i = currLine - 1; i >= 0; i--){
					if(lines[i].indexOf('w:') > -1 || lines[i].indexOf('V:') > -1){
						vStart = lineIndexArr[i].end + 1;
						break;
					}
				}
				
				if(vEnd == -1){
					if(abcContent[abcContent.length - 1] != '\n'){
						abcContent = abcContent + '\n';
					}
					vEnd = abcContent.length;
				}
				
				var wStart;  // 当前音符/声部对应的w:的索引
				var wIdxStart = seq; // 用于定位当前行数歌词的前索引
				var firstWStart; // 第一行格子的w:的索引
				for(var l = 0; l <= line; l++){					
					wStart = this.findStrPos(abcContent, 'w:', wIdxStart, vEnd);
					if(wStart <= -1){
						abcContent = this.strReplacePos(abcContent, 'w:\n', vEnd);
						vEnd += 3;
						wStart = this.findStrPos(abcContent, 'w:', wIdxStart, vEnd);
					}
					if(l == 0){
						firstWStart = wStart;
					}
					wIdxStart = wStart + 2;
				}
				// var vStart = abcContent.lastIndexOf('V:', wStart); // 当前音符前面的V:的索引
				var currVC = abcContent.substring(vStart, firstWStart); // 当前声部下的音符内容(可能不是本声部的全部内容，从下个w:或者V:前截断)
				currVC = currVC.replace(/\|\|/g, '|').replace(/\[M\:C\|\]/g, ''); // 把双小节线替换成单小节线, [M:C|]去掉
				var currBarNum = this.getStrNum(currVC, '|'); // 当前声部下面的小节数量
				var currNoteBarIdx = this.getStrNum(abcContent.substring(vStart, seq).replace(/\|\|/g, '|').replace(/\[M\:C\|\]/g, ''), '|'); // 当前音符所在当前声部的小节序号（索引值，从0开始）
				var noteIdx = 0; // 当前音符所在的小节中的序号（索引值）
				
				var cenItem = cenN;
				var count = 20;
				while(count > 0 && cenItem && cenItem.prev && (cenItem.prev.type == 8 || cenItem.prev.type == 10)){
					cenItem = cenItem.prev;
					if(cenItem.type == 8){						
						noteIdx++
					}
					count--;
				}
				
				var wEnd = this.findStrPos(abcContent, '\n', wStart); // 找到w:结束的索引
				if(wEnd == -1){
					wEnd = abcContent.length;
				}
				var wContent = abcContent.substring(wStart, wEnd); // 歌词那一行的内容
				var wBarNum = this.getStrNum(wContent, '|'); // 当前歌词内的小节数量
				for(var i = wBarNum; i < currBarNum; i++ ){ // 歌词内补全小节
					wContent += '|';
				}
				wContent = wContent.replace('w:', ''); // 去掉歌词的前面w:
				var wCList = wContent.split('|'); // 将歌词按小节序号分行
				var cwbContent = wCList[currNoteBarIdx]; // 当前音符所在小节对应的歌词小节
				var cwbcList = cwbContent.split(' '); // 把当前小节的歌词按空格分行（分出各个音符对应的歌词）

				/* 清除掉歌词数组里空的内容 begin */
				var delArr = [];
				for(var i = 0, len = cwbcList.length; i < len; i++){
					if(cwbcList[i] == ''){
						delArr.push(i);
					}
				}
				for(var j = delArr.length - 1; j >=0; j--){
					cwbcList.splice(delArr[j], 1);
				}
				/* 清除掉歌词数组里空的内容 end */
				
				if(noteIdx < cwbcList.length){ // 如果当前音符所在的索引在歌词数组长度内，那么直接替换对应内容就行
					cwbcList[noteIdx] = lyric;
				}else{ // 反之就要往之前补充*号
					for(var i = cwbcList.length; i <= noteIdx; i++){
						if(i == noteIdx){
							cwbcList.push(lyric);
						}else{								
							cwbcList.push('*');
						}
					}
				}
				
				wCList[currNoteBarIdx] = cwbcList.join(' '); // 将小节歌词数组按空格隔开，替换原来的歌词小节数组
				wContent = 'w:' + wCList.join('|'); // 再将歌词小节数组按|隔开，复原成原来的整行歌词
				
				abcContent = this.strReplacePos(abcContent, wContent, wStart, wEnd);
				
				/**
				 * 	当歌词为空字符串时，代表是用休止符替换音符，则需要删除原音符对应的所有歌词
				 *  通过对原音符所在行下面的歌词的遍历，找出音符对应的歌词所在的所有行，并进行替换
				 * */
				if(lyric == '' && currLine >= 0 && noteIdx >= 0 && currNoteBarIdx >= 0){
					lines = abcContent.split('\n');
					var wActive = false; // 是否已经碰到歌词行了
					var cwl = 0; // 歌词行数
					for(var i = currLine + 1, iLen = lines.length; i < iLen; i++){
						if(lines[i].indexOf('w:') > -1){
							if(wActive){
								cwl++;
							}
							wActive = true;
							if(line == cwl){ // 如果当前遍历的歌词行数是已经修改过的，则继续
								continue;
							}
							
							var wStr = lines[i].replace('w:', '').split('|');
							var wStrList = wStr[currNoteBarIdx].split(' ');
							/* 清除掉歌词数组里空的内容 begin */
							var delArr = [];
							for(var k = 0, klen = wStrList.length; k < klen; k++){
								if(wStrList[k] == ''){
									delArr.push(k);
								}
							}
							for(var j = delArr.length - 1; j >=0; j--){
								wStrList.splice(delArr[j], 1);
							}
							/* 清除掉歌词数组里空的内容 end */
							
							wStrList[noteIdx] = ''; // 找到音符的歌词相应位置，用空字符替换原内容
							wStr[currNoteBarIdx] = wStrList.join(' '); // 将小节歌词数组按空格隔开，替换原来的歌词小节数组
							lines[i] = 'w:' + wStr.join('|'); // 再将歌词小节数组按|隔开，复原成原来的整行歌词
						}else if(wActive){
							break;
						}
					}
					abcContent = lines.join('\n');
				}
			}
			$source.val(abcContent);
			this.lastAbc = abcContent;
			if(!lyricStr && lyricStr != ''){
				render();
				log.pop();
				doLog();
			}
			if(this.isOpen && this.selectNoteSeq > 0 && syms[this.selectNoteSeq] && syms[this.selectNoteSeq].iend > 0){
				setSelectRange(document.getElementById(this.options.sourceId),this.selectNoteSeq,syms[this.selectNoteSeq].iend);
			}
			return abcContent;
		},
		// 撤销
		undo: function(){
			if((log.length - 1) >= 1){
				dellog[dellog.length] = log[log.length - 1];
				log.pop();
				$('#' + this.options.sourceId).val(log[log.length - 1]).blur();
				this.lastAbc = $('#' + this.options.sourceId).val();
				render();
			}else if(log.length > 0){
				dellog[dellog.length] = log[log.length - 1];
				$('#' + this.options.sourceId).val(this.oriInitAbc).blur();
				this.lastAbc = $('#' + this.options.sourceId).val();
				log.pop();
				render();
			}
			lastMidiReplaceNoteIstart = -1;
			if(this.isOpen && this.selectNoteSeq > 0 && syms[this.selectNoteSeq] && syms[this.selectNoteSeq].iend > 0){
				setSelectRange(document.getElementById(this.options.sourceId),this.selectNoteSeq,syms[this.selectNoteSeq].iend);
			}
		},
		// 重做
		redo: function(){
			if(dellog.length > 0){
				$('#' + this.options.sourceId).val(dellog[dellog.length - 1]).blur();
				this.lastAbc = $('#' + this.options.sourceId).val();
		        render();
				log[log.length] = dellog[dellog.length - 1];
				dellog.pop();
			}
			lastMidiReplaceNoteIstart = -1;
			if(this.isOpen && this.selectNoteSeq > 0 && syms[this.selectNoteSeq] && syms[this.selectNoteSeq].iend > 0){
				setSelectRange(document.getElementById(this.options.sourceId),this.selectNoteSeq,syms[this.selectNoteSeq].iend);
			}
		},
		// 删除选中音符
		delSelect: function(){
			var st = getSelectText(this.options.sourceId);
			if(!st || st == ''){
				alert('请选中需删除的音符');
				return;
			}
			if(st.indexOf('z') > -1){
				return;
			}
			fixedLen = false;
			var cen = syms[this.selectNoteSeq];
			durSetting = cen.dur;
			var noteInfo = genNoteAndDur('z',cen);
			noteInfo.note = 'z';
			
			if(this.isEditLyric){				
				editSplnum.noteUpdate.active = true;
				editSplnum.noteUpdate.istart = noteInfo.noteStr[0] == ' ' ? (cen.istart + 1) : cen.istart;
				editSplnum.noteUpdate.lyric = null;
				editSplnum.noteUpdate.line = 0;
			}
			
			replaceNote("source",cen.istart,cen.iend,noteInfo);
			if(this.isOpen && this.showSelect && this.selectNoteSeq > 0 && syms[this.selectNoteSeq] && syms[this.selectNoteSeq].iend > 0){
				setSelectRange(document.getElementById(this.options.sourceId),this.selectNoteSeq,syms[this.selectNoteSeq].iend);
			}
			// this.noteUpdate(noteInfo.noteStr[0] == ' ' ? (cen.istart + 1) : cen.istart);
		},
		lenOpea: function(val){
			var selectText = getSelectText(this.options.sourceId);
			if(selectText == ""){
				return;
			}
			fixedLen = false;
			var note = selectText.trim().replace(/[0-9]/g, '').replace(/\//g, '').replace(/\-/g, ''); // 去除空格和时值
			var cen = syms[this.selectNoteSeq];
			if(val == '>'){
				rest_status = '';
				fixedLen = false;
				genNoteDeco(val, '', 'after');									
			}else{
				if(val == '/'){
					durSetting = cen.dur / 2;
				}else {
					durSetting = cen.dur * val;
				}
				var noteInfo = genNoteAndDur(note, cen);
				noteInfo.note = note; 
				replaceNote(this.options.sourceId, cen.istart, cen.iend, noteInfo);
				$('#' + this.options.sourceId).focus();
			}
			if(this.selectNoteSeq > 0 && syms[this.selectNoteSeq] && syms[this.selectNoteSeq].iend > 0){
				setSelectRange(document.getElementById(this.options.sourceId),this.selectNoteSeq,syms[this.selectNoteSeq].iend);
			}
		},
		// 把音符前面的修饰符去掉
		replaceSuffix: function (selectText) {
			var st = selectText.replaceAll(/((![0-9]*!)|(![a-zA-Z]*!)|(!\>!)|(!\<\(!)|(!\<\)!)|(!\>\(!)|(!\>\)!)|\.|(\(\d)|v|u|\>|P)/g, "");
			return st;
		},
		// 改变时值
		lengthClick: function(length, dur){
			this.length = length;
			durSetting = this.dur = dur;
			var selectText = getSelectText(this.options.sourceId);
			// 如果有选中编辑区的内容
			if (selectText != "") {
				fixedLen = false;
				if(selectText.indexOf('[') > -1 && selectText.indexOf(']') > -1){
					chordNote = selectText.trim().replace(/[0-9]/g, '').replace(/\//g, '').replace(/\-/g, ''); // 去除空格和时值;
				}else{
					chordNote = '';
				}
				cen = syms[this.selectNoteSeq];
				genClickNote();
			}
		},
		graphUpdateChange: function(){
			this.graphUpdate = !this.graphUpdate;
			graph_update = this.graphUpdate;
		},
		getLineIndexArr: function(){
			var abc = $('#' + this.options.sourceId).val();
			var lines = abc.split('\n');
			var line = '';
			var start = 0;
			var lineIndexArr = [];
			for(var i = 0, len = lines.length; i < len; i++){
				line = lines[i];
				var obj = {
					start: start,
					end: start + line.length
				}		
				lineIndexArr.push(obj);
				start = obj.end + 1;
			}
			
			return lineIndexArr;
		},
		getLineIndex: function(arr, istart){
			if(!arr || arr.length <= 0 || !istart){
				return 0;
			}
			var left = 0;
			var right = arr.length;
			var mid = 0;
			var count = arr.length;
			while(left < right && count > 0){
				mid = left + parseInt((right - left) / 2);
				if(istart >= arr[mid].start && istart <= arr[mid].end){
					break;
				}else if(istart < arr[mid].start){
					right = mid;
				}else if(istart > arr[mid].end){
					left = mid;
				}
				count--;
			}
			
			return mid;
		},
		updownnote: function(value){
			var selectText = getSelectText("source");
			if(selectText && selectText.indexOf('z') == -1){
				var newNote = updownnote(selectText, value);
				var startPos = getStartPos(document.getElementById("source"));
				var endPos = startPos + selectText.length;
				var content = $("#source").val();
				var newContent = content.substr(0,startPos)+newNote+content.substr(endPos,content.length);
				$("#source").val(newContent);
				render();
				if(this.isOpen && this.selectNoteSeq > 0 && syms[this.selectNoteSeq] && syms[this.selectNoteSeq].iend > 0){
					setSelectRange(document.getElementById(this.options.sourceId),this.selectNoteSeq,syms[this.selectNoteSeq].iend);
				}
			}
		},
		getK: function(abcContent) {
			var reg = new RegExp("K:.*(?=\\n)");
			var reg2 = /K:\s*([CDEFGAB#bm]{1,3})/;
			
			var kRow = reg.exec(abcContent);
			if (!kRow) {
				kRow = [ "K:C" ];
			}
			kRow = kRow[0];

			var k = kRow.replace("K:", "");
			var old_k = "C";
			var old_kvalue = "C";
			if (k != "") {
				old_k = k;
			}
			if (k.indexOf("shift") > -1) {
				var tmp = k.substr(0, k.indexOf("shift"));
				old_k = tmp.replace("K:", "");
			}
			if(k.indexOf("clef")>-1){
				var tmp = k.substr(0, k.indexOf("clef"));
				old_k = tmp.replace("K:", "");
			}
			if(k.indexOf("octave")>-1){
				var tmp = k.substr(0, k.indexOf("octave"));
				old_k = tmp.replace("K:", "");
			}
			
			
			old_k = old_k.replaceAll(" ", "");
			
			var keyMatch = abcContent.match(reg2);
			if(keyMatch!=null){
				old_k = keyMatch[1];
			}
			
			// 关系小调与调号的关联关系，左右相等， 从musicScore中获取
			var json = {
				"Am" : "C",
				"Dm" : "F",
				"Gm" : "Bb",
				"Cm" : "Eb",
				"Fm" : "Ab",
				"Bbm" : "Db",
				"Ebm" : "Gb",
				"Abm" : "Cb",
				"A#m" : "C#",
				"D#m" : "F#",
				"G#m" : "B",
				"C#m" : "E",
				"F#m" : "A",
				"Bm" : "D",
				"Em" : "G",
			}
			if (json[old_k]) {
				old_k = json[old_k];
			}
			return old_k;
		}
	}
	win.PianoImprovisation = PianoImprovisation;
	// 把这个对象附给window底下的 名字叫PianoImprovisation的对象；要不你调用的时候 new PianoImprovisation()
	// 怕在window的环境下找不到；
}(window, document))