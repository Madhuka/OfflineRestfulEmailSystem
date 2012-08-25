// JavaScript Document
var resturl = "http://localhost/";
//var resturl = "http://192.248.15.237/";

//check JS is exsiting 
function testingJS2(){
	console.log('JS Local Readering JS is fine');
	}
	
//checking browser support
function supports_html5_storage(){
    if (typeof(localStorage) == 'undefined' ) 
    {	
	console.log('Your browser does not support HTML5 localStorage. Try upgrading.');
	alert('Your browser does not support HTML5 localStorage. Try upgrading.');	
    } else 
    {
	console.log('Your browser support HTML5 localStorage.');
	alert('Your browser support HTML5 localStorage.');	
    }
}

//clearing Storages in Local
function clearLocal(){
    localStorage.clear();
    console.log('Full Local is clear');
}

//saving compose email in offline out box
var fid=0;
function storeInLocal(form){
    if (typeof(localStorage) == 'undefined' ) {	
        alert('Your browser does not support HTML5 localStorage. Try upgrading.');
    } else {	
        try 
        {	

            if (typeof(localStorage.OfflineCompose) == 'undefined'){
                //alert ('offline is ON and created');
                fid=1;
                var offfolder = ["f"+fid];
                localStorage.setItem("OfflineCompose",JSON.stringify(offfolder)); 
            } else{
                //alert ('offline is there');
                var offfol = JSON.parse(localStorage.getItem("OfflineCompose"));
                var strInx =  offfol[offfol.length-1].substring(1);
                //alert ('str Index '+strInx);
                fid = parseInt (strInx);
                //alert ('fid is '+fid);
                fid++;
                offfol.push("f"+fid);
                localStorage.setItem("OfflineCompose", JSON.stringify(offfol));
            }
            saveMbody('f'+fid,form.messageBody);
            saveMIMEbodypart('f'+fid,form.mimesize,form.mimesize);
            saveMessageHeader('f'+fid,form.mfolder,form.mfrom,form.mto,form.mfrom,form.msub,'2011-4-29');
            //alert ('send to out box in offline');
            //localStorage.setItem("words", JSON.stringify(["Lorem", "Ipsum", "Dolor"]));
            //localStorage.setItem(form.name.value,form.messageBody.value); 
        } 
        catch (e) {	 	 	 	 
            alert('Quota exceeded!'+e); //data wasn't successfully saved due to quota exceed so throw an error		
        }

    }
}



//for testing method editing *
function edit(){
    var words = JSON.parse(localStorage.getItem("words"));
    words.push("hello");
    localStorage.setItem("words", JSON.stringify(words));
}



// no if folder return no
function NoOfFolder(){
    var folders = JSON.parse(localStorage.getItem("FolderList"));
                if(folders==null){
                                return null;
                }
    var countFolders = folders.length;
    return countFolders;
}
 
 
/*search methods */

//return emails id on folder as array
function searchByFolder(folderName){
	
//searchData(key,value)
var x = ListOfEmailIDs(folderName);
var sa = Array();
console.log('No of Msg'+x.length);
x.shift();
console.log('No of Msg'+x.length);
return x;
}

//return emails id on search by to on folder
function searchByFolderTo(folderName,keyword){
	
var x = ListOfEmailIDs(folderName);
var sa = Array();
console.log('No of Msg'+x.length);
x.shift();
console.log('No of Msg'+x.length);
//return x;
var resNO =0;
for (var i=0; i<x.length ; i++){
	console.log('Msg '+x[i]);
	var msg = giveMsgHeader(x[i]);
	if(msg.to == ''+keyword)
  {
	  console.log('msg.to'+msg.to);
   // return restaurants[i].restaurant.name;
	sa[resNO] = x[i];
		resNO++;
  }
		
		
	}
	return sa;
}

