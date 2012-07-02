			var xPlay = (function(){
				return function(url){
					var audioEl = document.createElement('audio');
					if (audioEl.canPlayType && audioEl.canPlayType('audio/mpeg')) {
						if (url) audioEl.src = url;
						if(!audioEl.stop){ 
							audioEl.stop= function(){ 
								audioEl.pause();
								audioEl.currentTime = 0;
							};
						}
						audioEl.loadUrl =function(url){
							this.src=url;		
							this.load();
						}
						audioEl.playUrl =function(url){
							this.src=url;		
							this.play();
						}
						return audioEl;
					
					}else{
						var lis ={
							afterLoad:[]
							,onInit : function(){
								for (var i in this.afterLoad){
									console.log(this.afterLoad[i]);
									this.afterLoad[i]();
								}
							}
							,onUpdate : function(){
								
							
							}
						}
						var h, rand= Math.floor((Math.random()*1000000));
						h ='<object id="xPlay'+rand+'" type="application/x-shockwave-flash" data="player_mp3_js.swf"  width="1" height="1" style="position:absolute; left:-1000px; top:-1000px;">'
						+ '		<param name="movie" value="player_mp3_js.swf" />'
						+ '		<param name="AllowScriptAccess" value="always" />'
						+ '		<param name="FlashVars" value="listener=(document.getElementById(\'xPlay'+rand+'\').xPlayLis)&amp;interval=100" />'
						+ '</object>';
			
						
						var tempDiv = document.createElement( 'div' );
						tempDiv.innerHTML = h;
						var obj = tempDiv.firstChild;
						obj.xPlayLis=lis;
						if (url){
							lis.afterLoad.push(function(){obj.SetVariable("method:setUrl", url);});
						}
						document.getElementsByTagName('body')[0].appendChild( obj );
						return {
							id:'xPlay'+rand,
							src:'',
							load:function(){
								var t=this;
								var load=function(){
									console.log('load');
									obj.SetVariable("method:setUrl", t.src)
									//obj.SetVariable("method:play", "");
									//obj.SetVariable("method:stop", "");
									t.paused=true;
								}

								if(obj.SetVariable)load()
								else lis.afterLoad.push(load);
		
							},
							loadUrl:function(url){
								this.src=url;
								this.load();
							},
							play:function(){
								var t=this;
								var play=function(){
									console.log('play');
									obj.SetVariable("method:play", "");
									obj.SetVariable("enabled", "true");
									t.paused=false;
								}							
								if(obj.SetVariable) play();
								else lis.afterLoad.push(play);
							},
							playUrl:function(url){
								this.src=url;
								this.load();
								this.play();
							},
							pause:function(){
								var t=this;
								var pause =function(){
									obj.SetVariable("method:pause", "");
									t.paused=true;
								};
								if(obj.SetVariable) pause();
								else lis.afterLoad.push(pause);
							}
							,stop:function(){
								var t=this;
								var stop =function(){
									console.log('stop');
									obj.SetVariable("method:stop", "");
									t.paused=true;
								};
								if(obj.SetVariable) stop();
								else lis.afterLoad.push(stop);
							},
							paused:true
						}
					}
				
				}
			})();
