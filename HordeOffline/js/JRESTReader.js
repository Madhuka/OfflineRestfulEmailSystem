//var resturl = "http://localhost/";
var resturl = "http://192.248.15.237/"

// JavaScript Document
function testJS() {  
    Console.log('JRESTreader js file is external script working well'); 
}

//methods for FolderList Constructors
//this will read folderlist.xml	and build FolderList	  
function readFolders(){
	try{
	console.log(resturl+"dbmailn/accinfo/"+getSavedCurrentUser()+"/FolderList is reading for Folder List");
		if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
  //  xmlhttp.open("POST","http://localhost:8081/dbmail/accinfo/madhuka/FolderList",false);
  xmlhttp.open("POST",resturl+"dbmailn/accinfo/"+getSavedCurrentUser()+"/FolderList",false);
    xmlhttp.send();
    xmlDoc=xmlhttp.responseXML;
	var cUserName = getSavedCurrentUser();
	 var x=xmlDoc.getElementsByTagName("folder");
	 console.log('Numbers of Folders is '+x.length);
	if (countFolderList() != x.length){
	//console.log('Length is gooo');
   for (var i=0; i<x.length;i++){  
        var folder = x[i].childNodes[0].nodeValue;
		console.log('"'+folder+'" is Folder of '+getSavedCurrentUser()+' in REST FolderList');
		if(searchDatax(cUserName+"FolderList",folder)==false || searchDatax(cUserName+"FolderList",folder)== 'undefined'){
			
        saveFolderList(cUserName,folder);}
		}
	}//if only not equal
	}catch(e){
		console.log("ERROR --> "+e);
	}
}

//this will save list for folder list to localstorage	  
function saveFolderList(userName,folder){
    if (localStorage.getItem(userName+"FolderList") == undefined){
				  
        localStorage.setItem(userName+"FolderList", JSON.stringify([""+folder+"",]));
    }else{
        var folders = JSON.parse(localStorage.getItem(userName+"FolderList"));
        folders.push(folder);
        localStorage.setItem(userName+"FolderList", JSON.stringify(folders));				   
    }
} 
	
//loading email header
function loadEmails(emailID,mfolder){
	try{
             console.log(emailID+'Loading Emails');
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
	//http://localhost:8081/dbmailn/home/mithila/GetHeader/1
    xmlhttp.open("POST",resturl+"dbmailn/home/"+getSavedCurrentUser()+"/GetHeader/"+emailID,false);
    xmlhttp.send();
    xmlDoc=xmlhttp.responseXML; 
             
    var x=xmlDoc.getElementsByTagName("Mailheader");
	  console.log(x+'Mailheader');
    for (var i=0; i<x.length;i++){
        var id = x[i].getElementsByTagName("mailid")[0].childNodes[0].nodeValue;
        var folder = mfolder;
		//x[i].getElementsByTagName("folder")[0].childNodes[0].nodeValue;
        var body = x[i].getElementsByTagName("content_type")[0].childNodes[0].nodeValue;
        var from = x[i].getElementsByTagName("from_addr")[0].childNodes[0].nodeValue;
        var to = x[i].getElementsByTagName("to_addr")[0].childNodes[0].nodeValue;
        var mimebodyparts = x[i].getElementsByTagName("content_type")[0].childNodes[0].nodeValue;
        var mimesize = x[i].getElementsByTagName("size")[0].childNodes[0].nodeValue;
        var replyto = x[i].getElementsByTagName("from_addr")[0].childNodes[0].nodeValue;
        var subject = x[i].getElementsByTagName("subject")[0].childNodes[0].nodeValue;	
        var createdat = x[i].getElementsByTagName("date")[0].childNodes[0].nodeValue;
        saveLocalSotrage(id,folder,from,to,replyto,subject,createdat); 
     
		
    }
	}catch(e){
		console.log("ERROR --> "+e);
	}
                
}

//loading emails MIMEs
function loadEmailsMIME(emailID){
	try{
             console.log(emailID+' is Loading Emails MIME');
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
	//http://localhost:8081/dbmailn/home/mithila/MIMEstat/1
    xmlhttp.open("POST",resturl+"dbmailn/home/"+getSavedCurrentUser()+"/MIMEstat/"+emailID,false);
    xmlhttp.send();
    xmlDoc=xmlhttp.responseXML; 
             
    var x=xmlDoc.getElementsByTagName("MIME");
	//saveMIMEbodypart('1',x);
	  //console.log(x+'MIME');
    for (var i=0; i<x.length;i++){
		var mime = x[i].childNodes[0].nodeValue;
        //console.log(mime+'xMIME :: '+emailID);		
		saveMIMEbodyparts(emailID,mime); 
		loadEmailMIMEBody(mime);
		//console.log(mime+'xxMIME :: '+emailID);	
    }
	}catch(e){
		console.log("ERROR --> "+e);
	}
   
              
}