//return emails id on search by from on folder
function searchByFolderFrom(folderName,keyword){
	
var x = ListOfEmailIDs(folderName);
var sa = Array();
console.log('No of Msg'+x.length);
x.shift();
console.log('No of Msg'+x.length);
//return x;
var resNO =0;
for (var i=0; i<x.length ; i++){
	console.log('Msg '+x[i]);
	var msg = giveMsgHeader(x[i]);
	if(msg.from == ''+keyword)
  {
	  console.log('msg.to'+msg.to);
   // return restaurants[i].restaurant.name;
	sa[resNO] = x[i];
		resNO++;
  }
		
		
	}
	return sa;
}

//return emails id on search by from on folder
function searchByFolderSubject(folderName,keyword){
	
var x = ListOfEmailIDs(folderName);
var sa = Array();
console.log('No of Msg:'+x.length);
x.shift();
console.log('No of Msg:'+x.length);
//return x;
var resNO =0;
for (var i=0; i<x.length ; i++){
	console.log('Msg '+x[i]);
	var msg = giveMsgHeader(x[i]);
	console.log('ss'+msg.subject);
	if(msg.subject.toString().indexOf(keyword) > -1) 
  {
	  console.log('msg.to'+msg.subject);
   // return restaurants[i].restaurant.name;
	sa[resNO] = x[i];
		resNO++;
		//wsa[resNO] = x[i];
		//wresNO++;
  }
		
		
	}
	return sa;
}

//var wsa = Array();
//var wresNO =0;
	
function searchBySubject(keyword){
	//wsa.splice(0,wsa.length);
	// wresNO =0;
	var folder  = ListOfFolders();
for (var i=0; i<folder.length ; i++){
	searchByFolderSubject(folder[i],keyword);
	//sa[resNO] = x[i];
		//resNO++;
	}
}
//adding folders in offline
function addFolder(form){
    if (localStorage.FolderList == undefined){CreateFolderList();}
    var folders = JSON.parse(localStorage.getItem("FolderList"));
    folders.push(form.folderName);
    localStorage.setItem("FolderList", JSON.stringify(folders));
}


/*Data Funtions */
function insertData(key,value){
	localStorage.setItem(key, JSON.stringify(value));
	console.log(key+' is holding '+value);
	}
	
function updateData(key,value){
	if (localStorage.getItem(key) == undefined){
	console.log(key+' is undefined');
	}else{		
    var Valuex = JSON.parse(localStorage.getItem(key));	
    Valuex.push(''+value);	
    localStorage.setItem(key, JSON.stringify(Valuex));
	console.log(key+' is updated to '+value);
	}
}

function searchData(key,value){
	if (localStorage.getItem(key) == undefined){
	console.log(key+' is undefined');
	}else{		
    var Valuex = JSON.parse(localStorage.getItem(key));	
   // Valuex.push(''+value);	
  //  localStorage.setItem(key, JSON.stringify(Valuex));
	
	if(Valuex.toString().indexOf(value) > -1) {exists = true } else { exists = false };
 //   alert(exists);
	console.log(' is '+exists);
	}
}

function getObjects(objName, key, val) {
	if (localStorage.getItem(objName) == undefined){
	console.log(key+' is undefined');
	}else{		
    var obj = JSON.parse(localStorage.getItem(objName));	
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));
        } else if (i == key && obj[key] == val) {
            objects.push(obj);
        }
    }
    return objects;
}
}

/*Login Funtions*/

//return NoofUsers in local users
function getNoUserName(){
    var userL = JSON.parse(localStorage.getItem('UserList'));
	 if(userL==null){
  return 0;   
   }
   var userCount = userL.length;
    //alert ("Returuning "+userCount +" in Lcaol");
   return userCount;
}

//return last User Name in local
function getUserName(){
    var userL = JSON.parse(localStorage.getItem('UserList'));
	 if(userL==null){
     return null;
   }
   var userCount = userL.length;
   // alert ("Returuning "+userCount +" in Lcaol");
	var LuserName = userL[userCount-1];
	//alert ("Returuning "+LuserName +" in Lcaol");
   return LuserName;
    
}

