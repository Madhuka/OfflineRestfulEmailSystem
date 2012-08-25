//This will give XML for local storage and passing them to REST

/*
<dbmail>
<Mail>
<date>2011-04-23 10:20:00</date>
<from_addr>mithila@dude.net</from_addr>
<to_addr>ishara@dude.net</to_addr>
<subject>hooo test</subject>
<message_id>4DD36A31.1090309@dude.net</message_id>
<content_type>text/plain; charset=ISO-8859-1; format=flowed</content_type>
<ccaddr> </ccaddr>
<bccaddr> </bccaddr>
<references> </references>
<size>8404</size>
<structure>RFTGYHUJIXCVBNMFGHJK</structure>
<rfcsize>11111</rfcsize>
</Mail>
</dbmail>
{"id":"5","folder":"Sent","from":"mithila@dbmail.uom.lk","to":"ishara@dbmail.uom.lk","repltto":"mithila@dbmail.uom.lk","subject":"testing email with attachment","createdat":"2011-09-04 17:31:06"}
*/
 function WriteNewEmailXML(eid){
	 var formt = "text/plain; charset=ISO-8859-1; format=flowed";
	// console.log('XML Genrate Called');
	 console.log('Write NewEmail XML Genrate Called'+eid);
	 var msg = new Array();
	 var hashkeyss = new Array();
	var hashkeyss = giveMsgMIMEs(eid);
	msg = giveMsgHeader(eid);
	console.log('MIME'+msg);
	 if(msg=='NULL'){return 'null';}
            try
            { 
				var XML=new XMLWriter();
                XML.BeginNode("dbmail");		
                XML.BeginNode("Mail");
				XML.Node("date",msg.createdat );
                XML.Node("from_addr", msg.from);
                XML.Node("to_addr", msg.Sent);
				XML.Node("subject", msg.subject);
				XML.Node("message_id", msg.id);
				XML.Node("content_type",formt);
				XML.Node("ccaddr", " ");
				XML.Node("bccaddr", " ");				
				XML.Node("structure", hashkeyss[0] );
				XML.Node("rfcsize", " ");
				//XML.Node("subject", "subject xxx");
				//XML.Node("ccaddr", "");
			//	XML.Node("bccaddr", "");  
             //   XML.BeginNode("to");
              //  XML.WriteString("tharidu@gmail.com"); FlagList
              //  XML.EndNode();
				//XML.BeginNode("FlagList");
				//XML.Node("seen", "1");
			//	XML.Node("delete", "0");
			//	XML.Node("flagged", "0");
			//	XML.EndNode();
                XML.Close(); // Takes care of unended tags.
                // The replace in the following line are only for making the XML look prettier in the textarea.
                // The replace in the following line are only for making the XML look prettier in the textarea.
              //  document.getElementById("ExampleOutput").value=XML.ToString().replace(/</g,"\n<");
				var xmla= XML.ToString().replace(/</g,"\n<");
				console.log(xmla);
				return XML.ToString();
				 
            }
            catch(Err)
            {
                console.log("Error: " + Err);
            }
            return false;
        }

/*/dbmailn/actions/Sent/?SendMIME=<dbmail>
<MIME>
  <hash_key>324567890876543567890876543567890 </hash_key>
   
<content>vhgvjdufgyqif846fg8qf6gwc6r7fucrg6tfr7g6ct7rewftgc7rewufh7rfr6ftiu7r6fhtrc2 
47ftc746ht5cf73yfr</content>
  <mime_type>gewfjyqgefqfg4fvuefgefuqvc4q6r7efduvegdwe</mime_type>
  <contentEncoding>gfyewifqgefuygquefqgjuefgeqf</contentEncoding>
  </MIME>
</dbmail>*/
function WriteMIMEXML(mimeid){
	 console.log('WriteMIMEXML Genrate Called'+mimeid);
	 var mime = new Array();
	mime = giveMIMEBody(mimeid);
	if(mime==null){return 'null';}
            try
            { console.log('MIME'+mime.Content);
				var XML=new XMLWriter();
                XML.BeginNode("dbmail");		
                XML.BeginNode("MIME");
				XML.Node("hash_key", mimeid);
               	XML.Node("mime_type", mime.Type);
			//	XML.Node("content", mime.Content);
		//	XML.Node("content", "dsfsdkfnsnfsn Content");
				XML.Node("contentEncoding",mime.Encode);
				XML.Close(); 
				var xmla= XML.ToString().replace(/</g,"\n<");
				console.log(xmla);
				return XML.ToString();
				 
            }
            catch(Err)
            {
                console.log("Error: " + Err.description);
            }
            return false;
        }
		
		
