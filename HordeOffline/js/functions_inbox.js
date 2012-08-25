// functions related to inbox 

//main function handling dynamic info related to inbox on load

function loadDynamicInboxInfo(){
	var folder=localStorage.getItem('folder');
	var emailsperpage=parseInt(localStorage.getItem("emailsperpage"));

	if(isOnline()&&localStorage.getItem('syncing')!='1'){
		updateFolder(folder);
		organizeMsgs(folder);
	}
	
	/*if(folder=="Outbox"){
		$('topname').replace(folder+" ("+(NoOfMessages(folder)-3)+")");
	}else*/ if(folder=="searchresults"){
		$('topname').replace("Search Results ("+NoOfMessages(folder)+")");
	}else{
		$('topname').replace(folder+" ("+NoOfMessages(folder)+")");
	}
	//alert(localStorage.getItem("currentinboxpage"));
	updateTopInfoBar(localStorage.getItem("currentinboxpage"));
	if(parseInt(localStorage.getItem("currentinboxpage"))*emailsperpage<(parseInt(NoOfMessages(folder)))){
		document.getElementById('nextpageimg1').src="img/theme/graphics/nav/right.png";
		document.getElementById('nextpageimg2').src="img/theme/graphics/nav/right.png";
		document.getElementById('lastpageimg1').src="img/theme/graphics/nav/last.png";
		document.getElementById('lastpageimg2').src="img/theme/graphics/nav/last.png";
		document.getElementById('nextpageimg1').onmouseover=function(){ddrivetip('Next Page');};
		document.getElementById('nextpageimg2').onmouseover=function(){ddrivetip('Next Page');};
		document.getElementById('lastpageimg1').onmouseover=function(){ddrivetip('Last Page');};
		document.getElementById('lastpageimg2').onmouseover=function(){ddrivetip('Last Page');};
	}else{
		document.getElementById('nextpageimg1').src="img/theme/graphics/nav/right-grey.png";
		document.getElementById('nextpageimg2').src="img/theme/graphics/nav/right-grey.png";
		document.getElementById('lastpageimg1').src="img/theme/graphics/nav/last-grey.png";
		document.getElementById('lastpageimg2').src="img/theme/graphics/nav/last-grey.png";
		document.getElementById('nextpageimg1').onmouseover=function(){};
		document.getElementById('nextpageimg2').onmouseover=function(){};
		document.getElementById('lastpageimg1').onmouseover=function(){};
		document.getElementById('lastpageimg2').onmouseover=function(){};
	}
	if(parseInt(localStorage.getItem("currentinboxpage"))>1){
			document.getElementById('previouspageimg1').src="img/theme/graphics/nav/left.png";
			document.getElementById('previouspageimg2').src="img/theme/graphics/nav/left.png";
			document.getElementById('firstpageimg1').src="img/theme/graphics/nav/first.png";
			document.getElementById('firstpageimg2').src="img/theme/graphics/nav/first.png";
			document.getElementById('previouspageimg1').onmouseover=function(){ddrivetip('Previous Page');};
		document.getElementById('previouspageimg2').onmouseover=function(){ddrivetip('Previous Page');};
		document.getElementById('firstpageimg1').onmouseover=function(){ddrivetip('First Page');};
		document.getElementById('firstpageimg2').onmouseover=function(){ddrivetip('First Page');};
	}else{
			document.getElementById('previouspageimg1').src="img/theme/graphics/nav/left-grey.png";
			document.getElementById('previouspageimg2').src="img/theme/graphics/nav/left-grey.png";
			document.getElementById('firstpageimg1').src="img/theme/graphics/nav/first-grey.png";
			document.getElementById('firstpageimg2').src="img/theme/graphics/nav/first-grey.png";
			document.getElementById('previouspageimg1').onmouseover=function(){};
		document.getElementById('previouspageimg2').onmouseover=function(){};
		document.getElementById('firstpageimg1').onmouseover=function(){};
		document.getElementById('firstpageimg2').onmouseover=function(){};
	}
	
	if(localStorage.getItem('folder')=='Trash'){
		$('ud1').style.display='block';
		$('ud2').style.display='block';
	}else{
		$('ud1').style.display='none';
		$('ud2').style.display='none';
	}
	
	
	$('pagenobox1').observe('keypress', keypressPageNavigator);
	$('pagenobox2').observe('keypress', keypressPageNavigator);
	//localStorage.setItem("currentinboxpage", 1);
	
	loadFolderListInbox();
}


