(function(C){C.ui={plugin:{add:function(E,D,H){var G=C.ui[E].prototype;for(var F in H){G.plugins[F]=G.plugins[F]||[];G.plugins[F].push([D,H[F]])}},call:function(D,F,E){var H=D.plugins[F];if(!H){return }for(var G=0;G<H.length;G++){if(D.options[H[G][0]]){H[G][1].apply(D.element,E)}}}},cssCache:{},css:function(D){if(C.ui.cssCache[D]){return C.ui.cssCache[D]}var E=C('<div class="ui-gen">').addClass(D).css({position:"absolute",top:"-5000px",left:"-5000px",display:"block"}).appendTo("body");C.ui.cssCache[D]=!!((!(/auto|default/).test(E.css("cursor"))||(/^[1-9]/).test(E.css("height"))||(/^[1-9]/).test(E.css("width"))||!(/none/).test(E.css("backgroundImage"))||!(/transparent|rgba\(0, 0, 0, 0\)/).test(E.css("backgroundColor"))));try{C("body").get(0).removeChild(E.get(0))}catch(F){}return C.ui.cssCache[D]},disableSelection:function(D){C(D).attr("unselectable","on").css("MozUserSelect","none")},enableSelection:function(D){C(D).attr("unselectable","off").css("MozUserSelect","")},hasScroll:function(G,D){var F=/top/.test(D||"top")?"scrollTop":"scrollLeft",E=false;if(G[F]>0){return true}G[F]=1;E=G[F]>0?true:false;G[F]=0;return E}};var A=C.fn.remove;C.fn.remove=function(){C("*",this).add(this).triggerHandler("remove");return A.apply(this,arguments)};function B(F,D,G){var E=C[F][D].getter||[];E=(typeof E=="string"?E.split(/,?\s+/):E);return(C.inArray(G,E)!=-1)}C.widget=function(D,E){var F=D.split(".")[0];D=D.split(".")[1];C.fn[D]=function(J){var H=(typeof J=="string"),I=Array.prototype.slice.call(arguments,1);if(H&&B(F,D,J)){var G=C.data(this[0],D);return(G?G[J].apply(G,I):undefined)}return this.each(function(){var K=C.data(this,D);if(H&&K&&C.isFunction(K[J])){K[J].apply(K,I)}else{if(!H){C.data(this,D,new C[F][D](this,J))}}})};C[F][D]=function(H,I){var G=this;this.widgetName=D;this.widgetBaseClass=F+"-"+D;this.options=C.extend({},C.widget.defaults,C[F][D].defaults,I);this.element=C(H).bind("setData."+D,function(L,J,K){return G.setData(J,K)}).bind("getData."+D,function(K,J){return G.getData(J)}).bind("remove",function(){return G.destroy()});this.init()};C[F][D].prototype=C.extend({},C.widget.prototype,E)};C.widget.prototype={init:function(){},destroy:function(){this.element.removeData(this.widgetName)},getData:function(D){return this.options[D]},setData:function(D,E){this.options[D]=E;if(D=="disabled"){this.element[E?"addClass":"removeClass"](this.widgetBaseClass+"-disabled")}},enable:function(){this.setData("disabled",false)},disable:function(){this.setData("disabled",true)}};C.widget.defaults={disabled:false};C.ui.mouse={mouseInit:function(){var D=this;this.element.bind("mousedown."+this.widgetName,function(E){return D.mouseDown(E)});if(C.browser.msie){this._mouseUnselectable=this.element.attr("unselectable");this.element.attr("unselectable","on")}this.started=false},mouseDestroy:function(){this.element.unbind("."+this.widgetName);(C.browser.msie&&this.element.attr("unselectable",this._mouseUnselectable))},mouseDown:function(F){(this._mouseStarted&&this.mouseUp(F));this._mouseDownEvent=F;var D=this,G=(F.which==1),E=(typeof this.options.cancel=="string"?C(F.target).parents().add(F.target).filter(this.options.cancel).length:false);if(!G||E||!this.mouseCapture(F)){return true}this._mouseDelayMet=!this.options.delay;if(!this._mouseDelayMet){this._mouseDelayTimer=setTimeout(function(){D._mouseDelayMet=true},this.options.delay)}if(this.mouseDistanceMet(F)&&this.mouseDelayMet(F)){this._mouseStarted=(this.mouseStart(F)!==false);if(!this._mouseStarted){F.preventDefault();return true}}this._mouseMoveDelegate=function(H){return D.mouseMove(H)};this._mouseUpDelegate=function(H){return D.mouseUp(H)};C(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate);return false},mouseMove:function(D){if(C.browser.msie&&!D.button){return this.mouseUp(D)}if(this._mouseStarted){this.mouseDrag(D);return false}if(this.mouseDistanceMet(D)&&this.mouseDelayMet(D)){this._mouseStarted=(this.mouseStart(this._mouseDownEvent,D)!==false);(this._mouseStarted?this.mouseDrag(D):this.mouseUp(D))}return !this._mouseStarted},mouseUp:function(D){C(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate);if(this._mouseStarted){this._mouseStarted=false;this.mouseStop(D)}return false},mouseDistanceMet:function(D){return(Math.max(Math.abs(this._mouseDownEvent.pageX-D.pageX),Math.abs(this._mouseDownEvent.pageY-D.pageY))>=this.options.distance)},mouseDelayMet:function(D){return this._mouseDelayMet},mouseStart:function(D){},mouseDrag:function(D){},mouseStop:function(D){},mouseCapture:function(D){return true}};C.ui.mouse.defaults={cancel:null,distance:1,delay:0}})(jQuery);(function(E){E.widget("ui.accordion",{init:function(){var H=this.options;if(H.navigation){var J=this.element.find("a").filter(H.navigationFilter);if(J.length){if(J.filter(H.header).length){H.active=J}else{H.active=J.parent().parent().prev();J.addClass("current")}}}H.headers=this.element.find(H.header);H.active=A(H.headers,H.active);if(E.browser.msie){this.element.find("a").css("zoom","1")}if(!this.element.hasClass("ui-accordion")){this.element.addClass("ui-accordion");E("<span class='ui-accordion-left'/>").insertBefore(H.headers);E("<span class='ui-accordion-right'/>").appendTo(H.headers);H.headers.addClass("ui-accordion-header").attr("tabindex","0")}var G;if(H.fillSpace){G=this.element.parent().height();H.headers.each(function(){G-=E(this).outerHeight()});var I=0;H.headers.next().each(function(){I=Math.max(I,E(this).innerHeight()-E(this).height())}).height(G-I)}else{if(H.autoHeight){G=0;H.headers.next().each(function(){G=Math.max(G,E(this).outerHeight())}).height(G)}}H.headers.not(H.active||"").next().hide();H.active.parent().andSelf().addClass(H.selectedClass);if(H.event){this.element.bind((H.event)+".accordion",F)}},activate:function(G){F.call(this.element[0],{target:A(this.options.headers,G)[0]})},destroy:function(){this.options.headers.next().css("display","");if(this.options.fillSpace||this.options.autoHeight){this.options.headers.next().css("height","")}E.removeData(this.element[0],"accordion");this.element.removeClass("ui-accordion").unbind(".accordion")}});function C(H,G){return function(){return H.apply(G,arguments)}}function B(H){if(!E.data(this,"accordion")){return }var G=E.data(this,"accordion");var I=G.options;I.running=H?0:--I.running;if(I.running){return }if(I.clearStyle){I.toShow.add(I.toHide).css({height:"",overflow:""})}E(this).triggerHandler("accordionchange",[E.event.fix({type:"accordionchange",target:G.element[0]}),I.data],I.change)}function D(L,I,K,G,M){var H=E.data(this,"accordion").options;H.toShow=L;H.toHide=I;H.data=K;var J=C(B,this);H.running=I.size()===0?L.size():I.size();if(H.animated){if(!H.alwaysOpen&&G){E.ui.accordion.animations[H.animated]({toShow:jQuery([]),toHide:I,complete:J,down:M,autoHeight:H.autoHeight})}else{E.ui.accordion.animations[H.animated]({toShow:L,toHide:I,complete:J,down:M,autoHeight:H.autoHeight})}}else{if(!H.alwaysOpen&&G){L.toggle()}else{I.hide();L.show()}J(true)}}function F(K){var J=E.data(this,"accordion").options;if(J.disabled){return false}if(!K.target&&!J.alwaysOpen){J.active.parent().andSelf().toggleClass(J.selectedClass);var I=J.active.next(),M={options:J,newHeader:jQuery([]),oldHeader:J.active,newContent:jQuery([]),oldContent:I},L=(J.active=E([]));D.call(this,L,I,M);return false}var H=E(K.target);H=E(H.parents(J.header)[0]||H);var G=H[0]==J.active[0];if(J.running||(J.alwaysOpen&&G)){return false}if(!H.is(J.header)){return }J.active.parent().andSelf().toggleClass(J.selectedClass);if(!G){H.parent().andSelf().addClass(J.selectedClass)}var L=H.next(),I=J.active.next(),M={options:J,newHeader:H,oldHeader:J.active,newContent:L,oldContent:I},N=J.headers.index(J.active[0])>J.headers.index(H[0]);J.active=G?E([]):H;D.call(this,L,I,M,G,N);return false}function A(H,G){return G!=undefined?typeof G=="number"?H.filter(":eq("+G+")"):H.not(H.not(G)):G===false?E([]):H.filter(":eq(0)")}E.extend(E.ui.accordion,{defaults:{selectedClass:"selected",alwaysOpen:true,animated:"slide",event:"click",header:"a",autoHeight:true,running:0,navigationFilter:function(){return this.href.toLowerCase()==location.href.toLowerCase()}},animations:{slide:function(G,I){G=E.extend({easing:"swing",duration:300},G,I);if(!G.toHide.size()){G.toShow.animate({height:"show"},G);return }var H=G.toHide.height(),J=G.toShow.height(),K=J/H;G.toShow.css({height:0,overflow:"hidden"}).show();G.toHide.filter(":hidden").each(G.complete).end().filter(":visible").animate({height:"hide"},{step:function(L){var M=(H-L)*K;if(E.browser.msie||E.browser.opera){M=Math.ceil(M)}G.toShow.height(M)},duration:G.duration,easing:G.easing,complete:function(){if(!G.autoHeight){G.toShow.css("height","auto")}G.complete()}})},bounceslide:function(G){this.slide(G,{easing:G.down?"bounceout":"swing",duration:G.down?1000:200})},easeslide:function(G){this.slide(G,{easing:"easeinout",duration:700})}}});E.fn.activate=function(G){return this.accordion("activate",G)}})(jQuery);