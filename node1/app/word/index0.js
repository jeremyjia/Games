const tagWord = "index.js bv0.131";  
var officegen = require('officegen');
var fs = require('fs');

var blP = require('./blMakeP');

var e = {};
module.exports = e;

e.word = function(req,res){ 
    createWord(req,res);
}

function createWord(req, res) {  
    var bd =req.body; 
    const docx = officegen('docx')
    docx.on('finalize', function (written) {
        console.log(' finished to create word file.')
    })
    docx.on('error', function (err) {
        console.log(err)
    })
    // Create a new paragraph: 
  
    //blP.makeP(docx,bd);

    let p = docx.createP(); 
    p.addText('点我', { underline: true, color: '000088', link: 'http://mp.weixin.qq.com/mp/homepage?__biz=MzIxMTUzOTUzOA==&hid=13&sn=aab5a9a934bad54ecd823bca0201e226&scene=18#wechat_redirect' })
    
    p = docx.createP(); 
    p.addText("本文主编:littleflute. ", { color: '000088' })
    p.addText('[漂泊者乐园软件团队] ' + tagWord, { color: '00ffff', back: '000088' })

    p.addText('漂泊者乐园')
    p.addText('英语学习专栏', {
      back: '00ffff',
      shdType: 'pct12',
      shdColor: 'ff0000'
    })

    var o = bd;
    for(i in o){ 
      p = docx.createP();
      p.addText(o[i], { color: '00ffff', back: '008888',font_size: 22  }); 
    }

  let pObj = docx.createP()
   
  pObj.addText('这是广告位：请联系微信 littleflute')
  pObj.addText('这是广告位：请联系微信 littleflute', { color: '000088' })
  pObj.addText('这是广告位：请联系微信 littleflute', { color: '00ffff', back: '000088' })
  pObj = docx.createP()

  pObj.addText('这是广告位：请联系微信 littleflute')
  pObj.addText('这是广告位：请联系微信 littleflute', {
    back: '00ffff',
    shdType: 'pct12',
    shdColor: 'ff0000'
  })
 
 

  pObj = docx.createP()
  pObj.options.align = 'right'

  pObj.addText('有学员留言: 坚持1个月后, 才发现英语进步这么大！')

  pObj = docx.createP()

  pObj.addText('这是广告位：请联系微信 littleflute')
  pObj.addLineBreak()// 换行
  pObj.addText('这是广告位：请联系微信 littleflute')

  docx.putPageBreak()//换页

  pObj = docx.createP()

  pObj.addText('这是广告位：请联系微信 littleflute', { font_face: 'Arial' })
  pObj.addText('这是广告位：请联系微信 littleflute', { font_face: 'Arial', font_size: 40 })

  pObj = docx.createP({align: 'center'})
  // pObj.options.align = 'center'
  pObj.addText('学员信息', { bold: true, font_face: 'Arial', font_size: 18 })
  let tableStyle = {
    tableColWidth: 2400,
    tableSize: 24,
    tableColor: "ada",
    tableAlign: "center",
    tableVAlign: "center",
    tableFontFamily: "Comic Sans MS",
    borders: true
  }
  let table  = [
    [{
      val: '姓名',
      opts: {
        align: "center",
        vAlign: "center",
        sz: '36',
        // cellColWidth: 42,
        // b: true,
        // shd: {
        //   fill: "7F7F7F",
        //   themeFill: "text1",
        //   "themeFillTint": "80"
        // },
        // fontFamily: "Avenir Book"
      }
    }, {
      val: '性别',
      opts: {
        align: "center",
        vAlign: "center",
        sz: '36',
      }
    }, {
      val: '年龄',
      opts: {
        align: "center",
        vAlign: "center",
        sz: '36',
      }
    }]
  ]

  let student1 = ['李*', '男', 22]
  let student2 = ['张**', '男', 28]
  table.push(student1, student2)
  // 表格
  docx.createTable(table, tableStyle)

  docx.putPageBreak()
 
  pObj = docx.createP()

  // 添加图片
  pObj.addImage('../img/as_it_is.jpg')

  //* 服务器生成文件
  let out = fs.createWriteStream('public/example.docx')

  out.on('error', function (err) {
    console.log(err)
  })

  // Async call to generate the output file:
  docx.generate(out) 
  //*/

    /* 返回给前端，前端直接下载
    res.writeHead(200, {
        // 注意这里的type设置，导出不同文件type值不同application/vnd.openxmlformats-officedocument.wordprocessingml.document
        "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        'Content-disposition': 'attachment; filename=out-' + new Date().getTime() + '.docx'
    });
    docx.generate(res)
    //*/

    //*
    res.status(200);
    console.log(req.body);
    
    var r = {};
    r.api = "word"; 
    r.date = Date();
    r.tag = tagWord;
    //r.out = out;
    r.body = bd;
    r.url =  req.url; 
    res.json(r); 
    //*/
 
}