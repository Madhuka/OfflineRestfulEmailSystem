// main email functions

//called from inboxBtnTop of mailbox

/*function viewInbox(){
	if((parent.horde_main.location.toString().indexOf("inbox.html")!=-1)||(parent.horde_mail.horde_main.location.toString().indexOf("inbox.html")!=-1)){
		parent.horde_mail.horde_toolbar.$('inboxBtnTop').addClassName('current');
		//fillInbox();
	}else{
		parent.horde_main.location="inbox.html";
		parent.horde_mail.horde_toolbar.$('inboxBtnTop').addClassName('current');
		//fillInbox();
	}
}*/


var messagelist = {};
var refreshref=null;

function viewInbox(inbox, folder){
	
	
	
	if(folder==null){
		localStorage.setItem('folder','INBOX');
		parent.horde_toolbar.$('mailbox').value='INBOX';
		//updateMsgFolder('Inbox');
	}else{
		localStorage.setItem('folder',folder);
		parent.horde_toolbar.$('mailbox').value=folder;
		//updateMsgFolder(folder);
	}
	
	unClickAllToolbar();
	if(inbox==1){
		self.location="inbox.html";
		parent.horde_toolbar.$('inboxBtnTop').addClassName('current');
	}else{
		/*if((parent.horde_main.location.toString().indexOf("inbox.html")!=-1)){
			parent.horde_toolbar.$('inboxBtnTop').addClassName('current');
			//fillInbox();
		}else{*/
			parent.horde_main.location="inbox.html";
			parent.horde_toolbar.$('inboxBtnTop').addClassName('current');
			//fillInbox();
		//}
	}
	setAutoRefresh();
}

function viewOptionsPage(){
	parent.horde_main.location="options.html";
	unClickAllToolbar();
	parent.horde_toolbar.$('optionsBtnTop').addClassName('current');
}

function viewSearchPage(){
	parent.horde_main.location="search.html";
	unClickAllToolbar();
	parent.horde_toolbar.$('searchBtnTop').addClassName('current');
}

function viewFolderNavigator(){
	parent.horde_main.location="folders.html";
	unClickAllToolbar();
	parent.horde_toolbar.$('foldersBtnTop').addClassName('current');
}

function viewPwdChangeScreen(){
	parent.horde_main.location="passwordchange.html";
	unClickAllToolbar();
}

function unClickAllToolbar(){
	try{
	parent.horde_toolbar.$('inboxBtnTop').removeClassName('current');
	parent.horde_toolbar.$('foldersBtnTop').removeClassName('current');
	parent.horde_toolbar.$('searchBtnTop').removeClassName('current');
	parent.horde_toolbar.$('optionsBtnTop').removeClassName('current');
	}catch(e){}
}


//function to fill inbox
function fillInbox(begin,end){
	var folder=localStorage.getItem('folder');
	if(folder!="OfflineCompose"){
		setTitle("Mail :: "+folder+" ("+NoOfMessages(folder)+" )");
	}else if(folder=="searchresults"){
		setTitle("Mail :: Search Results ("+NoOfMessages(folder)+")");
	}else{
		setTitle("Mail :: Outbox ("+NoOfMessages(folder)+" )");
	}
	var num=begin;
	
	//alert(begin+","+end);
	
	var html="<table class=\"messageList\" width=\"100%\" cellspacing=\"0\" style=\"font-size:85%\">";
	
	var mails=getmailsfromdb(begin,end,folder);
	

/*	for (m in mails)
	{
		html=html+ createInboxRecord(mails[m].id,mails[m].status,num,mails[m].date,mails[m].from,mails[m].subject,mails[m].size);
		num++;
		//alert(num);
	}*/
	
	for(var m=0;m<mails.length;m++){
		
		//alert(mails[m]['subject'])
		//emailID, flag, emailNo, date, from, subject, size
		try{
		html=html+ createInboxRecord(mails[m]['id'],messagelist[num+folder.toUpperCase()],num,mails[m]['createdat'],mails[m]['from'],mails[m]['subject'],"-",folder,mails[m]['folder']);
		num++;

		}catch(error){}
		
	}
	
	html= html+"<table>";
	
	
	parent.horde_main.document.getElementById('mailInboxDiv').innerHTML=html;
	
	
	//$('mailInboxDiv').update(html);
	
	/*"<table class=\"messageList\" width=\"100%\" cellspacing=\"0\" style=\"font-size:85%\"><tr id=\"row1INBOX\"  class=\"unseen\"><td width=\"8%\"><label><input id=\"check1INBOX\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\"1\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_unseen.png\" alt=\"Unseen\" title=\"Unseen\"/></label></td><td width=\"4%\"> 1 </td><td width=\"10%\">10/12/2009 </td><td width=\"20%\"><a href=\"imp/message.php?mailbox=INBOX&index=1\"  onMouseover=\"ddrivetip(\'sss javascripts from www.freejavascriptkit.com\')\"; onMouseout=\"hideddrivetip()\">User Import</a></td><td width=\"52%\"><a href=\"imp/message.php?mailbox=INBOX&index=1\" id=\"subject1INBOX\">Welcome to MSDN Academic Alliance: Online Software System</a></td><td class=\"rightAlign\" width=\"6%\">4 KB</td></tr><table>"*/
}