//return last User's Password  in local
function getUserPassword(UserName){
   var userPassL = JSON.parse(localStorage.getItem(UserName));
   if(userPassL==null){
     return null;
   }
   var userCount = userPassL.length;
   // alert ("Returuning "+userCount +" in Lcaol");
 var LuserPass = userPassL[userCount-1];
 //alert ("Returuning Pass "+userPass +" in Lcaol");
   return LuserPass;
    
}
//return status of login sucess or fail in this funtion by loooking on server side
function LoginServerbyLocalData(){
    var userName = getUserName();
   var userPass = getUserPassword(userName);
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("POST",resturl+"dbmailn/index.php?username="+userName+"&password="+userPass,false);
	console.log('RESTurl called'+resturl+"dbmailn/index.php?username="+userName+"&password="+userPass);
    xmlhttp.send();
    xmlDoc=xmlhttp.responseXML; 

              
    var x=xmlDoc.getElementsByTagName("DBMAIL");
	var logineStatus = x[0].getElementsByTagName("Status")[0].childNodes[0].nodeValue;
	console.log('Server login status is '+logineStatus);
	if(logineStatus == 'Sucess')saveCurrentUser(userName);
	return logineStatus;
   
    
}

function AutoLoginServerbyLocalData(){
    var userName = getSavedCurrentUser();
   var userPass = getUserPassword(userName);
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("POST",resturl+"dbmailn/index.php?username="+userName+"&password="+userPass,false);
	console.log('RESTurl called'+resturl+"dbmailn/index.php?username="+userName+"&password="+userPass);
    xmlhttp.send();
    xmlDoc=xmlhttp.responseXML; 

              
    var x=xmlDoc.getElementsByTagName("DBMAIL");
	var logineStatus = x[0].getElementsByTagName("Status")[0].childNodes[0].nodeValue;
	console.log('Server login status is '+logineStatus);
	if(logineStatus == 'Sucess')saveCurrentUser(userName);
	return logineStatus;
   
    
}

//server login by online by passing values
function LoginServer(name,password){
	hashpass = calcMD5(password);
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("POST",resturl+"dbmailn/index.php?username="+name+"&password="+hashpass,false);
    xmlhttp.send();
    xmlDoc=xmlhttp.responseXML; 

              
    var x=xmlDoc.getElementsByTagName("DBMAIL");
	var logineStatus = x[0].getElementsByTagName("Status")[0].childNodes[0].nodeValue;
	console.log('Server login by online by passing value mode status is '+logineStatus);
	if(logineStatus == 'Sucess')saveCurrentUser(name);
	return logineStatus;
   
    
}
//local loging to local HTML5 data
function LoginLocal(inuserName,inlocalpassword){
  // var userName = getUserName();
   var userPass = getUserPassword(inuserName);  
   hashpass = calcMD5(inlocalpassword);
  if (hashpass == userPass )
  {	console.log ('Local login Sucess');
  saveCurrentUser(inuserName);
  return true;
  
  } 
	else {
		console.log ('Local login Fail');
		return false;
		}
   
    
}

//saved user name who is currently working in 
function saveCurrentUser(UserName){    
    localStorage.setItem("saveCurrentUser",UserName);
}

/*Give email Detaisl and Images*/
function ListOfFolders(){
    var folders = JSON.parse(localStorage.getItem(getSavedCurrentUser()+"FolderList"));
	//var folders = ["INBOX", "Draft", "Sent", "Outbox", "Trash"];
    return folders;
}

//return NoofMessages in folder
function NoOfMessages(str){
    var msgs = JSON.parse(localStorage.getItem(str));
    var countMsgs = 0;
                if(msgs!=null){
                                countMsgs =msgs.length;
                }
                if(countMsgs==0||!isServerFolder(str)){
                                return parseInt(countMsgs);
                }
    return parseInt(countMsgs)-1;
}

