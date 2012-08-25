


var HordeHighlight = {

  enabletip:false,
  
  ie: (function(){return document.all}),
  
  ns6:(function(){return document.getElementById && !document.all})
  
}

function gettipobj(){
if (HordeHighlight.ie()||HordeHighlight.ns6())
return document.all? document.all["dhtmltooltip"] : document.getElementById? document.getElementById("dhtmltooltip") : ""
}

function ietruebody(){
return (document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body
}

function ddrivetip(thetext, thecolor, thewidth){
	document.onmousemove=positiontip
	if (HordeHighlight.ns6||HordeHighlight.ie){
	if (typeof thewidth!="undefined") gettipobj().style.width=thewidth+"px"
	if (typeof thecolor!="undefined" && thecolor!="") gettipobj().style.backgroundColor=thecolor
	gettipobj().textContent=thetext
	HordeHighlight.enabletip=true
	return false
	}
}

function positiontip(e){
	if(!e)
		e=window.event;
	var offsetxpoint=20 //Customize x offset of tooltip
	var offsetypoint=10 //Customize y offset of tooltip
	if (HordeHighlight.enabletip){
	var curX=(HordeHighlight.ns6)?e.pageX : e.clientX+ietruebody().scrollLeft;
	var curY=(HordeHighlight.ns6)?e.pageY : e.clientY+ietruebody().scrollTop;
	//Find out how close the mouse is to the corner of the window
	var rightedge=HordeHighlight.ie&&!window.opera? ietruebody().clientWidth-e.clientX-offsetxpoint : window.innerWidth-e.clientX-offsetxpoint-20
	var bottomedge=HordeHighlight.ie&&!window.opera? ietruebody().clientHeight-e.clientY-offsetypoint : window.innerHeight-e.clientY-offsetypoint-20
	
	var leftedge=(offsetxpoint<0)? offsetxpoint*(-1) : -1000
	
	//if the horizontal distance isn't enough to accomodate the width of the context menu
	if (rightedge<gettipobj().offsetWidth)
	//move the horizontal position of the menu to the left by it's width
	gettipobj().style.left=HordeHighlight.ie? ietruebody().scrollLeft+e.clientX-gettipobj().offsetWidth+"px" : window.pageXOffset+e.clientX-gettipobj().offsetWidth+"px"
	else if (curX<leftedge)
	gettipobj().style.left="5px"
	else
	//position the horizontal position of the menu where the mouse is positioned
	gettipobj().style.left=curX+offsetxpoint+"px"
	
	//same concept with the vertical position
	if (bottomedge<gettipobj().offsetHeight)
	gettipobj().style.top=HordeHighlight.ie? ietruebody().scrollTop+e.clientY-gettipobj().offsetHeight-offsetypoint+"px" : window.pageYOffset+e.clientY-gettipobj().offsetHeight-offsetypoint+"px"
	else
	gettipobj().style.top=curY+offsetypoint+"px"
	gettipobj().style.visibility="visible"
	}
}

function hideddrivetip(){
	if (HordeHighlight.ns6||HordeHighlight.ie){
	HordeHighlight.enabletip=false
	gettipobj().style.visibility="hidden"
	gettipobj().style.left="-1000px"
	gettipobj().style.backgroundColor=''
	gettipobj().style.width=''
	}
	
}