//emailID: unique id from email header
//flag: 1-unseen 8-important 4-answered 2-deleted 16-draft 32-personal
//emailNo: for table
//date,from,subject,size: from email
//from: Name<name@server.com>>
function createInboxRecord(emailID, flag, emailNo, date, from, subject, size, folder, serverfolder){
	
	folderName=folder.toUpperCase();
	var fulldate=date;
	date=date.substring(0,date.indexOf(' '));
	
	var fromName="";
	if(from.indexOf('<')!=-1){
		fromName=from.substring(0,from.indexOf('<'));
	}else{
		fromName=from;
	}
	
	//var flagint=parseInt(flag);
	var p1="";
	
	//with size
	//var p2="<td width=\"4%\"> "+emailNo+" </td><td width=\"10%\">"+date+" </td><td width=\"20%\"><a href=\"#\" onMouseover=\"ddrivetip(\'"+from+"\')\"; onMouseout=\"hideddrivetip()\" onclick=\"viewMessage(\'"+emailID+"\',\'"+emailNo+"\')\">"+fromName+"</a></td><td width=\"52%\"><a href=\"#\" id=\"subject"+emailID+folderName+"\" onclick=\"viewMessage(\'"+emailID+"\',\'"+emailNo+"\')\">"+subject+"</a></td><td class=\"rightAlign\" width=\"6%\">"+size+"</td></tr>";
	
	//size removed
	var p2="";
	if(localStorage.getItem('folder')=="searchresults"){
		p2="<td width=\"4%\"> "+emailNo+" </td><td width=\"10%\"><span onMouseover=\"ddrivetip(\'"+fulldate+"\')\"; onMouseout=\"hideddrivetip()\">"+date+"</span> </td><td width=\"20%\"><a href=\"#\" onMouseover=\"ddrivetip(\'"+from+"\')\"; onMouseout=\"hideddrivetip()\" onclick=\"viewMessage(\'"+emailID+"\',\'"+emailNo+"\')\">"+fromName+"</a></td><td width=\"52%\"><a href=\"#\" id=\"subject"+emailID+folderName+"\" onclick=\"viewMessage(\'"+emailID+"\',\'"+emailNo+"\')\">"+subject+"</a><span style=\"border-color:#c3ffbf; background-color:#c3ffbf; ; margin-left:12px\"><span style=\"color: #006633; padding-left:2px ;padding-right:2px\">"+serverfolder+"</span></span></td></tr>";
	}else{
		p2="<td width=\"4%\"> "+emailNo+" </td><td width=\"10%\"><span onMouseover=\"ddrivetip(\'"+fulldate+"\')\"; onMouseout=\"hideddrivetip()\">"+date+"</span> </td><td width=\"20%\"><a href=\"#\" onMouseover=\"ddrivetip(\'"+from+"\')\"; onMouseout=\"hideddrivetip()\" onclick=\"viewMessage(\'"+emailID+"\',\'"+emailNo+"\')\">"+fromName+"</a></td><td width=\"52%\"><a href=\"#\" id=\"subject"+emailID+folderName+"\" onclick=\"viewMessage(\'"+emailID+"\',\'"+emailNo+"\')\">"+subject+"</a></td></tr>";
	}
	
	var flagint=parseInt(flag);
	
	//unseen
	if(flagint==1){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"unseen\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_unseen.png\" alt=\"unseen\" title=\"unseen\"/></label></td>";
	}
	//seen important
	else if(flagint==2){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"seen flagged\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_flagged.png\" alt=\"Important\" title=\"Important\"/></label></td>";
	}
	//unseen important
	else if(flagint==3){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"unseen flagged\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_unseen.png\" alt=\"unseen\" title=\"unseen\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_flagged.png\" alt=\"Important\" title=\"Important\"/></label></td>";
	}
	//seen Recent
	else if(flagint==4){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"seen\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_recent.png\" alt=\"Recent\" title=\"Recent\"/></label></td>";
	}
	//unseen Recent
	else if(flagint==5){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"unseen\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_unseen.png\" alt=\"unseen\" title=\"unseen\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_recent.png\" alt=\"Recent\" title=\"Recent\"/></label></td>";
	}
	//seen important Recent
	else if(flagint==6){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"seen flagged\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_recent.png\" alt=\"Recent\" title=\"Recent\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_flagged.png\" alt=\"Important\" title=\"Important\"/></label></td>";
	}
	//unseen important Recent
	else if(flagint==7){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"unseen flagged\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_unseen.png\" alt=\"unseen\" title=\"unseen\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_recent.png\" alt=\"Recent\" title=\"Recent\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_flagged.png\" alt=\"Important\" title=\"Important\"/></label></td>";
	}
	//seen
	else{
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"seen\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/></label></td>";
	}



	//seen important
	/*else if(flagint==8){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"seen flagged\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_flagged.png\" alt=\"Important\" title=\"Important\"/></label></td>";
	}
	//seen answered
	else if(flagint==4){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"seen answered\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_answered.png\" alt=\"Answered\" title=\"Answered\"/></label></td>";
	}
	//seen deleted
	else if(flagint==2){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"seen deleted\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_deleted.png\" alt=\"Deleted\" title=\"Deleted\"/></label></td>";
	}
	//seen draft
	else if(flagint==16){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"seen\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_draft.png\" alt=\"Draft\" title=\"Draft\"/></label></td>";
	}
	//seen personal
	else if(flagint==32){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"seen\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_personal.png\" alt=\"Personal\" title=\"Personal\"/></label></td>";
	}
	//unseen important
	else if(flagint==9){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"unseen flagged\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_unseen.png\" alt=\"unseen\" title=\"unseen\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_flagged.png\" alt=\"Important\" title=\"Important\"/></label></td>";
	}
	//unseen answered
	else if(flagint==5){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"unseen answered\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_unseen.png\" alt=\"unseen\" title=\"unseen\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_answered.png\" alt=\"Answered\" title=\"Answered\"/></label></td>";
	}
	//unseen deleted
	else if(flagint==3){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"unseen deleted\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_unseen.png\" alt=\"unseen\" title=\"unseen\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_deleted.png\" alt=\"Deleted\" title=\"Deleted\"/></label></td>";
	}
	//unseen draft
	else if(flagint==17){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"unseen draft\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_unseen.png\" alt=\"unseen\" title=\"unseen\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_draft.png\" alt=\"Draft\" title=\"Draft\"/></label></td>";
	}
	//unseen personal
	else if(flagint==33){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"unseen\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_personal.png\" alt=\"Personal\" title=\"Personal\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_unseen.png\" alt=\"unseen\" title=\"unseen\"/></label></td>";
	}
	//seen important answered
	else if(flagint==12){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"seen answered flagged\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_answered.png\" alt=\"Answered\" title=\"Answered\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_flagged.png\" alt=\"Important\" title=\"Important\"/></label></td>";
	}
	//seen important deleted
	else if(flagint==10){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"seen flagged deleted\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_flagged.png\" alt=\"Important\" title=\"Important\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_deleted.png\" alt=\"Deleted\" title=\"Deleted\"/></label></td>";
	}
	//seen important draft
	else if(flagint==24){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"seen flagged\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_draft.png\" alt=\"Draft\" title=\"Draft\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_flagged.png\" alt=\"Important\" title=\"Important\"/></label></td>";
	}
	//seen important personal
	else if(flagint==40){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"seen flagged\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_personal.png\" alt=\"Personal\" title=\"Personal\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_flagged.png\" alt=\"Important\" title=\"Important\"/></label></td>";
	}
	//seen answered deleted
	else if(flagint==6){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"seen answered deleted\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_answered.png\" alt=\"Answered\" title=\"Answered\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_deleted.png\" alt=\"Deleted\" title=\"Deleted\"/></label></td>";
	}
	//seen answered draft
	else if(flagint==20){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"seen answered\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_answered.png\" alt=\"Answered\" title=\"Answered\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_draft.png\" alt=\"Draft\" title=\"Draft\"/></label></td>";
	}
	//seen answered personal
	else if(flagint==36){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"seen answered\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_personal.png\" alt=\"Personal\" title=\"Personal\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_answered.png\" alt=\"Answered\" title=\"Answered\"/></label></td>";
	}
	//seen deleted draft
	else if(flagint==18){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"seen deleted\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_draft.png\" alt=\"Draft\" title=\"Draft\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_deleted.png\" alt=\"Deleted\" title=\"Deleted\"/></label></td>";
	}
	//seen deleted personal
	else if(flagint==34){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"seen deleted\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_personal.png\" alt=\"Personal\" title=\"Personal\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_deleted.png\" alt=\"Deleted\" title=\"Deleted\"/></label></td>";
	}
	//seen personal draft
	else if(flagint==48){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"seen\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_personal.png\" alt=\"Personal\" title=\"Personal\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_draft.png\" alt=\"Draft\" title=\"Draft\"/></label></td>";
	}
	//unseen important answered
	else if(flagint==13){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"unseen answered flagged\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_unseen.png\" alt=\"unseen\" title=\"unseen\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_answered.png\" alt=\"Answered\" title=\"Answered\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_flagged.png\" alt=\"Important\" title=\"Important\"/></label></td>";
	}
	//unseen important deleted
	else if(flagint==11){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"unseen deleted flagged\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_unseen.png\" alt=\"unseen\" title=\"unseen\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_flagged.png\" alt=\"Important\" title=\"Important\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_deleted.png\" alt=\"Deleted\" title=\"Deleted\"/></label></td>";
	}
	//unseen important draft
	else if(flagint==25){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"unseen flagged\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_unseen.png\" alt=\"unseen\" title=\"unseen\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_draft.png\" alt=\"Draft\" title=\"Draft\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_flagged.png\" alt=\"Important\" title=\"Important\"/></label></td>";
	}
	//unseen important personal
	else if(flagint==41){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"unseen flagged\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_personal.png\" alt=\"Personal\" title=\"Personal\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_unseen.png\" alt=\"unseen\" title=\"unseen\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_flagged.png\" alt=\"Important\" title=\"Important\"/></label></td>";
	}
	//unseen answered deleted
	else if(flagint==7){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"unseen answered deleted\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_unseen.png\" alt=\"unseen\" title=\"unseen\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_answered.png\" alt=\"Answered\" title=\"Answered\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_deleted.png\" alt=\"Deleted\" title=\"Deleted\"/></label></td>";
	}
	//unseen answered draft
	else if(flagint==21){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"unseen answered\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_unseen.png\" alt=\"unseen\" title=\"unseen\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_answered.png\" alt=\"Answered\" title=\"Answered\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_draft.png\" alt=\"Draft\" title=\"Draft\"/></label></td>";
	}
	//unseen answered personal
	else if(flagint==37){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"unseen answered\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_personal.png\" alt=\"Personal\" title=\"Personal\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_unseen.png\" alt=\"unseen\" title=\"unseen\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_answered.png\" alt=\"Answered\" title=\"Answered\"/></label></td>";
	}
	//unseen deleted draft
	else if(flagint==19){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"unseen deleted\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_unseen.png\" alt=\"unseen\" title=\"unseen\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_draft.png\" alt=\"Draft\" title=\"Draft\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_deleted.png\" alt=\"Deleted\" title=\"Deleted\"/></label></td>";
	}
	//unseen deleted personal
	else if(flagint==35){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"unseen deleted\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_personal.png\" alt=\"Personal\" title=\"Personal\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_unseen.png\" alt=\"unseen\" title=\"unseen\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_deleted.png\" alt=\"Deleted\" title=\"Deleted\"/></label></td>";
	}
	//unseen personal draft
	else if(flagint==49){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"unseen\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_personal.png\" alt=\"Personal\" title=\"Personal\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_unseen.png\" alt=\"unseen\" title=\"unseen\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_draft.png\" alt=\"Draft\" title=\"Draft\"/></label></td>";
	}
	//seen important answered deleted
	else if(flagint==14){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"seen answered flagged deleted\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_answered.png\" alt=\"Answered\" title=\"Answered\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_flagged.png\" alt=\"Important\" title=\"Important\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_deleted.png\" alt=\"Deleted\" title=\"Deleted\"/></label></td>";
	}
	//seen important answered draft
	else if(flagint==28){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"seen answered flagged\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_answered.png\" alt=\"Answered\" title=\"Answered\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_draft.png\" alt=\"Draft\" title=\"Draft\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_flagged.png\" alt=\"Important\" title=\"Important\"/></label></td>";
	}
	//seen important answered personal
	else if(flagint==44){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"seen answered flagged\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_personal.png\" alt=\"Personal\" title=\"Personal\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_answered.png\" alt=\"Answered\" title=\"Answered\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_flagged.png\" alt=\"Important\" title=\"Important\"/></label></td>";
	}
	//seen important deleted draft
	else if(flagint==26){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"seen flagged deleted\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_draft.png\" alt=\"Draft\" title=\"Draft\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_flagged.png\" alt=\"Important\" title=\"Important\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_deleted.png\" alt=\"Deleted\" title=\"Deleted\"/></label></td>";
	}
	//seen important deleted personal
	else if(flagint==42){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"seen flagged deleted\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_personal.png\" alt=\"Personal\" title=\"Personal\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_flagged.png\" alt=\"Important\" title=\"Important\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_deleted.png\" alt=\"Deleted\" title=\"Deleted\"/></label></td>";
	}
	//seen important draft personal
	else if(flagint==56){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"seen flagged\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_personal.png\" alt=\"Personal\" title=\"Personal\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_draft.png\" alt=\"Draft\" title=\"Draft\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_flagged.png\" alt=\"Important\" title=\"Important\"/></label></td>";
	}
	//seen answered deleted draft
	else if(flagint==22){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"seen answered deleted\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_answered.png\" alt=\"Answered\" title=\"Answered\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_draft.png\" alt=\"Draft\" title=\"Draft\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_deleted.png\" alt=\"Deleted\" title=\"Deleted\"/></label></td>";
	}
	//seen answered deleted personal
	else if(flagint==38){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"seen answered deleted\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_personal.png\" alt=\"Personal\" title=\"Personal\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_answered.png\" alt=\"Answered\" title=\"Answered\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_deleted.png\" alt=\"Deleted\" title=\"Deleted\"/></label></td>";
	}
	//seen answered draft personal
	else if(flagint==52){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"seen answered\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_personal.png\" alt=\"Personal\" title=\"Personal\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_answered.png\" alt=\"Answered\" title=\"Answered\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_draft.png\" alt=\"Draft\" title=\"Draft\"/></label></td>";
	}
	//seen deleted draft personal
	else if(flagint==50){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"seen deleted\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_personal.png\" alt=\"Personal\" title=\"Personal\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_draft.png\" alt=\"Draft\" title=\"Draft\"/>&nbsp;<img src=\"img/imp/theme/graphics/mail_deleted.png\" alt=\"Deleted\" title=\"Deleted\"/></label></td>";
	}
	//unseen important answered deleted
	else if(flagint==15){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"unseen answered flagged deleted\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/><img src=\"img/imp/theme/graphics/mail_unseen.png\" alt=\"unseen\" title=\"unseen\"/><img src=\"img/imp/theme/graphics/mail_answered.png\" alt=\"Answered\" title=\"Answered\"/><img src=\"img/imp/theme/graphics/mail_flagged.png\" alt=\"Important\" title=\"Important\"/><img src=\"img/imp/theme/graphics/mail_deleted.png\" alt=\"Deleted\" title=\"Deleted\"/></label></td>";
	}
	//unseen important answered draft
	else if(flagint==29){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"unseen answered flagged\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/><img src=\"img/imp/theme/graphics/mail_unseen.png\" alt=\"unseen\" title=\"unseen\"/><img src=\"img/imp/theme/graphics/mail_answered.png\" alt=\"Answered\" title=\"Answered\"/><img src=\"img/imp/theme/graphics/mail_draft.png\" alt=\"Draft\" title=\"Draft\"/><img src=\"img/imp/theme/graphics/mail_flagged.png\" alt=\"Important\" title=\"Important\"/></label></td>";
	}
	//unseen important answered personal
	else if(flagint==45){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"unseen answered flagged\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/><img src=\"img/imp/theme/graphics/mail_personal.png\" alt=\"Personal\" title=\"Personal\"/><img src=\"img/imp/theme/graphics/mail_unseen.png\" alt=\"unseen\" title=\"unseen\"/><img src=\"img/imp/theme/graphics/mail_answered.png\" alt=\"Answered\" title=\"Answered\"/><img src=\"img/imp/theme/graphics/mail_flagged.png\" alt=\"Important\" title=\"Important\"/></label></td>";
	}
	//unseen important deleted draft
	else if(flagint==27){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"unseen deleted flagged\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/><img src=\"img/imp/theme/graphics/mail_unseen.png\" alt=\"unseen\" title=\"unseen\"/><img src=\"img/imp/theme/graphics/mail_draft.png\" alt=\"Draft\" title=\"Draft\"/><img src=\"img/imp/theme/graphics/mail_flagged.png\" alt=\"Important\" title=\"Important\"/><img src=\"img/imp/theme/graphics/mail_deleted.png\" alt=\"Deleted\" title=\"Deleted\"/></label></td>";
	}
	//unseen important deleted personal
	else if(flagint==43){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"unseen deleted flagged\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/><img src=\"img/imp/theme/graphics/mail_personal.png\" alt=\"Personal\" title=\"Personal\"/><img src=\"img/imp/theme/graphics/mail_unseen.png\" alt=\"unseen\" title=\"unseen\"/><img src=\"img/imp/theme/graphics/mail_flagged.png\" alt=\"Important\" title=\"Important\"/><img src=\"img/imp/theme/graphics/mail_deleted.png\" alt=\"Deleted\" title=\"Deleted\"/></label></td>";
	}
	//unseen important draft personal
	else if(flagint==57){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"unseen flagged\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/><img src=\"img/imp/theme/graphics/mail_personal.png\" alt=\"Personal\" title=\"Personal\"/><img src=\"img/imp/theme/graphics/mail_unseen.png\" alt=\"unseen\" title=\"unseen\"/>c<img src=\"img/imp/theme/graphics/mail_flagged.png\" alt=\"Important\" title=\"Important\"/></label></td>";
	}
	//unseen answered deleted draft
	else if(flagint==23){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"unseen answered deleted\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/><img src=\"img/imp/theme/graphics/mail_unseen.png\" alt=\"unseen\" title=\"unseen\"/><img src=\"img/imp/theme/graphics/mail_answered.png\" alt=\"Answered\" title=\"Answered\"/><img src=\"img/imp/theme/graphics/mail_draft.png\" alt=\"Draft\" title=\"Draft\"/><img src=\"img/imp/theme/graphics/mail_deleted.png\" alt=\"Deleted\" title=\"Deleted\"/></label></td>";
	}
	//unseen answered deleted personal
	else if(flagint==39){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"unseen answered deleted\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/><img src=\"img/imp/theme/graphics/mail_personal.png\" alt=\"Personal\" title=\"Personal\"/><img src=\"img/imp/theme/graphics/mail_unseen.png\" alt=\"unseen\" title=\"unseen\"/><img src=\"img/imp/theme/graphics/mail_answered.png\" alt=\"Answered\" title=\"Answered\"/><img src=\"img/imp/theme/graphics/mail_deleted.png\" alt=\"Deleted\" title=\"Deleted\"/></label></td>";
	}
	//unseen answered draft personal
	else if(flagint==53){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"unseen answered\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/><img src=\"img/imp/theme/graphics/mail_personal.png\" alt=\"Personal\" title=\"Personal\"/><img src=\"img/imp/theme/graphics/mail_unseen.png\" alt=\"unseen\" title=\"unseen\"/><img src=\"img/imp/theme/graphics/mail_answered.png\" alt=\"Answered\" title=\"Answered\"/><img src=\"img/imp/theme/graphics/mail_draft.png\" alt=\"Draft\" title=\"Draft\"/></label></td>";
	}
	//unseen deleted draft personal
	else if(flagint==51){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"unseen deleted\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/><img src=\"img/imp/theme/graphics/mail_personal.png\" alt=\"Personal\" title=\"Personal\"/><img src=\"img/imp/theme/graphics/mail_unseen.png\" alt=\"unseen\" title=\"unseen\"/><img src=\"img/imp/theme/graphics/mail_draft.png\" alt=\"Draft\" title=\"Draft\"/><img src=\"img/imp/theme/graphics/mail_deleted.png\" alt=\"Deleted\" title=\"Deleted\"/></label></td>";
	}
	//seen important answered deleted draft
	else if(flagint==30){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"seen answered flagged deleted\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/><img src=\"img/imp/theme/graphics/mail_answered.png\" alt=\"Answered\" title=\"Answered\"/><img src=\"img/imp/theme/graphics/mail_draft.png\" alt=\"Draft\" title=\"Draft\"/><img src=\"img/imp/theme/graphics/mail_flagged.png\" alt=\"Important\" title=\"Important\"/><img src=\"img/imp/theme/graphics/mail_deleted.png\" alt=\"Deleted\" title=\"Deleted\"/></label></td>";
	}
	//seen important answered deleted personal
	else if(flagint==46){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"seen answered flagged deleted\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/><img src=\"img/imp/theme/graphics/mail_personal.png\" alt=\"Personal\" title=\"Personal\"/><img src=\"img/imp/theme/graphics/mail_answered.png\" alt=\"Answered\" title=\"Answered\"/><img src=\"img/imp/theme/graphics/mail_flagged.png\" alt=\"Important\" title=\"Important\"/><img src=\"img/imp/theme/graphics/mail_deleted.png\" alt=\"Deleted\" title=\"Deleted\"/></label></td>";
	}
	//seen important answered draft personal
	else if(flagint==60){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"seen answered flagged\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/><img src=\"img/imp/theme/graphics/mail_personal.png\" alt=\"Personal\" title=\"Personal\"/><img src=\"img/imp/theme/graphics/mail_answered.png\" alt=\"Answered\" title=\"Answered\"/><img src=\"img/imp/theme/graphics/mail_draft.png\" alt=\"Draft\" title=\"Draft\"/><img src=\"img/imp/theme/graphics/mail_flagged.png\" alt=\"Important\" title=\"Important\"/></label></td>";
	}
	//seen important deleted draft personal
	else if(flagint==58){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"seen flagged deleted\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/><img src=\"img/imp/theme/graphics/mail_personal.png\" alt=\"Personal\" title=\"Personal\"/><img src=\"img/imp/theme/graphics/mail_draft.png\" alt=\"Draft\" title=\"Draft\"/><img src=\"img/imp/theme/graphics/mail_flagged.png\" alt=\"Important\" title=\"Important\"/><img src=\"img/imp/theme/graphics/mail_deleted.png\" alt=\"Deleted\" title=\"Deleted\"/></label></td>";
	}
	//seen answered deleted draft personal
	else if(flagint==54){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"seen answered deleted\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/><img src=\"img/imp/theme/graphics/mail_personal.png\" alt=\"Personal\" title=\"Personal\"/><img src=\"img/imp/theme/graphics/mail_answered.png\" alt=\"Answered\" title=\"Answered\"/><img src=\"img/imp/theme/graphics/mail_draft.png\" alt=\"Draft\" title=\"Draft\"/><img src=\"img/imp/theme/graphics/mail_deleted.png\" alt=\"Deleted\" title=\"Deleted\"/></label></td>";
	}
	//unseen important answered deleted draft
	else if(flagint==31){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"unseen answered flagged deleted\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/><img src=\"img/imp/theme/graphics/mail_unseen.png\" alt=\"unseen\" title=\"unseen\"/><img src=\"img/imp/theme/graphics/mail_answered.png\" alt=\"Answered\" title=\"Answered\"/><img src=\"img/imp/theme/graphics/mail_draft.png\" alt=\"Draft\" title=\"Draft\"/><img src=\"img/imp/theme/graphics/mail_flagged.png\" alt=\"Important\" title=\"Important\"/><img src=\"img/imp/theme/graphics/mail_deleted.png\" alt=\"Deleted\" title=\"Deleted\"/></label></td>";
	}
	//unseen important answered deleted personal
	else if(flagint==47){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"unseen answered flagged deleted\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/><img src=\"img/imp/theme/graphics/mail_personal.png\" alt=\"Personal\" title=\"Personal\"/><img src=\"img/imp/theme/graphics/mail_unseen.png\" alt=\"unseen\" title=\"unseen\"/><img src=\"img/imp/theme/graphics/mail_answered.png\" alt=\"Answered\" title=\"Answered\"/><img src=\"img/imp/theme/graphics/mail_flagged.png\" alt=\"Important\" title=\"Important\"/><img src=\"img/imp/theme/graphics/mail_deleted.png\" alt=\"Deleted\" title=\"Deleted\"/></label></td>";
	}
	//unseen important answered draft personal
	else if(flagint==61){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"unseen answered flagged\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/><img src=\"img/imp/theme/graphics/mail_personal.png\" alt=\"Personal\" title=\"Personal\"/><img src=\"img/imp/theme/graphics/mail_unseen.png\" alt=\"unseen\" title=\"unseen\"/><img src=\"img/imp/theme/graphics/mail_answered.png\" alt=\"Answered\" title=\"Answered\"/><img src=\"img/imp/theme/graphics/mail_draft.png\" alt=\"Draft\" title=\"Draft\"/><img src=\"img/imp/theme/graphics/mail_flagged.png\" alt=\"Important\" title=\"Important\"/></label></td>";
	}
	//unseen answered draft personal deleted
	else if(flagint==55){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"unseen answered deleted\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/><img src=\"img/imp/theme/graphics/mail_personal.png\" alt=\"Personal\" title=\"Personal\"/><img src=\"img/imp/theme/graphics/mail_unseen.png\" alt=\"unseen\" title=\"unseen\"/><img src=\"img/imp/theme/graphics/mail_answered.png\" alt=\"Answered\" title=\"Answered\"/><img src=\"img/imp/theme/graphics/mail_draft.png\" alt=\"Draft\" title=\"Draft\"/><img src=\"img/imp/theme/graphics/mail_deleted.png\" alt=\"Deleted\" title=\"Deleted\"/></label></td>";
	}
	//unseen important draft personal deleted
	else if(flagint==59){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"unseen flagged deleted\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/><img src=\"img/imp/theme/graphics/mail_personal.png\" alt=\"Personal\" title=\"Personal\"/><img src=\"img/imp/theme/graphics/mail_unseen.png\" alt=\"unseen\" title=\"unseen\"/><img src=\"img/imp/theme/graphics/mail_draft.png\" alt=\"Draft\" title=\"Draft\"/><img src=\"img/imp/theme/graphics/mail_flagged.png\" alt=\"Important\" title=\"Important\"/><img src=\"img/imp/theme/graphics/mail_deleted.png\" alt=\"Deleted\" title=\"Deleted\"/></label></td>";
	}
	//seen important answered draft personal deleted
	else if(flagint==62){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"seen answered flagged deleted\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/><img src=\"img/imp/theme/graphics/mail_personal.png\" alt=\"Personal\" title=\"Personal\"/><img src=\"img/imp/theme/graphics/mail_answered.png\" alt=\"Answered\" title=\"Answered\"/><img src=\"img/imp/theme/graphics/mail_draft.png\" alt=\"Draft\" title=\"Draft\"/><img src=\"img/imp/theme/graphics/mail_flagged.png\" alt=\"Important\" title=\"Important\"/><img src=\"img/imp/theme/graphics/mail_deleted.png\" alt=\"Deleted\" title=\"Deleted\"/></label></td>";
	}
	//unseen important answered draft personal deleted
	else if(flagint==63){
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"unseen answered flagged deleted\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/><img src=\"img/imp/theme/graphics/mail_personal.png\" alt=\"Personal\" title=\"Personal\"/><img src=\"img/imp/theme/graphics/mail_unseen.png\" alt=\"unseen\" title=\"unseen\"/><img src=\"img/imp/theme/graphics/mail_answered.png\" alt=\"Answered\" title=\"Answered\"/><img src=\"img/imp/theme/graphics/mail_draft.png\" alt=\"Draft\" title=\"Draft\"/><img src=\"img/imp/theme/graphics/mail_flagged.png\" alt=\"Important\" title=\"Important\"/><img src=\"img/imp/theme/graphics/mail_deleted.png\" alt=\"Deleted\" title=\"Deleted\"/></label></td>";
	}
	//seen
	else{
		p1 = "<tr id=\"row"+emailNo+folderName+"\"  class=\"seen\"><td width=\"8%\"><label><input id=\"check"+emailNo+folderName+"\" type=\"checkbox\" class=\"checkbox\" name=\"indices[]\" onclick=\"selectRange(event);\" value=\""+emailID+"\"/></label></td>";
	}*/
	
	
	return p1.concat(p2);
}


