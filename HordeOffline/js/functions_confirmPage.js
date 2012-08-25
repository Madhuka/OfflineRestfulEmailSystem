var confrmMsgs={"delete_folder_confirm_msg":'You are attempting to delete the following folder(s).<br>If you continue, all messages in the folder(s) will be moved to Trash folder!', "folders_empty_mailbox_confirm_msg":'You are attempting to delete all messages contained in the following folder(s).<br>If you continue, all messages in the folder(s) will be moved to Trash folder!'};

//utility function to get values passed in url
function getQueryParameters() {
  var query = localStorage.getItem('confirmpage');
  localStorage.setItem('confirmpage','');
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

//for loading dynamic ui parts
function loadDynamicInfoConfirmpage(){
	var inparam=getQueryParameters();
	var selfolders=inparam['folders'].split(",");
	var selaction=inparam['action'];
	
	if(selaction=="delete_folder_confirm"){
		setUIMessages(confrmMsgs.delete_folder_confirm_msg,selfolders,"Delete Selected Folders",'delete' );
	}
	else if(selaction=="folders_empty_mailbox_confirm"){
		setUIMessages(confrmMsgs.folders_empty_mailbox_confirm_msg,selfolders,"Empty Selected Folders",'empty' );
	}
	else if(selaction=="mbox_size"){
		//show size of selected folders
	}
}

//utility for setting ui
function setUIMessages(msg, folders, btn, actn){
	$('mainmsg').update(msg);
	$('folderlst').update();
	for(var i=0; i<folders.length ; i++){
		var f=folders[i].toLowerCase();
		var h="";
		if((f=="inbox"||f=="sent"||f=="draft"||f=="outbox"||f=="trash")&&actn=='delete'){	
			 h="<div class=\"item"+(i%2)+"\">&nbsp;<label><input type=\"checkbox\" class=\"checkbox\"  value=\""+folders[i]+"\" disabled=\"true\"> "+folders[i]+"</label></div> ";
		}else{
			 h="<div class=\"item"+(i%2)+"\">&nbsp;<label><input type=\"checkbox\" class=\"checkbox\" name=\"folder_list[]\" value=\""+folders[i]+"\" checked=\"checked\"> "+folders[i]+"</label></div> ";
		}
		$('folderlst').insert(h);
	}
	$('actionbtn').value=btn;
	
	if(navigator.userAgent.indexOf("Gecko")>-1) { 
    	$('actionbtn').setAttribute("onclick","performFolderAction('"+actn+"')");  
	}
	else{
    	$('actionbtn').onclick = performFolderAction(actn);  
	}
}

function performFolderAction(actn){
	//alert(actn);
	if(!getConfChecked().size()){
			imp_info("Please select at least one folder before you perform this action.",1);
			return;
	}
	else{
		//try{
			/*getConfFolders().each(function(e){
				if(e.checked){
					var f=e.value.toLowerCase();
					if(actn=='delete'){
						if(!(f=="inbox"||f=="sent"||f=="draft"||f=="outbox"||f=="trash")){
							moveFolderToTrash(e.value);
							if(isOnline()){
								deleteFolderLocal(e.value);
								DeletFolderEvent(e.value,0);
							}else{
								deleteFolderLocal(e.value);
								DeletFolderEvent(e.value,1);
							}
						}
					}else if(actn=='empty'){
						moveFolderToTrash(e.value);
					}
				}
			});*/
			var e=getConfFolders();
			for(var i=0;i<e.length;i++){
				if(e[i].checked){
					var f=e[i].value.toLowerCase();
					if(actn=='delete'){
						if(!(f=="inbox"||f=="sent"||f=="draft"||f=="outbox"||f=="trash")){
							moveFolderToTrash(e[i].value);
							if(isOnline()){
								deleteFolderLocal(e[i].value);
								DeletFolderEvent(e[i].value,0);
							}else{
								deleteFolderLocal(e[i].value);
								DeletFolderEvent(e[i].value,1);
							}
						}
					}else if(actn=='empty'){
						moveFolderToTrash(e[i].value);
					}
				}
			}
			if(actn=='delete'){
				localStorage.setItem('infomsg','folder_delete_success');
			}else if(actn=='empty'){
				localStorage.setItem('infomsg','folder_empty_success');
			}
		/*}catch(e){
			if(actn=='delete'){
				localStorage.setItem('infomsg','folder_delete_fail');
			}else if(actn=='empty'){
				localStorage.setItem('infomsg','folder_empty_fail');
			}
		}*/
	}
	
	self.location.href='folders.html';
}

function getConfChecked(){
    return getConfFolders().findAll(function(a){
        return a.checked
        });
}

function getConfFolders(){
    var r=$("fmanager").getInputs(null,"folder_list[]");
	return r;
}