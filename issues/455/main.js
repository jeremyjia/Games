const test = function(){ 
    
    var d= blo0.blMD(Date(), "mdTest_v0.14",50,50,555,113,blGrey[1]);
    var s = ""; 
		s += blo0.blhMakeLink('index.html','https://jeremyjia.github.io/Games/issues/455/index.html',
            'color:green;','_blank');
		
            s += blo0.blhMakeLink('littleflute_index.html','https://littleflute.github.io/Games/issues/455/index.html',
                'color:brown;','_blank');
              
        s += blo0.blhMakeLink('i455','https://github.com/jeremyjia/Games/issues/455',
              'color:green;','_blank');
            
		s += blo0.blhMakeLink(' blog','https://github.com/littleflute/blog','color:yellow;','_blank');
    const aboutMe = blo0.blDiv(d,d.id+"aboutMe",s,blGrey[0])
}