//list the email IDs in json objects
function ListOfEmailIDs(str){   
    var msgs = JSON.parse(localStorage.getItem(str));
    return msgs;
    
}

/*Give msg methos and show emails methos */
//return full email msg with 4 element array 
function ShowEamil(id){   
	var msgArray = new Array(); 
    msgArray[0] = giveMsgHeader(id);
	msgArray[1] = giveMsgMIMEs(id);
	msgArray[2] = giveMsgBody(id);
	msgArray[3]= giveMsgFlags(id);
    return msgArray;
    
}

//returning json of msgHeader
function giveMsgHeader(id){
		  
    if (localStorage.getItem('e'+id+'header') == undefined){
        return null;
    }else{
        var msgHeader = JSON.parse(localStorage.getItem('e'+id+'header'));
		return msgHeader;      
    }
              
}

//returning json of msgMIME
function giveMsgMIMEs(id){
		  
    if (localStorage.getItem('e'+id+'MIMEs') == undefined){
        return null;
    }else{
        var msgMIME = JSON.parse(localStorage.getItem('e'+id+'MIMEs'));
		return msgMIME;      
    }
              
}

//returning string in msgBody mime body
function giveMIMEBody(mimeid){
		  
    if (localStorage.getItem(mimeid) == undefined){
        return null;
    }else{
        var msgBody = JSON.parse(localStorage.getItem(mimeid));
		return msgBody;      
    }
              
}

//give email body with all mime contents
function giveMsgBody(id){
		  var mimeArray = new Array(); 
   var x = giveMsgMIMEs(id);
   //console.log(x[0]);
   for (var i=0; i<x.length;i++){
	   mimeArray[i] = giveMIMEBody(x[i])
	   }
	   return mimeArray;
              
}

//give email body with all mime contents
function giveMsgFlags(id){
		
		  
    if (localStorage.getItem('e'+id+'flag') == undefined){
        return null;
    }else{
        var msgMIME = JSON.parse(localStorage.getItem('e'+id+'flag'));
		return msgMIME;      
    }
              
              
}


//give email body with all mime contents
function giveImages(id){
   console.log('giveImages on '+id);
	 var mimeArray = new Array(); 
		var mimeArray  = giveMsgBody(id);
console.log('length'+mimeArray.length);

		  for (var i=0; i<mimeArray.length;i++){
	  console.log('Encode is ' +mimeArray[i].Encode +' and '+mimeArray[i].Type);
	  if (mimeArray[i].Encode == "base64" && mimeArray[i].Type == "image/jpeg")	  
	  {
		  console.log('is image');
		  showImages(mimeArray[i].Content);
		  }
	   }

              
              
}

//give email body with all mime contents
function givebaseImages(id){
   console.log('giveImages on '+id);
	 var mimeArray = new Array(); 
		var mimeArray  = giveMsgBody(id);
console.log('length'+mimeArray.length);

		  for (var i=0; i<mimeArray.length;i++){
	  console.log('Encode is ' +mimeArray[i].Encode +' and '+mimeArray[i].Type);
	  if (mimeArray[i].Encode == "base64" && mimeArray[i].Type == "image/jpeg")	  
	  {
		  console.log('is image');
		  return(mimeArray[i].Content);
		  }
	   }

              
              
}

//show the img in src
function showImages(src){
  // console.log('hooooo');
	 document.write('<img src="data:image/gif;base64,'+ src+'">');
}

//will return the Current User name in action (Login) and working on
function getSavedCurrentUser(){    
    var uName = localStorage.getItem("saveCurrentUser");
	return uName;
}