function loadFolderListInbox(){
	var folders=ListOfFolders();
	
	var optionlst=$$('select#targetMailbox1 option');
	
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
				  var elSel = $('targetMailbox1');
				  var elSel2 = $('targetMailbox2');
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


function updateTopInfoBar(page){
	var emailsperpage=parseInt(localStorage.getItem("emailsperpage"));
	var folder=localStorage.getItem('folder');
	if(NoOfMessages(folder)%emailsperpage==0){
		if(NoOfMessages(folder)==0){
			document.getElementById('toppageinfo').textContent="Page "+page+" of "+1;
		}else{
		document.getElementById('toppageinfo').textContent="Page "+page+" of "+parseInt((NoOfMessages(folder)/emailsperpage));
		}
	}else{
		document.getElementById('toppageinfo').textContent="Page "+page+" of "+parseInt((NoOfMessages(folder)/emailsperpage)+1);
	}
	
	if(page*emailsperpage<NoOfMessages(folder)){
	document.getElementById('topmsginfo').textContent= (page*emailsperpage-(emailsperpage-1))+" to "+ page*emailsperpage+" of "+NoOfMessages(folder)+" Messages";
	}else{
		if(NoOfMessages(folder)==0){
			document.getElementById('topmsginfo').textContent= "0 to 0 of 0 Messages";
		}else{
		document.getElementById('topmsginfo').textContent= (page*emailsperpage-(emailsperpage-1))+" to "+ NoOfMessages(folder)+" of "+NoOfMessages(folder)+" Messages";
		}
	}
	document.getElementById('pagenobox1').value=page;
	document.getElementById('pagenobox2').value=page;
}

//function to go to next page of inbox
function nextPage(p){
	var emailsperpage=parseInt(localStorage.getItem("emailsperpage"));
	var folder=localStorage.getItem('folder');
	if(document.getElementById('nextpageimg1').src.toString().indexOf("right.png")!=-1){
		var page=p;
		//alert("next page called"+page);
		if(page==""||page=="NaN"||page=="undefined"||page==null){
			//page=parseInt(document.getElementById('pagenobox1').value)+1;
			page=parseInt(localStorage.getItem("currentinboxpage"))+1;
		}else{
			page=parseInt(page);
		}
		document.getElementById('pagenobox1').value=page;
		document.getElementById('pagenobox2').value=page;
		if(page*emailsperpage<NoOfMessages(folder)){
			fillInbox(page*emailsperpage-(emailsperpage-1), page*emailsperpage);
		}else{
			fillInbox(page*emailsperpage-(emailsperpage-1), NoOfMessages(folder));
			document.getElementById('nextpageimg1').src="img/theme/graphics/nav/right-grey.png";
		document.getElementById('nextpageimg2').src="img/theme/graphics/nav/right-grey.png";
		document.getElementById('lastpageimg1').src="img/theme/graphics/nav/last-grey.png";
		document.getElementById('lastpageimg2').src="img/theme/graphics/nav/last-grey.png";
		document.getElementById('nextpageimg1').onmouseover=function(){};
		document.getElementById('nextpageimg2').onmouseover=function(){};
		document.getElementById('lastpageimg1').onmouseover=function(){};
		document.getElementById('lastpageimg2').onmouseover=function(){};
			
		}
		if(document.getElementById('previouspageimg1').src.toString().indexOf("left-grey.png")!=-1){
			document.getElementById('previouspageimg1').src="img/theme/graphics/nav/left.png";
			document.getElementById('previouspageimg2').src="img/theme/graphics/nav/left.png";
			document.getElementById('firstpageimg1').src="img/theme/graphics/nav/first.png";
			document.getElementById('firstpageimg2').src="img/theme/graphics/nav/first.png";
			document.getElementById('previouspageimg1').onmouseover=function(){ddrivetip('Previous Page');};
		document.getElementById('previouspageimg2').onmouseover=function(){ddrivetip('Previous Page');};
		document.getElementById('firstpageimg1').onmouseover=function(){ddrivetip('First Page');};
		document.getElementById('firstpageimg2').onmouseover=function(){ddrivetip('First Page');};
			}
		
		updateTopInfoBar(page);
		localStorage.setItem("currentinboxpage", page);	
		document.getElementById('checkAll1').checked=false;
	}
}

//function to load last page of inbox
function lastPage(){
	var emailsperpage=parseInt(localStorage.getItem("emailsperpage"));
	if(document.getElementById('lastpageimg1').src.toString().indexOf("last.png")!=-1){
	var page=parseInt((NoOfMessages(folder)/emailsperpage))+1;
	nextPage(page);
	}
}


//function to go to previous page of inbox
function previousPage(p){
	var emailsperpage=parseInt(localStorage.getItem("emailsperpage"));
	//alert("previousPage called with page "+p);
	if(document.getElementById('previouspageimg1').src.toString().indexOf("left.png")!=-1){
		var page=p;
		if(page==""||page=="NaN"||page=="undefined"||page==null){
			//page=parseInt(document.getElementById('pagenobox1').value)-1;
			page=parseInt(localStorage.getItem("currentinboxpage"))-1;
		}else{
			page=parseInt(page);
		}
		document.getElementById('pagenobox1').value=page;
		document.getElementById('pagenobox2').value=page;
		if(page>1){
			fillInbox(page*emailsperpage-(emailsperpage-1), page*emailsperpage);
		}else if(page==1){
			fillInbox(1, emailsperpage);
			document.getElementById('previouspageimg1').src="img/theme/graphics/nav/left-grey.png";
		document.getElementById('previouspageimg2').src="img/theme/graphics/nav/left-grey.png";
		document.getElementById('firstpageimg1').src="img/theme/graphics/nav/first-grey.png";
		document.getElementById('firstpageimg2').src="img/theme/graphics/nav/first-grey.png";
		document.getElementById('previouspageimg1').onmouseover=function(){};
		document.getElementById('previouspageimg2').onmouseover=function(){};
		document.getElementById('firstpageimg1').onmouseover=function(){};
		document.getElementById('firstpageimg2').onmouseover=function(){};
			
		}
		if(document.getElementById('nextpageimg1').src.toString().indexOf("right-grey.png")!=-1){
		document.getElementById('nextpageimg1').src="img/theme/graphics/nav/right.png";
		document.getElementById('nextpageimg2').src="img/theme/graphics/nav/right.png";
		document.getElementById('lastpageimg1').src="img/theme/graphics/nav/last.png";
		document.getElementById('lastpageimg2').src="img/theme/graphics/nav/last.png";
		document.getElementById('nextpageimg1').onmouseover=function(){ddrivetip('Next Page');};
		document.getElementById('nextpageimg2').onmouseover=function(){ddrivetip('Next Page');};
		document.getElementById('lastpageimg1').onmouseover=function(){ddrivetip('Last Page');};
		document.getElementById('lastpageimg2').onmouseover=function(){ddrivetip('Last Page');};
		}
		
		updateTopInfoBar(page);	
		localStorage.setItem("currentinboxpage", page);
		document.getElementById('checkAll1').checked=false;
	}
}

//function to go to first page
function firstPage(){
	if(document.getElementById('firstpageimg1').src.toString().indexOf("first.png")!=-1){
		previousPage(1);
	}
}

function refreshInbox(){
	if(isOnline()&&localStorage.getItem('syncing')!='1'){
		updateFolder(localStorage.getItem('folder'));
		organizeMsgs(localStorage.getItem('folder'));
		previousPage(localStorage.getItem("currentinboxpage"));
	}else{
		imp_info("Cannot update while working in offline mode.",1);
	}
}


function keypressPageNavigator (event){
	var emailsperpage=parseInt(localStorage.getItem("emailsperpage"));
    if(event.keyCode==Event.KEY_RETURN){
		var page;
		if(event.currentTarget.id=='pagenobox1'){
			page=parseInt(document.getElementById('pagenobox1').value);
		}else if(event.currentTarget.id=='pagenobox2'){
			page=parseInt(document.getElementById('pagenobox2').value);
		}
		
		
		if(page>=1 && page<=parseInt((NoOfMessages(localStorage.getItem('folder'))/emailsperpage)+1)){
			var currentpage=localStorage.getItem("currentinboxpage");
			if(page>currentpage){
				//alert("nextpage"+page);
				nextPage(page);
				
			}else if(page<currentpage){
				//alert("previous"+page)
				previousPage(page);
			}
		}
	}
}

function makeSelection(type){
	var folder=localStorage.getItem('folder');
	var folderU=folder.toUpperCase();
	var begin=parseInt(localStorage.getItem("currentinboxpage"));
	var emailsperpage=parseInt(localStorage.getItem("emailsperpage"));
	var totalmsgs= NoOfMessages(folder);
	
	if(type==-1){
		var b=document.getElementById('checkAll1').checked;
		var x=emailsperpage*(begin-1)+1;
		var y=begin*emailsperpage;
		if(y<=totalmsgs){
			for(var i=x;i<=y;i++){
				selectRow('check'+i+folderU,b);
			}
		}else{
			for(var i=x;i<=totalmsgs;i++){
				selectRow('check'+i+folderU,b);
			}
		}
	}else if(type==1){
		var selct=$F("filter1");
		if(selct=="99"){
			selct=$F("filter2");
		}
		if(selct=="!0"){
			var x=emailsperpage*(begin-1)+1;
			var y=begin*emailsperpage;
			if(y<=totalmsgs){
				for(var i=x;i<=y;i++){
					selectRow('check'+i+folderU,true);
				}
			}else{
				for(var i=x;i<=totalmsgs;i++){
					selectRow('check'+i+folderU,true);
				}
			}
		}else if(selct=="0"){
			var x=emailsperpage*(begin-1)+1;
			var y=begin*emailsperpage;
			if(y<=totalmsgs){
				for(var i=x;i<=y;i++){
					selectRow('check'+i+folderU,false);
				}
			}else{
				for(var i=x;i<=totalmsgs;i++){
					selectRow('check'+i+folderU,false);
				}
			}
		}else{
			 if(selct.startsWith("!")){
				 selectFlagged(parseInt(selct.substring(1)),false);
			}else{
				if(selct.startsWith("+")){
					selectFlagged(selct.substring(0,1),null)
					}else{
					selectFlagged(parseInt(selct),true)
                }
            }
		}
		Form.Element.setValue("filter1","99");
		Form.Element.setValue("filter2","99");
	}
	
}

function selectFlagged(a,b){
    $H(messagelist).keys().each(function(f){
        var c,d=$("check"+f);
        if(a=="+"){
            c=!d.checked
        }else{
            if(a&messagelist[f]){
                c=b
            }else{
                c=!b
            }
         }
        selectRow(d.id,c)
        })
}

function selectRow(id,checked){
    var b=document.getElementById(id.replace(/check/,"row"));
    if(checked){
        b.addClassName("selectedRow")
    }else{
        b.removeClassName("selectedRow");
        b.removeClassName("selectedRow-over")
    }
    document.getElementById(id).checked=checked;
}

var startrange=null;	
function selectRange(c){
	var folder=localStorage.getItem('folder');
	var folderU=folder.toUpperCase();
    Event.extend(c);
    var f=c.element().id
	var d=document.getElementById(f);
    if(!d){
        return
    }
    var b=d.checked;
    if(startrange!= null&&c.shiftKey){
		var first=parseInt(startrange.substring(5,6));
		var last=parseInt(f.substring(5,6));
		for(var i=first;i<=last;i++)
		{
			selectRow('check'+i+folderU,b);
		}
		return true;
	}else{
    selectRow(f,b)
    }
    startrange=f
}


function anySelected(){
	var msgids=JSON.parse(localStorage.getItem('mailidlist'));
	var folder=localStorage.getItem('folder').toUpperCase()
	for (key in msgids) {
		if(folder=="OUTBOX"){
			key+=3;
		}
		if($("check"+key+folder).checked){
			return true
		}
	}
   /* return $H(messagelist).keys().detect(function(a){
        return $("check"+a).checked
        })*/
}


function flagMessages(b, p){
    var a=$("flag1"),c=$("flag2");
    if((b==1&&$F(a)!="")||(b==2&&$F(c)!="")){
		if(p==null){
			if(anySelected()){
				var flag=(b==1)?$F(a):$F(c);
				var emailNos = new Array();
				var i=0; 
				var folder=localStorage.getItem('folder');
				var msgids=JSON.parse(localStorage.getItem('mailidlist'));
				for (key in msgids) {
					if($("check"+key+folder.toUpperCase()).checked){
						emailNos[i]=parseInt(key);
						i++;
					}
				}
				requestForFlagging(flag, emailNos);
				window.location.reload();
			}else{
					imp_info("You muat select at least one message first.",1)
			}
		}else{
			var flag=(b==1)?$F(a):$F(c);
			var emailNos = [parseInt(localStorage.getItem('emailid'))];
			requestForFlagging(flag, emailNos,0);
			//parent.horde_main.location="inbox.html";
		}
		if(b==1){
                a.selectedIndex=0;
        }else if(b==2){
                c.selectedIndex=0;
        }
     }
}


function messageListAction(action){
	
	if(anySelected()){
            var flag="";
			//delete
			if(action==1){
				flag="Deleted";
			}else if(action==2){//Undelete
				flag="NotDeleted";
			}
			var emailNos = new Array();
			var i=0; 
			var folder=localStorage.getItem('folder');
			var msgids=JSON.parse(localStorage.getItem('mailidlist'));
			for (key in msgids) {
				if($("check"+key+folder.toUpperCase()).checked){
					emailNos[i]=parseInt(key);
					i++;
				}
			}
			
			/*$H(messagelist).keys().detect(function(x){
				if($("check"+x).checked){
       		 		emailNos[i]=parseInt(x.substring(0,x.indexOf('I')));
					i++;
				}
        	});*/
			
			if(flag!=""){
				requestForFlagging(flag, emailNos);
			}else{
				imp_info("Unable to perform requested action",2);
			}
			window.location.reload();
            //alert(value);//messages_submit("flag_messages")
    }else{
           imp_info("You muat select at least one message first.",1)
    }
}

function forwardFromInbox(){
	var folder=localStorage.getItem('folder').toUpperCase();
	var r=0;
	var msid;
	if(folder!='TRASH'){
		//var o=localStorage.getItem('mailidlist').toString().split(',');
		var msgids=JSON.parse(localStorage.getItem('mailidlist'));
			if(anySelected()){
				for (key in msgids) {
					if($("check"+key+folder).checked){
						r++;
						if(r>1){
							imp_info('Please select only one email per time for forwarding.',1)
							return;
						}
						msid=msgids[key];
					}
				}
				localStorage.setItem('emailid',msid);
				localStorage.setItem('actionID','forward_all');
				popup('compose.html');
			}else{
				imp_info('You must select at least one message first.',1);
			}
	}
}

function undeleteMessage(){
	var folder=localStorage.getItem('folder');
	if(folder.toUpperCase()=='TRASH'){
		//var o=localStorage.getItem('mailidlist').toString().split(',');
		var msgids=JSON.parse(localStorage.getItem('mailidlist'));
			if(anySelected()){
				for (key in msgids) {
					if($("check"+key+folder.toUpperCase()).checked){
						moveMsg(msgids[key],'INBOX');
						markAsUndelet(msgids[key]);
					}
				}
				viewInbox(3, folder);
			}else{
				imp_info('You must select at least one message first.',1);
			}
	}
}


function deleteMessage(i){
	var folder=localStorage.getItem('folder');
		//var o=localStorage.getItem('mailidlist').toString().split(',');
		var msgids=JSON.parse(localStorage.getItem('mailidlist'));
		if(i==1){
			if(anySelected()){
				for (key in msgids) {
					if($("check"+key+folder.toUpperCase()).checked){
						if(folder.toUpperCase()=='TRASH'||folder.toUpperCase()=='DRAFTS'||folder.toUpperCase()=='OUTBOX'){
							PermantDeletMsg(msgids[key]);
						}else{
							deletMsg(msgids[key]);
							markAsDelet(msgids[key]);
						}
					}
				}
				viewInbox(1, folder);
			}else{
				imp_info('You must select at least one message first.',1);
				return;
			}
		}else{
			if(folder.toUpperCase()=='TRASH'||folder.toUpperCase()=='DRAFTS'||folder.toUpperCase()=='OUTBOX'){
				PermantDeletMsg(localStorage.getItem('emailid'));
			}else{
				deletMsg(localStorage.getItem('emailid'));
				markAsDelet(localStorage.getItem('emailid'));
			}
			viewInbox(1, folder);
		}	
}


function moveMessage(i){
	var tofolder;
	var folder=localStorage.getItem('folder');
	//var o=localStorage.getItem('mailidlist').toString().split(',');
	var msgids=JSON.parse(localStorage.getItem('mailidlist'));
	if(i!=null){
		if(i==1){
			tofolder=$('targetMailbox1').value;
		}else if(i==2){
			tofolder=$('targetMailbox2').value;
		}
		if(tofolder==""){
			imp_info('You must select a destination folder.',1);
			return;
		}
		if(anySelected()){
			for (key in msgids) {
				if($("check"+key+folder.toUpperCase()).checked){
							moveMsg(msgids[key],tofolder);
							if(tofolder.toUpperCase()=="Trash"){
								markAsDelet(msgids[key]);
							}else if(folder.toUpperCase()=="Trash"){
								markAsUndelet(msgids[key]);
							}
				}
			}
			viewInbox(1, folder);
		}else{
				imp_info('You must select at least one message first.',1);
		}
		$('targetMailbox1').selectedIndex =1;
		$('targetMailbox2').selectedIndex =1;
		return;
	}else{
		tofolder=$('target1').value;
		if(tofolder==""){
			tofolder=$('target2').value;
			if(tofolder==""){
				imp_info('You must select a destination folder.',1);
				return;
			}
		}
		moveMsg(localStorage.getItem('emailid'),tofolder);		
		if(tofolder.toUpperCase()=="Trash"){
				markAsDelet(localStorage.getItem('emailid'));
		}else if(folder.toUpperCase()=="Trash"){
				markAsUndelet(localStorage.getItem('emailid'));
		}
		viewInbox(1, folder);
	}
	
}


function emptyFolder(){
	RedBox.close();
	var folder= localStorage.getItem('folder');
	try{
		/*var inbox= ListOfMessages(folder);
		for(var i=0;i<inbox.length;i++){;
			if(inbox[i]!=null){
				PermantDeletMsg(inbox[i]['id']);
			}
		}*/
		moveFolderToTrash(folder);
		$('emptyallfail').style.display='none';
		$('emptyallsuccess').style.display='block';
	}catch(e){
		$('emptyallsuccess').style.display='none';
		$('emptyallfail').style.display='block';
	}
	viewInbox(1, folder);
}

function countNoofJSONProperties(obj) {
  var prop;
  var propCount = 0;
  
  for (prop in obj) {
	 var t=obj[prop];
    propCount++;
  }
  return propCount;
}


function requestForFlagging(flag, emailNos, p){
	var f="";
	var v=0;
	var u="";
	switch(flag)
	{
		case "Seen":f='seen';v=1;u='Seen';
				break;
		case "Unseen":f="seen";v=0;u='Unseen';
				break;
		case "Important":f="flagged";v=1;u='Flagged';
				break;
		case "NotImportant":f="flagged";v=0;u='NotFlagged';
				break;
		case "Recent":f="recent";v=1;u='Recent';
				break;
		case "NotRecent":f="recent";v=0;u='NotRecent';
				break;
	}
	if(f!=""){
		for(var i=0;i<emailNos.length;i++){
			var mailid;
			if(p==null){
				mailid=parseInt(getIdByNo(emailNos[i]));
			}else{
				mailid=parseInt(emailNos[i]);
			}
			var cflags=giveMsgFlags(mailid);
			if(cflags[f]!=v){
				updateMsgFlags(mailid,f,v);
				if(isOnline()){
					StatusEvent(u,mailid,0);
				}else{
					StatusEvent(u,mailid,1);
				}
			}
		}
	}
}