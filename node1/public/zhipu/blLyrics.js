var makeMusic = function(ls){  
  var ms = ls[0].split(" ");
  var g = 0;
  var mLast = 0;
  for(i in ms){
    if(ms[i]!='-' && ms[i]!='|'){
      for(var j = 1; j<ls.length;j++){
        if(ls[j][g]=='，' || ls[j][g]=='。') {
          ms[mLast] += ls[j][g];
          g++;
        }
        ms[i] += "_" + ls[j][g];
        mLast = i;
      }
      g++;
    }
  }
  return ms;
}
  