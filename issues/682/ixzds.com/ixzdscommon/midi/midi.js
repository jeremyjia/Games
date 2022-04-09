/**
 * midi设备连接
 * 
 * 连接成功失败、琴键按下、松开
 * 
 * @param win
 * @param doc
 * @param undefined
 * @returns
 */
;
(function(win, doc, undefined) {
	"use strict";
	var Midi = function(options) {
		// C 来源于constants.js
		this.options = options = $.extend({
			host : typeof (C) != "undefined" ? C.HOST : '',
			isPerson : false, // 是否查询钢琴和学生的关系(personId、opAccount)，特殊版本才使用，比如江西，一个大屏对应多台无屏幕的钢琴
			isPiano2name : false, // 是否查询钢琴和名称的关联(1号机、2号机)
			isNewRefresh : false,		// 发现新的midi接入，是否刷新页面
			selectAll: false, // 选中全部
			params: {
				TRAIN_ID: '',
				IS_PERSON: 0
			}
		}, options);

		// 兼容旧数据
		if( this.options.isPerson){
			this.options.params.IS_PERSON = 1;
		}
		
		// 连接成功回调
		this.success = options.success || null;

		// 连接失败回调
		this.error = options.error || null;

		// 按下琴键回调
		this.noteOn = options.noteOn || null;

		// 松开琴键回调
		this.noteOff = options.noteOff || null;

		// 是否连接成功
		this.isConnect = false;

		// 连接列表，
		this.midiArr = [];

		// 用户已选中钢琴，因为midiArr中修改 selected的值无效，所以才搞了个 midiSelected. 默认选中全部 midiName ~ true/false
		this.midiSelected = {};

		this.msg = {
			notSupport : '当前浏览器不支持连接midi设备，请更换至谷歌或者火狐浏览器',
			notConnect : '未连接midi设备',
			connSucc : 'midi设备已连接',
			connFail : '启动midi设备失败'
		}

		this.loadCss("/ixzdscommon/minipro/css/popover.css");
		this.loadCss("/ixzdscommon/midi/css/midi.css");
		
		this.initConnect();
	}

	// 给构造函数 对象原型里添加属性（方法）
	Midi.prototype = {
		loadCss : function( href) {
			var fileref = document.createElement('link');
	        fileref.setAttribute("rel","stylesheet");
	        fileref.setAttribute("type","text/css");
	        fileref.setAttribute("href", href);
			
			if(typeof fileref != "undefined"){
		        document.getElementsByTagName("head")[0].appendChild(fileref);
		    }
		},

		// 连接midi设备
		initConnect : function() {
			var that = this;
			if (navigator.requestMIDIAccess) {
				that.isFirstLoad = true;
				navigator.requestMIDIAccess().then(function(midiAccess) {
					that.onMIDIInit(midiAccess);

//					if (!that.options.isNewRefresh) {
//						return;
//					}
//					var count = 2;
//					var method = 1;
//					var intervalId = 0;
//					midiAccess.onstatechange = function(e) {
//						var midiName = e.port.name;
//						if (that.isMidiMessage && that.isMidiMessage[midiName]) {
//							that.isMidiMessage[midiName] = false;
//							return;
//						}
//
//						if (that.options.isNewRefresh) {
//							top.swAutoAlert("检测到有" + (e.port.state == 'connected' ? '新的midi设备接入' : 'midi设备被拔出') + "， 3秒后自动刷新页面", "", function() {
//								location.href = location.href;
//							});
//							return;
//						}
//						// 定时器是为了防止连续多次调用onstatechange方法
//						count = 2;
//						if (intervalId <= 0) {
//							intervalId = setInterval(function() {
//								console.log("onstatechange setInterval ");
//								count--;
//								if (count <= 0) {
//									clearInterval(intervalId);
//									intervalId = 0;
//
//									that.onMIDIInit(midiAccess);
//								}
//							}, 1000);
//						}
//					};
				}, function(err) {
					that.onMIDIReject(err);
				});
			} else {
				that.onError(this.msg.notSupport);
			}
		},
		
		// 连接midi设备，成功回调
		onMIDIInit : function(midiAccess) {
			var that = this;
			var inputs = midiAccess.inputs.values();

			this.isConnect = false;
			this.isMidiMessage = {};
			var midiSelected = {};
			var midiArr = [];
			var count = 0;
			for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
				var midi = input.value;
				if (midi == null) {
					continue;
				}

				that.isMidiMessage[midi.name] = true;
				// 此方法会触发 midiAccess.onstatechange 事件
				midi.onmidimessage = function(event) {
					// console.log("onmidimessage", this.name);
					that.midiMessage(event, this);
				};
				// 是否选中
				midiSelected[midi.name] = midi.selected = true;
				midiArr.push(midi);
				this.isConnect = true;
			}

			this.midiArr = midiArr;
			this.midiSelected = midiSelected;

			if (this.isConnect) {
				if (this.options.isPiano2name || this.options.params.IS_PERSON == '1') {
					this.getPianoList();
				}
				if (typeof this.success == 'function') {
					this.success(midiArr);
				} else {
					top.autoAlert(this.msg.connSucc);
				}
			} else {
				this.onError(this.msg.notConnect);
			}
		},

		// 连接midi设备，失败回调
		onMIDIReject : function(err) {
			this.onError(this.msg.connFail);
		},

		// 返回错误信息
		onError : function(msg) {
			if (typeof this.error == 'function') {
				this.error(msg);
			} else {
				// 连不上这种消息 一个小时提示一次即可
				if( this.msg.notConnect == msg){
					var currTime = new Date().getTime();
					var midiNotConnect = getCookie("midiNotConnect") || 0;
					if( !midiNotConnect || (currTime - midiNotConnect) > 60 * 60 * 1000){
						top.autoAlert(msg);
						setCookie("midiNotConnect", currTime);
					}
					return;
				}
				top.autoAlert(msg);
			}
		},

		// 接收mini信息，比如琴键的按下、松开
		midiMessage : function(event, inputValue) {
			// Mask off the lower nibble (MIDI channel, which we don't care about)
			switch (event.data[0] & 0xf0) {
				case 0x90:
					// if velocity != 0, this is a note-on
					if (event.data[2] != 0) {
						if (typeof this.noteOn == 'function') {
//							console.log("noteOn", inputValue.name);
							this.noteOn(event.data[1], event.timeStamp, event.data[2], inputValue);
						}
						return;
					}
					// if velocity == 0, fall thru: it's a note-off. MIDI's weird, y'all.
				case 0x80:
					if (typeof this.noteOff == 'function') {
						this.noteOff(event.data[1], event.timeStamp, inputValue);
					}
					return;
			}
		},

		// 查询钢琴与学生的关联，查询app.json，目前主要是江西的特殊版本有使用
		getPianoList : function() {
			var that = this;
			var midiArr = this.midiArr;
			var midiSelected = this.midiSelected;

			$.ajax({
				async : false,
				cache : false,
				type : 'POST',
				dataType : "json",
				url : this.options.host + "HttpChannel?action=WEBSITE_ACTION&BUSINESS_TYPE=imusic.main!getPianoJson&interface=1",// 请求的action路径
				data : this.options.params,
				success : function(res) {
					if (res.result == 1 && res.data) {
						var rows = JSON.parse(res.data);
						var len = rows.length;
						var json = {};
						var teacPianoName = null;
						for (var i = 0; i < len; i++) {
							var row = rows[i];
							json[row.midiName] = row;
							if( row.isTeac == '1'){
								teacPianoName = row.midiName;
							}
						}

						len = midiArr.length;
						for (var i = 0; i < len; i++) {
							var row = midiArr[i];
							var midiName = row.name;
							var person = json[midiName];
							if (person) {
								row.personId = person.personId || "";
								row.opAccount = person.opAccount || "";
								row.opName = person.opName || "";
								row.pianoName = person.pianoName;
								row.ordidx = person.ordidx || 1;
								row.isTeac = person.isTeac || 0;
							} else {
								row.pianoName = row.name;
								row.ordidx = 1;
							}

							// 有设置教师机的时候，默认只选中教师机，midi连接时已经默认登陆
							if( teacPianoName != null && teacPianoName != midiName){
								row.selected = midiSelected[ midiName] = false;
							}
						}

						// 按序号排序
						midiArr.sort(function(a, b) {
							return a.ordidx - b.ordidx;
						})
					}
				}
			});
		},

		// 点击学生机
		midiClick : function(model) {
			model.selected = this.midiSelected[model.name] = !this.midiSelected[model.name];
		},

		// 是否选中
		isSelected : function(model) {
			var selected = this.midiSelected[model.name];
			if (selected != undefined) {
				return selected;
			}
			return model.selected;
		},

		// 选中全部 / 取消全选
		selectAll : function(isChecked) {
			var midiArr = this.midiArr;
			var len = midiArr.length;
			for (var i = 0; i < len; i++) {
				var row = midiArr[i];
				this.midiSelected[row.name] = row.selected = isChecked;
			}
		},

		// 选中学生机名称
		selPersonName : function() {
			var midiArr = this.midiArr;
			var len = midiArr.length;

			var count = 0;
			var name = '';
			for (var i = 0; i < len; i++) {
				var row = midiArr[i];
				if (row.selected) {
					var cname = row.pianoName || row.name;
					count++;
					if (count > 3) {
						name += "，" + cname.substr(0, 2) + " ...";
						break;
					}
					name += "，" + cname;
				}
			}
			if (name !== '') {
				name = name.substring(1);
			} else {
				name = '暂无';
			}
			return name;
		}
	}

	win.Midi = Midi;
	// 把这个对象附给window底下的 名字叫 Midi的对象；要不你调用的时候 new Midi() 怕在window的环境下找不到 ；
}(window, document))