//loading emails flags
function loadEmailsFlags(emailID){
	try{
             console.log(emailID+' is Loading Emails Flags');
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
	//http://localhost:8081/dbmailn/home/mithila/Status/5
    xmlhttp.open("POST",resturl+"dbmailn/home/"+getSavedCurrentUser()+"/Status/"+emailID,false);
    xmlhttp.send();
    xmlDoc=xmlhttp.responseXML; 
             
    var x=xmlDoc.getElementsByTagName("AllMails");
	//saveMIMEbodypart('1',x);
	  //console.log(x+'MIME');
     var seen = x[0].getElementsByTagName("seen")[0].childNodes[0].nodeValue;
        var mdelete = x[0].getElementsByTagName("delete")[0].childNodes[0].nodeValue;
        var flagged = x[0].getElementsByTagName("flagged")[0].childNodes[0].nodeValue;
        var recent = x[0].getElementsByTagName("recent")[0].childNodes[0].nodeValue;
       saveMsgFlags(emailID,seen,mdelete,flagged,recent);
    }catch(e){
		console.log("ERROR --> "+e);
	}
   
              
}

//loading emails MIME bodies
function loadEmailMIMEBody(mimeid){
	try{
    console.log(mimeid+' is Loading Emails MIME Boady');
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
	//http://localhost:8081/dbmailn/home/mithila/MIME/jhuwqae2ae4ajdjw5jaj9oip09i833
    xmlhttp.open("POST",resturl+"dbmailn/home/"+getSavedCurrentUser()+"/MIME/"+mimeid,false);
    xmlhttp.send();
    xmlDoc=xmlhttp.responseXML; 
             
    var x=xmlDoc.getElementsByTagName("MIMEContent");
	
        var Content = x[0].getElementsByTagName("Content")[0].childNodes[0].nodeValue;
        var type = x[0].getElementsByTagName("MIMEtype")[0].childNodes[0].nodeValue;
        var Encode = x[0].getElementsByTagName("Encode")[0].childNodes[0].nodeValue;
        var Length = x[0].getElementsByTagName("Length")[0].childNodes[0].nodeValue;
        var Size = x[0].getElementsByTagName("Size")[0].childNodes[0].nodeValue;
       
        saveMIMEbody(mimeid,Content,type,Encode,Length,Size); 	
    }catch(e){
		console.log("ERROR --> "+e);
	}
}

function UpdateFolders(username){
	var x = JSON.parse(localStorage.getItem(username+'FolderList'));
	for (var i=0;i<x.length;i++){
		console.log('updating '+x[i]);
	updateFolder(x[i]);
	}
	}
//Login methods 
	
//this will save list for users to localstorage	  
function saveUserList(userName){
    if (localStorage.UserList == undefined){
				  
        localStorage.setItem("UserList", JSON.stringify([""+userName+""]));
    }else{
		var exisitingUser = searchData('UserList',userName)
		if (exisitingUser){
			console.log('User '+userName+' is exisiting');
		}else{
        var userss = JSON.parse(localStorage.getItem("UserList"));
        userss.push(userName);
        localStorage.setItem("UserList", JSON.stringify(userss));
		console.log('User '+userName+' added to user List');
		}
        //localStorage.setItem("FolderList", JSON.stringify(folder));
				   
    } 
                
} 

// will save user list and its passowrd in hash
function saveUserPassword(userName,serverpassword){
	
    if (localStorage.getItem(userName) == undefined){		
		saveUserList(userName);
		hashpass = calcMD5(serverpassword);
		//localhashpass = calcMD5(localpassword);
        localStorage.setItem(userName, JSON.stringify([""+hashpass+""]));
		//localStorage.setItem(userName+'local', JSON.stringify([""+localhashpass+"",]));
		console.log('User name and password is saved');
    }else{
console.log('User Name exsiting');				   
    } 
                
} 

