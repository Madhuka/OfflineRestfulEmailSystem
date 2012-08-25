

function loadDynamicFolderNavInfo(){
	//for getting new info from servaer
	var nf1=NoOfFolder();
	
	if(isOnline()&&localStorage.getItem('syncing')!='1'){
		try{
			readFolders();
		}catch(e){}
		/*var xfolder = JSON.parse(localStorage.getItem(getSavedCurrentUser()+"FolderList"));
		for (var i=0; i<xfolder.length;i++){ 
			if(NoOfMessages(xfolder[i])<1){ 
				try{
					readFolder(xfolder[i]);
				}catch(e){}
			}else{
				try{
					updateFolder(xfolder[i]);
				}catch(e){}

			}
		}*/
	}
	var infomsg=localStorage.getItem('infomsg');
	if(infomsg!=null&&infomsg!=""){
		localStorage.setItem('infomsg','');
		if(infomsg=='folder_delete_success'){
			showFNInfo('success','Folder(s) were successfully deleted.')
		}else if(infomsg=='folder_delete_fail'){
			showFNInfo('error','Some Folder(s) were not deleted.')
		}else if(infomsg=='folder_empty_success'){
			showFNInfo('success','Folder(s) were successfully cleared.')
		}else if(infomsg=='folder_empty_fail'){
			showFNInfo('error','Some Folder(s) were not cleared.')
		}else if(infomsg=='create_folder_success'){
			showFNInfo('success','Folder successfully created.')
		}else if(infomsg=='create_folder_fail'){
			showFNInfo('error','Error! Could not create folder.')
		}
		
	}
	
	var nf2=NoOfFolder();
	//-------------------------------
	
	$('mainFolders').update();
	$('additionalFolders').update();
	$('createNewFolder').update();
	var mainFolderlist=["INBOX","Drafts","Sent","Outbox","Trash"];
	
	var menu="<div class=\"item0\">&nbsp;<label><input type=\"checkbox\" class=\"checkbox\" name=\"folder_list[]\" value=\""+mainFolderlist[0]+"\" /><span style=\"display: none;\">Select mailbox</span></label> <img src=\"img/theme/graphics/tree/joinbottom-down.png\" alt=\"\" title=\"\" style=\"vertical-align:middle\" /><img src=\"img/theme/graphics/inbox.png\" alt=\"Inbox\" title=\"\" style=\"vertical-align:middle\" /> <a href=\"#\" onClick=\"viewInbox()\" onMouseover=\"ddrivetip('View messages in Inbox')\" onMouseout=\"hideddrivetip()\"><span id=\"inboxInfo\">Inbox</span></a> </div><div class=\"item1\"> &nbsp;<label><input type=\"checkbox\" class=\"checkbox\" name=\"folder_list[]\" value=\""+mainFolderlist[1]+"\" /><span style=\"display: none;\">Select mailbox</span></label> <img src=\"img/theme/graphics/tree/join.png\" alt=\"\" title=\"\" style=\"vertical-align:middle\" /><img src=\"img/theme/graphics/drafts.png\" alt=\"Drafts folder\" title=\"\" style=\"vertical-align:middle\" /> <a href=\"#\" onClick=\"viewInbox(null,'Drafts')\" onMouseover=\"ddrivetip('View messages in Drafts')\" onMouseout=\"hideddrivetip()\">Drafts</a></div><div class=\"item0\">  &nbsp;<label><input type=\"checkbox\" class=\"checkbox\" name=\"folder_list[]\" value=\""+mainFolderlist[2]+"\" /><span style=\"display: none;\">Select mailbox</span></label> <img src=\"img/theme/graphics/tree/join.png\" alt=\"\" title=\"\" style=\"vertical-align:middle\" /><img src=\"img/theme/graphics/sent.png\" alt=\"Sent mail folder\" title=\"\" style=\"vertical-align:middle\" /> <a href=\"#\" onClick=\"viewInbox(null,'Sent')\" onMouseover=\"ddrivetip('View messages in Sent')\" onMouseout=\"hideddrivetip()\">Sent</a>  </div>  <div class=\"item1\">  &nbsp;<label><input type=\"checkbox\" class=\"checkbox\" name=\"folder_list[]\" value=\""+mainFolderlist[3]+"\" /><span style=\"display: none;\">Select mailbox</span></label> <img src=\"img/theme/graphics/tree/join.png\" alt=\"\" title=\"\" style=\"vertical-align:middle\" /><img src=\"img/theme/graphics/outbox.png\" alt=\"Outbox\" title=\"\" style=\"vertical-align:middle\" /> <a href=\"#\" onClick=\"viewInbox(null,'Outbox')\" onMouseover=\"ddrivetip('View messages in Outbox')\" onMouseout=\"hideddrivetip()\">Outbox</a> </div> <div class=\"item0\">  &nbsp;<label><input type=\"checkbox\" class=\"checkbox\" name=\"folder_list[]\" value=\""+mainFolderlist[4]+"\" /><span style=\"display: none;\">Select mailbox</span></label> <img src=\"img/theme/graphics/tree/join.png\" alt=\"\" title=\"\" style=\"vertical-align:middle\" /><img src=\"img/theme/graphics/trash.png\" alt=\"Trash\" title=\"\" style=\"vertical-align:middle\" /> <a href=\"#\" onClick=\"viewInbox(null,'Trash')\"  onMouseover=\"ddrivetip('View messages in Trash')\" onMouseout=\"hideddrivetip()\">Trash</a>  </div>";
	$('mainFolders').insert(menu);
	
	var folders=ListOfFolders();
	var classTypeCount=1;
	for(var i=0; i<folders.length ; i++){
		var f=folders[i].toLowerCase();
		if(!(f=="inbox"||f=="sent"||f=="drafts"||f=="outbox"||f=="trash")){
			var h="<div class=\"item"+(classTypeCount%2)+"\"> &nbsp;<label><input type=\"checkbox\" class=\"checkbox\" name=\"folder_list[]\" value=\""+folders[i]+"\" /><span style=\"display: none;\">Select mailbox</span></label> <img src=\"img/theme/graphics/tree/join.png\" alt=\"\" title=\"\" style=\"vertical-align:middle\" /><img src=\"img/theme/graphics/folder.png\" alt=\""+folders[i]+"\" title=\"\" style=\"vertical-align:middle\" /> <a href=\"#\" onClick=\"viewInbox(null,'"+folders[i]+"') \" onMouseover=\"ddrivetip('View messages in "+folders[i]+"')\" onMouseout=\"hideddrivetip()\">"+folders[i]+"</a> </div> ";
			$('additionalFolders').insert(h);
			classTypeCount++;
		}	
	}
	
	var newfoldermenu="<div class=\"item"+(classTypeCount%2)+"\"> &nbsp;<label><input type=\"checkbox\" class=\"checkbox\" name=\"folder_list[]\" value=\"New Folder\"  disabled=\"disabled\"/><span style=\"display: none;\">Select mailbox</span></label> <img src=\"img/theme/graphics/tree/joinbottom.png\" alt=\"\" title=\"\" style=\"vertical-align:middle\" /><img src=\"img/theme/graphics/newfolder.png\" alt=\"New Folder\" title=\"\" style=\"vertical-align:middle\" /> <a href=\"#\" onClick=\"createNewFolder(true)\" onMouseover=\"ddrivetip('Create New Folder')\" onMouseout=\"hideddrivetip()\">New Folder</a> </div> ";
	$('createNewFolder').insert(newfoldermenu);
	
	if(nf1!=nf2){
		parent.horde_sidebar.location.reload();
		parent.horde_toolbar.location.reload();
	}
	
}