function getmailsfromdb(start,end, folder){
	var inbox= ListOfMessages(folder);
	var returnmsgs=new Array();
	var j=start;
	messagelist={};
	var idlist = {};

	if(isServerFolder(folder)){
		for(var i=start;i<=end;i++){
			//result[j]=inbox[i];
			if(inbox[i]!=null){
				var flags=giveMsgFlags(inbox[i]['id']);
				messagelist[(i)+folder.toUpperCase()]=calcFlag(flags); //should pass the flag
				idlist[(i)]=inbox[i]['id'];
				returnmsgs[j-1]=inbox[i];
				j++;
			}
			
		}
	}else{
		j=start-1;
		for(var i=start-1;i<end;i++){
			if(inbox[i]!=null){
				messagelist[(i+1)+folder.toUpperCase()]=calcFlag(giveMsgFlags(inbox[i]['id'])); //should pass the flag
				idlist[(i+1)]=inbox[i]['id'];
				returnmsgs[j]=inbox[i];
				j++;
			}
			
		}
	}
	localStorage.setItem('mailidlist',JSON.stringify(idlist));
	return returnmsgs;
	
}

//seen-0, unseen-1, flagged-2, recent-4
function calcFlag(flags){
	var f=0;
	if(flags==null){
		return f;	
	}
	if(flags.seen=="0"){
		f+=1;
	}
	if(flags.flagged=="1"){
		f+=2;
	}
	if(flags.recent=="1"){
		f+=4;
	}
	return f;
}


