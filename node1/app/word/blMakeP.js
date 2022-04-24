const tagMakeP = "blMakeP.js bv0.34";     
console.log(tagMakeP);
var e = {};
module.exports = e;

    // Create a new paragraph: 
  /*
  addText(内容, {
    color: 字体颜色string,
    back: 后背景颜色string,
    bold: 加粗 boolean,默认是false
    underline:下划线默认false,
    highlight: 提亮，默认黄色,
    link: 添加一个链接
    align: 位置， center/right
  })
  */
e.makeP = function(docx,o){   
  let p = docx.createP(); 
  p.addText("本文主编:littleflute. ", { color: '000088' })
  p.addText('[漂泊者乐园软件团队]', { color: '00ffff', back: '000088' })

  p.addText('漂泊者乐园')
  p.addText('英语学习专栏', {
    back: '00ffff',
    shdType: 'pct12',
    shdColor: 'ff0000'
  })

  // Use pattern in the background.
  p.addText('坚持1个月后，')
  p.addText('你会发现 ', { highlight: true }) // Highlight!
  p.addText('进步好大!', { highlight: 'darkRed' }) // Different highlight color.

  for(i in o){
    console.log(i + " : " + o[i]);
    p = docx.createP();
    p.addText(i);
    p = docx.createP();
    p.addText(o[i]); 
  }
  docx.putPageBreak()
 
  p = docx.createP() 
  p.addImage('../img/as_it_is.webp')
}
 