//will return the Current User name in action (Login) and working on
function getSavedCurrentUser(){    
    var uName = localStorage.getItem("saveCurrentUser");
	return uName;
}

 
 //this will read folder and build  each Folders	
 
 //this will save list for folder list to localstorage	  
function loadFolders(userName){
    if (localStorage.getItem(userName+"FolderList") == undefined){
				  
        console.log(userName+'\'s FolderList is not exisiting')
    }else{
        var xfolder = JSON.parse(localStorage.getItem(userName+"FolderList"));
        //console.log('x: '+xfolder.length);
		for (var i=0; i<xfolder.length;i++){  
      console.log('loading Folder '+xfolder[i]);
		readFolder(xfolder[i]);
		//localStorage.setItem(xfolder[i],'[]');
		}
		
    }
} 


function readFolder(folderName){
	try{
	console.log('Request to Read "'+folderName+'"');
		if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
  //  http://localhost:8081/dbmailn/home/mithila/Select/ACADEMICS
  xmlhttp.open("POST",resturl+"dbmailn/home/"+getSavedCurrentUser()+"/Select/"+folderName,false);
  console.log('Reading by '+resturl+"dbmailn/home/"+getSavedCurrentUser()+"/Select/"+folderName);
    xmlhttp.send();
    xmlDoc=xmlhttp.responseXML;
	  
	 var x=xmlDoc.getElementsByTagName("MailID");
	 console.log('Numbers of mails is '+x.length);
	 var t=xmlDoc.getElementsByTagName("TimeStamp");
	 if (t[0].childNodes[0] != undefined) {
		 console.log('time stamp is '+t[0].childNodes[0].nodeValue);
		 if(!searchDataIntegerx(folderName,t[0].childNodes[0].nodeValue)||searchDataIntegerx(folderName,t[0].childNodes[0].nodeValue)=="undefined"){
		 saveFolders(folderName,t[0].childNodes[0].nodeValue);}
		//setTimeStamp(folderName,t[0].childNodes[0].nodeValue);
		 }else {
			 console.log('time stamp is undefined');
		if(timeStamp(folderName)!='undefined'){
	saveFolders(folderName,'undefined');
 }
			 }
	// console.log('ts object is '+t[0].childNodes[0]);
	
	
	//console.log('Numbers of Emails in '+folderName+' is '+x.length-1);
   for (var i=0; i<x.length;i++){  
        var emailid = x[i].childNodes[0].nodeValue;
		
		//console.log('searchDataInteger('+folderName+','+emailid+') =>'+searchDataIntegerx(folderName,emailid));
		if(!searchDataIntegerx(folderName,emailid)){
		//console.log('xxx:::::::::'+emailid+folderName);
        saveFolders(folderName,emailid);
		loadEmails(emailid,folderName);
		loadEmailsMIME(emailid);
		loadEmailsFlags(emailid);
		console.log( 'Loaded Headers, MIMEs, Flags on emailid "' +emailid+'" ');
		}
		
		}
		}catch(e){
		console.log("ERROR --> "+e);
	}
	
	}//if only not equal


//this will save list for folder list to localstorage	  
function saveFolders(folder,emailid){
	console.log('Save email id "'+emailid+'" for '+folder);
    if (localStorage.getItem(folder) == undefined){				  
        localStorage.setItem(folder, JSON.stringify([""+emailid+"",]));
    }else{
        var emailids = JSON.parse(localStorage.getItem(folder));
        emailids.push(emailid);
        localStorage.setItem(folder, JSON.stringify(emailids));	   
    }
}	               


//Return no Folders in User  
function countFolderList(){
    if (localStorage.FolderList == undefined){
				  //alert ('nooo found');
        return 0;
    }else{
        var folders = JSON.parse(localStorage.getItem("FolderList"));
		//alert ('Count '+folders.length);
		console.log('Count '+folders.length);
        return parseInt(folders.length);

        //localStorage.setItem("FolderList", JSON.stringify(folder));
				   
    } 
                
} 

//retruning last item of the folder
function lastMsgIn(folder){
		  
    if (localStorage.getItem(folder) == undefined){
        return 'Null';
       // localStorage.setItem(folder, JSON.stringify([""+id+"",])); 
    }else{
        // document.write(folder+' is defined ' ); 
        var folderls = JSON.parse(localStorage.getItem(folder));
		var lf = folderls.length;
        var lastmsgid = folderls[lf-1];
		//alert ('ll'+lastmsgid);
		return lastmsgid;
    }
              
} 

