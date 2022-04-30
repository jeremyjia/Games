function(){
	var i = 2;
	if(!this.d){
	  this.d = blo0.blMDiv(this.parentElement,"id4_blclass_test","MDivi724",50,50,500,400,"green");
	  var tb = blo0.blDiv(this.d,this.d.id+"tb","tb","gray");
	  var tb1= blo0.blDiv(this.d,this.d.id+"tb1","tb1","lightgray");
	  var v2= blo0.blDiv(this.d,this.d.id+"v2","v2","gray");
	  var tb2= blo0.blDiv(v2,v2+"tb2","tb2","lightgreen");
	  var b1 = blo0.blBtn(tb,tb.id+"b1","i"+i,"brown");
	  b1.onclick = function(){  
		tb.i = blo0.blGetGithubIssueByNumber("jeremyjia","Games",i,function(o){
		   ta.value = JSON.stringify(o);
		});
	  }
	  var b2 = blo0.blBtn(tb,tb.id+"b2","i"+i+"cs","lightblue");
	  b2.onclick = function(){  
		tb.i.cs(function(o){
		   for(j in o){
			 const btn1 = blo0.blBtn(tb1,tb1.id+j,j,"gray");
			 btn1.style.float = "left";
			 const btn2 = blo0.blBtn(tb2,tb2.id+j,j,"gray");
			 btn2.style.float = "left";
			 
			 btn1.btn2 = btn2;
			 btn1.code =  o[j].body;
			 btn1.cid  = o[j].id;
			 btn1.save2gh = function(){
								  if( typeof blo0.blUpdateGithubCommentById == "function"){  
									  blo0.blUpdateGithubCommentById(user,repo,this.cid,this.code,function(r){
										  ta.value = r;
									  }); 
									  var b = bl$(this.btn2.id); 
									  b.onclick = function(_code){
										  var s = "var f = " + _code;
										  eval(s);
										  return f;
									  }(this.code);
									  ta.status (this.id + ": save to i=" + i+ " : c=" + j + " cid="+this.cid);
								  }
								  else{
									  ta.status (this.id + ": can't find function blo0.blUpdateGithubCommentById");
								  }
							  }
			 btn1.onclick = function(_thisBtn,_j){
			   return function(){
				 ta.co = _thisBtn;               
				 ta.value = _thisBtn.code;
			   }
			 }(btn1,j);
		   }
		});
	  }
	  var b3 = blo0.blBtn(tb,tb.id+"b3","+c","green");b3.i = i;
	  b3.onclick = function(_i){  
		 return function(){
			blo0.addNewGitHubComment(_i,ta.value,function readCallBack(resp){
			  if(resp.readyState == 4){
				  if(resp.status==200){
					  ta.value = resp.responseText; 
				  }else{
					  ta.value = resp.responseText + " The status code:"+resp.status ; 
				  }
			  }			 
		});
		};
	  }(i);
	}
	_on_off_div(this,this.d);
	 var b = this;
	 b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];  
}