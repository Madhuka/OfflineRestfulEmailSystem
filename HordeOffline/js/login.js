	function imp_reload(){
    	window.top.document.location=autologin_url+$F("server_key")
    }
	
	function checkLogKeyPress(e)
    {
		evt = e || window.event;
 		var keyPressed = evt.which || evt.keyCode;
        if (keyPressed == 13)
        {
            submit_login(0);
        }
    }
	
    function submit_login(i){
		if(i==0){
			var p=$("pass").value;
			var u=$("imapuser").value;
			if(u=="")
			{
				imp_info('Please provide the username.',4);
				$("imapuser").focus();
				return false;
			}else
			{
				if(p=="")
				{
					imp_info("Please provide your passsword.",4);
					$("pass").focus();
					return false;
				}else
				{
					if($("remcb").checked){
						localStorage.setItem("x2dd1",141);
					}else{
						localStorage.setItem("x2dd1",140);
					}
					//saveUserPassword($("imapuser").value,p);
					if(localStorage.getItem('connectionStatus')=='online'&&localStorage.getItem('connectionStatusBrowser')=='online'&&localStorage.getItem('connectionStatusUser')=='online'){
						if(LoginServer(u,p)=="Sucess"){
							$('loginbody').style.display='none';
							$('loading').style.display='block';
							saveUserPassword(u,p)
							localStorage.setItem("c",1);
							localStorage.setItem("x1dd1",131);	
							$('loading').style='block';			
							window.location="indexf.html";				
						}else{
							localStorage.setItem("x1dd1",130);
							$('msgincrct').style.display="block";
							$("pass").value="";
							$("imapuser").value="";
							$("imapuser").focus();
						}
					}else{
						if(LoginLocal(u,p)){
							localStorage.setItem("c",1);
							localStorage.setItem("x1dd1",131);					
							window.location="indexf.html";				
						}else{
							localStorage.setItem("x1dd1",130);
							$('msgnorcrd').style.display="block";
							$("pass").value="";
							$("imapuser").value="";
							$("imapuser").focus();
						}
					}
				}
			 }
		 }else{
			 if(localStorage.getItem('connectionStatus')=='online'&&localStorage.getItem('connectionStatusBrowser')=='online'&&localStorage.getItem('connectionStatusUser')=='online'){
				if(LoginServerbyLocalData()=="Sucess"){
					localStorage.setItem("x1dd1",131);					
					window.location="indexf.html";
					localStorage.setItem("c",1);
				}else{
					localStorage.setItem("x1dd1",130);
					
					try{
						$("imapuser").value=="";
						$("pass").value=="";
						$("imapuser").focus();
						$('msgerror').style.display="block";
					}catch(e){}
				}
			 }else{
				 if(LoginLocal($("imapuser").value,p)){
					localStorage.setItem("x1dd1",131);					
					window.location="indexf.html";
					localStorage.setItem("c",1);
				}else{
					localStorage.setItem("x1dd1",130);
					
					try{
						$("imapuser").value=="";
						$("pass").value=="";
						$('msgnorcrd').style.display="block";
					}catch(e){}
				}
			 }
		 }
	}
	
	