//list the emails hears eg: ListOfMessages('Inbox') will return all Inbox email header in Json object JS array
function ListOfMessages(str){  
    var msgs = JSON.parse(localStorage.getItem(str));  
                if(msgs!=null){
                   var msgHeaderArray = new Array();
                   var endd;
                   if(isServerFolder(str)){
                                   endd=1;
                   }else{
                                   endd=0;
                   }
                  
                                for (var i=msgs.length-1; i>=endd; i--){ 
                                                var msgsd = JSON.parse(localStorage.getItem('e'+msgs[i]+'header'));
                                                msgHeaderArray[i]=msgsd;  
                                }
                                return msgHeaderArray;
                }else{
                                return new Array();
                }
}

//check folder
function isServerFolder(folder){
                var sfl=ListOfFolders()
                for(var i=0;i<sfl.length;i++){
                                if(sfl[i].toUpperCase()==folder.toUpperCase()){
                                                return true;
                                }
                }
                return false;
}

//give
function GiveTampStampof(str){   
	
    var msgs = JSON.parse(localStorage.getItem(str));   
	
	if(msgs!=null){
		console.log(str+' time stamp is ' +msgs[0]);
		return msgs[0];
	}
	
	}

/*Saving Emails to Local Storage*/
// for offline Composing emails 

//adding folders in offline
function addFolder(form){
    if (localStorage.FolderList == undefined){CreateFolderList();}
    var folders = JSON.parse(localStorage.getItem("FolderList"));
    folders.push(form.folderName);
    localStorage.setItem("FolderList", JSON.stringify(folders));
}

function addFolderToFolderList(folder){
    if (localStorage.getItem(getSavedCurrentUser()+"FolderList") == null){console.log('Folder List is Not Create So do 1st Login First');}
    var folders = JSON.parse(localStorage.getItem(getSavedCurrentUser()+"FolderList"));
    folders.push(folder);
    localStorage.setItem(getSavedCurrentUser()+"FolderList", JSON.stringify(folders));
}

function saveMbody(id,mbody){
    if (typeof(localStorage) == 'undefined' ) {        
        alert('Your browser does not support HTML5 localStorage. Try upgrading.');
    } else 
    {      
        try 
        {  localStorage.setItem("e"+id+"body",mbody);
        } 
        catch (e) 
        {  if (e == QUOTA_EXCEEDED_ERR) {alert('Quota exceeded!'); } }
    }
	}
	
//saved email mail flags
function saveMsgFlags(emailID,seen,mdelete,flagged,recent){
	   var flagArry = {"seen":""+seen,"mdelete":""+mdelete,"flagged":""+flagged,"recent":""+recent};
    localStorage.setItem("e"+emailID+"flag",JSON.stringify(flagArry));
			 
}
		  
function saveMIMEbodypart(id,mimeparts,mimesize){
    var MIMeArry = {"mimeparts":""+mimeparts,"mimesize":""+mimesize};
    localStorage.setItem("e"+id+"MIMEparts",JSON.stringify(MIMeArry));
}

//save msg header
function saveMessageHeader(id,folder,from,to,repltto,subject,createdat){
    var headrtArry = {"id":""+id,"folder":""+folder,"from":""+from,"to":""+to,"repltto":""+repltto,"subject":""+subject,"date":""+createdat};
    localStorage.setItem("e"+id+"header",JSON.stringify(headrtArry));
    // updateFolder(id,folder);
}

//save msg header withd dtails
function saveMessage(id,folder,from,to,repltto,subject,createdat){
    var headrtArry = {"id":""+id,"folder":""+folder,"from":""+from,"to":""+to,"repltto":""+repltto,"subject":""+subject,"createdat":""+createdat};
    localStorage.setItem("e"+id+"header",JSON.stringify(headrtArry));
    // updateFolder(id,folder);
					
}


