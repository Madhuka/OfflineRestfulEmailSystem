	//-----------------------------------------------------------------------------------
	// Collection Ajax methods
	
	function getXMLHttpReqObject(){
		var xmlhttp;
		if (window.XMLHttpRequest)
		{// code for IE7+, Firefox, Chrome, Opera, Safari
		  xmlhttp=new XMLHttpRequest();
		}
		else
		{// code for IE6, IE5
		  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
		return xmlhttp;
	}
	
	function checkStatusCall(url,params){
		var xmlhttp=getXMLHttpReqObject();
		try{
			xmlhttp.open("POST", url, true);
			xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		
			xmlhttp.onreadystatechange = function() {//Call a function when the state changes.
				if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					//alert('online');
					localStorage.setItem('connectionStatus','online');
					if(localStorage.getItem('connectionStatusBrowser')=='online'&&localStorage.getItem('connectionStatusUser')=='online'){
						try{
							document.getElementById('statusimg').src='img/tick.png';
							document.getElementById('statusimg').alt='online';
							document.getElementById('statustxt').innerHTML='&nbsp;&nbsp;&nbsp;Online&nbsp;&nbsp;&nbsp;&nbsp;';
							document.getElementById('userselectiontxt').textContent="Go to offline mode";
						}catch(e){}
						doSyncAll();
					}
				}else if(xmlhttp.readyState == 4 && xmlhttp.status == 0){
					//alert('offline');
					try{
						localStorage.setItem('connectionStatus','offline');
						document.getElementById('statusimg').src='img/wrong.png';
						document.getElementById('statusimg').alt='offline';
						document.getElementById('statustxt').innerHTML='&nbsp;&nbsp;&nbsp;Offline&nbsp;&nbsp;&nbsp;&nbsp;';
						document.getElementById('userselectiontxt').textContent="Go to online mode";
					}catch(e){}
				}

				//alert('ready:'+xmlhttp.readyState+'\nstatus:'+xmlhttp.status);
			}
			xmlhttp.send(params);
		}catch(err){
			//alert('err');
		}
	}
	
	function checkStatusPTDefault(s){
		if(s==0){
			checkStatusPT("http://192.248.15.237/dbmailn/","");
		}else{
		var userName = getUserName();
   		var userPass = getUserPassword(userName);
		checkStatusPT("http://192.248.15.237/dbmailn/","");
		}
		//checkStatusPT("http://localhost/dbmailn/","");
		//checkStatusPT("http://192.248.15.237/dbmailn/","");
	}
	
	function checkStatusPT(url,prams){
		new Ajax.Request(url,
		{
			method: 'POST',
			parameters: prams,
			onFailure: function(transport) {
				setToOffline();
			},
			onSuccess: function(transport) {
				if (200 == transport.status) {
					setToOnline();
				} else {
					setToOffline();
				}
			 }
		});	
	}
	
	function setToOnline(){
		localStorage.setItem('connectionStatus','online');
		if(localStorage.getItem('connectionStatusUser')=='online'){
			try{
				document.getElementById('statusimg').src='img/tick.png';
				document.getElementById('statusimg').alt='online';
				document.getElementById('statustxt').innerHTML='&nbsp;&nbsp;&nbsp;Online&nbsp;&nbsp;&nbsp;&nbsp;';
				document.getElementById('userselectiontxt').textContent="Go to offline mode";
			}catch(e){}
			doSyncAll();
		}else{
			setToOffline();
		}
			
	}
	
	function setToOffline(){
		try{
			localStorage.setItem('connectionStatus','offline');
			document.getElementById('statusimg').src='img/wrong.png';
			document.getElementById('statusimg').alt='offline';
			document.getElementById('statustxt').innerHTML='&nbsp;&nbsp;&nbsp;Offline&nbsp;&nbsp;&nbsp;&nbsp;';
			document.getElementById('userselectiontxt').textContent="Go to online mode";
		}catch(e){}		
	}
	
	/*function ajaxPost(url,params){
		//url = "get_data.php";
		//var params = "lorem=ipsum&name=binny";
		var xmlhttp=getXMLHttpReqObject();
		xmlhttp.open("POST", url, true);
		
		//Send the proper header information along with the request
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		//xmlhttp.setRequestHeader("Content-length", params.length);
		//xmlhttp.setRequestHeader("Connection", "close");
		
		xmlhttp.onreadystatechange = function() {//Call a function when the state changes.
			if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				sessionStorage.setItem('totalSendMsgs',parseInt(sessionStorage.getItem('totalSendMsgs'))+1);
				document.getElementById('noofspan').innerHTML=sessionStorage.getItem('totalSendMsgs');
			}
		}
		xmlhttp.send(params);	
	}*/
	
	
	//-------------------------------------------------------------------------------------