//-------------------------------------------------------------------------------------------------
/**
*	Copyright (c) 2011 Dipl.-Ing Georg Seel MIT License
*	xBox v1.0.0
*	obj=xBox({param})
*	@params = { text, title, width, height, maxWidth, top, left}
*	@obj = {dom, close(), getId()}
*/
var xBox = (function(){
	var idBox = 'xBox';
	var ie = {
		event: function(e){ return e || window.event; },
		target:function(e){ return e.target || e.srcElement; },
		//currentTarget: use this in function
		page:function(e){
			if (e.pageX) { // all browsers except IE <IE9 
                return {X: e.pageX, Y: e.pageY};
			}
			else {  // for  IE < IE9
				return {
					X: e.clientX + document.documentElement.scrollLeft,
					Y: e.clientY + document.documentElement.scrollTop
				}
			}
		},
		addEvent: function ( obj, type, fn ){
		   if (obj.addEventListener) {
			  obj.addEventListener( type, fn, false );
		   } else if (obj.attachEvent) {
			  obj.attachEvent( "on"+type, fn );
		   }
		},
		removeEvent : function ( obj, type, fn )
		{
		   if (obj.removeEventListener) {
			  obj.removeEventListener( type, fn, false );
		   } else if (obj.detachEvent) {
			  obj.detachEvent( "on"+type, fn );
		   }
		}
	}
		
    var dragItem = function(e) {
		e = ie.event(e); 
		var tar =  ie.target(e);
		var page = ie.page(e);

		var drag = tar.parentNode;
		var dx = page.X - parseInt(drag.style["left"]);
		var	dy = page.Y - parseInt(drag.style["top"]);
		drag.style["opacity"]= 0.60;
		drag.style["zIndex"]= 1000+(++id);
		var mouseMove =  function (e) {
			e = ie.event(e);
			var page = ie.page(e),
				   x = page.X-dx,
				   y = page.Y-dy;
			
			drag.style["left"] = (x>0)? x+"px" : "0px";
			drag.style["top"]  = (y>0)? y+"px" : "0px";
		}

		ie.addEvent(document,"mousemove",mouseMove);
		
		var mouseUp = function(e){
			drag.style["opacity"]= 1;
			ie.removeEvent(document,"mousemove",mouseMove);
			ie.removeEvent(document,"mouseup",mouseUp);
		}
		
		ie.addEvent(document,"mouseup",mouseUp);
    }

	var resizeItem = function(e) {
		e = ie.event(e); 
		var tar =  ie.target(e);
		var page = ie.page(e);
		
		var rs = tar.parentNode;
		var orgH= rs.offsetHeight ; // - padding-bottom:32px;;
		var orgW= rs.offsetWidth;
		var startX = page.X;
		var	startY = page.Y;
		rs.style["height"] = orgH+"px";
		rs.style["width"]  = orgW+"px";
		rs.style["maxWidth"]='';
		rs.style["-webkit-user-select"]='none';		
		var mouseMove =  function (e) {
			e = ie.event(e);
			var page = ie.page(e),
                   y = orgH + page.Y - startY,
				   x = orgW + page.X - startX;
			
			rs.style["height"] = (y>47)? y+"px":"47px";
			rs.style["width"]  = (x>90)? x+"px":"90px";
			return false;
		};

		ie.addEvent(document,"mousemove",mouseMove);
		
		var mouseUp = function(e){
			ie.removeEvent(document,"mousemove",mouseMove);
			ie.removeEvent(document,"mouseup",mouseUp);
			rs.style["-webkit-user-select"]='';	
		};
		
		ie.addEvent(document,"mouseup",mouseUp);
    };
	
	var id = 0;
	var close = function (id){
        var d = document.getElementById(id);
		if(d){
			document.body.removeChild( d );
		}
    };
	
	var id = 0;
	var close = function (id){
        var d = document.getElementById(id);
		if(d){
			document.body.removeChild( d );
		}
    };
	
	var msg = function (o) {
		if (!o) o = {} ;
     
		var text  = (o.text) ? o.text  : (typeof o == 'string')? o : "Message Text";
        var title = (o.title) ? o.title : "Message";
        var w = (o.width) ? 'width:'+o.width+';' : '';
        var h = (o.height) ? 'height:'+o.height+';' : '';
		var mw = (o.maxWidth) ? 'max-width:'+o.maxWidth +';': 'max-width:' + 350 +'px';

        var thisId = ++id;
		var rand = '_'+Math.round(Math.random()*10000);
		
		var thisClose = function(){
			close(idBox+thisId+rand );
		}
		
        var r = '';
        r+="<div id='"+idBox+thisId+rand+"' style='border:3px solid #BBCCFF; "+h+w+mw+";position:absolute; box-sizing:border-box; -moz-box-sizing:border-box; -ms-box-sizing:border-box; z-index:"+(1000+thisId)+"; color:black; font-size: 12pt;line-height:100%; background-color:#EAEAEA;padding-bottom:32px;'>";
        r+=    "<div style='height:18px; background:#BBCCFF; padding-left:3px;padding-right:3px; font-weight:bold; cursor:move; -moz-user-select:none; -webkit-user-select:none;' unselectable='on'>";
        r+=          title;
        r+=			"<span style='float:right; cursor:pointer;'> X </span>";
        r+=    "</div>";
        r+=    "<div style='border-top: 1px solid #999;'></div>";
        //r+=    "<div style=' position:absolute; top:19px; left:0;bottom:13px; right:0;' >";//var 2
        r+=       "<div style='padding:7px; margin-bottom:-32px; height:100%; overflow: auto; '>"+ text+"</div>";
        //r+=    "</div>";
        r+=    "<div style='position:absolute; display: block; background-color:#BBCCFF; width:7px; height: 8px; bottom:-1px; right:0px; cursor: se-resize; user-select:none; -webkit-user-select:none; -moz-user-select:none; ' unselectable='on' ></div>";
        r+="</div>";
		
	
		
		var tempDiv = document.createElement( 'div' );
        tempDiv.innerHTML = r;
		var msgDom = tempDiv.firstChild;
		
		msgDom.getElementsByTagName('span')[0].onclick = thisClose;
		document.body.appendChild( msgDom );

	
		if (!o.top && !o.left) {
			var x = Math.round((document.body.clientWidth-msgDom.offsetWidth)/2);
			var y = Math.round((document.body.clientHeight-msgDom.offsetHeight)/2);
			if(x<0) x=0;
			if(y<0) y=0;
            msgDom.style.left= x+'px';
			msgDom.style.top = y+'px';
        }else{
        	msgDom.style.left= o.left;
        	msgDom.style.top = o.top;
        }
        
		ie.addEvent(msgDom.children[0],"mousedown",dragItem);
		ie.addEvent(msgDom.children[3],"mousedown",resizeItem);


		return {
			dom:   msgDom,
			close: thisClose,
			getId: function (){return idBox+thisId+rand}
		}
    }
	
	return  msg;

})();