/*Deleting and moving Funtions*/
//delet msg
function deletMsg(a){
	console.log('delet msg id '+a);
    var m = JSON.parse(localStorage.getItem('e'+a+'header'));
    var msg = JSON.parse(localStorage.getItem(m.folder));
	console.log(m.id +' is in '+m.folder);
    saveMessage(m.id,'Trash',m.from,m.to,m.repltto,m.subject,m.createdat);	
	if(localStorage.getItem('Trash')==undefined){
		localStorage.setItem('Trash',JSON.stringify([""+ m.id+"",]));
	}else{
		var folderls = JSON.parse(localStorage.getItem('Trash'));
		folderls.push(m.id);
		localStorage.setItem('Trash', JSON.stringify(folderls));  
	}

    var x = a;
 
    for (var i=0; i<msg.length ; i++){
        if (x==msg[i]){

            //alert("Message moved to ");
            msg.splice(i,1);
            localStorage.setItem(m.folder, JSON.stringify(msg));
        }}
    
 
}

//move msg to folders (tofolder is some thing to be in user)
function moveMsg(a,toFolder){
	
	console.log('move msg id '+a);
    var m = JSON.parse(localStorage.getItem('e'+a+'header'));
    var msg = JSON.parse(localStorage.getItem(m.folder));
	console.log(m.id +' is in '+m.folder);
    saveMessage(m.id,toFolder,m.from,m.to,m.repltto,m.subject,m.createdat);	
	if(localStorage.getItem(toFolder)==undefined){
		localStorage.setItem(toFolder,JSON.stringify([""+ m.id+"",]));
	}else{
		var folderls = JSON.parse(localStorage.getItem(toFolder));
		folderls.push(m.id);
		localStorage.setItem(toFolder, JSON.stringify(folderls));  
	}

    var x = a;
 
    for (var i=0; i<msg.length ; i++){
        if (x==msg[i]){

            //alert("Message moved to ");
            msg.splice(i,1);
            localStorage.setItem(m.folder, JSON.stringify(msg));
        }}
    
 
}

//move all Emails in Foler to trash (Call this when folder is deleted by  a user)
function moveFolderToTrash(fromFolder){
	var msgArray = new Array(); 
	if (isServerFolder(fromFolder)) {
	msgArray = ListOfEmailIDs(fromFolder);
	console.log('Length'+msgArray.length);
	for (var i=1; i<msgArray.length;i++){
		
		deletMsg(msgArray[i]);
		console.log('ID'+msgArray[i]+' is move to trash Folder');
		}
	}else{
		console.log(fromFolder+' is not there');
		}
}

//move all email in folder to new folder
function moveFolder(fromFolder,toFolder){
	var msgArray = new Array(); 
	if (isServerFolder(fromFolder)) {
	msgArray = ListOfEmailIDs(fromFolder);
	console.log('Length'+msgArray.length);
	for (var i=1; i<msgArray.length;i++){
		
		moveMsg(msgArray[i],toFolder);
		console.log('ID'+msgArray[i]+' is move to trash Folder');
		}
	}else{
		console.log(fromFolder+' is not there');
		}
}

//perment delets is to TrashOut (this must only avaliable at trach in UI)
function PermantDeletMsg(a){
moveMsg(a,'TrashOut');
console.log('Msg id '+a +' is Permantly Deleted');
}

//deleting folder funtion and for FolderList
function deleteFolderLocal(folderName){
    var folders = JSON.parse(localStorage.getItem(getSavedCurrentUser()+"FolderList"));
    for (var i=0; i<folders.length ; i++){
        if (folderName==folders[i]){
            folders.splice(i,1);
            localStorage.setItem(getSavedCurrentUser()+"FolderList", JSON.stringify(folders));
        }
    }
}



/*Flag methods and updated in flag */

//update flags in seen
function markAsSeen(id){
	updateMsgFlags(id,'seen','1');
	if(isOnline()){
		StatusEvent('Seen',id,0);
	}else{
		StatusEvent('Seen',id,1);
	}
}

//update flags in seen
function markAsUnseen(id){
	updateMsgFlags(id,'seen','0');
	if(isOnline()){
		StatusEvent('Unseen',id,0);
	}else{
		StatusEvent('Unseen',id,1);
	}
}

