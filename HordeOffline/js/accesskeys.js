var AccessKeys={macos:navigator.userAgent.indexOf("Mac")>-1,elements:[],replace:function(){$$("*[accesskey]").each(function(A){this.elements[A.readAttribute("accesskey").toUpperCase()]=A},this);document.observe("keydown",this.keydownHandler.bind(this))},keydownHandler:function(B){if((this.macos&&B.ctrlKey)||(B.altKey&&!B.ctrlKey)){var A=String.fromCharCode(B.keyCode||B.charCode).toUpperCase();if(this.elements[A]){this.execute(this.elements[A],B);B.stop()}}},execute:function(B,C){if(!B){return}switch(B.tagName){case"A":B.focus();if(B.onclick){if(B.onclick()){window.location.href=B.href}}else{window.location.href=B.href}return;case"INPUT":case"SELECT":case"TEXTAREA":B.focus();switch(B.type.toUpperCase()){case"BUTTON":case"RESET":case"SUBMIT":B.click();break}return;case"LABEL":this.execute($(B.htmlFor));return}if(typeof $(B)._prototypeEventID=="undefined"){return}var A=$H(Event.cache[$(B)._prototypeEventID.first()]);if(A.get("click")){A.get("click").each(function(D){D(C)})}}};Event.observe(window,"load",AccessKeys.replace.bind(AccessKeys));
