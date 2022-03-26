Vue.component('diy-slide', {
	template : 
		`<div :id="id" class="carousel slide diy-carousel" :class="slide.CLS" data-ride="carousel">
			<ol v-if="slide.IS_SHOW_INDICATOR && slide.IS_SHOW_INDICATOR != '0'" class="carousel-indicators">
				<li :data-target="'#' + id" v-for="(model, index) in slide.ITEMS" :data-slide-to="index" :class="{active : index == 0}"></li>
			</ol>

			<div class="carousel-inner">
				<div class="carousel-item" v-for="(model, index) in slide.ITEMS" :class="{active : index == 0}">
					<img class="img-fluid" :src="model.URL" :alt="model.CAPTION" @dblclick="$emit('img-preview',model)">
					<div v-if="model.CAPTION" class="carousel-caption">
						<h5 v-if="model.CAPTION" v-html="model.CAPTION"></h5>
						<p v-if="model.TEXT" v-html="model.TEXT"></p>
					</div>
				</div>
			</div>
			<a class="carousel-control-prev" v-if="slide.IS_SHOW_ARROW && slide.IS_SHOW_ARROW != '0'" :href="'#' + id" data-slide="prev"> 
				<span class=""></span>
			</a> 
			<a class="carousel-control-next" v-if="slide.IS_SHOW_ARROW && slide.IS_SHOW_ARROW != '0'" :href="'#' + id" data-slide="next"> 
				<span class=""></span>
			</a>
		</div>`,
	data : function() {
		return {
			
		// slide : {
		// IS_SHOW_ARROW: true, // 是否显示上一页，下一页箭头
		// IS_SHOW_INDICATOR: true, // 是否显示指示器
		// INTERVAL: 5000, // 定时跳转时间，单位毫秒
		// CLS: '', // 页面跳转样式，为空默认翻页，carousel-fade淡入淡出
		// ITEMS: [{
			// TIME: 3.00,
		// URL: 'http://placehold.it/900x500/39CCCC/ffffff&text=I+Love+Bootstrap',
		// CAPTION: 'cool caption', // 标题
		// TEXT: 'i am text', // 文本内容
		// },
		// {
			// TIME: 5.00,
		// URL: 'http://placehold.it/900x500/39CCCC/ffffff&text=I+Love+Bootstrap2',
		// CAPTION: 'cool caption2', // 标题
		// TEXT: 'i am text2', // 文本内容
		// },
		// {
			// TIME: 7.00,
		// URL: 'http://placehold.it/900x500/39CCCC/ffffff&text=I+Love+Bootstrap3',
		// CAPTION: 'cool caption3', // 标题
		// TEXT: 'i am text3', // 文本内容
		// }]
		// }
		}
	},
	props : [ 'id', 'slide' ],
	methods : {
		init : function() {
			var that = this;
			// 设置一个小时才自动翻一页， 方便自己通过定时器，设置每页的停留时间
			var items = this.slide.ITEMS;
			var $obj = $('#' + this.id);
			
			this.isStop = false;
			$obj.carousel({
				interval : 60 * 60 * 1000
			}).on('slide.bs.carousel', function (e) {
				that.time2next( that, $obj, items[e.to].TIME);
			}).on('mouseenter', function (e) {
				that.isStop = true;
			}).on('mouseleave', function (e) {
				that.isStop = false;
			})
			
			that.time2next( that, $obj, items[0].TIME);
		},
		
		time2next : function(that, $obj, time) {
			if( that.myVar){
				clearTimeout( that.myVar);
				that.myVar = 0;
			}
			
			that.myVar = setTimeout(function(){
				if( that.isStop){
					that.time2next( that, $obj, time);
				}else{
					$obj.carousel("next");
				}
			}, time);
		},

		dispose : function() {
			$('#' + this.id).carousel('dispose');
		},

		remove : function(index) {
			this.slide.ITEMS.splice(index, 1);
		}
	},
	watch : {
		'slide.ITEMS' : function() {
			this.init();

			// 起码也要选中一个，不然幻灯片效果失效
			if ($(".carousel-item active").length == 0) {
				$(".carousel-item:eq(0)").addClass("active");
			}
		}
	},
	created : function() {
		var that = this;
		if (!this.id) {
			this.id = 'audio' + new Date().getTime();
		}

		if (this.slide.IS_SHOW_ARROW == undefined) {
			this.slide.IS_SHOW_ARROW = true;
		}
		if (this.slide.IS_SHOW_INDICATOR == undefined) {
			this.slide.IS_SHOW_INDICATOR = true;
		}
		
		if( !this.slide.isLoad){
			this.slide.isLoad = true;
			var items = this.slide.ITEMS;
			for (var i = 0; i < items.length; i++) {
				var item = items[i];
				var arr = ((item.TIME || 5) + "").split(".");
				var second = arr[0] * 1000;
				if( arr.length > 1){
					var minsec = arr[1];
					if( minsec.length < 3){
						minsec = minsec * (10 * (3 - minsec.length));
					}
					second += parseInt(minsec);
				}
				item.TIME = second;
			}
		}

		Vue.nextTick(function() {
			that.init();
		})
	},
	destroyed : function() {
		console.log('diy-slide destroyed');
	}
})