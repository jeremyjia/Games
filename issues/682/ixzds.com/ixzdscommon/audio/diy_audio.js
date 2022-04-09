
Vue.component('d-audio', {
    template:
		`<div :id="'p-' + id" class="diy-audio-container">
			<div class="exp-btn-box">
				<div :class="'mf-box ' + (type == 'musicform' ? ' mf-btn':'xs-btn')" :data-id="'p-' + id" @click.stop="$emit('mf-event','p-' + id, wid)" :style="'width:'  + hei + 'px;height:' + hei + 'px;'"></div>
				<div class="mf-edit-btn" v-show="isauth" :data-id="'p-' + id" @click.stop="$emit('mf-edit-event','p-' + id, wid)" :style="'width:'  + hei + ';height:' + hei"></div>
				<div class="mf-opus-btn" v-show="isauth" :data-id="'p-' + id" @click.stop="$emit('mf-opus-event','p-' + id, wid)" :style="'width:'  + hei + ';height:' + hei"></div>
			</div>
			<div class="diy-audio-box" >
				<audio :id="id" :src="src" @canplay="onCanPlay" @pause="onPause" @play="onPlay" @ended="onEnded"></audio>
				<div class="diy-audio-play-btn" @click="play(isPlay ? '0' : '1')">
					<div class="diy-audio-play-img" :class="isPlay ? 'pause' : 'play'" @touch="play(isPlay ? '0' : '1')"></div>
				</div>
				<div class="diy-audio-time-box"><span>{{timeFormat}}</span></div>
				<div class="diy-audio-progress-box" @click="seek">
					<div class="diy-audio-progress" :style="'width:'  + progress + '%'">
						<div class="diy-audio-progress-handle" @click.stop=""></div>
						<div class="diy-audio-progress-handle-loading" v-show="loading"></div>
					</div>
				</div>
				<div class="diy-audio-time-box"><span>{{totaltimeFormat}}</span></div>
				<div class="diy-audio-volume-box">
					<div class="diy-audio-volume" @click.stop="showVolume"></div>
					<div class="diy-audio-volume-control" @click.stop="">
						<div class="diy-audio-volume-progress-box" @click.stop="setVol">
							<div class="diy-audio-volume-progress" :style="'height:' + (volume * 100) + '%'">
								<div class="diy-audio-volume-progress-handle" @click.stop=""></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>`,
    data:function(){
        return {
            progress: 0, // 音频播放进度
			timeFormat: '00:00', // 当前播放时间
			totaltimeFormat: '00:00', // 音频时长
			isPlay: false, // 是否在播放
			volume: 1.0, // 音量 0~1
			t: null, // 定时器
			totaltime: 0, // 音频时长 单位：秒
			time: 0, // 当前播放时长 单位：秒
			showVolCtrl: false, // 是否显示音量控制器
			loading: true, // 是否在加载
        }
    },
    props:{
		id: String, // 传进来的id，用作音频的id
		src: String, // 传进来的音频src
		starttime: String, // 从某个时间开始 单位s
		wid: String,
		isauth: Boolean,
		type: String,
		hei: String
    },
    watch:{
    	// 当音频的地址有变化的时候， 初始化各项属性
    	src: function(){
    		this.progress = 0;
    		this.timeFormat = '00:00';
    		this.totaltimeFormat = '00:00';
    		this.isPlay = false;
    		this.totaltime = 0;
    		this.time = 0;
    	}
    },
	methods:{
		// 点击进度条跳转播放位置
		seek: function(e){
			if(this.loading){
				return;
			}
			this.loading = true;
			var audio = document.getElementById(this.id);
			audio.pause();
			var rate = e.offsetX / $('#p-' + this.id + ' .diy-audio-progress-box').width();
			audio.currentTime = audio.duration * rate;
			this.progress = rate * 100;
			this.time = audio.duration * rate;
			this.timeFormat = this.audioTimeFormat(this.time);
			audio.play();
		},
		// 点击音量位置调节音量
		setVol: function(e){
			var audio = document.getElementById(this.id);
			var rate = ($('#p-' + this.id + ' .diy-audio-volume-progress-box').height() - (e.pageY - $('#p-' + this.id + ' .diy-audio-volume-progress-box').offset().top)) / $('#p-' + this.id + ' .diy-audio-volume-progress-box').height();
			this.volume = rate;
			audio && (audio.volume = rate);
		},
		// 监听音频可播放状态
		onCanPlay: function(){
			console.log( "onCanPlay");
			this.loading = false;
			var audio = document.getElementById(this.id);
			if( !audio){
				return;
			}
			if(audio.paused){
				this.isPlay = false;
			}
			this.volume = audio.volume;
			this.progress = audio.currentTime / audio.duration * 100;
			this.time = audio.currentTime;
			this.timeFormat = this.audioTimeFormat(audio.currentTime);
			this.dragProgressHandleEvent(audio);
			this.dragVolumeProgressEvent(audio);
			var second = audio.duration;
			this.totaltime = second;
			this.totaltimeFormat = this.audioTimeFormat(second);
		},
		// 播放/暂停音频
		play: function(code){
			if(this.loading){
				return;
			}
			if(code == '1'){
				this.loading = true;
				// document.getElementById(this.id).load();
				var audio =  document.getElementById(this.id);
				if(this.starttime && this.starttime > audio.currentTime){
					audio.currentTime = this.starttime;
				}
				document.getElementById(this.id).play();
			}else{
				document.getElementById(this.id).pause();
			}
		},
		// 监听音频播放
		onPlay: function(){
			this.$emit('play', $('#' + this.id));
			this.loading = false;
			var that = this;
			this.isPlay = true;
			this.t = setInterval(function(){
				try{
					var second = document.getElementById(that.id).currentTime;
					that.time = second;
					that.timeFormat = that.audioTimeFormat(second);
					that.progress = that.time / that.totaltime * 100;
				}catch(e){
					that.onPause();
				}
			}, 500);
		},
		// 监听音频播放暂停
		onPause: function(){
			this.isPlay = false;
			clearInterval(this.t);
		},
		// 监听音频播放结束
		onEnded: function(){
			this.timeFormat = this.totaltimeFormat;
			this.isPlay = false;
			this.progress = 100;
			clearInterval(this.t);
		},
		// 显示音量控制
		showVolume: function(){
			if(this.showVolCtrl){
				$('#p-' + this.id + ' .diy-audio-volume-control').hide();
				$('#p-' + this.id + ' .diy-audio-volume-control').removeClass('show-top');
			}else{
				if($('#p-' + this.id).offset().top > 120){
					$('#p-' + this.id + ' .diy-audio-volume-control').addClass('show-top');
				}
				$('#p-' + this.id + ' .diy-audio-volume-control').show();
			}
			this.showVolCtrl = !this.showVolCtrl;
		},
		// 音频进度拖拽事件
		dragProgressHandleEvent: function(audio){
			var that = this;
			var $handle = $('#p-' + this.id + ' .diy-audio-progress-handle');

			var position = {
				oriOffestLeft: 0, // 移动开始时进度条的点距离进度条的偏移值
				oriX: 0, // 移动开始时的x坐标
				maxLeft: 0, // 向左最大可拖动距离
				maxRight: 0 // 向右最大可拖动距离
			};
			
			var flag = false;

			// 鼠标按下时
			$handle.mousedown(down);
			$handle.on('touchstart', down);

			// 开始拖动
			$(document).mousemove(move);
			$(document).on('touchmove', move);

			// 拖动结束
			$(document).mouseup(end);
			$(document).on('touchend', end);

			function down(event) {
				if(that.loading){
					return;
				}
				flag = true;
				audio.pause();
				position.oriOffestLeft = $(this)[0].offsetLeft + 11;
				position.oriX = event.originalEvent.targetTouches ? event.originalEvent.targetTouches[0].clientX : event.clientX; // 要同时适配mousedown和touchstart事件
				position.maxLeft = position.oriOffestLeft; // 向左最大可拖动距离
				position.maxRight = $(this).parent().parent()[0].offsetWidth - position.oriOffestLeft; // 向右最大可拖动距离
				// 禁止默认事件（避免鼠标拖拽进度点的时候选中文字）
				if (event && event.preventDefault) {
					event.preventDefault();
				} else {
					event.returnValue = false;
				}

				// 禁止事件冒泡
				if (event && event.stopPropagation) {
					event.stopPropagation();
				} else {
					window.event.cancelBubble = true;
				}
			}

			function move(event) {
				if (flag) {
					var clientX = event.originalEvent.targetTouches ? event.originalEvent.targetTouches[0].clientX : event.clientX; // 要同时适配mousemove和touchmove事件
					var length = clientX - position.oriX;
					if (length > position.maxRight) {
						length = position.maxRight;
					} else if (length < -position.maxLeft) {
						length = -position.maxLeft;
					}
					var pgsWidth = $('#p-' + that.id + ' .diy-audio-progress-box').width();
					var rate = (position.oriOffestLeft + length) / pgsWidth;
					audio.currentTime = audio.duration * rate;
					that.progress = rate * 100;
					that.time = audio.duration * rate;
					that.timeFormat = that.audioTimeFormat(that.time);
				}
			}

			function end() {
				if(flag){
					that.loading = true;
					audio.play();
				}
				flag = false;
			}
			
		},
		// 音量大小拖拽事件
		dragVolumeProgressEvent: function(audio){
			var that = this;
			var $handle = $('#p-' + this.id + ' .diy-audio-volume-progress-handle');

			var position = {
				oriOffestBottom: 0, // 移动开始时进度条的点距离进度条的偏移值
				oriY: 0, // 移动开始时的y坐标
				maxBottom: 0, // 向下最大可拖动距离
				maxTop: 0 // 向上最大可拖动距离
			};
			
			var vflag = false;

			// 鼠标按下时
			$handle.mousedown(down);
			$handle.on('touchstart', down);

			// 开始拖动
			$(document).mousemove(move);
			$(document).on('touchmove', move);

			// 拖动结束
			$(document).mouseup(end);
			$(document).on('touchend', end);

			function down(event) {
				vflag = true;
				position.oriOffestBottom = $(this)[0].offsetTop + $(this).parent().height() + 10;
				position.oriY = event.originalEvent.targetTouches ? event.originalEvent.targetTouches[0].clientY : event.clientY; // 要同时适配mousedown和touchstart事件
				position.maxBottom = position.oriOffestBottom; // 向下最大可拖动距离
				position.maxTop = $(this).parent().parent()[0].offsetHeight - position.oriOffestBottom; // 向上最大可拖动距离
				// 禁止默认事件（避免鼠标拖拽进度点的时候选中文字）
				if (event && event.preventDefault) {
					event.preventDefault();
				} else {
					event.returnValue = false;
				}

				// 禁止事件冒泡
				if (event && event.stopPropagation) {
					event.stopPropagation();
				} else {
					window.event.cancelBubble = true;
				}
			}

			function move(event) {
				if (vflag) {
					var clientY = event.originalEvent.targetTouches ? event.originalEvent.targetTouches[0].clientY : event.clientY; // 要同时适配mousemove和touchmove事件
					var length = position.oriY - clientY;
					if (length > position.maxTop) {
						length = position.maxTop;
					} else if (length < -position.maxBottom) {
						length = -position.maxBottom;
					}
					var pgsHeight = $('#p-' + that.id + ' .diy-audio-volume-progress-box').height();
					var rate = (position.oriOffestBottom + length) / pgsHeight;
					that.volume = rate;
					audio.volume = rate;
				}
			}

			function end(event) {
				vflag = false;
				// 禁止事件冒泡
				if (event && event.stopPropagation) {
					event.stopPropagation();
				} else {
					window.event.cancelBubble = true;
				}
			}
		},
		// 时间格式化 秒 ——> HH:mm:ss格式
		audioTimeFormat: function(second){
			var h = Math.floor(second / 3600) < 10 ? '0'+Math.floor(second / 3600) : Math.floor(second / 3600);
			var m = Math.floor((second / 60 % 60)) < 10 ? '0' + Math.floor((second / 60 % 60)) : Math.floor((second / 60 % 60));
			var s = Math.floor((second % 60)) < 10 ? '0' + Math.floor((second % 60)) : Math.floor((second % 60));
			if(h && h !='00'){
				return h + ":" + m + ":" + s;
			}else{
				return m + ":" + s;
			}
		}
	},
	created: function(){
		console.log('diy-audio created');
		var that = this;
		
		if( this.hei){
			this.hei = parseInt( this.hei.replace("px", ""));
			if( this.hei > 60){
				this.hei = 60;
			}
		}else{
			this.hei = 60;
		}
		
		$(window).click(function(){
			$('.diy-audio-volume-control').hide();
			that.showVolCtrl = false;
		})
		var u = navigator.userAgent;
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
		if(isIOS){
			that.loading = false;
		}
		Vue.nextTick(function(){
			if(!that.id){
				that.id = 'audio' + new Date().getTime();
				console.log('请给<d-audio></d-audio>加上唯一id!');
				console.warn('请给<d-audio></d-audio>加上唯一id!');
				console.error('请给<d-audio></d-audio>加上唯一id!');
			}
		})
	},
	destroyed: function(){
		console.log('diy-audio destroyed');
	}
})