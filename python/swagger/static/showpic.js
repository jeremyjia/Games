function myClick(url) 
{        
    var s2 = "<img src='http://localhost:5000/static/transparent_image.png'> </img>";
    var s = document.getElementById("divDbug");
    if (!s.b&&s.b!=false){s.b=true}
      if(s.b){
          s.innerHTML = s2;
          s.b=false
          }
      else{
        s.innerHTML = "3";
          s.b=true
          } 
}