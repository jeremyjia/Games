//Use API to create or update a comment.  
        var xmlHttpReg = null;
          if (window.ActiveXObject) {//If IE
             xmlHttpReg = new ActiveXObject("Microsoft.XMLHTTP");
	 } else if (window.XMLHttpRequest) {
              xmlHttpReg = new XMLHttpRequest(); 
         }

         var url = "https://api.github.com/repos/jeremyjia/Games/issues/comments/515761823?access_token=fbf22eeec3879587c82a8427d93cf682c13a2f89";

//var url = "https://api.github.com/repos/jeremyjia/Games/issues/4/comments?access_token=fbf22eeec3879587c82a8427d93cf682c13a2f89";	  
	var data= {
	"body": "Update a comment from API \n\n----Jeremyjia Updated1"
	};
          if (xmlHttpReg != null) {
              xmlHttpReg.open("PATCH", url, true);    // Update a comment
              //xmlHttpReg.open("POST", url, true);   //Create a new comment
	      xmlHttpReg.send(JSON.stringify(data));
              xmlHttpReg.onreadystatechange = callBackResult; //CallBack function
          }else{
		  alert("xmlHttpRequest is null!");
	}

          function callBackResult() {         
              if (xmlHttpReg.readyState == 4) {            
                 alert("OK "+xmlHttpReg.status);
                  if (xmlHttpReg.status == 200) {
                     var  msg = xmlHttpReg.responseText;
		    alert("responseText: "+msg);
                   }
              }
         }
