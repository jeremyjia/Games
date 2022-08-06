var makeMusic = function(ls){  
  var ms = ls[0].split(" ");
  var c = [];
  for(i in ls){
    c[i] = 0;
  }
  for(i in ls){
    if(i==0) continue; 
    for(j in ms){
      if(ms[j]=='-' || ms[j]=='|'){
        continue;
      }
      var l = ls[i][c[i]];
      c[i]++;
      if(ls[i][c[i]]=="，" || ls[i][c[i]]=="。") {
        l += ls[i][c[i]];
        c[i]++;
      }
      ms[j] += "_"+l; 
    }
  }
  return ms;
}
  