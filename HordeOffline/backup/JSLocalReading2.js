// JavaScript Document

//check JS is exsiting 
function testingJS2(){
	alert ('JS Local Readering JS is fine');
	}
	
//checking browser support
function supports_html5_storage(){
    if (typeof(localStorage) == 'undefined' ) 
    {	
	alert('Your browser does not support HTML5 localStorage. Try upgrading.');
    } else 
    {
	alert('Your browser support HTML5 localStorage.');	
    }
}

//clearing Storages in Local
function clearLocal(){
    localStorage.clear();
    //alert ('Full Local is clear');
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

//Creating deffult folders
function CreateFolderList(){
    if (typeof(localStorage) == 'undefined' ) {	
        alert('Your browser does not support HTML5 localStorage. Try upgrading.');
    } else {	
        try 
        {	
            localStorage.setItem("FolderList", JSON.stringify(["Inbox", "Sent", "OutBox","Trash","Draft"]));
        } 
        catch (e) {	 	 	 	 
            alert('Quota exceeded!'+e); //data wasn't successfully saved due to quota exceed so throw an error		
        }

    }
}


//adding folders in offline
function addFolder(form){
    if (localStorage.FolderList == undefined){CreateFolderList();}
    var folders = JSON.parse(localStorage.getItem("FolderList"));
    folders.push(form.folderName);
    localStorage.setItem("FolderList", JSON.stringify(folders));
}

// no if folder return no
function NoOfFolder(){
    var folders = JSON.parse(localStorage.getItem("FolderList"));
    var countFolders = folders.length;
    alert ("Returuning "+countFolders);
    return countFolders;
}


function ListOfFolders(){
    var folders = JSON.parse(localStorage.getItem("FolderList"));
    return folders;
}

//return NoofMessages in folder
function NoOfMessages(str){
    var msgs = JSON.parse(localStorage.getItem(str));
    var countMsgs = 0;
	if(msgs!=null){
		countMsgs =msgs.length;
	}
    //alert ("Returuning "+countMsgs +" in "+str);
    return parseInt(countMsgs);
}

//list the email IDs in json objects
function ListOfEmailIDs(str){   
    var msgs = JSON.parse(localStorage.getItem(str));
    return msgs;
    
}

//list the emails hears eg: ListOfMessages('Inbox') will return all Inbox email header in Json object JS array
function ListOfMessages(str){   
	
    var msgs = JSON.parse(localStorage.getItem(str));   
	
	if(msgs!=null){
		alert(str+"\n"+msgs.length)
   var msgHeaderArray = new Array();
    for (var i=msgs.length-1; i>=0; i--){	
		var msgsd = JSON.parse(localStorage.getItem('e'+msgs[i]+'header'));
		msgHeaderArray[i]=msgsd;   
    }
	return msgHeaderArray;
	}else{
		return new Array();
	}
}


// for offline Composing emails 
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
		  
function saveMIMEbodypart(id,mimeparts,mimesize){
    var MIMeArry = {"mimeparts":""+mimeparts,"mimesize":""+mimesize};
    localStorage.setItem("e"+id+"MIMEparts",JSON.stringify(MIMeArry));
}

function saveMessageHeader(id,folder,from,to,repltto,subject,createdat){
    var headrtArry = {"id":""+id,"folder":""+folder,"from":""+from,"to":""+to,"repltto":""+repltto,"subject":""+subject,"date":""+createdat};
    localStorage.setItem("e"+id+"header",JSON.stringify(headrtArry));
    // updateFolder(id,folder);
}

function deletMsg(a){
	('delet msg id '+a);
    var m = JSON.parse(localStorage.getItem('e'+a+'header'));
    var msg = JSON.parse(localStorage.getItem(m.folder));
    saveMessage(m.id,'Trash',m.from,m.to,m.repltto,m.subject,m.createdat);	
    var folderls = JSON.parse(localStorage.getItem('Trash'));
    folderls.push(a);
    localStorage.setItem('Trash', JSON.stringify(folderls));   

    var x = a;
 
    for (var i=0; i<msg.length ; i++){
        if (x==msg[i]){

            alert("Message moved to ");
            msg.splice(i,1);
            localStorage.setItem(m.folder, JSON.stringify(msg));
        }}
    
 
}


function saveMessage(id,folder,from,to,repltto,subject,createdat){
    var headrtArry = {"id":""+id,"folder":""+folder,"from":""+from,"to":""+to,"repltto":""+repltto,"subject":""+subject,"createdat":""+createdat};
    localStorage.setItem("e"+id+"header",JSON.stringify(headrtArry));
    // updateFolder(id,folder);
					
}	


//End of offline composing 

