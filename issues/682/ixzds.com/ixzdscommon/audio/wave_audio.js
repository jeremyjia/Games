
Vue.component('w-audio', {
    template:
		`<div :id="'p-' + id" class="diy-audio-container" style="width:50%">
			<div style="display:block" class="mf-box" :data-id="'p-' + id" @click.stop="$emit('mf-event','p-' + id, wid)"></div>
			<div class="diy-audio-box" >
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
			tCount: 0
        }
    },
    props:{
		id: String, // 传进来的id，用作音频的id
		src: String, // 传进来的音频src
		starttime: String, // 从某个时间开始 单位s
		wavesurfer: Object,
		wid: String
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
			var audio = this.wavesurfer;
			audio.pause();
			var rate = e.offsetX / $('#p-' + this.id + ' .diy-audio-progress-box').width();
			//audio.currentTime = audio.getDuration() * rate;
			audio.play(audio.getCurrentTime());
			
			this.progress = rate * 100;
			this.time = audio.getDuration() * rate;
			this.timeFormat = this.audioTimeFormat(this.time);
			//audio.play();
		},
		// 点击音量位置调节音量
		setVol: function(e){
			var audio = this.wavesurfer;
			var rate = ($('#p-' + this.id + ' .diy-audio-volume-progress-box').height() - (e.pageY - $('#p-' + this.id + ' .diy-audio-volume-progress-box').offset().top)) / $('#p-' + this.id + ' .diy-audio-volume-progress-box').height();
			this.volume = rate;
			audio.setVolume(rate) ;
		},
		// 监听音频可播放状态
		onCanPlay: function(){
		},
		// 播放/暂停音频
		play: function(code){
			if(this.loading){
				return;
			}
			this.isPlay = !this.wavesurfer.isPlaying();
			this.wavesurfer.playPause()
			
		},
		// 监听音频播放
		onPlay: function(){
		},
		// 监听音频播放暂停
		onPause: function(){
		},
		// 监听音频播放结束
		onEnded: function(){
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
					var duration = audio.getDuration();
					//audio.currentTime = duration * rate;
					
					that.progress = rate * 100;
					that.time = duration * rate;
					that.timeFormat = that.audioTimeFormat(that.time);
				}
			}

			function end() {
				if(flag){
					that.loading = false;
					audio.play(that.time);
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
		},
		
		waveLoaded: function(){
			var that = this;
			clearInterval(that.t);
			that.t = setInterval(function(){
				
				if(that.tCount >= 1000){
					clearInterval(that.t);
					that.tCount = 0;
					console.log(that.tCount)
				}
				that.tCount ++;
				// 加载成功回调
				if(that.wavesurfer && that.wavesurfer.isReady){
					clearInterval(that.t);
					
					that.loading = false;
					// 加载成功了
					var duration = parseInt(that.wavesurfer.getDuration());
					var currentTime = that.wavesurfer.getCurrentTime();
					that.volume = that.wavesurfer.getVolume();
					that.progress = currentTime / duration * 100;
					that.time = currentTime;
					that.timeFormat = that.audioTimeFormat(currentTime);
					
					that.dragProgressHandleEvent(that.wavesurfer);
					that.dragVolumeProgressEvent(that.wavesurfer);
					
					var second = duration;
					that.totaltime = second;
					that.totaltimeFormat = that.audioTimeFormat(second);
					
					//that事件
					that.wavesurfer.on('audioprocess', function(currTime) {
						that.time = currTime;
						that.timeFormat = that.audioTimeFormat(currTime);
						that.progress = that.time / that.totaltime * 100;
					})
					
					that.wavesurfer.on('finish',function(){
						that.timeFormat = that.totaltimeFormat;
						that.isPlay = false;
					})
					
					that.wavesurfer.on('pause', function(){
						//that.timeFormat = that.totaltimeFormat;
						that.isPlay = false;
					})
					that.wavesurfer.on('play', function(){
						that.timeFormat = that.totaltimeFormat;
						that.isPlay = true;
						that.loading = false;
					})
				}
			}, 30);
		},
	},
	created: function(){
		console.log('diy-audio created');
		var that = this;
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
				console.log('请给<w-audio></w-audio>加上唯一id!');
				console.warn('请给<w-audio></w-audio>加上唯一id!');
				console.error('请给<w-audio></w-audio>加上唯一id!');
			}
			// wave加载
			that.waveLoaded();
			//setTimeout(function(){
			//}, 2000)
		})
	},
	destroyed: function(){
		console.log('diy-audio destroyed');
	}
})