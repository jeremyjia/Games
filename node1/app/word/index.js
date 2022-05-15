const tagWord = "index.js bv0.52";  
var officegen = require('officegen');
var fs = require('fs');

var blP = require('./blMakeP');

console.log(tagWord);

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

  blP.makeP(docx,bd);
  
  pObj = docx.createP()

  pObj.addText('欢迎加入英语学习会员群！', { font_face: 'Arial' })
  pObj.addText(' 每天发红包奖学金.', { font_face: 'Arial', font_size: 40 })

  pObj = docx.createP({align: 'center'})
  // pObj.options.align = 'center'
  pObj.addText('会员信息', { bold: true, font_face: 'Arial', font_size: 18 })
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

  let student1 = ['李**', '男', 22]
  let student2 = ['张**', '男', 28]
  let student3 = ['孙**', '女', 18]
  table.push(student1, student2)
  // 表格
  docx.createTable(table, tableStyle)

 

  //* 服务器生成文件
  let out = fs.createWriteStream('public/example.docx')

  out.on('error', function (err) {
    console.log(err)
  })

  
  pObj = docx.createP()  
  // 添加图片
  pObj.addImage('../img/board.jpeg')
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