//load content of a single email message
function viewMessage(emailId,emailNo){
	//alert(emailId);
	//alert(parent.horde_toolbar.document.getElementById('inboxBtnTop').innerHTML);
	//parent.horde_main.document.getElementById('mailInboxDiv').innerHTML=html;
	parent.horde_toolbar.document.getElementById('inboxBtnTop').setAttribute("class", "");
	//msgIdToLoad(emailId, emailNo);
	localStorage.setItem('emailid',emailId);
	localStorage.setItem('emailno',emailNo);
	parent.horde_main.location="viewmessage.html";
}

function isOnline(){
	if(localStorage.getItem("connectionStatus")=="online"&&localStorage.getItem("connectionStatusUser")=="online"){
		return true;
	}else{
		return false;
	}
}


//set document title
function setTitle(title){
	parent.document.title=title;	
}

function changeConnectionStatusUser(){
		if(localStorage.getItem('connectionStatusUser')=='online'&&localStorage.getItem('connectionStatus')=='online'&&localStorage.getItem('connectionStatusBrowser')=='online'){
			localStorage.setItem('connectionStatusUser','offline');
			document.getElementById('statusimg').src='img/wrong.png';
			document.getElementById('statusimg').alt='offline';
			document.getElementById('statustxt').innerHTML='&nbsp;&nbsp;&nbsp;Offline&nbsp;&nbsp;&nbsp;&nbsp;';
			document.getElementById('userselectiontxt').textContent="Go to online mode";			
		}else if(localStorage.getItem('connectionStatusUser')=='offline'){
			
			if(localStorage.getItem('connectionStatus')=='offline'){
				imp_info('Unable to switch to online mode. No network connection detected.',4);
			}else if(localStorage.getItem('connectionStatusBrowser')=='offline'){
				imp_info('Unable to switch to online mode. Browser is in offline mode.',4);
			}
			else{
				document.getElementById('statusimg').src='img/tick.png';
				document.getElementById('statusimg').alt='online';
				document.getElementById('statustxt').innerHTML='&nbsp;&nbsp;&nbsp;Online&nbsp;&nbsp;&nbsp;&nbsp;';
				document.getElementById('userselectiontxt').textContent="Go to offline mode";
			}
			localStorage.setItem('connectionStatusUser','online');
		}else if(localStorage.getItem('connectionStatusUser')=='online'&&localStorage.getItem('connectionStatus')=='offline'){
			imp_info('Unable to switch to online mode. No network connection detected.',4);			
		}else if(localStorage.getItem('connectionStatusUser')=='online'&&localStorage.getItem('connectionStatusBrowser')=='offline'){
			imp_info('Unable to switch to online mode. Browser is in offline mode.',4);			
		}
}


