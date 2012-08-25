// JavaScript Document
function testJS() { 
    alert('I came from an external script!'); 
}


//stroage js starting from here

//num=0) will saveLocalSotrage(id,folder,from,to,replyto,subject,createdat)
//num==1 is saveMbody(id,body)
//num==2 is saveMIMEbodypart(id,mimebodyparts,mimesize)
//num==3 is updateFolder(id,folder)
function loadEmails(num){
             
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("GET","emails.xml",false);
    xmlhttp.send();
    xmlDoc=xmlhttp.responseXML; 

              
    var x=xmlDoc.getElementsByTagName("email");
    for (var i=0; i<x.length;i++){
        var id = x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue;
        var folder = x[i].getElementsByTagName("folder")[0].childNodes[0].nodeValue;
        var body = x[i].getElementsByTagName("body")[0].childNodes[0].nodeValue;
        var from = x[i].getElementsByTagName("from")[0].childNodes[0].nodeValue;
        var to = x[i].getElementsByTagName("to")[0].childNodes[0].nodeValue;
        var mimebodyparts = x[i].getElementsByTagName("mimebodyparts")[0].childNodes[0].nodeValue;
        var mimesize = x[i].getElementsByTagName("mimesize")[0].childNodes[0].nodeValue;
        var replyto = x[i].getElementsByTagName("replyto")[0].childNodes[0].nodeValue;
        var subject = x[i].getElementsByTagName("subject")[0].childNodes[0].nodeValue;	
        var createdat = x[i].getElementsByTagName("date")[0].childNodes[0].nodeValue;
        if (num==0) {saveLocalSotrage(id,folder,from,to,replyto,subject,createdat); }
        if (num==1) {saveMbody(id,body);}
        if (num==2) {saveMIMEbodypart(id,mimebodyparts,mimesize);}
        if (num==3) {updateFolder(id,folder); }
		
    }
    if (num==0) { alert('Load email header');}
    if (num==1) {alert('Load email body');}
    if (num==2) {alert('Load email MIME partes');}
    if (num==3) { alert('Folders created');}
              
}

//this will read folderlist.xml		  
function readFolders(){
             
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
		try{
    xmlhttp.open("GET","FolderList.xml",false);
    xmlhttp.send();
	}catch(er){
	alert(er);
	}
    xmlDoc=xmlhttp.responseXML; 

              
    var x=xmlDoc.getElementsByTagName("email");
    alert('There are '+x.length+' Folders');
	if (countFolderList() != x.length){
		alert ('not = in list'+countFolderList() +': '+x.length);
    for (var i=0; i<x.length;i++){
        var folder = x[i].getElementsByTagName("folder")[0].childNodes[0].nodeValue;
        saveFolderList(folder);
        //alert('folder is '+folder);

    }alert('Created the Floder List in LocalStorage');
	}
}
	  
//this will save list for folder list to localstorage	  
function saveFolderList(folder){
    if (localStorage.FolderList == undefined){
				  
        localStorage.setItem("FolderList", JSON.stringify([""+folder+"",]));
    }else{
        var folders = JSON.parse(localStorage.getItem("FolderList"));
        folders.push(folder);
        localStorage.setItem("FolderList", JSON.stringify(folders));

        //localStorage.setItem("FolderList", JSON.stringify(folder));
				   
    } 
                
} 

//Return no Folders in User  
function countFolderList(){
    if (localStorage.FolderList == undefined){
				  alert ('nooo found');
        return 0;
    }else{
        var folders = JSON.parse(localStorage.getItem("FolderList"));
		alert ('Count '+folders.length);
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

//update folder list
function updateFolder(id,folder){
		  
    if (localStorage.getItem(folder) == undefined){
        // document.write(folder+' is undefined ' ); 
        localStorage.setItem(folder, JSON.stringify([""+id+"",])); 
    }else{
        // document.write(folder+' is defined ' ); 
        var folderls = JSON.parse(localStorage.getItem(folder));
        folderls.push(id);
        localStorage.setItem(folder, JSON.stringify(folderls)); 
    }
              
}

//returning json of msgHeader
function giveMsgHeader(id){
		  
    if (localStorage.getItem('e'+id+'header') == undefined){
        return ('NULL');
    }else{
        var msgHeader = JSON.parse(localStorage.getItem('e'+id+'header'));
		return msgHeader;      
    }
              
}

//returning json of msgMIME
function giveMsgMIMEs(id){
		  
    if (localStorage.getItem('e'+id+'MIMEparts') == undefined){
        return ('NULL');
    }else{
        var msgMIME = JSON.parse(localStorage.getItem('e'+id+'MIMEparts'));
		return msgMIME;      
    }
              
}

//returning string in msgBody
function giveMsgBody(id){
		  
    if (localStorage.getItem('e'+id+'body') == undefined){
        return ('NULL');
    }else{
        var msgBody = localStorage.getItem('e'+id+'body');
		return msgBody;      
    }
              
}
	
//saved email Body	
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


//saved email mail Boady	
function saveMIMEbodypart(id,mimeparts,mimesize){
    var MIMeArry = {"mimeparts":""+mimeparts,"mimesize":""+mimesize};
    localStorage.setItem("e"+id+"MIMEparts",JSON.stringify(MIMeArry));
			 
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
    alert('Full cleared local storage');
}			  