/*Time Stamp Methods*/
//retruning last item of the folder
function timeStamp(folder){
		  
    if (localStorage.getItem(folder) == undefined){
        return 'Null';
       // localStorage.setItem(folder, JSON.stringify([""+id+"",])); 
    }else{
        // document.write(folder+' is defined ' ); 
        var folderls = JSON.parse(localStorage.getItem(folder));
		//var lf = folderls.length;
        var timeStamp = folderls[0];
		//alert ('ll'+lastmsgid);
		return timeStamp;
    }
              
} 

//retruning time stamp (Still Developing)
function setTimeStamp(folder,newtimeStamp){
	
		  console.log('setTimeStamp('+folder+','+newtimeStamp+')');
    if (localStorage.getItem(folder) == undefined){
        return 'Null';
       // localStorage.setItem(folder, JSON.stringify([""+id+"",])); 
    }else{
		// document.write(folder+' is defined ' ); 
        var folderls = JSON.parse(localStorage.getItem(folder));
		//var lf = folderls.length;
        var timeStamp = folderls[0];
		//var ArrayName = Array();
		for(var i=0; i<folderls.length;i++ )
  {  
  if(folderls[i]==timeStamp)
  folderls.splice(i,1,""+newtimeStamp+"");  
  }  
		//alert ('ll'+lastmsgid);
		localStorage.setItem(folder, JSON.stringify(folderls)); 
		
    }
              
} 

/*Updating Folders*/

//update folder list
function updateFolder(folder){
		  
    var ts = timeStamp(folder);
	console.log('updateFolder in '+folder + 'old time stamp'+ts);
	//http://localhost:8081/dbmailn/sync/FromINBOX/13081548610915
	readFolderforUpdate(folder,ts);
              
}

//reading rest for checking update if so added to folder
function readFolderforUpdate(folderName,timeStamp){
	try{
	console.log('Updating Foldes Folder reading called on timeStamp'+timeStamp);
		if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari 
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
	//http://localhost:8081/dbmailn/sync/FromINBOX/13081548610915
  xmlhttp.open("POST",resturl+"dbmailn/sync/From"+folderName+"/"+timeStamp,false);
  console.log('Calling for Update  in "'+folderName+'" '+resturl+"dbmailn/sync/From"+folderName+"/"+timeStamp);
    xmlhttp.send();
    xmlDoc=xmlhttp.responseXML;
	  try{
	 var x=xmlDoc.getElementsByTagName("MailID");
	  }catch(err){
		  console.log('NO updates on '+folderName+' with time stamp of '+timeStamp+' url is '+resturl+"dbmailn/sync/From"+folderName+"/"+timeStamp);
		  return;
		  }
	 console.log('Numers of new emails update'+x.length);
	// var t=xmlDoc.getElementsByTagName("TimeStamp");
	// if (t[0].childNodes[0] != undefined) {
	//	 console.log('ts object is '+t[0].childNodes[0].nodeValue);
		// saveFolders(folderName,t[0].childNodes[0].nodeValue);
		// }
	// console.log('ts object is '+t[0].childNodes[0]);
	
	if (x.length == 0) {console.log('No Updates are in server yet');}
	
   for (var i=0; i<x.length;i++){  
        var emailid = x[i].childNodes[0].nodeValue;
		console.log( folderName+' have emailid ' +emailid);
        saveFolders(folderName,emailid);
		loadEmails(emailid,folderName);
		loadEmailsMIME(emailid);
		}
		
	}catch(e){
		console.log("ERROR --> "+e);
	}
	}//if only not equal


/*Saving Email*/	
//saved email Body	
function saveMIMEbody(mimeid,Content,type,Encode,Length,Size){
    var mimeBodyArray = {"Content":""+Content,"Type":""+type,"Encode":""+Encode,"Length":""+Length,"Size":""+Size};
	    localStorage.setItem(mimeid,JSON.stringify(mimeBodyArray));		   
}


//saved email mail Boady mimes	
function saveMIMEbodyparts(eid,mime){
	console.log(mime+'saveMIMEbodypart ::'+eid);
	updateDatax('e'+eid+'MIMEs',mime);
			 
}

//saved email mail flags
function saveMsgFlags(emailID,seen,mdelete,flagged,recent){
	   var flagArry = {"seen":""+seen,"mdelete":""+mdelete,"flagged":""+flagged,"recent":""+recent};
    localStorage.setItem("e"+emailID+"flag",JSON.stringify(flagArry));
			 
}