//update flags in delet
function markAsDelet(id){
	updateMsgFlags(id,'mdelete','1');
	if(isOnline()){
		StatusEvent('Delete',id,0);
	}else{
		StatusEvent('Delete',id,1);
	}
}

//update flags in delet
function markAsUndelet(id){
	updateMsgFlags(id,'mdelete','0');
	if(isOnline()){
		StatusEvent('Undelete',id,0);
	}else{
		StatusEvent('Undelete',id,1);
	}
}

//update the Flags
function updateMsgFlags(id,flagName,flagValue){
		if (flagValue>1 || flagValue<0){
			console.log('Enter flagValue is '+flagValue+'. FlagValue must to be 1 or 0');
			return 'flagValue must to be 1 or 0'; 
			}
		  
    if (localStorage.getItem('e'+id+'flag') == undefined){
        return ('NULL');
    }else{
        var msgFlag = JSON.parse(localStorage.getItem('e'+id+'flag'));
	//	console.log('OLD flag name'+ flagName+' to '+flagValue);
		var seen = msgFlag.seen;
		var mdelete = msgFlag.mdelete;
		var flagged = msgFlag.flagged;
		var recent = msgFlag.recent;
		//"{"seen":"1","mdelete":"1","flagged":"0","recent":"0"}"
		if (flagName == 'seen') {var seen = flagValue;}
		if (flagName == 'mdelete') {var mdelete = flagValue;}
		if (flagName == 'flagged') {var flagged = flagValue;}
		if (flagName == 'recent') {var recent = flagValue;}
		
		
		
		saveMsgFlags(id,seen,mdelete,flagged,recent);
		console.log(id+'flag name'+ flagName+' updated to '+flagValue);
		//return 'updated';      
    }
              
              
}

/*function MarkAsSeen(emailID){
   
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("POST","http://localhost/dbmail/actions/Seen/"+emailID,false);
    xmlhttp.send();
    xmlDoc=xmlhttp.responseXML; 

              
    var x=xmlDoc.getElementsByTagName("DBMAIL");
	var mStatus = x[0].getElementsByTagName("Status")[0].childNodes[0].nodeValue;
	//alert ('Login '+x.length);
	//alert ('Status of Mark As Seen'+mStatus);
	return mStatus;
    
}

function MarkAsUnseen(emailID){
   
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("POST","http://localhost/dbmail/actions/Unseen/"+emailID,false);
    xmlhttp.send();
    xmlDoc=xmlhttp.responseXML; 

              
    var x=xmlDoc.getElementsByTagName("DBMAIL");
	var mStatus = x[0].getElementsByTagName("Status")[0].childNodes[0].nodeValue;
	//alert ('Login '+x.length);
	alert ('Status of Mark As Seen'+mStatus);
	return mStatus;
	
   
    
}*/


//End of offline composing 

/*
mainly for md5 code is belows
*/
//MD5

