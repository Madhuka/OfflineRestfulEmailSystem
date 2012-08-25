//functions related to viewmessage.html
/*function msgIdToLoad(id, no){
	sessionStorage.setItem('id',id);
	alert("loading "+sessionStorage.getItem('id'));
}*/

function showEmail(){
	$('emailbody').update('');
	$('msgparts').update('');
	//alert(sessionStorage.getItem('emailid')+"  "+sessionStorage.getItem('emailid'));
	//loadEmailMIMEBody
	var mimes=giveMsgMIMEs(localStorage.getItem('emailid'));
	if(mimes!=null&&mimes!="NULL"){
		for(var j=0;j<mimes.length;j++){
			var mi=localStorage.getItem(mimes[j]);
			if(mi==null){
				try{
					loadEmailMIMEBody(mimes[j]);
				}catch(e){
					console.log("ERROR! in loading MIMEBODY");
				}
			}
		}
	}
	
	var email;
	if(localStorage.getItem('folder')=="OfflineCompose"){
		email=ShowEamil(localStorage.getItem('emailid'));
		//alert(localStorage.getItem('emailid'));
	}else{
		emailid=localStorage.getItem('emailid');
		var header=giveMsgHeader(emailid)
		var bodies=new Array();
		if(mimes!=null){
			for(var j=0;j<mimes.length;j++){
				bodies[j]=giveMIMEBody(mimes[j]);
			}
		}
	}
	updateTopInfobar(header.subject);
	loadFolderListVM();
	//Wed, 17 Jun 2009 10:44:44 -0700 [06/17/2009 11:14:44 PM IST]
	document.getElementById('dateinfo').textContent=header.createdat;
	document.getElementById('frominfo').textContent=header.from;
	document.getElementById('toinfo').textContent=header.to;
	document.getElementById('subectinfo').textContent=header.subject;
	//document.getElementById('emailbody').innerHTML=decodeData(bodies[0]);
	
	if(bodies.length>0){
		for(var q=0;q<bodies.length;q++){
			var divTag = document.createElement("div");
        	divTag.innerHTML = decodeData(bodies[q]);
	       	$('emailbody').appendChild(divTag);
			$('emailbody').insert("<br>");
		}
	}
	
	/*if(bodies.length>1){
		$('togglequoteparent').style.display="block";
		for(var q=1;q<bodies.length;q++){
			var divTag = document.createElement("div");
       		divTag.id = "qid"+q;
        	divTag.className ="citation quoted"+(q%5);
        	divTag.innerHTML = decodeData(bodies[q]);
        	if(q==1){
        		$('quotedtxt').appendChild(divTag);
			}else{
				$('qid'+(q-1)).appendChild(divTag);
			}
		}
	}*/
	var id=parseInt(localStorage.getItem('emailid'));
	var flags=giveMsgFlags(id);
	if(flags.seen=="0"){
		markAsSeen(id);
	}
	if(flags.recent=="1"){
		updateMsgFlags(id,'recent','0');
		if(isOnline()){
			StatusEvent('Recent',id,0);
		}else{
			StatusEvent('Recent',id,1);
		}
	}
}

function decodeData(data){
	if(data==null){
		return '';	
	}
	if(data.Type=="text/plain"){
		return data.Content;
	} else if(data.Type.indexOf("image")!=-1){
		return "<img src='data:image;base64,"+data.Content+"' />";
	}else{
		$('msgparts').insert('<a href="data:"+data.Type+";base64,"+data.Content>v</a>');
	}
	
}


