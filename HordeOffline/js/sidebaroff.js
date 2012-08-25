function expandNodes(menu, imgNode){
		var imgNodeSrc=document.getElementById(imgNode).src;
		if(imgNodeSrc.indexOf("plusonly.png")!=-1){
			document.getElementById(menu).style.display='block';
			document.getElementById(imgNode).src="img/theme/graphics/tree/minusonly.png";
		}else if(imgNodeSrc.indexOf("minusonly.png")!=-1){
			document.getElementById(menu).style.display='none';
			document.getElementById(imgNode).src="img/theme/graphics/tree/plusonly.png";
		}else if(imgNodeSrc.indexOf("plusbottom.png")!=-1){
			document.getElementById(menu).style.display='block';
			document.getElementById(imgNode).src="img/theme/graphics/tree/minusbottom.png";
		}else if(imgNodeSrc.indexOf("minusbottom.png")!=-1){
			document.getElementById(menu).style.display='none';
			document.getElementById(imgNode).src="img/theme/graphics/tree/plusbottom.png";
		}else if(imgNodeSrc.indexOf("plus.png")!=-1){
			document.getElementById(menu).style.display='block';
			document.getElementById(imgNode).src="img/theme/graphics/tree/minus.png";
		}else if(imgNodeSrc.indexOf("minus.png")!=-1){
			document.getElementById(menu).style.display='none';
			document.getElementById(imgNode).src="img/theme/graphics/tree/plus.png";
		}		
}

function toggleMenuFrame(){
	var imgtog=document.getElementById('toggleimg').src;
	if(imgtog.indexOf('hide_panel.png')!=-1){
		document.getElementById('sidebarPanel').style.display='none';
		parent.document.getElementById('topframe').cols='20,*';
		document.getElementById('toggleimg').src="img/theme/graphics/show_panel.png";
	}else if(imgtog.indexOf('show_panel.png')!=-1){
		document.getElementById('sidebarPanel').style.display='block';
		parent.document.getElementById('topframe').cols='150,*';
		document.getElementById('toggleimg').src="img/theme/graphics/hide_panel.png";
	}
}