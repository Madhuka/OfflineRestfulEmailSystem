    
var RedBox={
    overlay:true,
    onDisplay:null,
    showInline:function(a){
        this.appearWindow();
        this.cloneWindowContents(a)
        },
    showHtml:function(a,f){
        this.appearWindow();
        this.htmlWindowContents(a,f)
        },
    appearWindow:function(){
        var c=$("RB_loading");
		if($("RB_loading")==null&&parent.horde_main){
			c=parent.horde_main.$("RB_loading");
		}
        if(c&&c.visible()){
            c.hide()
        }else{
            this.showOverlay()
        }
        var b={
            duration:0.2,
            queue:"end"
        },a=$("RB_window");
		if($("RB_window")==null&&parent.horde_main){
			a=parent.horde_main.$("RB_window");
		}
        if(this.onDisplay){
            b.afterFinish=this.onDisplay
            }
            new Effect.Appear(a,b);
        a.scrollTo()
        },
    loading:function(){
        this.showOverlay();
        var a=$("RB_loading");
		if($("RB_loading")==null&&parent.horde_main){
			a=parent.horde_main.$("RB_loading");
		}
        if(a){
            a.show()
            }
            this.setWindowPosition()
        },
    close:function(){
		if($('RB_window')==null&&parent.horde_main){
			new Effect.Fade(parent.horde_main.$('RB_window'),{
				duration:0.2
			});
		}else{
			new Effect.Fade($('RB_window'),{
				duration:0.2
			});
		}
        if(this.overlay){
			if($('RB_overlay')==null&&parent.horde_main){
				new Effect.Fade(parent.horde_main.$('RB_overlay'),{
					duration:0.2
				})
			}else{
				new Effect.Fade($('RB_overlay'),{
					duration:0.2
				})
			}
            }
        },
showOverlay:function(){
    var b=$("RB_redbox");
	if($("RB_redbox")==null&&parent.horde_main){
		b=parent.horde_main.$("RB_redbox");
	}
    if(!b){
        b=new Element("DIV",{
            id:"RB_redbox",
            align:"center"
        });
		if(parent.horde_main){
			parent.horde_main.document.body.appendChild(b);
		}else{
        	$(document.body).insert(b);
		}
        var a=new Element("DIV",{
            id:"RB_overlay"
        }).hide();
        b.insert({
            top:new Element("DIV",{
                id:"RB_window"
            }).hide()
            }).insert({
            top:a
        });
        if(this.overlay){
            a.insert({
                top:new Element("DIV",{
                    id:"RB_loading"
                }).hide()
                })
            }
        }
    if(this.overlay){
    this.setOverlaySize();
	if($('RB_overlay')==null&&parent.horde_main){
		new Effect.Appear(parent.horde_main.$('RB_overlay'),{
			duration:0.2,
			to:0.4,
			queue:"end"
		})
	}else{
		new Effect.Appear($('RB_overlay'),{
			duration:0.2,
			to:0.4,
			queue:"end"
		})

	}
    }
},
setOverlaySize:function(){
    if(window.innerHeight&&window.scrollMaxY){
        yScroll=window.innerHeight+window.scrollMaxY
        }else{
        if(document.body.scrollHeight>document.body.offsetHeight){
            yScroll=document.body.scrollHeight
            }else{
            yScroll=document.body.offsetHeight
            }
        }
		
	if($('RB_overlay')==null&&parent.horde_main){
		parent.horde_main.$('RB_overlay').setStyle({
		height:yScroll+"px"
		})
	}else{
		Element.setStyle("RB_overlay",{
		height:yScroll+"px"
		})
	}
},
setWindowPosition:function(){
    var b=$("RB_window");
	if($('RB_window')==null&&parent.horde_main){
		b=parent.horde_main.$("RB_window");
	}
    var c=b.getDimensions(),a=document.viewport.getDimensions();
    b.setStyle({
        width:"auto",
        height:"auto",
        left:((a.width-c.width)/2)+"px",
        top:((a.height-c.height)/2)+"px"
        })
    },
cloneWindowContents:function(a){
	if($("RB_window")==null&&parent.horde_main){
		parent.horde_main.$("RB_window").appendChild($($(a).cloneNode(true)).setStyle({
			display:"block"
		}));
	}else{
		$("RB_window").appendChild($($(a).cloneNode(true)).setStyle({
			display:"block"
		}));
	}
    this.setWindowPosition()
    },
htmlWindowContents:function(a,f){
	if($("RB_window")==null&&parent.horde_main){
    	parent.horde_main.$("RB_window").update(a);
	}else{
		$("RB_window").update(a);
	}
	if($("ryesb")!=null)$("ryesb").onclick=f;
    this.setWindowPosition()
    },
getWindowContents:function(){
    var a=$("RB_window");
	if($("RB_window")==null&&parent.horde_main){
		a=parent.horde_main.$("RB_window");
	}
    return a.visible()?a.down():null
    },
overlayVisible:function(){
    var a=$("RB_overlay");
	if($("RB_overlay")==null&&parent.horde_main){
		a=parent.horde_main.$("RB_overlay");
	}
    return a&&a.visible()
    }
};