//saved the mail header
function saveLocalSotrage(id,folder,from,to,repltto,subject,createdat){
    var headrtArry = {"id":""+id,"folder":""+folder,"from":""+from,"to":""+to,"repltto":""+repltto,"subject":""+subject,"createdat":""+createdat};
    localStorage.setItem("e"+id+"header",JSON.stringify(headrtArry));
    // updateFolder(id,folder);
					
}
			
//clear the full storage			
function clearDB(){
    localStorage.clear();
    console.log('Full cleared local storage');
}			  


	
function nop(){
	 console.log('NOP method ');
	if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
  //  xmlhttp.open("POST","http://localhost:8081/dbmail/accinfo/madhuka/FolderList",false);
  xmlhttp.open("POST","http://localhost:8081/dbmailn/accinfo/mithila/LastLogin",false);
    xmlhttp.send();
    xmlDoc=xmlhttp.responseXML;
	 var x=xmlDoc.getElementsByTagName("date");
	 console.log('Date object is '+x);
	 var folderx = x.childNodes[0].nodeValue;
  console.log('Datex is '+folderx)
	if (countFolderList() != x.length){
	//alert ('Length is '+x.length);
   for (var i=0; i<x.length;i++){  
        var folder = x[i].childNodes[0].nodeValue;
		console.log('Date is '+folder);
        saveFolderList(folder);}
	}//if only not equal
}	


function countrest(){
	 console.log('Count rest method ');
	if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
  //  xmlhttp.open("POST","http://localhost:8081/dbmail/accinfo/madhuka/FolderList",false);
  xmlhttp.open("POST","http://localhost:8081/dbmailn/accinfo/mithila/FolderList",false);
    xmlhttp.send();
    xmlDoc=xmlhttp.responseXML;
	 var x=xmlDoc.getElementsByTagName("folder");
	 console.log('Date object is '+x.length);
	// var folderx = x.childNodes[0].nodeValue;
  for (var i=0; i<x.length;i++){  
        var folder = x[i].childNodes[0].nodeValue;
        console.log('folder name: '+folder);
	}//if only not equal
	//if only not equal
}	

/*Searching methods */
//HTML5 main runing codes for local DB

function searchDatax(key,value){
	if (localStorage.getItem(key) == undefined){
	//console.log(key+' is undefined in Local Storage'); 
	return 'undefined';
	console.log ('return NULL');
	}else{		
    var Valuex = JSON.parse(localStorage.getItem(key));	
   // Valuex.push(''+value);	
  //  localStorage.setItem(key, JSON.stringify(Valuex));
	
	if(Valuex.toString().indexOf(""+value) > -1) {exists = true } else { exists = false };
 //   alert(exists);
 if(exists == false){
	console.log(value+' is saved ');}
	return exists;
	}
}

function searchDataIntegerx(key,value){
	var exists;
	if (localStorage.getItem(key) == undefined){
	console.log(key+' is undefined');
	return 'undefined';
	console.log ('return NULL');
	}else{		
    var Valuex = JSON.parse(localStorage.getItem(key));	
   // Valuex.push(''+value);	
  //  localStorage.setItem(key, JSON.stringify(Valuex));
	for (var i=0; i<Valuex.length; i++){
		//console.log('Valuex['+i+'] = '+Valuex[i]);
	if(Valuex[i]==value){
		exists = true; 
		console.log(value + ' is exists in '+key);
		return true;
		} else { 
		exists = false; 
		console.log(value + ' is not exists in '+key);
		//return false;
		};
	}
 //   alert(exists);
	console.log(value+' is '+exists);
	return exists;
	}
}

function insertDatax(key,value){
	//var v = "[\""+value+"\"]";
	localStorage.setItem(key, JSON.stringify([""+value+"",]));
	//console.log(key+' is holding '+value);
	}
	
function updateDatax(key,value){
	//console.log(key+' :: updateData');
	if (localStorage.getItem(key) == undefined){
	console.log(key+' is undefined');
	insertDatax(key,value)
	}else{		
    var Valuex = JSON.parse(localStorage.getItem(key));	
    Valuex.push(value);	
    localStorage.setItem(key, JSON.stringify(Valuex));
	console.log(key+' is updated to '+value);
	}
}
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
	