var calcMD5 = function (string) {

   function RotateLeft(lValue, iShiftBits) {
           return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
   }

   function AddUnsigned(lX,lY) {
           var lX4,lY4,lX8,lY8,lResult;
           lX8 = (lX & 0x80000000);
           lY8 = (lY & 0x80000000);
           lX4 = (lX & 0x40000000);
           lY4 = (lY & 0x40000000);
           lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
           if (lX4 & lY4) {
                   return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
           }
           if (lX4 | lY4) {
                   if (lResult & 0x40000000) {
                           return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                   } else {
                           return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
                   }
           } else {
                   return (lResult ^ lX8 ^ lY8);
           }
   }

   function F(x,y,z) { return (x & y) | ((~x) & z); }
   function G(x,y,z) { return (x & z) | (y & (~z)); }
   function H(x,y,z) { return (x ^ y ^ z); }
   function I(x,y,z) { return (y ^ (x | (~z))); }

   function FF(a,b,c,d,x,s,ac) {
           a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
           return AddUnsigned(RotateLeft(a, s), b);
   };

   function GG(a,b,c,d,x,s,ac) {
           a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
           return AddUnsigned(RotateLeft(a, s), b);
   };

   function HH(a,b,c,d,x,s,ac) {
           a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
           return AddUnsigned(RotateLeft(a, s), b);
   };

   function II(a,b,c,d,x,s,ac) {
           a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
           return AddUnsigned(RotateLeft(a, s), b);
   };

   function ConvertToWordArray(string) {
           var lWordCount;
           var lMessageLength = string.length;
           var lNumberOfWords_temp1=lMessageLength + 8;
           var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
           var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
           var lWordArray=Array(lNumberOfWords-1);
           var lBytePosition = 0;
           var lByteCount = 0;
           while ( lByteCount < lMessageLength ) {
                   lWordCount = (lByteCount-(lByteCount % 4))/4;
                   lBytePosition = (lByteCount % 4)*8;
                   lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
                   lByteCount++;
           }
           lWordCount = (lByteCount-(lByteCount % 4))/4;
           lBytePosition = (lByteCount % 4)*8;
           lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
           lWordArray[lNumberOfWords-2] = lMessageLength<<3;
           lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
           return lWordArray;
   };

   function WordToHex(lValue) {
           var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
           for (lCount = 0;lCount<=3;lCount++) {
                   lByte = (lValue>>>(lCount*8)) & 255;
                   WordToHexValue_temp = "0" + lByte.toString(16);
                   WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
           }
           return WordToHexValue;
   };

   function Utf8Encode(string) {
           string = string.replace(/\r\n/g,"\n");
           var utftext = "";

           for (var n = 0; n < string.length; n++) {

                   var c = string.charCodeAt(n);

                   if (c < 128) {
                           utftext += String.fromCharCode(c);
                   }
                   else if((c > 127) && (c < 2048)) {
                           utftext += String.fromCharCode((c >> 6) | 192);
                           utftext += String.fromCharCode((c & 63) | 128);
                   }
                   else {
                           utftext += String.fromCharCode((c >> 12) | 224);
                           utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                           utftext += String.fromCharCode((c & 63) | 128);
                   }

           }

           return utftext;
   };

   var x=Array();
   var k,AA,BB,CC,DD,a,b,c,d;
   var S11=7, S12=12, S13=17, S14=22;
   var S21=5, S22=9 , S23=14, S24=20;
   var S31=4, S32=11, S33=16, S34=23;
   var S41=6, S42=10, S43=15, S44=21;

   string = Utf8Encode(string);

   x = ConvertToWordArray(string);

   a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;

   for (k=0;k<x.length;k+=16) {
           AA=a; BB=b; CC=c; DD=d;
           a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
           d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
           c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
           b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
           a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
           d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
           c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
           b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
           a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
           d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
           c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
           b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
           a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
           d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
           c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
           b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
           a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
           d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
           c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
           b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
           a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
           d=GG(d,a,b,c,x[k+10],S22,0x2441453);
           c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
           b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
           a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
           d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
           c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
           b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
           a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
           d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
           c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
           b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
           a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
           d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
           c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
           b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
           a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
           d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
           c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
           b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
           a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
           d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
           c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
           b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
           a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
           d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
           c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
           b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
           a=II(a,b,c,d,x[k+0], S41,0xF4292244);
           d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
           c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
           b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
           a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
           d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
           c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
           b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
           a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
           d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
           c=II(c,d,a,b,x[k+6], S43,0xA3014314);
           b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
           a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
           d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
           c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
           b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
           a=AddUnsigned(a,AA);
           b=AddUnsigned(b,BB);
           c=AddUnsigned(c,CC);
           d=AddUnsigned(d,DD);
                }

        var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);
		//alert(temp.toLowerCase())
        return temp.toLowerCase();
}
	