function loadDynamicFolderInfoMailbox(){
	var folders=ListOfFolders();
	
	if(folders!=null){
		for(var i=0; i<folders.length ; i++){
			var f=folders[i].toLowerCase();
			if(!(f=="inbox"||f=="sent"||f=="drafts"||f=="outbox"||f=="trash")){
				 var elOptNew = document.createElement('option');
				  elOptNew.text = folders[i];
				  elOptNew.value = folders[i];
				  var elSel = $('mailbox');
				  try {
					elSel.add(elOptNew, null); // standards compliant; doesn't work in IE
				  }
				  catch(ex) {
					elSel.add(elOptNew); // IE only
				  }
			}
		}
	}

	if(parent.horde_main.location.toString().indexOf("folders.html")!=-1){
		parent.horde_toolbar.$('inboxBtnTop').removeClassName('current');
		parent.horde_toolbar.$('foldersBtnTop').addClassName('current');
	}
	
	localStorage.setItem("c",0);
}

function createNewFolder(folnav){
        var b=window.prompt("Please enter the name of the new folder:","")
        if(b){
			try{
				saveFolderList(getSavedCurrentUser(),b);
				if(isOnline()){
					CreatFolderEvent(b,0);
				}else{
					CreatFolderEvent(b,1);
				}
				parent.horde_toolbar.location.reload();
				parent.horde_main.location.reload();
				if(folnav==true){
					parent.horde_sidebar.location.reload();
					unClickAllToolbar();
					parent.horde_toolbar.$('foldersBtnTop').addClassName('current');			
				}else{
					loadDynamicSidebarInfo();
				}
				return true;
			}catch(e){
				return false;
			}
			
			//loadDynamicFolderInfoMailbox();
			//loadFolderListInbox();
        }
}

