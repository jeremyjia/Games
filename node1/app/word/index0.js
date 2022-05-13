const tagWord = "word/index0.js bv0.224";  
var officegen = require('officegen');
var fs = require('fs');
 
const l = require('../../logger'); 
l.tag1(tagWord,"--tagWord---------------------------")
 

var e = {};
module.exports = e;

e.word = function(req,res){ 
    createWord(req,res);
}

function createWord(req, res) {  
    var saveAs = "";
    var bd =req.body; 
    const docx = officegen('docx')
    docx.on('finalize', function (written) {
        console.log(' finished to create word file.')
    })
    docx.on('error', function (err) {
        console.log(err)
    }) 

    let p = docx.createP(); 
    p.addText("英语慢速听力：点击下面播放器收听：", { color: '880088' });
     

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
      if("==============" == o[i] || "undefined" == o[i]) continue;
      if("title" == i){
        p = docx.createP();
        p.addText( o[i] , { color: 'blue', back: 'lightgreen',font_size: 22  }); 
        p.addImage("C:\FFOutput\voa1.jpg");

        saveAs = o[i]; 
        saveAs = saveAs.replace("\n","");

        continue;
      } 
      p = docx.createP();
      var a = o[i].split("n.");
      if(a.length>1){
        p.addText(a[0] , { color: '00ffff', back: 'brown',font_size: 18  }); 
        p.addText("n.", { color: '00ffff', back: 'black',font_size: 18  }); 
        p.addText(a[1] , { color: '00ffff', back: 'blue',font_size: 18  }); 
      }
      else{
        p.addText( a[0] , { color: '00ffff', back: 'gray',font_size: 18  }); 
      }
      p.addLineBreak()// 换行
      p.addLineBreak()// 换行
    }

  let pObj = docx.createP();     
  pObj.addText('这是广告位：请联系微信 littleflute', { color: '00ffff', back: '000088' });

  pObj = docx.createP()
  pObj.addText('这是广告位：请联系微信 littleflute', {
    back: '00ffff',
    shdType: 'pct12',
    shdColor: 'ff0000'
  })
 
 

  pObj = docx.createP()
  pObj.options.align = 'right'

  pObj.addText('有学员留言: 坚持1个月后, 才发现英语进步这么大！')

  pObj = docx.createP()

  pObj.addText('这是广告位：请联系微信 littleflute ==1==')
  pObj.addLineBreak()// 换行
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
  pObj.addImage('../img/as_it_is.jpg');

  //* 服务器生成文件
  var s = 'public/'+ saveAs + '.docx';
  s = s.replace("\n","");
  s = s.replace(": ","_"); 
  s = s.replace("’","-"); 
  s = s.replace("?","_"); 
  console.log("xdtest3:: " + s);
  let out = fs.createWriteStream(s)

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