function loadFolderListVM(){
	var folders=ListOfFolders();
	
	var optionlst=$$('select#target1 option');
	
	if(folders!=null){
		for(var i=0; i<folders.length ; i++){
			var f=folders[i].toLowerCase();
			if(!(f=="inbox"||f=="sent"||f=="drafts"||f=="outbox"||f=="trash"||(optionlst.indexOf(f)!=-1))){
				 var elOptNew = document.createElement('option');
				 var elOptNew2 = document.createElement('option');
				  elOptNew.text = folders[i];
				  elOptNew.value = folders[i];
				  elOptNew2.text = folders[i];
				  elOptNew2.value = folders[i];
				  var elSel = $('target1');
				  var elSel2 = $('target2');
				  try {
					elSel.add(elOptNew, null); // standards compliant; doesn't work in IE
					elSel2.add(elOptNew2, null);
				  }
				  catch(ex) {
					elSel.add(elOptNew); // IE only
					elSel2.add(elOptNew2);
				  }
			}	
		}
	}
}


function updateTopInfobar(subject){
	var folder=localStorage.getItem('folder');
	var currentemail=localStorage.getItem('emailno');
	var totalemails=NoOfMessages(folder);
	document.getElementById('topmsgname').textContent=folder+": "+subject;
	document.getElementById('topmsgno').textContent=" ("+currentemail+" of "+totalemails+")";
	if(folder=="searchresults"){
		document.getElementById('bakfolder1').textContent="Search Results";
	}else{
		document.getElementById('bakfolder1').textContent=folder;
	}
	if(folder=="searchresults"){
		document.getElementById('bakfolder2').textContent="Search Results";
	}else{
		document.getElementById('bakfolder2').textContent=folder;
	}
	
	if(parseInt(currentemail)==totalemails){
		document.getElementById('previousemail1').src="img/theme/graphics/nav/left.png";
		document.getElementById('previousemail2').src="img/theme/graphics/nav/left.png";
		document.getElementById('nextemail1').src="img/theme/graphics/nav/right-grey.png";
		document.getElementById('nextemail2').src="img/theme/graphics/nav/right-grey.png";
	}else if(currentemail=='1'){
		document.getElementById('previousemail1').src="img/theme/graphics/nav/left-grey.png";
		document.getElementById('previousemail2').src="img/theme/graphics/nav/left-grey.png";
		document.getElementById('nextemail1').src="img/theme/graphics/nav/right.png";
		document.getElementById('nextemail2').src="img/theme/graphics/nav/right.png";
	}else{
		document.getElementById('previousemail1').src="img/theme/graphics/nav/left.png";
		document.getElementById('previousemail2').src="img/theme/graphics/nav/left.png";
		document.getElementById('nextemail1').src="img/theme/graphics/nav/right.png";
		document.getElementById('nextemail2').src="img/theme/graphics/nav/right.png";
	}
	
}

function nextEmail(){
	
	var msgids=JSON.parse(localStorage.getItem('mailidlist'));
	
	var folder=localStorage.getItem('folder');
	var currentemail=parseInt(localStorage.getItem('emailno'));
	if(parseInt(currentemail)<NoOfMessages(folder)){
		currentemail=currentemail+1;
		localStorage.setItem('emailno',currentemail);
		localStorage.setItem('emailid',msgids[currentemail]);
		//alert("id = "+msgids[currentemail]);
		showEmail();
	}
}

function previousEmail(){
	var msgids=JSON.parse(localStorage.getItem('mailidlist'));
	
	var currentemail=parseInt(localStorage.getItem('emailno'));
	if(parseInt(currentemail)>1){
		currentemail=currentemail-1;
		localStorage.setItem('emailno',currentemail);
		localStorage.setItem('emailid',msgids[currentemail]);
		showEmail();
	}
}

/*function getEmailFromDB(inemailNo){
	var email={
		date:'Wed, 17 Jun 2011 10:44:44 -0700 [06/17/2009 11:14:44 PM IST]',
		from:'User <user@uom.lk>',
		to:'Test <b07@uom.lk> ',
		subject:'Test Notice',
		parts:'',
		msg:'<br>Dear Students,<br>Please find the attached notice.<br><br><br>Thanks,<br><br>Niranjala',
		attachments:'',
	}
	return email;
}*/