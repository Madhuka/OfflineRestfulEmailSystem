// JavaScript Document

function loadDyanamicInfo(){
	 document.getElementById('files').addEventListener('change', handleFileSelect, false); 
	$('senderid').textContent=getSavedCurrentUser()+"@dbmail.uom.lk";
	var action=localStorage.getItem('actionID');
	//var email=ShowEamil(parseInt(localStorage.getItem('emailid')));
	
	emailid=localStorage.getItem('emailid');
	var mimes=giveMsgMIMEs(emailid);
	var header=giveMsgHeader(emailid)
	var bodies={};
	if(mimes!=null){
		for(var j=0;j<mimes.length;j++){
			bodies[j]=giveMIMEBody(mimes[j]);
		}
	}	
	
	if(action=="reply"){
		$('topheader').textContent="Reply: Re: "+header.subject;
		$('to').value=header.from;
		$('subject').value="Re: "+header.subject;
		$('message').value="\n\nQuoting "+header.from+" :\n>"+bodies[0].Content;
	}
	else if(action=="reply_all"){
		$('topheader').textContent="Reply to All: Re: "+header.subject;
		$('to').value=header.from;
		$('cc').value=header.to;
		$('subject').value="Re: "+header.subject;
		$('message').value="\n\nQuoting "+header.from+" :\n>"+bodies[0].Content;
	}
	else if(action=="forward_all"){
		$('topheader').textContent="Forward: "+header.subject;
		$('subject').value="Fwd: "+header.subject;
		$('message').value="\n----- Forwarded message from "+header.from+" -----\nDate: "+header.createdat+"\nFrom: "+header.from+"\nSubject: "+header.subject+"\nTo: "+header.to+"\n\n"+bodies[0].Content+"\n\n----- End forwarded message -----";
	}
	else if(action=="forward_body"){
		$('topheader').textContent="Forward: "+header.subject;
		$('subject').value="Fw: "+header.subject;
		$('message').value="\n----- Forwarded message from "+header.from+" -----\nDate: "+header.createdat+"\nFrom: "+header.from+"\nSubject: "+header.subject+"\nTo: "+header.to+"\n\n"+bodies[0].Content+"\n\n----- End forwarded message -----";
	}
	else{
		$('topheader').textContent="New Message";
	}
	localStorage.setItem('actionID',"");
}

function sendMessage(){
	//alert("to : "+$('to').value+"\ncc : "+$('cc').value+"\nbcc : "+$('bcc').value+"\nsubject : "+$('subject').value+"\n")
	if($('to').value==""&&$('cc').value==""&&$('bcc').value==""){
		$('cmpnotice').style.display="block";
	}
	else{
		if($('subject').value==""){
			imp_confirm(sendmsg, 'The message does not have a subject entered.\nSend message without a subject?');
		}else{
			sendToDB('Outbox');
			closeWindow();
		}
	}
}

function sendmsg(){
	sendToDB('Outbox');
	closeWindow();
}

function saveDraft(){
	sendToDB('Drafts');
	closeWindow();	
}

function confirmCancle(){
		closeWindow();
}

function closeWindow(){
	if (navigator.userAgent.indexOf("Firefox")!=-1){
			self.close();
		}else{
			window.opener='x';
			window.close();
		}	
}


function getQueryParameters() {
  var query = window.location.href.split('?')[1];
  //query won't be set if ? isn't in the URL
  if(!query) {
    return { };
  }
  var params = query.split('&');
  var pairs = {};
  for(var i = 0, len = params.length; i < len; i++) {
    var pair = params[i].split('=');
    pairs[pair[0]] = pair[1];
  }
  return pairs;
}


//-----------------------------------------------------------------
//functions from db
function sendToDB(action){
	var id=createMsgID();
	var from=$('senderid').textContent;
	var to=$('to').value;
	var subject=$('subject').value;
	var createdat=getTimeUI();
	var content=$('message').value;
	var type='text/plain';
	var encode=$('charset').value;
	var length=content.length;
	var size=length+'B';
	var mimeid=hex_sha1(subject);
	mimeid=mimeid.substring(0,38);
	
	//var cc=$('cc').value;
	//var bcc=$('bcc').value;
	
	ComposeOffline(id,action,from,to,from,subject,createdat,mimeid,content,type,encode,length,size)
	saveMessageHeader(id,action,from,to,from,subject,createdat);
	//saveMIMEbodyparts(id,mimeid)
	
	if(action=='Outbox'){
		if(isOnline()){
			try{
			CreatMsgHeaderURL(id,0);
			}catch(e){}
			try{
			CreatMIMeListURL(id,0);
			}catch(e){}
			moveMsg(id,'Sent');
		}else{
			CreatMsgHeaderURL(id,1);
			CreatMIMeListURL(id,1);
		}
	}
	
	try{
		CreatMIMeURL(mimeid,0);
	}catch(e){
	console.log('ERROR '+e);	
	}
	for( var i=0;i<hasharr.length;i++){
		saveMIMEbodyparts(id,hasharr[i]);
		if(action=='Outbox'){
			if(isOnline()){
				try{
				CreatMIMeURL(hasharr[i],0);
				moveMsg(id,'Sent');
				}catch(e){}
			}else{
				CreatMIMeURL(hasharr[i],1);
			}
		}
	}
/*	var myJSONObject = {"messageBody":$('message').value,"mimesize":"","mfolder":action,"mfrom":$('senderid').textContent,"mto":$('to').value,"mfrom":$('senderid').textContent,"msub":$('subject').value,"mdate":""};
	//alert($('message').textContent);
	storeInLocal(myJSONObject);*/
	
}

function createMsgID(){
	var d=new Date();
	//var id= d.getFullYear()+""+d.getMonth()+""+d.getDate()+""+d.getHours()+""+d.getMinutes()+""+d.getSeconds()+"."+d.getTime()+"@dbmail.uom.lk";
	return 'f'+d.getTime();
}


function getTimeUI(){
	var d=new Date();
	var id= d.getFullYear()+"-"+d.getMonth()+"-"+d.getDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
	return id;
}