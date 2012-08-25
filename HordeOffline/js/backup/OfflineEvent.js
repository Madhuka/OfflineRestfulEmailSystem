// JavaScript Document for local storing events


var resturl = "http://localhost/";
//var resturl = "http://192.248.15.237/";

//check JS is exsiting 
function testingJS3(){
	console.log('JS Local Readering JS3 is fine');
	}
	

//saving compose email in offline out box
var fid=0;
function storeOfflineEvents(fevent){
	console.log('')
    if (typeof(localStorage) == 'undefined' ) {	
        alert('Your browser does not support HTML5 localStorage. Try upgrading.');
    } else {	
        try 
        {	

            if (localStorage.getItem(getSavedCurrentUser()+'OfflineEvents') == undefined){
                console.log('offline is ON and created');
                fid=1;
                var offfolder = ["f"+fid];
                localStorage.setItem(getSavedCurrentUser()+"OfflineEvents",JSON.stringify(offfolder)); 
				localStorage.setItem("f"+fid,JSON.stringify(fevent)); 
            } else{
                console.log('offline is there');
                var offfol = JSON.parse(localStorage.getItem(getSavedCurrentUser()+"OfflineEvents"));
                var strInx =  offfol[offfol.length-1].substring(1);
                console.log('str Index '+strInx);
                fid = parseInt (strInx);
                console.log('fid is '+fid);
                fid++;
                offfol.push("f"+fid);
                localStorage.setItem(getSavedCurrentUser()+"OfflineEvents", JSON.stringify(offfol));
				localStorage.setItem("f"+fid,JSON.stringify(fevent)); 
            }
           // saveMbody('f'+fid,form.messageBody);
           // saveMIMEbodypart('f'+fid,form.mimesize,form.mimesize);
           // saveMessageHeader('f'+fid,form.mfolder,form.mfrom,form.mto,form.mfrom,form.msub,'2011-4-29');
            //alert ('send to out box in offline');
            //localStorage.setItem("words", JSON.stringify(["Lorem", "Ipsum", "Dolor"]));
            //localStorage.setItem(form.name.value,form.messageBody.value); 
        } 
        catch (e) {	 	 	 	 
            alert('Quota exceeded!'+e); //data wasn't successfully saved due to quota exceed so throw an error		
        }

    }
}


//go online sysnc all at once 	
function sysnIt(){	
var offfol = JSON.parse(localStorage.getItem(getSavedCurrentUser()+"OfflineEvents"));
//console.log(offfol.length);
if (offfol.length>1){
var firstElement = offfol.splice(0,1);
console.log('Remening to sync NO '+offfol.length);
var offEvent = JSON.parse(localStorage.getItem(firstElement));
localStorage.setItem(getSavedCurrentUser()+"OfflineEvents", JSON.stringify(offfol));
console.log(offEvent);
readCreateFolder(offEvent);}
}

//will return the Current User name in action (Login) and working on
function getSavedCurrentUser(){    
    var uName = localStorage.getItem("saveCurrentUser");
	return uName;
}


//http://localhost:8081/dbmailn/actions/Seen{Delete,Undelete,Recent,Unseen}/1
function StatusEvent(flag,emailId,offline){	
	var url = resturl+'dbmailn/actions/'+flag+'/'+emailId;
	if (offline=="1"){	
	console.log(url + 'is saved');
	storeOfflineEvents(url);
	}
	else
	{
	readCreateFolder(url);	
		}
}

/*offline and online action in folder creation and deletion */

//localhost:8081/dbmailn/actions/CreateFolder/INBOXa
function CreatFolderEvent(folderName,offline){
	var url = resturl+'dbmailn/actions/CreateFolder/'+folderName;
	if (offline=="1"){	
	console.log(url + 'is saved');
	storeOfflineEvents(url);
	}
	else
	{
	readCreateFolder(url);	
		}
}

//create new emails in offline and store in offline
function ComposeOffline(id,folder,from,to,repltto,subject,createdat,mimeid,Content,type,Encode,Length,Size){
	saveLocalSotrage(id,folder,from,to,repltto,subject,createdat);
	saveMIMEbodyparts(id,mimeid);
	saveMIMEbody(mimeid,Content,type,Encode,Length,Size);
	saveFolders(folder,id);
	addFolderToFolderList(folder);
}

//create folder in server
function readCreateFolder(url){
	console.log("sysnIT suport "+url);
		if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
  //  http://localhost:8081/dbmailn/actions/CreateFolder/INBOXb
  xmlhttp.open("POST",url,false);
    xmlhttp.send();
    xmlDoc=xmlhttp.responseXML;
	var cUserName = getSavedCurrentUser();
	 var x=xmlDoc.getElementsByTagName("Status");
	 console.log('Status readCreateFolder '+x[0].childNodes[0].nodeValue);
	//if only not equal
}


function DeletFolderEvent(folderName,offline){
	//http://localhost:8081/dbmailn/actions/DeleteFolder/INBOXa
	var url = resturl+'dbmailn/actions/DeleteFolder/'+folderName;
	
	if (offline=="1"){	
	console.log(url + 'is saved');
	storeOfflineEvents(url);
	}
	else
	{
	readDeletFolder(url);	
		}
}


//create folder in server
function readDeletFolder(url){
	console.log("sysnIT suport "+url);
		if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
  //  http://localhost:8081/dbmailn/actions/CreateFolder/INBOXb
  xmlhttp.open("POST",url,false);
    xmlhttp.send();
    xmlDoc=xmlhttp.responseXML;
	var cUserName = getSavedCurrentUser();
	 var x=xmlDoc.getElementsByTagName("Status");
	 console.log('Status readCreateFolder '+x[0].childNodes[0].nodeValue);
	//if only not equal
}


//make logout from server (some prob in that rest - sloving)
function severLogout(){
	console.log("Logout ");
		if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
  //  - Logout - http://localhost/dbmail/sessions/Logout
  xmlhttp.open("POST",resturl+'dbmailn/sessions/Logout',false);
    xmlhttp.send();
    xmlDoc=xmlhttp.responseXML;
	var cUserName = getSavedCurrentUser();
	 var x=xmlDoc.getElementsByTagName("Status");
	 console.log('Status of Logout '+x[0].childNodes[0].nodeValue);
	//if only not equal
}


