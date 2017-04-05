/*===========================================*/
/*==========By Never forgotten youth=========*/
/*================================2017-2-8===*/
'use strict';
(function($,window){ 

  var DW = {};

  // *********如果没有jq则创建一个js*************
  // if(typeof(jQuery) === "undefined"){
  //  var script=document.createElement("script");  
  //  script.type="text/javascript";  
  //  script.src="http://apps.bdimg.com/libs/jquery/2.1.1/jquery.min.js";  
  //  document.getElementsByTagName('head')[0].appendChild(script);  
  // }

   //*********DOM**********
  DW.getDomById = function(id) {
    var eleId = id || '';
    return document.getElementById(eleId);
  };

  DW.getDomByClass = function(classInfo) {
    var classInfo = classInfo || '';
    if(!typeof(document.getElementsByClassName) === 'function'){
      var result=[];
      var aEle=document.getElementsByTagName('*');
      /*正则模式*/
      var re=new RegExp("\\b" + classInfo + "\\b","g");
      for(var i=0;i<aEle.length;i++){
          /*字符串search方法判断是否存在匹配*/
          if(aEle[i].className.search(re) != -1){
              result.push(aEle[i]);
          }
      }
      return result;
    }else{
      return document.getElementsByClassName(classInfo);
    }
  }

 //**********浏览器环境************
  DW.isIE = function(callBack) {
    var isIE = false;
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
       isIE = true;
    }
    else{
       isIE = false;
    }

    if(typeof(callBack) === 'function'){
        callBack(isIE);
    }else{
      return isIE;
    }
  };

  DW.getBrowserInfo = function() {
    　　var Sys = {};
    　　var ua = navigator.userAgent.toLowerCase();
    　　var s; (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
    　　(s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
    　　(s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
    　　(s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
    　　(s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;

    　　if(Sys.ie) {
    　　　　return 'IE: ' + Sys.ie;
    　　}
    　　if(Sys.firefox) {
    　　　　return 'Firefox: ' + Sys.firefox;
    　　}
    　　if(Sys.chrome) {
    　　　　return 'Chrome: ' + Sys.chrome;
    　　}
    　　if(Sys.opera) {
    　　　　return 'Opera: ' + Sys.opera;
    　　}
    　　if(Sys.safari) {
    　　　　return 'Safari: ' + Sys.safari;
    　　}
        
        // var browser = getBrowserInfo() ;     //获取浏览器信息
        // var verinfo = (browser+"").replace(/[^0-9.]/ig, "");   //获取浏览器版本 
  };

  //监听浏览器是否设置全屏或者非全屏，有没有去改动这个模式  时间监听
  DW.addFullscreenchangeListener = function(callBack){
    var isFullScreen = false;
    // var fullscreenEnabled = document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled;  //标记 fullscreen 当前是否可用.

    //CSS控制规则
    // :-webkit-full-screen { 
    // } 
    // :-moz-fullscreen {
    // } 
    // :fullscreen { 
    // }
    // :-webkit-full-screen video { 
    //   width: 100%; 
    //   height: 100%; 
    // } 

    document.addEventListener("fullscreenchange", function(e) {
        var fullscreenElement = document.fullscreenEnabled || document.mozFullscreenElement || document.webkitFullscreenElement; //当前处于全屏状态的元素 element.
        if(fullscreenElement !== null && typeof(fullscreenElement) === 'object'){
          isFullScreen = true;
        }else{
          isFullScreen = false;
        }
        
        if(typeof(callBack)!== 'function'){
          DW.console('监听事件并未写回调函数');
          return;
        }else{
          callBack(isFullScreen);
        }
    });

    document.addEventListener("mozfullscreenchange", function(e) {
        var fullscreenElement = document.fullscreenEnabled || document.mozFullscreenElement || document.webkitFullscreenElement; //当前处于全屏状态的元素 element.
        if(fullscreenElement !== null && typeof(fullscreenElement) === 'object'){
          isFullScreen = true;
        }else{
          isFullScreen = false;
        }

        if(typeof(callBack)!== 'function'){
          DW.console('监听事件并未写回调函数');
          return;
        }else{
          callBack(isFullScreen);
        }
    });

    document.addEventListener("webkitfullscreenchange", function(e) {
        var fullscreenElement = document.fullscreenEnabled || document.mozFullscreenElement || document.webkitFullscreenElement; //当前处于全屏状态的元素 element.
        if(fullscreenElement !== null && typeof(fullscreenElement) === 'object'){
          isFullScreen = true;
        }else{
          isFullScreen = false;
        }

        if(typeof(callBack)!== 'function'){
          DW.console('监听事件并未写回调函数');
          return;
        }else{
          callBack(isFullScreen);
        }
    });
  };

  // 退出 fullscreen 
  DW.exitFullscreen = function() {
    if(document.exitFullscreen) {
      document.exitFullscreen();
    } else if(document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }

  //获取当前位置
  DW.getCurrentPosition = function(option){
    var positionOption = {
            enableHighAccuracy : true,
            timeout : 8000,
            maximumAge : 0
        };

    var optList = $.extend(positionOption,option||{});

    if(navigator.geolocation) { 

      function geoSuccess(event){
        console.log(event.coords.latitude + ', ' + event.coords.longitude);
      }

      function geoError(error){
         switch(error.code){
            case 1:
            alert("位置服务被拒绝");
            break;

            case 2:
            alert("暂时获取不到位置信息");
            break;

            case 3:
            alert("获取信息超时");
            break;

            case 4:
            alert("未知错误");
            break;
         }
      }

       // 支持
      navigator.geolocation.getCurrentPosition(geoSuccess, geoError, optList);
    } else {
       // 不支持
       DW.console('浏览器不支持定位');
    }
  }


   //**********网页实用功能************
  DW.backToTop = function(speed,position){
    var dwSpeed = speed || 800;
    var position = position || 0;
    $('body,html').animate({scrollTop:position},dwSpeed);
  };

  // 小于10的加个0
  DW.addZeroLessThanTen = function(number){
    if (Number(number)<10){
       number="0" + number
    }
    return number;
  };

  // 获取当前日期  y-m-d h:m:s
  DW.getCurrentDate = function() {
      var d = new Date();
      var y = d.getYear()+1900;
      month = addZeroLessThanTen(d.getMonth() + 1),
      days = addZeroLessThanTen(d.getDate()),
      hours = addZeroLessThanTen(d.getHours());
      minutes = addZeroLessThanTen(d.getMinutes()),
      seconds = addZeroLessThanTen(d.getSeconds());
      var str = y + '-' + month + '-' + days + ' ' + hours + ':' + minutes + ':' + seconds;
      return str;
  };

  //返回星期几
  DW.getWeekDay = function(index){
    var weekDay = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    
    var dwIndex = index || (new Date()).getDay();
    return weekDay[dwIndex];
  };

  //显示 Notification通知
  DW.showNotification = function(title , body , icon ,callBack){
    var myTitle = title || '未曾遗忘的青春',
        myBody = body || 'Hello World !!!',
        myIcon = icon || 'http://www.daiwei.org/index/images/logo/logo1.png';

    if(window.Notification && Notification.permission !== "denied") {
      Notification.requestPermission(function(status) {
        var n = new Notification(myTitle, {
          body:myBody,
          icon:myIcon,
        }); 
        n.onshow = function() {
          DW.console('Hi friend ! Nice to meet you here !');
        };

        n.onclick = function() {
          if(typeof(callBack) === 'function'){
            callBack();
          }else{
            window.location.href = 'http://www.daiwei.org';
          }
        };
      });
    }else{
      return;
    }
  };

  //localStorage 存储
  DW.setStorage = function(key,value){
    var dwKey = key || 'test-dw';
    var dwValue = value || 'this is test setStorage';
    if (window.localStorage) {
      localStorage.setItem(dwKey,dwValue);
    } else {
      return false;
    }
  }

  DW.getStorage = function(key){
    var dwKey = key || 'test-dw';
    if (window.localStorage) {
      return localStorage.getItem(dwKey);
    } else {
      return false;
    }
  }

  DW.clearStorage = function(key){
    if (window.localStorage) {
      if(key = undefined){
        localStorage.clear(); 
      }else{
        var dwKey = key;
        localStorage.clear(dwKey); 
      }
    }else {
      return false;
    }
  }

  DW.console = function(text,isOneLine,author){
    var text = text || 'this is console!';
    var author = author || '                           by DW ';
    var isOneLine = isOneLine || 'one';
    if(isOneLine === 'one'){
      console.log('%c'+text+' '+author+'', "background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4gPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiBncmFkaWVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgeDE9IjAuMCIgeTE9IjAuNSIgeDI9IjEuMCIgeTI9IjAuNSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzY2Y2NjYyIvPjxzdG9wIG9mZnNldD0iMjAlIiBzdG9wLWNvbG9yPSIjMzM5OTk5Ii8+PHN0b3Agb2Zmc2V0PSI0MCUiIHN0b3AtY29sb3I9IiNjY2NjOTkiLz48c3RvcCBvZmZzZXQ9IjYwJSIgc3RvcC1jb2xvcj0iIzk5Y2NmZiIvPjxzdG9wIG9mZnNldD0iODAlIiBzdG9wLWNvbG9yPSIjY2NjY2ZmIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjZmY5OWNjIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmFkKSIgLz48L3N2Zz4g');background-size: 100%;background-image: -webkit-gradient(linear, 0% 50%, 100% 50%, color-stop(0%, #66cccc), color-stop(20%, #339999), color-stop(40%, #cccc99), color-stop(60%, #99ccff), color-stop(80%, #ccccff), color-stop(100%, #ff99cc));background-image: -moz-linear-gradient(left, #66cccc 0%, #339999 20%, #cccc99 40%, #99ccff 60%, #ccccff 80%, #ff99cc 100%);background-image: -webkit-linear-gradient(left, #66cccc 0%, #339999 20%, #cccc99 40%, #99ccff 60%, #ccccff 80%, #ff99cc 100%);background-image: linear-gradient(to right, #66cccc 0%, #339999 20%, #cccc99 40%, #99ccff 60%, #ccccff 80%, #ff99cc 100%);padding:20px 40px;color:#fff;font-size:12px;");
      console.log('');
    }else if(isOneLine === 'more'){
      console.log('%c'+text+' '+author+'', "background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4gPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiBncmFkaWVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgeDE9IjAuMCIgeTE9IjAuNSIgeDI9IjEuMCIgeTI9IjAuNSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzY2Y2NjYyIvPjxzdG9wIG9mZnNldD0iMjAlIiBzdG9wLWNvbG9yPSIjMzM5OTk5Ii8+PHN0b3Agb2Zmc2V0PSI0MCUiIHN0b3AtY29sb3I9IiNjY2NjOTkiLz48c3RvcCBvZmZzZXQ9IjYwJSIgc3RvcC1jb2xvcj0iIzk5Y2NmZiIvPjxzdG9wIG9mZnNldD0iODAlIiBzdG9wLWNvbG9yPSIjY2NjY2ZmIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjZmY5OWNjIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmFkKSIgLz48L3N2Zz4g');background-size: 100%;background-image: -webkit-gradient(linear, 0% 50%, 100% 50%, color-stop(0%, #66cccc), color-stop(20%, #339999), color-stop(40%, #cccc99), color-stop(60%, #99ccff), color-stop(80%, #ccccff), color-stop(100%, #ff99cc));background-image: -moz-linear-gradient(left, #66cccc 0%, #339999 20%, #cccc99 40%, #99ccff 60%, #ccccff 80%, #ff99cc 100%);background-image: -webkit-linear-gradient(left, #66cccc 0%, #339999 20%, #cccc99 40%, #99ccff 60%, #ccccff 80%, #ff99cc 100%);background-image: linear-gradient(to right, #66cccc 0%, #339999 20%, #cccc99 40%, #99ccff 60%, #ccccff 80%, #ff99cc 100%);padding:0;color:#fff;font-size:12px;");
      console.log('');
    }
  }


  //网页性能测试
  DW.testConsole = function(){
    var t = performance.timing;
    var pageLoadTime = t.loadEventStart - t.navigationStart;
    var dnsTime = t.domainLookupEnd - t.domainLookupStart;
    var tcpTime = t.connectEnd - t.connectStart;
    var ttfbTime = t.responseStart - t.navigationStart;
    DW.console('测试网站性能(毫秒:ms)\n\n页面加载的耗时:'+pageLoadTime+
                '\n域名解析的耗时:'+ dnsTime +'\nTCP连接的耗时:'+tcpTime+
                '\n读取页面第一个字节之前的耗时:'+ttfbTime,'more')
  };

  //返回字符中的所有数字
  DW.getNumberWithOutStr = function(str){
    if(typeof(str) === 'string'){
      var myStr = str || '';
      return Number(str.replace(/[^0-9]+/g, ''));
    }else{
      console.error('参数不是字符串!');
    }
  };

  //返回字符中的所有数字
  DW.getStrWithOutNumber = function(str){
    if(typeof(str) === 'string'){
      var myStr = str || '';
      return str.replace(/\d+/g,'');
    }else{
      console.error('参数不是字符串!');
    }
  };


   //************样式**************

  //返回随机色
  DW.randomColor = function(){   
     return '#'+(~~(Math.random()*(1<<24))).toString(16);
  };

  //outline 提现布局框架   by  Addy Osmani
  DW.showLayoutFramework = function(){
     [].forEach.call( document.querySelectorAll("*"),function(a){  a.style.outline="1px solid #"+(~~(Math.random()*(1<<24))).toString(16) }); 
  };

  //点击触发背景色
  DW.changeBgColor = function(ele, beforeColor, afterColor) {
    var beforeTouchColor = beforeColor || '#fff';
    var afterTouchColor = afterColor || '#eee';
    ele.on('touchstart mousedown', function (e) {
        var $this = $(this);
        e.stopPropagation();
        $this.css({background: afterTouchColor,'-webkit-transition':'background 0.3s ease','-moz-transition':'background 0.3s ease',transition:'background 0.3s ease'});
    }).on('touchend mouseup', function (e) {
        var $this = $(this);
        e.stopPropagation();
        $this.css({background: beforeTouchColor,'-webkit-transition':'background 0.3s ease','-moz-transition':'background 0.3s ease',transition:'background 0.3s ease'});
    });
  }

  window.$DW = DW;

})(jQuery,window); 