function folderNavSubmit()
{ 
	var selct=$F("action_choose0");
	
	if(selct=="create_folder"){
		if(createNewFolder(true)){
			localStorage.setItem('infomsg','create_folder_success');
		}else{
			localStorage.setItem('infomsg','create_folder_fail');
		}
	}else{
		if(!getChecked().size()){
			imp_info("Please select a folder before you perform this action.",1);
			$('action_choose0').selectedIndex=0;
			return;
		}
		else{
			if(selct=="rename_folder"){
				renameMailbox();
			}else if(selct=="delete_folder_confirm"){
				var candelete=false;
				var fldrs="";
				var folderstodelete=new Array();
				var q=0;
				getFolders().each(function(e){
					if(e.checked){
						fldrs+=e.value+", ";
						var f=e.value.toLowerCase();
						if(!(f=="inbox"||f=="sent"||f=="drafts"||f=="outbox"||f=="trash")){
							candelete=true;
							folderstodelete[q]=e.value;
							q++;
						}
					}
				});
				if(candelete){
					goToConfirmation(selct);
				}else{
					if(fldrs.endsWith(", ")){
						fldrs=fldrs.substring(0,fldrs.length-2);
					}
					imp_info("Following standard folder(s) cannot be deleted.\n"+fldrs,4);
					$('action_choose0').selectedIndex=0;
					return;
				}
			}else if(selct=="folders_empty_mailbox_confirm"||selct=="mbox_size"){
				goToConfirmation(selct);
			}else if(selct=="mark_folder_seen"){
				try{
					getFolders().each(function(e){
						if(e.checked){
							markingFolderFlags('Seen',e.value)
						}
					});
					showFNInfo('success','All emails were marked as seen.')
				}catch(e){
					showFNInfo('error','Error occured during marking emails as seen.')
				}
			}
			else if(selct=="mark_folder_unseen"){
				try{
					getFolders().each(function(e){
						if(e.checked){
							markingFolderFlags('Unseen',e.value)
						}
					});
					showFNInfo('success','All emails were marked as unseen.')
				}catch(e){
					showFNInfo('error','Error occured during marking emails as unseen.')
				}
				
			}
			else if(selct=="download_folder"){
				
			}
			else if(selct=="download_folder_zip"){
				
			}
		}
	}

	$('action_choose0').selectedIndex=0;
}

