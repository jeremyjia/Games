const tagMakeP = "blMakeP.js bv0.45";     
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

  // Use pattern in the background.
  p.addText('坚持1个月后，')
  p.addText('你会发现 ', { highlight: true }) // Highlight!
  p.addText('进步好大!', { highlight: 'darkRed' }) // Different highlight color.

  p = docx.createP()
  // 添加一个链接
  p.addText('漂泊者乐园主页链接 ')
  p.addText('点我', { underline: true, color: '000088', link: 'http://mp.weixin.qq.com/mp/homepage?__biz=MzIxMTUzOTUzOA==&hid=13&sn=aab5a9a934bad54ecd823bca0201e226&scene=18#wechat_redirect' })
  p.addText('!')
  
  p = docx.createP()
  p.addText('这是广告位：请联系微信 littleflute', { bold: true, underline: true })

  pObj = docx.createP({ align: 'center' })

  pObj.addText('这是广告位：请联系微信 littleflute', {
    border: 'dotted',
    borderSize: 12,
    borderColor: '88CCFF'
  })

  pObj = docx.createP()
  pObj.options.align = 'right'

  pObj.addText('这是广告位：请联系微信 littleflute')

  pObj = docx.createP()

  pObj.addText('这是广告位：请联系微信 littleflute')
  pObj.addLineBreak()// 换行
  pObj.addText('这是广告位：请联系微信 littleflute')

  docx.putPageBreak()//换页


  for(i in o){
    console.log(i + " : " + o[i]);
    p = docx.createP();
    p.addText(i + " 有学员留言: 坚持1个月后, 才发现英语进步这么大！");
    p = docx.createP();
    p.addText(o[i]); 
  }
  docx.putPageBreak()
 
}
 