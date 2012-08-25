function popup(url){
	var height=Math.min(screen.height-75,570||500);
    var width=Math.min(screen.width-75,700||600);
	var time=new Date().getTime();
	var wndw=window.open(url,time,"toolbar=no,location=no,status=yes,scrollbars=yes,resizable=yes,width="+width+",height="+height+",left=0,top=0");
	
    if(!wndw){
        imp_info("A popup window could not be opened. Perhaps you have set your browser to block popup windows.",2);
    }else{
		try{
        if(Object.isUndefined(wndw.name)){
            wndw.name=B
         }
         if(Object.isUndefined(wndw.opener)){
        wndw.opener=self
         }
		}catch(err){}
         wndw.focus()
    }
}

/*function popup(c,d,a){
    if(!d){
        d=600
        }
        if(!a){
        a=500
        }
        var b='_blank';
    var f="toolbar=no,location=no,status=yes,scrollbars=yes,resizable=yes,width="+d+",height="+a+",left=0,top=0";
    var e=window.open(c,b,f);
    if(!e){
        alert("A popup window could not be opened. Your browser may be blocking popups for this application.")
        }else{
        if(typeof e.name=="undefined"){
            e.name=b
            }
            if(typeof e.opener=="undefined"){
            e.opener=self
            }
        }
    return e
}*/