function getChecked(){
    return getFolders().findAll(function(a){
        return a.checked
        });
}
    
function getFolders(){
    return $("fmanager").getInputs(null,"folder_list[]");
}

function toggleSelection(){
    var c=getChecked().size(),a=getFolders();
    var b=(c!=a.size());
    a.each(function(d){
        d.checked=b
    });
}

//function for renaming folders
function renameMailbox(){
    var b="",c="",a=0;
    getFolders().each(function(e){
        if(e.checked){
			var f=e.value.toLowerCase();
            if((f=="inbox"||f=="sent"||f=="drafts"||f=="outbox"||f=="trash")){
                imp_info("This folder, "+e.value+" cannot be renamed.",4);
				return;
           }else{
                var d=window.prompt("You are renaming the folder: "+e.value+"\nPlease enter the new name: ",e.value);
                if(d){
					//********************************
					//function to rename a folder
					//d - newName
					//e.value - oldName
					//return true on success
					//var r=renameFolder(e.value, d);
					//
					//*******************************
					//showFolderNotice(true, "Renaming Inboxto Inboxq failed. This is what the server said: Renaming INBOX isn't supported.");
                    }
                }
        }
    ++a;
    });
    return true;
}

/*//show notice div
function showFolderNotice(success,msg){
	$('folderNotices').style.display = "block";
	if(success){
		$('folderNoticesImg').src="img/theme/graphics/alerts/success.png";
		$('folderNoticesImg').alt="Success";	
	}else{
		$('folderNoticesImg').src="img/theme/graphics/alerts/error.png";
		$('folderNoticesImg').alt="Error";	
	}
	$('folderNoticesMsg').textContent=msg;
}

//hide notice div
function hideFolderNotice(){
	$('folderNotices').style.display = "none";
}*/

//function loading the confirmation page for an action
function goToConfirmation(action){
	var checkedFolders="";
	getFolders().each(function(e){
        if(e.checked){
            checkedFolders+=e.value+",";
        }
    });
	if(checkedFolders.endsWith(",")){
		checkedFolders=checkedFolders.substring(0,checkedFolders.length-1)
	}
	localStorage.setItem('confirmpage',"folders="+checkedFolders+"&action="+action);
	parent.horde_main.location="confirmpage.html";
}

function markingFolderFlags(flag,folder){
	var emailIDs=ListOfEmailIDs(folder);
	if(emailIDs!=null){
		requestForFlagging(flag, emailIDs,0);
	}
}

function showFNInfo(img,msg){
	$('infomsgimg').src='img/theme/graphics/alerts/'+img+'.png';
	$('infomsgtxt').update(msg);
	$('infomsg').style.display='block';
}