function logout(){
	try{
		severLogout();
	}catch(e){
	}
	localStorage.setItem("x1dd1",130);
	localStorage.setItem("x2dd1",140);
	parent.location="login.html";
}

function getIdByNo(emailNo){
	var ids=JSON.parse(localStorage.getItem('mailidlist'));
	return ids[emailNo];
}


function setAutoRefresh(){
	var t=parseInt(localStorage.getItem("refreshinterval"));
	if(t==0){
		refreshref = window.clearInterval(refreshref);
	}else if(t>0){
		refreshref = window.clearInterval(refreshref);
		refreshref=window.setInterval("refreshMB()",t*1000);
	}
}

function refreshMB()
{
	if(isOnline()&&localStorage.getItem('syncing')!='1'){
		updateFolder(localStorage.getItem('folder'));
		organizeMsgs(localStorage.getItem('folder'));
		previousPage(localStorage.getItem("currentinboxpage"));
	}
}

//check for mdelete flag and move them into trash
function organizeMsgs(f){
	if(localStorage.getItem('folder').toUpperCase()=="TRASH"){
		return;	
	}
	var xfolder;
	if(f==null){
		xfolder= JSON.parse(localStorage.getItem(getSavedCurrentUser()+"FolderList"));
	}else{
		xfolder=[f];
	}
	for (var j=0; j<xfolder.length;j++){ 
		var inbox= ListOfMessages(xfolder[j]);
		for(var i=0;i<inbox.length;i++){;
			if(inbox[i]!=null){
				var flags=giveMsgFlags(inbox[i]['id']);
				if(flags!=null){
					if(flags.mdelete=="1"&&!isInMailbox('Trash',inbox[i]['id'])){
						deletMsg(inbox[i]['id']);
						
					}
				}
			}
		}
	}
}

