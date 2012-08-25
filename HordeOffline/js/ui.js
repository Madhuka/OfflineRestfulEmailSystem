// JavaScript Document
//create folder in server
function Go(){
	console.log("LOg");
}
		
function showMe(form){
	var TestVar = form.inputbox.value;
	console.log("LOg"+TestVar);
}

function Login(form) {
    var name = form.userName.value;
	var pass = form.passWord.value;
	console.log('Call For Login by '+name);
	console.log('Rember Me '+form.rem.checked);
	saveCurrentUser(name);
	removeAllFoldersUI();
	if(form.rem.checked == true){	
	saveUserPassword(name,pass);
	}
	if (LoginServer(name,pass)== "Sucess"){
		setLabelName(getSavedCurrentUser());
		readFolders();
		displayFolder();
		LoginVisibility('hidden');
		}else{
			setLabelName('Login');
				LoginVisibility('');
			}
	
	
  //  alert ("You typed: " + TestVar);
}

//for Auto login bby local data
function autoLogin() {
    
	console.log('Call For Auto Login by '+getSavedCurrentUser());
	if (LoginServerbyLocalData()== "Sucess"){
		setLabelName(getSavedCurrentUser());
		readFolders();
		displayFolder();
			LoginVisibility('hidden');
		}else{
			setLabelName('Login');
				LoginVisibility('');
			}
	
}
  //  alert ("You typed: " + TestVar);



function displayFolder(){

//x.options.text ="";
removeAllFoldersUI();
var folders =ListOfFolders();
try
  {
	  
	for(var i=0; i<folders.length ;i++){
		//console.log('xxxxxxxxxxxxxxxxxxxxxxxxx'+folders[i]);
		var x=document.getElementById("mySelect");
var option=document.createElement("option");
  option.text=folders[i];
  x.add(option,x.options[null]);
  }//end for
  }
catch (e)
  {
  x.add(option,null);
  }
}
function meLogout(){
severLogout();
LoginVisibility('');
}
function removeAllFoldersUI(){
	console.log('Clear the UI Folder List');
	var x=document.getElementById('mySelect');
	
for(var i=x.length; i>-1; i--)
  {	 
  x.remove(i);
  }
}


function removeAllMsgsUI(){
	console.log('Clear the UI Folder List');
	var x=document.getElementById('mySelect1');
	
for(var i=x.length; i>-1; i--)
  {	 
  x.remove(i);
  }
}

/*
function showhide() {
	// Get a reference to your form's id
	var form = document.getElementById("loginform");

	// If it is hidden, show it, otherwise hide it.
	if (form.style.visibility == "hidden") {
		form.style.visibility = "visible";
	}
	else {
		form.style.visibility = "hidden";
	}
} */

function LoginVisibility(str) {
	// Get a reference to your form's id
	//console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx visible '+str);
	
	var form = document.getElementById("loginform");
if (str =="hidden") {form.style.visibility = "hidden";}
else{form.style.visibility = "visible";}
		var logoutLink = document.getElementById("logoutLink");
if (str =="hidden") {logoutLink.style.visibility = "visible";}
else{logoutLink.style.visibility = "hidden";}
	}
	
	
function pickupFolder(){
	var x=document.getElementById("mySelect");
	var folder=x.options[x.selectedIndex].text;
	setLabelFolder(folder);
	readFolder(folder);
	displayMSgHeader(folder);
	console.log('User Select '+folder +' in UI');
	}


function displayMSgHeader(folderName){

	removeAllMsgsUI();
var folders =ListOfMessages(folderName);
try
  {
	
	for(var i=1; i<folders.length ;i++){
	
		var x=document.getElementById("mySelect1");
var option=document.createElement("option");
  option.text=folders[i].from+' :: '+ folders[i].subject;
  x.add(option,x.options[null]);
  }//end for
  }
catch (e)
  {
  x.add(option,null);
  }
    
}

function setLabelName(textmy){
	 document.getElementById("userNameLabel").innerHTML = textmy;
}

function setLabelFolder(textmy){
	 document.getElementById("folderNameLabel").innerHTML = textmy;
}