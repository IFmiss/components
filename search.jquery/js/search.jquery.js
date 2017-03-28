
(function($){
	// this is about search plugin
	$.fn.search = function(options){
		var _this = this;
		var $this = $(this);

		_this.defaultvalue = {
			source: [{
                    href:'http://www.daiwei.org/',
                    text:'投资与理财的知识',
                },{ 
                    href:'http://www.daiwei.org/',
                    text:'2016基金从业考试 免费速成班 上',
                },{
                    href:'http://www.daiwei.org/',
                    text:'2016 基金从业考试 速成班 下',
                },{
                    href:'http://www.daiwei.org/',
                    text:'跟金融行家学理财',
                },{
                    href:'http://www.daiwei.org/',
                    text:'海外并购流程',
                },{
                    href:'http://www.daiwei.org/',
                    text:'债券承销与投资实务',
                },{
                    href:'http://www.daiwei.org/',
                    text:'基础财务建模',
                },{
                    href:'http://www.daiwei.org/',
                    text:'Excel 快捷键教学(上)-如何提高三倍的工作效率',
                },{
                    href:'http://www.daiwei.org/',
                    text:'2016 基金从业考试 速成班 下',
                },{
                    href:'http://www.daiwei.org/',
                    text:'跟金融行家学理财',
                },{
                    href:'http://www.daiwei.org/',
                    text:'海外并购流程',
                },{
                    href:'http://www.daiwei.org/',
                    text:'债券承销与投资实务',
                },{
                    href:'http://www.daiwei.org/',
                    text:'基础财务建模',
                }],
			type:'fuzzyquery',		//类型fuzzyquery有模糊查询   none 就是普通的搜索 
			keyboard:true,      //是否支持键盘操作
			fouceshowlist:true,     //是否在inputfouce状态下显示模糊列表
			items: 8,    //最多显示内容数量

			showSearchDiscription:true,    //是否显示描述
			searchDiscription:'powered by Never forgotten youth',
			showSearchIcon:false,    //是否显示Icon
			searchBtnBackground:'#66A0CE',     //默认搜索样式的颜色
			searchBtnWidth:42,     //搜索按钮的宽度
			searchAreaWidth:320,  	   //搜索区域的宽度
			searchAreaHeight:36,  		//搜索区域的高度

			showListInInput:false,     //是否在hover  按键选择列表时把文字射入到input中

			itemSelected:function(){},    //选中之后要做的事情
			enterToSelect:true,      //回车直接搜索
		}


		var opt = $.extend(_this.defaultvalue,options||{});
		var date = new Date();
		var length = opt.source.length > opt.items-1? opt.items : opt.source.length;
		var isshow = false;

		//初始化
		var _init = function(){
			$this.wrap("<div class='dw-search-div search-"+date.valueOf()+"'></div>");
			$(".search-"+date.valueOf()+"").css({
				width:opt.searchAreaWidth,
				height:opt.searchAreaHeight,
				position:'relative',
				margin:'0 auto',
			});
			_this.showListUl = $('<ul class="ul_searchList" id="ul_searchList"></ul>').appendTo($(".search-"+date.valueOf()+""));
			if(opt.fouceshowlist){
				for(var i = 0;i<length;i++){
					!function(list,index){
						_this.showListLi = $('<li class="li_searchList"><a class="txt-textOneRow" href="'+list.href+'">'+list.text+'</a></li>').appendTo(_this.showListUl);
					}(opt.source[i],i);
				}

				//显示带不带图标还是直接显示文字的按钮
				if(opt.showSearchIcon){
					_this.btn_search = $('<div class="submit_search"><i class="icon-search"></i></div>').css({
						width:opt.searchBtnWidth,
						backgroud:opt.searchBtnBackground,
					}).appendTo($(".search-"+date.valueOf()+""));
				}else{
					_this.btn_search = $('<div class="submit_search no_img">搜索</div>').appendTo($(".search-"+date.valueOf()+""));
				}

				//显示下拉菜单的小tips  描述
				_setcoperight();
			}
			//绑定
			_bindtext();
			//监听
			_listen();
			//按钮
			_keypress();
		}

		// var _focus = function(){
		// 	if($this.is(':focus')){
		// 		_this.showListUl.show();
		// 	}
		// }

		var _listen = function(){
			console.log(opt.keyboard);
			$this.on('blur', $.proxy(_blur, this))
				.on('focus', $.proxy(_focus, this))
                 // .on('keyup', $.proxy(this.keyup, this));

            if(opt.keyboard){
            	$this.on('keydown', $.proxy(_keypress, this));
            }

            _this.showListUl.on('click', $.proxy(_click, this))
                      .on('mouseenter', 'li', $.proxy(_mouseenter, this))
                      .on('mouseout', 'li', $.proxy(_mouseout, this));
		};


		var _keypress = function (e) {
            // e.stopPropagation();
            if (!isshow) {
                return;
            }

            switch (e.keyCode) {
                case 9:
                    // tab
                case 13:
                    // enter
                    e.preventDefault();
                    _enter();
                    break;
                case 27:
                    // escape
                    e.preventDefault();
                    _enter();
                    break;
                case 38:
                    // up arrow
                    e.preventDefault();
                    _prev();
                    break;
                case 40:
                    // down arrow
                    e.preventDefault();
                    _next();
                    break;
            }
        };

        // 键盘按下一个
        var _next = function(){
        	var active = _this.showListUl.find('.active').removeClass('active');
            var next = active.next();
            if (!next.length || next.is('p')) {
                next = $(_this.showListUl.find('li')[0]);
            }

            next.addClass('active');
            _textnamehtmlinput(next);
        }

        // 键盘按上一个
        var _prev = function(){
        	var active = _this.showListUl.find('.active').removeClass('active');
            var prev = active.prev();

            if (!prev.length) {
                prev = $(_this.showListUl.find('li').last());
            }

            prev.addClass('active');
            _textnamehtmlinput(prev);
        }

		var _blur = function (e) {
            var that = _this.showListUl;
            e.stopPropagation();
            e.preventDefault();
            setTimeout(function () {
                if (!$this.is(':focus')) {
                  that.fadeOut();
                }
            }, 250);

            isshow = false;
        };

        var _enter = function (){
        	if(opt.enterToSelect){
        		_select();
        	}else{
        		$this.val(_this.showListUl.find('.active').text());
        	}
        };

        // 列表点击事件 
        var _click = function(e){
        	e.stopPropagation();
            e.preventDefault();
            _select();
        };

        var _select = function(){
            var selectedItem = _this.showListUl.find('.active');
            opt.itemSelected(selectedItem, selectedItem.find('a').attr('href'), selectedItem.text());
            // this.$element.val($selectedItem.text()).change();
            // this.options.itemSelected($selectedItem, $selectedItem.attr('data-value'), $selectedItem.text());
            return this;
        };

        // 鼠标移入事件
        var _mouseenter = function(e){
        	_this.showListUl.find('.active').removeClass('active');
        	_textnamehtmlinput(e);
        }

        var _mouseout = function(e){
        	_this.showListUl.find('.active').removeClass('active');
        }


        var _textnamehtmlinput = function (e){
        	if(opt.showListInInput){
        		if(e.currentTarget === undefined){
        			//文字的值传入input搜索栏
		        	$this.val(e.text());
        		}else{
        			//文字的值传入input搜索栏
		        	$this.val(e.currentTarget.textContent);
        		}
        	}else{
        		$(e.currentTarget).addClass('active');
        	}
        }


        var _focus = function(e) {
            var that = _this.showListUl;
            e.stopPropagation();
            e.preventDefault();

          	//解决打开心的页面返回之后   搜索有内容 有焦点的话   依然显示所有内容  而不是当前搜索的内容
            var keyWord = $('.form_hiSearch').val();
            _showListByKetword(keyWord);
            

            // that.show();
            setTimeout(function () {
                if ($this.is(':focus')) {
                  that.fadeIn();
                }
            }, 0);

            isshow = true;
        };

        // input 文字改变实时监听
        var _bindtext = function(){
        	//显示下拉菜单的小tips  描述
			if(opt.showSearchDiscription){
        		$this.bind('input propertychange', function(){
        			var keyWord = $('.form_hiSearch').val();
					_showListByKetword(keyWord);
        		});
        	}
        }

        var _showListByKetword = function(keyword){
        	var keyWord = keyword || '';
        	if (keyWord === '') {
				_reset();
			}
			var arr = [];
			var str = '';
			var itemIndex = 0 ;
			var reg = new RegExp(keyWord);
			// console.log(itemIndex);
			for(var i=0;i<opt.source.length;i++){
				if(itemIndex > opt.items){
					itemIndex = 0;
					return;
				}

			 	!function(list,index){
					if(list.text.match(reg)){
						itemIndex ++ ;
						// arr.push(list[i]);
						str += '<li class="li_searchList"><a class="txt-textOneRow" href="'+list.href+'">'+list.text+'</a></li>';
					}
				}(opt.source[i],i);
			}
			_this.showListUl.html(str);
        }

        //显示下拉菜单的小tips  描述
        var _setcoperight = function(){
        	if(opt.showSearchDiscription){
        		_this.search_discription = $('<p class="search_discription"><a href="http://www.daiwei.org/">'+opt.searchDiscription+'</a></p>').appendTo(_this.showListUl);
        	}
        }


        // 重置,当文本清除的时候
        var _reset = function(){
        	var str = '';
        	for(var i = 0;i<length;i++){
				!function(list,index){
					str += '<li class="li_searchList"><a class="txt-textOneRow" href="'+list.href+'">'+list.text+'</a></li>';
				}(opt.source[i],i);
			}
			_this.showListUl.html(str);
			_setcoperight();
        }
		// var fnOnfoucs = fun


		return _this.each(function () {
			_init();
		});
	}


})(jQuery);