function isInMailbox(folder,id){
	var f=localStorage.getItem(folder);
	if(f==null) return false;
    var sfl=JSON.parse(f);
    for(var i=0;i<sfl.length;i++){
         if(sfl[i]==id){
                return true;
           }
   }
   return false;
}


function doSyncAll(){
	var offfol = JSON.parse(localStorage.getItem(getSavedCurrentUser()+"OfflineEvents"));
	if(offfol!=null){
		localStorage.setItem('syncing','1');
		while(offfol.length>0){
			if(isOnline()){
				sysnIt();
				offfol = JSON.parse(localStorage.getItem(getSavedCurrentUser()+"OfflineEvents"));
			}
		}
		localStorage.setItem('syncing','0');
	}
	
}

function searchForSubject(q){
	var r=new Array();
	var xfolder = JSON.parse(localStorage.getItem(getSavedCurrentUser()+"FolderList"));
	for (var i=0; i<xfolder.length;i++){ 
		r=r.concat(searchByFolderSubject(xfolder[i],q));
	}
	return r;
}

function searchForTo(q){
	var r=new Array();
	var xfolder = JSON.parse(localStorage.getItem(getSavedCurrentUser()+"FolderList"));
	for (var i=0; i<xfolder.length;i++){ 
		r=r.concat(searchByFolderTo(xfolder[i],q));
	}	
	return r;
}

