jquery search
====

### 1.参数(options)

* source :<br/>
数据 有href 和 text 两个属性

* keyboard:<br/>
是否支持键盘操作 (默认为true)

* fouceshowlist:<br/>
是否在input为fouce状态下显示模糊列表 (默认为true)

* items :<br/>
模糊显示的列表数量 (默认为 8)

* showSearchDiscription:<br/>
是否显示描述 (默认为true)

* searchDiscription :<br/>
描述内容

* showSearchIcon:<br/>
是否显示Icon( Icon 代替按钮的文本 ‘搜索’ )

* searchBtnBackground：<br/>
搜索按钮的颜色

* searchAreaWidth：<br/>
搜索的宽度(包括输入框和按钮)

* searchAreaHeight：<br/>
搜索区域的高度( input 的高度 )

* searchBtnWidth：<br/>
按钮的宽度

* searchBtnWidth :<br/>
是否在选择列表的时候input显示列表的内容

* enterToSelect :<br/>
是否按回车直接搜索

* itemSelected:<br/>
选中后 enter或者点击列表之后的callback

* searchBtnClick：<br/>
点击按钮之后做的事情了

### 2.使用方法


    $('.testSearch').search({
      itemSelected:function(ele,elehref,eletext){
        // window.location.href = elehref;
        alert('这是点击搜索的内容之后的操作，可以f12 看参数 ele elehref eletext');
        console.log(ele);
        console.log(elehref);
        console.log(eletext);
      },
      searchBtnClick:function(){
        alert('你点击了搜索按钮');
      }
    });
    
[在线演示链接  link](http://www.daiwei.org/works/Others/search.jquery/)  
