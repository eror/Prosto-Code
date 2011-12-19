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



var _= (function() {
	var x = function( s ) {
			return new x.prototype.init( s );
		};
	x.prototype = {
		constructor: x,
		init: function( s ) {
				elem = document.getElementById(s);
				this.length = 1;
				this[0] = elem; // fuer firebug 
				return this;
		},
		length: 0,// fuer firebug 
		splice: [].splice // fuer firebug 
	};
	x.prototype.init.prototype = x.prototype;
	return x;
})();


function x (s){
	return new function(){
		var el = document.getElementById(s);
		this[0] = el; this.length = 1; this.splice = [].splice// fuer firebug
		
		this.a= function(){
			console.log("a ");
			return this;
		}
		//if (s="test")return this;
		this.b= function(){
			console.log("b ");
			return this;
		};
		
	};
}