function searchForFrom(q){
	var r=new Array();
	var xfolder = JSON.parse(localStorage.getItem(getSavedCurrentUser()+"FolderList"));
	for (var i=0; i<xfolder.length;i++){ 
		r=r.concat(searchByFolderFrom(xfolder[i],q));
	}
	return r;
}

function searchForAll(q){
	var r=new Array();
	r=r.concat(searchForSubject(q));
	r=r.concat(searchForTo(q));
	r=r.concat(searchForFrom(q));
	return r;
}


//--------------------------------------------------------------------------------
//dropdown menu functions
var ddmenuitem	= 0;

// open hidden layer
function mopen(id)
{	
	// close old layer
	if(ddmenuitem && ddmenuitem.style.visibility=='visible') {
		ddmenuitem.style.visibility = 'hidden';
		$('sddmp').style.backgroundColor='#6666AA';
		$('sddmp').className = "drop";
		
	}else{
	// get new layer and show it
	
		ddmenuitem = $(id);
		ddmenuitem.style.left=$('sddm').offsetLeft-105+'px';
		ddmenuitem.style.visibility = 'visible';
		$('sddmp').style.backgroundColor='#f0f9fc';
		
	}
	
}
// close showed layer
function mclose()
{
	try{
		if(event!=null){
			ele='button : '+event.srcElement.id+'\n';
			//alert(ele.indexOf("sddmp"));
			if(ddmenuitem && ele.indexOf("sddmp")==-1) 
			{
				ddmenuitem.style.visibility = 'hidden';
				$('sddmp').style.backgroundColor='#6666AA';
			}
		}else{
			ddmenuitem.style.visibility = 'hidden';
			$('sddmp').style.backgroundColor='#6666AA';
		}
	}catch(e){}
}

//----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
//message boxes

//a-function
function imp_confirm(a,b){
    RedBox.overlay=true;
    RedBox.showHtml('<div id="RB_confirm" style="padding:10px; border: 3px groove #6666aa;"><p>'+b+'</p><center><input type="button" class="button" id="ryesb" value=Yes /><input type="button" class="button" onclick="RedBox.close();" value=No /></center></div>',a)
}

//t-type 1=info, 2=error, 3=success, 4=warning
function imp_info(a,t){
	var timg="message";
	switch(t){
		case 1:timg="message";break;
		case 2:timg="error";break;
		case 3:timg="success";break;
		case 4:timg="warning";break;			
	}
    RedBox.overlay=true;
    RedBox.showHtml('<div id="RB_confirm" style="padding:10px; border: 3px groove #6666aa;"><p><img src="img/theme/graphics/alerts/'+timg+'.png" alt="Success" title=""  style="padding-right:5px">'+a+'</p><center><input type="button" class="button" onclick="RedBox.close();" value=Ok /></center></div>')
}