//MIME list to xml		
		/*http://localhost:8081/dbmailn/actions/Sent/?MIMEList=
<<dbmail>
<MIMES>
<MIME>
 <ID>222222wre</ID>
 </MIME>
 <MIME>
 <ID>w34668wre</ID>
 </MIME>
 <MIME>
 <ID>123456wre</ID>
 </MIME>
</MIMES>
</dbmail>
 */
function WriteMIMEListXML(eid){
	 console.log('WriteMIMEXML Genrate Called'+eid);
	 var mbody = new Array();
	
	mbody = giveMsgMIMEs(eid);
	console.log('MIME'+mbody);
	 if(mbody==null){return 'null';}
            try
            { console.log('MIME'+mbody.length);
				var XML=new XMLWriter();
                XML.BeginNode("dbmail");		
                XML.BeginNode("MIMES");
	   for (var i=0; i<mbody.length;i++){
					 XML.BeginNode("MIME");
					 				//XML.WriteString("madhukaudantha@gmail.com");
													XML.Node("ID", mbody[i]);
					         XML.EndNode();
					}
				//XML.Node("hash_key", mimeid);
              // 	XML.Node("mime_type", mime.Type);
			//	XML.Node("content", mime.Content);
		//	XML.Node("content", "dsfsdkfnsnfsn Content");
			//	XML.Node("contentEncoding",mime.Encode);
				XML.Close(); 
				var xmla= XML.ToString().replace(/</g,"\n<");
				console.log(xmla);
				return XML.ToString();
				 
            }
            catch(Err)
            {
                console.log("Error: " + Err.description);
            }
            return false;
        }
		
	
//basic xml writeing Funtion 	
function XMLWriter(){
    this.XML=[];
    this.Nodes=[];
    this.State="";
    this.FormatXML = function(Str)
    {
        if (Str)
            return Str.replace(/&/g, "&amp;").replace(/\"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        return ""
    }
    this.BeginNode = function(Name)
    {
        if (!Name) return;
        if (this.State=="beg") this.XML.push(">");
        this.State="beg";
        this.Nodes.push(Name);
        this.XML.push("<"+Name);
    }
    this.EndNode = function()
    {
        if (this.State=="beg")
        {
            this.XML.push("/>");
            this.Nodes.pop();
        }
        else if (this.Nodes.length>0)
            this.XML.push("</"+this.Nodes.pop()+">");
        this.State="";
    }
    this.Attrib = function(Name, Value)
    {
        if (this.State!="beg" || !Name) return;
        this.XML.push(" "+Name+"=\""+this.FormatXML(Value)+"\"");
    }
    this.WriteString = function(Value)
    {
        if (this.State=="beg") this.XML.push(">");
        this.XML.push(this.FormatXML(Value));
        this.State="";
    }
    this.Node = function(Name, Value)
    {
        if (!Name) return;
        if (this.State=="beg") this.XML.push(">");
        this.XML.push((Value=="" || !Value)?"<"+Name+"/>":"<"+Name+">"+this.FormatXML(Value)+"</"+Name+">");
        this.State="";
    }
    this.Close = function()
    {
        while (this.Nodes.length>0)
            this.EndNode();
        this.State="closed";
    }
    this.ToString = function(){return this.XML.join("");}
}